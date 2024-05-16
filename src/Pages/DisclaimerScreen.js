import React, { useEffect, useState, } from "react";
import TopBarSouthsore from "../Layout/TopBarSouthsore";
import NavBarSouthsore from "../Layout/NavBarSouthsore";
import FooterSouthsore from "../Layout/FooterSouthsore";
import Config from "../Config/Config.json"
import { Link } from "react-router-dom";
import Whatsapp from "../Layout/Whatsapp";

const DisclaimerScreen = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {

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
        <TopBarSouthsore />
        <NavBarSouthsore />
      </div>
      <Whatsapp/>
      <div className="about-southshore py-5" style={{backgroundColor:'#F7F8FA',paddingLeft:'8%',paddingRight:'8%', marginTop:'1%'}}>
            <div className="row">
                <div className="col-md-12 cert_l_col">
                    <div className="about-southshore-header">
                        <div className="d-flex justify-content-between" style={{width:'100%'}}>
                            <h4>Ownership Disclaimer</h4>
                            <button className="btn btn-primary" onClick={handleClick}>Back</button>
                        </div>
                    </div>
                    <div className="about-southshore-body">
                        
                        <p className="mt-5"><Link to={Config.home_links} className="home_nav_link">www.ebooksjunction.com</Link> (A division of Southshore Innovations Private Limited) is an 
                        e-commerce enabled web portal which provides publishers the facility to create their own 
                        webstore and display and sell their digital content to customers. 
                        The content which could be in the form of articles, journals or books displayed on this site 
                        shall remain the copyrighted material of its publisher. Dissemination of any information and / 
                        or derivative works using such content shall be governed by the terms and conditions prescribed by its publishers 
                        or owners. <Link to={Config.home_links} className="home_nav_link">www.ebooksjunction.com</Link> (A division of Southshore innovations Private Limited) does not claim 
                        any title or ownership in such work, directly or indirectly, in any manner whatsoever. 
                        </p>

                        <p className="mt-2">For any queries / clarifications, please reach us at compliance@southshore.in</p>
                    </div>
                </div>
                
            </div>
            
        </div>
      <div id="contact">
        <FooterSouthsore/>
      </div>
    </div>
  );
}

export default DisclaimerScreen;