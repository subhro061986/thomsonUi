import React, { useEffect, useState, } from "react";
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { useAuth } from '../Context/Authcontext';
import DownloadEpubReader from "../Assets/Images/download_epub_reader.png";
import SelectFavBook from "../Assets/Images/select_fav_book.png";
import PurchaseBook from "../Assets/Images/purchase_book.png";
import sms from "../Assets/Images/sms.png"
import user from "../Assets/Images/user.png"
import call from "../Assets/Images/call.png"

import close from "../Assets/Images/close-circle.png"
import { UserProfile } from "../Context/Usercontext";

const GuidelineSouthsore = () => {
    const { authData } = useAuth()
    const { sendEmail } = UserProfile()
    const [modal, setModal] = useState(false);
    const [hideButton, setHideButton] = useState(false);

    const [contactUsName, setContactUsName] = useState('')
    const [contactUsEmail, setContactUsEmail] = useState('')
    const [contactUsPhNo, setContactUsPhNo] = useState('')
    const [contactUsMessage, setContactUsMessage] = useState('')
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [phoneErrorMessage, setPhoneErrorMessage] = useState('');
    const [phoneError, setPhoneError] = useState(false);

    useEffect(() => {
        // console.log("Authdata : ", authData);
        // console.log("Authdata type : ", typeof authData);
        if (authData === undefined || authData === null || authData === '') {
            // show button if user not logged in
            setHideButton(true);
        }
        else {
            setHideButton(false);
        }
    }, [authData]);

    
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
    return (
        <div className="container-fluid guideline_southsore">
            <div className="container py-5">
                <div className="row">
                    {/* <div className="col-md-4 horizontalLine"> */}
                    <div className='fw700 guide_head'>Buy your favorite book in just 3 easy steps.</div>
                    {/* </div> */}
                    {/* <div className="col-md-8 textSmall"> */}
                    <div className='guide_head_2 mt-3'> e-booksjunction has a range of curated academic and professional e-books from leading publishers both from India and internationally. We constantly increase the range of titles across different genres and different publishers ensuring our customers get the latest in the field.</div>
                    {/* </div> */}
                </div>

                <div className="mt-3">
                    <div className='guide_head_2'>Here are following <span className='fw600'>steps</span></div>
                    <div className="row mt-5">
                        <div className="col-md-4 mb-4">
                            <Card className='card-des card_height'>
                                <Card.Img className='centered-image' variant="top" src={SelectFavBook} />
                                <Card.Body className='mb-3' style={{ textAlign: 'center' }}>
                                    <Card.Title className='my-3 guide_card_head'>Select your <span className='fw700'>favorite book</span> </Card.Title>
                                    <Card.Text className='card-desc-text'>Browse through the titles using keywords / filters and select based on Publisher / category across a range of genres / languages. Make your selection(s) in your shopping cart.</Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-md-4 mb-4">
                            <Card className='card-des card_height'>
                                <Card.Img className='centered-image' variant="top" src={PurchaseBook} />
                                <Card.Body className='mb-3' style={{ textAlign: 'center' }}>
                                    <Card.Title className='my-3 guide_card_head'><span className='fw700'>Purchase the book</span></Card.Title>
                                    <Card.Text className='card-desc-text'>Double-check the order details to ensure accuracy, including the book titles, quantity, customer information, and shipping address. Make your payment through our connected and secure payment gateway. Once complete the purchased book(s) will move to your bookshelf.</Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-md-4 mb-4">
                            <Card className='card-des card_height'>
                                <Card.Img className='centered-image' variant="top" src={DownloadEpubReader} />
                                <Card.Body className='mb-3' style={{ textAlign: 'center' }}>
                                    <Card.Title className='my-3 guide_card_head'> Download our reader <span className='fw700'>start reading</span> </Card.Title>
                                    <Card.Text className='card-desc-text'>Download our proprietary reader from the platform. Follow the installation instructions for your specific device. Once done you can download your books from your account and start reading.</Card.Text>
                                </Card.Body>
                            </Card>
                        </div>


                    </div>

                    <div className='d-flex justify-content-center mb-3' style={{ marginTop: '80px' }}>
                        {
                            hideButton && (<button className='btn btn-outline-light guide_btn' onClick={toggleModal}>Join Now</button>)
                        }
                    </div>

                </div>
                {modal && (
                    <div className="custom_modal">
                        <div className="custom_overlay"></div>
                        <div className="custom_modal_content">
                            <h2>Join as Reader</h2>
                            <p>Fill the form and continue to join as  reader</p>
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
                                <Button className="custom_btn" onClick={triggerEmail}>Submit</Button>
                            </div>
                            <button className='btn_modal_class rounded-circle' onClick={toggleModal}>
                                <img src={close} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default GuidelineSouthsore;