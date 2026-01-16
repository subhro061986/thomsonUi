import React, { useEffect, useState, } from "react";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import TopBar from "../Layout/TopBar";
import NavBar from "../Layout/NavBar";
import Footer from "../Layout/Footer";
import arrow_left from "../Assets/Images/arrow-left.png";
import lion_king from "../Assets/Images/lion-king.png";
import do_it_today from "../Assets/Images/do-it-today.png";
import love_hypothesis from "../Assets/Images/love-hypothesis.png";
import emptycart from "../Assets/Images/emptycart.png";
import dummy from "../Assets/Images/dummy.png";
import { useAuth } from '../Context/Authcontext';
import { UserProfile } from "../Context/Usercontext"
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import admin_logo from "../Assets/Images/logoo.svg";
import Config from "../Config/Config.json"
import TopBarSouthsore from "../Layout/TopBarSouthsore";
import NavBarSouthsore from "../Layout/NavBarSouthsore";
import FooterSouthsore from "../Layout/FooterSouthsore";
import ProfileTab from "../Layout/ProfileTab";
import Whatsapp from "../Layout/Whatsapp";
import { set } from "store";
import useRazorpay from "react-razorpay";



const CartPage = () => {
    const location = useLocation()
    const {
        authData,
        authRole,
        getCartData,
        cartItems,
        cartCount,
        remove_cart_item,
        removeBookFromState,
        clearCartStorage,
        decrementQuantityFromState,
        incrementQuantityFromState,
        incrementQuantity,
        decrementQuantity,
        subTotal,
        findSubtotal,
        add_cart_item,
        clear_cart_items,
        uuid } = useAuth()

    const { get_items, price, items, cart_items, applyCoupon,
        get_country_list, get_state_list, Send_OTP_By_Email,
        Validate_Guest, Guest_Details,
        createAppOrderGuest, createRazorpayOrderGuest, processPayment, guestToken, processPaymentGuest } = UserProfile()
    const [Razorpay] = useRazorpay();
    const navigate = useNavigate();
    const [getcartitems, setGetcartitems] = useState(cartItems)
    // const [quanity, setQuantity] = useState()
    const [dependencyvar, setDependencyvar] = useState(false)
    const [wishlistshow, setWishlistshow] = useState(false)
    const [prevButtonDisable, setPrevButtonDisable] = useState(false)

    // const [count, setCount] = useState(1);
    const [total, setTotal] = useState(0);
    const [inputNum, setInputNum] = useState(0);
    const [inputData, setInputData] = useState({});
    // const [subtotal, setSubTotal] = useState(0)

    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [stateValue, setStateValue] = useState("");   // renamed because "state" is reserved
    const [country, setCountry] = useState("");
    const [pin, setPin] = useState("");
    const [address, setAddress] = useState("");
    const [guestEmail, setGuestEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [countryList, setCountryList] = useState([])
    const [stateList, setStateList] = useState([])
    const [billingAddressId, setBillingAddressId] = useState(0)
    const [shippingAddressId, setShippingAddressId] = useState(0)
    const [buyNow, setBuyNow] = useState(0)
    const [placeOrderResponse, setPlaceOrderResponse] = useState({})
    const [orderTotal, setOrderTotal] = useState(0)
    const [roleValidation, setRoleValidation] = useState(0)


    useEffect(() => {
        console.log("cart items in cart page useeffect", cartItems)
        if (cartItems.length > 0) {
            setGetcartitems(cartItems)
        }
        else {
            setGetcartitems([])
        }

        //setTotal(subTotal)
        //findSubtotal()
        getSubTotalFrmContext()
    }, [cartItems])

    useEffect(() => {
        
    }, [authData])

    useEffect(() => {
        renderCountryList()
        
    }, [guestToken]);

    useEffect(() => {
        setBuyNow(location?.state?.buynow)
    }, [location?.state?.buynow])

    const getSubTotalFrmContext = async () => {
        const resp = findSubtotal()
        setTotal(resp)
    }

    const addInput = () => {
        setInputNum(inputNum + 1);
    }


    // const findSubtotal = () => {
    //     console.log("inside cart")
    //     let subtotal = 0;
    //     if (cartItems.length > 0) {
    //         cartItems.map((data, index) => {
    //             if(typeof(data.price) === 'string'){
    //                 subtotal = subtotal + (parseFloat(data.price.replace(/,/g, '') * data['quantity']))
    //             }else {
    //                 subtotal = subtotal + (data.price * data['quantity'])

    //             }

    //         })

    //         console.log("subtotal function=", subtotal)
    //         setSubTotal(subtotal)

    //     } else {
    //         setSubTotal(0)
    //     }

    // }
    // const get_cart_items = async () => {

    //     console.log("Cart_UUID :", uuid)


    //     if (wishlistshow === false) {
    //         setGetcartitems(JSON.parse(localStorage.getItem("cart_data")) || [])
    //     }
    //     else {

    //         let json = {

    //             deviceid: uuid
    //             // "9E7C1A59-7473-405F-81A7-11E25C70F0AC"
    //         }

    //         GetcartItems_signin(json)

    //     }


    // }

    // const GetcartItems_signin = async (json) => {

    //     const resp = await cart_items(json)
    //     console.log("cart_resp", resp)
    //     if (resp === undefined || resp === null) {
    //         setGetcartitems([])
    //     }
    //     else {
    //         if (resp.output.length > 0) {
    //             setGetcartitems(resp.output)
    //         }
    //         else (
    //             setGetcartitems([])
    //         )

    //     }


    // }




    const gotoDetails = (book_id) => {
        console.log("book id from cart", book_id)
        // navigate('/productdetails', { state: { BOOK_ID: book_id } })
        navigate('/productdetails?bookid=' + book_id)
    }

    const removeCartItems = async (item, index) => {

        let tempArr = getcartitems
        tempArr.splice(index, 1)
        let tot = 0
        tempArr.map((data, index) => {
            tot = tot + data.amount
        })
        setGetcartitems([...tempArr])
        setTotal(tot)

        if (item["bookid"] === undefined)
            item.bookid = item.id
        item.deviceid = uuid
        // check before login
        if (authData === '' || authData === null || authData === undefined) {

            // console.log("item to be removed= ", item)
            removeBookFromState(item.bookid)
        }
        // after login
        else {
            const response = await remove_cart_item(item, 0)
            // console.log("response after removal= ", response)
        }

    }

    const proceedToCheckout = () => {
        if (authData === '' || authData === null || authData === undefined) {
            alert("We request you to sign in to / create an account to enable a seamless buying experience.")
        }
        else {
            navigate("/billingaddress", { state: { buynow: 0 } })

        }
    }
    // const applyCouponCode = async () => {
    //     let json = {
    //         couponcode: coupon
    //     }
    //     // ... applycoupon api endpoint here
    //     const res = await applyCoupon(json)
    //     console.log(res)
    // }

    const increment = async (item) => {
        console.log("increment item=", item)
        let tempArr = getcartitems
        let index = -1

        if (authData === undefined || authData === "" || authData == null) {
            console.log("item in increment in if part", item)
            index = tempArr.findIndex((val, i) => {
                return val.bookid === item.bookid
            });

            incrementQuantityFromState(item.bookid)
        }
        else {
            
            index = tempArr.findIndex((val, i) => {
                return val.id === item.id
            });


            let json = {
                bookid: item.id,
                quantity: parseInt(item["quantity"]) + 1
            }
            const response = await incrementQuantity(json)
            // console.log("response after increment= ", response)
        }

        let qty = parseInt(tempArr[index]["quantity"]) + 1

        let price = 0
        if (authRole === "Distributor") {
            price = tempArr[index]["distributorprice"] * qty
        }
        else {
            price = tempArr[index]["customerprice"] * qty
        }

        tempArr[index]["quantity"] = qty
        tempArr[index]["amount"] = price
        let tot = 0
        tempArr.map((data, index) => {
            tot = tot + data.amount
        })
        setGetcartitems([...tempArr])
        setTotal(tot)
    };

    const decrement = async (item) => {
        setPrevButtonDisable(true)
        if (item["quantity"] > 1) {
            
            let tempArr = getcartitems
            let index = -1
            if (authData === undefined || authData === "" || authData == null) {
                index = tempArr.findIndex((val, i) => {
                    return val.bookid === item.bookid
                });
                decrementQuantityFromState(item.bookid)
                setPrevButtonDisable(false)
            }
            else {
                index = tempArr.findIndex((val, i) => {
                    return val.id === item.id
                });
                let json = {
                    bookid: item.id,
                    quantity: item["quantity"] - 1
                }

                const response = await decrementQuantity(json)
                setPrevButtonDisable(false)
                // console.log("response after decrement= ", response)

            }




            let qty = tempArr[index]["quantity"] - 1
            let price = 0
            if (authRole === "Distributor") {
                price = tempArr[index]["distributorprice"] * qty
            }
            else {
                price = tempArr[index]["customerprice"] * qty
            }

            // let price = tempArr[index]["amount"] - tempArr[index]["price"]
            tempArr[index]["quantity"] = qty
            tempArr[index]["amount"] = price

            let tot = 0
            tempArr.map((data, index) => {
                tot = tot + data.amount
            })
            setGetcartitems([...tempArr])
            setTotal(tot)
        }
        else {
            alert("you must have atleasst one quantity")

        }
    };

    const handleKeyPress = async (e, item, index) => {

        if (e.key === 'Enter') {
            if (parseInt(e.target.value) <= 0 || e.target.value === '') {
                alert("Please enter valid qauntity")
            }
            else {
                if (isNaN(parseInt(e.target.value))) {
                    alert("Please enter valid qauntity")
                }
                else {
                    
                    let tempArr = getcartitems
                    let json = {
                        bookid: item.id,
                        quantity: item["quantity"]
                    }

                    const response = await incrementQuantity(json)
                    let qty = tempArr[index]["quantity"]
                    let price = 0
                    if (authRole === "Distributor") {
                        price = tempArr[index]["distributorprice"] * qty
                    }
                    else {
                        price = tempArr[index]["customerprice"] * qty
                    }

                    tempArr[index]["quantity"] = qty
                    tempArr[index]["amount"] = price
                    let tot = 0
                    tempArr.map((data, index) => {
                        tot = tot + data.amount
                    })
                    setGetcartitems([...tempArr])
                    setTotal(tot)
                }

            }
        }
        else {
            console.log("ITS NOT ENTER")
            //API CALL AFTER QUANTITY CHANGE

        }
    }
    const enterValue = (e, item, index) => {
        if (parseInt(e.target.value) <= 0) {
            alert("Please enter valid qauntity")
        }
        else {
            if (e.target.value === '') {
                let tempCartItems = getcartitems
                tempCartItems[index]["quantity"] = e.target.value
                setGetcartitems([...tempCartItems])
            }
            else {
                let tempCartItems = getcartitems
                tempCartItems[index]["quantity"] = e.target.value
                setGetcartitems([...tempCartItems])
            }

        }


    }

    const resetGuestFlow = () => {
        setStep(1);
        setGuestEmail("");
        setOtp("");
        setName("");
        setPhone("");
        setCity("");
        setAddress("");
        setPin("");
        setCountry("");
        setStateValue("");
    };

    const openModal = () => {
        resetGuestFlow();
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
        resetGuestFlow();
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

    const countryHandler = async (e) => {
        renderStateList(e.target.value)
        setCountry(e.target.value)
    }

    const stateHandler = (e) => {
        setStateValue(e.target.value)
    }

    const renderStateList = async (countyId) => {
        try {
            // console.log("inside statelist")
            const resp = await get_state_list(countyId)
            setStateList(resp.output)
            console.log("getStateList= 123", resp.output)
        } catch (err) {
            console.error(err);
        }
    }

    const sendOtp = async () => {
        if (!guestEmail.includes("@")) {
            alert("Enter a valid email");
            return;
        }

        setLoading(true);

        try {
            // API: send OTP
            // const emailjson = {
            //     "email": guestEmail
            // }
            const resp = await Send_OTP_By_Email(guestEmail)
            console.log("OTP response: ", resp)
            alert(resp?.data?.message + " to " + guestEmail);
            setStep(2);
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async () => {
        setLoading(true);

        try {
            const resp = await Validate_Guest(guestEmail, otp);
            console.log("Validate OTP response:", resp);

            const data = resp?.data?.output;

            if (!data) {
                alert("Invalid OTP");
                return;
            }

            // ✅ Autofill form fields
            setRoleValidation(data.role || 0);
            setName(data.name || "");
            setGuestEmail(data.email || guestEmail);
            setCity(data.city || "");
            setAddress(data.streetaddress || "");
            setPin(data.pincode || "");
            setPhone(data.contactno || "");

            // ✅ Set country & load states
            setCountry(data.countryid || "");
            await renderStateList(data.countryid);

            // ✅ Set state AFTER states are loaded
            setStateValue(data.stateid || "");

            setStep(3);
        } catch (err) {
            alert("OTP validation failed");
        } finally {
            setLoading(false);
        }
    };


    const submit_payment = async (token_guest) => {
        console.log("guest token in submit form", token_guest)
        const addguest = {
            name: name,
            contactno: phone,
            email: guestEmail,
            billingstreetaddress: address,
            billingcity: city,
            billingpincode: pin,
            billingstateid: stateValue,
            billingcountryid: country,
            shippingstreetaddress: address,
            shippingcity: city,
            shippingpincode: pin,
            shippingstateid: stateValue,
            shippingcountryid: country
        }


        // console.log(finalData);

        // API call here
        const resp = await Guest_Details(addguest)
        console.log("Guest Details response:", resp);
        setBillingAddressId(resp?.data?.billingid)
        setShippingAddressId(resp?.data?.shippingid)
        const temp_billingaddressid = resp?.data?.billingid
        const temp_shippingaddressid = resp?.data?.shippingid
        localStorage.setItem("token", resp?.data?.token)
        // let cartData = localStorage.getItem("cartData")
        //     ? JSON.parse(localStorage.getItem("cartData"))
        //     : [];
        let cartData = cartItems
            ? cartItems
            : [];
        console.log("cart data from local storage in guest checkout:", cartData);
        const clear_resp = await clear_cart_items();
        console.log("Clear cart resp:", clear_resp);
        let send_guest_token = resp?.data?.token
        cartData.forEach(async (item,send_guest_token) => {
            console.log("item to be added to cart from guest cart data:", item);
            let json_data = {
                bookid: item.bookid,
                deviceid: uuid,
                quantity: item.quantity || 1
            };

            const resp = await add_cart_item(json_data, send_guest_token);
            console.log("Add to cart resp in if:", resp)

        });

        // const addToCart = await 
        // alert(resp?.data?.message);
        // if(resp?.data?.message === "Information saved successfully."){
        // closeModal();
        // }
        let placeorderJson = {
            billingaddressid: temp_billingaddressid,
            shippingaddressid: temp_shippingaddressid
        }
        // let buynow = 0
        const respPlaceOrder = await createAppOrderGuest(buyNow, placeorderJson, resp?.data?.token)
        console.log("respPlaceOrder=", respPlaceOrder)

        if (respPlaceOrder === undefined || respPlaceOrder === "undefined") {
            alert("Please try again.")
        }
        else {

            closeModal();

            const processPaymentSuccess = async (respPlaceOrder, data) => {
                const newData = {
                    ...data,
                    transactiondate: respPlaceOrder.output.orderdate,
                    orderno: respPlaceOrder.output.orderno,
                    orderid: respPlaceOrder.output.id,
                    success: 1
                }

                var respPaymentConfirmed = await processPaymentGuest(newData,resp?.data?.token)
                console.log("resp confirmed= ", respPaymentConfirmed)
                if (respPaymentConfirmed['statuscode'] === "0") {
                    navigate('/confirmorder')

                }
                else {
                    alert("Could not process payment correctly")
                }
            }
            const processPaymentFailed = async (respPlaceOrder, data) => {
                const newData = {
                    ...data,
                    transactiondate: respPlaceOrder.output.orderdate,
                    orderno: respPlaceOrder.output.orderno,
                    orderid: respPlaceOrder.output.id,
                    success: 0
                }

                var respPaymeontFailed = await processPaymentGuest(newData,resp?.data?.token)
                console.log("respPaymeontFailed= ", respPaymeontFailed)
            }
            
            // setPlaceOrderResponse(respPlaceOrder)
            // setOrderTotal(respPlaceOrder.output.totalAmount)
            const amount = parseInt(respPlaceOrder?.output?.totalAmount * 100)
            let order_params = {
                amount: amount,
                currency: respPlaceOrder.output.currencyisocode,
                orderno: respPlaceOrder.output.orderno,
                orderid: respPlaceOrder.output.id

            }
            const order = await createRazorpayOrderGuest(order_params,resp?.data?.token); //  Create order on your backend
            console.log("order response= ", order)
            if (order !== undefined) {

                const options = {
                    //  key: Config.RAZORPAY_LIVE_KEY, // Enter the Key ID generated from the Dashboard
                    //    key: Config.RAZORPAY_TEST_KEY, // Enter the Key ID generated from the Dashboard
                    key: 'rzp_live_gXUYrgWkg9i2Fl', // Enter the Key ID generated from the Dashboard
                    amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                    currency: "INR",
                    name: "Southshore Innovations Pvt Ltd",
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
                            processPaymentSuccess(respPlaceOrder, {
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
                        email: guestEmail,
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
                    // alert(response.error.source);
                    // alert(response.error.step);
                    // alert(response.error.reason);
                    // alert(response.error.metadata.order_id);
                    // alert(response.error.metadata.payment_id);


                    processPaymentFailed(respPlaceOrder, {
                        "paymentid": "",
                        "razorpay_orderid": order.order_id,
                        "payment_signature": response.razorpay_signature,
                        "transactionamount": order.amount,
                        // "currency" :"INR"

                    })
                });
                rzp1.on("payment.captured", function (response) {
                    console.log("payment successfulb response= ", response)
                    // placeOrder()
                });

                rzp1.open();
            }
        }
    };





    return (
        <>
            <div className="main-container">

                <div className="container">
                    <TopBar />
                    <NavBarSouthsore />
                    {authData !== "" &&
                        <ProfileTab />
                    }
                    {/* {authData === null || authData === undefined || authData === "" ?(
                    <NavBarSouthsore />
                ) : (<ProfileTab/>)} */}


                    <Whatsapp />

                    {
                        getcartitems.length === 0 &&
                        (
                            <div className="my-5 py-5 px-5">
                                <div className="row mb-5">
                                    <div className="col-md-12 d-flex justify-content-center align-items-center empty_txt">
                                        <img src={emptycart} />
                                    </div>
                                </div>
                                <div className="row mb-5">

                                    <div className="col-md-12 d-flex justify-content-center align-items-center empty_txt">

                                        Your cart is empty
                                    </div>

                                    <div className="d-flex justify-content-center mt-5">
                                        <button type="button"
                                            className="btn btn-outline-dark view_all_books rounded-pill d-flex justify-content-center align-items-center py-2 continue_tn_empty_cart"
                                            onClick={() => { navigate('/') }}
                                        // style={{ width: '20%' }}
                                        >
                                            Continue Shopping
                                        </button>
                                    </div>


                                </div>

                            </div>
                        )
                    }


                    {
                        getcartitems.length > 0 &&
                        (

                            <div className="row cartpage_div">
                                <div className="col-md-9 px_0">

                                    <div className=" cart-page">
                                        <div className="order-list">
                                            <div
                                                className="header"
                                            // cart-page-border-bottom 
                                            >
                                                <h2>My Cart</h2>

                                            </div>

                                            <div className="secondary-header cart-page-border-bottom pb-2">
                                                Product Details
                                            </div>



                                            {

                                                getcartitems.length > 0 && getcartitems.map((data, index) => (


                                                    <div key={index} className="book-card cart-page-border-bottom py-3">

                                                        <div className="book-img"
                                                            onClick={() => gotoDetails(authData === '' ? data.bookid : data.id)}
                                                        >



                                                            <img
                                                                // src={ dummy }
                                                                src={data.img === null || data.img === '' ? dummy : Config.API_URL + Config.PUB_IMAGES + data.publisherid + "/" + data.img + '?d=' + new Date()}
                                                                className="mx-2 my-2"
                                                            />




                                                        </div>
                                                        <div className="book-details">
                                                            <div className="book-heading">
                                                                <span className="book-title">{data.title !== null ? data.title : "Not Available"}</span>

                                                            </div>


                                                            <div className="details">Author: {data.authors !== null ? data.authors : "Not Found"}</div>

                                                            <div className="details">Publisher: <strong>{data.publisher !== null ? data.publisher : "Not Found"}</strong></div>
                                                            <div className="price-details">Price: <span className="price">
                                                                {data.symbol}&nbsp;
                                                                {data.amount}
                                                                {/* {authData === '' || authData === null ? data.price : authRole === 'Distributor' ? data.distributorprice : data.customerprice} */}
                                                            </span></div>


                                                            {/* <div className="mb-3">Quantity</div> */}
                                                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '36px' }}>
                                                                <button
                                                                    onClick={() => decrement(data)}
                                                                    //className="buttonStyle"
                                                                    className="btn btn-outline-secondary"
                                                                    disabled={(data["quantity"] <= 1) || prevButtonDisable}
                                                                >-</button>
                                                                <input
                                                                    type="text"
                                                                    value={data["quantity"]}
                                                                    //readOnly
                                                                    // style={{ width: '50px', textAlign: 'center' }}
                                                                    //className="inc_dec_input"
                                                                    className="form-control text-center mx-3 quantity_inp_cart"
                                                                    onChange={(e) => enterValue(e, data, index)}
                                                                    onKeyPress={(e) => handleKeyPress(e, data, index)}
                                                                />
                                                                <button
                                                                    onClick={() => increment(data)}
                                                                    //className="buttonStyle"
                                                                    className="btn btn-outline-secondary"
                                                                >+</button>
                                                            </div>
                                                            <div className="bottom-menu my-3">

                                                                <div className="action-btns">
                                                                    <button className="remove-from-cart button-solid button_color" onClick={() => removeCartItems(data, index)}>Remove</button>
                                                                </div>
                                                            </div>
                                                        </div>



                                                    </div>

                                                ))

                                            }

                                            <div className="subtotal">
                                                <span className="label">Total</span>
                                                <span className="qty">({getcartitems.length} items) :</span>
                                                {/* <span className="price">₹{subTotal}</span> */}
                                                <span className="price">₹{total}</span>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                                <div className="col-md-3 mt-3">

                                    <div className="d-flex justify-content-center mt-5">
                                        <button type="button" disabled={cartItems.length > 0 ? false : true}
                                            className={authData===''?
                                            "btn btn-outline-dark view_all_books rounded-pill d-flex justify-content-center align-items-center py-2 pl_od_btn_w"
                                            :
                                            "btn btn-primary view_all_books rounded-pill d-flex justify-content-center align-items-center py-2 pl_od_btn_w"
                                            }
                                            onClick={proceedToCheckout}
                                        >
                                            Place Order
                                        </button>

                                    </div>
                                    <div className="d-flex justify-content-center mt-3">
                                        <button type="button"
                                            className="btn btn-outline-dark view_all_books rounded-pill d-flex justify-content-center align-items-center py-2 pl_od_btn_w"
                                            onClick={() => { navigate('/') }}
                                        >
                                            Continue Shopping
                                        </button>
                                    </div>
                                    {authData === '' && (
                                        <div className="d-flex justify-content-center mt-3">
                                            <button type="button"
                                                className="btn btn-primary view_all_books rounded-pill d-flex justify-content-center align-items-center py-2 pl_od_btn_w"
                                                onClick={openModal}
                                            >
                                                Continue As Guest
                                            </button>
                                        </div>
                                    )}
                                </div>






                            </div>

                        )
                    }


                </div>
                <FooterSouthsore />
            </div>
            <Modal
                show={showModal}
                onHide={closeModal}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {step === 1 && "Continue as Guest"}
                        {step === 2 && "Verify OTP"}
                        {step === 3 && roleValidation!==3 && "Enter Address" || ''}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    {/* STEP 1 : EMAIL */}
                    {step === 1 && (
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={guestEmail}
                                onChange={(e) => setGuestEmail(e.target.value)}
                            />
                        </div>
                    )}

                    {/* STEP 2 : OTP */}
                    {step === 2 && (
                        <div className="mb-3">
                            <label className="form-label">Enter OTP</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>
                    )}

                    {/* STEP 3 : FULL FORM */}
                    {step === 3 && (
                        roleValidation===3 ?(
                            <div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        This email is registered as a Distributor. 
                                        Please try in with different email.
                                        Or Sign in to continue.
                                    </label>
                                </div>
                            </div>
                        ) : (
                        <div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={guestEmail}
                                    readOnly
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Phone Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form_label ">Country</label>
                                <select
                                    className="form-control p_hold"
                                    onChange={countryHandler}
                                    value={country}
                                >

                                    <option disabled value=""> Please Select</option>

                                    {
                                        countryList.map((countries, index) => (

                                            <option
                                                key={countries.id}
                                                value={countries.id}
                                            >
                                                {countries.name}
                                            </option>

                                        ))
                                    }

                                </select>
                            </div>

                            <div className="mb-3">
                                {/* <label className="form-label">State</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={stateValue}
                                    onChange={(e) => setStateValue(e.target.value)}
                                /> */}
                                <label className="form_label mt-2">State</label>
                                <select className="form-control p_hold"
                                    onChange={stateHandler}
                                    value={stateValue}

                                >

                                    <option value=""> Please Select</option>

                                    {
                                        stateList.map((state, index) => (

                                            <option key={index} value={state.id}
                                            //selected={selectedState === state.id ? true : false} 
                                            > {state.name} </option>

                                        ))
                                    }
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">City</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Address</label>
                                <textarea
                                    className="form-control"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Pin</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                />
                            </div>
                        </div>
                        )
                    )}
                </Modal.Body>

                <Modal.Footer>

                    {step === 1 && (
                        <button
                            className="btn btn-main"
                            style={{ width: "40%" }}
                            disabled={loading}
                            onClick={sendOtp}
                        >
                            {loading ? "Sending..." : "Send OTP"}
                        </button>
                    )}

                    {step === 2 && (
                        <button
                            className="btn btn-success"
                            style={{ width: "40%" }}
                            disabled={loading}
                            onClick={verifyOtp}
                        >
                            {loading ? "Validating..." : "Validate"}
                        </button>
                    )}

                    {step === 3 && (
                    roleValidation!==3 && 
                        <button
                            className="btn btn-primary"
                            style={{ width: "40%" }}
                            onClick={() => submit_payment(guestToken)}
                        >
                            Payment
                        </button>
                    )}

                </Modal.Footer>
            </Modal>


        </>
    );
}

export default CartPage