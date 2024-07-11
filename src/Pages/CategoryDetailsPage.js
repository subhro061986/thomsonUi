import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { UserProfile } from "../Context/Usercontext"
import Accordion from 'react-bootstrap/Accordion';
import TopBar from "../Layout/TopBar";
import NavBar from "../Layout/NavBar";
import Footer from "../Layout/Footer";
import Playstore from "../Layout/Playstore";
import Guideline from "../Layout/Guideline";
import wishlight from "../Assets/Images/wishlight.png";
import lion_king from "../Assets/Images/lion_king.png";
import cat_details_pic_2 from "../Assets/Images/cat_details_pic_2.png";
import cat_details_pic_3 from "../Assets/Images/cat_details_pic_3.png";
import cat_details_pic_4 from "../Assets/Images/cat_details_pic_4.png";
import cat_details_pic_5 from "../Assets/Images/cat_details_pic_5.png";
import cat_details_pic_6 from "../Assets/Images/cat_details_pic_6.png";
import { useAuth } from '../Context/Authcontext';
import Config from "../Config/Config.json"
import dummy from "../Assets/Images/dummy.png";
import wishlistedicon from "../Assets/Images/wishlistedicon.png";

import arrow_down from "../Assets/Images/arrow-down.png";
import arrow_up from "../Assets/Images/arrow-d.png";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import element3 from "../Assets/Images/element-3.svg";
import rowVertical from "../Assets/Images/row-vertical.svg";

import arrow_circle_right from "../Assets/Images/arrow-circle-right.png"

import SVG from "react-inlinesvg";
import Whatsapp from "../Layout/Whatsapp";
import FooterSouthsore from "../Layout/FooterSouthsore";



