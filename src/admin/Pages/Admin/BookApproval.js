import React, { useEffect, useState, } from "react";
import Header from "../../Layout/Header";
import SideMenu from "../../Layout/SideMenu";
import { Link } from "react-router-dom";
import SVG from "react-inlinesvg";
import rejectIcon from '../../assets/icons/x-circle.svg';
import approveIcon from '../../assets/icons/icons8-checkmark-30.svg';
import eye from '../../assets/icons/eye.svg';
import editIcon from '../../assets/icons/editicon.svg';
import Delete from '../../assets/icons/delete.svg';
import infoIcon from '../../assets/icons/clock.svg';
import { Modal } from "react-bootstrap";
// import saveIcon from '../assets/icons/save.svg';
import { useNavigate } from 'react-router-dom';

import { AdminProfile } from "../../Context/AdminContext.js";
import { useAuth } from "../../Context/AuthContext";
import noImg from '../../assets/img/no-img.png';
import Config from "../../Config/Config.json";

import book1 from "../../assets/img/bbook1.png";
import book2 from "../../assets/img/bbook2.png";
import book3 from "../../assets/img/bbook3.png";
import book4 from "../../assets/img/bbook4.png";

const BookApproval = () => {
  const { authData } = useAuth();
  const { allBookList, deletebook, restorebook } = AdminProfile();

  // const [bookListData,setBookListData]=useState([])
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [recordPerPage, setRecordPerPage] = useState(2);

  useEffect(() => {
    console.log("all book list : ", allBookList)
  }, [authData])

  const navigate = useNavigate();
  // const [bookApprovalModal, setBookApprovalModal] = useState(false);  
  const openModal = (id) => {
    // setBookApprovalModal(true);
    navigate("/admin/approveorreject", { state: { bookid: id } });
  }

  const editBook = (id, isactive) => {
    // setBookApprovalModal(true);
    navigate("/admin/uploadbooks", { state: { BookId: id, bookstatus: isactive } });
  }

  const delete_book = async (bookid) => {
    const resp = await deletebook(bookid)

    console.log('Delete_book', resp)
  }

  const restore_book = async (bookid) => {
    const resp = await restorebook(bookid)

    console.log('Restore_book', resp)
  }

  const rest_del_book = (activeVal, bookid) => {
    // console.log("event :  ", e.target.value);
    if (activeVal === 1) {

      if (window.confirm("Do you want to delete the book?") == true) {
        // console.log("You pressed OK!");
        delete_book(bookid);
      } else {
        console.log("You pressed cancel!");
      }

    }
    else {
      restore_book(bookid);
    }

  }
  // const closeModal = () => {
  //   setBookApprovalModal(false);
  // }
  return (
    <>
      <SideMenu />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <Header title="Book List" />
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
                data.status !== 'Rejected' && (
                <tr className="custom-table-row" key={index}>
                  <td className="all_col">
                    <img src={data.image === null || data.image === '' ? noImg : Config.API_URL + Config.PUB_IMAGES + data.publisherid + "/" + data.image + '?d=' + new Date()} width={40} height={40} />
                  </td>
                  <td className="all_col">{data.isbn13 === null ? "Not Available" : data.isbn13}</td>
                  <td className="all_col">{data?.title?.length > 0 ? data.title : "Not Available"}</td>
                  <td className="all_col">{data?.publisher?.length > 0 ? data.publisher : "Not Available"}</td>
                  <td className="all_col">{data.category.length > 0 ? data.category : "Not Available"}</td>
                  <td className="all_col">{data.price === null || data.price === '' ? "Not Available" : data.price}</td>
                  <td className={`${data.isactive}`}>{data.isactive===1? 'Active' : 'Inactive'}</td>
                  <td className="all_col">
                    {/* <SVG src={data.status === 'Pending' ? editIcon : null} style={{ fill: '#000', marginRight: 10 }} width={15} height={32}
                      onClick={() => editBook(data.id)}
                    /> */}
                    <SVG src={editIcon} style={{ fill: '#000', marginRight: 10 }} width={15} height={32}
                      onClick={() => editBook(data.id)}
                    />
                    <SVG src={eye} style={{ fill: '#000', marginRight: 10 }} width={18} height={32}
                      onClick={() => openModal(data.id)} />

                    {/* <div className="form-check form-switch switch_class" style={{marginTop:'-19%',marginLeft:'40%'}} hidden={data.status === 'Pending' ? true : false}>
                      <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"
                      checked={data.isactive === 1 ? true : false}
                      onChange={(e) => rest_del_book(data.isactive, data.id)}
                      />
                    </div> */}
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
                <td className="all_col">https://www.example...</td>
                <td className="all_col">Fiction</td>
                <td className="all_col">Juris Press</td>
                <td className="approved">Approved</td>
                <td>
                  <SVG src={approveIcon} style={{ fill: '#198754', marginRight: 10 }} width={15} onClick={openModal} />
                </td>
              </tr>
              <tr className="custom-table-row">
                <td className="all_col"><img src={book3} /></td>
                <td className="all_col">Love Hypothesis</td>
                <td className="all_col">₹539</td>
                <td className="all_col">25%</td>
                <td className="all_col">09/07/2022</td>
                <td className="all_col">https://www.example...</td>
                <td className="all_col">Fiction</td>
                <td className="all_col">Modern Publishing</td>
                <td className="rejected">Rejected</td>
                <td>
                  <SVG src={rejectIcon} style={{ fill: '#dc3545', marginRight: 10 }} width={15} onClick={openModal} />
                </td>
              </tr>
              <tr className="custom-table-row">
                <td className="all_col"><img src={book4} /></td>
                <td className="all_col">Red White and Royal Blue</td>
                <td className="all_col">₹239</td>
                <td className="all_col">20%</td>
                <td className="all_col">09/04/2023</td>
                <td className="all_col">https://www.example...</td>
                <td className="all_col">Fiction</td>
                <td className="all_col">Modern Publishing</td>
                <td className="approved">Approved</td>
                <td>
                  <SVG src={approveIcon} style={{ fill: '#198754', marginRight: 10 }} width={15} onClick={openModal} />
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
        {/* =========Book Approval Modal========= */}
        {/* <Modal show={bookApprovalModal} onHide={closeModal} centered
          dialogClassName="book-approval-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Book Approval</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-1">
              <div className="book-title">
                <img src={book1} alt="book cover" />
                <h4>Do it Today</h4>
                <h6>Author : Darius Foroux</h6>
              </div>
              <div className="book-details mb-2">
                <p>
                  <strong>Description</strong> : Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste eum eveniet error laboriosam nesciunt nemo, modi commodi, voluptatibus ducimus dolorum quos alias cumque beatae, neque quas a temporibus aliquam illum! Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                </p>
                <p><strong>Url</strong> : https://www.example.com/book1.pdf</p>
                <p><strong>Category</strong> : Non Fiction </p>
                <p><strong>ISBN 10</strong> : 0-545-01022-5</p>
                <p><strong>ISBN 13</strong> : 978-3-16-148410-0</p>
                <p><strong>Publisher</strong> : Juris Press</p>
                <p><strong>Price</strong> : ₹449</p>
                <p><strong>Date</strong> : 18/04/2020</p>
              </div>
              <label className="form-label" htmlFor='adminOptions'>Approve Book / Reject Book</label>
                <select id='adminOptions' className="form-select">
                  <option value={0}>Please Select</option>
                  <option>Approve Book</option>
                  <option>Reject Book</option>
                </select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-success">
              <SVG src={saveIcon} style={{ marginRight: 10 }} width={15} /> Save
            </button>
          </Modal.Footer>
        </Modal> */}
      </div>
    </>
  );
}

export default BookApproval;