import React from "react";
import admin_logo from "../Assets/Images/logoo.svg";
import southshore_logo from "../Assets/Images/southshore-logo.png";
import admin_cert from "../Assets/Images/cert.png";

const AboutSouthshoreCert = ()=>{
    return (
        <div className="about-southshore py-5" style={{backgroundColor:'#EBF3FA',paddingLeft:'8%',paddingRight:'8%', marginTop:'-1%'}}>
            <div className="row">
                <div className="col-md-8 cert_l_col">
                    
                    <div className="about-southshore-header">
                        <div className="logo">
                            <img src={southshore_logo}/>
                        </div>
                        <div className="heading-text">
                            <h1>About <br /> Southshore Innovations</h1>
                            <p>Exploring Boundless Worlds, One Page at a Time.</p>
                        </div>
                    </div>
                    <div className="about-southshore-body">
                        <p className="mt-5">
                            Southshore Innovations Private Limited is a technology focused company headquartered at Chennai. 
                            The company is promoted by techno functional professionals with deep domain experience in different 
                            areas such as book production, sales, customer experience, 
                            distribution with specific focus on the publishing industry.
                        </p>
                        <p className="mt-2" style={{fontStyle: 'italic', color: '#26252C'}}>
                            Southshore operates two platforms in the publishing space.&nbsp;  
                            <span className="link_text"><a href="https://www.bookscentral.in/">Books Central</a></span> &nbsp;
                            which a B2B platform for books in the academic and professional genres and  &nbsp; 
                            <span className="link_text"><a href="https://www.ebooksjunction.com"> e-booksjunction </a> </span> &nbsp; a marketplace for e-books 
                            across genres and languages.
                        </p>
                        <p className="mt-2">
                            The company works with authors helping them publish books and also 
                            provides services across the spectrum of publishing.
                        </p>
                        <p className="mt-2">
                            Southshore  represents leading international publishers in India for sales of their digital 
                            content in the institutional segment. The publishers we represent include Brill, 
                            Jove, De Gruyter, Taylor & Francis, Writefull, apart from others through a partnership with Accucom.
                        </p>
                        <p className="mt-2">For more information please refer to the link <span className="website_link"> www.southshore.in</span></p>
                    </div>
                </div>
                <div className="col-md-4 cert_img">
                    <img src={admin_cert} className="cert_img_h_w"/>
                </div>
            </div>
            
        </div>
    );
}

export default AboutSouthshoreCert;