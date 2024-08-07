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
    const {  allPublisher, customer , distributorList, publisherDashboard, customerDashboard, distributorDashboard } = AdminProfile();
    const [allOrders, setAllOrders] = useState([])
    const [selectedPubId, setselectedPubId] = useState(0)
    const [selectedCustId, setselectedCustId] = useState(0)
    const [selectedDistId, setselectedDistId] = useState(0)
    const [publisherMonthlySales, setpublisherMonthlySales] = useState(0)
    const [publisherYearlySales, setpublisherYearlySales] = useState(0)
    const [customerMonthlySales, setcustomerMonthlySales] = useState(0)
    const [customerYearlySales, setcustomerYearlySales] = useState(0)
    const [distributorMonthlySales, setdistributorMonthlySales] = useState(0)
    const [distributorYearlySales, setdistributorYearlySales] = useState(0)
    
    useEffect(()=>{
        pubDashboard()
    },[selectedPubId])
    useEffect(()=>{
        custDashboard()
    },[selectedCustId])
    useEffect(()=>{
        distDashboard()
    },[selectedDistId])

    

    const pub_select = (e) => {
        let pub_id = e.target.value
        console.log('pub_id from nav select', pub_id)
        setselectedPubId(pub_id)
        
    }

    const pubDashboard = async (id) => {
        console.log('pub_id', id)
        let pub_dash_json ={
            id : selectedPubId
        }
        let pubResponse = await publisherDashboard(pub_dash_json)
        console.log("pub_dashboard_resp= ", pubResponse)
        setpublisherMonthlySales(pubResponse.data.output.monthlySale)
        setpublisherYearlySales(pubResponse.data.output.yearlySale)
    }

    const cust_select = (e) => {
        let cust_id = e.target.value
        console.log('pub_id from nav select', cust_id)
        setselectedCustId(cust_id)
        
    }

    const custDashboard = async (id) => {
        console.log('cust_id', id)
        let cust_dash_json ={
            id : selectedCustId
        }
        let custResponse = await customerDashboard(cust_dash_json)
        console.log("pub_dashboard_resp= ", custResponse)
        setcustomerMonthlySales(custResponse.data.output.monthlySale)
        setcustomerYearlySales(custResponse.data.output.yearlySale)
    }

    const dist_select = (e) => {
        let dist_id = e.target.value
        console.log('pub_id from nav select', dist_id)
        setselectedDistId(dist_id)
        
    }

    const distDashboard = async (id) => {
        console.log('dist_id', id)
        let dist_dash_json ={
            id : selectedDistId
        }
        let distResponse = await distributorDashboard(dist_dash_json)
        console.log("pub_dashboard_resp= ", distResponse)
        setdistributorMonthlySales(distResponse.data.output.monthlySale)
        setdistributorYearlySales(distResponse.data.output.yearlySale)
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
                                        onChange={(e) => { pub_select(e) }}
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
                                            {publisherMonthlySales}
                                          </div>
                                    </div>
                                    <div className="col-md-6  " >
                                    <div className="title">
                                            Last Year Sales
                                          </div>
                                          <div className="number">
                                            {publisherYearlySales}
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
                                        onChange={(e) => { cust_select(e) }}
                                    >
                                        <option disabled selected>Please select</option>
                                        {
                                                customer.map((data, index) => (

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
                                            {customerMonthlySales}
                                          </div>
                                    </div>
                                    <div className="col-md-6  " >
                                    <div className="title">
                                            Last Year Sales
                                          </div>
                                          <div className="number">
                                            {customerYearlySales}
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
                                        onChange={(e) => { dist_select(e) }}
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
                                            {distributorMonthlySales}
                                          </div>
                                    </div>
                                    <div className="col-md-6  " >
                                    <div className="title">
                                            Last Year Sales
                                          </div>
                                          <div className="number">
                                            {distributorYearlySales}
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