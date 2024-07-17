import React, { useEffect, useState, } from "react";
import facebook from "../Assets/Images/fb-rounded.png";
import instagram from "../Assets/Images/ig-rounded.png";
import youtube from "../Assets/Images/yt-rounded.png";
import startupindia from "../Assets/Images/startup-india.png";
import heart from "../Assets/Images/heart.png";
import shopping_cart from "../Assets/Images/shopping-cart.png";
import menu from '../Assets/Images/menu.png';
import { Link, useNavigate } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import { HashLink } from 'react-router-hash-link';
import { UserProfile } from "../Context/Usercontext"
import { useAuth } from '../Context/Authcontext';

const NavBarSouthsore = () => {
    const navigate = useNavigate();
    const { category_by_publisher, items, allActivePublisher, allCategoryList } = UserProfile()
    const { wishlistshow,cartCount } = useAuth()
    const [drawerStat, setDrawerStat] = useState(false)
    // const [submneuDrawer, setsubmneuDrawer] = useState(false)
    const [pubcat, setPubcat] = useState([])
    const [cartno, setCartno] = useState()


    useEffect(() => {
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
        console.log("pub_id", pub_id)
        navigate('/category',
            { state: { publisher_id: pub_id } }
        )
    }

    const get_pub_data_mobile = (cat_id) => {
        console.log('get_pub_data pu i d passed : ', cat_id)
        navigate('/category',
            { state: { category_id: cat_id } }
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
        // console.log('About South shore');
        // window.scrollTo(0, 2850)
    }

    const cat_dropdown_nav = (e) => {
        let cat_id = e.target.value
        // console.log('cat_id from nav select', cat_id)
        navigate('/category',
            { state: { category_id: cat_id } }
        )
    }


    const gotoWishlist = () => {
        if (wishlistshow === true) {
            navigate('/wishlist')
        }
        else {
            navigate('/login')
        }

    }

    const goToCart = () => {
        navigate('/cartpage');
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

                        <li className="nav-item dropdown" style={{ height: '52px' }}>
                            <Accordion>
                                <Accordion.Item eventKey="0" className="accordian_item">
                                    <Accordion.Header>Practice Area</Accordion.Header>
                                    {
                                        allCategoryList.map(
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

                        <li className="nav-item" 
                        // onClick={gotoCert}
                        >
                            <HashLink smooth className="nav-link" to='/#about_ss' > About Southshore </HashLink>
                        </li>
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

                            

                            <li className="nav-item dropdown">
                                <select className="cat_dropdown mt-3 me-3"
                                    style={{width:'121px'}}
                                    name="cars" id="cars"
                                    onChange={(e) => { cat_dropdown_nav(e) }}
                                    defaultValue={0}
                                >
                                    <option value={"0"} disabled >Practice Area</option>

                                    {allCategoryList.map((data, index) => (
                                        data.isactive === 1 && (

                                        <option style={{ backgroundColor: "#E4E8F3" }} key={index} value={data.id}>{data.name}</option>

                                    )
                                    ))}

                                </select>
                            </li>

                            <li className="nav-item" 
                            // onClick={gotoCert}
                            >
                                <HashLink smooth className="nav-link" to='/#about_ss' > About Southshore </HashLink>
                                {/* <Link to="/" className="nav-link" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    About Southshore
                                </Link> */}
                            </li>

                            {/* <li className="nav-item">
                                <HashLink smooth className="nav-link" to='/#contact' > Contact Us </HashLink>
                                
                            </li> */}
                        </ul>
                        <ul className="navbar-nav right-nav mt-2 mb-2 mb-lg-0 wishlist_cart_icons">
                            <li className="borders"><button className="btn btn-circle" onClick={gotoWishlist}><img src={heart} /></button></li>
                            <li className="pos_rel">
                                <button className="btn btn-circle" onClick={goToCart}>
                                    <img src={shopping_cart} />
                                </button>
                                {/* <span className="badge rounded-pill text-bg-danger">{cartno}</span> */}
                                <span className="badge rounded-pill text-bg-danger">{cartCount}</span>
                            </li>
                        </ul>
                    </nav >
                )
            }
        </>
    );
}

export default NavBarSouthsore;