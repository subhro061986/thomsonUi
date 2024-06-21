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
        uuid } = useAuth()

    const { get_items, price, items, cart_items, applyCoupon } = UserProfile()
    const navigate = useNavigate();
    const [getcartitems, setGetcartitems] = useState([])
    // const [quanity, setQuantity] = useState()
    const [dependencyvar, setDependencyvar] = useState(false)
    // const [coupon, setCoupon] = useState('')

    const [count, setCount] = useState(1);
    const [total, setTotal] = useState(1);
    const [subtotal, setSubTotal] = useState(0)

    useEffect(() => {
        // clearCartStorage()

        if (cartCount == 0) {
            setSubTotal(0)
        }
        else {
            findSubtotal()

        }
        console.log("cart items= ", cartItems)
    }, [cartCount])


    const findSubtotal = () => {
        let subtotal = 0;
        if (cartItems.length > 0) {
            cartItems.map((data, index) => {
                subtotal = subtotal + data.price
            })

            console.log("subtotal function=", subtotal)
            setSubTotal(subtotal)

        } else {
            setSubTotal(0)
        }

    }
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

        console.log("Data to be removed= ", cartItems)
        if (item["bookid"] === undefined)
            item.bookid = item.id
        item.deviceid = uuid
        // check before login
        if (authData === '' || authData === null || authData === undefined) {

            console.log("item to be removed= ", item)
            removeBookFromState()
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
            navigate("/billingAddress", { buynow: 0 })

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

    const increment = () => {
        setCount(count + 1);
        setTotal(total + 1);
    };

    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
            setTotal(total - 1);
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
                                        className="btn btn-primary view_all_books rounded-pill d-flex justify-content-center align-items-center py-2 pl_od_btn_w"
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
                                        <div className="header cart-page-border-bottom py-2">
                                            <h2>My Cart</h2>

                                            {/* <Link to="/home" style={{ textDecoration: 'none' }}>

                                                <span className="back-to-home cursor-pointer" ><img src={arrow_left} /> Back to home</span>

                                            </Link> */}

                                        </div>

                                        <div className="secondary-header cart-page-border-bottom py-2">
                                            Product Details
                                        </div>

                                        {console.log('cart items', cartItems)}

                                        {

                                            cartItems.length > 0 && cartItems.map((data, index) => (
                                                <div>{data}</div>

                                                // <div key={index} className="book-card cart-page-border-bottom py-3">
                                                //     {/* {console.log("cartdata",data)} */}
                                                //     <div className="book-img"
                                                //         onClick={() => gotoDetails(wishlistshow === true ? data.id : data.my_book_id)}
                                                //     >

                                                //         {

                                                //             wishlistshow === true ? (<img src={data.image === null || data.image === '' ? dummy : Config.API_URL + Config.PUB_IMAGES + data.publisherid + "/" + data.image + '?d=' + new Date()} />)
                                                //                 : (<img src={data.image === null || data.image === '' ? dummy : Config.API_URL + Config.PUB_IMAGES + data.publisherid + "/" + data.image + '?d=' + new Date()} />)
                                                //         }



                                                //     </div>
                                                //     <div className="book-details">
                                                //         <div className="book-heading">
                                                //             <span className="book-title">{data.title !== null ? data.title : "Not Available"}</span>

                                                //         </div>

                                                //         {wishlistshow === true ?
                                                //             (<div className="details">Author: {data.authors !== null ? data.authors : "Not Found"}</div>) : (
                                                //                 <div className="details">Author: {data.author !== null ? data.author : "Not Found"}</div>
                                                //             )}
                                                //         <div className="details">Publisher: <strong>{data.publisher !== null ? data.publisher : "Not Found"}</strong></div>
                                                //         <div className="price-details">Price: <span className="price">₹{data.price}</span></div>

                                                //         {/* increment decrement button */}

                                                //         <div style={{ display: 'flex', alignItems: 'center', marginTop:'36px' }}>
                                                //             <button
                                                //             onClick={decrement} 
                                                //             className="buttonStyle"
                                                //             >-</button>
                                                //             <input
                                                //                 type="text"
                                                //                 value={count}
                                                //                 readOnly
                                                //                 style={{ width: '50px', textAlign: 'center' }}
                                                //             />
                                                //             <button
                                                //             onClick={increment} 
                                                //             className="buttonStyle"
                                                //             >+</button>
                                                //         </div>
                                                //         <div className="bottom-menu my-3">

                                                //             <div className="action-btns">


                                                //                 {/* <span className="save-for-later">Save for later</span> */}

                                                //                 {
                                                //                     wishlistshow === true ? (<button className="remove-from-cart button-solid button_color" onClick={() => removeCartItems(data.id)}>Remove</button>)
                                                //                         : (<button className="remove-from-cart button-solid button_color" onClick={() => removeCartItems(data.my_book_id)}>Remove</button>)
                                                //                 }

                                                //             </div>
                                                //         </div>
                                                //     </div>



                                                // </div>

                                            ))

                                        }

                                        <div className="subtotal">
                                            <span className="label">Total</span>
                                            <span className="qty">({items} items)</span>
                                            <span className="price">₹{price}</span>
                                        </div>

                                    </div>

                                </div>
                            </div>
                            <div className="col-md-3 mt-3">
                                {/* <h3 className="applyCouponSection ms-3"><b>Apply Coupon</b></h3>
                                <hr></hr>
                                
                                    {authData!==""?(
                                            <input placeholder="Insert Coupon Code" className="form-control p_hold mb-4" type="text" onChange={handleSetCoupon} />
                                        ):(
                                            <h6>Please Login for apply coupon code</h6>
                                        )
                                        
                                    }
                                    {authData!=="" &&
                                        <Button variant="outline-primary" onClick={applyCouponCode}> Apply Coupon </Button>
                                    }
                                
                                <hr></hr> */}
                                <div className="d-flex justify-content-center mt-5">
                                    <button type="button" disabled={cartItems.length > 0 ? false : true}
                                        className="btn btn-primary view_all_books rounded-pill d-flex justify-content-center align-items-center py-2 pl_od_btn_w"
                                        onClick={proceedToCheckout}
                                    // style={{ width: '30%' }}
                                    >
                                        Place Order
                                    </button>

                                </div>
                                <div className="d-flex justify-content-center mt-2">
                                    <button type="button"
                                        className="btn btn-outline-primary view_all_books rounded-pill d-flex justify-content-center align-items-center py-2 pl_od_btn_w"
                                        onClick={() => { navigate('/home') }}
                                    //style={{ width: '30%' }}
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