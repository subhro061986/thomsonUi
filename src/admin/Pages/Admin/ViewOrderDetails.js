import React, { useEffect, useState, } from "react";
import Header from "../../Layout/Header";
import SideMenu from "../../Layout/SideMenu";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SVG from "react-inlinesvg";
import Logo from "../../../Assets/Images/book_central_logo_png.png";
import Datetime from "../../GlobalFunctions.js/Datetime";
import { jsPDF } from "jspdf";


import { AdminProfile } from "../../Context/AdminContext.js";
import { useAuth } from "../../Context/AuthContext";
import noImg from '../../assets/img/no-img.png';

const ViewOrderDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { authData } = useAuth();
    
    const { get_single_order, 
            orderInfo, 
            shipperInfoList, 
            changeOrderStatus, 
            processRefund, 
            returnOrderVerdict,
            cancelOrder,
            getInvoiceById } = AdminProfile();
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

    const calculateTotalCGST = (invoices) => {
        let totalCGST = 0;
        invoices?.map((invoice) => {
            totalCGST += invoice?.cgst
        })
        return totalCGST
    }
    const calculateTotalSGST = (invoices) => {
        let totalSGST = 0;
        invoices?.map((invoice) => {
            totalSGST += invoice?.sgst
        })
        return totalSGST
    }
    const calculateTotalIGST = (invoices) => {
        let totalIGST = 0;
        invoices?.map((invoice) => {
            totalIGST += invoice?.igst
        })
        return totalIGST
    }

    const generateInvoiceHTML = (invoice) => {
        return `
    <html>
        <body >
            <table width="100%" style="border:none;font-family:verdana;font-size:9px;">
                <tr>
                    <td colspan="2" style="text-align:center;" width="33%">
                        <div style="border:0;border-bottom:1px solid #333;">

                            <h6 style="margin:8px 5px;">TAX INVOICE</h6>
                        </div>
                    </td>
                    <td colspan="2" style="text-align:center;" width="33%">
                        <div style="padding: 3px 5px 5px 5px;text-align:left;border:0;border-bottom:1px solid #333;">
                            Order #: <strong> ${invoice?.orderno}</strong>
                            <br/>
                            Order Date: <strong>${Datetime(invoice?.orderdate?.split(" ")[0])} </strong>
                        </div>
                    </td>
                    <td colspan="2" style="text-align:center;" width="33%">
                        <div style="padding: 3px 5px 5px 5px;text-align:left;border:0;border-bottom:1px solid #333;">
                        Invoice #: <strong>${invoice?.invoiceno}</strong>
                        <br/>
                        Invoice Date: <strong>${Datetime(invoice?.invoicedate?.split(" ")[0])}</strong>
                        </div>
                    </td>
                </tr>

               
                
                <tr>
                    <td colspan="3" width="50%">
                        <div style="text-align:left;padding:5px;border:0;">
                            <h4 style="margin:5px 0;border-bottom:1px solid #333;">Sold By</h4>
                            <address>
                                ${invoice?.billingFrom?.publishername}<br/>
                                ${invoice?.billingFrom?.addressline} <br/>
                                ${invoice?.billingFrom?.city} , ${invoice?.billingFrom?.pincode}<br/>
                                ${invoice?.billingFrom?.statename} , ${invoice?.billingFrom?.countryname}<br/>
                                GSTIN: <strong> ${invoice?.billingFrom?.gstin}</strong>
                            </address>
                        </div>
                        
                    </td>
                    <td colspan="3" width="50%" style="vertical-align:top;">
                        <div style="text-align:right;padding:5px 20px 5px 5px;border:0;">
                            <h4 style="margin:5px 0;border-bottom:1px solid #333;">Billing Address</h4>
                            <address>
                                ${invoice?.billingTo?.customername}<br/>
                                ${invoice?.billingTo?.addressline}<br/>
                                ${invoice?.billingTo?.city} , ${invoice?.billingTo?.pincode} <br/>
                                ${invoice?.billingTo?.statename} , ${invoice?.billingTo?.countryname} <br/>
                                ${invoice?.billingTo?.gstin !== "" && invoice?.billingTo?.gstin!== null  ? `GSTIN: <strong>${invoice?.billingTo?.gstin}</strong>` : ''}
                               
                            </address>
                        </div>
                    </td>
                </tr>
                <tr>
                     <td colspan="3" width="50%" style="vertical-align:top;">
                        <div style="text-align:right;padding:5px 20px 5px 5px;border:0;">
                            <h4 style="margin:5px 0;border-bottom:1px solid #333;">Shipping Address</h4>
                            <address
                                ${invoice?.shippingInfo?.addressline}<br/>
                                ${invoice?.shippingInfo?.city} , ${invoice?.shippingInfo?.pincode} <br/>
                                ${invoice?.shippingInfo?.statename} , ${invoice?.shippingInfo?.countryname} <br/>
                                ${ invoice?.shippingInfo?.pincode}
                               
                            </address>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="6">
                        <hr style="border:0;border-bottom:1px solid #333;"/>
                    </td>
                </tr>
                <tr>
                    <td colspan="6">
                        <table width="100%" style="border-collapse: collapse;font-family:verdana;font-size:9px;">
                            <thead>
                            <tr style="border-bottom:1px solid #333;">
                                <th style="text-align:left;">Particular</th>
                                <th style="text-align:left;">Publisher</th>
                                <th style="text-align:left;">Qty</th>
                                <th style="text-align:left;">Base Amount</th>
                                <th style="text-align:left;">Discount</th>
                                ${invoice?.billingTo?.stateid == invoice?.billingFrom?.stateid  ?
                `<th style="text-align:left;">CGST</th>
                                     <th style="text-align:left;">SGST</th>` :
                `<th style="text-align:left;">IGST</th>`
            }
                                <th style="text-align:left;">Total</th>
                            </tr>
                            </thead>
                            <tbody>
                            ${invoice?.invoicelines.map((invoiceItem, index) => (
                `<tr key=${index} style="border-bottom:1px solid #333;">
                                        <td style="text-align:left;">
                                        ${invoiceItem.booktitle}<br/>
                                            <small>${invoiceItem.isbn13}</small>
                                        </td>
                                        <td style="text-align:left;">${invoiceItem.publisher}</td>
                                        <td style="text-align:left;">${invoiceItem.quantity}</td>
                                        <td style="text-align:left;"> ${invoiceItem.price}</td>
                                        <td style="text-align:left;"> ${invoiceItem.discount!=null? invoiceItem.discount:''}</td>
                                        ${invoice?.billingTo?.stateid == invoice?.billingFrom?.stateid ?
                    `<td style="text-align:left;">${invoiceItem.cgst}</td>
                                            <td style="text-align:left;">${invoiceItem.sgst}</td>` :
                    `<td style="text-align:left;">${invoiceItem.igst}</td>`
                }
                                        <td style="text-align:left;">${invoiceItem.linetotal}</td>
                                    </tr>`
            ))}
                            </tbody>
                            <tfoot style="border-top:1px solid #333;">
                                <tr style="border-bottom:1px solid #333;">
                               
                                    ${invoice?.billingTo?.stateid == invoice?.billingFrom?.stateid  ?
                `
                                      <td colspan="5" style="text-align:left;font-weight:bold;">Total</td>
                                      <td style="text-align:left;">${calculateTotalCGST(invoice?.invoicelines)}</td>
                                       <td style="text-align:left;">${calculateTotalSGST(invoice?.invoicelines)}</td>` :
                `<td colspan="5" style="text-align:left;font-weight:bold;">Total</td>
                                      <td style="text-align:left;">${calculateTotalIGST(invoice?.invoicelines)}</td>`
            }
                                    <td style="text-align:left; font-weight:bold;"> ${invoice?.total}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
    </html>`
    }

    const downloadInvoice = async (invoiceid) => {
       const response = await getInvoiceById(invoiceid)
       console.log("Invoice : ", response);
        if(response.statuscode === "0"){
            const pdf = new jsPDF('p', 'pt', 'a4');
            var img = new Image()
            img.src = Logo
    
            const width = pdf.internal.pageSize.getWidth();
            pdf.html(generateInvoiceHTML(response.output), {
                width: width,
                windowWidth: 794,
                // margin: 'auto',
                margin: [10, 10, 10, 10],
                // html2canvas: { scale: 0.57 },
            })
                .then(() => {
                    pdf.addImage(img, 'PNG', 10, 750, 150, 50);
                    pdf.save('invoice_' + response.output.invoiceno + '.pdf');
                });
        }
        else{
            console.log("Error getting invoice: ", response);
        }
    }
    const openStatus = () => {
        setStatusInfoModal(!statusInfoModal)
        setShipperInfoModal(false)
    }

    const updateShippingStatusChange = async () => {

        const json = {
            "awbNo": awbNo,
            "shipperid": shipper,
            "orderid": location.state.orderid,
            "statusid":5,
            "id": location.state.orderid,
        }
        // console.log(json)
        const response = await changeOrderStatus(json)
        if (response.statuscode === "0") {
            alert("Status changed successfully")
            setStatusInfoModal(false)
            setShipperInfoModal(false)
        } else {
            alert("Failed to change status")
        }
    }

    const orderStatusChange = async (e) => {
        // e.preventDefault()
        const json = {
            "id": location.state.orderid,
            "statusid": statusCode,
            "awbNo": awbNo,
            "shipperid": shipper,
            "type":"Customer"
        }

        const response = await changeOrderStatus(json)
        if (response.statuscode === "0") {
            alert("Status changed successfully")
           

            if(statusCode === "9") {
                const processRefundDetails= {
                    amount:orderInfo?.totalamount * 100,
                    currency:orderInfo?.currencyisocode,
                    paymentid:orderInfo?.razorpay_payment_id,
                    id:location.state.orderid
                }
                const refundResponse = await processRefund(processRefundDetails)
                if(refundResponse.statuscode === "0"){
                    alert("Refund processed successfully")
                }
                else {
                    alert("Failed to process refund")
                }
            }
            else if (statusCode=== "8"){
                const returnAcceptedjson = {
                    "comment":'Order return accepted',
                    "id": location.state.orderid,
                }
                // console.log(json)
                const returnAcceptedResponse = await returnOrderVerdict(returnAcceptedjson)

                if(returnAcceptedResponse.statuscode === "0"){
                    alert("Return order accepted successfully")
                }
                else {
                    alert("Failed to accept return order")
                }
            }
            else if(statusCode === "2"){
                const cancelOrderDetails= {
                    amount:orderInfo?.totalamount * 100,
                    currency:orderInfo?.currencyisocode,
                    paymentid:orderInfo?.razorpay_payment_id,
                    id:location.state.orderid
                }
                const refundResponse = await cancelOrder(cancelOrderDetails)
                if(refundResponse.statuscode === "0"){
                    alert("Order cancelled successfully")
                }
                else {
                    alert("Failed to cancel order")
                }
            }

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
                <Header title="View Customer Order Details" />

                {/* Order Details */}

                <div className="row m-3 bg-white p-2">

                    <div className="col-md-8 book-details p-3" >


                        <h5>Order No : {orderInfo?.orderno}</h5>
                        <p><span className=" badge bg-info my-2 mb-5" style={{ fontSize: '1rem' }}>{orderInfo?.status}</span></p>

                        <div className="d-flex" >
                            <p className=" badge bg-light" style={{ color: 'black', fontSize: '1rem' }}>Order Date : {orderInfo?.orderdate}</p>
                            <p className=" badge bg-light mx-3" style={{ color: 'black', fontSize: '1rem' }}>{orderInfo?.currencysymbol} {orderInfo?.totalamount} </p>

                        </div>

                        {orderInfo?.awbno!== "" && orderInfo?.shippername !== "" &&
                        
                            <div className="d-flex" >
                                <p className=" badge bg-light" style={{ color: 'black', fontSize: '1rem' }}>AWB No : {orderInfo?.awbno}</p>
                                <p className=" badge bg-light mx-3" style={{ color: 'black', fontSize: '1rem' }}> Shipper Name: {orderInfo?.shippername} </p>

                            </div>
                        }

                    </div>

                    <div className="col-md-4">
                        <div className="d-flex mt-3 justify-content-center">
                            <button className="btn btn-success" onClick={openStatus}>Change Status</button>
                            <button className="btn btn-info ms-4" onClick={() => downloadInvoice(orderInfo?.invoiceid)}>Download Invoice</button>
                        </div>

                        {shipperInfoModal ? <>
                           
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

                                {orderInfo?.history?.map((data, index) => (
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

export default ViewOrderDetails;