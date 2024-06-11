import React, { useEffect, useState, } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

// import Banner from "../Assets/Images/Banner.png";
import Banner from "../Assets/Images/pub_banner_1.png";
import HomeBanner from "../Assets/Images/HomeBanner.png";
import JPBanner from "../Assets/Images/JurisPressBanner.png";
import MPBanner from "../Assets/Images/ManoharPublishersBanner.png";

import { UserProfile } from "../Context/Usercontext";
import { useAuth } from '../Context/Authcontext';
import Config from "../Config/Config.json"



const TopBanner = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { getPublishersById, publisherId } = UserProfile();
    const { authData } = useAuth();

    const [publisherDetails, setPublisherDetails] = useState('')
    

    useEffect(() => {
        getPubById();
    }, [authData])

    const getPubById = async () => {
        let pubid = 0;
        if (location.state === null || location.state === 'null') {
            pubid = publisherId
        }
        else {
            pubid = location.state.publisher_id
        }
        const result = await getPublishersById(pubid)
        console.log("RESULT from Banner ===>", result);
        
        setPublisherDetails(result?.data?.output)

        
         

    }

    // let bannerImage;

    // if (publisherDetails.id === 15) {
    //     // If the publisher is Juris Press then use their banner
    //     bannerImage = <img src={JPBanner} className="ban_back_img" alt="Banner 1" />;
    // } else if (publisherDetails.id === 26) {
    //     // If the publisher is Manohar Publishers then use their banner
    //     bannerImage = <img src={MPBanner} className="ban_back_img" alt="Banner 2" />;
    // } else {
    //     // Else use default banner
    //     bannerImage = <img src={HomeBanner} className="ban_back_img" alt="Default Banner" />;
    // }

    return (
        // <div className="banner_southsore">
        //     <div className="row">
        //         <div className="col-md-6 banner_southsore_img" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '4%', marginBottom: '5%', backgroundColor:'#FFCCB9' }}>
        //             <img src={Banner} height={350} width={260} />
        //         </div>
        //         <div className="col-md-6 banner_southsore_text" style={{ marginTop: '3%' }}>
        //             <p
        //                 className="welcome_text"
        //             >Online</p>
        //             <p className="welcome_text">Bookshelf</p>
        //             <p className="welcome_text" style={{ color: '#8d8e94' }}>for you</p>
        //             <p
        //                 className="heading"
        //             >Trusted expertise, powerful technology</p>
        //             <div>
        //                 <button className="btn btn-outline-info rounded-pill explore_btn">Explore Now</button>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <div className="top-banner">
            {/* <img src={Banner}/> */}
            <div className="row">
                <div className="col-md-6" style={{ backgroundColor: '#FFCCB9' }}>
                    {/* ban_back_img */}
                    <div>
                        <img
                            // src={publisherDetails.banner === null || publisherDetails.banner === '' ? HomeBanner : Config.API_URL + Config.PUB_IMAGES + publisherDetails.id + "/" + publisherDetails.banner + '?d=' + new Date()} 
                            src={Banner}
                            className="ban_back_img"
                            loading="lazy"
                        />
                        {/* {bannerImage} */}
                    </div>
                </div>
                <div className="col-md-6 banner_txt">
                    <div className="ban_head mb-2">Welcome to</div>
                    <div className="ban_body" style={{fontWeight:'700', lineHeight:'50px'}}>Thomson</div>
                    <div className="ban_body mb-2" style={{fontWeight:'700', lineHeight:'50px'}}>Reuters <span>
                        {/* {publisherDetails?.name.replace("Thompson Reuters ", "").trim()} */}
                        {/* {publisherDetails.country} */}
                        IN
                        </span></div>
                    <div className="ban_foot mb-4">Trusted expertise, powerful technology
                        , advanced AI, and industry-leading insights help professionals know today and navigate tomorrow</div>
                    {/* <div className="d-flex mt-5">
                        <button className="buy_btn">Buy Now</button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default TopBanner;