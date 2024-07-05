import React, { useEffect, useState, } from "react";
import { Link, useNavigate } from "react-router-dom";
import menu from '../Assets/Images/menu.png';

const ProfileTab = () => {
    const navigate = useNavigate();
    const [order, SetOrder] = useState(false)
    const [bookshelf, SetBookshelf] = useState(false)
    const [profiledet, SetProfiledet] = useState(false)
    const [myProfile, SetMyProfile] = useState(false)
    const [myAddresses, SetMyAddresses] = useState(false)
    const [myCart, SetMyCart] = useState(false)
    const [changePassword, SetChangePassword] = useState(false)
    const [drawerStat, setDrawerStat] = useState(false)

    useEffect(() =>{
        SetBookshelf(true)
    },[])

    const openDrawer = () => {
        setDrawerStat(!drawerStat)
    }   

    const mybookshelf = (type) => {
        if (type === "mybookshelf") {
            
            SetBookshelf(true)
            SetOrder(false)
            SetProfiledet(false)
            SetMyProfile(false)
            SetChangePassword(false)
            SetMyCart(false)
            SetMyAddresses(false)
            
            console.log("type",type)
           
        }
        else if (type === "myorder") {
            console.log("type",type)
            SetOrder(true)
            SetBookshelf(false)
            SetProfiledet(false)
            SetMyProfile(false)
            SetChangePassword(false)
            SetMyCart(false)
            SetMyAddresses(false)
            
        }
        else if (type === "myprofile") {
            console.log("myprofile")
            SetOrder(false)
            SetBookshelf(false)
            SetProfiledet(false)
            SetMyProfile(true)
            SetChangePassword(false)
            SetMyCart(false)
            SetMyAddresses(false)
        }
        else if (type === "changePassword") {
            console.log("changePassword")
            SetOrder(false)
            SetBookshelf(false)
            SetProfiledet(false)
            SetMyProfile(false)
            SetChangePassword(true)
            SetMyCart(true)
            SetMyAddresses(false)
        }
        else if(type === "wishlist") {
            SetProfiledet(true)
            SetBookshelf(false)
            SetOrder(false)
            SetMyProfile(false)
            SetChangePassword(false)
            SetMyCart(false)  
            SetMyAddresses(false)
        }
        else if(type === "cartpage") {
            SetMyCart(true)  
            SetProfiledet(false)
            SetBookshelf(false)
            SetOrder(false)
            SetMyProfile(false)
            SetChangePassword(false)
            SetMyAddresses(false)
        }
        else if(type === "cartpage") {
            SetMyCart(false)  
            SetProfiledet(false)
            SetBookshelf(false)
            SetOrder(false)
            SetMyProfile(false)
            SetChangePassword(false)
            SetMyAddresses(true)
        }

    }

    return (
        <>
            <div className="mobile_menu_display_pub" onClick={openDrawer}>
                <img src={menu} alt="mobile menu button" style={{marginLeft: '10px'}} />
            </div>
            {
                drawerStat == true && (
                    <nav className="navbar navbar-expand-lg top-nav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-3">
                            {/* <li className="nav-item">
                                <Link to= "/mybookshelf" className="nav-link" role="button" aria-expanded="false">My Bookshelf</Link>
                            </li> */}
                            <li className="nav-item">
                                <Link to="/orderpage" className="nav-link" role="button" aria-expanded="false" >My Orders</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/wishlist" className="nav-link" role="button" aria-expanded="false">My Wishlist</Link>
                            </li>
                            <div className="nav-item">
                                <Link to="/cartpage" className="nav-link" role="button" aria-expanded="false">My Cart</Link>
                            </div>
                            <li className="nav-item">
                                <Link to="/myprofile" className="nav-link" role="button" aria-expanded="false">My Profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/shipping" className="nav-link" role="button" aria-expanded="false">Shipping Addresses</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/changePassword" className="nav-link" role="button" aria-expanded="false">Change  Password</Link>
                            </li>
                        </ul>
                    </nav >
                )
            }
            {
                drawerStat == false && (
                    <div className="profile-tab-nav profile_tab_bar_menu">
                        <div className="container d-flex justify-content-start align-items-center">
                            {/* <div className={"profile-item " + (bookshelf === true ? "" : '')} onClick={()=>mybookshelf("mybookshelf")}>
                                <Link to= "/mybookshelf" className="nav-link" role="button" aria-expanded="false">My Bookshelf {bookshelf}</Link>
                            </div> */}
                            <div className={"profile-item " + (order === true ? "active" : '')} onClick={()=>mybookshelf("myorder")}>
                                <Link to="/orderpage" className="nav-link" role="button" aria-expanded="false" >My Orders {order}</Link>
                            </div>
                            <div className={"profile-item " + (profiledet === true ? "active" : '')} onClick={()=>mybookshelf("wishlist")}>
                                <Link to="/wishlist" className="nav-link" role="button" aria-expanded="false">My Wishlist</Link>
                            </div>
                            <div className={"profile-item " + (profiledet === true ? "active" : '')} onClick={()=>mybookshelf("cartpage")}>
                                <Link to="/cartpage" className="nav-link" role="button" aria-expanded="false">My Cart</Link>
                            </div>
                            <div className={"profile-item " + (myProfile === true ? "active" : '')} onClick={()=>mybookshelf("myprofile")}>
                                <Link to="/myprofile" className="nav-link" role="button" aria-expanded="false">My Profile</Link>
                            </div>
                            <div className={"profile-item " + (myAddresses === true ? "active" : '')} onClick={()=>mybookshelf("myAddresses")}>
                                <Link to="/shipping" className="nav-link" role="button" aria-expanded="false">Shipping Addresses</Link>
                            </div>
                            <div className={"profile-item " + (changePassword === true ? "active" : '')} onClick={()=>mybookshelf("changePassword")}>
                                <Link to="/changePassword" className="nav-link" role="button" aria-expanded="false">Change  Password</Link>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default ProfileTab;