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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookApproval = () => {
  const { authData } = useAuth();
  const {
    allBookList,
    deletebook,
    restorebook,
    updatePriceOfSingleBook,
    bookListCurrentPageNumber,
    bookListRecordsPerPage,
    setBookListCurrentPageNumber,
    setBookListRecordsPerPage,
    bookListMaxPage
  } = AdminProfile();

  // const [bookListData,setBookListData]=useState([])
  // const [currentPageNo, setCurrentPageNo] = useState(1);
  // const [recordPerPage, setRecordPerPage] = useState(Config.BOOK_LIST_RECORDS_PER_PAGE);

  const [categoriesModal, setcategoriesModal] = useState(false);
  const [effectiveFrom, setEffectiveFrom] = useState('');
  const [customerPrice, setCustomerPrice] = useState('');
  const [priceType, setPriceType] = useState('');
  const [distributorPrice, setDistributorPrice] = useState('');
  const [bookid, setBookid] = useState('');

  useEffect(() => {
    // console.log("all book list : ", allBookList)
  }, [authData])

  const opencategoriesModal = (val, type) => {
    console.log("book val : ", val);
    setPriceType(type)
    setCustomerPrice(val.customerprice)
    setDistributorPrice(val.distributorprice)

    setBookid(val.id)
    setcategoriesModal(true);

  }

  const handlePreviousClick = () => {
    let currentPageNumber = bookListCurrentPageNumber;
    if (currentPageNumber === 1) {
      alert('Already on first page');
      return;
    }
    setBookListCurrentPageNumber(bookListCurrentPageNumber - 1);
  }

  const handleNextClick = () => {
    let currentPageNumber = bookListCurrentPageNumber;
    if (currentPageNumber === bookListMaxPage) {
      alert('Already on last page');
      return;
    }
    setBookListCurrentPageNumber(bookListCurrentPageNumber + 1);
  }

  const saveCategory = async () => {

    console.log('update_price_cust', parseFloat(customerPrice))
    console.log('update_price_cust_1', customerPrice)
    console.log('update_price_dist', parseFloat(distributorPrice))
    console.log('update_price_dist_1', distributorPrice)
    let update_price_json = {
      effectivefrom: effectiveFrom,
      customerprice: parseFloat(customerPrice.replace(/,/g, '')),
      distributorprice: parseFloat(distributorPrice.replace(/,/g, ''))
    }
    console.log('update_price_json', update_price_json)
    const resp = await updatePriceOfSingleBook(bookid, update_price_json)

    console.log('update_price_resp', resp)

    if (resp?.data?.statuscode === '0' && resp?.data?.message === 'Information saved successfully.') {

      toast.success("Price updated successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        closeButton: false,
        theme: "light"
      });
      // console.log("Edit category response : ", resp);
    }
    else {
      toast.error("Price updation failed", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        closeButton: false,
        style: { fontWeight: 'bold', backgroundColor: "rgb(255, 237, 246)" }
      });
    }

    // console.log("Edit category response : ", resp);
    closecategoriesModal();

  }

  const closecategoriesModal = () => {
    setcategoriesModal(false)
  }

  const navigate = useNavigate();
  // const [bookApprovalModal, setBookApprovalModal] = useState(false);  
  const openModal = (id) => {
    // setBookApprovalModal(true);
    navigate("/admin/bookdetails", { state: { bookid: id } });
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
                <th>Customer Price</th>
                <th>Distributor Price</th>
                <th>Status</th>
                <th>Actions</th>

              </tr>
            </thead>
            <tbody className="text-center">
              {allBookList.map((data, index) => (
                // data.status !== 'Rejected' && (
                <tr className="custom-table-row" key={index}>
                  <td className="all_col">
                    <img src={data.img === null || data.img === '' ? noImg : Config.API_URL + Config.PUB_IMAGES + data.publisherid + "/" + data.img + '?d=' + new Date()} width={40} height={40} />
                  </td>
                  <td className="all_col">{data.isbn13 === null ? "Not Available" : data.isbn13}</td>
                  <td className="all_col">{data?.title?.length > 0 ? data.title : "Not Available"}</td>
                  <td className="all_col">{data?.publisher?.length > 0 ? data.publisher : "Not Available"}</td>
                  <td className="all_col">{data.category.length > 0 ? data.category : "Not Available"}</td>
                  <td className="all_col">
                    {data.customerprice === null || data.customerprice === '' ? "Not Available" : data.customerprice}
                    <SVG src={editIcon} style={{ fill: '#000', marginRight: '10px', marginLeft: '6px', marginTop: '-4px' }} width={15} height={32}
                      onClick={() => opencategoriesModal(data, 'customerprice')}
                    />
                  </td>
                  <td className="all_col">
                    {data.distributorprice === null || data.distributorprice === '' ? "Not Available" : data.distributorprice}
                    <SVG src={editIcon} style={{ fill: '#000', marginRight: '10px', marginLeft: '6px', marginTop: '-4px' }} width={15} height={32}
                      onClick={() => opencategoriesModal(data, 'distributorprice')}
                    />
                  </td>
                  <td className={`${data.isactive}`}>{data.isactive === 1 ? 'Active' : 'Inactive'}</td>
                  <td className="all_col">
                    {/* <SVG src={data.status === 'Pending' ? editIcon : null} style={{ fill: '#000', marginRight: 10 }} width={15} height={32}
                      onClick={() => editBook(data.id)}
                    /> */}
                    {/* <div className="d-flex justify-content-start align-items-start"> */}
                    <SVG src={editIcon} style={{ fill: '#000', marginRight: 10, cursor: 'pointer' }} width={15} height={32}
                      onClick={() => editBook(data.id)}
                    />

                    <SVG src={eye} style={{ fill: '#000', marginRight: 10, cursor: 'pointer' }} width={18} height={32}
                      onClick={() => openModal(data.id)} />
                    <div className="form-check form-switch switch_class" style={{ marginTop: '-24%', marginLeft: '48%' }} hidden={data.status === 'Pending' ? true : false}>
                      <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"
                        // style={{ cursor: 'pointer' }}
                        checked={data.isactive === 1 ? true : false}
                        onChange={(e) => rest_del_book(data.isactive, data.id)}
                      />
                    </div>
                    {/* </div> */}

                  </td>
                </tr>
                // )
              ))}

            </tbody>
          </table>
        </div>
        {/* Previous and Next buttons */}
        <div className="d-flex justify-content-center aign-items-center mb-4 gap-2">
            <button className="btn btn-main" onClick={() => {handlePreviousClick()}}>
              <span>{'<'} Previous</span>
            </button>
          <button className="btn btn-main" onClick={() => {handleNextClick()}}>
            <span>Next {'>'}</span>
          </button>
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

      {/* customerPrice update modal */}
      <Modal
        show={categoriesModal}
        onHide={closecategoriesModal}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Price</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-12 mb-3">
              {priceType === 'customerprice' ? (
                <div>
                  <label className="form-label">Customer Price</label>
                  <input type="text" className="form-control mb-2" placeholder="Enter customer price"
                    value={customerPrice} onChange={(e) => setCustomerPrice(e.target.value)} />
                </div>
              ) : (
                <div>
                  <label className="form-label">Distributor Price</label>
                  <input type="text" className="form-control mb-2" placeholder="Enter customer price"
                    value={distributorPrice} onChange={(e) => setDistributorPrice(e.target.value)} />
                </div>
              )}
              <label className="form-label">Effective from date</label>
              <input type="date" className="form-control mb-2" placeholder="Enter effective date"
                value={effectiveFrom} onChange={(e) => setEffectiveFrom(e.target.value)} />

            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>

          <button className="btn btn-main"
            onClick={saveCategory}
            style={{ width: '20%' }}>
            {/* <SVG src={saveIcon} style={{ marginRight: 10 }} width={15} /> */}
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BookApproval;