import React, { useEffect, useState, } from "react";
import Header from "../../Layout/Header.js";
import SideMenu from "../../Layout/SideMenu.js";
import { Link, useNavigate } from "react-router-dom";
import SVG from "react-inlinesvg";

import saveIcon from '../../assets/icons/save.svg';

import { AdminProfile } from "../../Context/AdminContext.js";
import { useAuth } from "../../Context/AuthContext.js";
import Config from "../../Config/Config.json";
import { jsPDF } from "jspdf";
import Datetime from "../../GlobalFunctions.js/Datetime";
import Logo from "../../assets/img/logoo.png";

const PublisherSales = () => {
  const { authData } = useAuth();

  const { get_publisher_invoices } = AdminProfile()


  const [yearList, setYearList] = useState([2024, 2023, 2022, 2021, 2020])
  const [monthList, setMonthList] = useState([
    { 'name': 'January', 'value': 1 },
    { 'name': 'February', 'value': 2 },
    { 'name': 'March', 'value': 3, },
    { 'name': 'April', 'value': 4 },
    { 'name': 'May', 'value': 5 },
    { 'name': 'June', 'value': 6 },
    { 'name': 'July', 'value': 7 },
    { 'name': 'August', 'value': 8 },
    { 'name': 'September', 'value': 9 },
    { 'name': 'October', 'value': 10 },
    { 'name': 'November', 'value': 11 },
    { 'name': 'December', 'value': 12 },

  ])
  const [pubisherInvoices, setPublisherInvoices] = useState([])
  const [selectedYear, setSelectedYear] = useState(yearList[0])
  const [selectedMonth, setSelectedMonth] = useState(monthList[0].value)

  const navigate = useNavigate();
  // const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {

    if (authData == "" || authData === undefined) { }
    else {
      getInvoiceData()
    }

  }, [authData]);

  const getInvoiceData = async () => {
    let data = {
      year: parseInt(selectedYear),
      month: parseInt(selectedMonth)
    }

    let resp = await get_publisher_invoices(data)
    console.log("Resp status code", resp.statuscode)

    if (resp.statuscode === "0" && resp.output != null) {
      setPublisherInvoices(resp.output)
    }
    else {
      setPublisherInvoices([])
    }
  }

  const yearHandler = (e) => {
    setSelectedYear(e.target.value)
  }

  const monthHandler = (e) => {
    setSelectedMonth(e.target.value)
  }

  const submitData = async () => {
    let data = {
      year: parseInt(selectedYear),
      month: parseInt(selectedMonth)
    }

    let resp = await get_publisher_invoices(data)
    console.log("Resp status code", resp.statuscode)

    if (resp.statuscode === "0" && resp.output != null) {
      console.log("invoices= ", typeof resp.output)
      setPublisherInvoices(resp.output)
    }
    else {
      alert("No Data found")
    }
  }

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
            <table width="100%" style="border:1px solid #333;font-family:verdana;font-size:9px;">
                <tr>
                    <td colspan="2" style="text-align:center;" width="33%">
                        <div style="border:0;border-bottom:1px solid #333;">
                            <h6 style="margin:8px 5px 16px 5px;">TAX INVOICE</h6>
                        </div>
                    </td>
                    <td colspan="2" style="text-align:center;" width="33%">
                     
                    </td>
                    <td colspan="2" style="text-align:center;" width="33%">
                        <div style="padding: 5px;text-align:left;border:0;border-bottom:1px solid #333;">
                        Invoice #: <strong>${invoice.invoiceno}</strong>
                        <br/>
                        Invoice Date: <strong>${Datetime(invoice.invoicedate?.split(" ")[0])}</strong>
                        </div>
                    </td>
                </tr>
                
                <tr>
                    <td colspan="3" width="45%" style="vertical-align:top;">
                        <div style="text-align:left;padding:6px 5px 5px 5px;border:0;">
                            <h4 style="margin:5px 0;border-bottom:1px solid #333;">Bill From</h4>
                            <address>
                            ${invoice.publishername}<br/>
                            ${invoice.publisheraddressline}<br/>
                            ${invoice.publishercity} , ${invoice.publisherpincode} <br/>
                            ${invoice.publisherstate} , ${invoice.publishercountry} <br/>
                            ${invoice.publishergstin !== "" ? `GSTIN: <strong>${invoice.publishergstin}</strong>` : ''}
                           
                        </address>
                        </div>
                        
                    </td>
                    <td colspan="3" width="45%" style="vertical-align:top;">
                        <div style="text-align:right;padding:5px;border:0;">
                            <h4 style="margin:5px 0;border-bottom:1px solid #333;">Bill To</h4>
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
                                <th style="text-align:left;">Order No</th>
                                <th style="text-align:left;">Amount</th>
                                <th style="text-align:left;">Commission</th>
                               
                                ${invoice.publisherstateid == invoice.companystateid ?
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
                                        <td  style="text-align:left;">${invoiceItem.orderno}</td>
                                        <td  style="text-align:left;"> ${invoiceItem.amount}</td>
                                        <td  style="text-align:left;"> ${invoiceItem.commission}</td>
                                      
                                  
                                        ${invoice.publisherstateid == invoice.companystateid ?
                                          `<td style="text-align:left;"> ${invoiceItem.cgst}</td>
                                            <td style="text-align:left;"> ${invoiceItem.sgst}</td>` :
                                          `<td style="text-align:left;"> ${invoiceItem.igst}</td>`
                                        }
                                        <td style="text-align:left;"> ${invoiceItem.linetotal}</td>
                                    </tr>`
      ))}
                            </tbody>
                            <tfoot style="border-top:1px solid #333;">
                                <tr style="border-bottom:1px solid #333;">
                                    
                                    ${invoice.publisherstateid == invoice.companystateid ?
                                        `
                                        <td colspan="3" style=style="text-align:left;font-weight:bold;">Total</td>
                                        <td style=style="text-align:left;"> ${calculateTotalCGST(invoice.invoiceitems)}</td>
                                         <td style=style="text-align:left;"> ${calculateTotalSGST(invoice.invoiceitems)}</td>` :
                                        `<td colspan="2" style=style="text-align:left;font-weight:bold;">Total</td>
                                        <td style=style="text-align:left;"> ${calculateTotalIGST(invoice.invoiceitems)}</td>`
                                      }
                                    <td style=style="text-align:left; font-weight:bold;"> ${invoice.total}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
    </html>`
  }

  const getInvoice = async (invoice) => {
    const pdf = new jsPDF('p', 'pt', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    var img = new Image()
    img.src = Logo
    pdf.html(generateInvoiceHTML(invoice), {
      width: width,
      windowWidth: 595,
      // margin: [10, 10, 10, 10],
      // html2canvas: { scale: 0.57 },
    })
      .then(() => {
        console.log("order no=", invoice)
        pdf.addImage(img, 'PNG', 10, 750, 150, 50);
        pdf.save('invoice_' + invoice.invoiceno + '.pdf');
      });
    // pdf.html(generateInvoiceHTML(), 10, 10)
    // pdf.save("test.pdf")

  }


  return (
    <>
      <SideMenu />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <Header title="Publisher Invoices" />
        <div className="bg-white p-3 m-3 rounded-2 ">
          <div className="customer_sales_card1">
            <div className="customer_sales_card1_inner">
              <div>
                <label for="yearList">Select year</label>
                <select id='yearList' className="form-select" onChange={(e) => yearHandler(e)}>
                 
                  {
                    yearList.map((year, index) => (
                      <option key={index} value={year}>{year}</option>
                    ))
                  }
                </select>

              </div>
              <div className="ms-4 ">
                <label for="monthList">Select Month</label>
                <select id='monthList' className="form-select" onChange={(e) => monthHandler(e)}>
                 
                  {
                    monthList.map((month, index) => (
                      <option key={index} value={month.value}>{month.name}</option>
                    ))
                  }
                </select>

              </div>

            </div>

            <div className="ms-4 mt-3">
              <button className="btn btn-main" onClick={submitData}>
                {/* <SVG src={saveIcon} style={{ marginRight: 10 }} width={15} />  */}
                Submit
              </button>

            </div>
          </div>
        </div>
        <div className=" bg-white p-3 m-3 rounded-2">
          <table className="table bg-white">
            <thead className="text-center">
              <tr>
                <th>Invoice No</th>
                <th>Invoice Date</th>
                <th>Total Amt</th>
                <th>Publisher Name</th>
                <th>Download Invoice</th>
                {/* <th>Actions</th> */}
              </tr>
            </thead>
            <tbody className="text-center">
              {/* {pubisherInvoices} */}
              {pubisherInvoices.map((invoice, index) => (
                (
                  <tr className="custom-table-row" key={index}>
                    <td className="all_col">{invoice.invoiceno}</td>
                    <td className="all_col">{Datetime(invoice.invoicedate?.split(" ")[0])}</td>
                    <td className="all_col"> ₹ {invoice.total}</td>
                    <td className="all_col">{invoice.publishername}</td>
                    <td>
                      <div><button className="btn btn-outline-primary rounded-pill op_btn" onClick={() => { getInvoice(invoice) }}>Download Invoice</button></div>
                    </td>

                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default PublisherSales;