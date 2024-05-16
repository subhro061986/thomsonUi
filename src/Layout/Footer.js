import React, { useEffect, useState, } from "react";
import publisher_logo from "../Assets/Images/publisher_demo.png";
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
    const { category_by_publisher, items, getPublishersById, publisherId,sendEmail } = UserProfile()
    const [publisherDetails, setPublisherDetails] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const[contactUsName,setContactUsName] = useState('')
    const[contactUsEmail,setContactUsEmail] = useState('')
    const[contactUsPhNo,setContactUsPhNo] = useState('')
    const[contactUsMessage,setContactUsMessage] = useState('')
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [phoneErrorMessage, setPhoneErrorMessage] = useState('');
    const [phoneError, setPhoneError] = useState(false);
    useEffect(() => {
        getPubById();
        getCategoriesByPublisher();
        window.scrollTo(0, 0)
    }, [])


    const isValidEmail= (email) => {
        return /\S+@\S+\.\S+/.test(email);
      }
      
      
      const isValidPhone= (phone)=> {
        return /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phone);
      }

    const handleName =(e) =>{
        setContactUsName(e.target.value)
    }

    const handleEmail =(e) =>{
        // if(!isValidEmail(e.target.value))
        // {
        //     setEmailErrorMessage('Email is invalid');
         
        // }
        // else{
            setContactUsEmail(e.target.value)
        //     setEmailErrorMessage('');
        // }
    }

    const handlePhNo =(e) =>{
        // if(!isValidPhone(e.target.value)){
        //     setPhoneErrorMessage('Phone number is invalid');
        // }
        // else{
            setContactUsPhNo(e.target.value)
        //     setPhoneErrorMessage('')
        // }
    }

    const handleMessage =(e) =>{
        setContactUsMessage(e.target.value)
    }
    const getPubById = async () => {
        // console.log("LOCATION", location);
        let pubid = 0;

        if (location.state === null || location.state === 'null') {
            // console.log("RESULT===>123");
            pubid = publisherId
        }
        else {
            // console.log("RESULT===>345");
            pubid = location.state.publisher_id
        }
        const result = await getPublishersById(pubid);
        console.log("FOOTER PUB BY ID DETS : ", result);
        setPublisherDetails(result?.data?.output)

    }

    const getCategoriesByPublisher = async () => {
        // console.log("LOCATION", location);
        let pubid = 0;

        if (location.state === null || location.state === 'null') {
            // console.log("RESULT===>123");
            pubid = publisherId
        }
        else {
            // console.log("RESULT===>345");
            pubid = location.state.publisher_id
        }
        const result = await category_by_publisher(pubid);
        // console.log("FOOTER category BY publisher ID DETS : ", result);
        setCategoryList(result.output);
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

    const triggerEmail= async () =>{

        if(!isValidPhone(contactUsPhNo)){
            alert('Phone number is invalid');
        }
        else if(!isValidEmail(contactUsEmail)){
            alert('Email is invalid');
        }
        else {

            let data={
                "email":contactUsEmail,
                "name":contactUsName,
                "phno":contactUsPhNo,
                "message":contactUsMessage
            }
            let resp= await sendEmail(data)
            
            toggleModal()
            alert(resp + ", Admin will contact you shortly.")
        }

    }

    const cat_dropdown_nav = (id) => {
        navigate('/category',
            { state: { category_id: id } }
        )
    }
    const openMailto=(value)=>{
        window.location.replace('mailto:'+value)
    }
    return (
        <div className="mt-5">

            <div className="container my-2">
                <div className="row footer_margin">
                    <div className="col-md-2 card_bottom guideline_padding_left logo_dimensions">
                        <img src={publisherDetails === undefined || publisherDetails?.logo === null ? noImg : `${Config.API_URL + Config.PUB_IMAGES + publisherDetails.id + '/' + publisherDetails.logo}`} alt="publisher logo" className='img_dimensions' onClick={imgNavHome} style={{ cursor: 'pointer' }} />
                    </div>

                    <div className="div_block div_padding footer_margin_cat">
                        <div className="col-md-2">
                            <ul className="remove-dots" >
                                <h6 className="custom-footer-Header"><b>Categories</b></h6>

                                {/* <li className="custom-footer-li"> Law</li>
                                <li className="custom-footer-li"> Tax </li>
                                <li className="custom-footer-li"> Humanities </li>
                                <li className="custom-footer-li"> Social </li>
                                <li className="custom-footer-li"> Medical </li> */}

                                {
                                    categoryList.map((data, index) => (
                                        <li className="custom-footer-li" style={{cursor:'pointer'}} key={index} onClick={() => cat_dropdown_nav(data.id) }> {data.name} </li>
                                    ))
                                }


                            </ul>
                        </div>
                        <div className="col-md-2 pol_mr">
                            <ul className="remove-dots">
                                <div className="custom-footer-Header"><b>Policies</b></div>

                                {/* <li className="custom-footer-li">
                                    <Link className="nav-link" to="/privacypolicypub">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li className="custom-footer-li"> Terms Of Use </li>
                                <li className="custom-footer-li"> Secure Shopping </li>
                                <li className="custom-footer-li"> Copyright Policy </li>
                                <li className="custom-footer-li"> FAQ </li> */}

                                <li className="custom-footer-li">
                                    <Link className="nav-link" to="/privacypolicy">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li className="custom-footer-li">
                                    <Link className="nav-link" to="/terms">
                                        Terms Of Use
                                    </Link>
                                </li>
                                <li className="custom-footer-li">
                                    <Link className="nav-link" to="/disclaimer">
                                        Disclaimer
                                    </Link>  </li>
                                <li className="custom-footer-li">
                                    <Link className="nav-link" to="/copyright">
                                        Copyright Policy
                                    </Link>

                                </li>
                                <li className="custom-footer-li">
                                    <Link className="nav-link" to="/faqs">
                                        FAQ Customer
                                    </Link>

                                </li>
                                <li className="custom-footer-li">
                                    <Link className="nav-link" to="/faqpub">
                                        FAQ Publisher
                                    </Link>

                                </li>

                            </ul>
                        </div>

                        {/* <div className='pub_container'> */}
                        <div className="col-md-3 footer_container_block div_padding">
                            <ul className="remove-dots">
                                <h6 className="mb-3"><b>{publisherDetails?.name}</b></h6>

                                {/* <h6 ><b>ebooksjunction.com</b></h6> */}

                                <li className="custom-footer-li">
                                    <p className="adress">Powered By Southshore Innovations Private Limited .</p>
                                    <p className="adress">Plot 13, Vijayendra Colony, Telephone Nagar, Perungudi, Chennai - 600096. </p>
                                </li>

                                <li className="custom-footer-li">
                                    <p><b>Phone No </b>: +91{publisherDetails?.contactno}</p>
                                    <p style={{cursor:'pointer'}} onClick={()=>openMailto(publisherDetails?.contactemail)}><b>Mail Us </b>: {publisherDetails?.contactemail}</p>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-3 footer_container_block">
                            <ul className="remove-dots">

                                <div className="div_block_1">
                                    <div>
                                        <h6 > <b>Connect with Us</b></h6>
                                        <Button className="mt-2 rounded-pill px-4" variant="outline-primary" onClick={toggleModal}>Contact us</Button>
                                    </div>

                                    <div className="div_top">
                                        <h6> <b>Social Media</b></h6>
                                        <div className='div_top_1'>
                                            <div className="d-inline p-2">
                                                <img src={facebook_logo} />
                                            </div>
                                            <div className="d-inline p-2">
                                                <img src={youtube_logo} />
                                            </div>
                                            <div className="d-inline p-2">
                                                <img src={linkedin_logo} />
                                            </div>
                                            <div className="d-inline p-2">
                                                <img src={instagram_logo} />
                                            </div>
                                        </div>

                                    </div>
                                </div>


                            </ul>

                        </div>
                        {/* </div> */}



                    </div>

                    <div className='pub_container_1'>
                        <div className="col-md-3 div_padding">
                            <ul className="remove-dots">
                                <h6 className="mb-3"><b>{publisherDetails?.name}</b></h6>

                                <li className="custom-footer-li">
                                <p className="adress">Powered By Southshore Innovations Private Limited .</p>
                                    <p className="adress"> Plot 13, Vijayendra Colony, Telephone Nagar, Perungudi, Chennai - 600096. </p>
                                </li>
                                <li className="custom-footer-li">
                                    <p><b>Phone No </b>: +91{publisherDetails?.contactno}</p>
                                    <p style={{cursor:'pointer'}} onClick={()=>openMailto(publisherDetails?.contactemail)}><b>Mail Us </b>: {publisherDetails?.contactemail}</p>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-3">
                            <ul className="remove-dots">

                                <div className="div_block">
                                    <div>
                                        <h6 > <b>Want to Connect</b></h6>
                                        <Button className="mt-2 rounded-pill px-4" variant="outline-primary" onClick={toggleModal}>Contact us</Button>
                                    </div>

                                    <div className="div_top">
                                        <h6> <b>Social Media</b></h6>
                                        <div className='div_top_1'>
                                            <div className="d-inline p-2">
                                                <img src={facebook_logo} />
                                            </div>
                                            <div className="d-inline p-2">
                                                <img src={youtube_logo} />
                                            </div>
                                            <div className="d-inline p-2">
                                                <img src={linkedin_logo} />
                                            </div>
                                            <div className="d-inline p-2">
                                                <img src={instagram_logo} />
                                            </div>
                                        </div>

                                    </div>
                                </div>


                            </ul>

                        </div>
                    </div>





                </div>
            </div>
            <div className="container-fluid d-flex align-items-center justify-content-center footer-note py-2">
                <span className="text-center footer_poweredby_text">&#169; copyright Southshore Innovations Private Limited</span>
                {/* <div className="" >
                    
                </div> */}
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
                                    value={contactUsName} onChange={handleName}  required
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
                                    value={contactUsPhNo} onChange={handlePhNo}  required maxLength={10}
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