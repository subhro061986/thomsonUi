//Asset Import
import React, { useEffect, useState, } from "react";
import TopBar from "../Layout/TopBar";
import NavBar from "../Layout/NavBar";
import Footer from "../Layout/Footer";
import closeIcon from '../Assets/Images/close-circle.svg'
import wishlistImg1 from '../Assets/Images/wishlist_img1.png'
import wishlistImg2 from '../Assets/Images/wishlist_img2.png'
import wishlistImg3 from '../Assets/Images/wishlist_img3.png'
import wishlistImg4 from '../Assets/Images/wishlist_img4.png'
import { UserProfile } from "../Context/Usercontext"
import Config from "../Config/Config.json"

import dummy from "../Assets/Images/dummy.png";
//Component Import
import Card from 'react-bootstrap/Card';
import SVG from "react-inlinesvg";
import { Button } from 'react-bootstrap';
import { useAuth } from "../Context/Authcontext";
import ProfileTab from "../Layout/ProfileTab";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BackButton from "../Layout/BackButton";
import TopBarSouthsore from "../Layout/TopBarSouthsore";
import FooterSouthsore from "../Layout/FooterSouthsore";
import Whatsapp from "../Layout/Whatsapp";
import NavBarSouthsore from "../Layout/NavBarSouthsore";
import { useNavigate, Link } from 'react-router-dom';



const WishList = () => {

    const { get_wishlist_books, add_delete_to_wishlist, wishlistitems, cart_items, add_single_item } = UserProfile()
    const { wishlistshow, uuid,add_book_to_storage } = useAuth();

    const [wishbooks, setWishbooks] = useState([])

    const navigate = useNavigate();


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        Wishlisted_books()
    }, [])


    const Wishlisted_books = async () => {
        let current_pg = 1
        let records_per_pg = 5
        const resp = await get_wishlist_books(current_pg, records_per_pg)

        if (resp === undefined || resp === null) {
            setWishbooks([])
        }
        else {
            if (resp.statuscode === "0" && resp.output?.length > 0) {
                setWishbooks(resp.output)
                // get_wish_books_id()
            }

            else {
                setWishbooks([])
            }
        }
    }

   
    const add_to_cart = async (bookid) => {
        const json = {
            "deviceid": uuid,
            "quantity": 1,
            "bookid": bookid
        }
        const resp = await add_book_to_storage(json)
        alert(resp.message)
        // console.log("single_item_added ", resp.message)
    }





    const remove_item = async (book_id) => {
        let json = {
            bookid: book_id,
            currentPage: 1,
            recordPerPage: 5
        }

        // console.log("json_edit", json)
        const resp = await add_delete_to_wishlist(json)

        Wishlisted_books()
        // console.log("DElete_wish ", resp)
        // console.log("book_id", book_id)
    }




    return (
        <div className="main-container">
            <div className="container">
                <TopBar />
                <NavBarSouthsore />
                <ProfileTab />
            </div>

            <Whatsapp />
            <div className="main-container wishlist">

                <div className="container ">
                    <div className="d-flex align-items-center justify-content-between mt-5">
                        <div 
                        // className="d-flex align-items-center"
                        >
                            <div className="headerText mb-3">My Wishlist</div>
                            <div className="itemCountText mb-3">{" " + wishlistitems?.length + " Products"}</div>

                        </div>
                        <div>
                            {/* <BackButton /> */}

                        </div>
                    </div>

                    <hr /> <br />
                    <div className="row">

                        {
                            wishbooks.map((data, index) => (



                                <div key={index} className="col-md-3 wishlisht_mobile_container">
                                    <Card className="card-des mb-4 pb-3">
                                        <div className="d-flex flex-row-reverse p-2 me-3 mt-3" onClick={() => remove_item(data.id)}>

                                            <SVG src={closeIcon}></SVG>
                                        </div>
                                        <div >

                                            <Card.Img className="img" variant="top"
                                                src={data.img === null || data.img === '' ? dummy : Config.API_URL + Config.PUB_IMAGES + data.publisherid + "/" + data.img + '?d=' + new Date()}
                                                width={223}
                                                height={247}
                                                // src={dummy}
                                            />
                                            <Card.Body>

                                                <Card.Title className="headerText">{data.title.length > 21 ? data.title.substring(0, 21) + ".." : data.title}</Card.Title>
                                                <Card.Subtitle className="Subtitle mb-4">Author: {data.authors?.length > 0 ? data.authors : "Not Found"}</Card.Subtitle>
                                                <div className="price">
                                                    {/* <hr /> */}
                                                    <Card.Text className=" d-inline priceText">{data.price !== null ? data.price : "Not Updated"}</Card.Text>
                                                    {/* <Card.Text className=" d-inline price-cutText ps-2">187</Card.Text> */}

                                                </div>

                                                <button
                                                    // className="footerText" 
                                                    onClick={() => add_to_cart(data.id)}
                                                    // style={{cursor:"pointer"}}
                                                    type="button" style={{ width: '70%', fontWeight: '600' }}
                                                    className="btn btn-primary rounded-pill d-flex justify-content-center align-items-center py-2 ms-5"
                                                >
                                                    Move to Cart
                                                </button>
                                            </Card.Body>
                                        </div>
                                    </Card>
                                </div>

                            ))
                        }

                    </div>
                    <div className="d-flex justify-content-center mt-5 mb-5">
                        <Button variant="outline-dark" className="rounded-pill  py-3 px-4" style={{color:'#061927', fontWeight:'500'}}
                        onClick={() => { navigate('/') }}
                        >Continue Shopping</Button>
                    </div>

                </div>
            </div>

            <FooterSouthsore />

            <ToastContainer />

        </div>
    );
}

export default WishList;