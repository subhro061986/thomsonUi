import React, { useEffect, useState, } from "react";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Header from "../../Layout/Header";
import SideMenu from "../../Layout/SideMenu";
import { Link } from "react-router-dom";
import SVG from "react-inlinesvg";
import editIcon from '../../assets/icons/editicon.svg';
import trashIcon from '../../assets/icons/deleteicon.svg';
import saveIcon from '../../assets/icons/save.svg';
import { Modal } from "react-bootstrap";
import { AdminProfile } from "../../Context/AdminContext";
import { useAuth } from "../../Context/AuthContext";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {



    return (
        <>
            <SideMenu />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <Header title="Dashboard" />
                {/* <div className="row m-3 bg-white p-2">

                    <div className="col-md-8 book-details p-3" >
                        abcd
                    </div>

                    <div className="col-md-4">
                        abcd
                    </div>
                </div> */}
                <div className="row d-flex justify-content-between m-3  p-2">
                    <div className="col-md-4">
                        <div className="card bg-white" style={{ borderRadius: "1rem" }}>
                            <div className="card-body p-3">
                                <h5 className="card-title">
                                    <select className="form-select mb-3"
                                        style={{ width: "100%" }}
                                    >
                                        <option disabled value={0}>Please select</option>
                                        <option
                                        >Options</option>

                                    </select>
                                </h5>
                                <div className="row mt-2" style={{ marginLeft: "1px", marginRight: "1px" }} >

                                    <div className="col-md-6 border-end border-secondary h100 px-0"  >

                                        <h5
                                            className="card-header"
                                            style={{borderTopRightRadius: 0}}
                                        >Title</h5>
                                        {/* <div >
                                            body
                                        </div> */}
                                    </div>
                                    <div className="col-md-6  h100 px-0" >
                                        <h5
                                            className="card-header"
                                            style={{borderTopLeftRadius: 0}}
                                        >Title</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card bg-white" style={{ borderRadius: "1rem" }}>
                            <div className="card-body p-3">
                                <h5 className="card-title">
                                    <select className="form-select mb-3"
                                        style={{ width: "100%" }}
                                    >
                                        <option disabled value={0}>Please select</option>
                                        <option
                                        >Options</option>

                                    </select>
                                </h5>
                                <div className="row mt-2" style={{ marginLeft: "1px", marginRight: "1px" }} >

                                    <div className="col-md-6 border-end border-secondary h100 px-0"  >

                                        <h5
                                            className="card-header"
                                            style={{borderTopRightRadius: 0}}
                                        >Title</h5>
                                        {/* <div >
                                            body
                                        </div> */}
                                    </div>
                                    <div className="col-md-6  h100 px-0" >
                                        <h5
                                            className="card-header"
                                            style={{borderTopLeftRadius: 0}}
                                        >Title</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card bg-white" style={{ borderRadius: "1rem" }}>
                            <div className="card-body p-3">
                                <h5 className="card-title">
                                    <select className="form-select mb-3"
                                        style={{ width: "100%" }}
                                    >
                                        <option disabled value={0}>Please select</option>
                                        <option
                                        >Options</option>

                                    </select>
                                </h5>
                                <div className="row mt-2" style={{ marginLeft: "1px", marginRight: "1px" }} >

                                    <div className="col-md-6 border-end border-secondary h100 px-0"  >

                                        <h5
                                            className="card-header"
                                            style={{borderTopRightRadius: 0}}
                                        >Title</h5>
                                        {/* <div >
                                            body
                                        </div> */}
                                    </div>
                                    <div className="col-md-6  h100 px-0" >
                                        <h5
                                            className="card-header"
                                            style={{borderTopLeftRadius: 0}}
                                        >Title</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
}

export default Dashboard;