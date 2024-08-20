import React, { useEffect, useState, } from "react";
import TopBarSouthsore from "../Layout/TopBarSouthsore";
import NavBarSouthsore from "../Layout/NavBarSouthsore";
import FooterSouthsore from "../Layout/FooterSouthsore";
import Accordion from 'react-bootstrap/Accordion';
import Whatsapp from "../Layout/Whatsapp";
import TopBar from "../Layout/TopBar";

const FaqScreen = () => {
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
        <TopBar />
        <NavBarSouthsore />
      </div>
      <Whatsapp/>
      <div className="about-southshore py-5" style={{backgroundColor:'#F7F8FA',paddingLeft:'8%',paddingRight:'8%', marginTop:'1%'}}>
            <div className="row">
                <div className="col-md-12 cert_l_col">
                    <div className="about-southshore-header">
                        <div className="d-flex justify-content-between mb-3" style={{width:'100%'}}>
                            <h4>FAQs Customer</h4>
                            <button className="btn btn-primary" onClick={handleClick}>Back</button>
                        </div>
                    </div>
                    <div className="about-southshore-body">
                      <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>What is ebooksjunction?</Accordion.Header>
                          <Accordion.Body>
                            Ebooksjunction is a platform which provides readers digital content 
                            in the form of ebooks across genres, languages and publishers.
                          </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="1">
                          <Accordion.Header>How is it different from Amazon Kindle?</Accordion.Header>
                          <Accordion.Body>
                            There is basically no difference, both are platforms for digital content. 
                          </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="2">
                          <Accordion.Header>What kind of books are on the platform?</Accordion.Header>
                          <Accordion.Body>
                            Books span different publishers, both Indian and International and are across genres and languages.
                          </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="3">
                          <Accordion.Header>How do I read a book after purchase?</Accordion.Header>
                          <Accordion.Body>
                            The platform has a proprietary reader which works cross platform across IOS and Android devices. In addition, there are applications for the desktop use. After purchase of a book, one needs to download the appropriate reader and start reading.
                          </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="4">
                          <Accordion.Header>Why should I use only your reader, why can I not download the book and read?</Accordion.Header>
                          <Accordion.Body>
                            Authors and other creators of content spend a large amount of time in creation of their content, 
                            and it would only be right for them to get compensated for that. 
                            Hence we do not allow for a download except into the reader.
                          </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="4">
                          <Accordion.Header>What devices can I read the content on?</Accordion.Header>
                          <Accordion.Body>
                            You could read the content on a Desktop, Laptop, Tablet and phones both IOS and Android. 
                          </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="5">
                          <Accordion.Header>Do I need to register to buy any content on the platform?</Accordion.Header>
                          <Accordion.Body>
                            Yes, you would need to register on the platform which is a simple process. You get access to your space where your books would reside.
                          </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="6">
                          <Accordion.Header>If I want to re-read a book, how do I do it?</Accordion.Header>
                          <Accordion.Body>
                            You just need to log in, go to your bookshelf where all the books you have purchased would be 
                            displayed. You could just download into the reader and start reading. 
                          </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="7">
                          <Accordion.Header>Is there a restriction on the number of devices that I can use concurrently?</Accordion.Header>
                          <Accordion.Body>
                            We currently allow 4 concurrent devices.  
                          </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="8">
                          <Accordion.Header>Is there a restriction on the number of devices that I can use concurrently?</Accordion.Header>
                          <Accordion.Body>
                            We currently allow 4 concurrent devices.  
                          </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="9">
                          <Accordion.Header>Can I share the content?</Accordion.Header>
                          <Accordion.Body>
                            You would not be able to share the content and if another user needs content, 
                            they would need to register on the platform and buy the content they need.
                          </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="10">
                          <Accordion.Header>As a professional I would like to make notes for reference, is it possible?</Accordion.Header>
                          <Accordion.Body>
                            Yes, that is possible. 
                          </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="11">
                          <Accordion.Header>Is the payment process secure?</Accordion.Header>
                          <Accordion.Body>
                            Yes, it is secure. The platform is integrated with a secure and reliable payment gateway 
                            allowing for a seamless experience. 
                          </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="12">
                          <Accordion.Header>Is my personal information secure?</Accordion.Header>
                          <Accordion.Body>
                            Yes, it is secure. We do not share information except in extreme cases when requested by 
                            the government of India.
                          </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="13">
                          <Accordion.Header>Will you share my information to marketing companies?</Accordion.Header>
                          <Accordion.Body>
                            No, we do not as we strongly feel that it is an infringement on personal privacy.
                          </Accordion.Body>
                        </Accordion.Item>

                      </Accordion>
                        
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

export default FaqScreen;