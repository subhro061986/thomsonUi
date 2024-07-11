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

    const {getManageOrder}= AdminProfile();

    const [allOrders, setAllOrders] = useState([])

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
                console.log("all_order_resp_obtained ", resp.data.output.orders)
            }
            else {
                console.log("book array is empty")
                setAllOrders([])
            }
        }

    }

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
                    
                    <div className="book-details p-3">
                        <p><strong>Order No</strong> : 1</p>
                        <p><strong>Order Date</strong> : 1 Nov 2023</p>
                        <p>
                            <strong>Customer</strong> : John Doe
                        </p>
                        <p><strong>Publisher</strong> : Modern Pubishing</p>
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

                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">

                                {/* {orderList.map((data, index) => ( */}
                                <tr className="custom-table-row"
                                //  key={index}
                                 >
                                    <td className="all_col">1</td>
                                    <td className="all_col">1 Nov 2023</td>
                                    <td className="all_col">Modern Publishing</td>
                                    <td className="all_col">Jhon Doe</td>
                                    <td className="all_col">653</td>
                                    <td className="all_col">Failed</td>
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