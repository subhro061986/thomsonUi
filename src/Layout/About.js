import React, { useEffect, useState, } from "react";
import publisher_logo from "../Assets/Images/publisher_demo.png";
import Config from "../Config/Config.json";
import noImg from "../Assets/Images/no-img.png";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { UserProfile } from "../Context/Usercontext";

const About = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const { getPublishersById, publisherId } = UserProfile()
  const [publisherDetails, setPublisherDetails] = useState('')

  useEffect(() => {
    getPubById();
    window.scrollTo(0, 0)
  }, [])

  const getPubById = async () => {
    let pubid = 0;
    const about = document.getElementById("pub_about");
    // if(location.state.publisher_id==='' || location.state.publisher_id===null || location.state.publisher_id===0 || location.state.publisher_id===undefined){
    if (location.state === null || location.state === 'null') {
      pubid = publisherId;
    }
    else {
      pubid = location.state.publisher_id;
    }
    const result = await getPublishersById(pubid);
    console.log("RESULT===>", result);
    if (result !== null) {
      setPublisherDetails(result?.data?.output);
      about.innerHTML = result?.data?.output?.about;
    }
    else {
      setPublisherDetails('');
      about.innerHTML = '';
    }
  }

  return (
    <div className="container about-us py-5">
      <div className="about-us-left-section">
        {/* <span className="intro-text">Find the best things in</span> */}
        <span className="publisher-name">{publisherDetails.name}</span>
        {/* {console.log(publisherDetails)} */}
        <img className="image_logos mb-3" src={publisherDetails.logo === null ? noImg : `${Config.API_URL + Config.PUB_IMAGES + publisherDetails.id + '/' + publisherDetails.logo}`} alt="publisher logo" />
      </div>
      <div className="about-us-right-section">
        {/* <p>
                {publisherDetails.name} is a dynamic and innovative publishing company that has made a significant mark in the industry through its forward-thinking approach and commitment to producing high-quality content. With a strong focus on embracing the digital age while upholding traditional publishing values, Modern Publishing House has successfully navigated the evolving landscape of book publishing.
                </p>
                <p>
                Founded in 2010, {publisherDetails.name} has quickly risen to prominence by effectively leveraging technology and digital platforms to reach a global audience. The company is known for its diverse range.
                </p>
                <p>
                One of the standout features of {publisherDetails.name} is its dedication to nurturing emerging authors. The company actively seeks out new.
                </p> */}
        <p id="pub_about"></p>
      </div>
    </div>
  );
}

export default About;