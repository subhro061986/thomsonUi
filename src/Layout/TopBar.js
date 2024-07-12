import React, { useEffect, useState, useCallback} from "react";
import SVG from "react-inlinesvg";
import publisher_logo from "../Assets/Images/publisher_demo.png";
// import profile from "../Assets/Images/profile.png";
import a_logo from "../Assets/Images/book_central_logo.svg";
import profile from "../Assets/Images/usser_login.png";
import logout from "../Assets/Images/logout_icon.png";
import search_icon from "../Assets/Images/search-normal.png";
import Config from "../Config/Config.json";
import noImg from "../Assets/Images/no-img.png";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../Context/Authcontext';
import { UserProfile } from "../Context/Usercontext";
import { Button } from "react-bootstrap";

import close from "../Assets/Images/close-circle.png"
import { ReactSearchAutocomplete } from "react-search-autocomplete";


const TopBar = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const { category_by_publisher, items, getPublishersById, publisherId, getBooksBySearchText } = UserProfile()
  const { wishlistshow, authData, logOut } = useAuth()
  const [publisherDetails, setPublisherDetails] = useState('')
  const [searchText, setSearchText] = useState('')
  const [toggleSearch, setToggleSearch] = useState(false)
  const [publisherBooks, setPublisherBooks] = useState([])

  useEffect(() => {
    getPubById();
    window.scrollTo(0, 0)
  }, [authData])

  const handleToggleSearch = () => {
    setToggleSearch(!toggleSearch)
  }

  const getPubById = async () => {
    let pubid = 2;

    // if(location.state.publisher_id==='' || location.state.publisher_id===null || location.state.publisher_id===0 || location.state.publisher_id===undefined){
    if (location.state === null || location.state === 'null') {
      pubid = publisherId
    }
    else {
      pubid = location.state.publisher_id
    }
    const result = await getPublishersById(pubid)
    
    setPublisherDetails(result?.data?.output)


  }
  const goToProfile = () => {
    if (wishlistshow === true) {
      navigate('/orderpage', { state: { fromHome: false } })
    }
    else {
      navigate('/login')
    }
  }
  const gotoLogin = () => {
    navigate('/login')
  }
  const doLogout = async () => {

    const resp = await logOut()

    if (resp === "Success") {
      console.log('logout_response', resp)
      navigate("/login")
    }

    window.location.reload()

  }
  const gotoPublisher = (e) => {
    navigate('/home')
  }

  const getbookByText = async (e) => {
    setSearchText(e.target.value)

    if(e.target.value !== "" && e.target.value !== undefined && e.target.value !== null){
      let json = {
        searchText: e.target.value
      }
      let response = await getBooksBySearchText(json)
      if (response.statuscode === "0") {
        setPublisherBooks(response.output)
      }

    }
    else {
      setPublisherBooks([])
    }

  }



  

  const goToProductDetailsPage = (id) => {
    navigate('/productdetails', { state: { BOOK_ID: id } })
  }

  return (
    <div className="top-bar pos_rel">
      {/* <div
        //className="publisher-logo"
        className="mar_left"
      >
        <img className="image_logos" src={publisherDetails === undefined || publisherDetails?.logo === null ? noImg : `${Config.API_URL + Config.PUB_IMAGES + publisherDetails?.id + "/" + publisherDetails?.logo}`}
          alt="publisher logo"
          onClick={gotoPublisher}
          style={{ cursor: 'pointer' }}
        />

      </div> */}
      <div className="admin_logo_pos">
          <SVG src={a_logo} className="admin_logo_size" onClick={() => navigate("/")} style={{cursor:'pointer'}}/>
        </div>
      <div className="top-bar-right">
        {/* <form>
          <div className="form-group search-bar">
            <img src={search_icon} />
            <input type="text" className="form-control search-box" placeholder="Search by Author, Title, ISBN" />
          </div>
        </form> */}
        <div style={{ width: '100%'}} className="big_search">

          <form style={{ position: 'relative' }}>
            <div className="form-group search-bar pos_rel" style={{width:'100%'}}>
              <img src={search_icon} className="search_icon_pos" />
              <input type="text" value={searchText} className="form-control search-box ps-5" onChange={getbookByText} placeholder="Search by Author, Title, ISBN" />
             
            </div>

            {publisherBooks.length > 0 && searchText.length > 0 &&

              <div
                style={{
                  border: '1px solid #dee2e6',
                  minHeight: '100px',
                  width: '100%',
                  borderRadius: '0.375rem',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  position: "absolute",
                  top: '2.5rem',
                  left: 0,
                  zIndex: 999,
                  backgroundColor: 'white'

                }}>

                {
                  publisherBooks.length > 0 &&
                  publisherBooks.map((book, index) => (

                    <div className="" style={{ cursor: 'pointer', fontSize: '12px' }}>
                      <div style={{
                        borderBottom: '1px solid #dee2e6', color: 'black',
                        padding: '1% 1% 1% 5%'
                      }} onClick={() => goToProductDetailsPage(book.id)}>
                        <div> {book.title} </div>
                        <div>ISBN13: {book.isbn13}</div>
                        <div>Author: {book.authors}</div>
                      </div>
                    </div>
                  ))
                }

              </div>

            }

          </form>





        </div>
        <div className="small_search_t" onClick={handleToggleSearch}>
          <img src={search_icon} />
        </div>
        {authData === '' ? (
          <Button className="rounded-pill" variant="outline-primary" onClick={gotoLogin}> Signin</Button>
        ) : (
          <div className="d-flex align-items-center">
            <button className="btn btn-circle" style={{ padding: '0', cursor: 'pointer' }}><img src={profile} onClick={goToProfile} width={40} height={40} /></button>
            {/* <Button className="rounded-pill" variant="outline-primary" onClick={doLogout}>Sign Out</Button> */}
            <img src={logout} onClick={doLogout} style={{ height: '34px', width: '34px', cursor: 'pointer', marginLeft: '6%' }} />
          </div>
        )}
      </div>
      {toggleSearch === true &&
        <div className="show_search">
          {/* <input type="text" placeholder="search" /> */}
          <form>
            <div className="form-group search-bar pos_rel search_div_height">
              <img src={search_icon} className="search_icon_pos" />
              <input type="text" style={{ width: '100%', height: '100%', paddingLeft: '12%' }} className="form-control search-box" placeholder="Search by Author, Title, ISBN" />

            </div>
          </form>

        </div>
      }
    </div>

  );
}

export default TopBar;


