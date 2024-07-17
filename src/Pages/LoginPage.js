import React, { useEffect, useState, } from "react";
import { Link } from "react-router-dom";
import TopBar from "../Layout/TopBar";
import NavBar from "../Layout/NavBar";
import Footer from "../Layout/Footer";
import { useAuth } from "../Context/Authcontext";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'react-bootstrap';
import { Modal } from "react-bootstrap";
import loginsideimg from "../Assets/Images/New_login_img.png"
import bookCentral from "../Assets/Images/book_central_logo_png.png"
import sms from "../Assets/Images/sms.png"
import eyeslash from "../Assets/Images/eyeslash.png"
import eye_open from "../Assets/Images/eye_open.png"
import google from "../Assets/Images/google.png"

import { useNavigate } from 'react-router-dom';
import { UserProfile } from "../Context/Usercontext";
import Whatsapp from "../Layout/Whatsapp";
import FooterSouthsore from "../Layout/FooterSouthsore";

const Login = () => {
    const navigate = useNavigate();

    const { items } = UserProfile()

    const { logIn, logOut, authData, forgot_password } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [passShow, setPassShow] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [regEmail, setRegEmail] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [items])

    useEffect(() => {
    }, [authData])

    const emailHandler = (e) => {
        setEmail(e.target.value)
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

    // const goToRegistration = ()=>{
    //     navigate('/registration')
    //   }

    const closeModal = () => {
        setShowModal(false);
    }

    const openModal = () => {
        setShowModal(true);
    }

    const setRegisteredEmail = (e) => {
        setRegEmail(e);
    }

    const sendEmail = async () => {
        // connect to the api here
        if (regEmail !== "") {
            const args = {
                "email": regEmail
            };
            const resp = await forgot_password(args);
            toast.success(resp, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                closeButton: false,
                // style: {fontWeight: 'bold',backgroundColor:"rgb(255, 237, 246)"}
            });
            closeModal();
        }
    }

    const doLogin = async () => {
        // console.log('Email : ', email);
        // console.log('pass : ', password);
        if (email === '' && password === '') {
            setEmailError('Please enter email')
            setPasswordError('Please enter password')
        }
        else if (email === '') {
            setEmailError('Please enter email')
            setPasswordError('')
        }
        else if (password === '') {
            setPasswordError('Please enter password')
            setEmailError('')
        }

        else {
            var sendLoginData = {
                email: email,
                password: password
            }

            const resp = await logIn(sendLoginData)
            // console.log("login response", resp)

            if (resp?.status === 200) {
                if (items > 0) { navigate('/cartpage') }
                else { navigate('/') };
                // NotificationManager.success(resp.message, 'Success !', 5000,);
                // console.log("Logged in ")
                // toast.success("Logged in Successfully", {
                //     position: "top-right",
                //     autoClose: 2000,
                //     hideProgressBar: true,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     closeButton:false,
                //     theme: "light",
                //     });


            }
            else {
                // NotificationManager.error(resp.message, 'Error !', 5000,);
                toast.error("Login Unsuccessful !", {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    closeButton: false,
                    theme: "light",
                    style: { color: "rgb(250, 62, 75)", fontWeight: 'bold', backgroundColor: "rgb(252, 242, 243)" }
                });
            }

        }

    }

    const doLogout = async () => {

        const resp = await logOut()

        if (resp === "Success") {
            navigate("/login")
        }

        // window.location.reload()

    }



    return (
        <>

            <div className="main-container">
                <div className="container">
                    <TopBar />
                    <NavBar />
                </div>
                <Whatsapp />
                <div className="category_bg login_bg">
                    <div className="row">
                        <div className="col-md-6">
                            <div>
                                <img src={loginsideimg}
                                    className="log_img_st"
                                // style={{ borderTopLeftRadius: '8%', borderBottomLeftRadius: '8%', width: '103%', height: '100%' }} 
                                />
                            </div>
                        </div>
                        <div className="col-md-6 bg-white bor_rad left_form">
                            <div className="card-body my-4">
                                <img src={bookCentral} height={80} width={80} className="mb-3" />
                                <div className="header1">Login</div>
                                <p className="header_sub pt-1">Enter your email & password to login our website</p>
                                <div className="pos_rel">
                                    <label className="form_label">Email</label>
                                    <input className="form-control p_hold" type="text" placeholder="Your email address"
                                        value={email} onChange={emailHandler} />
                                    <img src={sms} className="sms_pos" />
                                </div>
                                <p style={{ color: 'red' }}>{emailError}</p>
                                <div className="pos_rel">
                                    <label className="form_label">Password</label>
                                    <input className="form-control p_hold" type={passShow ? "text" : "password"} placeholder="Enter your password"
                                        value={password} onChange={passwordHandler} />

                                    {
                                        passShow ?

                                            (<img src={eye_open} className="sms_pos" onClick={() => setPassShow(!passShow)} />)

                                            :

                                            (<img src={eyeslash} className="sms_pos" onClick={() => setPassShow(!passShow)} />)
                                    }
                                </div>
                                <p style={{ color: 'red' }}>{passwordError}</p>
                                <div className="d-flex flex-row justify-content-between mt-1">
                                    {/* <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="form_check_label fc7B8890" htmlFor="flexCheckDefault">
                                        Remember me
                                    </label>
                                </div> */}
                                    <Link className="form_check_label fc097EDA" onClick={openModal}>Forgot Password?</Link>
                                </div>

                                <div className="d-flex justify-content-center mt-2"><button className="btn btn-primary rounded-pill signin_txt" onClick={doLogin}>Sign In</button></div>
                                {/* <div className="d-flex justify-content-center mt-3"><button className="btn btn-primary rounded-pill signin_txt" onClick={doLogout}>Sign Out</button></div> */}
                                {/* <div className="d-flex justify-content-center mt-2"><button className="btn btn-outline-secondary rounded-pill d-flex align-items-center signin_txt d-flex justify-content-between">Sign In With<img src={google} /></button></div> */}
                                <div className="d-flex align-items-baseline form_footer mt-3">Don't have an account?<Link className="fw600 fc097EDA" to="/registrationsouthshore"> Sign Up</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    show={showModal}
                    onHide={closeModal}
                    backdrop="static"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Forget Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-lg-12 mb-3">
                                <label className="form-label">Enter registered email</label>
                                <input type="text" className="form-control mb-2" placeholder="Type Your Email"
                                    value={regEmail} onChange={(e) => setRegisteredEmail(e.target.value)} />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-main" onClick={sendEmail} style={{ width: '40%' }}>
                            Send Request
                        </button>
                    </Modal.Footer>
                </Modal>
                <FooterSouthsore/>

                <ToastContainer />

            </div>



        </>
    );
}

export default Login;