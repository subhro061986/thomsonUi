import React, { useEffect, useState, } from "react";
import { Link } from "react-router-dom";
import TopBar from "../Layout/TopBar";
import ProfileTab from "../Layout/ProfileTab";
import Footer from "../Layout/Footer";

import search_icon from "../Assets/Images/search-normal.png";
import arrow_left from "../Assets/Images/arrow-left.png";
import admin_logo from "../Assets/Images/logoo.svg";
import obook2 from "../Assets/Images/obook2.png";
import Logo from "../Assets/Images/logoo.png";
import Datetime from "../GlobalFunctions.js/Datetime";
import { useNavigate } from 'react-router-dom';
import { UserProfile } from "../Context/Usercontext";
import dummy from "../Assets/Images/dummy.png";
import Config from "../Config/Config.json"
import { jsPDF } from "jspdf";
import TopBarSouthsore from "../Layout/TopBarSouthsore";
import FooterSouthsore from "../Layout/FooterSouthsore";
import BackButton from "../Layout/BackButton";
import Whatsapp from "../Layout/Whatsapp";
import NavBarSouthsore from "../Layout/NavBarSouthsore";


const OrderPage = () => {

    const navigate = useNavigate();
    const { myorders, getInvoiceById } = UserProfile()

    const [orders, SetOrders] = useState([])

    const gotoHome = () => {
        navigate('/home')
    }


    useEffect(() => {
        window.scrollTo(0, 0)
        getMyOrders()
    }, [])

    const calculateTotalCGST = (invoices) => {
        let totalCGST = 0;
        invoices.map((invoice) => {
            totalCGST += invoice.cgst
        })
        return totalCGST
    }
    const calculateTotalSGST = (invoices) => {
        let totalSGST = 0;
        invoices.map((invoice) => {
            totalSGST += invoice.sgst
        })
        return totalSGST
    }
    const calculateTotalIGST = (invoices) => {
        let totalIGST = 0;
        invoices.map((invoice) => {
            totalIGST += invoice.igst
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
                            Order #: <strong> ${invoice.orderno}</strong>
                            <br/>
                            Order Date: <strong>${Datetime(invoice.ordedate?.split(" ")[0])} </strong>
                        </div>
                    </td>
                    <td colspan="2" style="text-align:center;" width="33%">
                        <div style="padding: 3px 5px 5px 5px;text-align:left;border:0;border-bottom:1px solid #333;">
                        Invoice #: <strong>${invoice.invoiceno}</strong>
                        <br/>
                        Invoice Date: <strong>${Datetime(invoice.invoicedate?.split(" ")[0])}</strong>
                        </div>
                    </td>
                </tr>
                
                <tr>
                    <td colspan="3" width="50%">
                        <div style="text-align:left;padding:5px;border:0;">
                            <h4 style="margin:5px 0;border-bottom:1px solid #333;">Sold By</h4>
                            <address>
                                E-Books Junction <br/>
                                ${invoice.companyname}<br/>
                                ${invoice.companyaddressline} <br/>
                                ${invoice.companycity} , ${invoice.companypincode}<br/>
                                ${invoice.companystate} , ${invoice.companycountry}<br/>
                                GSTIN: <strong> ${invoice.companygstin}</strong>
                            </address>
                        </div>
                        
                    </td>
                    <td colspan="3" width="50%" style="vertical-align:top;">
                        <div style="text-align:right;padding:5px 20px 5px 5px;border:0;">
                            <h4 style="margin:5px 0;border-bottom:1px solid #333;">Billing Address</h4>
                            <address>
                                ${invoice.username}<br/>
                                ${invoice.useraddressline}<br/>
                                ${invoice.usercity} , ${invoice.userpincode} <br/>
                                ${invoice.userstate} , ${invoice.usercountry} <br/>
                                ${invoice.usergstin !== "" ? `GSTIN: <strong>${invoice.usergstin}</strong>` : ''}
                               
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
                                ${invoice.userstateid == invoice.companystateid ?
                `<th style="text-align:left;">CGST</th>
                                     <th style="text-align:left;">SGST</th>` :
                `<th style="text-align:left;">IGST</th>`
            }
                                <th style="text-align:left;">Total</th>
                            </tr>
                            </thead>
                            <tbody>
                            ${invoice.invoiceitems.map((invoiceItem, index) => (
                `<tr key=${index} style="border-bottom:1px solid #333;">
                                        <td style="text-align:left;">
                                        ${invoiceItem.booktitle}<br/>
                                            <small>${invoiceItem.isbn13}</small>
                                        </td>
                                        <td style="text-align:left;">${invoiceItem.publishername}</td>
                                        <td style="text-align:left;">${invoiceItem.quantity}</td>
                                        <td style="text-align:left;"> ${invoiceItem.amount}</td>
                                        <td style="text-align:left;"> ${invoiceItem.discount}</td>
                                        ${invoice.userstateid == invoice.companystateid ?
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
                               
                                    ${invoice.userstateid == invoice.companystateid ?
                `
                                      <td colspan="5" style="text-align:left;font-weight:bold;">Total</td>
                                      <td style="text-align:left;">${calculateTotalCGST(invoice.invoiceitems)}</td>
                                       <td style="text-align:left;">${calculateTotalSGST(invoice.invoiceitems)}</td>` :
                `<td colspan="5" style="text-align:left;font-weight:bold;">Total</td>
                                      <td style="text-align:left;">${calculateTotalIGST(invoice.invoiceitems)}</td>`
            }
                                    <td style="text-align:left; font-weight:bold;"> ${invoice.total}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
    </html>`
    }
    const getInvoice = async (id) => {
        const resp = await getInvoiceById(id)
        console.log("Resp= ", resp)
        const pdf = new jsPDF('p', 'pt', 'a4');
        var img = new Image()
        img.src = Logo

        const width = pdf.internal.pageSize.getWidth();
        pdf.html(generateInvoiceHTML(resp.output), {
            width: width,
            windowWidth: 794,
            // margin: 'auto',
            margin: [10, 10, 10, 10],
            // html2canvas: { scale: 0.57 },
        })
            .then(() => {
                pdf.addImage(img, 'PNG', 10, 750, 150, 50);
                pdf.save('invoice_' + resp.output.orderno + '.pdf');
            });
        // pdf.html(generateInvoiceHTML(), 10, 10)
        // pdf.save("test.pdf")

    }

    const getMyOrders = async () => {
        let myOrdersResponse = await myorders(1, 10)
        console.log("resp from order page", myOrdersResponse)
        if (myOrdersResponse.statuscode === "0") {
            let tempArray = myOrdersResponse.output.orders
            console.log("tempArray from order= ", tempArray)
            SetOrders(tempArray)

        }
        console.log("myOrderDetails= ", myOrdersResponse)
    }
    return (
        <div className="main-container">
            <div className="container">
                <TopBar />
                <NavBarSouthsore />
                <ProfileTab />
            </div>

            <Whatsapp />
            <div className="order_main_bg pt-3">
                <div className="d-flex justify-content-between py-3">
                    <div className="d-flex align-items-center orderHeaderText">My Orders</div>

                </div>

                {orders.map((book, index) => (
                    <div
                        key={index}
                    >
                        <div className=" d-flex justify-content-between order_card light_border_top py-4"
                        // key={index}
                        >
                            <div className="d-flex justify-content-start">
                                <div className="d-flex justify-content-start book_section rounded-4">
                                    <div className="d-flex align-items-center px-3">
                                        <img
                                            // src={book.image === null || book.image === '' ? dummy : Config.API_URL + Config.PUB_IMAGES + book.publisherid + "/" + book.image + '?d=' + new Date()}
                                            src={dummy}
                                            width={120} height={170}
                                        />

                                    </div>
                                </div>
                                <div className="d-flex flex-column ms-4">
                                    <div className="op_head mb-2 mt-1">
                                        {book.title}
                                        {/* Book Name */}
                                    </div>
                                    <div className="op_auth">Author: <span>
                                        {/* Author Name */}
                                        {book.authors}
                                    </span></div>
                                    <div className="op_auth mb-5">Publisher: <span>
                                        {book.publisher}
                                        {/* Publisher Name */}
                                    </span></div>
                                    <div className="op_price">Price: <span className="ms-2">
                                        {/* 300 */}
                                        {book.totalamount}
                                    </span></div>
                                </div>
                            </div>
                            <div className="d-flex order_actions">
                                <div className="op_ono">Order No: <span>
                                    {book.orderno}
                                    {/* ORD/24-25/00000003 */}
                                </span></div>
                                <div className="op_pay_div">
                                    <div className="op_paystat me-4">Payment Status: <span>{book.status}</span></div>
                                    <div><button className="btn btn-outline-primary rounded-pill op_btn"
                                    // onClick={() => { getInvoice(book.invoiceid) }}
                                    >Download Invoice</button></div>
                                </div>
                                <div className="d-flex align-item-center" style={{ marginTop: '8%' }}>
                                    {book.awbno !== "" ? (
                                        <div className="op_paystat me-4">AWB No.: <span>123456df</span></div>) : (

                                        <div><button className="btn btn-outline-secondary rounded-pill op_btn"
                                        // onClick={() => { getInvoice(book.invoiceid) }}
                                        >Cancel Order</button></div>
                                    )}
                                    {book.status === "DELIVERED" &&
                                        <div><button className="btn btn-outline-info rounded-pill op_btn ms-2"
                                        // onClick={() => { getInvoice(book.invoiceid) }}
                                        >Return</button></div>
                                    }
                                </div>
                            </div>


                        </div>
                        {/* <div class="d-grid gap-2">
                            <button class="btn btn-outline-secondary mb-3" type="button">Cancel</button>
                        </div> */}


                    </div>

                ))}


            </div>
            {/* <div className="order_main_bg pt-3"><p>Work in Progress</p></div> */}
            <FooterSouthsore />
        </div>
    );
}

export default OrderPage;