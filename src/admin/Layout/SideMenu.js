import React, { useEffect, useState, } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

import dashboardIcon from '../assets/icons/applications.svg';
import orderIcon from '../assets/icons/cart.svg';
import bookIcon from '../assets/icons/book.svg';
import contentIcon from '../assets/icons/notes.svg';
import categoryIcon from '../assets/icons/align-left.svg';
import userIcon from '../assets/icons/user.svg';
import shippingIcon from '../assets/icons/truck.svg';
import ordersIcon from '../assets/icons/order.svg';
import noImg from '../assets/img/no-img.png';
import usersIcon from '../assets/icons/users.svg';
import settingsIcon from '../assets/icons/settings.svg';
import couponsIcon from '../assets/icons/coupon.svg';
// import logoIcon from '../assets/icons/logoo.svg';
import logoIcon from '../assets/icons/book_central_logo.svg';
import { jwtDecode } from "jwt-decode";

import SVG from "react-inlinesvg";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { AdminProfile } from "../Context/AdminContext";
import Config from "../Config/Config.json";

const TestMenu = () => {
    const { authData, authDeatils } = useAuth();

    const [imageurl, setImageUrl] = useState('')
    const [image, setImage] = useState(null)

    const { get_pub_details, pubInfoImg } = AdminProfile();
    // const [userTokenDecoded, setUserTokenDecoded] = useState('');
    useEffect(() => {
        // console.log("authDeatils : ", authDeatils);
        // setUserTokenDecoded(jwtDecode(authData));
        // console.log("userTokenDecoded : ", userTokenDecoded);
        get_pub_info(authDeatils.pub_id)
    }, [authData, authDeatils])

    useEffect(() => {
        
    }, [authDeatils])

    

    const get_pub_info = async (id) => {
        // console.log("pub_info_id", id);
        // if id = 0 then its not a publisher
        if(id > 0) {
            const resp = await get_pub_details(id)
            // console.log("pub_info_sidemenu ", resp)
            if(resp.data.output !== undefined || resp.data.output !== null) {
                setImage(resp.data.output.logo);
            }
            setImageUrl(Config.API_URL + Config.PUB_IMAGES + resp.data.output.id + "/" + resp.data.output.logo + '?d=' + new Date())
        }    
    }

    // console.log("username : ", username);
    return (
        <div className="sidebar sidebar-dark sidebar-fixed" id="sidebar">
            <div className="sidebar-brand d-none bg-light d-md-flex">

                {/* {authDeatils.role === 'South Shore Admin' ?  */}
                <SVG src={logoIcon} style={{ fill: '#fff', margin: 10 }} /> 
                {/* : (<img src={image === null ? noImg : imageurl} style={{width:'50%'}} alt="publisher logo" />)} */}
            </div>
            {/* Check the username / user type */}
            {/* {authDeatils.role === 'South Shore Admin' ? ( */}
                {/* Super admin menu */}
                <Sidebar>
                    <Menu>
                        {/* <MenuItem className="nest_sidebar">
                            <Link className="nav-link" to="/dashboard">
                                <SVG src={dashboardIcon} style={{ fill: '#fff', marginRight: 10 }} width={20} />
                                Dashboard
                            </Link>
                        </MenuItem> */}
                        <MenuItem className="nest_sidebar">
                            <Link className="nav-link" to="/admin/managecategories">
                                <SVG src={categoryIcon} style={{ fill: '#fff', marginRight: 10 }} width={20} />
                                Manage Categories
                            </Link>
                        </MenuItem>
                        <MenuItem className="nest_sidebar">
                            <Link className="nav-link" to="/admin/managepublishers">
                                <SVG src={userIcon} style={{ fill: '#fff', marginRight: 10 }} width={20} />
                                Manage Publishers
                            </Link>
                        </MenuItem>
                        <SubMenu label="Manage Books" className="nest_sidebar"
                            icon={<SVG src={bookIcon} style={{ fill: '#fff', marginRight: 10 }} width={20} />}>
                            <MenuItem className="nest_sidebar">
                                <Link className="nav-link" to="/admin/bookapprovals">
                                    Book List
                                </Link>
                            </MenuItem>
                            
                            <MenuItem className="nest_sidebar">
                                <Link className="nav-link" to="/admin/uploadbooks">
                                    Upload Books
                                </Link>
                            </MenuItem>
                        </SubMenu>
                        <MenuItem className="nest_sidebar">
                            <Link className="nav-link" 
                            to="/admin/managedistributor"
                            >
                                <SVG src={userIcon} style={{ fill: '#fff', marginRight: 10 }} width={20} />
                                Manage Distributor
                            </Link>
                        </MenuItem>
                        <MenuItem className="nest_sidebar">
                            <Link className="nav-link" 
                            to="/admin/manageshippers"
                            >
                                <SVG src={shippingIcon} style={{ fill: '#fff', marginRight: 10 }} width={20} />
                                Manage Shipper
                            </Link>
                        </MenuItem>
                        <MenuItem className="nest_sidebar">
                            <Link className="nav-link" 
                            to="/admin/manageorder"
                            >
                                <SVG src={ordersIcon} style={{ fill: '#fff', marginRight: 10 }} width={20} />
                                Manage Customer Orders
                            </Link>
                        </MenuItem>
                        <MenuItem className="nest_sidebar">
                            <Link className="nav-link" 
                            to="/admin/manage-distributor-order"
                            >
                                <SVG src={ordersIcon} style={{ fill: '#fff', marginRight: 10 }} width={20} />
                                Manage Distributor Orders
                            </Link>
                        </MenuItem>
                        {/* <MenuItem className="nest_sidebar">
                            <Link className="nav-link" to="/admin/manageusers">
                                <SVG src={userIcon} style={{ fill: '#fff', marginRight: 10 }} width={20} />
                                Manage Customer
                            </Link>
                        </MenuItem> */}
                        {/* <MenuItem className="nest_sidebar">
                            <Link className="nav-link" to="/manageorder">
                                <SVG src={orderIcon} style={{ fill: '#fff', marginRight: 10 }} width={20} />
                                Manage Orders
                            </Link>
                        </MenuItem> */}
                        {/* <SubMenu label="Sales Register" className="nest_sidebar"
                            icon={<SVG src={contentIcon} style={{ fill: '#fff', marginRight: 10 }} width={20} />}>
                            <MenuItem className="nest_sidebar">
                                <Link className="nav-link" to="/admin/customersales">
                                    Customer Invoices
                                </Link>
                            </MenuItem>
                            <MenuItem className="nest_sidebar">
                                <Link className="nav-link" to="/admin/publishersales">
                                    Distributer Invoices
                                </Link>
                            </MenuItem>
                        </SubMenu> */}
                        <MenuItem className="nest_sidebar">
                            <Link className="nav-link" to="/admin/changepassword">
                                <SVG src={settingsIcon} style={{ fill: '#fff', marginRight: 10 }} width={20} />
                                Change Password
                            </Link>
                        </MenuItem>
                    </Menu>
                </Sidebar>
            {/* ) : ( */}
                
            {/* ) */}
            {/* } */}
        </div>

    );
}

export default TestMenu;
