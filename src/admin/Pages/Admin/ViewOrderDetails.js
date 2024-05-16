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

    return (
        <>
            <SideMenu />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <Header title="View Order Details" />
                {/* <div className="bg-white p-3 m-3 rounded-2 d-flex justify-content-start align-items-center">
                    <div>
                        <label className="form-label" htmlFor='adminOptions'>Approve Book / Reject Book</label>
                        <select id='adminOptions' className="form-select">
                            <option>Please Select</option>
                            <option value={1}>Approve</option>
                            <option value={0}>Reject</option>
                        </select>
                    </div>
                    <div className="footer-actions d-flex justify-content-end p-3">
                    <button className="btn btn-success" style={{ marginTop: '30px', marginLeft: '20px' }} onClick={returnToBookApprovals}>
                        <SVG src={saveIcon} style={{ marginRight: 10 }} width={15} /> Save
                    </button>
                    </div>
                </div> */}
                <div className="m-3 bg-white p-2">
                    {/* <div className="d-flex justify-content-between align-tems-start"> */}
                    {/* <div className="image p-3">
                            <img src={book1} alt="book cover" />
                            <img src={bookResponse.images === null ? noImg : bookResponse.images} alt="book cover" />
                        </div> */}
                    <div className="book-details p-3">
                        {/* <h4>{bookResponse.title}</h4>
                  <h6>Author : {bookResponse.authors}</h6>
                  <p>
                    <strong>Description</strong> : {bookResponse.description}
                  </p>
                  <p><strong>Publisher</strong> : {bookResponse.publisher === null ? "Not Available" : bookResponse.publisher}</p>
                  <p><strong>Price</strong> : {bookResponse.price === null ? "Not Available" : bookResponse.price}</p>
                  <p><strong>EPUB Link</strong> : <span className="book-url">{bookResponse.epub_link === null ? "Not Available" : bookResponse.epub_link}</span></p>
                  <p><strong>PDF Link</strong> : <span className="book-url">{bookResponse.epdf_link === null ? "Not Available" : bookResponse.epdf_link}</span></p>
                  <p><strong>Category</strong> : {bookResponse.category === null ? "Not Available" : bookResponse.category} </p>
                  <p><strong>ISBN 13</strong> : {bookResponse.isbn13 === null ? "Not Available" : bookResponse.isbn13}</p>
                  <p><strong>ISBN 10</strong> : {bookResponse.isbn10 === null ? "Not Available" : bookResponse.isbn10}</p>
                  <p><strong>HSN Code</strong> : {bookResponse.hsncode === null ? "Not Available" : bookResponse.hsncode}</p>
                  <p><strong>Edition Number</strong> : {bookResponse.editionno === null ? "Not Available" : bookResponse.editionno}</p>
                  <p><strong>Language</strong> : {bookResponse.language === null ? "Not Available" : bookResponse.language}</p>
                  <p><strong>Number of Pages</strong> : {bookResponse.noofpages === null ? "Not Available" : bookResponse.noofpages}</p>
                  <p><strong>Published Date</strong> : {bookResponse.publishdate === null ? "Not Available" : bookResponse.publishdate}</p> */}
                        <p><strong>Order No</strong> : 1</p>
                        <p><strong>Order Date</strong> : 1 Nov 2023</p>
                        <p>
                            {/* <strong>Customer</strong> : John Doe */}
                        </p>
                        {/* <p><strong>Publisher</strong> : Modern Pubishing</p> */}
                        <p><strong>Amount</strong> : 653 </p>

                        <p><strong>Status</strong> : <span className="inact_col">Failed</span></p>
                    </div>






                    {/* </div> */}
                </div>

                <h4 className="p-3">Invoice :</h4>

                <div className="m-3">
                    <div className="bg-white p-3 rounded-2">
                        {/* {
                            orderList.length === 0 ? (
                                <div>No records found</div>
                            ) : ( */}
                        <table className="table bg-white">
                            <thead className="text-center">
                                <tr>
                                    <th>Invoice No</th>
                                    <th>Invoice Date</th>
                                    <th>Publisher</th>
                                    <th>Customer</th>

                                    <th>Amount</th>

                                    {/* <th>Status</th> */}
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">

                                {/* {orderList.map((data, index) => ( */}
                                <tr className="custom-table-row">
                                    <td className="all_col">1</td>
                                    <td className="all_col">1 Nov 2023</td>
                                    <td className="all_col">Modern Publishing</td>
                                    <td className="all_col">Jhon Doe</td>
                                    <td className="all_col">653</td>

                                    <td className="inact_col">
                                        <SVG src={print}
                                            style={{ fill: '#000', marginRight: 10 }}
                                            height={20} width={20}
                                        />
                                        <SVG src={eye}
                                            style={{ fill: '#000', marginRight: 10 }}
                                            height={20} width={20}
                                        />
                                        <SVG src={download}
                                            style={{  marginRight: 10 }}
                                            height={20} width={20}
                                        />
                                    </td>
                                    {/* <td>
                                        <SVG src={eye}
                                            style={{ fill: '#000', marginRight: 10 }}
                                            height={20} width={20}
                                        onClick={openOrderDescriptionModal}
                                        />
                                    </td> */}
                                </tr>

                                {/* ))} */}
                            </tbody>
                        </table>
                        {/* )}  */}
                    </div>
                </div>

            </div>
        </>
    );
}

export default ViewOrderDetails;