import React, { useEffect, useState, } from "react";
import { Link, json } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import TopBar from "../Layout/TopBar";
import NavBar from "../Layout/NavBar";
import Footer from "../Layout/Footer";

import { useAuth } from "../Context/Authcontext";

import loginsideimg from "../Assets/Images/loginsideimg.png"
import sms from "../Assets/Images/sms.png"
import eyeslash from "../Assets/Images/eyeslash.png"
import eye_open from "../Assets/Images/eye_open.png"
import google from "../Assets/Images/google.png"
import user from "../Assets/Images/user.png"
import call from "../Assets/Images/call.png"
import profile from "../Assets/Images/profile.png";
import Whatsapp from "../Layout/Whatsapp";

const Registration = () => {

    const navigate = useNavigate();
    const { Registration } = useAuth()
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [usernameError, setUserNameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const [profilePic, setProfilePic] = useState('')
    const [passShow, setPassShow] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {

    }, [])

    const user_registration = async () => {
        var json = {
            email: email,
            // password: password,
            contactno: phone,
            name: username
        }
        const resp = await Registration(json)
        console.log('reg_resp', resp)

        if (resp === undefined || resp === null || resp === '') {
            // ** change it as needed
            console.log('registraion resp not obtained')
        }
        else {
            if (resp.statuscode === '0') {
                let prof_img = resp.output['profileimage'] !== null ? resp.output['profileimage'] : profile
                console.log("registered successfully")
                setProfilePic(prof_img)
                navigate("/login")
            }

            else {
                setEmailError('Account already exist with this email!')
            }
        }
    }


    const do_registration = () => {
        if (username === ''  && email === '' && phone === '') {
            setUserNameError('Please enter username')
            // setPasswordError('Please enter password')
            setEmailError('Please enter email')
            setPhoneError('Please enter phone number')
        }
        // if (username === '' && password === '' && email === '' && phone === '') {
        //     setUserNameError('Please enter username')
        //     setPasswordError('Please enter password')
        //     setEmailError('Please enter email')
        //     setPhoneError('Please enter phone number')
        // }
        else if (username === '') {
            setUserNameError('Please enter username')
            setPasswordError('')
            setEmailError('')
            setPhoneError('')
        }
        // else if (password === '') {
        //     setPasswordError('Please enter password')
        //     setUserNameError('')
        //     setEmailError('')
        //     setPhoneError('')
        // }
        else if (email === '') {
            setEmailError('Please enter email')
            setUserNameError('')
            setPasswordError('')
            setPhoneError('')
        }
        else if (phone === '') {
            setEmailError('')
            setPhoneError('Please enter phone number')
            setUserNameError('')
            setPasswordError('')
        }
        else {
            user_registration()
        }
    }

    return (
        <div className="main-container">
            <div className="container">
                <TopBar />
                <NavBar />
            </div>
            <Whatsapp/>
            <div className="category_bg regis_bg">
                <div className="row px-0">
                    <div className="col-md-6">
                        <div className="h100">
                            <img src={loginsideimg}
                                className="log_img_st"
                            // style={{ borderTopLeftRadius: '8%', borderBottomLeftRadius: '8%', width: '103%', height: '100%' }}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 bg-white bor_rad left_form">
                        <div className="card-body my-4">
                            <div className="header1">Sign Up</div>
                            <div className="header_sub pt-1 mb-2">Experience the most efficient way of reading. </div>
                            <div className="pos_rel">
                                <label className="form_label">Name</label>
                                <input className="form-control p_hold" type="text" placeholder="Your user name"
                                    value={username} onChange={(e) => setUserName(e.target.value)}
                                />
                                <img src={user} className="sms_pos" />
                            </div>
                            <p style={{ color: 'red' }}>{usernameError}</p>
                            <div className="pos_rel">
                                <label className="form_label">Email</label>
                                <input className="form-control p_hold" type="email" placeholder="Your email address"
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                />
                                <img src={sms} className="sms_pos" />
                            </div>
                            <p style={{ color: 'red' }}>{emailError}</p>

                            <div className="pos_rel">
                                <label className="form_label">Phone No</label>
                                <input className="form-control p_hold" type="text" placeholder="Your phone number"
                                    value={phone} onChange={(e) => setPhone(e.target.value)}
                                />
                                <img src={call} className="sms_pos" />
                            </div>
                            <p style={{ color: 'red' }}>{phoneError}</p>

                            {/* <div className="pos_rel">
                                <label className="form_label">Password</label>
                                <input className="form-control p_hold" type={passShow ? "text" : "password"} placeholder="Enter your password"
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                />
                                {
                                    passShow ?

                                        (<img src={eye_open} className="sms_pos" onClick={() => setPassShow(!passShow)} />)

                                        :

                                        (<img src={eyeslash} className="sms_pos" onClick={() => setPassShow(!passShow)} />)
                                }
                            </div>
                            <p style={{ color: 'red' }}>{passwordError}</p> */}


                            <div className="d-flex justify-content-center mt-4"><button className="btn btn-primary rounded-pill signin_txt" onClick={do_registration}>Sign Up</button></div>
                            {/* <div className="d-flex justify-content-center mt-2"><button className="btn btn-outline-secondary rounded-pill d-flex align-items-center signin_txt d-flex justify-content-between">Sign In With<img src={google} /></button></div> */}
                            <div className="d-flex align-items-baseline form_footer mt-5">I have already account! <Link className="fw600 fc097EDA" to="/login"> Log In</Link></div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Registration;