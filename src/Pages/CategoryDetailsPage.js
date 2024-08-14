import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { UserProfile } from "../Context/Usercontext"
import Accordion from 'react-bootstrap/Accordion';
import TopBar from "../Layout/TopBar";
import NavBar from "../Layout/NavBar";
import Footer from "../Layout/Footer";

import wishlight from "../Assets/Images/wishlight.png";

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



import SVG from "react-inlinesvg";
import Whatsapp from "../Layout/Whatsapp";
import FooterSouthsore from "../Layout/FooterSouthsore";



const CategoryDetailsPage = () => {


    const { getBook_by_category, allCategoryList, allActivePublisher, getAllCategory, category_by_publisher, add_delete_to_wishlist, wishlistitems, publisherId } = UserProfile()
    const { wishlistshow, add_book_to_storage, authData, uuid, authRole } = useAuth()

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
    const [toggleCatPubdropdown, setToggleCatPubdropdown] = useState(false)
    const [togglelanguagedropdown, setTogglelanguagedropdown] = useState(false)
    const [publicationyr, setPublicationyr] = useState(false)
    const [newarri, setNewarri] = useState(false)
    const [browsecat, setBrowsecat] = useState(false)
    const [tempBooks, setTempBooks] = useState([])
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [minRange, setMinRange] = useState(0);
    const [maxRange, setMaxRange] = useState(0);
    const [range, setRange] = useState([0, 0]);
    const [filterPublisherIds, setFilterPublisherIds] = useState([])
    const [filterCategoryIds, setFilterCategoryIds] = useState([])
    const [currentPageNo, setCurrentPageNo] = useState(1)
    const [recordsPerPage, setRecordsPerPage] = useState(6)
    const [maxPage, setMaxPage] = useState(0)
   





    
    useEffect(() => {
        let handler = (e) => {
            // console.log("event", e.target.className)
            if (e.target.className !== 'li_hover' && e.target.className !== 'text_select') {
                // console.log('Not li hover class')
                setDropbool(false)
            }

        };



        if (dropbool) {
            // console.log('bool is true')
            document.addEventListener('mousedown', handler)
        }


        return () => {
            document.removeEventListener('mousedown', handler)
        }

    }, [dropbool])

    useEffect(() => {
        // console.log("hello location.state", location)
        // console.log("hello books", location.state.category_id)
        // console.log("hello books pub", location.state.publisher_id)
        let pubidarr = filterPublisherIds
        // console.log("pubidarr in useeffect", pubidarr)
        if (location.state.publisher_id === undefined) {
            pubidarr = []
        }
        else {
            if (pubidarr.length === 0) {
                pubidarr.push(parseInt(location.state.publisher_id))
            }
        }
        // console.log("GET PUB ID ARRAY", pubidarr)
        setFilterPublisherIds(pubidarr)

        let catidarr = filterCategoryIds
        // console.log("catidarr in useeffect", catidarr)
        if (location.state.category_id === undefined) {
            catidarr = []
        }
        else {
            if (catidarr.length === 0) {
                catidarr.push(parseInt(location.state.category_id))
            }
        }
        // console.log("GET cat ID ARRAY", catidarr)
        setFilterCategoryIds(catidarr)
        // book_category()
        books_by_category(pubidarr, catidarr,currentPageNo,minRange,maxRange)
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
        const sortedProducts = tempBooks.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        setTempBooks([...sortedProducts]);
    };

    const setHightoLow = () => {
        const sortedProducts = tempBooks.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        setTempBooks([...sortedProducts]); 
    };

    const AtoZ = () => {
        const sortedProducts = tempBooks.sort((a, b) => a.title > b.title ? 1 : -1)
        // console.log("A-Z", sortedProducts)
        setTempBooks([...sortedProducts]);
    }

    const ZtoA = () => {
        const sortedProducts = tempBooks.sort((a, b) => a.title > b.title ? -1 : 1)
        // console.log("Z-A", sortedProducts)
        setTempBooks([...sortedProducts]);
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
            // console.log('array2000', price_filters_arr.length)
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
            // console.log(book_arr)
        }
        else {

            let range_pr = range.split('-')
            let price_lower_lim = Number(range_pr[0].split('₹')[1].trim())
            let price_higher_lim = Number(range_pr[1].split('₹')[1].trim())

            // console.log('l', price_lower_lim)
            // console.log('h', price_higher_lim)




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
            // console.log("books", books)
        }






    }

    const Sort = async(e) => {
        let sort_val = e.target.value
        if (sort_val === 'HIGH-LOW') {
            // console.log('high-low')
            setHightoLow()
        }
        else if (sort_val === 'LOW-HIGH') {
            // console.log('low-high')
            setLowToHigh()
        }
        else if (sort_val === 'A-Z') {
            // console.log('A-Z')
            AtoZ()
        }
        else {
            // console.log('Z-A')
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
            // console.log('high-low')
            setHightoLow()
            setDropbool(!dropbool)
        }
        else if (sort_val === 'low-high') {
            // console.log('low-high')
            setLowToHigh()
            setDropbool(!dropbool)
        }
        else if (sort_val === 'A-Z') {
            // console.log('A-Z')
            AtoZ()
            setDropbool(!dropbool)
        }
        else {
            // console.log('Z-A')
            ZtoA()
            setDropbool(!dropbool)
        }
    }




    const gotoDetails = (book_id) => {
        navigate('/productdetails', { state: { BOOK_ID: book_id } })
    }

    const books_by_category = async (pub_id, cat_id,currpage,min,max) => {
        // console.log("GET Category Id BY CATEGORY", cat_id)
        // console.log("GET publisher Id BY publisher", pub_id)
        
        let json = {
            "filterCriteria": {

                "categoryids": cat_id,
                "publisherids": pub_id,
                "minPrice":min,
                "maxPrice":max
            }
        }

        // console.log("GET json", json)
       
        const resp = await getBook_by_category(currpage, recordsPerPage, json)

        if (resp === undefined || resp === null) {
            setTempBooks([])
            setBooks([])
            setRawbooksdata([])
            setMaxPage(0)
            setMaxRange(0)
            setMaxPrice(0)
        }
        else {
            console.log("RESP BOOKS",resp)
            setTempBooks(resp?.output?.books)
            setMaxPage(resp?.output?.maxPage)
            setMaxRange(resp?.output?.maxPrice)
            if(maxPrice<=0){
                setMaxPrice(resp?.output?.maxPrice)
            }
            
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
            // console.log("cat tempcatt", tempCat)
            if (e.target.checked === true) {
                let chkind_cat = tempPub.findIndex((item, i) => {
                    // console.log("cat item", item)
                    return item === values.id
                });
                // console.log("cat chkind", chkind_cat)
                if (chkind_cat < 0) {
                    tempCat.push(values.id)
                }
                else {
                    // console.log("cat id already exist")
                }
            }
            else {
                let ind = tempCat.findIndex((item, i) => {
                    return item === values.id
                });
                // console.log("ind",ind)
                tempCat.splice(ind, 1)
            }
            // console.log("tempCat", tempCat)
            setFilterCategoryIds(tempCat)

        }
        books_by_category(tempPub, tempCat,currentPageNo,minRange,maxRange)
    }

    const rangefunction = async(e) => {
        // console.log("range function", e)
        // setMaxRange(e[1])
        // setMinRange(e[0])
        setMinPrice(e[0])
        setMaxPrice(e[1])
        await books_by_category(filterPublisherIds, filterCategoryIds,currentPageNo,e[0],e[1])
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










    const Wishlist = (event, book_id, index) => {
        // console.log('wish e', event)

        event.stopPropagation()
        if (wishlistshow === true) {


            Add_To_Wishlist(book_id, index)
        }
        else {
            navigate('/login')
        }
    }


    const Add_To_Wishlist = async (book_id, index) => {

        // console.log('book_index', index)

        // console.log("wishlist items : ", wishlistitems)

        let json = {

            "bookid": book_id,
            "currentPage": 1,
            "recordPerPage": 5

        }



        const resp = await add_delete_to_wishlist(json)

        

        if (tempBooks[index].isFavourite === 0) {
            tempBooks[index].isFavourite = 1
        }
        else {
            tempBooks[index].isFavourite = 0
        }


        // console.log('index_book', tempBooks)

        setTempBooks([...tempBooks])

        // console.log('index_book_1', tempBooks)



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

    const add_to_cart = async (bookdetail, toCheckout) => {
        console.log('bookDetails', bookdetail)
        let json_data = {
            title: bookdetail.title,
            authors: bookdetail.authors,
            price: bookdetail.price,
            publisher: bookdetail.publisher,
            items_no: 1,
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
            alert(resp.message)
        }
    }

    const next_page=async()=>{
        let tempCurr=currentPageNo
        if(tempCurr<=maxPage){
            setCurrentPageNo(tempCurr+1)
            await books_by_category(filterPublisherIds, filterCategoryIds,tempCurr+1,minRange,maxRange)
        }
        
    }
    const prev_page=async()=>{
        let tempCurr=currentPageNo
        if(tempCurr>0){
            setCurrentPageNo(tempCurr-1)
            await books_by_category(filterPublisherIds, filterCategoryIds,tempCurr-1,minRange,maxRange)
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
                                    <h5>Browse Practice Area</h5>
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
                                    <li className="li_width">Price</li>
                                    <img src={browsecat === false ? arrow_down : arrow_up}
                                        width={15} height={15} onClick={() => { setTogglepricedropdown(!togglepricedropdown) }} />
                                </div>

                                {
                                    togglepricedropdown === true &&


                                    <div className="mt-4">
                                        <RangeSlider
                                            min={0}
                                            max={maxRange}
                                            step={1}
                                            //defaultValue={[minRange, maxRange]}
                                            value={[minPrice,maxPrice]}
                                            onInput={(e) => rangefunction(e)}
                                            // className="range-slider-yellow"
                                            style={{ accentColor: '#000' }}
                                        />
                                        <div className="mt-4 d-flex justify-content-between align-items-center">
                                            <input type="text" value={minPrice} className="form-control price_range_inp" readOnly={true} />
                                            <span className="px-2">to</span>
                                            <input type="text" value={maxPrice} className="form-control price_range_inp" readOnly={true} />
                                        </div>
                                    </div>
                                }
                                <hr />

                                <div className='div_container'>
                                    <li className="li_width">{location.state.category_id ? "Imprints" : "Practice Area"}</li>
                                    <img src={browsecat === false ? arrow_down : arrow_up}
                                        width={15} height={15} onClick={() => { setToggleCatPubdropdown(!toggleCatPubdropdown) }} />
                                </div>

                                {
                                    toggleCatPubdropdown === true &&


                                    <div className="mt-4">
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
                                    </div>
                                }
                                <hr />

                                
                            </div>
                        </div>


                        <div className="col-md-3">
                            <div className="web_filter">
                                <h4>{location.state.category_id ? "Imprints" : "Practice Area"}</h4>

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
                                <RangeSlider
                                    min={0}
                                    max={maxRange}
                                    step={1}
                                    //defaultValue={[minPrice, maxPrice]}
                                    value={[minPrice, maxPrice]}
                                    onInput={(e) => rangefunction(e)}
                                    // className="range-slider-yellow"
                                    style={{ accentColor: '#000' }}
                                />
                                <div className="mt-4 d-flex justify-content-between align-items-center">
                                    <input type="text" value={minPrice} className="form-control price_range_inp" readOnly={true} />
                                    <span className="px-2">to</span>
                                    <input type="text" value={maxPrice} className="form-control price_range_inp" readOnly={true} />
                                </div>
                                {/* <p className="mt-4">{minRange} to {maxRange}</p> */}

                                <hr />
                                

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
                                                <select className="p-2 mx-2" 
                                                    style={{ borderRadius: '10px' }} 
                                                    onChange={(e) =>  Sort(e) }
                                                    >
                                                    <option value="LOW-HIGH"> Price : Low to High</option>
                                                    <option value="HIGH-LOW"> Price : High to Low</option>
                                                    <option value="A-Z"> Alphabetically : A-Z</option>
                                                    <option value="Z-A"> Alphabetically : Z-A</option>
                                                    {/* <option value="reset"> Reset(Z-A)</option> */}
                                                </select>
                                            </div>

                                            <div className='sort_class' onClick={() => setDropbool(!dropbool)}>
                                                <div className='text_select'>
                                                    {droptext === '' ? 'Sort' : droptext}
                                                </div>


                                                <img src={dropbool === false ? arrow_down : arrow_up} />


                                            </div>

                                            {
                                                dropbool === true &&
                                                <div className='show_hide_div' >
                                                    <ul className='ul_style'>
                                                        <li className='li_hover' onClick={(e) => Sort_mob(e, 'LOW-HIGH')}>Price : Low to High</li>
                                                        <li className='li_hover' onClick={(e) => Sort_mob(e, 'HIGH-LOW')}>Price : High to Low</li>
                                                        <li className='li_hover' onClick={(e) => Sort_mob(e, 'A-Z')}>Alphabetically : A-Z</li>
                                                        <li className='li_hover' onClick={(e) => Sort_mob(e, 'Z-A')}>Alphabetically : Z-A</li>
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

                                            <div key={index} className=" bg-white book_card py-3 ms-4 mb-4 mt-2" >
                                                <div className="d-flex flex-column" onClick={() => { gotoDetails(data.id) }}>
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

                                                        <div className="  d-flex  price_style ">{data.currency + ' ' + data.price} &nbsp;</div>
                                                        {/* <div className="  d-flex  price-cutText ">&#8377;298</div> */}
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-center mb-3">

                                                    <button type="button" style={{ width: '70%' }}
                                                        className="btn btn-primary rounded-pill d-flex justify-content-center align-items-center py-2"
                                                        onClick={() => add_to_cart(data, false)}

                                                    >
                                                        Add to Cart
                                                    </button>
                                                </div>
                                            </div>

                                            // )

                                        ))}

                                </div>
                                {maxPage>1 &&
                                    <div style={{
                                        display:'flex',
                                        alignItems:'center',
                                        textAlign:'center',
                                        justifyContent:'center'
                                    }}
                                    className="mb-2"
                                    >
                                        <button type="button" style={{ width: '15%' }}
                                            className="btn btn-outline-dark rounded-pill d-flex justify-content-center align-items-center py-2"
                                            onClick={() => prev_page()}
                                            disabled={false}
                                        >
                                            Previous
                                        </button>
                                        <button type="button" style={{ width: '15%' }}
                                            className="btn btn-outline-dark rounded-pill d-flex justify-content-center align-items-center py-2 mx-2"
                                            onClick={() => next_page()}
                                            disabled={false}
                                        >
                                            Next
                                        </button>
                                    </div>
                                }

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