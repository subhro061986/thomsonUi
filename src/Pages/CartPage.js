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

    const { wishlistshow, uuid, authData } = useAuth()

    const { get_items, price, items, cart_items, remove_cart_item, applyCoupon } = UserProfile()
    const navigate = useNavigate();
    const [getcartitems, setGetcartitems] = useState([])
    // const [quanity, setQuantity] = useState()
    const [dependencyvar, setDependencyvar] = useState(false)
    // const [coupon, setCoupon] = useState('')


    useEffect(() => {
        console.log("AUTH DATA ",authData)
        get_cart_items()


    }, [dependencyvar])



    const get_cart_items = async () => {

        console.log("Cart_UUID :", uuid)

        console.log("Cart_wishlistshow_bool ", wishlistshow)

        if (wishlistshow === false) {
            setGetcartitems(JSON.parse(localStorage.getItem("cart_data")) || [])
        }
        else {

            let json = {

                deviceid: uuid
                // "9E7C1A59-7473-405F-81A7-11E25C70F0AC"
            }

            GetcartItems_signin(json)

        }


    }

    const GetcartItems_signin = async (json) => {

        const resp = await cart_items(json)
        console.log("cart_resp", resp)
        if (resp === undefined || resp === null) {
            setGetcartitems([])
        }
        else {
            if (resp.output.length > 0) {
                setGetcartitems(resp.output)
            }
            else (
                setGetcartitems([])
            )

        }


    }

    // const handleSetCoupon = (e) => {
    //     setCoupon(e.target.value)
    // }


    const gotoDetails = (book_id) => {
        navigate('/productdetails', { state: { BOOK_ID: book_id } })
    }




    const Remove_Cart_Item = async (book_id) => {
        console.log("remove", book_id)

        if (wishlistshow === true) {
            let remove_json = {
                deviceid: uuid,
                // "9E7C1A59-7473-405F-81A7-11E25C70F0AC",
                bookid: book_id
            }

            console.log("Remove_json ", remove_json)

            const resp = await remove_item(remove_json)
            console.log("Remove_cart :", resp)
            await get_cart_items()
        }
        else {
            let is_book_exists = getcartitems.find((val) => val.my_book_id === book_id)
            if (is_book_exists !== undefined) {



                let localstorage_array = [...getcartitems]
                let arr_index = getcartitems.indexOf(is_book_exists)
                // console.log("index", arr_index)

                localstorage_array.splice(arr_index, 1)
                localStorage.setItem("cart_data", JSON.stringify(localstorage_array))
                // console.log("localarray_after_remove :", JSON.parse(localStorage.getItem("cart_data")))
                setDependencyvar(!dependencyvar)
                get_items()
            }
        }


    }



    const remove_item = async (remove_json) => {
        const resp = await remove_cart_item(remove_json)
    }



    const Proceed_to_Checkout = async () => {

        if (wishlistshow === true) {
            // let checkoutPrice=parseInt(price *100)
            // console.log('checkout price= ',checkoutPrice)
            // let pageData={
            //     cartItems:getcartitems,
            //     total_price:checkoutPrice.toString(),
            // }
            // console.log("get cart items",getcartitems)
            // * Something here ......
            // navigate('/billingaddress',{state:{pageData:pageData}})
            navigate('/billingaddress',{state:{buynow:0}})
        }
        else {
            navigate("/login")
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


    return (
        <div className="main-container">
            <div className="container">
                <TopBarSouthsore />
                <NavBarSouthsore />
                <ProfileTab/>
                {/* {authData === null || authData === undefined || authData === "" ?(
                    <NavBarSouthsore />
                ) : (<ProfileTab/>)} */}
                
                
                <Whatsapp/>

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
                                            className="btn btn-primary view_all_books rounded-pill d-flex justify-content-center align-items-center py-2 pl_od_btn_w"
                                            onClick={()=>{navigate('/')}}
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
                    getcartitems.length !== 0 &&
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

                                            {console.log('cart items',getcartitems)}

                                        {

                                            getcartitems.length > 0 && getcartitems.map((data, index) => (

                                                
                                                <div key={index} className="book-card cart-page-border-bottom py-3">
                                                    {/* {console.log("cartdata",data)} */}
                                                    <div className="book-img"
                                                        onClick={() => gotoDetails(wishlistshow === true ? data.id : data.my_book_id)}
                                                    >

                                                        {
                                                            
                                                            wishlistshow === true ? (  <img src={data.image === null || data.image === '' ? dummy : Config.API_URL + Config.PUB_IMAGES + data.publisherid + "/" + data.image + '?d=' + new Date()}/>)
                                                                : (<img src={data.image === null || data.image === '' ? dummy : Config.API_URL + Config.PUB_IMAGES + data.publisherid + "/" + data.image + '?d=' + new Date()} />)
                                                        }



                                                    </div>
                                                    <div className="book-details">
                                                        <div className="book-heading">
                                                            <span className="book-title">{data.title !== null ? data.title : "Not Available"}</span>

                                                        </div>

                                                        {wishlistshow === true ?
                                                            (<div className="details">Author: {data.authors !== null ? data.authors : "Not Found"}</div>) : (
                                                                <div className="details">Author: {data.author !== null ? data.author : "Not Found"}</div>
                                                            )}
                                                        <div className="details">Publisher: <strong>{data.publisher !== null ? data.publisher : "Not Found"}</strong></div>
                                                        <div className="price-details">Price: <span className="price">₹{data.price}</span></div>
                                                        <div className="bottom-menu my-3">

                                                            <div className="action-btns">


                                                                {/* <span className="save-for-later">Save for later</span> */}

                                                                {
                                                                    wishlistshow === true ? (<button className="remove-from-cart button-solid button_color" onClick={() => Remove_Cart_Item(data.id)}>Remove</button>)
                                                                        : (<button className="remove-from-cart button-solid button_color" onClick={() => Remove_Cart_Item(data.my_book_id)}>Remove</button>)
                                                                }

                                                            </div>
                                                        </div>
                                                    </div>



                                                </div>

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
                                    <button type="button" disabled={getcartitems.length > 0 ? false : true}
                                        className="btn btn-primary view_all_books rounded-pill d-flex justify-content-center align-items-center py-2 pl_od_btn_w"
                                        onClick={Proceed_to_Checkout}
                                    // style={{ width: '30%' }}
                                    >
                                        Place Order
                                    </button>
                                    
                                </div>
                                <div className="d-flex justify-content-center mt-2">
                                <button type="button" 
                                            className="btn btn-outline-primary view_all_books rounded-pill d-flex justify-content-center align-items-center py-2 pl_od_btn_w"
                                            onClick={()=>{navigate('/home')}}
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