import React, { useEffect, useState, } from "react";
import SVG from "react-inlinesvg";
import admin_logo from "../Assets/Images/book_central_logo.svg";

import profileImg from "../Assets/Images/usser_login.png";

import search_icon from "../Assets/Images/search-normal.png";
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/Authcontext';
import { UserProfile } from "../Context/Usercontext";
import { ReactSearchAutocomplete } from "react-search-autocomplete";


const TopBarSouthsore = () => {
  const navigate = useNavigate();
  const { wishlistshow, authData, logOut } = useAuth()
  const { allActivePublisher, allActivePublisher1 } = UserProfile()

  const [toggleSearch, setToggleSearch] = useState(false)
  const [hideSignInBtn, setHideSignInBtn] = useState(true);

  useEffect(() => {
    console.log('authdata in useeffect', authData);
    if (authData === null || authData === undefined || authData === "") {
      setHideSignInBtn(false);
    }
    else {
      setHideSignInBtn(true);
    }
    
  }, [authData])

  const handleToggleSearch = () => {
    setToggleSearch(!toggleSearch)
  }

  const goToProfile = () => {
    if (wishlistshow === true) {
      navigate('/mybookshelf')
    }
    else {
      navigate('/loginsouthsore')
    }
  }
  const gotoLogin = () => {
    navigate('/loginsouthsore')
  }

  const gotoLogout = async () => {
    console.log("authdata from to_1:", authData);
    const resp = await logOut();
    console.log("authdata from to:", authData);
    if (resp === 'Success') {
      setHideSignInBtn(false);
      console.log("logged out")
      navigate('/');
      window.location.reload();
    }

  }

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left', cursor: 'pointer' }}>{item.name}</span>
      </>
    )
  }
  const gotoPublisher = (e) => {
    navigate('/home', { state: { publisher_id: e.id } })
  }
  return (
    <>
      <div className="top-bar pos_rel">
        <div className="admin_logo_pos">
          <SVG src={admin_logo} className="admin_logo_size" onClick={() => navigate("/")} style={{ cursor: 'pointer' }} />
        </div>
        <div className="top-bar-right">
          {/* <form>
          <div className="form-group search-bar">
            <img src={search_icon} />
            <input type="text" className="form-control search-box" placeholder="Search by Publisher" />
            
          </div>
        </form> */}
          <div style={{ width: '100%' }} className="big_search">

            <ReactSearchAutocomplete
              items={allActivePublisher1}
              // onSearch={handleOnSearch}
              // onHover={handleOnHover}
              onSelect={gotoPublisher}
              // onFocus={handleOnFocus}
              //className="form-control"
              placeholder="Search by publisher"
              styling={{
                zIndex: 999,
                width: '100%',
                borderRadius: '10px',
                backgroundColor: '#E9EAF0',
                boxShadow: 'none'
              }}
              autoFocus
              formatResult={formatResult}
            />




          </div>
          <div className="small_search" onClick={handleToggleSearch}>
            <img src={search_icon} />
          </div>

          <Button className="rounded-pill sign_in_btn" variant="outline-primary" onClick={gotoLogin} hidden={hideSignInBtn}> Signin</Button>
          <Button style={{ padding: '0', cursor: 'pointer', background: 'transparent', border: 'none' }} hidden={!hideSignInBtn}><img src={profileImg} onClick={goToProfile} width={40} height={40} /></Button>
          <Button className="rounded-pill sign_in_btn" variant="outline-primary" onClick={gotoLogout} hidden={!hideSignInBtn}> Signout </Button>
        </div>

        {toggleSearch === true &&
          <div style={{ width: '100%', position: 'absolute', top: '113%' }} className="mob_s_dis">
            <ReactSearchAutocomplete
              items={allActivePublisher}
              // onSearch={handleOnSearch}
              // onHover={handleOnHover}
              onSelect={gotoPublisher}
              // onFocus={handleOnFocus}
              //className="form-control"
              placeholder="Search by publisher"
              styling={{
                zIndex: 999,
                width: '100%',
                borderRadius: '10px',
                backgroundColor: '#E9EAF0',
                boxShadow: 'none'
              }}
              autoFocus
              formatResult={formatResult}
            />
          </div>
        }
      </div>

    </>

  );
}

export default TopBarSouthsore;


