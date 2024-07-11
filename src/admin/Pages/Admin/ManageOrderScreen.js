import React, { useEffect, useState, } from "react";
import Header from "../../Layout/Header";
import SideMenu from "../../Layout/SideMenu";
import { Link } from "react-router-dom";
import eye from '../../assets/icons/eye.svg';
import saveIcon from "../../assets/icons/save.svg";
import SVG from "react-inlinesvg";

import { useNavigate } from 'react-router-dom';
import { Modal } from "react-bootstrap";
import { AdminProfile } from "../../Context/AdminContext";
import { useAuth } from "../../Context/AuthContext";

const ManageOrderScreen = () => {

    const { getManageOrder } = AdminProfile();
    const navigate = useNavigate();

    const [orderDescriptionModal, setOrderDescriptionModal] = useState(false)
    const [allOrders, setAllOrders] = useState([])

    useEffect(() => {
        all_order()
    }, [])

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

    const openOrderDescriptionModal = (id) => {
        // setOrderDescriptionModal(true)
        navigate("/admin/vieworderdetails", { state: { orderid: id } });
    }

    const closeOrderDescriptionModal = () => {
        setOrderDescriptionModal(false)
    }

    return (
        <>
            <SideMenu />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <Header title="Manage Orders" />
                {/* <div className="bg-white p-3 m-3 rounded-2">
                    <select name="order-filter" id="order-filter" className="form-select order-filter" aria-label="Filter orders by">
                        <option selected>Filter orders by</option>
                        <option value="All">All Orders</option>
                        <option value="Completed">Completed Orders</option>
                        <option value="Failed">Failed Orders</option>
                        <option value="Publisher">Publisher</option>
                    </select>
                </div> */}
                <div className="m-3">
                    <div className="bg-white p-3 rounded-2">
                        {
                            allOrders.length === 0 ? (
                                <div>No records found</div>
                            ) : (
                                <table className="table bg-white">
                                    <thead className="text-center">
                                        <tr>
                                            <th>Order No</th>
                                            <th>Order Date</th>
                                            <th>Customer</th>
                                            {/* <th>Publisher</th> */}
                                            <th>Amount</th>

                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">

                                        {allOrders.map((data, index) => (
                                            <tr key={index} className="custom-table-row">
                                                <td className="all_col">{data.orderno}</td>
                                                <td className="all_col">{data.orderdate}</td>
                                                <td className="all_col">{data.customer}</td>
                                                {/* <td className="all_col">Modern Publishing</td> */}
                                                <td className="all_col">{data.totalamount}</td>

                                                <td className="inact_col">
                                                    {data.status}
                                                </td>
                                                <td>
                                                    <SVG src={eye}
                                                        // style={{ fill: '#000', marginRight: 10 }}
                                                        height={20} width={20}
                                                        onClick={()=>openOrderDescriptionModal(data.id)}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                    </div>
                </div>

                {/* ------------Add order description Modal------------ */}

                <Modal
                    show={orderDescriptionModal}
                    onHide={closeOrderDescriptionModal}
                    backdrop="static"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">


                            {/* <div className="col-lg-12 mb-3">

                                <label
                                    className="form-label">Category Name</label>
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Type Category Name"
                                // value={productTitle}
                                // onChange={productTitleHandler}
                                />

                                <label className="form-label" htmlFor='cat_prod'> Parent Category</label>

                                <select id='cat_prod' className="form-select"
                                //  value={categoryId} 
                                // onChange={categoryIDHandler}
                                >
                                    <option value={0}>Please Select</option>

                                    <option
                                    >
                                        Fiction
                                    </option>
                                    <option>Non-Fiction</option>
                                </select>

                            </div> */}
                            <div className="book-details p-3">
                                <p><strong>Order Id</strong> : 1</p>
                                <p>
                                    <strong>Customer</strong> : John Doe
                                </p>
                                <p><strong>Publisher</strong> : Modern Pubishing</p>
                                <p><strong>Amount</strong> : 653 </p>
                                <p><strong>Date</strong> : 1 Nov 2023</p>
                                <p><strong>Status</strong> : <span className="inact_col">Failed</span></p>
                            </div>






                        </div>
                    </Modal.Body>
                    <Modal.Footer>

                        <button className="btn btn-success"
                        //  onClick={saveProduct}
                        //onClick={this.addPresentDetails}
                        >
                            <SVG src={saveIcon} style={{ marginRight: 10 }} width={15} />
                            Save
                        </button>
                    </Modal.Footer>
                </Modal>

            </div>
        </>
    );
}

export default ManageOrderScreen;