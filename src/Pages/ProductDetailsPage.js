
import React, { useEffect, useState, } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { UserProfile } from "../Context/Usercontext"
import TopBar from "../Layout/TopBar";
import NavBar from "../Layout/NavBar";
import Footer from "../Layout/Footer";
import Playstore from "../Layout/Playstore";
import Guideline from "../Layout/Guideline";
import Datetime from "../GlobalFunctions.js/Datetime";

import wishlight from "../Assets/Images/wishlight.png";
import wishlistedicon from "../Assets/Images/wishlistedicon.png";
import wishblue from "../Assets/Images/wishblue.png";
import book1 from "../Assets/Images/book1.png";
import book2 from "../Assets/Images/book2.png";
import book3 from "../Assets/Images/book3.png";
import book4 from "../Assets/Images/book4.png";
import bookbig from "../Assets/Images/bookbig.png";
import booksmall1 from "../Assets/Images/booksmall1.png";
import booksmall2 from "../Assets/Images/booksmall2.png";
import booksmall3 from "../Assets/Images/booksmall3.png";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import dummy from "../Assets/Images/dummy.png";
import { useAuth } from "../Context/Authcontext";
import Config from "../Config/Config.json";
import Whatsapp from "../Layout/Whatsapp";
import FooterSouthsore from "../Layout/FooterSouthsore";


