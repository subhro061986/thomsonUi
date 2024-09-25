import React, { useEffect, useState, } from "react";
import Header from "../../Layout/Header.js";
import SideMenu from "../../Layout/SideMenu.js";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { AdminProfile } from "../../Context/AdminContext.js";
import { useAuth } from "../../Context/AuthContext.js";
import noImg from '../../assets/img/no-img.png';

const ViewDistributorOrderDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { authData } = useAuth();

    const { get_single_distributor_order, distributorOrderInfo, shipperInfoList, changeOrderStatus } = AdminProfile();
    const [shipperInfoModal, setShipperInfoModal] = useState(false)
    const [statusInfoModal, setStatusInfoModal] = useState(false)
    const [statusCode, setStatusCode] = useState(0)
    const [awbNo, setAwbNo] = useState('')
    const [shipper, setShipper] = useState('')
    const statuses = [
        { "value": 1, 'label': 'PENDING' },
        { "value": 2, 'label': 'CANCELLED' },
        { "value": 3, 'label': 'AWATING SHIPMENT' },
        { "value": 4, 'label': 'AWATING PICKUP' },
        { "value": 5, 'label': 'SHIPPED' },
        { "value": 6, 'label': 'DELIVERED' }
    ]

    useEffect(() => {
        get_order(location.state.orderid)
    }, [location.state.orderid])

    useEffect(() => {
        console.log("HEllo ", location.state.orderid)
        console.log("world", distributorOrderInfo)
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
        let response = await get_single_distributor_order(orderid)
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
    const convertToCSV = (objArray) => {
        const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;

        let str = '';
        str += 'General Information, \n'
        str += 'AwbNo,Category,Currency,Orderdate,OrderNo,ShipperName,Status,TotalAmount \n';
        str += `${array.awbno ? array.awbno : 'null'},${array.category},${array.currencyisocode},${array.orderdate},${array.orderno}, ${array.shippername ? array.shippername : 'null'},${array.status},${array.totalamount} \n`;
        str+= '\nDistributor Information, \n'
        str+= 'Name,Email,ContactNo \n'
        str+= `${array.distributor.name},${array.distributor.email},${array.distributor.contactno}\n`
        str+= '\nBilling Address Information, \n'
        str+= 'Address,City,Pin code,State,Country \n'
        str+= `${array.billingaddress.streetaddress},${array.billingaddress.city},${array.billingaddress.pincode},${array.billingaddress.state},${array.billingaddress.country}\n`
        str+= '\nShipping Address Information, \n'
        str+= 'Address,City,Pin code,State,Country \n'
        str+= `${array.shippingaddress.streetaddress},${array.shippingaddress.city},${array.shippingaddress.pincode},${array.shippingaddress.state},${array.shippingaddress.country}\n`
        str+= '\nOrder Items, \n'
        str+= 'Book Title,ISBN13,Quantity,Price\n'
        for(let item of array.orderitems){

            str+= `${item.booktitle},${item.isbn13},${item.quantity},${item.price}\n`
        }
        str+= '\nOrder History, \n'
        str+= 'Status,Status Date,Comment\n'
        for(let hist of array.history){

            str+= `${hist.status},${hist.statusdate},\n`
        }
      
       
        return str;
    };

    const downloadCSVData = (data, fileName) => {
        const csvData = new Blob([convertToCSV(data)], { type: 'text/csv' });
        const csvURL = URL.createObjectURL(csvData);
        const link = document.createElement('a');
        link.href = csvURL;
        link.download = `${fileName}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const downloadCSV = () => {
        downloadCSVData(distributorOrderInfo, distributorOrderInfo.orderno)
    }
    const orderStatusChange = async (e) => {
        // e.preventDefault()
        const json = {
            "id": location.state.orderid,
            "statusid": statusCode,
            "awbNo": awbNo,
            "shipperid": shipper,
            "type": "Distributor"
        }
        console.log("shipper id:", json)

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
                <Header title="View Distributor Order Details" />

                {/* Order Details */}

                <div className="row m-3 bg-white p-2">

                    <div className="col-md-8 book-details p-3" >


                        <h5>Order No : {distributorOrderInfo?.orderno}</h5>
                        <p><span className=" badge bg-info my-2 mb-5" style={{ fontSize: '1rem' }}>{distributorOrderInfo?.status}</span></p>

                        <div className="d-flex" >
                            <p className=" badge bg-light" style={{ color: 'black', fontSize: '1rem' }}>Order Date : {distributorOrderInfo?.orderdate}</p>
                            <p className=" badge bg-light mx-3" style={{ color: 'black', fontSize: '1rem' }}>{distributorOrderInfo?.currencysymbol} {distributorOrderInfo?.totalamount} </p>

                        </div>

                        {distributorOrderInfo?.awbno !== "" && distributorOrderInfo?.shippername !== "" &&

                            <div className="d-flex" >
                                <p className=" badge bg-light" style={{ color: 'black', fontSize: '1rem' }}>AWB No : {distributorOrderInfo?.awbno}</p>
                                <p className=" badge bg-light mx-3" style={{ color: 'black', fontSize: '1rem' }}> Shipper Name: {distributorOrderInfo?.shippername} </p>

                            </div>
                        }

                    </div>

                    <div className="col-md-4">
                        <div className="d-flex mt-3 justify-content-evenly">
                            <button className="btn btn-success" onClick={openStatus}>Change Status</button>
                            <button className="btn btn-primary" onClick={downloadCSV}>Download CSV</button>
                        </div>

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

                                {statusCode == 5 &&
                                    <div>

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
                                    </div>
                                }
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
                                <h5 className="card-title">Distributor Information</h5>
                                <hr></hr>
                                <p><b>Name</b> : {distributorOrderInfo?.distributor?.name}</p>
                                <p><b>Email</b> : {distributorOrderInfo?.distributor?.email}</p>
                                <p><b>Phone</b> : {distributorOrderInfo?.distributor?.contactno}</p>


                            </div>

                        </div>

                    </div>
                    <div className="col-md-4">
                        <div className="card" style={{ minHeight: '300px' }}>

                            <div className="card-body">
                                <h5 className="card-title">Shipping Address</h5>
                                <hr></hr>
                                <p><b>Address</b> : {distributorOrderInfo?.shippingaddress?.streetaddress} </p>
                                <p><b>City</b> : {distributorOrderInfo?.shippingaddress?.city}  </p>
                                <p><b>Pin code</b> : {distributorOrderInfo?.shippingaddress?.pincode} </p>
                                <p><b>State</b> : {distributorOrderInfo?.shippingaddress?.state} </p>
                                <p><b>Country</b> : {distributorOrderInfo?.shippingaddress?.country} </p>


                            </div>

                        </div>

                    </div>
                    <div className="col-md-4">
                        <div className="card" style={{ minHeight: '300px' }}>

                            <div className="card-body">
                                <h5 className="card-title">Billing Address</h5>
                                <hr></hr>
                                <p><b>Address</b> : {distributorOrderInfo?.billingaddress?.streetaddress} </p>
                                <p><b>City</b> : {distributorOrderInfo?.billingaddress?.city}  </p>
                                <p><b>Pin code</b> : {distributorOrderInfo?.billingaddress?.pincode} </p>
                                <p><b>State</b> : {distributorOrderInfo?.billingaddress?.state} </p>
                                <p><b>Country</b> : {distributorOrderInfo?.billingaddress?.country} </p>


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

                                {distributorOrderInfo?.orderitems?.map((data, index) => (
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
                {/* Order History */}


                <div className="m-3">
                    <div className="bg-white p-3 rounded-2">

                        <table className="table bg-white">
                            <thead className="text-center">
                                <tr>
                                    <th colSpan={4}>
                                        <h4> Order History</h4>
                                    </th>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <th>Status Date</th>
                                    <th>Comment</th>

                                </tr>
                            </thead>
                            <tbody className="text-center">

                                {distributorOrderInfo?.history?.map((data, index) => (
                                    <tr className="custom-table-row"
                                        key={index}
                                    >
                                        <td className="all_col">{data.status}</td>
                                        <td className="all_col">{data.statusdate}</td>
                                        <td className="all_col">{data.comment}</td>
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

export default ViewDistributorOrderDetails;