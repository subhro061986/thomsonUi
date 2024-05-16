import React, { useEffect, useState, } from "react";
// import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

import dashboardIcon from '../assets/icons/applications.svg';
import orderIcon from '../assets/icons/cart.svg';
import bookIcon from '../assets/icons/book.svg';
import contentIcon from '../assets/icons/notes.svg';
import categoryIcon from '../assets/icons/align-left.svg';
import userIcon from '../assets/icons/user.svg';
import logoIcon from '../logo.svg';

import SVG from "react-inlinesvg";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Menu = () => {
  const { authUsername } = useAuth();

  useEffect(() => {
    console.log("username : ", authUsername);
  }, [authUsername])

  // console.log("username : ", username);
  return (
    <div className="sidebar sidebar-dark sidebar-fixed" id="sidebar">
      <div className="sidebar-brand d-none d-md-flex">
        <SVG src={logoIcon} style={{ fill: '#fff', marginRight: 10 }} width={20} />SOUTHSHORE ADMIN
      </div>
      {/* Check the username / user type */}
      {authUsername === 'admin' ? (
        // Super admin menu
        <ul className="sidebar-nav" data-coreui="navigation" data-simplebar="">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              <SVG src={dashboardIcon} style={{ fill: '#fff', marginRight: 10 }} width={20} />
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/managecategories">
              <SVG src={userIcon} style={{ fill: '#fff', marginRight: 10 }} width={20} />
              Manage Categories
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/managepublishers">
              <SVG src={userIcon} style={{ fill: '#fff', marginRight: 10 }} width={20} />
              Manage Publishers
            </Link>
          </li>
          <li className="nav-item disabled">
            <Link className="nav-link" data-bs-toggle="collapse" to="/gallery">
              <SVG src={categoryIcon} style={{ fill: '#fff', marginRight: 10 }} width={20} />
              Manage Books
            </Link>
           
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/manageusers">
              <SVG src={bookIcon} style={{ fill: '#fff', marginRight: 10 }} width={20} />
              Manage Users
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/manageorder">
              <SVG src={orderIcon} style={{ fill: '#fff', marginRight: 10 }} width={20} />
              Manage Order
            </Link>
          </li>
        </ul>
        // <Sidebar>
        //         <Menu>
        //             <MenuItem className="nest_sidebar">
        //                 <Link className="nav-link" to="/dashboard">
        //                     <SVG src={dashboardIcon} style={{ fill: '#fff', marginRight: 10 }} width={20} />
        //                     Dashboard
        //                 </Link>
        //             </MenuItem>
        //             <MenuItem className="nest_sidebar">
        //                 <Link className="nav-link" to="/managecategories">
        //                     <SVG src={userIcon} style={{ fill: '#fff', marginRight: 10 }} width={20} />
        //                     Manage Categories
        //                 </Link>
        //             </MenuItem>
        //             <MenuItem className="nest_sidebar">
        //                 <Link className="nav-link" to="/managepublishers">
        //                     <SVG src={userIcon} style={{ fill: '#fff', marginRight: 10 }} width={20} />
        //                     Manage Publishers
        //                 </Link>
        //             </MenuItem>
        //             <SubMenu label="Manage Books" className="nest_sidebar"
        //                 icon={<SVG src={categoryIcon} style={{ fill: '#fff', marginRight: 10 }} width={20} />}>
        //                 <MenuItem className="nest_sidebar"> Book Approval </MenuItem>
        //                 <MenuItem className="nest_sidebar"> Book List </MenuItem>
        //                 <MenuItem className="nest_sidebar">
        //                     <Link className="nav-link" to="/uploadbooks">
        //                         Upload Books
        //                     </Link>
        //                 </MenuItem>
        //             </SubMenu>
        //             <MenuItem className="nest_sidebar">
        //                 <Link className="nav-link" to="/manageusers">
        //                     <SVG src={bookIcon} style={{ fill: '#fff', marginRight: 10 }} width={20} />
        //                     Manage Users
        //                 </Link>
        //             </MenuItem>
        //             <MenuItem className="nest_sidebar">
        //                 <Link className="nav-link" to="/manageorder">
        //                     <SVG src={orderIcon} style={{ fill: '#fff', marginRight: 10 }} width={20} />
        //                     Manage Orders
        //                 </Link>
        //             </MenuItem>
        //         </Menu>
        //     </Sidebar>
      ) : (
        // Publisher menu
        <ul className="sidebar-nav" data-coreui="navigation" data-simplebar="">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              <SVG src={dashboardIcon} style={{ fill: '#fff', marginRight: 10 }} width={20} />
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/gallery">
              <SVG src={orderIcon} style={{ fill: '#fff', marginRight: 10 }} width={20} />
              Manage Orders
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/gallery">
              <SVG src={bookIcon} style={{ fill: '#fff', marginRight: 10 }} width={20} />
              Manage Books
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/gallery">
              <SVG src={contentIcon} style={{ fill: '#fff', marginRight: 10 }} width={20} />
              Manage Content
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/gallery">
              <SVG src={userIcon} style={{ fill: '#fff', marginRight: 10 }} width={20} />
              My Profile
            </Link>
          </li>
        </ul>
      )
      }
    </div>

  );
}

export default Menu;
