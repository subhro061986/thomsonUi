
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

    const { wishlistshow, uuid } = useAuth();

    const navigate = useNavigate()

    const { get_book_details,
        addto_cart,
        add_single_item,
        cart_items,
        add_delete_to_wishlist,
        getBookShelf,
        remove_cart_item,
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

    const image_path = Config.API_URL + Config.PUB_IMAGES;
    // const [cart , setCart] = useState([])

    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        console.log("p_detail : ", location?.state ? location?.state?.BOOK_ID : 2)
        book_detail(location?.state?.BOOK_ID)

        console.log("bookid= ", location.state?.BOOK_ID)
        getbookshelfData(location.state?.BOOK_ID)
    }, [location.state?.BOOK_ID])


    const getbookshelfData = async (bookid) => {

        const booklistResp = await getBookShelf()

        if (booklistResp?.output?.books != null) {
            let booklist_arr = booklistResp?.output?.books?.filter((val) => {
                return (val.id === bookid)
            })
            console.log("booklistarr=", booklist_arr)

            if (booklist_arr.length > 0) {
                setIsBookPresent(true)
            }

        }
    }
    const book_detail = async (book_id) => {
        const resp = await get_book_details(book_id)
        if (resp === undefined || resp === null) {
            setBookdetail({})
            setImages([])
            setFrontCover('')
            setBackCover('')
        }
        else {
            console.log("det_resp", resp)
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
        // let default_image = img_arr?.filter((val) => {
        //     return (val.isdefault === true)

        // })
        // setDefaultimg(default_image)

        // let non_default_image = img_arr?.filter((val) => {
        //     return (val.isdefault !== true)
        // })
        // setNondefaultimg(non_default_image)
        let frontCover = image_path + pub_obj.publisherid + '/' + pub_obj.front_cover + '?d=' + new Date();
        let backCover = image_path + pub_obj.publisherid + '/' + pub_obj.back_cover + '?d=' + new Date();
        console.log("PUB OBJ FC IMAGE : ", frontCover);
        console.log("PUB OBJ BC IMAGE : ", backCover);
        setDefaultimg(frontCover);
        setNondefaultimg(backCover);

    }

    const img_alter = (img_data) => {
        console.log("PRD PG Book detail : ", bookdetail);
        // let path_img_data = image_path + bookdetail.publisher + "/" + img_data + '?d=' + new Date();
        console.log("img_data :", img_data);
        // console.log("path_img_data :", path_img_data);
        setDefaultimg(img_data)

        // if(book === front_cover){
        //     setDefaultimg(img_data)
        // }
        // else{
        //     setDefaultimg(front_cover)
        // }
    }

    // let basket = []

    const add_to_cart = async (bookid, toCheckout) => {

        console.log("Product_det_wishlistshow_bool ", wishlistshow)

        if (wishlistshow === false) {
            console.log("added to cart")


            addto_cart(bookdetail)
            if (toCheckout) {
                navigate("/login")
            }
            else {

                toast.success("Item Added to Cart", {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    closeButton: false,
                    theme: "dark",
                });
            }
            // navigation("/cartpage")

            
        }
        else {
            const get_json =
            {
                deviceid: uuid
                // "9E7C1A59-7473-405F-81A7-11E25C70F0AC" 
            }

            const resp = await cart_items(get_json)

            console.log("get_json ", get_json)

            let book_exist_arr = resp.output.filter((val) => {
                return (
                    val.id === bookid
                )
            })



            if (book_exist_arr.length === 0) {

                add_single(bookid)

                toast.success("Item Added to Cart", {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    closeButton: false,
                    theme: "dark",
                });

            }
            else {

                if (toCheckout) {

                    // remove book from cart
                    Remove_Cart_Item(bookid)

                    // add book again to the cart such that it is the last item added
                    add_single(bookid)
                    
                }
                else {

                    console.log("The Book already exists in the cart")
                    toast.info("Book Already Added", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        closeButton: false,
                        // theme: "light",
                        style: { fontWeight: 'bold', backgroundColor: "rgb(220, 249, 252)" }
                    });
                }
            }

            if (toCheckout) {
                navigate("/billingaddress", { state: { buynow: 1 } })
            }

        }

    }

    const add_single = async (bookid) => {
        const json = {
            "deviceid": uuid,
            // "9E7C1A59-7473-405F-81A7-11E25C70F0AC" , 
            "bookid": bookid
        }
        const resp = await add_single_item(json)
        console.log("single_item_added ", resp.message)
    }

    const Remove_Cart_Item = async (book_id) => {
        console.log("remove", book_id)

        if (wishlistshow === true) {
            let remove_json = {
                deviceid: uuid,
                // "9E7C1A59-7473-405F-81A7-11E25C70F0AC",
                bookid: book_id
            }

            console.log("Remove_json ", remove_json)

            const resp = await remove_item(remove_json)
            
        }
        else {
            let cartItems=JSON.parse(localStorage.getItem("cart_data")) || []
            
            let is_book_exists = cartItems.find((val) => val.my_book_id === book_id)
            if (is_book_exists !== undefined) {



                let localstorage_array = [...cartItems]
                let arr_index = cartItems.indexOf(is_book_exists)
                // console.log("index", arr_index)

                localstorage_array.splice(arr_index, 1)
                localStorage.setItem("cart_data", JSON.stringify(localstorage_array))
                // console.log("localarray_after_remove :", JSON.parse(localStorage.getItem("cart_data")))
                setDependencyvar(!dependencyvar)
                get_items()
            }
        }


    }

    const remove_item = async (remove_json) => {
        const resp = await remove_cart_item(remove_json)
        console.log("Remove_cart :", resp) 
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
            <div className="category_bg details_main pb-5">
                <div className="details_path"><span className="fw700">Home</span><span className="fw600"> &gt; {bookdetail.category} &gt;</span><span className="fw400"> {bookdetail.title}</span></div>
                <div className="row mt-5">
                    <div className="col-md-4 product_image_div">
                        <div className="book_bg pb-5">
                            <div className="d-flex justify-content-end align-items-center pt-2">
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
                                <img src={defaultimg ? defaultimg : dummy} width={300} height={300}
                                    className="d-flex justify-content-center align-items-center product_image"
                                    loading="lazy"
                                />
                            </div>
                        </div>


                        {/* {
                            nondefaultimg?.length > 0 ? nondefaultimg.map((data, index) => (
                                <div key={index} className="d-flex flex-row justify-content-between product_title_margin"
                                    // onClick={() => img_alter(data.image !== null || data.image !== undefined ? data.image : dummy)}
                                    onClick={() => img_alter(data)}
                                >
                                    <div className='product_3_images'> <img src={data?.length > 0 ? data.image : dummy} width={112} height={111} /></div>
                                </div>
                            )) : (
                                <div className="d-flex flex-row justify-content-between mt-3">
                                    <div > <img className='product_3_images' src={dummy} /></div>
                                    <div > <img className='product_3_images' src={dummy} /></div>
                                    <div > <img className='product_3_images' src={dummy} /></div>
                                </div>
                            )
                        } */}
                        {/* <div className="d-flex flex-row justify-content-between mt-3">
                            <div onClick={() => img_alter(nondefaultimg)}> <img className='product_3_images' src={ nondefaultimg ? nondefaultimg : dummy} /></div>
                        </div> */}



                    </div>
                    <div className="col-md-8 product_details_text_container">
                        <div className="book_details_all ms-4 pt-2 pb-5">
                            <div className="details_head fw600">{bookdetail.title}</div>
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


                            <div className="details_price fw600 mt-4">Price:</div>
                            <div className="disc_price fw600 mt-2">
                                &#8377;{bookdetail.price}
                                {/* <span className="mrp text-decoration-line-through fw400 ps-3"> &#8377;298</span> */}
                            </div>
                            {isBookPresent ?

                                <div className="d-flex flex-row justify-content-start mt-5">
                                    <button type="button" 
                                        className="btn btn-outline-secondary rounded-pill fw500 txt_color_64646F me-4 "
                                        onClick={() => go_to_bookshelf()}>
                                        Go To Your Bookshelf
                                    </button>

                                </div>

                                :

                                <div className="d-flex flex-row justify-content-start mt-5 button_width">
                                    <button type="button" style={{ width: '185px' }}
                                        className="btn btn-outline-secondary rounded-pill d-flex justify-content-center align-items-center details_btn fw500 txt_color_64646F me-4"
                                        onClick={() => add_to_cart(bookdetail.id, false)}>
                                        Add to Cart
                                    </button>
                                    <button type="button" className="btn btn-primary rounded-pill d-flex justify-content-center align-items-center details_btn txt_color_FFFFFF fw500" onClick={() => add_to_cart(bookdetail.id, true)}>Buy Now</button>
                                </div>
                            }

                        </div>
                        <div className="prod_details fw500 ms-4 mt-5 mb-2">Product Details</div>
                        <div className="product_details details_list ms-2">
                            <ul className="ul_border">
                                <li>Author: <span>{bookdetail.authors !== null ? bookdetail.authors : "Not Found"}</span></li>
                                <li>Publisher: <span>{bookdetail.publisher !== null ? bookdetail.publisher : "Not Found"}</span></li>
                                <li>Publishing Date: <span>
                                    {bookdetail.publishdate === undefined || bookdetail.publishdate === null ? "Not Found" : Datetime(bookdetail.publishdate?.split(" ")[0])}
                                </span></li>

                                <li>Format: <span>E-Book</span></li>

                            </ul>

                            <hr className='hr' />

                            <ul className="ul_2">
                                <li>Edition No: <span>{bookdetail.editionno !== null ? bookdetail.editionno : "No Editions Found"}</span></li>
                                <li>ISBN-10: <span>{bookdetail.isbn10 !== null ? bookdetail.isbn10 : "Not Found"}</span></li>
                                <li>ISBN-13: <span>{bookdetail.isbn13 !== null ? bookdetail.isbn13 : "Not Found"}</span></li>
                                <li>No of Pages: <span>{bookdetail.noofpages !== null ? bookdetail.noofpages : "Not Found"}</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* -----------Book Details End----------- */}

            {/* --------Similar Products--------- */}

            {/* <div className="p-5">
                <div className="section_head mb-5 fw500"><span className="fw600">Similar</span> Books</div>
                <div className="row mx-3 mb-5">

                    <Carousel
                        responsive={responsive}
                        infinite={true}
                    >

                        <div className="col-md border card_border_light rounded-4 book_card h380 m-3">
                            <div className="d-flex flex-column">
                                <div className="d-flex justify-content-end mt-2 me-2">
                                    <img src={wishlight} width={27} height={27} />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <img src={book1} width={120} height={170} />
                                </div>
                                <div className="d-flex justify-content-center book_name mx-2 mt-3">Attitude Is Everything</div>
                                <div className="d-flex justify-content-center pub_name mt-2">Publisher: <span className="pub_span">Spring & River</span></div>
                                <div className="d-flex justify-content-center author_name">Author: Jeff Keller</div>
                                <div className="d-flex justify-content-center price_style mt-3">&#8377;112</div>
                            </div>
                        </div>
                        <div className="col-md border card_border_light rounded-4 book_card h380 m-3">
                            <div className="d-flex flex-column">
                                <div className="d-flex justify-content-end mt-2 me-2">
                                    <img src={wishlight} width={27} height={27} />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <img src={book2} width={120} height={170} />
                                </div>
                                <div className="d-flex justify-content-center book_name mx-2 mt-3">Pride & Prejudice</div>
                                <div className="d-flex justify-content-center pub_name mt-2">Publisher: <span className="pub_span">Spring & River</span></div>
                                <div className="d-flex justify-content-center author_name">Author: Jeff Keller</div>
                                <div className="d-flex justify-content-center price_style mt-3">&#8377;125</div>
                            </div>
                        </div>
                        <div className="col-md border card_border_light rounded-4 book_card h380 m-3 pos_rel">
                            <div className="disc_tag rounded-circle">
                                <div className="dis_per_txt fw600 mt-3">40%</div>
                                <div className="dis_txt fw600">Discount</div>
                            </div>
                            <div className="d-flex flex-column">
                                <div className="d-flex justify-content-end mt-2 me-2">
                                    <img src={wishlistedicon} width={27} height={27} />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <img src={book3} width={120} height={170} />
                                </div>
                                <div className="d-flex justify-content-center book_name mx-2 mt-3">Three Thousand Stitches</div>
                                <div className="d-flex justify-content-center pub_name mt-2">Publisher: <span className="pub_span">Spring & River</span></div>
                                <div className="d-flex justify-content-center author_name">Author: Sudha Murty</div>
                                <div className="d-flex justify-content-center price_style mt-3">&#8377;98</div>
                            </div>
                        </div>
                        <div className="col-md border card_border_light rounded-4 book_card h380 m-3">
                            <div className="d-flex flex-column">
                                <div className="d-flex justify-content-end mt-2 me-2">
                                    <img src={wishlight} width={27} height={27} />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <img src={book4} width={120} height={170} />
                                </div>
                                <div className="d-flex justify-content-center book_name mx-2 mt-3">How to Talk to Anyone</div>
                                <div className="d-flex justify-content-center pub_name mt-2">Publisher: <span className="pub_span">Spring & River</span></div>
                                <div className="d-flex justify-content-center author_name">Author: Harper Collins </div>
                                <div className="d-flex justify-content-center price_style mt-3">&#8377;256</div>
                            </div>
                        </div>

                    </Carousel>


                </div>
            </div> */}

            {/* ---------------Similar Products End---------------- */}



            <Guideline />
            <Playstore />
            <Footer />

            <ToastContainer />

        </div>
    );
}

export default ProductDetailsPage;