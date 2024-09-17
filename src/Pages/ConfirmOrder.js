import React, { useEffect, useState, } from "react";
import { Link, useLocation } from "react-router-dom";
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
import { useAuth } from "../Context/Authcontext";
import Config from "../Config/Config.json";

const ConfirmOrder = () => {

    const navigate = useNavigate();
    const location = useLocation()

    const { authData, authRole } = useAuth()

    const { orderConfirmation, } = UserProfile()
    const [orderDetails,setOrderDetails]= useState(null)
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        console.log("orderConfirmation= ",orderConfirmation)
        if(authRole=== Config.ROLE_DISTRIBUTOR){
            setOrderDetails(location?.state?.orderDetails)
            // console.log("order Details=",location?.state?.orderDetails)
        }
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

                    {authRole=== Config.ROLE_DISTRIBUTOR ? 
                    <>
                        <div className="confirm_sub_head mb-4">We have received your order and the same will be fulfilled shortly. Thank you for your business and we look forward to seeing you again. </div>
                            <div className="border border-1 border_line mb-4 mt-2"></div>
                            <div className="d-flex justify-content-between border_line">
                                <div className="bill_title mb-2">Confirmation No</div>
                                <div className="bill_no"> <Link to={"/orderpage"}>{orderDetails?.orderno}</Link> </div>
                            </div>
                        
                            <div className="border border-1 border_line mb-4 mt-2"></div>
                            <div className="d-flex justify-content-between border_line">
                                <div className="bill_title mb-2">Order Total</div>
                                <div className="bill_no"><span className="ms-3">{orderDetails?.currency} {orderDetails?.totalAmount} </span></div>
                            </div>
                    </>
                    :
                    
                        <>
                            <div className="confirm_sub_head mb-4">Thank you for choosing <span>Books Central</span>, your order has been confirm
                                and you purchased item will be added in your bookshelf. </div>
                            <div className="border border-1 border_line mb-4 mt-2"></div>
                            <div className="d-flex justify-content-between border_line">
                                <div className="bill_title mb-2">Confirmation No</div>
                                <div className="bill_no"> <Link to={"/orderpage"}>{orderConfirmation?.output?.orderno}</Link> </div>
                            </div>
                        
                            <div className="border border-1 border_line mb-4 mt-2"></div>
                            <div className="d-flex justify-content-between border_line">
                                <div className="bill_title mb-2">Order Total</div>
                                <div className="bill_no"><span className="ms-3">{orderConfirmation?.output?.currencysymbol} {orderConfirmation?.output?.totalamount} </span></div>
                            </div>
                        
                        </>
                    }
                 
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