import React, { useEffect, useState, } from "react";
import { Link } from "react-router-dom";
import TopBar from "../Layout/TopBar";
import ProfileTab from "../Layout/ProfileTab";
import Footer from "../Layout/Footer";

import search_icon from "../Assets/Images/search-normal.png";
import arrow_left from "../Assets/Images/arrow-left.png";
import admin_logo from "../Assets/Images/logoo.svg";
import obook2 from "../Assets/Images/obook2.png";
import Logo from "../Assets/Images/book_central_logo_png.png";
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
import { useAuth } from "../Context/Authcontext";


const OrderPage = () => {

    const navigate = useNavigate();
    const { myorders, getInvoiceById,cancelOrder,returnOrderRequest } = UserProfile()
    const {authData}=useAuth();

    const [orders, SetOrders] = useState([])
    const {currentPage}= useState(1)
    const {recordPerPage}= useState(10)

    const [containerClass, setContainerClass] = useState('container');

    const updateContainerClass = () => {
      if (window.innerWidth === 1366) {
        setContainerClass(''); // Set to empty string or a different class if needed
      } else if (window.innerWidth === 1920) {
        setContainerClass('container');
      } else {
        setContainerClass(''); // Default class or another class
      }
    };
  
    useEffect(() => {
      updateContainerClass(); // Set initial class based on initial window size
      window.addEventListener('resize', updateContainerClass);
      return () => window.removeEventListener('resize', updateContainerClass);
    }, [authData]);

    const gotoHome = () => {
        navigate('/home')
    }


    useEffect(() => {
        window.scrollTo(0, 0)
        getMyOrders(currentPage,recordPerPage)
    }, [])

    const calculateTotalCGST = (invoices) => {
        let totalCGST = 0;
        invoices?.map((invoice) => {
            totalCGST += parseFloat(invoice?.cgst).toFixed(2).toString();
        })
        return totalCGST === "00.00"? "0.00": totalCGST
    }
    const calculateTotalSGST = (invoices) => {
        let totalSGST = 0;
        invoices?.map((invoice) => {
            totalSGST += parseFloat(invoice?.sgst).toFixed(2).toString()
        })
        return totalSGST === "00.00"? "0.00": totalSGST
    }
    const calculateTotalIGST = (invoices) => {
        let totalIGST = 0;
        invoices?.map((invoice) => {
            totalIGST += parseFloat(invoice?.igst).toFixed(2).toString()
        })
        return totalIGST === "00.00"? "0.00": totalIGST
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
                                Books Central ( a division of Southshore Innovations Private Limited) </br>
                                Plot 13, Heritage Phase 2, Telephone Nagar, Perungudi </br>
                                Chennai - 600096 </br>
                                Tamilnadu, India </br>
                                GSTIN:<strong>33ABICS2457D1ZI</strong>
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
                            <address>
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
    
    // ${invoice?.billingFrom?.publishername}<br/>
    // ${invoice?.billingFrom?.addressline} <br/>
    // ${invoice?.billingFrom?.city} , ${invoice?.billingFrom?.pincode}<br/>
    // ${invoice?.billingFrom?.statename} , ${invoice?.billingFrom?.countryname}<br/>
    // GSTIN: <strong> ${invoice?.billingFrom?.gstin}</strong>
    }
    const getInvoice = async (id) => {
        const resp = await getInvoiceById(id)
        // console.log("Resp= ", resp)
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
                // pdf.addImage(img, 'PNG', 10, 750, 150, 50);
                pdf.addImage(img, 'PNG', 10, 0, 40, 40);
                pdf.save('invoice_' + resp.output.invoiceno + '.pdf');
            });
        // pdf.html(generateInvoiceHTML(), 10, 10)
        // pdf.save("test.pdf")

    }

    const getMyOrders = async () => {
        let myOrdersResponse = await myorders(1, 10)
        // console.log("resp from order page", myOrdersResponse)
        if (myOrdersResponse.statuscode === "0") {
            let tempArray = myOrdersResponse.output.orders
            // console.log("tempArray from order= ", tempArray)
            SetOrders(tempArray)

        }
        // console.log("myOrderDetails= ", myOrdersResponse)
    }

    const orderCancel= async (order) =>{
        // console.log("cancelOrder amt=", parseFloat(order.totalamount))


        let cancelOrderJson= {
            amount: parseFloat(order.totalamount) * 100,
            id:order.id,
            paymentid:order.razorpay_payment_id,
            currency:order.currencycode
        }
        const cancelOrderResponse= await cancelOrder(cancelOrderJson)

        if(cancelOrderResponse.statuscode === "0"){
            // console.log("Order canceled successfully")
            alert("Order canceled successfully")
            getMyOrders(currentPage,recordPerPage)
        }
    }
    const orderReturn= async (order) =>{
        console.log("return order =", order)
        let returnOrderJson= {
            id:order.id,
            comment:''
        }
        const cancelOrderResponse= await returnOrderRequest(returnOrderJson)

        if(cancelOrderResponse.statuscode === "0"){
            // console.log("Order canceled successfully")
            alert("Order return requested successfully")
            getMyOrders(currentPage,recordPerPage)
        }
    }
    return (
        <div className="main-container">
            <div className="container">
                <TopBar />
                <NavBarSouthsore />
                <ProfileTab />
            </div>

            <Whatsapp />
            <div className={containerClass}>
            <div className="order_main_bg pt-3">
                <div className="d-flex justify-content-between py-3">
                    <div className="d-flex align-items-center orderHeaderText">My Orders</div>

                </div>

                {orders.map((book, index) => (
                    <div
                        key={index}
                    >
                        <div className=" d-flex order_card light_border_top py-4"
                        // key={index}
                        >
                            <div className="d-flex justify-content-start order_left_part_width">
                                <div className="d-flex justify-content-start book_section rounded-4">
                                    <div className="d-flex align-items-center px-3">
                                        <img
                                            src={book.img === null || book.img === '' ? dummy : Config.API_URL + Config.PUB_IMAGES + book.publisherid + "/" + book.img + '?d=' + new Date()}
                                            // src={dummy}
                                            width={120} height={150}
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
                                        { book.currency +  ' ' +book.bookprice}
                                        {/* { book.currency +  ' ' +book.totalamount} */}
                                    </span></div>
                                </div>
                            </div>
                            <div className="d-flex flex-column media_margin">
                                <p className="fs-13 fw-medium "><b>Order No: </b>{book.orderno} </p>
                               
                                
                                <div className="d-flex justify-content-between align-items-center flex-row mt-2">
                                    {/* <p className=" badge bg-success fs-13 fw-medium ">{book.status} </p> */}
                                    <div className="px-3 py-1 mb-2 bg-warning-subtle text-warning-emphasis rounded-pill ">{book.status}</div>
                                    {/* <div className="op_paystat me-4">Payment Status: <span>{book.status}</span></div> */}
                                    {book.status === "DELIVERED" ||
                                    book.status === "RETURN REQUEST" ||
                                    book.status === "RETURN ACCEPTED" ||
                                    book.status === "REFUND" &&
                                    
                                        <button className="btn btn-outline-primary rounded-pill op_btn mb-2"
                                        onClick={() => { getInvoice(book.invoiceid) }}
                                        >Download Invoice</button>
                                   
                                    }
                                </div>
                                
                                <div className="d-flex align-item-center" style={{ marginTop: '8%' }}>
                                    {book.awbno === "" ? (
                                        <div>
                                          {
                                            book.status === "PENDING" && 
                                              <button className="btn btn-outline-secondary rounded-pill op_btn"
                                              onClick={()=>orderCancel(book)}
                                              >Cancel Order</button>

                                          }  
                                        </div>
                                        
                                    ) : (
                                        <div>
                                            <div className="op_paystat me-4">AWB No.: <span>{book.awbno}</span></div>
                                            <div className="op_paystat me-4">Courier: <span>{book.shippername}</span></div>

                                        </div>
                                        
                                    )}
                                    {book.status === "DELIVERED" &&
                                        <div className="d-flex align-items-center justify-content-between">
                                            <button className="btn btn-outline-info rounded-pill op_btn ms-2"
                                        onClick={() => { orderReturn(book) }}
                                        >Return</button>
                                         <button className="btn btn-outline-primary rounded-pill op_btn ms-2"
                                        onClick={() => { getInvoice(book.invoiceid) }}
                                        >Download Invoice</button>
                                        </div>
                                    }
                                </div>
                            </div>


                        </div>


                    </div>

                ))}


            </div>
            </div>
            {/* <div className="order_main_bg pt-3"><p>Work in Progress</p></div> */}
            <FooterSouthsore />
        </div>
    );
}

export default OrderPage;