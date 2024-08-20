import React, { useEffect, useState, } from "react";
import TopBarSouthsore from "../Layout/TopBarSouthsore";
import NavBarSouthsore from "../Layout/NavBarSouthsore";
import FooterSouthsore from "../Layout/FooterSouthsore";
import Config from "../Config/Config.json"
import { Link } from "react-router-dom";
import Whatsapp from "../Layout/Whatsapp";
import TopBar from "../Layout/TopBar";

const ReturnandCancel = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleClick = () => {
        // Navigate to the footer component
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'auto'
            /* you can also use 'auto' behaviour 
               in place of 'smooth' */
        });
    };

    return (
        <div className="main-container">
            <div className="container">
                <TopBar />
                <NavBarSouthsore />
            </div>
            <Whatsapp />
            <div className="about-southshore py-5" style={{ backgroundColor: '#F7F8FA', paddingLeft: '8%', paddingRight: '8%', marginTop: '1%' }}>
                <div className="row">
                    <div className="col-md-12 cert_l_col">
                        <div className="about-southshore-header">
                            <div className="d-flex justify-content-between" style={{ width: '100%' }}>
                                <h4>Cancellation And Return Policy</h4>
                                <button className="btn btn-primary" onClick={handleClick}>Back</button>
                            </div>
                        </div>
                        <div className="about-southshore-body">


                            <p className="mt-2">Books Central <Link to={Config.home_links} className="home_nav_link">(www.bookscentral.in)</Link> is a product owned by Southshore Innovations Private Limited and the website has been designed to cater to the display and sale of books across specified genres. The following are the policies related to delivery, cancellation and refunds.
                            </p>



                            <h6>Delivery Policy:</h6>

                            <ul className="mt-2">
                                <li className="mt-4">
                                    Orders are accepted only from India and we use reputed courier services including India Post to fulfil the same.
                                </li>
                                <li className="mt-4">
                                    Order for Indian authored titles and reprint titles would be fulfilled within 3-10 working days depending on the location
                                </li>
                                <li className="mt-4">
                                    However for imported books listed on the site, the delivery time would be 4-6 weeks from the date of placement of order.
                                </li>
                                <li className="mt-4">
                                    However there could be force majeure instances where delays occur. If the delivery does not reach within 15 working days from the placement of order in the case of Indian authored and reprint titles and 8 weeks from the date of placement of order for imported titles, a customer could claim a refund by writing to us at sales@southshore.in giving the relevant information of order no/ date, invoice number and we will make the refund to the designated bank account within 7 days from the request provided all the required documentation has been provided.
                                </li>
                            </ul>

                            <h6 className="m-2">Cancellation policy:</h6>

                            <ul className="mt-2">
                                <li className="mt-4">
                                    Orders placed prior to dispatch can be cancelled and amounts paid will be refunded within 7 days from the cancellation date.
                                </li>
                                <li className="mt-4">
                                    Orders once dispatched cannot be cancelled. For such cases, refunds are allowed as defined in the refund policy below.
                                </li>
                                <li className="mt-4">
                                    When an order is dispatched it will show the courier details and hence indicate it has been processed. At this stage the order cancellation option is not there
                                </li>
                                <li className="mt-4">
                                    To cancel orders please send a mail with order no ( from <Link to={Config.home_links} className="home_nav_link">bookscentral.in</Link>) to <a href="mailto:sales@southshore.in">sales@southshore.in</a>
                                </li>
                            </ul>

                            <h6 className="m-2">Return, refund policy:</h6>

                            <p className="mt-3 ms-2">Returns and refund would be allowed under the following conditions</p>

                            <ul className="mt-2 ms-2">
                                <li className="mt-4">
                                    Delayed delivery beyond the stated policy norms
                                </li>
                                <li className="mt-4">
                                    Damages books received. In such cases, we request that an email is sent with a photograph is sent to sales@southshore.in.
                                </li>
                                <li className="mt-4">
                                    Wrong book received. In such cases, we request that an email is sent with a photograph of the cover is sent to <a href="mailto:sales@southshore.in">sales@southshore.in</a>
                                </li>
                            </ul>

                            <p className="mt-3 ms-2">
                            In the above cases, we will refund the cost of the book within 7 working days from the date of receipt of the email. 
                            </p>

                            <p className="mt-3 ms-2">
                            For any grievances associated with the cancellation and refund policy please email us at <a href="mailto:compliance@southshore.in">compliance@southshore.in</a>
                            </p>


                        </div>
                    </div>

                </div>

            </div>
            <div id="contact">
                <FooterSouthsore />
            </div>
        </div>
    );
}

export default ReturnandCancel;