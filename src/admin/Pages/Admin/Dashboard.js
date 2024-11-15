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
    const { allPublisher, customer, distributorList, publisherDashboard, customerDashboard, distributorDashboard, pubTitleDashboard,getPublilsherSalesAmtDashboardData } = AdminProfile();
    const [allOrders, setAllOrders] = useState([])
    const [selectedPubIdTitles, setselectedPubIdTitles] = useState(0)
    const [selectedPubIdSales, setselectedPubIdSales] = useState(0)
    const [selectedPubId, setselectedPubId] = useState(0)
    const [selectedCustId, setselectedCustId] = useState(0)
    const [selectedDistId, setselectedDistId] = useState(0)
    const [publisherDailySales, setpublisherDailySales] = useState(0)
    const [publisherWeeklySales, setpublisherWeeklySales] = useState(0)
    const [publisherMonthlySales, setpublisherMonthlySales] = useState(0)
    const [publisherYearlySales, setpublisherYearlySales] = useState(0)
    const [customerDailySales, setcustomerDailySales] = useState(0)
    const [customerWeeklySales, setcustomerWeeklySales] = useState(0)
    const [customerMonthlySales, setcustomerMonthlySales] = useState(0)
    const [customerYearlySales, setcustomerYearlySales] = useState(0)
    const [distributorDailySales, setdistributorDailySales] = useState(0)
    const [distributorWeeklySales, setdistributorWeeklySales] = useState(0)
    const [distributorMonthlySales, setdistributorMonthlySales] = useState(0)
    const [distributorYearlySales, setdistributorYearlySales] = useState(0)
    const [monthlyPublisherSales,setMonthlyPublisherSales]=useState(0)
    const [monthlyPublisherSalesCurrency,setMonthlyPublisherSalesCurrency]=useState("")
    const [yearlyPublisherSales,setYearlyPublisherSales]=useState(0)
    const [yearlyPublisherSalesCurrency,setYearlyPublisherSalesCurrency]=useState("")
    const [activeMonthBtnPublisher,setActiveMonthBtnPublisher]=useState(true)
    const [activeWeekBtnPublisher,setActiveWeekBtnPublisher]=useState(false)
    const [activeDayBtnPublisher,setActiveDayBtnPublisher]=useState(false)
    const [salesTitlePublisher,setSalesTitlePublisher]=useState("Month")
    const [salesValuePublisher,setSalesValuePublisher]=useState(0)
    const [activeMonthBtnCustomer,setActiveMonthBtnCustomer]=useState(true)
    const [activeWeekBtnCustomer,setActiveWeekBtnCustomer]=useState(false)
    const [activeDayBtnCustomer,setActiveDayBtnCustomer]=useState(false)
    const [salesTitleCustomer,setSalesTitleCustomer]=useState("Month")
    const [salesValueCustomer,setSalesValueCustomer]=useState(0)
    const [activeMonthBtnDistributor,setActiveMonthBtnDistributor]=useState(true)
    const [activeWeekBtnDistributor,setActiveWeekBtnDistributor]=useState(false)
    const [activeDayBtnDistributor,setActiveDayBtnDistributor]=useState(false)
    const [salesTitleDistributor,setSalesTitleDistributor]=useState("Month")
    const [salesValueDistributor,setSalesValueDistributor]=useState(0)

    
    const [pubTitleCount, setPubTitleCount] = useState(0)
    useEffect(() => {
        
    }, [])
    useEffect(() => {
        // pubDashboard()
    }, [selectedPubId])
    useEffect(() => {
        // custDashboard()
    }, [selectedCustId])
    useEffect(() => {
        // distDashboard()
    }, [selectedDistId])



    const pub_select = (e) => {
        let pub_id = e.target.value
        setselectedPubId(pub_id)
        pubDashboard(pub_id)

    }
    const pub_title_select = (e) => {
        let pub_id = e.target.value
        console.log('pub_id from nav select', pub_id)
        setselectedPubIdTitles(pub_id)
        getPubTitleDashboard(pub_id)

    }
    const pub_amt_select = (e) => {
        let pub_id = e.target.value
        console.log('pub_id from nav select', pub_id)
        setselectedPubIdSales(pub_id)
        getPunblisherAmt(pub_id)

    }

     const getPunblisherAmt= async(pub_id) =>{
        const response= await getPublilsherSalesAmtDashboardData(pub_id)
        console.log("response from where=", response)
        if(response.data.statuscode === '0' && response.data.output.monthlySale !== null){
         setMonthlyPublisherSales(response.data.output.monthlySale.total)
         setMonthlyPublisherSalesCurrency(response.data.output.monthlySale.currency)
        }
        else {
            setMonthlyPublisherSales(0)
            setMonthlyPublisherSalesCurrency("")

        }
        if(response.data.statuscode === '0' && response.data.output.monthlySale !== null){
            setYearlyPublisherSales(response.data.output.yearlySale.total)
            setYearlyPublisherSalesCurrency(response.data.output.yearlySale.currency)
        }
        else {
            setYearlyPublisherSales(0)
            setYearlyPublisherSalesCurrency("")
        }
     }

    const getPubTitleDashboard= async (id) => {
        let pubResponse = await pubTitleDashboard(id)
        setPubTitleCount(pubResponse.data.output.publisherTitleCount)

    }

    const pubDashboard = async (pub_id) => {
        let pub_dash_json = {
            id: pub_id
        }
        let pubResponse = await publisherDashboard(pub_dash_json)
        setpublisherDailySales(pubResponse.data.output.dailySale)
        setpublisherWeeklySales(pubResponse.data.output.weeklySale)
        setpublisherMonthlySales(pubResponse.data.output.monthlySale)
        setpublisherYearlySales(pubResponse.data.output.yearlySale)
        setSalesValuePublisher(pubResponse.data.output.monthlySale)

    }

    const cust_select = (e) => {
        let cust_id = e.target.value
        setselectedCustId(cust_id)
        custDashboard(cust_id)

    }

    const custDashboard = async (cust_id) => {
        let cust_dash_json = {
            id: cust_id
        }
        let custResponse = await customerDashboard(cust_dash_json)
        setcustomerDailySales(custResponse.data.output.dailySale)
        setcustomerWeeklySales(custResponse.data.output.weeklySale)
        setcustomerMonthlySales(custResponse.data.output.monthlySale)
        setcustomerYearlySales(custResponse.data.output.yearlySale)
        setSalesValueCustomer(custResponse.data.output.monthlySale)

    }

    const dist_select = (e) => {
        let dist_id = e.target.value
        console.log('pub_id from nav select', dist_id)
        setselectedDistId(dist_id)
        distDashboard(dist_id)

    }

    const distDashboard = async (dist_id) => {
        let dist_dash_json = {
            id: dist_id
        }
        let distResponse = await distributorDashboard(dist_dash_json)
        setdistributorDailySales(distResponse.data.output.dailySale)
        setdistributorWeeklySales(distResponse.data.output.weeklySale)
        setdistributorMonthlySales(distResponse.data.output.monthlySale)
        setdistributorYearlySales(distResponse.data.output.yearlySale)
        setSalesValueDistributor(distResponse.data.output.monthlySale)

    }

    const changeSelectedPublisher= (value) =>{
        setSalesTitlePublisher(value)
        if(value ==="Month"){
            setActiveDayBtnPublisher(false)
            setActiveWeekBtnPublisher(false)
            setActiveMonthBtnPublisher(true)
            setSalesValuePublisher(publisherMonthlySales)

        }
        else if(value ==="Week"){
            setActiveDayBtnPublisher(false)
            setActiveMonthBtnPublisher(false)
            setActiveWeekBtnPublisher(true)
            setSalesValuePublisher(publisherWeeklySales)

        }
        else if(value ==="Day"){
            setActiveDayBtnPublisher(true)
            setActiveWeekBtnPublisher(false)
            setActiveMonthBtnPublisher(false)
            setSalesValuePublisher(publisherDailySales)
            
        }
        else{
            setActiveDayBtnPublisher(false)
            setActiveWeekBtnPublisher(false)
            setActiveMonthBtnPublisher(true)
            setSalesValuePublisher(publisherMonthlySales)

        }
    }

    const changeSelectedCustomer= (value) =>{
        setSalesTitleCustomer(value)
        if(value ==="Month"){
            setActiveDayBtnCustomer(false)
            setActiveWeekBtnCustomer(false)
            setActiveMonthBtnCustomer(true)
            setSalesValueCustomer(customerMonthlySales)

        }
        else if(value ==="Week"){
            setActiveDayBtnCustomer(false)
            setActiveMonthBtnCustomer(false)
            setActiveWeekBtnCustomer(true)
            setSalesValueCustomer(customerWeeklySales)

        }
        else if(value ==="Day"){
            setActiveDayBtnCustomer(true)
            setActiveWeekBtnCustomer(false)
            setActiveMonthBtnCustomer(false)
            setSalesValueCustomer(customerDailySales)
            
        }
        else{
            setActiveDayBtnCustomer(false)
            setActiveWeekBtnCustomer(false)
            setActiveMonthBtnCustomer(true)
            setSalesValueCustomer(customerMonthlySales)

        }
    }
    const changeSelectedDistributor= (value) =>{
        setSalesTitleDistributor(value)
        if(value ==="Month"){
            setActiveDayBtnDistributor(false)
            setActiveWeekBtnDistributor(false)
            setActiveMonthBtnDistributor(true)
            setSalesValueDistributor(distributorMonthlySales)

        }
        else if(value ==="Week"){
            setActiveDayBtnDistributor(false)
            setActiveMonthBtnDistributor(false)
            setActiveWeekBtnDistributor(true)
            setSalesValueDistributor(distributorWeeklySales)

        }
        else if(value ==="Day"){
            setActiveDayBtnDistributor(true)
            setActiveWeekBtnDistributor(false)
            setActiveMonthBtnDistributor(false)
            setSalesValueDistributor(distributorDailySales)
            
        }
        else{
            setActiveDayBtnDistributor(false)
            setActiveWeekBtnDistributor(false)
            setActiveMonthBtnDistributor(true)
            setSalesValueDistributor(distributorMonthlySales)

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
                    <div className="col-md-6">
                        <div className="card bg-white" style={{ borderRadius: "1rem" }}>
                            <div className="card-body p-3">
                                <h5 className="card-title">
                                    Titles By Imprint
                                </h5>
                                <select className="form-select my-3"
                                    style={{ width: "100%" }}
                                    onChange={(e) => { pub_title_select(e) }}
                                    value={selectedPubIdTitles}
                                >
                                    <option disabled value={0}>Please select</option>
                                    {
                                        allPublisher.map((data, index) => (
                                            data.isactive === 1 && (
                                                <option value={data.id} key={index}>{data.name}</option>
                                            )
                                        ))
                                    }

                                </select>
                                <div className="row my-4" >

                                    <div className="col-12 "  >


                                        <div className="title">
                                        Number of titles 
                                        </div>
                                        <div className="number">
                                            {pubTitleCount}
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card bg-white" style={{ borderRadius: "1rem" }}>
                            <div className="card-body p-3">
                                <h5 className="card-title">
                                Total Sales
                                </h5>

                                <select className="form-select my-3"
                                    style={{ width: "100%" }}
                                    onChange={(e) => { pub_amt_select(e) }}
                                    value={selectedPubIdSales}
                                >
                                    <option disabled value={0}>Please select</option>
                                    {
                                        allPublisher.map((data, index) => (
                                            data.isactive === 1 && (
                                                <option value={data.id} key={index}>{data.name}</option>
                                            )
                                        ))
                                    }

                                </select>
                              
                                <div className="row my-4" >

                                    <div className="col-md-6 border-end border-secondary "  >


                                        <div className="title">
                                            Last Month Sales
                                        </div>
                                        <div className="number">
                                           {monthlyPublisherSalesCurrency} {monthlyPublisherSales}
                                        </div>
                                    </div>
                                    <div className="col-md-6  " >
                                        <div className="title">
                                            Last Year Sales
                                        </div>
                                        <div className="number">
                                           {yearlyPublisherSalesCurrency} {yearlyPublisherSales}
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>

                
                <div className="row d-flex justify-content-between m-3  p-2">
                    <div className="col-md-4">
                        <div className="card bg-white" style={{ borderRadius: "1rem" }}>
                            <div className="card-body p-3">
                                <h5 className="card-title">
                                    Sales by publisher
                                </h5>
                                <select className="form-select my-3"
                                    style={{ width: "100%" }}
                                    onChange={(e) => { pub_select(e) }}
                                    value={selectedPubId}
                                >
                                    <option disabled value={0}>Please select</option>
                                    {
                                        allPublisher.map((data, index) => (
                                            data.isactive === 1 && (
                                                <option value={data.id} key={index}>{data.name}</option>
                                            )
                                        ))
                                    }

                                </select>
                                <div className="d-flex justify-content-evenly"  >
                                    <button type="button" className={activeMonthBtnPublisher === true?"btn btn-info": " btn btn-outline-info" } onClick={()=>changeSelectedPublisher("Month")}>
                                        Month
                                    </button>
                                    <button type="button" className={activeWeekBtnPublisher === true?"btn btn-info": " btn btn-outline-info"  } onClick={()=>changeSelectedPublisher("Week")}>
                                            Week
                                    </button>
                                    <button type="button" className={activeDayBtnPublisher === true?"btn btn-info": " btn btn-outline-info"  } onClick={()=>changeSelectedPublisher("Day")}>
                                            Day
                                    </button>
                                </div>
                                <div className="row my-4" >
                                    

                                    <div className="col-md-6 border-end border-secondary "  >


                                        <div className="title">
                                            Last {salesTitlePublisher} Sales
                                        </div>
                                        <div className="number">
                                            {salesValuePublisher}
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
                                    Sales by Customer
                                </h5>
                                <select className="form-select my-3"
                                    style={{ width: "100%" }}
                                    onChange={(e) => { cust_select(e) }}
                                    value={selectedCustId}
                                >
                                    <option disabled value={0}>Please select</option>
                                    {
                                        customer.map((data, index) => (
                                            data.isactive === 1 && (
                                                <option value={data.id} key={index}>{data.name}</option>
                                            )
                                        ))
                                    }

                                </select>
                                <div className="d-flex justify-content-evenly"  >
                                    <button type="button" className={activeMonthBtnCustomer === true?"btn btn-info": " btn btn-outline-info" } onClick={()=>changeSelectedCustomer("Month")}>
                                        Month
                                    </button>
                                    <button type="button" className={activeWeekBtnCustomer === true?"btn btn-info": " btn btn-outline-info"  } onClick={()=>changeSelectedCustomer("Week")}>
                                            Week
                                    </button>
                                    <button type="button" className={activeDayBtnCustomer === true?"btn btn-info": " btn btn-outline-info"  } onClick={()=>changeSelectedCustomer("Day")}>
                                            Day
                                    </button>
                                </div>
                                <div className="row my-4" >

                                    <div className="col-md-6 border-end border-secondary "  >


                                        <div className="title">
                                            Last {salesTitleCustomer} Sales
                                        </div>
                                        <div className="number">
                                            {salesValueCustomer}
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
                                    Sales by distributor
                                </h5>
                                <select className="form-select my-3"
                                    style={{ width: "100%" }}
                                    onChange={(e) => { dist_select(e) }}
                                    value={selectedDistId}
                                >

                                    <option disabled value={0}>Please select</option>
                                    {
                                        distributorList.map((data, index) => (
                                            data.isactive === 1 && (
                                                <option value={data.id} key={index}>{data.name}</option>
                                            )
                                        ))
                                    }

                                </select>
                                <div className="d-flex justify-content-evenly"  >
                                    <button type="button" className={activeMonthBtnDistributor === true?"btn btn-info": " btn btn-outline-info" } onClick={()=>changeSelectedDistributor("Month")}>
                                        Month
                                    </button>
                                    <button type="button" className={activeWeekBtnDistributor === true?"btn btn-info": " btn btn-outline-info"  } onClick={()=>changeSelectedDistributor("Week")}>
                                            Week
                                    </button>
                                    <button type="button" className={activeDayBtnDistributor === true?"btn btn-info": " btn btn-outline-info"  } onClick={()=>changeSelectedDistributor("Day")}>
                                            Day
                                    </button>
                                </div>
                                <div className="row my-4" >

                                    <div className="col-md-6 border-end border-secondary "  >


                                        <div className="title">
                                            Last {salesTitleDistributor} Sales
                                        </div>
                                        <div className="number">
                                            {salesValueDistributor}
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