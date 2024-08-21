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
      <Whatsapp />
      <div className="about-southshore py-5" style={{ backgroundColor: '#F7F8FA', paddingLeft: '8%', paddingRight: '8%', marginTop: '1%' }}>
        <div className="row">
          <div className="col-md-12 cert_l_col">
            <div className="about-southshore-header">
              <div className="d-flex justify-content-between mb-3" style={{ width: '100%' }}>
                <h4>FAQs Customer</h4>
                <button className="btn btn-primary" onClick={handleClick}>Back</button>
              </div>
            </div>
            <div className="about-southshore-body">
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>What is Books Central?</Accordion.Header>
                  <Accordion.Body>
                    Books Central is a platform which provides customers print content across the genres from international publishers.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>How is this site different from other book sites?</Accordion.Header>
                  <Accordion.Body>
                    Books Central has curated content from specific publishers and covers the full catalog of the publisher. We process print and dispatch the customer requirements from our end and hence ensure that the titles listed on the site are always available.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header>What kind of books are on the platform?</Accordion.Header>
                  <Accordion.Body>
                    Bookscentral has books across the genres of Law and Humanities but has a specific focus on law titles from international publishers. This covers Indian authored titles, reprints of UK titles and imported books from the Thomson Reuters collection.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                  <Accordion.Header>What is the category of titles called Proview?</Accordion.Header>
                  <Accordion.Body>
                    Proview is a proprietary platform of Thomson Reuters. This is their platform for digital content and the titles listed under this section are e-books and can be read through their proprietary reader. Proview has legal titles of Thomson Reuters both from India and the UK. Since Southshore is the nodal agency to sell this content in India, the same are listed on the site. Your requirement will be fulfilled by us.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                  <Accordion.Header>What is the category of titles under the reprint category?</Accordion.Header>
                  <Accordion.Body>
                    Thomson Reuters gives us permission to reprint certain of their UK titles for the SAARC region. The content is the same and since they are printed locally we price them lower for this market as a different edition such that it benefits the local legal fraternity.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                  <Accordion.Header>What is Juris Press?</Accordion.Header>
                  <Accordion.Body>
                    Juris Press is our own publishing imprint. We produce titles across genres for Indian authors and sell them in the Indian markets. Some of the genres we cover are Spirituality, Self help, health and medicine, Biographies and Poetry.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="5">
                  <Accordion.Header>Do I need to register to buy any content on the platform?</Accordion.Header>
                  <Accordion.Body>
                    Yes, you would need to register on the platform which is a simple process. You get access to your space where your books would reside.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="6">
                  <Accordion.Header>How is the delivery process and how will I know if my order has been shipped?</Accordion.Header>
                  <Accordion.Body>
                    Books Central uses reputed shippers / courier companies and we ensure that the ordered books reach you within the notified time frame. In addition, we also use India Post to cover remote pin codes and hence ensure pan India shipping. As soon as the order is shipped, the details of the shipment are posted and it will show when you log in to your account.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="7">
                  <Accordion.Header>Is the payment process secure?</Accordion.Header>
                  <Accordion.Body>
                    Yes, it is secure. The platform is integrated with a secure and reliable payment gateway allowing for a seamless experience.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="8">
                  <Accordion.Header>Is there a restriction on the number of devices that I can use concurrently?</Accordion.Header>
                  <Accordion.Body>
                    We currently allow 4 concurrent devices.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="9">
                  <Accordion.Header>Is my personal information secure?</Accordion.Header>
                  <Accordion.Body>
                    Yes, it is secure. We do not share information except in extreme cases when requested by the government of India.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="10">
                  <Accordion.Header>Will you share my information to marketing companies?</Accordion.Header>
                  <Accordion.Body>
                    No, we do not as we strongly feel that it is an infringement on personal privacy.
                  </Accordion.Body>
                </Accordion.Item>

                {/* <Accordion.Item eventKey="11">
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
                </Accordion.Item> */}

              </Accordion>

            </div>
          </div>

        </div>

      </div>
      <div id="contact">
        <FooterSouthsore />
      </div>
    </div>
  );
}

export default FaqScreen;