const CategoryDetailsPage = () => {


    const { getBook_by_category, allCategoryList, allActivePublisher, getAllCategory, category_by_publisher, add_delete_to_wishlist, wishlistitems, publisherId } = UserProfile()
    const { wishlistshow } = useAuth()

    const navigate = useNavigate();
    const location = useLocation()

    const [books, setBooks] = useState([])
    const [allbooks, setAllBooks] = useState([])
    const [dropbool, setDropbool] = useState(false)
    const [droptext, setDropText] = useState('')
    const [rawbooksdata, setRawbooksdata] = useState([])
    const [pricerangefilters, setPricerangefilters] = useState([])
    const [noofbooks, setNoofbooks] = useState()
    const [categoryname, setCategoryname] = useState("")
    const [publisherName, setPublisherName] = useState("")
    const [category, setCategory] = useState([])
    const [pubcat, setPubcat] = useState([])
    const [togglepricedropdown, setTogglepricedropdown] = useState(false)
    const [togglelanguagedropdown, setTogglelanguagedropdown] = useState(false)
    const [publicationyr, setPublicationyr] = useState(false)
    const [newarri, setNewarri] = useState(false)
    const [browsecat, setBrowsecat] = useState(false)
    const [tempBooks, setTempBooks] = useState([])
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(500);
    const [minRange, setMinRange] = useState(0);
    const [maxRange, setMaxRange] = useState(500);
    const [range, setRange] = useState([0, 0]);
    const [filterPublisherIds, setFilterPublisherIds] = useState([])
    const [filterCategoryIds, setFilterCategoryIds] = useState([])






    // const [value, setValue] = useState([30, 60]);

    // let menuref = useRef()


    // useEffect(() => {
    //     let handler = (e) => {

    //         console.log('menuref',menuref)
    //         if (!menuref.current.contains(e)) {
    //             // setDropbool(false)
    //             console.log('menuref_current',menuref.current)
    //         }
    //     }


    //     document.addEventListener('mousedown', handler)

    //     return () => {
    //         document.removeEventListener('mousedown', handler)
    //     }

    // })

    useEffect(() => {
        let handler = (e) => {
            console.log("event", e.target.className)
            if (e.target.className !== 'li_hover' && e.target.className !== 'text_select') {
                console.log('Not li hover class')
                setDropbool(false)
            }

        };

        console.log('bool state', dropbool)

        if (dropbool) {
            console.log('bool is true')
            document.addEventListener('mousedown', handler)
        }


        return () => {
            document.removeEventListener('mousedown', handler)
        }

    }, [dropbool])

    useEffect(() => {
        console.log("hello location.state", location.state)
        console.log("hello books", location.state.category_id)
        console.log("hello books pub", location.state.publisher_id)
        let pubidarr = filterPublisherIds
        console.log("pubidarr in useeffect", pubidarr)
        if (location.state.publisher_id === undefined) {
            pubidarr = []
        }
        else {
            if (pubidarr.length === 0) {
                pubidarr.push(parseInt(location.state.publisher_id))
            }
        }
        console.log("GET PUB ID ARRAY", pubidarr)
        setFilterPublisherIds(pubidarr)

        let catidarr = filterCategoryIds
        console.log("catidarr in useeffect", catidarr)
        if (location.state.category_id === undefined) {
            catidarr = []
        }
        else {
            if (catidarr.length === 0) {
                catidarr.push(parseInt(location.state.category_id))
            }
        }
        console.log("GET cat ID ARRAY", catidarr)
        setFilterCategoryIds(catidarr)
        // book_category()
        books_by_category(pubidarr, catidarr)
        // ** For direct navigation to category details page using url

        //book_category_by_publisher(1)
        // console.log("tempBooks", tempBooks);
    }, [location.state.publisher_id, location.state.category_id, wishlistitems])

    useEffect(() => {

        window.scrollTo(0, 0)
    }, [location.state.category_id, location.state.publisher_id])

    let categry_id_nav = location.state.category_id
    let publisher_id_car = location.state.publisher_id





    const setLowToHigh = () => {
        const sortedProducts = books.sort((a, b) => a.price - b.price);
        console.log("sortedproducts", sortedProducts)
        setBooks([...sortedProducts]);
    };

    const setHightoLow = () => {
        const sortedProducts = books.sort((a, b) => b.price - a.price);
        setBooks([...sortedProducts]);
    };

    const AtoZ = () => {
        const sortedProducts = books.sort((a, b) => a.title > b.title ? 1 : -1)
        console.log("A-Z", sortedProducts)
        setBooks([...sortedProducts]);
    }

    const ZtoA = () => {
        const sortedProducts = books.sort((a, b) => a.title > b.title ? -1 : 1)
        console.log("Z-A", sortedProducts)
        setBooks([...sortedProducts]);
    }


    // const Reset_data = () =>{
    //     setBooks([...rawbooksdata])
    // } 

    var price_filters_arr = []
    var arr = []
    const price_ranges = (booksarr) => {
        const sorted_Products = booksarr.sort((a, b) => a.price - b.price);
        arr = ([...sorted_Products])


        let price_min = arr[0].price
        let price_max = arr[arr.length - 1].price



        let a = price_max - price_min


        let Filters_no = 0
        if (arr.length > 0 && arr.length <= 6) {
            Filters_no = 1
        }
        else {
            Filters_no = 5
        }
        price_filters_arr = []

        let b = a / Filters_no
        let val = 0
        let prev = 0
        if (b > 0) {
            price_filters_arr.push(`Under ₹${Math.trunc(b)}`)
            val = b
        }


        if (b > 0) {
            for (let i = 0; i < Filters_no; i++) {

                if (val <= a) {
                    prev = val
                    val = val + b
                    price_filters_arr.push(`₹${Math.trunc(prev)} - ₹${Math.trunc(val)}`)

                }

            }
            //price_filters_arr.push(`₹${price_filters_arr[price_filters_arr.length - 1].split('-')[1].split('₹')[1].trim()} - ₹${Math.trunc(price_max)}`)
        }
        else {
            price_filters_arr.push(`₹${Math.trunc(b)} - ₹${Math.trunc(price_max)}`)

        }
        price_filters_arr.push(`₹${price_filters_arr[price_filters_arr.length - 1].split('-')[1].split('₹')[1].trim()} - ₹${Math.trunc(price_max)}`)




        if (price_filters_arr.length > Filters_no) {

            setPricerangefilters(price_filters_arr.splice(0, price_filters_arr.length / 2))
        }
        else {
            console.log('array2000', price_filters_arr.length)
            setPricerangefilters(price_filters_arr)
        }





    }


    const filter_by_price = (range, index) => {



        // console.log('range', index)

        if (index === 0) {

            let range_pr = Number(range.split(' ')[1].split('₹')[1].trim())


            let book_arr = allbooks.filter((book) => {
                return (
                    book.price <= range_pr
                )
            })

            setBooks(book_arr);
            console.log(book_arr)
        }
        else {

            let range_pr = range.split('-')
            let price_lower_lim = Number(range_pr[0].split('₹')[1].trim())
            let price_higher_lim = Number(range_pr[1].split('₹')[1].trim())

            console.log('l', price_lower_lim)
            console.log('h', price_higher_lim)




            let book_arr = allbooks.filter((book) => {
                return (
                    book.price <= price_higher_lim
                )
            })

            let books_in_range = book_arr.filter((books) => {

                return (
                    books.price >= price_lower_lim
                )
            })



            setBooks(books_in_range);
            console.log("books", books)
        }






    }

    const Sort = (e) => {
        // console.log(e.target.value)
        let sort_val = e.target.value
        if (sort_val === 'high-low') {
            console.log('high-low')
            setHightoLow()
        }
        else if (sort_val === 'low-high') {
            console.log('low-high')
            setLowToHigh()
        }
        else if (sort_val === 'A-Z') {
            console.log('A-Z')
            AtoZ()
        }
        else {
            console.log('Z-A')
            ZtoA()
        }
    }

    // const show_selected_filter_text = (val) =>{
    //     setDropText(val)
    // }


    const Sort_mob = (e, val) => {
        // console.log(e.target.value)

        let selected_text = e.target.innerText
        setDropText(selected_text)

        let sort_val = val
        if (sort_val === 'high-low') {
            console.log('high-low')
            setHightoLow()
            setDropbool(!dropbool)
        }
        else if (sort_val === 'low-high') {
            console.log('low-high')
            setLowToHigh()
            setDropbool(!dropbool)
        }
        else if (sort_val === 'A-Z') {
            console.log('A-Z')
            AtoZ()
            setDropbool(!dropbool)
        }
        else {
            console.log('Z-A')
            ZtoA()
            setDropbool(!dropbool)
        }
    }




    const gotoDetails = (book_id) => {
        navigate('/productdetails', { state: { BOOK_ID: book_id } })
    }

    const books_by_category = async (pub_id, cat_id) => {
        console.log("GET Category Id BY CATEGORY", cat_id)
        console.log("GET publisher Id BY publisher", pub_id)

        let json = {
            "filterCriteria": {

                "categoryids": cat_id,
                "publisherids": pub_id
            }
        }

        console.log("GET json", json)
        let current_page_no = 1
        let records_per_page = 6

        // if ((cat_id !== 0 && pub_id === 0) || (cat_id === 0 && pub_id !== 0)) {
        const resp = await getBook_by_category(current_page_no, records_per_page, json)
        console.log("GET BOOK BY CATEGORY", resp)
        if (resp === undefined || resp === null) {
            setTempBooks([])
            setBooks([])
            setRawbooksdata([])
        }
        else {
            setTempBooks(resp?.output?.books)
            if (resp?.output?.books?.length > 0) {
                
                setBooks(resp?.output?.books)
                setAllBooks(resp?.output?.books)
                setRawbooksdata(resp?.output?.books)
                setNoofbooks(resp?.output?.books?.length)
                setCategoryname(resp.output.books[0].category)
                setPublisherName(resp.output.books[0].publisher)
                price_ranges(resp?.output?.books)
            }
            else {
                setBooks([])
                setAllBooks([])
                setRawbooksdata([])
            }
        }



        // const prices = tempBooks.map(data => parseFloat(data.price.replace('$ ', '')));
        // const min = Math.min(...prices);
        // const max = Math.max(...prices);

        // setMinPrice(min);
        // setMaxPrice(max);
        // setRange([min, max]);
        // }
    }

    const selectFilter = async (e, values, index, type) => {
        let tempPub = filterPublisherIds
        let tempCat = filterCategoryIds
        if (type === "publisher") {

            if (e.target.checked === true) {
                let chkind = tempPub.findIndex((item, i) => {
                    return item === values.id
                });
                if (chkind < 0) {
                    tempPub.push(values.id)
                }
                else {
                    console.log("pub id already exist")
                }
            }
            else {
                let ind = tempPub.findIndex((item, i) => {
                    return item === values.id
                });
                // console.log("ind",ind)
                tempPub.splice(ind, 1)
            }
            // console.log("temppub",tempPub)
            setFilterPublisherIds(tempPub)
        }
        else {

            if (e.target.checked === true) {
                let chkind = tempPub.findIndex((item, i) => {
                    return item === values.id
                });
                if (chkind < 0) {
                    tempCat.push(values.id)
                }
                else {
                    console.log("cat id already exist")
                }
            }
            else {
                let ind = tempCat.findIndex((item, i) => {
                    return item === values.id
                });
                // console.log("ind",ind)
                tempCat.splice(ind, 1)
            }
            console.log("tempCat", tempCat)
            setFilterCategoryIds(tempCat)

        }
        books_by_category(tempPub, tempCat)
    }

    const rangefunction = (e) => {
        console.log("range function", e)
        setMaxRange(e[1])
        setMinRange(e[0])
    }

    // const parsePrice = (price) => parseFloat(price.replace('$ ', ''));

    // const getMinPrice = (tempBooks) => {
    //     return Math.min(...tempBooks.map(data => parsePrice(data.price)));
    // };

    // const getMaxPrice = (tempBooks) => {
    //     return Math.max(...tempBooks.map(data => parsePrice(data.price)));
    // };

    // const minPrice = getMinPrice(tempBooks);
    // // console.log('minPrice', minPrice)
    // const maxPrice = getMaxPrice(tempBooks);
    // // console.log('maxPrice', maxPrice)

    // const [range, setRange] = useState([minPrice, maxPrice]);


    // const book_category_by_publisher = async (publisher_id) => {
    //     const resp = await category_by_publisher(publisher_id)
    //     console.log("pub_cat_resp", resp)
    //     if (resp === undefined || resp === null) {
    //         setPubcat([])
    //     }
    //     else {
    //         if (resp.statuscode === "0" && resp?.output?.length > 0) {
    //             setPubcat(resp.output)
    //         }
    //         else {
    //             setPubcat([])
    //         }
    //     }

    // }



    // const book_category = async () => {
    //     const resp = await getAllCategory()
    //     //  console.log("resp",resp)
    //     if (resp?.output?.length > 0) {
    //         setCategory(resp.output)
    //     }
    //     else {
    //         setCategory([])
    //     }
    // }



    const Wishlist = (event, book_id, index) => {
        console.log('wish e', event)

        event.stopPropagation()
        if (wishlistshow === true) {


            Add_To_Wishlist(book_id, index)
        }
        else {
            navigate('/loginsouthsore')
        }
    }


    const Add_To_Wishlist = async (book_id, index) => {

        console.log('book_index', index)

        console.log("wishlist items : ", wishlistitems)

        let json = {

            "bookid": book_id,
            "currentPage": 1,
            "recordPerPage": 5

        }



        const resp = await add_delete_to_wishlist(json)

        // books_by_category(location.state ? location.state.category_id : 1)
        console.log("Wishlist_resp ", resp)

        // if (books[index].isFavourite === 0) {
        //     books[index].isFavourite = 1
        // }
        // else {
        //     books[index].isFavourite = 0
        // }


        // console.log('index_book', books)

        // setBooks([...books])

        if (tempBooks[index].isFavourite === 0) {
            tempBooks[index].isFavourite = 1
        }
        else {
            tempBooks[index].isFavourite = 0
        }


        console.log('index_book', tempBooks)

        setTempBooks([...tempBooks])

        console.log('index_book_1', tempBooks)



        if (resp.message === "Item added to wishlist.") {

            // toast.success("Item Added to Wishlist", {
            //     position: "bottom-center",
            //     autoClose: 2000,
            //     hideProgressBar: true,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     closeButton:false,
            //     theme: "dark",
            //     });
        }



    }


    return (
        <>

            <div className="main-container">

                <div className="container">
                    <TopBar />
                    <NavBar />

                </div>
                <Whatsapp />
                <div className="container category-details">
                    {/* Adding books and filter here */}
                    <div className="row" >

                        <div className="filter_container">
                            <div className="col-md-3" style={{ marginBottom: '32px' }}>

                                {/* <div className='div_container'>
                                    <h5>Browse Categories</h5>
                                    <img src={browsecat === false ? arrow_down : arrow_up} className='img_margin'
                                        width={15} height={15} onClick={() => { setBrowsecat(!browsecat) }} />
                                </div> */}



                                {/* <ul style={{ marginTop: '4%' }}> */}

                                {/* {
                                    browsecat === true &&
                                    pubcat.map((data, index) => (

                                        <ul className="li_margin">
                                            <li key={index}>{data.name}</li>
                                        </ul>



                                    ))
                                } */}
                                <hr />

                                <div className='div_container'>
                                    <li className="li_width">Refine your Search by Price</li>
                                    <img src={browsecat === false ? arrow_down : arrow_up}
                                        width={15} height={15} onClick={() => { setTogglepricedropdown(!togglepricedropdown) }} />
                                </div>

                                {
                                    togglepricedropdown === true &&




                                    pricerangefilters.map((data, index) => (

                                        <ul className="price-search li_margin" key={index}>
                                            <li style={{ cursor: "pointer" }} onClick={() => filter_by_price(pricerangefilters[index], index)}> {data} </li>

                                        </ul>



                                    ))}








                                <hr />

                                {/* <div className='div_container'>
                                    <li className="li_width">Language</li>
                                    <img src={browsecat === false ? arrow_down : arrow_up}
                                        width={15} height={15} onClick={() => { setTogglelanguagedropdown(!togglelanguagedropdown) }} />
                                </div> */}

                                {/* {
                                    togglelanguagedropdown === true &&
                                    <ul className="languages li_margin ">
                                        <li>English</li>
                                        <li>Bengali</li>
                                        <li>Hindi</li>
                                        <li>German</li>
                                        <li>Italian</li>
                                        <li>Spanish</li>
                                    </ul>
                                } 

                                <hr />*/}
                                {/* <div className='div_container'>
                                    <li className="li_width">Publication Year</li>
                                    <img src={browsecat === false ? arrow_down : arrow_up}
                                        width={15} height={15} onClick={() => { setPublicationyr(!publicationyr) }} />
                                </div>
                                {
                                    publicationyr === true &&
                                    <input type="range" min="2000" max="2023" className="slider slider_style" id="myRange"></input>
                                }


                                <hr /> */}
                                {/* <div className='div_container'>
                                    <li className="li_width">New Arrivals</li>
                                    <img src={browsecat === false ? arrow_down : arrow_up}
                                        width={15} height={15} onClick={() => { setNewarri(!newarri) }} />
                                </div>

                                {
                                    newarri === true &&

                                    <ul className="new-arrivals li_margin">
                                        <li>Last arrival books</li>
                                        <li>Last 30 days</li>
                                        <li>Last 90 days</li>
                                    </ul>
                                } */}


                                {/* </ul> */}
                            </div>
                        </div>


                        <div className="col-md-3">
                            <div className="web_filter">
                                <h4>{location.state.category_id ? "Publishers" : "Categories"}</h4>

                                {location.state.category_id && (
                                    <ul style={{ marginTop: '4%', paddingLeft: '0px' }}>
                                        {
                                            allActivePublisher.map((data, index) => (
                                                data.isactive === 1 && (
                                                    <li key={index} className="mb-2" style={{ listStyleType: "none" }}>
                                                        <input type="checkbox" className="me-2" value={data.id}
                                                            onClick={(e) => selectFilter(e, data, index, 'publisher')}
                                                        />
                                                        <label>{data.name}</label>
                                                    </li>

                                                )
                                            ))
                                        }
                                    </ul>
                                )}
                                {location.state.publisher_id && (
                                    <ul style={{ marginTop: '4%', paddingLeft: '0px' }}>
                                        {
                                            allCategoryList.map((data, index) => (
                                                data.isactive === 1 && (
                                                    <li key={index} className="mb-2" style={{ listStyleType: "none" }}>
                                                        <input type="checkbox" className="me-2" value={data.id}
                                                            onClick={(e) => selectFilter(e, data, index, 'category')}
                                                        />
                                                        <label>{data.name}</label>
                                                    </li>
                                                )
                                            ))
                                        }
                                    </ul>
                                )}


                                <hr />


                                <p className="mb-4">Price</p>


                                {/* {

                                        pricerangefilters.map((data, index) => (

                                            <ul className="price-search" key={index}>
                                                <li style={{ cursor: "pointer" }} onClick={() => filter_by_price(pricerangefilters[index], index)}> {data}</li>

                                            </ul>

                                        ))
                                    } */}

                                {/* <div style={{userSelect:'none'}}>Custom Values</div> */}
                                <RangeSlider
                                    min={0}
                                    max={500}
                                    step={1}
                                    defaultValue={[0, 500]}
                                    // value={[0,500]}
                                    onInput={(e) => rangefunction(e)}
                                    // className="range-slider-yellow"
                                    style={{ accentColor: '#000' }}
                                />
                                <div className="mt-4 d-flex justify-content-between align-items-center">
                                    <input type="text" value={minRange} className="form-control" readOnly={true} />
                                    <span className="px-2">to</span>
                                    <input type="text" value={maxRange} className="form-control" readOnly={true} />
                                </div>
                                {/* <p className="mt-4">{minRange} to {maxRange}</p> */}

                                <hr />
                                {/* <li>Language</li>
                                    <ul className="languages">
                                        <li>English</li>
                                        <li>Bengali</li>
                                        <li>Hindi</li>
                                        <li>German</li>
                                        <li>Italian</li>
                                        <li>Spanish</li>
                                    </ul> 
                                    <hr />*/}
                                {/* <li>Publication Year</li>
                                    <input type="range" min="2000" max="2023" className="slider" id="myRange"></input>
                                    <hr />
                                    <li>New Arrivals</li>
                                    <ul className="new-arrivals">
                                        <li>Last arrival books</li>
                                        <li>Last 30 days</li>
                                        <li>Last 90 days</li>
                                    </ul> */}

                            </div>
                        </div>


                        <div className="col-md-9 ">
                            <div className="container details">

                                <div className="details_path mt-3 margin_bt_1"><span className="fw700">Home</span><span className="fw400"> &gt; {location.state.category_id ? categoryname : publisherName} &gt;</span></div>
                                <div className="d-flex align-items-center header-top justify-content-between">

                                    <div className="categordet_div">
                                        <div className="header left_div">
                                            <div className="category_head margin_bt">
                                                <b>{location.state.category_id ? categoryname : publisherName}</b>

                                            </div>
                                            <div className="category_head_search_results">
                                                {tempBooks.length} Results found
                                            </div>
                                        </div>
                                        <div className="filter pos_rel d-flex align-items-center margin_tp">
                                            <span>Sort By</span>
                                            <div className='laptop_view'>
                                                <select className="p-2 mx-2" style={{ borderRadius: '10px', width: '124px' }} onChange={(e) => { Sort(e) }}>
                                                    <option value="low-high"> Sort by Price(Low to High)</option>
                                                    <option value="high-low"> Sort by Price(High to Low)</option>
                                                    <option value="A-Z"> Sort Alphabetically(A-Z)</option>
                                                    <option value="Z-A"> Sort Alphabetically(Z-A)</option>
                                                    {/* <option value="reset"> Reset(Z-A)</option> */}
                                                </select>
                                            </div>

                                            <div className='sort_class' onClick={() => setDropbool(!dropbool)}>
                                                <div className='text_select'>
                                                    {droptext === '' ? 'Sort Alphabetically(A-Z)' : droptext}
                                                </div>


                                                <img src={dropbool === false ? arrow_down : arrow_up} />


                                            </div>

                                            {
                                                dropbool === true &&
                                                <div className='show_hide_div' >
                                                    <ul className='ul_style'>
                                                        <li className='li_hover' onClick={(e) => Sort_mob(e, 'low-high')}>Sort by Price(Low to High)</li>
                                                        <li className='li_hover' onClick={(e) => Sort_mob(e, 'high-low')}>Sort by Price(High to Low)</li>
                                                        <li className='li_hover' onClick={(e) => Sort_mob(e, 'A-Z')}>Sort Alphabetically(A-Z)</li>
                                                        <li className='li_hover' onClick={(e) => Sort_mob(e, 'Z-A')}>Sort Alphabetically(Z-A)</li>
                                                    </ul>
                                                </div>
                                            }


                                            {/* <SVG className="me-2" src={element3}></SVG>
                                        <SVG src={rowVertical}></SVG> */}
                                        </div>
                                    </div>
                                </div>

                                <hr />


                                <div className="row d-flex card_padding_bottom">


                                    {
                                        //books.map((data, index) => (
                                        tempBooks.map((data, index) => (
                                            // data.status === 'Accepted' && (

                                            <div key={index} className=" bg-white book_card py-3 ms-4" style={{ width: '30%', border: '1px solid #AFB7BD', marginBottom: '10px', borderRadius: '20px' }} onClick={() => { gotoDetails(data.id) }}>
                                                <div className="d-flex flex-column">
                                                    <div className="d-flex justify-content-end mt-1 me-1" style={{ cursor: "pointer" }} onClick={(e) => Wishlist(e, data.id, index)}>
                                                        {
                                                            data.isFavourite === 1 ? (<img src={wishlistedicon} width={27} height={27} />)
                                                                :
                                                                (<img src={wishlight} width={27} height={27} />)
                                                        }



                                                    </div>
                                                    <div className="d-flex justify-content-center">
                                                        {/* <img src={data.image !== null ? data.image : dummy}
                                                        width={120} height={170} /> */}
                                                        <img src={data.img === null || data.img === '' ? dummy : Config.API_URL + Config.PUB_IMAGES + data.publisherid + "/" + data.img + '?d=' + new Date()}

                                                            width={120} height={170}
                                                            loading="lazy"
                                                        />
                                                    </div>


                                                    <div className="d-flex justify-content-center book_name mx-2 mt-3" style={{ minHeight: '48px' }}>{data?.title?.length > 21 ? data.title.substring(0, 21) + ".." : data.title}</div>
                                                    {/* <div className="d-flex justify-content-center pub_name">Publisher: <span className="pub_span">Spring & River</span></div> */}
                                                    <div className="d-flex justify-content-center author_name mt-2">
                                                        Author: {data.authors?.length > 0 ? data.authors : "Not Found"}
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-center mb-3">

                                                        <div className="  d-flex  price_style ">{data.price} &nbsp;</div>
                                                        {/* <div className="  d-flex  price-cutText ">&#8377;298</div> */}
                                                    </div>
                                                    <div className="d-flex justify-content-center mb-3">

                                                        <button type="button" style={{ width: '70%' }}
                                                            className="btn btn-primary rounded-pill d-flex justify-content-center align-items-center py-2"
                                                        // onClick={() => add_to_cart(bookdetail.id, false)}
                                                        >
                                                            Add to Cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            // )

                                        ))}

                                </div>



                            </div>
                        </div>


                    </div>
                </div>
                <FooterSouthsore />



                <ToastContainer />

            </div>




        </>
    );
}

export default CategoryDetailsPage