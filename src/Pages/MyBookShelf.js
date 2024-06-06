// * Download button shall be present later . 
// * For DEMO -- Read button 


import React, { useEffect, useState, } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import TopBar from "../Layout/TopBar";
import NavBar from "../Layout/NavBar";
import Footer from "../Layout/Footer";
import ProfileTab from "../Layout/ProfileTab";
import search_icon from "../Assets/Images/search-normal.png";
import arrow_left from "../Assets/Images/arrow-left.png";
import download from "../Assets/Images/download-icon.png";
import book1 from '../Assets/Images/wishlist_img1.png'
import book2 from '../Assets/Images/wishlist_img2.png'
import book3 from '../Assets/Images/wishlist_img3.png'
import book4 from '../Assets/Images/wishlist_img4.png'
import book5 from '../Assets/Images/rbook3.png'
import Datetime from "../GlobalFunctions.js/Datetime";
import dummy from "../Assets/Images/dummy.png";

import { UserProfile } from "../Context/Usercontext";
import Config from "../Config/Config.json"
import BackButton from "../Layout/BackButton";
import TopBarSouthsore from "../Layout/TopBarSouthsore";
import FooterSouthsore from "../Layout/FooterSouthsore";
import Whatsapp from "../Layout/Whatsapp";
import NavBarSouthsore from "../Layout/NavBarSouthsore";


const MyBookShelf = () => {

    const { getBookShelf } = UserProfile()
    const [myBooks, setMyBooks] = useState([])
    const [bookReadType, setBookReadType] = useState("")

    const navigate = useNavigate();
    const location= useLocation();
    useEffect(() => {
        window.scrollTo(0, 0)
        // showBooksInShelf()
    }, [])

    const handleBookReadType = (e) => {
        setBookReadType(e.target.value)
    }
    const showBooksInShelf = async () => {
        const resp = await getBookShelf();
        // console.log("my bookshelf get resp= ", resp)
        if(resp.output.books===null || resp.output.books==='null')
        {
            setMyBooks([])
        }
        else{
            setMyBooks(resp.output.books)
        }
        
    }


    const navigateToReadScreen = async (book) => {

        

        if (bookReadType === "epub") {
            navigate("/epubreader", {
                state: {
                    url: book.epub_link,
                    publisher_id: book.publisherid
                }
            })
        }
        else if (bookReadType === "pdf") {
            navigate("/pdfreader", {
                state: {
                    url: book.epdf_link,
                    publisher_id: book.publisherid
                }
            })
        }
        else {
            if (book.epub_link !== "" && book.epub_link != undefined && book.epub_link != "null")
                navigate("/epubreader", {
                    state:
                    {
                        url: book.epub_link,
                        publisher_id: book.publisherid
                    }
                })
            else if (book.epdf_link !== "" && book.epdf_link != undefined && book.epdf_link != "null")
                navigate("/pdfreader", {
                    state: {
                        url: book.epdf_link,
                        publisher_id: book.publisherid
                    }
                })
        }
    }
    const navigateToPdfReader = () => {
        navigate("/pdfreader")
    }

    const goToHome = () => {
        navigate("/home")
    }
    return (
        <div className="main-container">
            <div className="container">
                <TopBarSouthsore />
                <NavBarSouthsore/>
                <ProfileTab/>
            </div>
            
            <Whatsapp/>
            <div className="bookshelf">
                <div className="container">
                    <div className="header border-bottom py-2 pb-3">
                        <div className="left">
                            <h2>My Book Shelf</h2>
                            <span>({myBooks.length }  items)</span>
                        </div>
                        {/* <div className="right" onClick={goToHome}>
                            <span className="back-to-home cursor-pointer"><img src={arrow_left} /> Back to home</span>
                        </div> */}
                        <BackButton/>
                    </div>
                    <div className="all-cards-container row my-3">
                        {
                            myBooks.length > 0 && myBooks.map((book, index) => (
                                <div className="book-card col-md-3 col-sm-6 my-2" key={index}>
                                    <div className="card-header">
                                        <img src={book.image === null || book.image === '' ? dummy : Config.API_URL + Config.PUB_IMAGES + book.publisherid + "/" + book.image + '?d=' + new Date()} />
                                        <h4>{book.title}</h4>
                                        <span>Author: {book.authors}</span>
                                    </div>
                                    <div className="card-tail my-3">
                                        <div className="purchased mb-3"><span>Purchased</span> {Datetime(book.invoicedate?.split(" ")[0])}</div>


                                        {
                                            book.epdf_link !== "" &&
                                            book.epdf_link != undefined &&
                                            book.epdf_link !== "null" &&
                                            book.epub_link !== "" &&
                                            book.epub_link != undefined &&
                                            book.epub_link != "null" &&
                                            (
                                                <div>

                                                    <input
                                                        type="radio"
                                                        name="ViewReaderType"
                                                        value="epub"
                                                        // checked={this.state.site === result.SITE_NAME}
                                                        onChange={handleBookReadType}
                                                    />EPub &nbsp;
                                                    <input
                                                        type="radio"
                                                        name="ViewReaderType"
                                                        value="pdf"
                                                        // checked={this.state.site === result.SITE_NAME}
                                                        onChange={handleBookReadType}
                                                    />PDF
                                                </div>
                                            )

                                        }

                                        <div className="read mt-2">

                                            <button type="button" className="btn btn-outline-secondary" onClick={() => { navigateToReadScreen(book) }}>
                                                <span>Read</span>

                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }




                    </div>
                </div>
            </div>
            <FooterSouthsore />
        </div>
    );
}

export default MyBookShelf