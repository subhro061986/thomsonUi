import React, { useEffect, useState, useRef } from "react";
import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import Footer from "../Layout/Footer";
import NavBar from "../Layout/NavBar";
import TopBar from "../Layout/TopBar";
import Whatsapp from "../Layout/Whatsapp";
import { useAuth } from '../Context/Authcontext';
import { Button } from 'react-bootstrap';
import { UserProfile } from "../Context/Usercontext";
import { useNavigate, useLocation } from 'react-router-dom';
import crypto from 'crypto-js';
import admin_logo from "../Assets/Images/logoo.svg";
import Config from "../Config/Config.json";
import useRazorpay from "react-razorpay";
import TopBarSouthsore from "../Layout/TopBarSouthsore";
import NavBarSouthsore from "../Layout/NavBarSouthsore";
import FooterSouthsore from "../Layout/FooterSouthsore";
import ShippingComp from "../Layout/ShipppingComp";
import verify from "../Assets/Images/verify.png";


const BillingAddressPage = () => {
    const formWizardRef = useRef();
    const { authData,authRole } = useAuth()
    const {
        my_profile,
        get_country_list,
        get_state_list,
        change_contact_details,
        createRazorpayOrder,
        processPayment,
        shippingList,
        getBillingAddress,
        editBillingAddress,
        createAppOrder,
        selectedShippingAddressId,
        userShippingAddress
    } = UserProfile()
    const navigate = useNavigate();
    const location = useLocation()
    const [address, setAddress] = useState('')
    const [selectedCountry, setSelectedCountry] = useState('')
    const [selectedState, setSelectedState] = useState('')
    const [stateName,setStateName] = useState('')
    const [countryName,setCountryName] = useState('')
    const [city, setCity] = useState('')
    const [pin, setPin] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [countryList, setCountryList] = useState([])
    const [stateList, setStateList] = useState([])
    const [placeOrderResponse, setPlaceOrderResponse] = useState({})

    const [orderTotal, setOrderTotal] = useState(0)
    const [buyNow, setBuyNow] = useState(0)
    const [billingAddressId, setBillingAddressId] = useState(0)
    const [Razorpay] = useRazorpay();


    useEffect(() => {

        myProfileApi()
        renderCountryList()
        getBillingDetails()
    }, []);

    useEffect(() => {
        setBuyNow(location.state.buynow)
    }, [location.state.buynow])

    useEffect(() => {
        console.log("SHIPPING LIST FROM PARENT=", userShippingAddress)
    }, [shippingList,selectedShippingAddressId])


    const countryHandler = async (e) => {
        if (selectedCountry == null && selectedCountry == '') {
            try {
                const resp = await get_state_list(e.target.value)


                setStateList(resp.output)

                console.log("getStateList= ", resp.output)
            } catch (err) {
                console.error(err);
            }
        }
        else {
            renderStateList(e.target.value)
        }
        setSelectedCountry(e.target.value)
    }

    const stateHandler = (e) => {
        setSelectedState(e.target.value)
    }

    const cityHandler = (e) => {
        setCity(e.target.value)
    }

    const pinHandler = (e) => {
        setPin(e.target.value)
    }

    const nameHandler = (e) => {
        setName(e.target.value)
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
    }

    const phoneHandler = (e) => {
        setPhone(e.target.value)
    }

    const addressHandler = (e) => {
        setAddress(e.target.value)
    }

    const renderStateList = async (countyId) => {
        try {
            // console.log("inside statelist")
            const resp = await get_state_list(countyId)
            setStateList(resp.output)
            // console.log("getStateList= ", resp.output)
        } catch (err) {
            console.error(err);
        }
    }
    const renderCountryList = async () => {
        try {
            const resp = await get_country_list()
            setCountryList(resp.output)
            // console.log("getCountryList= ", resp.output)
        } catch (err) {
            console.error(err);
        }
    }

    const myProfileApi = async () => {

        const resp = await my_profile()
        setName(resp.output.name)
        setEmail(resp.output.email)
        setPhone(resp.output.contactno)
    }

    const getBillingDetails = async () => {

        const resp = await getBillingAddress()
        setBillingAddressId(resp.output.id)
        setAddress(resp.output.streetaddress)
        setSelectedCountry(resp.output.countryid)
        setSelectedState(resp.output.stateid)
        setCity(resp.output.city)
        setPin(resp.output.pincode)
        setStateName(resp.output.statename)
        setCountryName(resp.output.countryname)
        if (resp.output.countryid !== null && resp.output.countryid !== '') {
            renderStateList(resp.output.countryid)
        }
    }
    const processPaymentSuccess = async (placeOrder, data) => {
        const newData = {
            ...data,
            transactiondate: placeOrder.output.orderdate,
            orderno: placeOrder.output.orderno,
            orderid: placeOrder.output.id,
            success: 1
        }

        var respPaymentConfirmed = await processPayment(newData)
        // console.log("resp confirmed= ", respPaymentConfirmed)
        if (respPaymentConfirmed['statuscode'] === "0") {
            navigate('/confirmorder')
            
        }
        else {
            alert("Could not process payment correctly")
        }
    }
    const processPaymentFailed = async (placeOrder, data) => {
        const newData = {
            ...data,
            transactiondate: placeOrder.output.orderdate,
            orderno: placeOrder.output.orderno,
            orderid: placeOrder.output.id,
            success: 0
        }

        var respPaymeontFailed = await processPayment(newData)
        console.log("respPaymeontFailed= ", respPaymeontFailed)
    }
    const placeOrder = async () => {

        // console.log("selected shipping address=",selectedShippingAddress)
        if(selectedShippingAddressId > 0){

            let placeorderJson = {
                billingaddressid: billingAddressId,
                shippingaddressid: selectedShippingAddressId
            }
            // console.log("placeorder Json=", placeorderJson)
            const respPlaceOrder = await createAppOrder(buyNow, placeorderJson)
            console.log("respPlaceOrder=", respPlaceOrder)
            setPlaceOrderResponse(respPlaceOrder)
            if (respPlaceOrder.output !== null) {
                setOrderTotal(respPlaceOrder.output.totalAmount)
                formWizardRef.current?.goToTab(2);
            }

        } else {
            alert("Please select a shipping address.")
        }

    }

    const saveBillingDetails = async (data) => {
        if(address==='' || city==='' || 
            selectedState==='' || selectedCountry==='' ||
            email==='' || phone==='' || address===undefined || city===undefined || 
            selectedState===undefined || selectedCountry===undefined ||
            email===undefined || phone===undefined
        )
        {
            console.log("IN IF")
            alert("Please fill up all fields")
        }
        else{
            console.log("IN ELSE")
            let changebillingDetails = {
                streetAddress: address,
                city: city,
                pincode: pin,
                stateid: selectedState,
                countryid: selectedCountry,
            }
    
            let changecontactDetails = {
                email: email,
                contactno: phone,
            }
    
            const contactDetailsPesponse = await change_contact_details(changecontactDetails)
            // console.log("contact details=", contactDetailsPesponse)
    
            const billingDetailsPesponse = await editBillingAddress(changebillingDetails)
            // console.log("billing details=", billingDetailsPesponse)
    
            if (contactDetailsPesponse.statuscode === '0' && billingDetailsPesponse.statuscode === '0') {
                // console.log("check,",formWizardRef.current)
                formWizardRef.current?.goToTab(1);
            }
        }
        

    }

    const handlePayment = async (params) => {
        // const amount = location.state.pageData.total_price
        // console.log("amt= ", amount)

        if(authRole  === Config.ROLE_DISTRIBUTOR){
         navigate('/confirmorder')   
        }
        else{
            const amount = parseInt(orderTotal * 100)
            let order_params = {
                amount: amount,
                currency: placeOrderResponse.output.currencyisocode,
                orderno: placeOrderResponse.output.orderno,
                orderid: placeOrderResponse.output.id
    
            }
            const order = await createRazorpayOrder(order_params); //  Create order on your backend
            // console.log("order response= ", order)
    
            if (order !== undefined) {
    
                const options = {
                    // key: Config.RAZORPAY_LIVE_KEY, // Enter the Key ID generated from the Dashboard
                    key: Config.RAZORPAY_TEST_KEY, // Enter the Key ID generated from the Dashboard
                    amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                    currency: "INR",
                    name: "Thompson & Reuters",
                    description: "Test Transaction",
                    image: { admin_logo },// company logo
                    order_id: order.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of createRazorpayOrder().
                    handler: function (response) {
                        // alert(response.razorpay_payment_id);
                        // alert(response.razorpay_order_id);
                        // alert(response.razorpay_signature);
                        // console.log("payment successfull response= ", response)
                        const succeeded = true;
                        // const succeeded = crypto.HmacSHA256(`${order.order_id}|${response.razorpay_payment_id}`, Config.RAZORPAY_LIVE_KEY_SECRET).toString() === response.razorpay_signature;
                        // console.log("success?= ", succeeded)
                        if (succeeded) {
                            processPaymentSuccess(placeOrderResponse, {
                                "paymentid": response.razorpay_payment_id,
                                "razorpay_orderid": response.razorpay_order_id,
                                "payment_signature": response.razorpay_signature,
                                "transactionamount": order.amount
                                // "currency" :"INR"
    
                            })
                        }
                        else {
                            alert("Your transaction process failed! Please try again later.")
                        }
    
                    },
                    prefill: {
                        name: name,
                        email: email,
                        contact: phone,
                    },
                    notes: {
                        address: address,
                    },
                    theme: {
                        color: "#3399cc",
                    },
                };
    
                const rzp1 = new Razorpay(options);
    
                rzp1.on("payment.failed", function (response) {
                    alert(response.error.code);
                    alert(response.error.description);
                    alert(response.error.source);
                    alert(response.error.step);
                    alert(response.error.reason);
                    alert(response.error.metadata.order_id);
                    alert(response.error.metadata.payment_id);
    
    
                    processPaymentFailed(placeOrderResponse, {
                        "paymentid": "",
                        "razorpay_orderid": order.order_id,
                        "payment_signature": response.razorpay_signature,
                        "transactionamount": order.amount,
                        // "currency" :"INR"
    
                    })
                });
                rzp1.on("payment.captured", function (response) {
                    // console.log("payment successfulb response= ", response)
                    placeOrder()
                });
    
                rzp1.open();
            }
        }
    }; 


    const handleComplete = () => {
        navigate('/')
    };

    const navigateToHome = () => {
        navigate('/')
    }
    const tabChanged = async (index) => {
        // console.log('index=',index)
        if (index === 0) {
            saveBillingDetails()
        }
        else if (index === 1) {
            placeOrder()
        }
        else if (index === 2) {
            handlePayment()
        }


    };


    return (
        <div className="main-container">

            <div className="container">
                <TopBar/>
                <NavBarSouthsore />
            </div>
            <Whatsapp />
            <div className="billingAddress" >

                <div className="container ">
                    <FormWizard
                        onComplete={handleComplete}
                        // onTabChange={tabChanged}
                        ref={formWizardRef}
                        backButtonTemplate={()=> (<></>)}
                        nextButtonTemplate={(handleNext) => (
                            <></>
                        )}
                        finishButtonTemplate={(handleComplete) => (
                            <></>
                        )}

                    >
                        <FormWizard.TabContent title="Billing Address" icon="ti-user" >

                            <div className=" card " >

                                <div className="card-body">

                                    <h2 className="card-title"><b>Billing Address</b></h2>

                                    <hr></hr>
                                    <div className=" row card-text">

                                        <div className="col-md-6">
                                            <label className="form_label">Address</label>
                                            <input className="form-control p_hold" type="text"
                                                onChange={addressHandler} value={address} autocomplete="new-password"/>

                                            <label className="form_label mt-2">City</label>
                                            <input className="form-control p_hold" type="text"
                                                onChange={cityHandler} value={city} autocomplete="new-password"/>

                                            <label className="form_label mt-2">Name</label>
                                            <input className="form-control p_hold" type="text"
                                                onChange={nameHandler} value={name} autocomplete="new-password"/>

                                            <label className="form_label mt-2">Email</label>
                                            <input className="form-control p_hold" type="text"
                                                onChange={emailHandler} value={email} autocomplete="new-password"/>

                                            <label className="form_label mt-2">Phone</label>
                                            <input className="form-control p_hold" type="text"
                                                onChange={phoneHandler} value={phone} autocomplete="new-password"/>
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form_label ">Country</label>
                                            <select className="form-control p_hold" onChange={countryHandler} value={selectedCountry}>

                                                <option disabled > Please Select</option>

                                                {
                                                    countryList.map((country, index) => (

                                                        <option
                                                            key={country.id}
                                                            value={country.id}
                                                            selected={selectedCountry === country.id ? true : false}
                                                            autocomplete="new-password"
                                                        >
                                                            {country.name}
                                                        </option>

                                                    ))
                                                }

                                            </select>

                                            <label className="form_label mt-2">State</label>
                                            <select className="form-control p_hold"
                                                onChange={stateHandler} >

                                                <option disabled> Please Select</option>

                                                {
                                                    stateList.map((state, index) => (

                                                        <option key={state.id} value={state.id} selected={selectedState === state.id ? true : false} autocomplete="new-password"> {state.name} </option>

                                                    ))
                                                }
                                            </select>


                                            <label className="form_label mt-2">PIN</label>
                                            <input className="form-control p_hold" type="text"
                                                onChange={pinHandler} value={pin} autocomplete="new-password"/>
                                        </div>

                                    </div>
                                    <Button className="mt-2 rounded-pill px-4" variant="outline-primary" onClick={()=>tabChanged(0)}>Save & Next</Button>


                                </div>
                            </div>

                        </FormWizard.TabContent>
                        <FormWizard.TabContent title="Shipping Address" icon="ti-home">
                            <div className=" card " >

                                <div className="card-body">

                                    <h2 className="card-title"><b>Shipping Address</b></h2>

                                    <hr></hr>
                                    <ShippingComp/>


                                    <Button className="mt-2 rounded-pill px-4" variant="outline-primary" onClick={()=>tabChanged(1)}>Place Order</Button>


                                </div>
                            </div>
                        </FormWizard.TabContent>
                        <FormWizard.TabContent title="Process Payment" icon="ti-money">
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="card-title"><b>Process Payment</b></h2>

                                    <hr></hr>

                                        <p className="card-title fs-5 fw-medium" style={{color:"gray"}}>Order Summary</p>
                                        <hr></hr>
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                                <h3>Billing address</h3>
                                                <hr></hr>
                                                <div className="d-flex flex-column justify-content-between align-items-start" >
                                                    <p><strong>Address:</strong> {address}</p> 
                                                    <p><strong>City:</strong> {city}</p>
                                                    <p><strong>Pin Code:</strong>{pin}</p>
                                                    <p><strong>State:</strong>{stateName}</p>
                                                    <p><strong>Country:</strong> {countryName}</p>
                                                </div>

                                        </div>
                                        <div>
                                                <h3>Shipping address</h3>
                                                <hr></hr>
                                                <div className="d-flex flex-column justify-content-between align-items-start" >
                                                    
                                          
                                                    <p><strong>Address:</strong> {userShippingAddress?.streetaddress}</p> 
                                                    <p><strong>City:</strong> {userShippingAddress?.city}</p>
                                                    <p><strong>Pin Code:</strong>{userShippingAddress?.pincode}</p>
                                                    <p><strong>State:</strong>{userShippingAddress?.statename}</p>
                                                    <p><strong>Country:</strong> {userShippingAddress?.countryname}</p>
                                                </div>

                                        </div>
                                        <div >
                                        <h3>Total Amount</h3>
                                        <hr></hr>
                                        <h4>Price : {placeOrderResponse?.output?.currency} {placeOrderResponse?.output?.totalAmount} </h4>
                              
                                        </div>
                                        <div>

                                        </div>
                                    </div>
                                    <Button className="m-2 rounded-pill px-4" variant="outline-primary" onClick={()=>tabChanged(2)}>Confirm Order</Button>

                                </div>
                            </div>
                        </FormWizard.TabContent>
                        
                    </FormWizard>
                    {/* add style */}
                    <style>{`
        @import url("https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css");
      `}</style>

                </div>
            </div>
            <FooterSouthsore />
        </div>
    )
}

export default BillingAddressPage;
