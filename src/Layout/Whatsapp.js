import React, { useEffect, useState,} from "react";
import whatsapp_1 from '../Assets/Images/whatsapp_1.png';

const Whatsapp = () => {

  const gotoWa = () => {
    window.open('https://api.whatsapp.com/send/?phone=9176545334&text=Hi%2C+I+am+visiting+your+website+www.bookscentral.in&type=phone_number&app_absent=0');
  }

    return (
      <div className="whBtn">
          <button type='button' className="whatsapp_button" onClick={gotoWa}>
            <img src={whatsapp_1} className="wa_icon_size"/>
          </button>
        </div>
        
    );
}

export default Whatsapp;


