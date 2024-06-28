import React, { useEffect, useState, } from "react";
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

const BillingAddressPage = () => {
    const { authData } = useAuth()
    const { place_order,
        my_profile,
        get_country_list,
        get_state_list,
        change_billing_address,
        change_contact_details,
        createOrder,
        processPayment,
        applyCoupon,
        shippingList
    } = UserProfile()
    const navigate = useNavigate();
    const location = useLocation()
    const [address, setAddress] = useState('')
    const [selectedCountry, setSelectedCountry] = useState('')
    const [selectedState, setSelectedState] = useState('')
    const [city, setCity] = useState('')
    const [pin, setPin] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [countryList, setCountryList] = useState([])
    const [stateList, setStateList] = useState([])
    const [placeOrderResponse, setPlaceOrderResponse] = useState({})
    const [togglepayment, setTogglePayment] = useState(true)
    const [showCoupon, setShowCoupon] = useState(false)
    const [coupon, setCoupon] = useState('')
    const [orderTotal, setOrderTotal] = useState(0)
    const [buyNow, setBuyNow] = useState(0)

    const [Razorpay] = useRazorpay();
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';


    useEffect(() => {

        myProfileApi()
        renderCountryList()
    }, []);

    useEffect(() => {
        setBuyNow(location.state.buynow)
    }, [location.state.buynow])

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

    const handleSetCoupon = (e) => {
        setCoupon(e.target.value)
    }

    const addressHandler = (e) => {
        setAddress(e.target.value)
    }

    const generateString = (length) => {
        let result = ' ';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }
    const renderStateList = async (countyId) => {
        try {
            console.log("inside statelist")
            const resp = await get_state_list(countyId)
            setStateList(resp.output)
            console.log("getStateList= ", resp.output)
        } catch (err) {
            console.error(err);
        }
    }
    const renderCountryList = async () => {
        try {
            const resp = await get_country_list()
            setCountryList(resp.output)
            console.log("getCountryList= ", resp.output)
        } catch (err) {
            console.error(err);
        }
    }

    const myProfileApi = async () => {

        const resp = await my_profile()

        setAddress(resp.output.addressline)
        setSelectedCountry(resp.output.countryid)
        setSelectedState(resp.output.stateid)
        setCity(resp.output.city)
        setPin(resp.output.pincode)
        setName(resp.output.name)
        setEmail(resp.output.email)
        setPhone(resp.output.contactno)

        if (resp.output.countryid !== null && resp.output.countryid !== '') {
            renderStateList(resp.output.countryid)
        }
    }



    const processPaymentSuccess = async (placeOrder, data) => {
        const newData = {
            ...data,
            transactiondate: placeOrder.output.orderdate,
            orderno: placeOrder.output.orderno,
            success: 1
        }

        var respPaymentConfirmed = await processPayment(newData)
        console.log("resp confirmed= ", respPaymentConfirmed)
        if (respPaymentConfirmed['statuscode'] === "0") {

            navigate('/orderconfirmation')
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
            success: 0
        }

        var respPaymentFailed = await processPayment(newData)

        // if (respPaymentConfirmed['statuscode'] === "0"){

        //     navigate('/orderconfirmation')
        // }
        // else{
        //     alert("Could not process payment correctly")
        // }
    }
    const placeOrder = async (data) => {

        // console.log("respPlaceOrder=",respPlaceOrder.output.orderno)

        // console.log("razor pay payment status code= ",respPaymentConfirmed['statuscode'])
        let changebillingDetails = {
            addressline: address,
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
        console.log("contact details=", contactDetailsPesponse)

        const billingDetailsPesponse = await change_billing_address(changebillingDetails)
        console.log("billing details=", billingDetailsPesponse)

        const respPlaceOrder = await place_order(buyNow)

        setPlaceOrderResponse(respPlaceOrder)
        if (respPlaceOrder.output !== null)
            setOrderTotal(respPlaceOrder.output.totalAmount)
        // setTogglePayment(false)
        // setShowCoupon(true)

        // return respPlaceOrder
    }

    const handlePayment = async (params) => {
        // const amount = location.state.pageData.total_price
        // console.log("amt= ", amount)
        const amount = parseInt(orderTotal * 100)

        console.log("amt= ", amount)

        // var placeOrderResp= await placeOrder()

        let order_params = {
            amount: amount,
            currency: "INR",
            orderno: placeOrderResponse.output.orderno

        }
        const order = await createOrder(order_params); //  Create order on your backend
        console.log("order response= ", order)

        if (order !== undefined) {

            const options = {
                key: Config.RAZORPAY_LIVE_KEY, // Enter the Key ID generated from the Dashboard
                amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: "INR",
                name: "SouthShore Pvt Ltd",
                description: "Test Transaction",
                image: { admin_logo },// company logo
                order_id: order.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
                handler: function (response) {
                    // alert(response.razorpay_payment_id);
                    // alert(response.razorpay_order_id);
                    // alert(response.razorpay_signature);
                    console.log("payment successfull response= ", response)

                    const succeeded = crypto.HmacSHA256(`${order.order_id}|${response.razorpay_payment_id}`, Config.RAZORPAY_LIVE_KEY_SECRET).toString() === response.razorpay_signature;
                    console.log("success?= ", succeeded)
                    if (succeeded) {
                        processPaymentSuccess(placeOrderResponse, {
                            "paymentid": response.razorpay_payment_id,
                            "razorpay_orderid": response.razorpay_order_id,
                            // "payment_signature":response.razorpay_signature,
                            "transactionamount": order.amount,
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
                    // "payment_signature":response.razorpay_signature,
                    "transactionamount": order.amount,
                    // "currency" :"INR"

                })
            });
            rzp1.on("payment.captured", function (response) {
                console.log("payment successfulb response= ", response)
                placeOrder()
            });

            rzp1.open();
        }
    };

    const applyCouponCode = async () => {

        let json = {
            couponcode: coupon,
            orderid: placeOrderResponse.output.id
        }
        // ... applycoupon api endpoint here
        if (coupon === "" || coupon === undefined || coupon === null)
            alert("Coupon Code cannot be empty!")
        else {
            const res = await applyCoupon(json)
            setOrderTotal(res.output.totalAmount)
            console.log(res)

        }
    }

    const handleComplete = () => {
        navigate('/')
    };
    const tabChanged = ({ prevIndex, nextIndex }) => {
        console.log("prevIndex", prevIndex);
        console.log("nextIndex", nextIndex);

        
    };

  
    return (
        <div className="main-container">

            <div className="container">
                <TopBarSouthsore />
                <NavBarSouthsore />
            </div>
            <Whatsapp />
            <div className="billingAddress" >

                <div className="container ">
                    <FormWizard
                        onComplete={handleComplete}
                        onTabChange={tabChanged}
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
                                                onChange={addressHandler} value={address} />

                                            <label className="form_label mt-2">City</label>
                                            <input className="form-control p_hold" type="text"
                                                onChange={cityHandler} value={city} />

                                            <label className="form_label mt-2">Name</label>
                                            <input className="form-control p_hold" type="text"
                                                onChange={nameHandler} value={name} />

                                            <label className="form_label mt-2">Email</label>
                                            <input className="form-control p_hold" type="text"
                                                onChange={emailHandler} value={email} />

                                            <label className="form_label mt-2">Phone</label>
                                            <input className="form-control p_hold" type="text"
                                                onChange={phoneHandler} value={phone} />
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

                                                        <option key={state.id} value={state.id} selected={selectedState === state.id ? true : false}> {state.name} </option>

                                                    ))
                                                }
                                            </select>


                                            <label className="form_label mt-2">PIN</label>
                                            <input className="form-control p_hold" type="text"
                                                onChange={pinHandler} value={pin} />
                                        </div>

                                    </div>
                                    <Button className="mt-2 rounded-pill px-4" variant="outline-primary" onClick={placeOrder}>Save</Button>
                                    

                                </div>
                            </div>

                        </FormWizard.TabContent>
                        <FormWizard.TabContent title="Shipping Address" icon="ti-home">
                            <div className=" card " >

                                <div className="card-body">

                                    <h2 className="card-title"><b>Shipping Address</b></h2>

                                    <hr></hr>
                                    <div className=" row card-text">

                                        <div className="col-md-6">
                                            <label className="form_label">Address</label>
                                            <input className="form-control p_hold" type="text"
                                                onChange={addressHandler} value={address} />

                                            <label className="form_label mt-2">City</label>
                                            <input className="form-control p_hold" type="text"
                                                onChange={cityHandler} value={city} />

                                            <label className="form_label mt-2">Name</label>
                                            <input className="form-control p_hold" type="text"
                                                onChange={nameHandler} value={name} />

                                            <label className="form_label mt-2">Email</label>
                                            <input className="form-control p_hold" type="text"
                                                onChange={emailHandler} value={email} />

                                            <label className="form_label mt-2">Phone</label>
                                            <input className="form-control p_hold" type="text"
                                                onChange={phoneHandler} value={phone} />
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

                                                        <option key={state.id} value={state.id} selected={selectedState === state.id ? true : false}> {state.name} </option>

                                                    ))
                                                }
                                            </select>


                                            <label className="form_label mt-2">PIN</label>
                                            <input className="form-control p_hold" type="text"
                                                onChange={pinHandler} value={pin} />
                                        </div>

                                    </div>
                                    <Button className="mt-2 rounded-pill px-4" variant="outline-primary" onClick={placeOrder}>Save</Button>
                                    <hr></hr>
                                                                   

                                </div>
                            </div>
                        </FormWizard.TabContent>
                        <FormWizard.TabContent title="Process Payment" icon="ti-money">
                            <div className="card">
                                <div className="cardd-body">
                                <h2 className="card-title"><b>Process Payment</b></h2>

                                    <hr></hr>
                                    <Button className="mt-2 rounded-pill px-4" variant="outline-primary" onClick={handlePayment}>Place Order & Pay</Button>
                                        
                                </div>
                            </div>
                        </FormWizard.TabContent>
                        <FormWizard.TabContent title="Confirm Order" icon="ti-check">
                            <h3>Last Tab</h3>
                            <p>Some content for the last tab</p>
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
