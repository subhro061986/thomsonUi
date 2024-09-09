import React, { useEffect, useState, } from "react";
import { Link, json } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import TopBar from "../Layout/TopBar";
import NavBar from "../Layout/NavBar";
import Footer from "../Layout/Footer";

import { useAuth } from "../Context/Authcontext";

import loginsideimg from "../Assets/Images/New_login_img.png"
import bookCentral from "../Assets/Images/book_central_logo_png.png"
import sms from "../Assets/Images/sms.png"
import eyeslash from "../Assets/Images/eyeslash.png"
import eye_open from "../Assets/Images/eye_open.png"
import google from "../Assets/Images/google.png"
import user from "../Assets/Images/user.png"
import call from "../Assets/Images/call.png"
import profile from "../Assets/Images/profile.png";
import TopBarSouthsore from "../Layout/TopBarSouthsore";
import NavBarSouthsore from "../Layout/NavBarSouthsore";
import Whatsapp from "../Layout/Whatsapp";
import FooterSouthsore from "../Layout/FooterSouthsore";
import PasswordChecklist from "react-password-checklist";


const RegistrationSouthshore = () => {

    const navigate = useNavigate();
    const { Registration } = useAuth()
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const [usernameError, setUserNameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const [profilePic, setProfilePic] = useState('')
    const [passShow, setPassShow] = useState(false)
    const [confirmPassShow, setConfirmPassShow] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {

    }, [])

    const user_registration = async () => {
        var json = {
            email: email,
            password: password,
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
                alert("Registered successfully. Please check your registered email")
                setProfilePic(prof_img)
                navigate("/login")
            }

            else {
                setEmailError('Account already exist with this email!')
            }
        }
    }


    const do_registration = () => {
        // if (username === '' && password === '' && email === '' && phone === '') {
        //     setUserNameError('Please enter username')
        //     setPhoneError('Please enter phone number')
        //     setPasswordError('Please enter password')
        //     setEmailError('Please enter email')
        // }
        if (username === '' && email === '' && phone === '' && password === '') {
            setUserNameError('Please enter username')
            setPhoneError('Please enter phone number')
            setPasswordError('Please enter password')
            setEmailError('Please enter email')
        }
        else if (username === '') {
            setUserNameError('Please enter username')
            setPhoneError('')
            setPasswordError('')
            setEmailError('')
        }
        else if (password === '') {
            setPasswordError('Please enter password')
            setPhoneError('')
            setUserNameError('')
            setEmailError('')
        }
        else if (confirmPassword === '') {
            setConfirmPasswordError('Please confirm your password')
            setPhoneError('')
            setUserNameError('')
            setEmailError('')
        }
        else if (email === '') {
            setEmailError('Please enter email')
            setPhoneError('')
            setUserNameError('')
            setPasswordError('')
        }
        else if (phone === '') {
            setEmailError('')
            setPhoneError('Please enter phone number')
            setUserNameError('')
            setPasswordError('')
        }

        else if (password !== confirmPassword){
            setConfirmPasswordError('Password and confirm password do not match!')
        }
        else {
            user_registration()

        }
    }

    return (
        <div className="main-container">
            <div className="container">
                <TopBar/>
                <NavBarSouthsore />
            </div>
            <Whatsapp />
            <div className="category_bg regis_bg">
                <div className="row px-0">
                    <div className="col-md-6">
                        <div 
                        // className="h100"
                        >
                            <img src={loginsideimg}
                                className="log_img_st"
                            // style={{ borderTopLeftRadius: '8%', borderBottomLeftRadius: '8%', width: '103%', height: '100%' }}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 bg-white bor_rad left_form">
                        <div className="card-body my-4">
                            <img src={bookCentral} height={80} width={80} className="mb-3" />
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

                             <div className="pos_rel">
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
                            <p style={{ color: 'red' }}>{passwordError}</p> 

                             <div className="pos_rel">
                                <label className="form_label">Confirm Password</label>
                                <input className="form-control p_hold" type={confirmPassShow ? "text" : "password"} placeholder="Enter your password"
                                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                {
                                    confirmPassShow ?

                                        (<img src={eye_open} className="sms_pos" onClick={() => setConfirmPassShow(!confirmPassShow)} />)

                                        :

                                        (<img src={eyeslash} className="sms_pos" onClick={() => setConfirmPassShow(!confirmPassShow)} />)
                                }
                            </div>
                            <p style={{ color: 'red' }}>{confirmPasswordError}</p> 
                            
                            <PasswordChecklist
                                rules={["capital", "match", "specialChar", "minLength", "number", "lowercase", "notEmpty"]}
                                minLength={8}
                                value={password}
                                valueAgain={confirmPassword}
                            />

                            <div className="d-flex justify-content-center mt-3"><button className="btn btn-primary rounded-pill signin_txt" onClick={do_registration}>Sign Up</button></div>
                            {/* <div className="d-flex justify-content-center mt-2"><button className="btn btn-outline-secondary rounded-pill d-flex align-items-center signin_txt d-flex justify-content-between">Sign In With<img src={google} /></button></div> */}
                            <div className="d-flex align-items-baseline form_footer mt-2">I have already account! <Link className="fw600 fc097EDA" to="/login"> Log In</Link></div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterSouthsore />
        </div>
    );
}

export default RegistrationSouthshore;