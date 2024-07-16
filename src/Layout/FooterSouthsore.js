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
        // console.log('pub_id afteer navigation', pub_id)
        navigate('/category',
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
                    <div className="col-md-5 s_f_logo_col">
                        <img src={admin_logo} width={100} onClick={imgNavHome} style={{ cursor: 'pointer' }} />
                        <ul className="remove-dots" style={{ paddingLeft: 0 }}>
                            {/* <div className="custom-footer-Header">ebooksjunction.com</div> */}

                            <li className="custom-footer-li pe-5">
                                Books central office locations
                                Plot 13, Heritage Phase 2, Telephone Nagar Perungudi, Chennai-600096
                                {/* <p className="mt-2" style={{ cursor: 'pointer' }} onClick={openMailto}><b>Mail Us </b>: sales@southshore.in </p> */}
                            </li>
                            <li className="custom-footer-li">
                                <div className="south_val"><span className="south_key">Call Us:</span> 91-44-79624624</div>
                                <div className="south_val"><span className="south_key">Email:</span> info@bookscentral.in</div>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3 s_f_mar_bot">
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


                    <div className="col-md-3 s_f_mar_bot">
                        <div className="d-flex flex-row footer_pub_section">
                            <div className="">
                                <ul className="remove-dots">
                                    <div className="custom-footer-Header">Policies</div>

                                    <li className="custom-footer-li">
                                        <Link className="nav-link" to="/privacypolicy">
                                            Privacy Policies
                                        </Link>
                                    </li>
                                    <li className="custom-footer-li">
                                        <Link className="nav-link" to="/terms">
                                            Terms Of Use
                                        </Link>
                                    </li>
                                    <li className="custom-footer-li">
                                        <Link className="nav-link" to="/disclaimer">
                                            IP Infringement Policy
                                        </Link>  </li>
                                    <li className="custom-footer-li">
                                        <Link className="nav-link" to="/copyright">
                                            Copyright Policy
                                        </Link>

                                    </li>
                                    <li className="custom-footer-li">
                                        <Link className="nav-link" to="/faqs">
                                        Cancellation And Returns Policy
                                        </Link>

                                    </li>
                                    {/* <li className="custom-footer-li">
                                        <Link className="nav-link" to="/faqpub">
                                            FAQ Publisher
                                        </Link>

                                    </li> */}

                                </ul>
                            </div>


                        </div>
                    </div>


                    

                    <div className="col-md-1 s_f_mar_bot">
                        <ul className="remove-dots">
                            
                            <div className="d-flex flex-row footer_pub_section ps-1">
                                <div className="">
                                    <ul className="remove-dots ps-0">
                                        <div className="custom-footer-Header">Support</div>
                                        <li className="custom-footer-li">
                                            <Link className="nav-link" to="/faqs">
                                                Customer FAQ
                                            </Link>

                                        </li>

                                    </ul>
                                </div>


                            </div>


                        </ul>

                    </div>
                </div>
            </div>
            <div className="container-fluid d-flex align-items-center justify-content-center footer-note py-2">
                <span className="text-center"> &#169; Copyright Southshore Innovations Private Limited</span>
                
            </div>
        </div>

    )
}

export default FooterSouthsore