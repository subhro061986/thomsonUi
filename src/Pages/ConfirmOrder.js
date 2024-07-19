import React, { useEffect, useState, } from "react";
import { Link } from "react-router-dom";
import TopBar from "../Layout/TopBar";
import NavBar from "../Layout/NavBar";
import Footer from "../Layout/Footer";
import Whatsapp from "../Layout/Whatsapp";


import verify from "../Assets/Images/verify.png";
import cbook1 from "../Assets/Images/cbook1.png";
import cbook2 from "../Assets/Images/cbook2.png";
import cbook3 from "../Assets/Images/cbook3.png";

import { useNavigate } from 'react-router-dom';
import FooterSouthsore from "../Layout/FooterSouthsore";
import { UserProfile } from "../Context/Usercontext";

const ConfirmOrder = () => {

    const navigate = useNavigate();

    const { orderConfirmation, } = UserProfile()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        console.log("orderConfirmation= ",orderConfirmation)
    }, [])

    return (
        <div className="main-container">
            <div className="container">
                <TopBar />
                <NavBar />
            </div>
            <Whatsapp/>
            <div className="category_bg py-5">
                <div className="bg-white confirm_container py-5">
                    <div className="d-flex justify-content-center mb-3">
                        <img src={verify} width={70} height={70} />
                    </div>
                    <div className="confirm_head mb-3">Order Confirmed</div>
                    <div className="confirm_sub_head mb-4">Thank you for choosing <span>Books Central</span>, your order has been confirm
                        and you purchased item will be added in your bookshelf. </div>
                    {/* <div className="border border-1 border_line mb-4"></div> */}
                    {/* <div className="order_details_head mb-4">Your Order Details</div>
                    <div className="d-flex flex-column all_items">
                        <div className="row items_card mb-4">
                            <div className="col-1 book_img d-flex justify-content-center align-items-center">
                                <img src={cbook1} />
                            </div>
                            <div className="col-10 p-4">
                                <div className="d-flex justify-content-between">
                                    <div className="item_head">Lion King (Disney the Lion King)</div>
                                    <div className="item_price">Price: <span className="ms-2">₹198</span></div>
                                </div>
                                <div className="d-flex flex-row mt-1">
                                    <div className="item_author"><span>Author:</span> Sudha Murty</div>
                                    <div className="border_right"></div>
                                    <div className="item_pub">Publisher: <span>Modern Publishing House</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="row items_card mb-4">
                            <div className="col-1 book_img d-flex justify-content-center align-items-center">
                                <img src={cbook2} />
                            </div>
                            <div className="col-10 p-4">
                                <div className="d-flex justify-content-between">
                                    <div className="item_head">Chordtime Piano Favorites</div>
                                    <div className="item_price">Price: <span className="ms-2">₹119</span></div>
                                </div>
                                <div className="d-flex flex-row mt-1">
                                    <div className="item_author"><span>Author:</span> Franz Liszt</div>
                                    <div className="border_right"></div>
                                    <div className="item_pub">Publisher: <span>Modern Publishing House</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="row items_card mb-4">
                            <div className="col-1 book_img d-flex justify-content-center align-items-center">
                                <img src={cbook3} />
                            </div>
                            <div className="col-10 p-4">
                                <div className="d-flex justify-content-between">
                                    <div className="item_head">Love Hypothesis</div>
                                    <div className="item_price">Price: <span className="ms-2">₹119</span></div>
                                </div>
                                <div className="d-flex flex-row mt-1">
                                    <div className="item_author"><span>Author:</span> Ali Hazelwood</div>
                                    <div className="border_right"></div>
                                    <div className="item_pub">Publisher: <span>Modern Publishing House</span></div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className="border border-1 border_line mb-4 mt-2"></div>
                    <div className="d-flex justify-content-between border_line">
                        <div className="bill_title mb-2">Confirmation No</div>
                        <div className="bill_no"> <Link to={"/orderpage"}>{orderConfirmation?.output?.orderno}</Link> </div>
                    </div>
                    {/* <div className="border border-1 border_line mb-4 mt-2"></div>
                    <div className="d-flex justify-content-between border_line">
                        <div className="bill_title mb-2">Confirmation Date</div>
                        <div className="bill_no">{orderConfirmation?.output?.orderdate}</div>
                    </div> */}
                    <div className="border border-1 border_line mb-4 mt-2"></div>
                    <div className="d-flex justify-content-between border_line">
                        <div className="bill_title mb-2">Order Total</div>
                        <div className="bill_no"><span className="ms-3">{orderConfirmation?.output?.currencysymbol} {orderConfirmation?.output?.totalamount} </span></div>
                    </div>
                    <div className="border border-1 border_line mb-4 mt-2"></div>
                    <div className="d-flex justify-content-center">
                        <button type="button" className="btn btn-outline-primary rounded-pill continue_btn py-3 px-4" onClick={() => navigate('/')}>Continue shopping</button>
                    </div>
                </div>
            </div>

            <FooterSouthsore />
        </div>
    );
}

export default ConfirmOrder;