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
    const {  allPublisher, getManageOrder,distributorList } = AdminProfile();
    const [allOrders, setAllOrders] = useState([])
    useEffect(()=>{
        all_order()
    },[])

    const all_order = async () => {
        let currPage = 1
        let recPerPage = 10
        const resp = await getManageOrder(currPage, recPerPage)
        // console.log("all_order_resp_in_if ",resp)

        if (resp === undefined || resp === null) {
            setAllOrders([])
        }
        else {

            console.log("all_order_resp ", resp)
            if (resp.data.statuscode === "0" && resp.data.output.orders?.length > 0) {
                setAllOrders(resp.data.output.orders)
               // console.log("all_order_resp_obtained ", resp.data.output.orders)
            }
            
        }

    }


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
                                    Publisher Wise Sales
                                </h5>
                                <select className="form-select my-3"
                                        style={{ width: "100%" }}
                                    >
                                        <option disabled selected>Please select</option>
                                        {
                                                allPublisher.map((data, index) => (

                                                    <option value={data.id} key={index}>{data.name}</option>

                                                ))
                                            }

                                    </select>
                                <div className="row my-4" >

                                    <div className="col-md-6 border-end border-secondary "  >

                                        
                                          <div className="title">
                                            Last Month Sales
                                          </div>
                                          <div className="number">
                                            20
                                          </div>
                                    </div>
                                    <div className="col-md-6  " >
                                    <div className="title">
                                            Last Year Sales
                                          </div>
                                          <div className="number">
                                            50
                                          </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card bg-white" style={{ borderRadius: "1rem" }}>
                            <div className="card-body p-3">
                                <h5 className="card-title">
                                    Customer Wise Sales
                                </h5>
                                <select className="form-select my-3"
                                        style={{ width: "100%" }}
                                    >
                                        <option disabled selected>Please select</option>
                                        {
                                                allOrders.map((data, index) => (

                                                    <option value={data.id} key={index}>{data.customer}</option>

                                                ))
                                            }

                                    </select>
                                <div className="row my-4" >

                                    <div className="col-md-6 border-end border-secondary "  >

                                        
                                          <div className="title">
                                            Last Month Sales
                                          </div>
                                          <div className="number">
                                            20
                                          </div>
                                    </div>
                                    <div className="col-md-6  " >
                                    <div className="title">
                                            Last Year Sales
                                          </div>
                                          <div className="number">
                                            50
                                          </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card bg-white" style={{ borderRadius: "1rem" }}>
                            <div className="card-body p-3">
                                <h5 className="card-title">
                                    Distributor Wise Sales
                                </h5>
                                <select className="form-select my-3"
                                        style={{ width: "100%" }}
                                    >
                                        
                                        <option disabled selected>Please select</option>
                                        {
                                                distributorList.map((data, index) => (

                                                    <option value={data.id} key={index}>{data.name}</option>

                                                ))
                                            }

                                    </select>
                                <div className="row my-4" >

                                    <div className="col-md-6 border-end border-secondary "  >

                                        
                                          <div className="title">
                                            Last Month Sales
                                          </div>
                                          <div className="number">
                                            20
                                          </div>
                                    </div>
                                    <div className="col-md-6  " >
                                    <div className="title">
                                            Last Year Sales
                                          </div>
                                          <div className="number">
                                            50
                                          </div>
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