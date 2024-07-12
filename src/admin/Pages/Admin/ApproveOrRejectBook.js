import React, { useEffect, useState, } from "react";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SVG from "react-inlinesvg";

import Header from "../../Layout/Header";
import SideMenu from "../../Layout/SideMenu";
import { AdminProfile } from "../../Context/AdminContext.js";
import { useAuth } from "../../Context/AuthContext";

import saveIcon from '../../assets/icons/save.svg';
import noImg from '../../assets/img/no-img.png';
import Config from "../../Config/Config.json";


const ApproveOrRejectBook = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authData } = useAuth();
  const { getBookById, approveBook, rejectBook } = AdminProfile();

  const [bookResponse, setBookResponse] = useState([]);
  const [bookID, setBookID] = useState(0);
  const [action, setAction] = useState(0);
  const [displayRejectionReason, setDisplayRejectionReason] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  // const [rReason, setRreason] = useState('');

  const [imageurl, setImageUrl] = useState('')

  // const returnToBookApprovals = () => {
  //   navigate("/bookapprovals");
  // };

  useEffect(() => {
    // console.log("book id : ", location.state.bookid);
    setBookID(location.state.bookid);

    getBookDetails(location.state.bookid);
}, [location.state.bookid])

  const getBookDetails = async(id) => {
    let resp = await getBookById(id);
    // console.log("Book details : ", resp.data.output);
    setBookResponse(resp.data.output);
    setImageUrl(Config.API_URL + Config.PUB_IMAGES + resp.data.output.publisherid + "/" + resp.data.output.front_cover + '?d=' + new Date())
  }

  const bookApproval = (e)=>{
    let val = e.target.value;
    setAction(Number(val));
    if(val === '2'){
      setDisplayRejectionReason(true);
    }
    else{
      setDisplayRejectionReason(false);
    }
  }

  const page_navigation = () => {

    const timer = setTimeout(() => {
      // console.log('setTimeout called!');
      navigate("/bookapprovals");
    }, 4000);
    return () => clearTimeout(timer);
  }

  const saveApprovalAction = async () => {
    if(action === 1){
      // setDisplayRejectionReason(false);
      const response = await approveBook(bookID);
      // console.log('Approval response: ' , response)
      toast.success(response, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        closeButton:false,
        // style: {fontWeight: 'bold',backgroundColor:"rgb(255, 237, 246)"}
      });
      // console.log("Response : ", response);
    }
    else{
      // console.log("Rejection reason : ", rejectionReason);
      const response = await rejectBook(bookID,rejectionReason);
      toast.success(response, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        closeButton:false,
        // style: {fontWeight: 'bold',backgroundColor:"rgb(255, 237, 246)"}
      });
    }

    page_navigation();
  }

  return (
    <>
      <SideMenu />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <Header title="Book Details" />
        {
          bookResponse.status === "Pending" && 
          <div className="bg-white p-3 m-3 rounded-2 d-flex justify-content-start align-items-center box_1">
            <div>
              <label className="form-label" htmlFor='adminOptions'>Approve Book / Reject Book</label>
              <div className="rejection_reason">
                <select id='adminOptions' className="form-select" onChange={(e) => bookApproval(e)}>
                  <option disabled selected>Please select</option>
                  <option value={1}>Approve</option>
                  <option value={2}>Reject</option>
                </select>
                <input type="text" className="form-control mx-3 select_option" placeholder="Enter rejection reason" onChange={(e) => setRejectionReason(e.target.value)} value={rejectionReason} hidden={!displayRejectionReason} />
              </div>
            </div>
            {/* <div className="footer-actions d-flex justify-content-end p-3"> */}
              <button className="btn btn-main" style={{marginTop: '30px', marginLeft: '20px', width:'10%'}} onClick={saveApprovalAction}>
                {/* <SVG src={saveIcon} style={{ marginRight: 10 }} width={15}/>  */}
                Save
              </button>
            {/* </div> */}
          </div>
        }
        {/* <div className="m-3 bg-white p-2">
          <div className="d-flex justify-content-between align-tems-start">
            <div className="book_image p-3">
              <img src={bookResponse?.front_cover ? imageurl : noImg} style={{width:'60%'}}  alt="book cover" />
            </div>
            <div className="book-details p-3">
              <h4>{bookResponse.title}</h4>
              <p><strong>ISBN 13</strong> : {bookResponse.isbn13 === null ? "Not Available" : bookResponse.isbn13}</p>
              <p><strong>ISBN 10</strong> : {bookResponse.isbn10 === null ? "Not Available" : bookResponse.isbn10}</p>
              <h6><strong>Author</strong> : {bookResponse.authors}</h6>
              <p>
                <strong>Description</strong> : {bookResponse.description}
              </p>
              <p><strong>Publisher</strong> : {bookResponse.publisher === null ? "Not Available" : bookResponse.publisher}</p>
              <p><strong>Price</strong> : {bookResponse.price === null ? "Not Available" : '₹' + bookResponse.price}</p>
              <p><strong>EPUB Link</strong> : <span className= {bookResponse.epub_link === null || bookResponse.epub_link === "null" ? "" : "book-url"}>{bookResponse.epub_link === null || bookResponse.epub_link === "null" ? "Not Available" : bookResponse.epub_link}</span></p>
              <p><strong>PDF Link</strong> : <span className={bookResponse.epdf_link === null || bookResponse.epdf_link === "null" ? "" : "book-url"}>{bookResponse.epdf_link === null || bookResponse.epdf_link === "null" ? "Not Available" : bookResponse.epdf_link}</span></p>
              <p><strong>Category</strong> : {bookResponse.category === null ? "Not Available" : bookResponse.category} </p>
              <p><strong>Edition Number</strong> : {bookResponse.editionno === null ? "Not Available" : bookResponse.editionno}</p>
              <p><strong>Language</strong> : {bookResponse.language === null ? "Not Available" : bookResponse.language}</p>
              <p><strong>Number of Pages</strong> : {bookResponse.noofpages === null ? "Not Available" : bookResponse.noofpages}</p>
              <p><strong>Published Date</strong> : {bookResponse?.yearofpublishing}</p>
            </div>
          </div>
        </div> */}

        <div className="m-3 bg-white p-2">
          <div className="row">
              <div className="col-md-4">
                <div className="p-3">
                  <img src={bookResponse?.front_cover ? imageurl : noImg} style={{width:'100%'}}  alt="book cover" />
                </div>
              </div>

          <div className="col-md-8">
            
            <div className="p-3">
              <div className="row">
                <div className="flex-grow-1">
                    <h5>{bookResponse.title}</h5>
                </div>
                </div>
                <div>
                <div className="hstack gap-3 flex-wrap">
                    <div>
                      <p className="text-primary d-block">{bookResponse.publisher === null ? "Not Available" : bookResponse.publisher}</p>
                    </div>
                    <div>
                      <p className="text-muted">Author : {bookResponse.authors}</p>
                    </div>
                    <div>
                      <p className="text-muted">Category : {bookResponse.category === null ? "Not Available" : bookResponse.category}</p>
                    </div>
                    
                </div>
                </div>
              
              
              <div className="row mt-4">
                  <div className="col-lg-3 col-sm-6">
                      <div className="p-2 border border-dashed rounded">
                        <div>
                            <p className="text-muted mb-1" style={{fontSize:'13px'}}>ISBN 13</p>
                            <h6 style={{fontSize:'13px'}}>{bookResponse.isbn13 === null || bookResponse.isbn13 === "" ? "Not Available" : bookResponse.isbn13}</h6>
                        </div>
                      </div>
                  </div>
                  <div className="col-lg-3 col-sm-6">
                      <div className="p-2 border border-dashed rounded">
                        <div>
                            <p className="text-muted mb-1" style={{fontSize:'13px'}}>ISBN 10</p>
                            <h6 style={{fontSize:'13px'}}>{bookResponse.isbn10 === null || bookResponse.isbn10 === "" ? "Not Available" : bookResponse.isbn10}</h6>
                        </div>
                      </div>
                  </div>
                  <div className="col-lg-3 col-sm-6">
                      <div className="p-2 border border-dashed rounded">
                        <div>
                            <p className="text-muted mb-1" style={{fontSize:'13px'}}>PRICE</p>
                            <h6 style={{fontSize:'13px'}}>{bookResponse.price === null ? "Not Available" : '₹' + bookResponse.price}</h6>
                        </div>
                      </div>
                  </div>
                  <div className="col-lg-3 col-sm-6">
                      <div className="p-2 border border-dashed rounded">
                        <div>
                            <p className="text-muted mb-1" style={{fontSize:'13px'}}>LANGUAGE</p>
                            <h6 style={{fontSize:'13px'}}>{bookResponse.language === null ? "Not Available" : bookResponse.language}</h6>
                        </div>
                      </div>
                  </div>
                  
                  
              </div>
              
              <div className="row">
                <div className="mt-4">
                    <h5 className="fs-13">Description</h5>
                    <div className="text-muted" dangerouslySetInnerHTML={{__html: bookResponse.description}}></div>
                </div>
              </div>
              
              <div className="row">
                {/* <div className="mt-3">
                    <div className="fs-12">EPUB Link : 
                    <span className= {bookResponse.epub_link === null || bookResponse.epub_link === "null" ? "text-muted" : "text-primary"}>
                      &nbsp;{bookResponse.epub_link === null || bookResponse.epub_link === "null" ? "Not Available" : bookResponse.epub_link} 
                    </span>
                    </div>
                    
                </div>


                <div className="mt-1">
                    <div className="fs-12">PDF Link : 
                    <span className= "text-primary">
                      &nbsp;{bookResponse.epdf_link === null || bookResponse.epdf_link === "null" ? "Not Available" : bookResponse.epdf_link}
                    </span>
                    </div>
                    
                </div> */}

                <div className="mt-1">
                    <div className="fs-12">Edition Number : 
                      <span className="text-muted">&nbsp;{bookResponse.editionno === null ? "Not Available" : bookResponse.editionno}</span>
                    </div> 
                </div>

                <div className="mt-1">
                    <div className="fs-12">Number Of pages : 
                      <span className="text-muted">&nbsp;{bookResponse.noofpages === null ? "Not Available" : bookResponse.noofpages}</span>
                    </div> 
                </div>

                <div className="mt-1">
                    <div className="fs-12">Published Date : 
                      <span className="text-muted">&nbsp;{bookResponse?.yearofpublishing}</span>
                    </div> 
                </div>

              </div>
              
              
          
            </div>
          </div>
          </div>

          
          
        </div>

      </div>
      <ToastContainer/>
    </>
  );
}

export default ApproveOrRejectBook;