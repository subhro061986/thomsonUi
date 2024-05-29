import React, { useEffect, useState, } from "react";
import { Button } from 'react-bootstrap';

import eyeslash from "../Assets/Images/eyeslash.png"
import eye_open from "../Assets/Images/eye_open.png"
import close from "../Assets/Images/close-circle.png"

import TopBar from "../Layout/TopBar";
import NavBar from "../Layout/NavBar";
import TopBanner from "../Layout/Banner";
import About from "../Layout/About";
import Footer from "../Layout/Footer";
import Playstore from "../Layout/Playstore";
import Guideline from "../Layout/Guideline";
import Testimonials from "../Layout/Testimonials";


import NewArrivalBooks from "../Layout/NewArrivalBooks";
import Category from "../Layout/Category";
import BestSellingBooks from "../Layout/BestSellingBooks";
import ReccomendedBooks from "../Layout/ReccomendedBooks";
import TopBarSouthsore from "../Layout/TopBarSouthsore";
import NavBarSouthsore from "../Layout/NavBarSouthsore";
import AboutSouthshore from "../Layout/AboutSouthshore";
import HowtoSouthsore from "../Layout/HowtoSouthsore";
import GuidelineSouthsore from "../Layout/GuidelineSouthsore";
import PublisherSouthsore from "../Layout/PublisherSouthsore";
import AboutSouthshoreCert from "../Layout/AboutSouthshoreCert";
import FooterSouthsore from "../Layout/FooterSouthsore";
import BannerSouthsore from "../Layout/BannerSouthsore";
import Whatsapp from "../Layout/Whatsapp";
import { useAuth } from "../Context/Authcontext";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useLocation } from 'react-router-dom';


const SouthsoreScreen = () => {
  const [modal, setModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [tokenExpiredMsg, setTokenExpiredMsg] = useState('');
  const [passShow, setPassShow] = useState(false)
  const [confPassShow, setConfPassShow] = useState(false)
  const { createNewPassword, resendPasswordCreationEmail } = useAuth()
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const urlContainsToken = window.location.href.includes('token');
    if (urlContainsToken) {
      setModal(true);
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const token = urlParams.get('token')
      decode_token(token)
    }
  }, [])

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)

    if (password !== e.target.value) {
      setConfirmPasswordError('Passwords do not match')
      setPasswordMatch(false)
    }
    else {
      setConfirmPasswordError('')
      setPasswordMatch(true)
    }
  }

  const decode_token = async (token) => {
    console.log("Token_to_decode :", token)
    let My_token = token

    if (My_token !== "") {
      const { email, exp } = jwtDecode(My_token)
      setUserEmail(email)
      console.log("decoded token= ", email)
      // Refreshing the token a minute early to avoid latency issues
      const expirationTime = (exp * 1000) - 60000

      if (Date.now() >= expirationTime) {
        console.log("Token Expired")

        setIsTokenExpired(true)
        setTokenExpiredMsg("Your token has expired.")
      }
      else {
        setIsTokenExpired(false)
      }
    }
  }

  const resendPasswordCreationMail = async () => {
    const json = {
      email: userEmail
    }
    const resp = await resendPasswordCreationEmail(json)
    if (resp.statuscode === '0') {
      setTokenExpiredMsg("Email with new link has been sent to your registered email id.")
    }
  }

  const createPassword = async () => {

    if (passwordMatch) {
      var json = {
        email: userEmail,
        password: password
      }
      const resp = await createNewPassword(json)
      console.log('reg_resp', resp)

      if (resp === undefined || resp === null || resp === '') {
        // ** change it as needed
        console.log('registraion resp not obtained')
      }
      else {
        if (resp.statuscode === '0') {
          // let prof_img = resp.output['profileimage'] !== null ? resp.output['profileimage'] : profile
          console.log("registered successfully")
          // setProfilePic(prof_img)
          navigate("/login")
        }

        else {
          // setEmailError('Account already exist with this email!')
        }
      }

    } else {
      alert("Passwords do not match")
    }
  }


  return (
    <div className="main-container">
      <div className="container">
        <TopBarSouthsore />
        <NavBarSouthsore />
      </div>
      <div id="head_banner">
        <Whatsapp />
        <BannerSouthsore />
      </div>
      <div id="about_ebook">
        {/* <AboutSouthshore /> */}
      </div>
      <PublisherSouthsore />
      <div id="features">
        {/* <HowtoSouthsore /> */}
      </div>
      {/* <NewArrivalBooks />
      <BestSellingBooks />
      <Testimonials/>
      <ReccomendedBooks/> */}

      {/* <GuidelineSouthsore /> */}

      {/* <Playstore /> */}
      <div id="about_ss">
        <AboutSouthshoreCert />
      </div>
      <div id="contact">
        <FooterSouthsore />
      </div>

      {modal && (



        <div className="custom_modal">
          <div className="custom_overlay"></div>
          <div className="custom_modal_content">
            <h2>Join with us</h2>
            <p>Fill the form and continue to join</p>

            {isTokenExpired == false ? <>
              <div className="form_fields">
                <div className="field_groups">
                  <div className="pos_rel">
                    <label className="form_label">Password</label>
                    <input className="form-control p_hold" type={passShow ? "text" : "password"} placeholder="Password"
                      value={password} onChange={handlePassword}
                      required
                    />
                    {
                      passShow ?

                        (<img src={eye_open} className="sms_pos" onClick={() => setPassShow(!passShow)} />)

                        :

                        (<img src={eyeslash} className="sms_pos" onClick={() => setPassShow(!passShow)} />)
                    }
                    {/* <img src={user} className="sms_pos" /> */}
                  </div>
                  <div className="pos_rel">
                    <label className="form_label">Confirm Password</label>
                    <input className="form-control p_hold" type={confPassShow ? "text" : "password"} placeholder="Confirm Password"
                      value={confirmPassword} onChange={handleConfirmPassword}
                      required

                    />
                    {
                      confPassShow ?

                        (<img src={eye_open} className="sms_pos" onClick={() => setConfPassShow(!confPassShow)} />)

                        :

                        (<img src={eyeslash} className="sms_pos" onClick={() => setConfPassShow(!confPassShow)} />)
                    }
                    {/* <img src={sms} className="sms_pos" /> */}
                  </div>
                </div>
                {confirmPasswordError != '' && <div style={{ 'color': 'red' }} className="mt-2">{confirmPasswordError}</div>}

              </div>
              <div className="d-flex justify-content-center mt-4">
                <Button className="custom_btn"
                  onClick={createPassword}
                >Submit</Button>
              </div>

            </>

              : <>
                <div className="alert alert-danger"> {tokenExpiredMsg}</div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>

                  <Button className="custom_btn resend_token_btn"
                    onClick={resendPasswordCreationMail}
                  >Click to Resend Token</Button>
                </div>

              </>}

            <button className='btn_modal_class_how rounded-circle_how'
              onClick={toggleModal}
            >
              <img src={close} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SouthsoreScreen;