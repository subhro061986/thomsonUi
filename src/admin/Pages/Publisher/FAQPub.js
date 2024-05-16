import React, { useEffect, useState, } from "react";
import Header from "../../Layout/Header";
import SideMenu from "../../Layout/SideMenu";
import { Link, useNavigate } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import SVG from "react-inlinesvg";

const openLink = () => {
  window.open('http://ebooksjunction.com/demo/', '_blank');
}

const FAQPub = () => {

  return (
    <>
      <SideMenu />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <Header title="FAQs" />
        <div className="m-3 bg-white p-3">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>What is ebooksjunction?</Accordion.Header>
              <Accordion.Body>
              Ebooksjunction ( <span className="link-primary" onClick={openLink}> www.ebooksjunction.com </span> ) is an e-commerce enabled web portal which provides a facility for digital content owners to have their webstore, display their content and sell the same to their customers. 
              {/* <Route path='/privacy-policy' component={() => {
                  window.location.href = 'https://example.com/1234';
                  return null;
              }}/> */}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>What can be sold through this portal?</Accordion.Header>
              <Accordion.Body>
              Content in the form of books, journals and articles can be sold through the platform. 
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>How do I register for this portal?</Accordion.Header>
              <Accordion.Body>
              It’s a simple process. You could fill in the form online through the platform and we will reach out to you to complete the process which involves some KYC and an agreement. 
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Do I have to transfer my copyright / ownership?</Accordion.Header>
              <Accordion.Body>
              No absolutely not. You retain ownership of your content. The platform is simple an enabler to reach customers. 
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>Is my content secure?</Accordion.Header>
              <Accordion.Body>
              Yes, it is secure. The platform has a proprietary reader which is DRM enables and hence ensures the content cannot be copies and can be read only through the reader.  
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <Accordion.Header>How do I know the sales performance of my store?</Accordion.Header>
              <Accordion.Body>
              As a content seller on the platform, you have access to your own dashboard which displays performance statistics and other relevant information. The access also allows upload of fresh content. 
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="6">
              <Accordion.Header>How long does it take to go online?</Accordion.Header>
              <Accordion.Body>
              It is very quick. Post agreement, it will take less than 2-3 working days. 
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="7">
              <Accordion.Header>What formats of content are accepted?</Accordion.Header>
              <Accordion.Body>
              e-pdf / e-pub formats are accepted.  
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="8">
              <Accordion.Header>I have only print content, can I still use the portal to sell?</Accordion.Header>
              <Accordion.Body>
              That is not a problem. If print files are available, we can help convert the same to a e-pdf format. This is an inexpensive process as long as the files are in good shape. 
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="9">
              <Accordion.Header>My content is in vernacular – what do I do?</Accordion.Header>
              <Accordion.Body>
              The platform handles content across languages and this hence will not be a problem. 
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="10">
              <Accordion.Header>What are the restrictions on content?</Accordion.Header>
              <Accordion.Body>
              We do not accept any content which is pornographic in nature/ racist or disparaging to any community caste or gender. 
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="11">
              <Accordion.Header>Is there an exclusivity clause?</Accordion.Header>
              <Accordion.Body>
              There is no exclusivity clause and you as a content owner are free to place your content elsewhere. 
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="12">
              <Accordion.Header>What is the period of contract?</Accordion.Header>
              <Accordion.Body>
              The contract is perpetual with a termination clause of 60 days on either side. 
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </>
  );
}

export default FAQPub;