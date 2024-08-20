import React, { useEffect, useState, } from "react";
import TopBarSouthsore from "../Layout/TopBarSouthsore";
import NavBarSouthsore from "../Layout/NavBarSouthsore";
import FooterSouthsore from "../Layout/FooterSouthsore";
import Config from "../Config/Config.json"
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import Whatsapp from "../Layout/Whatsapp";


const PrivacyPolicyScreen = () => {

  const navigate = useNavigate();

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
                            <h4>Privacy Policy</h4>
                            {/* <HashLink smooth  to='/#contact' > Back </HashLink> */}
                            <button className="btn btn-primary" onClick={handleClick}>Back</button>
                        </div>
                    </div>
                    <div className="about-southshore-body">
                        <p className="mt-5">At “bookscentral”, which a product owned 
                          by Southshore Innovations Private Limited <Link to={Config.home_links} className="home_nav_link">(www.bookscentral.in)</Link>, 
                          one of our main priorities is the privacy of our visitors and Southshore Innovations Private Limited 
                          is committed to the same in its words & spirit. 
                          This document on Privacy Policy contains types of information that are 
                          collected and recorded by Southshore Innovations Private Limited and 
                          how we use it. We take due care to protect the same with no sharing of 
                          such information with any third parties.</p>

                        <p className="mt-2">However, it must be made clear in unambiguous words that 
                          Southshore Innovations Private Limited shall not be responsible for availability 
                          of the personal information of its user in any other public domain.
                        </p>

                        <p className="mt-2">This Privacy Policy applies only to our online 
                          activities and is valid for visitors to our website with regards to the 
                          information that they share with and/or collect from 
                          Southshore Innovations Private Limited. This policy is not applicable to any information 
                          collected offline or via channels other than this website.
                        </p>

                        <p className="mt-2">By using our website, you hereby consent to our Privacy Policy 
                        and agree to its terms & conditions. The personal information that you are asked to 
                        provide shall remain confidential. The reasons why you are asked to provide the same, 
                        will be made clear to you as and when requested.
                        </p>

                        <p className="mt-2">While contacting us directly, 
                        we may receive additional information about you such as your name, 
                        email address, phone number, the contents of the message and/or attachments 
                        you may send us, and any other information you may choose to provide.
                        </p>

                        <p className="mt-2">When you register for an Account, we may ask for your contact information, 
                        including items such as name, company name, address, email address, and telephone number. 
                        We use the information we collect in various ways, 
                        including to provide, operate, and maintain our website, improve, personalize, and expand our website,
                         understand and analyse how you use our website, develop new products, services, features, and 
                         functionality, communicate with you, either directly or through one of our partners, 
                         including for customer service, to provide you with updates and other information 
                         relating to the website, and for marketing and promotional purposes sending you emails.
                        </p>

                        <p className="mt-2">In line with industry guidelines & practices, 
                        Southshore Innovations Private Limited also follows a standard procedure of using log files. 
                        These files log visitors when they visit websites. The information collected by log files include 
                        internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, 
                        referring/exit pages, and possibly the number of clicks. 
                        These are not linked to any information that is personally identifiable. 
                        The purpose of the information is for analysing trends, administering the site, 
                        tracking users' movement on the website, and gathering demographic information.
                        </p>

                        <p className="mt-2">Third-party ad servers or ad networks uses technologies like cookies, 
                        JavaScript, or Web Beacons that are used in their respective advertisements and 
                        links that appear on Southshore Innovations, which are sent directly to users' browser. 
                        Note that Southshore Innovations Private Limited has no access to, or control over these 
                        cookies that are used by third-party advertisers. They automatically receive your 
                        IP address when this occurs. These technologies are used to measure the effectiveness of 
                        their advertising campaigns and/or to personalize the advertising content that you see on 
                        websites that you visit.
                        </p>

                        <p className="mt-2">The Privacy Policy of Southshore Innovations Private Limited does not apply 
                        to other advertisers or websites. Thus, we are advising you to consult the 
                        respective Privacy Policies of these third-party ad-servers for more detailed information. 
                        It may include their practices and instructions about how to opt-out of certain options. 
                        You can choose to disable cookies through your individual browser options. 
                        More detailed information about cookie management with specific web browsers, 
                        can be found at the websites of the respective browsers.
                        </p>

                        <p className="mt-2">In addition to above, under the California Consumer Privacy Act 
                        (CCPA), among other rights, California consumers have the right to (a) 
                        request that a business that collects a consumer's personal data disclose the categories and 
                        specific pieces of personal data that a business has collected about consumers (b) 
                        request that a business delete any personal data about the consumer that a business has collected (c) 
                        request that a business that sells a consumer's personal data, 
                        not to sell the consumer's personal data. If you make a request, 
                        we have one month to respond to you. If you would like to exercise any of these rights, 
                        please contact us.
                        </p>

                        <p className="mt-2">Pursuant to the applicable provisions of the EU 
                          General Data Protection Regulation, every user is entitled to (a) right to access – you have the right to request copies of your personal data. 
                          We may charge you a small fee for this service. (b) right to rectification – you have the right to request 
                          that we correct any information you believe is inaccurate. 
                          You also have the right to request that we complete the information you believe is incomplete. 
                          (c) right to erasure – you have the right to request that we erase your personal data, 
                          under certain conditions. (d) right to restrict processing – you have the right to 
                          request that we restrict the processing of your personal data, under certain conditions. 
                          (e) right to object to processing – you have the right to object to our processing of your personal data, 
                          under certain conditions. (f) right to data portability – you have the right to request that 
                          we transfer the data that we have collected to another organization, or directly to you, under certain conditions. 
                          If you would like to exercise any of these rights, please contact us. In case of any such requests, 
                          we reserve one month’s time to respond to you.
                        </p>

                        <p className="mt-2">Children's Information: Another part of our priority is 
                        adding protection for children while using the internet. 
                        We encourage parents and guardians to observe, participate in, 
                        and/or monitor and guide their online activity. 
                        We do not knowingly collect any Personal Identifiable Information from children under the age of 18. 
                        If you think that your child has provided this kind of information on our website, 
                        we strongly encourage you to contact us immediately and we will do our best efforts to 
                        promptly remove such information from our records.
                        </p>

                        <p className="mt-2">This Policy is subject to change and can be amended as & 
                          when required at any time without notice and 
                          we request you to go through the Privacy Policy of Southshore Innovations Private Limited from 
                          time to time to keep yourself updated regarding any such changes that may have occurred. 
                        </p>

                        <p className="mt-2">If you have additional questions or require more 
                          information about our Privacy Policy, 
                          do not hesitate to contact us at compliance@southshore.in
                        </p>

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

export default PrivacyPolicyScreen;