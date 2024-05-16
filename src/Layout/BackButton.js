import React, { useEffect, useState, } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import arrow_left from "../Assets/Images/arrow-left.png";
import { UserProfile } from "../Context/Usercontext";

const BackButton = () => {
    const navigate = useNavigate();

    const goToHome = () => {

         navigate("/")
    //    navigate("/home")
       
    }
    

    return (
        <div className="right" onClick={goToHome}>
            <span className="back-to-home cursor-pointer"><img src={arrow_left} /> Back to home</span>
        </div>
    )
};

export default BackButton;