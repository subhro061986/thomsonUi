import React, { useEffect, useState, } from "react";
import publisher_logo from "../Assets/Images/publisher_demo.png";
import admin_logo from "../Assets/Images/book_central.png";
import facebook_logo from "../Assets/Images/Facebook-icon.png";
import youtube_logo from "../Assets/Images/Youtube-icon.png";
import linkedin_logo from "../Assets/Images/Linkedin-icon.png";
import instagram_logo from "../Assets/Images/Instagram-icon.png";
import sms from "../Assets/Images/sms.png"
import user from "../Assets/Images/user.png"
import call from "../Assets/Images/call.png"
import close from "../Assets/Images/close-circle.png"
import { Button } from 'react-bootstrap';
import Config from "../Config/Config.json";
import noImg from "../Assets/Images/no-img.png";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { UserProfile } from "../Context/Usercontext";

const Footer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [modal, setModal] = useState(false);
    const { category_by_publisher, items, getPublishersById, publisherId, sendEmail,allCategoryList } = UserProfile()
    const [publisherDetails, setPublisherDetails] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [contactUsName, setContactUsName] = useState('')
    const [contactUsEmail, setContactUsEmail] = useState('')
    const [contactUsPhNo, setContactUsPhNo] = useState('')
    const [contactUsMessage, setContactUsMessage] = useState('')
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [phoneErrorMessage, setPhoneErrorMessage] = useState('');
    const [phoneError, setPhoneError] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    }


    const isValidPhone = (phone) => {
        return /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phone);
    }

    const handleName = (e) => {
        setContactUsName(e.target.value)
    }

    const handleEmail = (e) => {
        // if(!isValidEmail(e.target.value))
        // {
        //     setEmailErrorMessage('Email is invalid');

        // }
        // else{
        setContactUsEmail(e.target.value)
        //     setEmailErrorMessage('');
        // }
    }

    const handlePhNo = (e) => {
        // if(!isValidPhone(e.target.value)){
        //     setPhoneErrorMessage('Phone number is invalid');
        // }
        // else{
        setContactUsPhNo(e.target.value)
        //     setPhoneErrorMessage('')
        // }
    }

    const handleMessage = (e) => {
        setContactUsMessage(e.target.value)
    }
    

    

    const imgNavHome = () => {
        // Check if the current location is the homepage
        if (location.pathname === '/home') {
            // Scroll to the top of the page
            window.scrollTo(0, 0);
        } else {
            // Navigate to the homepage
            //   history.push('/');
            navigate('/home');
        }
    };

    const toggleModal = () => {
        setContactUsMessage('')
        setContactUsEmail('')
        setContactUsPhNo('')
        setContactUsName('')
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const triggerEmail = async () => {

        if (!isValidPhone(contactUsPhNo)) {
            alert('Phone number is invalid');
        }
        else if (!isValidEmail(contactUsEmail)) {
            alert('Email is invalid');
        }
        else {

            let data = {
                "email": contactUsEmail,
                "name": contactUsName,
                "phno": contactUsPhNo,
                "message": contactUsMessage
            }
            let resp = await sendEmail(data)

            toggleModal()
            alert(resp + ", Admin will contact you shortly.")
        }

    }

    const cat_dropdown_nav = (id) => {
        navigate('/category',
            { state: { category_id: id } }
        )
    }
    const openMailto = (value) => {
        window.location.replace('mailto:' + value)
    }
    return (
        <div className="mt-5">

            
            <div className="container my-2">
                <div className="row">
                    <div className="col-md-3 s_f_logo_col">
                        <img src={admin_logo} width={100} onClick={imgNavHome} style={{ cursor: 'pointer' }} />
                        <ul className="remove-dots" style={{ paddingLeft: 0 }}>
                            {/* <div className="custom-footer-Header">ebooksjunction.com</div> */}

                            <li className="custom-footer-li">
                                Books central office locations
                                Plot 13, Heritage Phase 2, Telephone Nagar Perungudi, Chennai-600096
                                {/* <p className="mt-2" style={{ cursor: 'pointer' }} onClick={openMailto}><b>Mail Us </b>: sales@southshore.in </p> */}
                            </li>
                            <li className="custom-footer-li">
                                <div className="south_val"><span className="south_key">Call Us:</span> 91-44-79624624</div>
                                <div className="south_val"><span className="south_key">Email:</span> info@bookscentral.in</div>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3 s_f_mar_bot">
                        <div className="d-flex flex-row justify-content-end">
                            <div className="">
                                <ul className="remove-dots" >
                                    <div className="custom-footer-Header">Categories</div>
                                    
                                    {
                                        allCategoryList.map((data, index) => (
                                            data.isactive === 1 && (
                                            <li className="custom-footer-li" style={{ cursor: 'pointer' }} key={index} onClick={() => cat_dropdown_nav(data.id)}> {data.name} </li>
                                            )
                                        ))
                                    }


                                </ul>
                            </div>


                        </div>
                    </div>


                    <div className="col-md-3 s_f_mar_bot">
                        <div className="d-flex flex-row justify-content-end">
                            <div className="">
                                <ul className="remove-dots">
                                    <div className="custom-footer-Header">Policies</div>

                                    <li className="custom-footer-li">
                                        <Link className="nav-link" to="/privacypolicy">
                                            Privacy Policies
                                        </Link>
                                    </li>
                                    <li className="custom-footer-li">
                                        <Link className="nav-link" to="/terms">
                                            Terms Of Use
                                        </Link>
                                    </li>
                                    <li className="custom-footer-li">
                                        <Link className="nav-link" to="/disclaimer">
                                            {/* Disclaimer */}
                                            IP Infringement Policy
                                        </Link>  </li>
                                    <li className="custom-footer-li">
                                        <Link className="nav-link" to="/copyright">
                                            Copyright Policy
                                        </Link>

                                    </li>
                                    <li className="custom-footer-li">
                                        <Link className="nav-link" to="/faqs">
                                            {/* FAQ Customer */}
                                            Cancellation And Returns Policy
                                        </Link>

                                    </li>
                                    {/* <li className="custom-footer-li">
                                        <Link className="nav-link" to="/faqpub">
                                            FAQ Publisher
                                        </Link>

                                    </li> */}

                                </ul>
                            </div>


                        </div>
                    </div>




                    <div className="col-md-3 s_f_mar_bot">
                        {/* <ul className="remove-dots">
                            <div className="custom-footer-Header"> Support</div>
                            <li className="custom-footer-li">
                                <Link className="nav-link" to="/faqpub">
                                    Customer FAQ
                                </Link>
                            </li>
                        </ul> */}
                        <div className="d-flex flex-row justify-content-end">
                            <div className="">
                                <ul className="remove-dots">
                                    <div className="custom-footer-Header">Support</div>
                                    <li className="custom-footer-li">
                                        <Link className="nav-link" to="/faqs">
                                            Customer FAQ
                                        </Link>

                                    </li>

                                </ul>
                            </div>


                        </div>

                    </div>
                </div>
            </div>
            <div className="container-fluid d-flex align-items-center justify-content-center footer-note py-2">
                <span className="text-center footer_poweredby_text">&#169; copyright Southshore Innovations Private Limited</span>

            </div>

            {modal && (
                <div className="custom_modal">
                    <div className="custom_overlay"></div>
                    <div className="custom_modal_content">
                        <h2>Contact US</h2>
                        {/* <p>Fill the form and continue to join as  publisher</p> */}
                        <div className="form_fields">
                            <div className="field_groups">
                                <div className="pos_rel">
                                    <label className="form_label">Name</label>
                                    <input className="form-control p_hold" type="text" placeholder="Your Name"
                                        value={contactUsName} onChange={handleName} required
                                    />
                                    <img src={user} className="sms_pos" />
                                </div>
                                <div className="pos_rel">
                                    <label className="form_label">Email</label>
                                    <input className="form-control p_hold" type="email" placeholder="Your email address"
                                        value={contactUsEmail} onChange={handleEmail} required

                                    />
                                    <img src={sms} className="sms_pos" />
                                </div>
                                {emailErrorMessage}
                            </div>
                            <div className="field_groups">
                                <div className="pos_rel">
                                    <label className="form_label">Phone</label>
                                    <input className="form-control p_hold" type="text" placeholder="Your phone number"
                                        value={contactUsPhNo} onChange={handlePhNo} required maxLength={10}
                                    />
                                    <img src={call} className="sms_pos" />

                                </div>
                                {phoneErrorMessage}
                                <div className="pos_rel">
                                    <label className="form_label">Message</label>
                                    <input className="form-control p_hold" type="text" placeholder="Your message"
                                        value={contactUsMessage} onChange={handleMessage} required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center mt-5">
                            <button className="custom_btn" type="submit" onClick={triggerEmail}>Submit</button>
                        </div>
                        <button className='btn_modal_class_how rounded-circle_how' onClick={toggleModal}>
                            <img src={close} />
                        </button>
                    </div>
                </div>
            )}
        </div>

    )
}

export default Footer