import React, { useEffect, useState, } from "react";
import TopBarSouthsore from "../Layout/TopBarSouthsore";
import NavBarSouthsore from "../Layout/NavBarSouthsore";
import FooterSouthsore from "../Layout/FooterSouthsore";
import Config from "../Config/Config.json"
import { Link } from "react-router-dom";
import Whatsapp from "../Layout/Whatsapp";

const CopyrightScreen = () => {
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
                        <div className="d-flex justify-content-between mb-4" style={{width:'100%'}}>
                            <h4>Copyright Policy</h4>
                            <button className="btn btn-primary" onClick={handleClick}>Back</button>
                        </div>
                    </div>
                    <div className="about-southshore-body">
                        <h6>Introduction</h6>
                        <p className="mt-5"><Link to={Config.home_links} className="home_nav_link">www.ebooksjunction.com</Link> (A division of Southshore Innovations Private Limited) 
                        is an e-commerce web portal which provides publishers the facility to create 
                        their own webstore and display and sell their digital content to customers.
                        </p>

                        <p className="mt-2">The platform <Link to={Config.home_links} className="home_nav_link">www.ebooksjunction.com</Link> is a e-commerce enabled web portal where authors,
                         publishers and other institutions are provided the facility to upload, display, price and sell their digital content.
                        </p>

                        <p className="mt-2">Digital content could be in the form of articles, 
                        journals and books uploaded and displayed on the platform <Link to={Config.home_links} className="home_nav_link">www.ebooksjunction.com</Link>. 
                        These could be by an author or a publisher as the case maybe. 
                        </p>

                        <p className="mt-2">By using our website, you hereby consent to our Privacy Policy 
                        and agree to its terms & conditions. The personal information that you are asked to 
                        provide shall remain confidential. The reasons why you are asked to provide the same, 
                        will be made clear to you as and when requested.
                        </p>

                        <p className="mt-2">The Buyer is defined as a user registered on the web portal <Link to={Config.home_links} className="home_nav_link">www.ebooksjunction.com</Link> 
                        who is interested in purchasing such digital content as 
                        he / she may desire and is provided the provided the facility of searching of content based on 
                        multiple parameters. 
                        </p>

                        <p className="mt-2">The Seller is the web portal <Link to={Config.home_links} className="home_nav_link">www.ebooksjunction.com</Link> and all sales to buyers happens through the aegis of the web portal. 
                        </p>
                        <h6>Copyright Ownership</h6>
                        <p className="mt-2">The content which could be in the form of articles, journals or books displayed on this 
                        site shall remain the copyrighted material of its publisher. Dissemination of any information and / 
                        or derivative works using such content shall be governed by the terms and conditions 
                        prescribed by its publishers or owners.
                        </p>

                        <h6>Intellectual Property Rights</h6>
                        <p className="mt-2">Ownership of the content placed on the platform belong to the publishers or owners. 
                        We request that the IP rights are respected in this regard. 
                        </p>

                        <p className="mt-2">The unauthorised use, reproduction, distribution or modification of digital content is 
                        strictly prohibited by any of the buyers of such 
                        content from the web portal <Link to={Config.home_links} className="home_nav_link">www.ebooksjunction.com</Link>
                        </p>

                        <p className="mt-2">Any such unauthorised use will result in the concerned buyer being deactivated from the web portal forthwith without prior notification. 
                        </p>
                        <h6>Content submission & licensing</h6>
                        <p className="mt-2">Sellers on the platform who wish to place, display and sell their digital content, 
                        are required to follow the process of uploading such content as defined in the web portal. 
                        </p>

                        <p className="mt-2">Sellers / publishers / authors are required to ensure that they follow the copyright laws in India
                         in force at the time of upload. The web portal  <Link to={Config.home_links} className="home_nav_link">www.ebooksjunction.com</Link> does not take responsibility for the same. 
                        </p>

                        <p className="mt-2">On receipt of any copyright infringement the web portal 
                        <Link to={Config.home_links} className="home_nav_link">www.ebooksjunction.com</Link> would temporarily deactivate the said content and inform the publisher / 
                        author of the same. It would be the responsibility of the owner of the said content to provide required 
                        documentation of the said content in dispute. The content would be reactivated 
                        only on satisfactory submission of such documentation. 
                        </p>

                        <p className="mt-2">In the event of repeated complaints against a said publisher / author / content owner, 
                        the right to remove all content related to the said publisher / author / content owner would 
                        rest solely with the web portal  <Link to={Config.home_links} className="home_nav_link">www.ebooksjunction.com</Link>. 
                        </p>

                        <p className="mt-2">In the event of such infringement of copyright, 
                        the content owner would be solely responsible for any legal consequences and the web portal 
                        <Link to={Config.home_links} className="home_nav_link">www.ebooksjunction.com</Link> would not be a party to the same or held responsible. 
                        </p>

                        <h6>Modification of copyright policy</h6>
                        <p className="mt-2">The web portal  <Link to={Config.home_links} className="home_nav_link">www.ebooksjunction.com</Link> reserves the right to change the terms of 
                        this copyright policy as may be required from time to time. It would be the responsibility of the 
                        content owner to review this policy and take not and comply with any such changes. 
                        </p>

                        <h6>Governing Laws:</h6>
                        <p className="mt-2">This policy is governed by the copyright laws of India.  
                        </p>

                        <h6>Contact Information</h6>
                        <p className="mt-2">For any queries / clarifications please reach us at compliance@southshore.in
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

export default CopyrightScreen;