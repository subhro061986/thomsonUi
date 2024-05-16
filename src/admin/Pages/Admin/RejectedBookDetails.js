import React, { useEffect, useState, } from "react";
import { useLocation, useNavigate, Link } from 'react-router-dom';

import Header from "../../Layout/Header.js";
import SideMenu from "../../Layout/SideMenu.js";
import { AdminProfile } from "../../Context/AdminContext.js";
// import { useAuth } from "../../Context/AuthContext.js";

import noImg from '../../assets/img/no-img.png';
import Config from "../../Config/Config.json";


const RejectedBookDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const { authData } = useAuth();
  const { getBookById } = AdminProfile();

  const [bookResponse, setBookResponse] = useState([]);
  const [bookID, setBookID] = useState(0);
  const [action, setAction] = useState(0);

  const [imageurl, setImageUrl] = useState('')

  useEffect(() => {
    console.log("book id : ", location.state.bookid);
    setBookID(location.state.bookid);

    getBookDetails(location.state.bookid);
  }, [location.state.bookid])

  const getBookDetails = async (id) => {
    let resp = await getBookById(id);
    console.log("Book details : ", resp.data.output);
    setBookResponse(resp.data.output);
    setImageUrl(Config.API_URL + Config.PUB_IMAGES + resp.data.output.publisherid + "/" + resp.data.output.front_cover + '?d=' + new Date())
  }

  return (
    <>
      <SideMenu />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <Header title="Rejected Book Details" />
        {/* <div className="m-3 bg-white p-2"> */}
          {/* <div className="d-flex justify-content-between align-tems-start">
            <div className="book_image p-3">
              <img src={bookResponse?.front_cover ? imageurl : noImg} style={{width:'60%'}}  alt="book cover" />
            </div>
            <div className="book-details p-3">
              <h4>{bookResponse.title}</h4>
              <p><strong>ISBN 13</strong> : {bookResponse.isbn13 === null ? "Not Available" : bookResponse.isbn13}</p>
              <p><strong>ISBN 10</strong> : {bookResponse.isbn10 === null ? "Not Available" : bookResponse.isbn10}</p>
              <p><strong>Rejected Reason</strong> : {bookResponse.rejectionreason}</p>
              <p><strong>Rejected On</strong> : {bookResponse.rejectedon}</p>
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
          </div> */}
          <div className="m-3 bg-white p-2">
            <div className="row">
              <div className="col-md-4">
                <div className="p-3">
                  <img src={bookResponse?.front_cover ? imageurl : noImg} style={{ width: '100%' }} alt="book cover" />
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
                        <p className="text-muted">Author : {bookResponse.authors === null || bookResponse.authors === "" ? "Not Available" : bookResponse.authors}</p>
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
                          <p className="text-muted mb-1" style={{ fontSize: '13px' }}>ISBN 13</p>
                          <h6 style={{ fontSize: '13px' }}>{bookResponse.isbn13 === null || bookResponse.isbn13 === "" ? "Not Available" : bookResponse.isbn13}</h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="p-2 border border-dashed rounded">
                        <div>
                          <p className="text-muted mb-1" style={{ fontSize: '13px' }}>ISBN 10</p>
                          <h6 style={{ fontSize: '13px' }}>{bookResponse.isbn10 === null || bookResponse.isbn10 === "" ? "Not Available" : bookResponse.isbn10}</h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="p-2 border border-dashed rounded">
                        <div>
                          <p className="text-muted mb-1" style={{ fontSize: '13px' }}>PRICE</p>
                          <h6 style={{ fontSize: '13px' }}>{bookResponse.price === null ? "Not Available" : '₹' + bookResponse.price}</h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="p-2 border border-dashed rounded">
                        <div>
                          <p className="text-muted mb-1" style={{ fontSize: '13px' }}>LANGUAGE</p>
                          <h6 style={{ fontSize: '13px' }}>{bookResponse.language === null ? "Not Available" : bookResponse.language}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mt-4">
                      <h5 className="fs-13">Description</h5>
                      <div className="text-muted" dangerouslySetInnerHTML={{ __html: bookResponse.description }}></div>
                    </div>
                  </div>
                  {/* <div className="row">
                    <div className="mt-4">
                      <h5 className="fs-13">Rejected On</h5>
                      <div className="text-muted">{bookResponse.rejectedon}</div>
                    </div>
                  </div> */}
                  <div className="row">
                    <div className="mt-4">
                      <h5 className="fs-13">Rejection Reason</h5>
                      <div className="text-muted">{bookResponse.rejectionreason}</div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mt-3">
                      <div className="fs-12">Rejected On :
                        <span className="text-muted">&nbsp;{bookResponse.rejectedon === null ? "Not Available" : bookResponse.rejectedon}</span>
                      </div>
                    </div>
                    <div className="mt-1">
                      <div className="fs-12">EPUB Link :
                        <span className={bookResponse.epub_link === null || bookResponse.epub_link === "null" ? "text-muted" : "text-primary"}>
                          &nbsp;{bookResponse.epub_link === null || bookResponse.epub_link === "null" ? "Not Available" : bookResponse.epub_link}
                        </span>
                      </div>
                    </div>
                    <div className="mt-1">
                      <div className="fs-12">PDF Link :
                        <span className="text-primary">
                          &nbsp;{bookResponse.epdf_link === null || bookResponse.epdf_link === "null" ? "Not Available" : bookResponse.epdf_link}
                        </span>
                      </div>
                    </div>
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
        {/* </div> */}
        
      </div>
    </>
  );
}

export default RejectedBookDetails;