const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const ProductDetailsPage = () => {

    const { authData, wishlistshow, uuid, add_book_to_storage, remove_cart_item } = useAuth();

    const navigate = useNavigate()

    const { get_book_details,
        addto_cart,
        add_single_item,
        cart_items,
        add_delete_to_wishlist,
        get_items } = UserProfile()

    const [bookdetail, setBookdetail] = useState({})
    const [images, setImages] = useState([])
    const [front_cover, setFrontCover] = useState('');
    const [back_cover, setBackCover] = useState('');
    const [readbool, setReadbool] = useState(false)
    const [showtext, setShowtext] = useState(false)
    const [defaultimg, setDefaultimg] = useState('')
    const [nondefaultimg, setNondefaultimg] = useState('')
    const [isBookPresent, setIsBookPresent] = useState(false)
    const [dependencyvar, setDependencyvar] = useState(false)

    const [containerClass, setContainerClass] = useState('container');

    const updateContainerClass = () => {
      if (window.innerWidth === 1366) {
        setContainerClass(''); // Set to empty string or a different class if needed
      } else if (window.innerWidth === 1920) {
        setContainerClass('container');
      } else {
        setContainerClass(''); // Default class or another class
      }
    };
  
    useEffect(() => {
      updateContainerClass(); // Set initial class based on initial window size
      window.addEventListener('resize', updateContainerClass);
      return () => window.removeEventListener('resize', updateContainerClass);
    }, []);

    const image_path = Config.API_URL + Config.PUB_IMAGES;
    // const [cart , setCart] = useState([])

    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        // console.log("p_detail : ", location?.state ? location?.state?.BOOK_ID : 2)
        book_detail(location?.state?.BOOK_ID)

        // console.log("bookid= ", location.state?.BOOK_ID)
        
    }, [location.state?.BOOK_ID])


    
    const book_detail = async (book_id) => {
        const resp = await get_book_details(book_id)
        // console.log(" book details resp", resp)
        if (resp === undefined || resp === null) {
            setBookdetail({})
            setImages([])
            setFrontCover('')
            setBackCover('')
        }
        else {
            // console.log("det_resp", resp)
            if (resp.statuscode === "0" && JSON.stringify(resp.output) !== "{}" && resp.output !== null && resp.output !== undefined) {
                setBookdetail(resp.output)
                // setImages(resp.output.images?.length > 0 ? resp.output.images : dummy);
                setFrontCover(resp.output.front_cover)
                setBackCover(resp.output.back_cover)
                default_img(resp.output)

                if (resp.output.description.length > 336) {
                    setReadbool(true)
                    setShowtext(false)
                }
                else {
                    setReadbool(false)
                }
            }
            else {
                setBookdetail({})
                // setImages([])
                setFrontCover('')
                setBackCover('')

            }
        }

    }

    const default_img = async (pub_obj) => {

        let frontCover = image_path + pub_obj.publisherid + '/' + pub_obj.img + '?d=' + new Date();
        let backCover = image_path + pub_obj.publisherid + '/' + pub_obj.back_cover + '?d=' + new Date();
        
        setDefaultimg(frontCover);
        setNondefaultimg(backCover);

    }

    const img_alter = (img_data) => {
        console.log("PRD PG Book detail : ", bookdetail);
        // let path_img_data = image_path + bookdetail.publisher + "/" + img_data + '?d=' + new Date();
        console.log("img_data :", img_data);
        // console.log("path_img_data :", path_img_data);
        setDefaultimg(img_data)
    }
    const add_to_cart = async (bookid, toCheckout) => {
        console.log('bookDetails', bookdetail)
        console.log("default image=", defaultimg)
        let json_data = {
            title: bookdetail.title,
            authors: bookdetail.authors,
            price: bookdetail.price,
            publisher: bookdetail.publisher,
            items_no: 1,
            // image: defaultimg,
            img: bookdetail.img,
            category: bookdetail.category,
            publisherid: bookdetail.publisherid,
            bookid: bookdetail.id,
            deviceid: uuid,
            quantity: 1
        }

        // before login

        if (authData === '' || authData === null || authData === undefined) {

            json_data["price"] = parseFloat(json_data.price.replace(/,/g, ''))
            json_data["amount"] = json_data["price"]
            console.log("json data= ", json_data)
            const resp = await add_book_to_storage(json_data)
            // for buy now
            if (toCheckout) {
                alert("Please Login to Buy this book!")
            }
            // for add to cart
            else {
                alert(resp.message);
            }
        }

        // after login
        else {

            const resp = await add_book_to_storage(json_data)

            // for buy now
            if (toCheckout) {

                if (resp.isPresent) {
                    // remove data from backend
                    remove_item_and_add(json_data)
                }
                navigate('/billingAddress', { buynow: 1 })
            }
            // for add to cart
            else {
                alert(resp.message);
            }
        }
    }

    const remove_item_and_add = async (remove_json) => {

        console.log("remove json:", remove_json)
        const resp = await remove_cart_item(remove_json, 1)
        console.log("Remove_cart :", resp)
        if (resp.statuscode === "0") {

            const response = await add_book_to_storage(remove_json)
            console.log("response after adding= ", response)
        }


    }



    const Wishlist = (event, book_id) => {
        event.stopPropagation()
        if (wishlistshow === true) {
            Add_To_Wishlist(book_id)
        }
        else {
            navigate('/login')
        }
    }

    const Add_To_Wishlist = async (book_id) => {
        let json = {

            "bookid": book_id,
            "currentPage": 1,
            "recordPerPage": 5

        }
        const resp = await add_delete_to_wishlist(json)

        book_detail(location?.state?.BOOK_ID)
        // console.log("wishlist items : ", wishlistitems)
        console.log("Wishlist_resp ", resp)
    }

    const go_to_bookshelf = () => {
        navigate('/mybookshelf')
    }
    return (
        <div className="main-container">
            <div className="container">
                <TopBar />
                <NavBar />
            </div>

            {/* -----------Book Details----------- */}

            <Whatsapp />
            <div className={containerClass}>
            <div className="category_bg details_main pb-5">
                <div className="details_path"><span className="fw700">Home</span><span className="fw600"> &gt; {bookdetail.category} &gt;</span><span className="fw400"> {bookdetail.title}</span></div>
                <div className="row mt-5">
                    <div className="col-md-4 product_image_div">
                        <div className="book_bg pb-5">
                            <div className="d-flex justify-content-end align-items-center pt-2 me-2">
                                <button className="btn btn-circle" onClick={(e) => Wishlist(e, bookdetail.id)}>
                                    {
                                        bookdetail.isFavourite === 1 ? (<img src={wishblue} width={27} height={27} />)
                                            :
                                            (<img src={wishlight} width={27} height={27} />)
                                    }
                                </button>
                            </div>
                            <div className="d-flex justify-content-center align-items-center ">
                                {/* <img src={defaultimg?.length > 0 ? defaultimg.image : dummy} className="d-flex justify-content-center align-items-center product_image" /> */}
                                <img src={defaultimg ? defaultimg : dummy} width={246} height={250}
                                    className="d-flex justify-content-center align-items-center product_image"
                                    loading="lazy"
                                />
                            </div>
                        </div>


                        



                    </div>
                    <div className="col-md-8 product_details_text_container">
                        <div className=" ms-4 pt-2 pb-5">
                            <div className="details_head fw600">{bookdetail.title}</div>
                            <div className="mt-1 Product_author">Author: <span style={{fontWeight:'400'}}>{bookdetail.authors !== null ? bookdetail.authors : "Not Found"}</span></div>
                            <div className="mt-1 Product_pub">Publisher: <span style={{fontWeight:'500'}}>{bookdetail.publisher !== null ? bookdetail.publisher : "Not Found"}</span></div>
                            <div className="details_desc_head fw600 mt-3">Description</div>

                            {
                                readbool ? (
                                    <div className="details_desc fw400 mt-2 product_description">{bookdetail.description?.substring(0, 336) +
                                        (showtext ? "" : "...")
                                    }

                                        <span style={{ display: showtext ? "" : "none" }}> {bookdetail.description.substring(336, bookdetail.description.length)}  </span>
                                        <button onClick={() => setShowtext(!showtext)} className="read_more fw600 button-solid">
                                            {showtext ? "Read Less" : "Read More"}
                                        </button>
                                    </div>

                                ) : (
                                    <div className="details_desc fw400 mt-2 product_description">{bookdetail.description}</div>

                                )

                            }

                            <div className="prod_details fw500 mt-5 mb-2">Product Details</div>
                            <div className="product_details details_list">
                                <ul className="ul_border">
                                    <li>No of Pages: <span>{bookdetail.noofpages !== null ? bookdetail.noofpages : "Not Found"}</span></li>
                                    <li>Cover Type: <span>{bookdetail.covertype}</span></li>

                                    <li>Publishing Date: <span>
                                        {bookdetail.publishdate === undefined || bookdetail.publishdate === null ? "Not Found" : Datetime(bookdetail.publishdate?.split(" ")[0])}
                                    </span></li>


                                </ul>

                                <hr className='hr' />

                                <ul className="ul_2">
                                    <li>Edition No: <span>{bookdetail.editionno !== null ? bookdetail.editionno : "No Editions Found"}</span></li>
                                    <li>ISBN-10: <span>{bookdetail.isbn10 !== null ? bookdetail.isbn10 : "Not Found"}</span></li>
                                    <li>ISBN-13: <span>{bookdetail.isbn13 !== null ? bookdetail.isbn13 : "Not Found"}</span></li>

                                </ul>
                            </div>
                            <hr></hr>
                            <div className="d-flex justify-content-between">
                                <div className="details_price fw600 mt-4">Price: &nbsp; <span className="disc_price fw600 " style={{ color: '#000000' }}>{bookdetail.symbol + bookdetail.price}</span></div>

                                {/* <div className="d-flex flex-row justify-content-start mt-5"> */}
                                
                            </div>

                            

                                

                                

                                <div className="d-flex flex-row justify-content-start mt-5 button_width">
                                    <button type="button" style={{ width: '70%' }}
                                        className="btn btn-primary rounded-pill d-flex justify-content-center align-items-center details_btn fw500 txt_color_64646F me-4"
                                        onClick={() => add_to_cart(bookdetail.id, false)}>
                                        Add to Cart
                                    </button>
                                    {/* <button type="button" className="btn btn-primary rounded-pill d-flex justify-content-center align-items-center details_btn txt_color_FFFFFF fw500" onClick={() => add_to_cart(bookdetail.id, true)}>Buy Now</button> */}
                                </div>
                            

                        </div>

                    </div>
                </div>
            </div>
            </div>

            
            <FooterSouthsore />

            <ToastContainer />

        </div>
    );
}

export default ProductDetailsPage;