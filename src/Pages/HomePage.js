import React, { useEffect, useState, } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import TopBar from "../Layout/TopBar";
import NavBar from "../Layout/NavBar";
import TopBanner from "../Layout/Banner";
import About from "../Layout/About";
import AboutSouthshore from "../Layout/AboutSouthshore";
import Footer from "../Layout/Footer";
import Playstore from "../Layout/Playstore";
import Guideline from "../Layout/Guideline";
import Testimonials from "../Layout/Testimonials";
import AboutSouthshoreCert from "../Layout/AboutSouthshoreCert";


import NewArrivalBooks from "../Layout/NewArrivalBooks";
import Category from "../Layout/Category";
import BestSellingBooks from "../Layout/BestSellingBooks";
import ReccomendedBooks from "../Layout/ReccomendedBooks";
import Whatsapp from "../Layout/Whatsapp";
import { UserProfile } from "../Context/Usercontext";
import FooterSouthsore from "../Layout/FooterSouthsore";



const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const { getPublishersById, publisherId } = UserProfile()
  const [pubId, setPubId] = useState('0')
  //location.state.publisher_id
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    // if(location.state.publisher_id==='' || location.state.publisher_id===null || location.state.publisher_id===0 || location.state.publisher_id===undefined){
    if (location.state === null || location.state === 'null') {
      setPubId(publisherId);
    }
    else {
      setPubId(location.state.publisher_id)
    }
    
  }, [])

  return (
    <div className="main-container">
      <div className="container">
        <TopBar />
        <NavBar />
      </div>
      <Whatsapp/>
      <TopBanner/>
      {/* <About/> */}
      {/* <AboutSouthshore/> */}

      <Category />
      <div id="new_arrivals">
        <NewArrivalBooks/>
      </div>
      <div id="best_selling">
        {/* <BestSellingBooks /> */}
      </div>
      {/* <ReccomendedBooks/> */}
      {/* <Testimonials/> */}
        {/* <AboutSouthshoreCert/> */}
      {/* <Guideline/> */}
      {/* <Playstore/> */}
      {/* <Footer/> */}
      {/* <div id="contact">  */}
        <Footer />
      {/* </div> */}
    </div>
  );
}

export default HomePage;