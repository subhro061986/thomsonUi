import React, { useEffect, useState, } from "react";
import Card from 'react-bootstrap/Card';
import step1 from "../Assets/Images/step1.png";
import step2 from "../Assets/Images/step2.png";
import step3 from "../Assets/Images/step3.png";
import sms from "../Assets/Images/sms.png"
import user from "../Assets/Images/user.png"
import call from "../Assets/Images/call.png"
import { Button } from 'react-bootstrap';
import { useAuth } from '../Context/Authcontext';
import { UserProfile } from "../Context/Usercontext";

import close from "../Assets/Images/close-circle.png"
const HowtoSouthsore = () => {
    const [modal, setModal] = useState(false);
    const { authData } = useAuth();

    const { sendEmail } = UserProfile()

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
        if (authData === undefined || authData === null || authData === '') {
            setHideButton(false);
        }
        else {
            setHideButton(true);
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
        <div className="container-fluid how_to_use">
            <div className="container">
                <div className="row">
                    <div className="d-flex justify-content-center align-items-center section_head fw700">As a publisher how do I register with<br />E-Books Junction</div>
                    <div className="d-flex justify-content-center align-items-center head_2">Reach out to us as detailed below</div>
                </div>

                <div className="mt-3">

                    <div className="row mar_x">
                        <div className="col-md-4 mar_bot">
                            <Card className='card-des card_height' >
                                <Card.Img className='centered-image' variant="top" src={step1} />
                                <Card.Body style={{ textAlign: 'center' }}>
                                    <Card.Title className='my-3 how_title'> Register to <span className='fw700'>E-Books</span> Junction </Card.Title>
                                    <Card.Text className='card-desc-text'>how do I sell my e-books on e-booksjunction</Card.Text>
                                    <Card.Text className='card-desc-text' style={{ minHeight: '149px' }}>Click on the “Join now” button. There are a few details required and we will get back to you and discuss the details over a call at a time convenient to you.</Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-md-4 mar_bot">
                            <Card className='card-des card_height' >
                                <Card.Img className='centered-image' variant="top" src={step2} />
                                <Card.Body style={{ textAlign: 'center' }}>
                                    <Card.Title className='my-3 how_title'>Display your books <span className='fw700'>Your own webstore</span></Card.Title>
                                    {/* <Card.Title className='my-3'><b>Your own webstore</b></Card.Title> */}
                                    <Card.Text className='card-desc-text' style={{ minHeight: '149px' }}>
                                        After registration and completion of a few formalities,
                                        you as a publisher will have your own webstore on our platform to upload,
                                        display and sell your e-content. The platform also supports your custom domain.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-md-4 mar_bot">
                            <Card className='card-des card_height' >
                                <Card.Img className='centered-image' variant="top" src={step3} />
                                <Card.Body style={{ textAlign: 'center' }}>
                                    <Card.Title className='my-3 how_title'>Reach your <span className='fw700'>Customers</span></Card.Title>
                                    {/* <Card.Title className='my-3'><b>Customers</b></Card.Title> */}
                                    <Card.Text className='card-desc-text' style={{ minHeight: '149px' }}>
                                        It's simple, upload the titles and sell through the platform.
                                        Customers can search using keywords and pay through the connected secure payment gateway and download
                                        the titles to read. The content is secure and can be read only through the proprietary reader of the platform.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>

                    </div>

                </div>
                <div className="d-flex justify-content-center mt-5 mb-4">
                    <Button className="join_btn" onClick={toggleModal}>Join Now</Button>
                </div>
            </div>
            {modal && (
                <div className="custom_modal">
                    <div className="custom_overlay"></div>
                    <div className="custom_modal_content">
                        <h2>Join as Publisher</h2>
                        <p>Fill the form and continue to join as  publisher</p>
                        {/* <div className="form_fields">
                            <div className="field_groups">
                                <div className="pos_rel">
                                    <label className="form_label">Name</label>
                                    <input className="form-control p_hold" type="text" placeholder="Your Publishers Name"
                                    // value={email} onChange={emailHandler} 
                                    />
                                    <img src={user} className="sms_pos" />
                                </div>
                                <div className="pos_rel">
                                    <label className="form_label">Email</label>
                                    <input className="form-control p_hold" type="text" placeholder="Your email address"
                                    // value={email} onChange={emailHandler} 
                                    />
                                    <img src={sms} className="sms_pos" />
                                </div>
                            </div>
                            <div className="field_groups">
                                <div className="pos_rel">
                                    <label className="form_label">Phone</label>
                                    <input className="form-control p_hold" type="text" placeholder="Your phone number"
                                    // value={email} onChange={emailHandler} 
                                    />
                                    <img src={call} className="sms_pos" />
                                </div>
                                <div className="pos_rel">
                                    <label className="form_label">Message</label>
                                    <input className="form-control p_hold" type="text" placeholder="Your message"
                                    // value={email} onChange={emailHandler} 
                                    />
                                </div>
                            </div>
                        </div> */}
                        <div className="form_fields">
                            <div className="field_groups">
                                <div className="pos_rel">
                                    <label className="form_label">Name</label>
                                    <input className="form-control p_hold" type="text" placeholder="Your Publishers Name"
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
                        <button className='btn_modal_class_how rounded-circle_how' onClick={toggleModal}>
                            <img src={close} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default HowtoSouthsore;