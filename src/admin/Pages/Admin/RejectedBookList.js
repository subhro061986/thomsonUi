import React, { useEffect, useState, } from "react";
import Header from "../../Layout/Header";
import SideMenu from "../../Layout/SideMenu";
import { Link } from "react-router-dom";
import SVG from "react-inlinesvg";
import eye from '../../assets/icons/eye.svg';

import { useNavigate } from 'react-router-dom';
import { AdminProfile } from "../../Context/AdminContext.js";
import { useAuth } from "../../Context/AuthContext";
import noImg from '../../assets/img/no-img.png';
import Config from "../../Config/Config.json";

const RejectedBookList = () => {
  const { authData } = useAuth();
  const { allBookList } = AdminProfile();

  // const [bookListData,setBookListData]=useState([])
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [recordPerPage, setRecordPerPage] = useState(2);

  useEffect(() => {
    console.log("all book list : ", allBookList)
  }, [authData])

  const navigate = useNavigate();
  // const [bookApprovalModal, setBookApprovalModal] = useState(false);  
  const openModal = (id) => {
    navigate("/rejectedbookdetails", { state: { bookid: id } });
  }

  return (
    <>
      <SideMenu />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <Header title="Rejected Book List" />
        <div className="m-3">
          <table className="table bg-white">
            <thead className="text-center">
              <tr>
                <th>Cover</th>
                <th>ISBN 13</th>
                <th>Title</th>
                <th>Publisher</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {allBookList.map((data, index) => (
                data.status === 'Rejected' && (
                  <tr className="custom-table-row" key={index}>
                    <td className="all_col">
                      <img src={data.image === null || data.image === '' ? noImg : Config.API_URL + Config.PUB_IMAGES + data.publisherid + "/" + data.image + '?d=' + new Date()} width={40} height={40} />
                    </td>
                    <td className="all_col">{data.isbn13 === null ? "Not Available" : data.isbn13}</td>
                    <td className="all_col">{data?.title?.length > 0 ? data.title : "Not Available"}</td>
                    <td className="all_col">{data?.publisher?.length > 0 ? data.publisher : "Not Available"}</td>
                    <td className="all_col">{data.category.length > 0 ? data.category : "Not Available"}</td>
                    <td className="all_col">{data.price === null || data.price === '' ? "Not Available" : data.price}</td>
                    <td className={`${data.status}`}>{data.status}</td>
                    <td className="all_col">
                      <SVG src={eye} style={{ fill: '#000', marginRight: 10 }} width={18} height={32}
                        onClick={() => openModal(data.id)} />
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

export default RejectedBookList;