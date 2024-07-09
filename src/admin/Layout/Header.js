import React, { useEffect, useState,} from "react";
import offIcon from '../assets/icons/exit-to-app.svg';

import SVG from "react-inlinesvg";
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header=(props)=> {
  const navigate = useNavigate();
  const { logOut ,authDeatils}=useAuth()
  useEffect(() => {

  }, [authDeatils])

  // const doLogout=async()=>{

  //   const resp=await logOut()
    
  //   if(resp === "Success"){
  //     navigate("/login")
  //   }
    
  //   // window.location.reload()

  // }

  const doLogOut = async() => {
    const resp = await logOut();
    if(resp === 'success'){
      navigate("/admin");
    }
    
  }
  return (
    <header className="header header-sticky mb-4">
        <div className="container-fluid">
          
          {/* <div className="header-nav d-md-flex"><h4>{ authUsername==='admin' ? props.title : "Publisher Dashboard"}</h4></div> */}
          <div className="header-nav d-md-flex"><h4> {props.title} </h4></div>

          <div className="header-nav d-md-flex">
            <button type="button" className="btn btn-outline-dark" 
            onClick={doLogOut}
            >
              {/* <SVG src={offIcon} style={{fill:'#fff',marginRight:10}} width={20}/>  */}
              Logout
            </button>
          </div>
          
          
        </div>
        
        
      </header>
  );
}

export default Header;
