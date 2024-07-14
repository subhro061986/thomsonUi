import React, { useEffect, useState, } from "react";
import Header from "../../Layout/Header";
import SideMenu from "../../Layout/SideMenu";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SVG from "react-inlinesvg";
import eye from '../../assets/icons/eye.svg';
import download from '../../assets/icons/download.svg';
import print from '../../assets/icons/print.svg';

import { AdminProfile } from "../../Context/AdminContext.js";
import { useAuth } from "../../Context/AuthContext";
import noImg from '../../assets/img/no-img.png';

const ViewOrderDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { authData } = useAuth();

    const { get_single_order, orderInfo, shipperInfoList, changeOrderStatus } = AdminProfile();
    const [shipperInfoModal, setShipperInfoModal] = useState(false)
    const [statusInfoModal, setStatusInfoModal] = useState(false)
    const [statusCode, setStatusCode] = useState(0)
    const [awbNo, setAwbNo] = useState('')
    const [shipper, setShipper] = useState('')
    const  statuses  =[
        {"value":1,'label': 'PENDING'},
        {"value":2,'label': 'CANCELLED'},
        {"value":3,'label': 'AWATING SHIPMENT'},
        {"value":4,'label': 'AWATING PICKUP'},
        {"value":5,'label': 'SHIPPED'},
        {"value":6,'label': 'DELIVERED'},
        {"value":7,'label': 'RETURN REQUEST'},
        {"value":8,'label': 'RETURN ACCEPTED'},
        {"value":9,'label': 'REFUND'}
       ]

    useEffect(() => {
        get_order(location.state.orderid)
    }, [location.state.orderid])
  
    useEffect(() => {
        console.log("HEllo ", location.state.orderid)
        console.log("world", orderInfo)
    }, [authData])

    const handleShipper = (e) => {
        setShipper(e.target.value)
    }
    const handleStatusCode = (e) => {
        setStatusCode(e.target.value)
    }
    const handleAwbNo = (e) => {
        setAwbNo(e.target.value)
    }
    const get_order = async (orderid) => {
        let response = await get_single_order(orderid)
        console.log("Order : ", response)

    }

    const openShipper = () => {
        setShipperInfoModal(!shipperInfoModal)
        setStatusInfoModal(false)
    }
    const openStatus = () => {
        setStatusInfoModal(!statusInfoModal)
        setShipperInfoModal(false)
    }

    const updateShippingStatusChange = async () => {

        const json = {
            "awbNo": awbNo,
            "shipperId": shipper,
            "orderid": location.state.orderid
        }
        // let response = await updateChange(location.state.orderid, shipper)
        // console.log("update response ", response)
        // get_order(location.state.orderid)
    }

    const orderStatusChange = async (e) => {
        // e.preventDefault()
        const json = {
            "id": location.state.orderid,
            "statusid": statusCode
        }

        const response = await changeOrderStatus(json)
        if (response.statuscode === "0") {
            alert("Status changed successfully")
            setStatusInfoModal(false)
            setShipperInfoModal(false)
        } else {
            alert("Failed to change status")
        }
    }
    return (
        <>
            <SideMenu />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <Header title="View Order Details" />

                {/* Order Details */}

                <div className="row m-3 bg-white p-2">

                    <div className="col-md-8 book-details p-3" >


                        <h5>Order No : {orderInfo?.orderno}</h5>
                        <p><span className=" badge bg-info my-2 mb-5" style={{ fontSize: '1rem' }}>{orderInfo?.status}</span></p>

                        <div className="d-flex" >
                            <p className=" badge bg-light" style={{ color: 'black', fontSize: '1rem' }}>Order Date : {orderInfo?.orderdate}</p>
                            <p className=" badge bg-light mx-3" style={{ color: 'black', fontSize: '1rem' }}>{orderInfo?.currencysymbol} {orderInfo?.totalamount} </p>

                        </div>

                    </div>

                    <div className="col-md-4">
                        <div className="d-flex mt-3">
                            <button className="btn btn-primary" onClick={openStatus}>Change Status</button>
                            <button className="btn btn-success ms-4" onClick={openShipper}>Create Shipping</button>
                        </div>

                        {shipperInfoModal ? <>
                            <form >
                                <div className="form-group" style={{ width: '100%' }}>
                                    <select id='adminOptions' className="form-select mb-3"
                                        value={shipper}
                                        onChange={handleShipper}
                                    >
                                        <option disabled selected>Please select</option>
                                        {
                                            shipperInfoList.map((data, index) => (
                                                data.isactive === 1 &&
                                                <option key={index} value={data.id}>{data.name}</option>
                                            ))}

                                    </select>
                                    <input type="text" className="form-control mb-3" placeholder="Enter Awb Number" value={awbNo} onChange={handleAwbNo} />
                                    <button className="btn btn-outline-primary" onClick={updateShippingStatusChange}>Save</button>

                                </div>

                            </form>

                        </> : <></>}
                        {statusInfoModal ? <>
                          
                                <div className="form-group" style={{ width: '100%' }}>
                                    <select id='adminOptions' className="form-select mb-3"
                                        value={statusCode}
                                        onChange={handleStatusCode}
                                    >
                                    <option disabled value={0}>Please select</option>

                                        {
                                            statuses.map((data, index) => (
                                                <option key={index} value={data.value}>{data.label}</option>
                                            ))}

                                    </select>
                                    
                                    <button className="btn btn-outline-primary" onClick={orderStatusChange}>Save</button>

                                </div>


                        </> : <></>}
                    </div>
                </div>

                {/* Shipping and Billing Info  */}
                <div className="row m-1">
                    <div className="col-md-4">
                        <div className="card" style={{ minHeight: '300px' }}>

                            <div className="card-body">
                                <h5 className="card-title">Customer Information</h5>
                                <hr></hr>
                                <p><b>Name</b> : {orderInfo?.customer?.name}</p>
                                <p><b>Email</b> : {orderInfo?.customer?.email}</p>
                                <p><b>Phone</b> : {orderInfo?.customer?.contactno}</p>


                            </div>

                        </div>

                    </div>
                    <div className="col-md-4">
                        <div className="card" style={{ minHeight: '300px' }}>

                            <div className="card-body">
                                <h5 className="card-title">Shipping Address</h5>
                                <hr></hr>
                                <p><b>Address</b> : {orderInfo?.shippingaddress?.streetaddress} </p>
                                <p><b>City</b> : {orderInfo?.shippingaddress?.city}  </p>
                                <p><b>Pin code</b> : {orderInfo?.shippingaddress?.pincode} </p>
                                <p><b>State</b> : {orderInfo?.shippingaddress?.state} </p>
                                <p><b>Country</b> : {orderInfo?.shippingaddress?.country} </p>


                            </div>

                        </div>

                    </div>
                    <div className="col-md-4">
                        <div className="card" style={{ minHeight: '300px' }}>

                            <div className="card-body">
                                <h5 className="card-title">Billing Address</h5>
                                <hr></hr>
                                <p><b>Address</b> : {orderInfo?.billingaddress?.streetaddress} </p>
                                <p><b>City</b> : {orderInfo?.billingaddress?.city}  </p>
                                <p><b>Pin code</b> : {orderInfo?.billingaddress?.pincode} </p>
                                <p><b>State</b> : {orderInfo?.billingaddress?.state} </p>
                                <p><b>Country</b> : {orderInfo?.billingaddress?.country} </p>


                            </div>

                        </div>

                    </div>

                </div>

                {/* Order Items */}


                <div className="m-3">
                    <div className="bg-white p-3 rounded-2">

                        <table className="table bg-white">
                            <thead className="text-center">
                                <tr>
                                    <th colSpan={4}>
                                        <h4>Item(s) Ordered</h4>
                                    </th>
                                </tr>
                                <tr>
                                    <th>Book Title</th>
                                    <th>ISBN 13</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">

                                {orderInfo?.orderitems?.map((data, index) => (
                                    <tr className="custom-table-row"
                                        key={index}
                                    >
                                        <td className="all_col">{data.booktitle}</td>
                                        <td className="all_col">{data.isbn13}</td>
                                        <td className="all_col">{data.quantity}</td>
                                        <td className="all_col">{data.price}</td>



                                    </tr>

                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>

            </div>
        </>
    );
}

export default ViewOrderDetails;