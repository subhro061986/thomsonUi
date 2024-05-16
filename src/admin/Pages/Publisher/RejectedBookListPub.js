import React, { useEffect, useState, } from "react";
import Header from "../../Layout/Header";
import SideMenu from "../../Layout/SideMenu";
import { Link, useNavigate } from "react-router-dom";

import SVG from "react-inlinesvg";
import eye from '../../assets/icons/eye.svg';
import noImg from '../../assets/img/no-img.png';
import editIcon from '../../assets/icons/editicon.svg';

import { AdminProfile } from "../../Context/AdminContext.js";
import { useAuth } from "../../Context/AuthContext";
import Config from "../../Config/Config.json";

const RejectedBookListPub = () => {


    const { authData } = useAuth();
    const { allBookList } = AdminProfile()
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        console.log("all book list : ", allBookList)
    }, [authData])

    // const editBook = (id, status) => {
    //     // setBookApprovalModal(true);
    //     navigate("/uploadbookspub", { state: { BookId: id, bookstatus: status } });
    // }

    const openModal = (id) => {
        navigate("/rejectedbookdetails", { state: { bookid: id } });
    }

    const doSearch = (e) => {
        setSearchTerm(e.target.value);
    }

    const filteredData = allBookList.filter((data) =>
        Object.values(data).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );


    return (
        <>
            <SideMenu />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <Header title="Rejected Book List" />
                <div className="bg-white p-3 m-3 rounded-2 ">
                    {/* <select name="order-filter" id="order-filter" className="form-select order-filter" aria-label="Filter orders by">
                        <option selected>Filter orders by</option>
                        <option value="All">All</option>
                        <option value="Completed">Succeeded</option>
                        <option value="Failed">Failed</option>
                    </select> */}
                    <input type="text" className="form-control" style={{ width: '40%' }} id="exampleFormControlInput1" placeholder="Search"
                        value={searchTerm} onChange={doSearch}
                    />
                    {searchTerm !== '' && (
                        <ul>
                            {filteredData.map((data) => (
                                <li style={{ listStyleType: 'none' }} key={data.id}>
                                    {/* {`${data.isbn13}, ${data.title}, ${data.category}`} */}
                                    {`${data.title}`}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="m-3">
                    <div className="bg-white p-3 rounded-2">
                        {
                            allBookList?.length === 0 ? (
                                <div>No records found</div>
                            ) : (
                                <table className="table bg-white">
                                    <thead className="text-center">
                                        <tr>
                                            <th>Cover</th>
                                            <th>ISBN 13</th>
                                            <th>Name</th>
                                            {/* <th>Publisher</th> */}
                                            <th>Category</th>
                                            <th>Price</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        {filteredData && filteredData.map((data, index) => (
                                            data.status === 'Rejected' && (
                                                <tr className="custom-table-row" key={index}>
                                                    <td className="all_col">
                                                        <img src={data.image === null || data.image === '' ? noImg : Config.API_URL + Config.PUB_IMAGES + data.publisherid + "/" + data.image + '?d=' + new Date()} width={40} height={40} />
                                                    </td>
                                                    <td className="all_col">{data.isbn13 === null || data.isbn13 === '' ? "Not Available" : data.isbn13}</td>
                                                    <td className="all_col">{data?.title?.length > 0 ? data.title : "Not Available"}</td>
                                                    {/* <td className="all_col">{data?.publisher?.length > 0 ? data.publisher : "Not Available"}</td> */}
                                                    <td className="all_col">{data.category.length > 0 ? data.category : "Not Available"}</td>
                                                    <td className="all_col">{data.price === null || data.price === '' ? "Not Available" : data.price}</td>
                                                    <td className={data.status === "Accepted" ? 'act_col' : 'inact_col'}>{data.status}</td>
                                                    <td className="all_col">
                                                        <SVG src={eye} style={{ fill: '#000', marginRight: 10 }} width={18} height={32} onClick={() => openModal(data.id)} />
                                                    </td>
                                                </tr>
                                            )
                                        ))}
                                        {/* <tr className="custom-table-row">
                <td className="all_col"><img src={book2} /></td>
                <td className="all_col">Kids in Space</td>
                <td className="all_col">₹399</td>
                <td className="all_col">15%</td>
                <td className="all_col">29/04/2022</td>
                <td className="all_col">Fiction</td>
                <td className="approved">Approved</td>
              </tr>
              <tr className="custom-table-row">
                <td className="all_col"><img src={book3} /></td>
                <td className="all_col">Love Hypothesis</td>
                <td className="all_col">₹539</td>
                <td className="all_col">25%</td>
                <td className="all_col">09/07/2022</td>
                <td className="all_col">Fiction</td>
                <td className="rejected">Rejected</td>
              </tr>
              <tr className="custom-table-row">
                <td className="all_col"><img src={book4} /></td>
                <td className="all_col">Red White and Royal Blue</td>
                <td className="all_col">₹239</td>
                <td className="all_col">20%</td>
                <td className="all_col">09/04/2023</td>
                <td className="all_col">Fiction</td>
                <td className="approved">Approved</td>
              </tr> */}
                                    </tbody>
                                </table>
                            )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default RejectedBookListPub;