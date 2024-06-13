import React, { useEffect, useState, } from "react";
import facebook from "../Assets/Images/fb-rounded.png";
import instagram from "../Assets/Images/ig-rounded.png";
import youtube from "../Assets/Images/yt-rounded.png";
import startupindia from "../Assets/Images/startup-india.png";
import menu from '../Assets/Images/menu.png';
import { Link, useNavigate } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import { HashLink } from 'react-router-hash-link';
import { UserProfile } from "../Context/Usercontext"
import { useAuth } from '../Context/Authcontext';

const NavBarSouthsore = () => {
    const navigate = useNavigate();
    const { category_by_publisher, items, allActivePublisher, allCategoryList } = UserProfile()
    const { wishlistshow } = useAuth()
    const [drawerStat, setDrawerStat] = useState(false)
    // const [submneuDrawer, setsubmneuDrawer] = useState(false)
    const [pubcat, setPubcat] = useState([])
    const [cartno, setCartno] = useState()


    useEffect(() => {
        console.log("Hello Wish list", wishlistshow)
        console.log("allActivePublisher", allActivePublisher)
    }, [wishlistshow])

    // const gotoWishlist = () => {
    //     if (wishlistshow === true){
    //         navigate('/wishlist')
    //     }
    //     else{
    //         navigate('/login')
    //     }

    // }

    // const goToCart = ()=>{
    //     navigate('/cartpage');
    // }

    const openDrawer = () => {
        setDrawerStat(!drawerStat)
    }

    // const openSubMenu = () => {
    //     setsubmneuDrawer(!submneuDrawer)
    // }

    const get_pub_data = (e) => {
        let pub_id = e.target.value
        navigate('/home',
            { state: { publisher_id: pub_id } }
        )
    }

    const get_pub_data_mobile = (pub_id) => {
        console.log('get_pub_data pu i d passed : ', pub_id)
        navigate('/home',
            { state: { publisher_id: pub_id } }
        )
    }

    useEffect(() => {
        //book_category_by_publisher(1)

    }, [items])

    const gotoAbout = () => {
        console.log('About e book');
        // window.scrollTo(0, 260)
    }
    const gotoFet = () => {
        console.log('Feature');
        // window.scrollTo(0, 1350)
    }

    const gotoCert = () => {
        console.log('About South shore');
        // window.scrollTo(0, 2850)
    }

    const cat_dropdown_nav = (e) => {
        let cat_id = e.target.value
        console.log('cat_id from nav select', cat_id)
        navigate('/category',
            { state: { category_id: cat_id } }
        )
    }




    return (
        <>
            <div className="mobile_menu_display" onClick={openDrawer}>
                <img src={menu} alt="mobile menu button" />
            </div>
            {
                drawerStat == true && (
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <HashLink smooth className="nav-link" to='/#head_banner' > Home </HashLink>
                        </li>
                        {/* <li className="nav-item" onClick={gotoAbout}>
                            <HashLink smooth className="nav-link" to='/#about_ebook' > About E-booksjunction </HashLink>
                        </li> */}
                        {/* <li className="nav-item" onClick={gotoFet}>
                            <HashLink smooth className="nav-link" to='/#features' > Features </HashLink>
                        </li> */}

                        <li className="nav-item dropdown" style={{ height: '52px' }}>
                            {/* <select className="cat_dropdown mt-3 me-3"
                                style={{ height: 'auto' }}
                                name="cars" id="cars"
                                onChange={(e) => { get_pub_data(e) }}
                            >
                                <option defaultValue={"0"} disabled selected={true}>Publisher</option>
                                {allActivePublisher.map((data, index) => (
                                    data.isactive === 1 &&
                                    <option className="publisher_nav_list" key={index} value={data.id}>{data.name}</option>
                                ))}
                            </select> */}
                            <Accordion>
                                <Accordion.Item eventKey="0" className="accordian_item">
                                    <Accordion.Header>Publisher</Accordion.Header>
                                    {
                                        allActivePublisher.map(
                                            (data, index) => (
                                                data.isactive === 1 &&
                                                <Accordion.Body key={index} value={data.id}
                                                    onClick={() => get_pub_data_mobile(data.id)}>
                                                    {data.name}
                                                </Accordion.Body>
                                            )
                                        )
                                    }
                                </Accordion.Item>
                            </Accordion>
                        </li>

                        <li className="nav-item" onClick={gotoCert}>
                            <HashLink smooth className="nav-link" to='/#about_ss' > About Us </HashLink>
                        </li>

                        {/* <li className="nav-item">
                            <HashLink smooth className="nav-link" to='/#contact' > Contact Us </HashLink>
                        </li> */}
                    </ul>
                )
            }
            {
                drawerStat == false && (
                    <nav className="navbar navbar-expand-lg top-nav nav_padding_y">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 bar_menu">
                            <li className="nav-item">
                                <HashLink smooth className="nav-link" to='/#head_banner' > Home </HashLink>
                                {/* <Link to="/" className="nav-link" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Home
                                </Link> */}
                            </li>
                            {/* <li className="nav-item" onClick={gotoAbout}>
                                <HashLink smooth className="nav-link" to='/#about_ebook' > About E-booksjunction </HashLink>
                                
                            </li> */}
                            {/* <li className="nav-item" onClick={gotoFet}>
                                <HashLink smooth className="nav-link" to='/#features' > Features </HashLink>
                                
                            </li> */}

                            <li className="nav-item dropdown">
                                <select className="cat_dropdown mt-3 me-3"
                                    name="cars" id="cars" onChange={(e) => { get_pub_data(e) }}>
                                    <option defaultValue={"0"} disabled selected={true}>Publisher</option>

                                    {allActivePublisher.map((data, index) => (
                                        data.isactive === 1 &&
                                        <option style={{ backgroundColor: "#E4E8F3" }} key={index} value={data.id}>{data.name}</option>

                                    ))}

                                </select>
                            </li>

                            <li className="nav-item dropdown">
                                <select className="cat_dropdown mt-3 me-3"
                                    style={{width:'121px'}}
                                    name="cars" id="cars"
                                    onChange={(e) => { cat_dropdown_nav(e) }}
                                >
                                    <option defaultValue={"0"} disabled selected={true}>Practice Area</option>

                                    {allCategoryList.map((data, index) => (
                                        data.isactive === 1 && (

                                        <option style={{ backgroundColor: "#E4E8F3" }} key={index} value={data.id}>{data.name}</option>

                                    )
                                    ))}

                                </select>
                            </li>

                            <li className="nav-item" onClick={gotoCert}>
                                <HashLink smooth className="nav-link" to='/#about_ss' > About Us </HashLink>
                                {/* <Link to="/" className="nav-link" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    About Southshore
                                </Link> */}
                            </li>

                            {/* <li className="nav-item">
                                <HashLink smooth className="nav-link" to='/#contact' > Contact Us </HashLink>
                                
                            </li> */}
                        </ul>
                        {/* <ul className="navbar-nav right-nav mb-2 mb-lg-0 social-icons-menu">
                            <div className="left">
                                <li>
                                    <button className="btn">
                                        <img src={facebook} />
                                    </button>
                                </li>
                                <li>
                                    <button className="btn"><img src={instagram} /></button>
                                </li>
                                <li>
                                    <button className="btn" style={{ marginLeft: '5px' }}>
                                        <img src={youtube} />
                                    </button>
                                </li>
                            </div>
                            <div className="right">
                                <li className="d-flex justify-content-end align-items-center"><img src={startupindia} alt="Start up India logo" /></li>
                            </div>
                        </ul> */}
                    </nav >
                )
            }
        </>
    );
}

export default NavBarSouthsore;