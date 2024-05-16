import React, { useState, useEffect } from 'react';
//import  useHistory  from 'react-router';
import { useNavigate } from 'react-router-dom';
import SVG from "react-inlinesvg";
import userIcon from '../assets/icons/user.svg';
import logoIcon from '../assets/icons/logoo.svg';
import lockIcon from '../assets/icons/lock-locked.svg';
import sms from '../assets/img/sms.png';
import eye_open from '../assets/img/eye_open.png';
import eyeslash from '../assets/img/eyeslash.png';

// import logoIcon from '../logo.svg';
import { useAuth } from '../Context/AuthContext';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Modal } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
// import {NotificationContainer, NotificationManager} from 'react-notifications';

const LoginScreen = () => {
    const navigate = useNavigate();
    const { logIn, authDeatils, forgot_password } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [regEmail, setRegEmail] = useState('');
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [usernameError, setUserNameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [passShow, setPassShow] = useState(false)

    useEffect(() => {
    }, [authDeatils])

    const usernameHandler = (e) => {
        setUserName(e.target.value)
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

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
        if(regEmail !== ""){
            const args = {
                "email" : regEmail
            };
            const resp = await forgot_password(args);
            toast.success(resp, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                closeButton:false,
                // style: {fontWeight: 'bold',backgroundColor:"rgb(255, 237, 246)"}
            });
            closeModal();
        }
    }

    // const doLogin = async () => {
    //     const arg = {
    //         "email": username,
    //         "password": password
    //     }
    //     const resp = await logIn(arg);
    //     console.log("login_resp ",resp)
    //     navigate('/dashboard');
    // }

    const doLogin = async () => {
        if (username === '' && password === '') {
            setUserNameError('Please enter email')
            setPasswordError('Please enter password')
        }
        else if (username === '') {
            setUserNameError('Please enter email')
            setPasswordError('')
        }
        else if (password === '') {
            setPasswordError('Please enter password')
            setUserNameError('')
        }

        else {
            var sendLoginData = {
                email: username,
                password: password
            }

            const resp = await logIn(sendLoginData)
            console.log("login response", resp)

            if (resp === undefined || resp === null) {
                // navigate('/');
                toast.error("Login Unsuccessfull", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    closeButton: false,
                    style: { fontWeight: 'bold', backgroundColor: "rgb(255, 237, 246)" }
                });
                console.log("Login Unsuccessful")

            }
            else {
                console.log("Login Successful");
                console.log("Login data received : ", resp);
                console.log("Auth details received : ", authDeatils);
                const result = jwtDecode(resp.token)
                if (result.role === "South Shore Admin") {
                    navigate('/dashboard');
                }
                else if (result.role === "Publisher Admin" || result.role === "Publisher User") {
                    navigate('/dashboardpub');
                }
                else {
                    navigate('/');
                }
            }

        }


    }

    // const logInNew = async () => {
    //     const args = {
    //         "email": "sayakmajumder97@gmail.com",
    //         "password": "1746@edg"
    //     }
    //     console.log("Arguments passed to login : ", args)
    //     try {
    //         const response = await axios.post('https://ebooksjunction.com/api/account/login', args,
    //             {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //             });

    //         console.log("Response : ", response);

    //     } catch (error) {
    //         console.log("Error :", error);
    //     }
    // }

    return (
        <div className="login_bg min-vh-100 d-flex justify-content-center align-items-center">
            <div className="container" style={{ width: '33%' }}>
                <div className='bg-white p-5' style={{ borderRadius: '30px' }}>

                    <div className='d-flex justify-content-center login_head mb-2'>Login</div>
                    <div className='d-flex justify-content-center login_sub_head mb-2'>Enter your email & password </div>

                    <div className="mb-3 pos_rel">
                        <label for="formGroupExampleInput" className="form-label form_label">Email</label>
                        
                        <input type="text"
                            className="form-control login_input"
                            id="formGroupExampleInput"
                            placeholder="Your email address"
                            value={username}
                            onChange={usernameHandler}
                        />
                        
                        <img src={sms} className='sms_pos' />
                        
                    </div>
                    <p style={{ color: 'red' }}>{usernameError}</p>
                    <div className="mb-3 pos_rel">
                        <label for="formGroupExampleInput2" className="form-label form_label">Password</label>
                        
                        <input type={passShow ? "text" : "password"}
                            className="form-control login_input"
                            id="formGroupExampleInput2"
                            placeholder="Enter your password"
                            value={password}
                            onChange={passwordHandler}
                        />
                        
                        {
                            passShow ?

                                (<img src={eye_open} className="sms_pos" onClick={() => setPassShow(!passShow)} />)

                                :

                                (<img src={eyeslash} className="sms_pos" onClick={() => setPassShow(!passShow)} />)
                        }
                        
                    </div>
                    <p style={{ color: 'red' }}>{passwordError}</p>
                    <div className='d-flex justify-content-end forget_pass' onClick={openModal}>Forgot Password?</div>
                    <div className='d-flex justify-content-center mt-5'>
                        <button type="button" 
                        class="btn btn_login" 
                        onClick={doLogin}
                        >Login</button>
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
            <ToastContainer />
        </div >
    )
}

export default LoginScreen;