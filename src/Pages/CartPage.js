import React, { useEffect, useState, } from "react";
import { useNavigate, Link } from 'react-router-dom';
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

import Config from "../Config/Config.json"
import TopBarSouthsore from "../Layout/TopBarSouthsore";
import NavBarSouthsore from "../Layout/NavBarSouthsore";
import FooterSouthsore from "../Layout/FooterSouthsore";
import ProfileTab from "../Layout/ProfileTab";
import Whatsapp from "../Layout/Whatsapp";



const CartPage = () => {

    const {
        authData,
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
        uuid } = useAuth()

    const { get_items, price, items, cart_items, applyCoupon } = UserProfile()
    const navigate = useNavigate();
    const [getcartitems, setGetcartitems] = useState([])
    // const [quanity, setQuantity] = useState()
    const [dependencyvar, setDependencyvar] = useState(false)
    const [wishlistshow, setWishlistshow] = useState(false)

    // const [count, setCount] = useState(1);
    // const [total, setTotal] = useState(1);
    // const [subtotal, setSubTotal] = useState(0)

    useEffect(() => {

        findSubtotal()

        console.log("cart items= ", cartItems)
    }, [cartCount])


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
        navigate('/productdetails', { state: { BOOK_ID: book_id } })
    }

    const removeCartItems = async (item) => {

        if (item["bookid"] === undefined)
            item.bookid = item.id
        item.deviceid = uuid
        // check before login
        if (authData === '' || authData === null || authData === undefined) {

            console.log("item to be removed= ", item)
            removeBookFromState(item.bookid)
        }
        // after login
        else {
            const response = await remove_cart_item(item, 0)
            console.log("response after removal= ", response)
        }
    }

    const proceedToCheckout = () => {
        if (authData === '' || authData === null || authData === undefined) {
            alert("Please Login to Buy!")
        }
        else {
            navigate("/billingaddress", { state:{buynow: 0} })

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
        if (authData === undefined || authData === "" || authData == null) {
            incrementQuantityFromState(item.bookid)
        }
        else {
            let json = {
                bookid: item.id,
                quantity: item["quantity"] + 1
            }
            const response = await incrementQuantity(json)
            console.log("response after increment= ", response)
        }


    };

    const decrement = async (item) => {
        if (authData === undefined || authData === "" || authData == null) {
            decrementQuantityFromState(item.bookid)
        }
        else {
            let json = {
                bookid: item.id,
                quantity: item["quantity"] - 1
            }
            if (item["quantity"] > 1) {
                const response = await decrementQuantity(json)
                console.log("response after decrement= ", response)

            }
            else {
                alert("you must have atleasst one quantity")

            }

        }
    };


    return (
        <div className="main-container">
            <div className="container">
                <TopBarSouthsore />
                <NavBarSouthsore />
                <ProfileTab />
                {/* {authData === null || authData === undefined || authData === "" ?(
                    <NavBarSouthsore />
                ) : (<ProfileTab/>)} */}


                <Whatsapp />

                {
                    cartItems.length === 0 &&
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
                                        className="btn btn-secondary view_all_books rounded-pill d-flex justify-content-center align-items-center py-2 pl_od_btn_w"
                                        onClick={() => { navigate('/') }}
                                        style={{ width: '20%' }}
                                    >
                                        Continue Shopping
                                    </button>
                                </div>

                            </div>

                        </div>
                    )
                }


                {
                    cartItems.length !== 0 &&
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

                                        {console.log('cart items', cartItems)}

                                        {

                                            cartItems.length > 0 && cartItems.map((data, index) => (


                                                <div key={index} className="book-card cart-page-border-bottom py-3">

                                                    <div className="book-img"
                                                        onClick={() => gotoDetails(wishlistshow === true ? data.id : data.my_book_id)}
                                                    >



                                                        <img src={data.image === null || data.image === '' ? dummy : Config.API_URL + Config.PUB_IMAGES + data.publisherid + "/" + data.image + '?d=' + new Date()} />




                                                    </div>
                                                    <div className="book-details">
                                                        <div className="book-heading">
                                                            <span className="book-title">{data.title !== null ? data.title : "Not Available"}</span>

                                                        </div>


                                                        <div className="details">Author: {data.authors !== null ? data.authors : "Not Found"}</div>

                                                        <div className="details">Publisher: <strong>{data.publisher !== null ? data.publisher : "Not Found"}</strong></div>
                                                        <div className="price-details">Price: <span className="price">₹{data.amount}</span></div>



                                                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '36px' }}>
                                                            <button
                                                                onClick={() => decrement(data)}
                                                                className="buttonStyle"
                                                            >-</button>
                                                            <input
                                                                type="text"
                                                                value={data["quantity"]}
                                                                readOnly
                                                                // style={{ width: '50px', textAlign: 'center' }}
                                                                className="inc_dec_input"
                                                            />
                                                            <button
                                                                onClick={() => increment(data)}
                                                                className="buttonStyle"
                                                            >+</button>
                                                        </div>
                                                        <div className="bottom-menu my-3">

                                                            <div className="action-btns">
                                                                <button className="remove-from-cart button-solid button_color" onClick={() => removeCartItems(data)}>Remove</button>
                                                            </div>
                                                        </div>
                                                    </div>



                                                </div>

                                            ))

                                        }

                                        <div className="subtotal">
                                            <span className="label">Total</span>
                                            <span className="qty">({cartCount} items)</span>
                                            <span className="price">₹{subTotal}</span>
                                        </div>

                                    </div>

                                </div>
                            </div>
                            <div className="col-md-3 mt-3">

                                <div className="d-flex justify-content-center mt-5">
                                    <button type="button" disabled={cartItems.length > 0 ? false : true}
                                        className="btn btn-primary view_all_books rounded-pill d-flex justify-content-center align-items-center py-2 pl_od_btn_w"
                                        onClick={proceedToCheckout}
                                    >
                                        Place Order
                                    </button>

                                </div>
                                <div className="d-flex justify-content-center mt-2">
                                    <button type="button"
                                        className="btn btn-outline-dark view_all_books rounded-pill d-flex justify-content-center align-items-center py-2 pl_od_btn_w"
                                        onClick={() => { navigate('/home') }}
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            </div>






                        </div>

                    )
                }


            </div>
            <FooterSouthsore />
        </div>
    );
}

export default CartPage