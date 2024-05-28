import publisher_logo from "../Assets/Images/publisher_demo.png";
import admin_logo from "../Assets/Images/book_central.png";
import facebook_logo from "../Assets/Images/Facebook-icon.png";
import youtube_logo from "../Assets/Images/Youtube-icon.png";
import linkedin_logo from "../Assets/Images/Linkedin-icon.png";
import instagram_logo from "../Assets/Images/Instagram-icon.png";
import arrow_right from "../Assets/Images/arrow_right.png";
import { Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserProfile } from "../Context/Usercontext";


const FooterSouthsore = () => {
    const { allActivePublisher } = UserProfile()
    const navigate = useNavigate();
    const location = useLocation();
    // const history = useHistory();

    const get_publisher_data = (pub_id) => {
        // let pub_id = e.target.value
        console.log('pub_id afteer navigation', pub_id)
        navigate('/home',
            { state: { publisher_id: pub_id } }
        )

    }

    const imgNavHome = () => {
        // Check if the current location is the homepage
        if (location.pathname === '/') {
            // Scroll to the top of the page
            window.scrollTo(0, 0);
        } else {
            // Navigate to the homepage
            //   history.push('/');
            navigate('/');
        }
    };
    const openMailto = (value) => {
        window.location.replace('mailto:sales@southshore.in')
    }

    return (
        <div className="mt-5">

            <div className="container my-2">
                <div className="row">
                    <div className="col-md-3 s_f_logo_col">
                        <img src={admin_logo} width={100} onClick={imgNavHome} style={{ cursor: 'pointer' }} />
                        <ul className="remove-dots" style={{paddingLeft:0}}>
                            {/* <div className="custom-footer-Header">ebooksjunction.com</div> */}

                            <li className="custom-footer-li">
                                Books central office locations
                                Plot 13, Heritage Phase 2, Telephone Nagar Perungudi, Chennai-600096
                                <p className="mt-2" style={{ cursor: 'pointer' }} onClick={openMailto}><b>Mail Us </b>: sales@southshore.in </p>
                            </li>
                            <li className="custom-footer-li">
                                <div className="south_val"><span className="south_key">CIN No:</span> U22219TN2022PTC151260</div>
                                <div className="south_val"><span className="south_key">GSTIN:</span> 33ABICS2457D1ZI</div>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-2 s_f_mar_bot">
                        <div className="d-flex flex-row">
                            <div className="">
                                <ul className="remove-dots" >
                                    <div className="custom-footer-Header">Publishers</div>
                                    {allActivePublisher.map((data, index) => (
                                        <li className="custom-footer-li" style={{ cursor: 'pointer' }} key={index}
                                            hidden={data.isactive === 1 ? false : true}
                                            onClick={(e) => { get_publisher_data(data.id) }}
                                        >
                                            {/* {console.log("PUB DATA : ", data)} */}
                                            {data.name}
                                        </li>
                                    ))}


                                </ul>
                            </div>


                        </div>
                    </div>


                    <div className="col-md-2 s_f_mar_bot">
                        <div className="d-flex flex-row">
                            <div className="">
                                <ul className="remove-dots">
                                    <div className="custom-footer-Header">Policies</div>

                                    <li className="custom-footer-li">
                                        <Link className="nav-link" to="/privacypolicy">
                                            Privacy Policy
                                        </Link>
                                    </li>
                                    <li className="custom-footer-li">
                                        <Link className="nav-link" to="/terms">
                                            Terms Of Use
                                        </Link>
                                    </li>
                                    <li className="custom-footer-li">
                                        <Link className="nav-link" to="/disclaimer">
                                            Disclaimer
                                        </Link>  </li>
                                    <li className="custom-footer-li">
                                        <Link className="nav-link" to="/copyright">
                                            Copyright Policy
                                        </Link>

                                    </li>
                                    <li className="custom-footer-li">
                                        <Link className="nav-link" to="/faqs">
                                            FAQ Customer
                                        </Link>

                                    </li>
                                    <li className="custom-footer-li">
                                        <Link className="nav-link" to="/faqpub">
                                            FAQ Publisher
                                        </Link>

                                    </li>

                                </ul>
                            </div>


                        </div>
                    </div>


                    {/* <div className="col-md-3 s_f_mar_bot">
                        <ul className="remove-dots">
                            <div className="custom-footer-Header">ebooksjunction.com</div>

                            <li className="custom-footer-li">
                                A division of Southshore Innovations Private Limited, Plot 13, Vijayendra Colony,
                                Telephone Nagar, Perungudi, Chennai - 600096.
                                <p className="mt-2" style={{cursor:'pointer'}} onClick={openMailto}><b>Mail Us </b>: sales@southshore.in </p>
                            </li>
                            <li className="custom-footer-li">
                                <div className="south_val"><span className="south_key">CIN No:</span> U22219TN2022PTC151260</div>
                                <div className="south_val"><span className="south_key">GSTIN:</span> 33ABICS2457D1ZI</div>
                            </li>
                        </ul>
                    </div> */}

                    <div className="col-md-3 s_f_mar_bot">
                        <ul className="remove-dots">
                            <div className="custom-footer-Header"> Subscribe to Newsleter</div>
                            {/* <Button className="mt-2 rounded-pill px-4" variant="outline-primary">Contact us</Button>
                            <div className="mt-4">
                                <h6>Social Media</h6>
                                <div className="d-inline p-2">
                                    <img src={facebook_logo} />
                                </div>
                                <div className="d-inline p-2">
                                    <img src={youtube_logo} />
                                </div>
                                <div className="d-inline p-2">
                                    <img src={linkedin_logo} />
                                </div>
                                <div className="d-inline p-2">
                                    <img src={instagram_logo} />
                                </div>

                            </div> */}
                            <div className="pos_rel">
                                <input type="text" className="newsletter_email" placeholder="Enter Email" />
                                <img src={arrow_right} className="arrow_pos" />
                            </div>


                        </ul>

                    </div>
                </div>
            </div>
            <div className="container-fluid d-flex align-items-center justify-content-center footer-note py-2">
                <span className="text-center"> &#169; Copyright Southshore Innovations Private Limited</span>
                {/* <div className="" >
                    
                </div> */}
            </div>
        </div>

    )
}

export default FooterSouthsore