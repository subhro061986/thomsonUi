import React, { useEffect, useState, } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../../Layout/Header";
import SideMenu from "../../Layout/SideMenu";
import { Modal } from "react-bootstrap";
import SVG from "react-inlinesvg";
import saveIcon from '../../assets/icons/save.svg';
import editIcon from '../../assets/icons/editicon.svg';

import { AdminProfile } from "../../Context/AdminContext";
import { useAuth } from "../../Context/AuthContext";
// import trashIcon from '../../assets/icons/deleteicon.svg';
import Format from "../../assets/book-upload-format/CSV_Format_For_Bulk_Upload.csv";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadBooks = () => {
    const [uploadBooksModal, setUploadBooksModal] = useState(false);
    // const [description,setDescription] = useState('');
    const [publisherList, setPublisherList] = useState([]);
    const [fileHandler, setFileHandler] = useState(null);

    const [isbn13, setIsbn13] = useState('');
    const [isbn10, setIsbn10] = useState('');
    const [title, setTitle] = useState('');
    const [coverType, setCoverType] = useState('');
    const [publisher, setPublisher] = useState(0);
    const [volume, setVolume] = useState(0);
    const [year, setYear] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [coupon, setCoupon] = useState('');
    const [editionNo, setEditionNo] = useState(0);
    const [categoryId, setCategoryId] = useState(0);
    const [subcategory, setSubcategory] = useState('');
    const [languageId, setLanguageId] = useState(0);
    const [currencyId, setCurrencyId] = useState(0);
    const [description, setDescription] = useState('');
    const [pdffile, setPdfFile] = useState('');
    const [epubfile, setEpubFile] = useState('');
    const [pageNo, setPageNo] = useState(0);
    const [effectiveFrom, setEffectiveFrom] = useState('');
    const [coverBack, setCoverBack] = useState(null);
    const [coverFront, setCoverFront] = useState('');

    const [coverfronttext, setCoverfronttext] = useState('')
    const [coverbacktext, setCoverbacktext] = useState('')

    const [update, setUpdate] = useState(false)

    const [catBool, setCatBool] = useState(false);
    const [fileTypeBool, setFileTypeBool] = useState(false);
    const [fileType, setFileType] = useState('');
    const [pdfname, setPdfname] = useState('')
    const [epubname, setEpubname] = useState('')
    const [bookid, setBookid] = useState(0)

    const [accepted, setAccepted] = useState(false)
    const [approved, setApproved] = useState(false)
    const [file, setFile] = useState('')
    const [readOnly, setReadOnly] = useState(false)

    const { authDeatils, authData } = useAuth();
    const { categoryList, get_pub_details, currencies, languages, uploadSingleBook, updateSingleBook, updatePriceOfSingleBook, uploadBooksInBulk_admin, getAllPublishers, allPublisher, get_book_details } = AdminProfile();

    const location = useLocation()
    const navigate = useNavigate();

    useEffect(() => {
        // console.log('token_book_det', authData)
        setFileTypeBool(false);
        // get_pub_info(authDeatils.pub_id)
        setPublisher(authDeatils.pub_id)
        // console.log('pub_id', authDeatils.pub_id)
    },
        [authData, authDeatils])

    useEffect(() => {
        // console.log('location', location.state)

        if (location.state) {
            setBookid(location?.state?.BookId)
            if (location.state.bookstatus === 'Accepted') {
                setAccepted(true)
            }
            else {
                setAccepted(false)
            }

            console.log("Status of the book", location.state)
            bookData(location?.state?.BookId)
            setUpdate(true)
            // console.log(location?.state?.BookId)
        }


    },
        [location.state])

    const page_navigation = () => {

        const timer = setTimeout(() => {
            // console.log('setTimeout called!');
            navigate("/admin/booklisting");
            // window.location.reload()
        }, 4000);
        // window.location.reload()

        return () => clearTimeout(timer);
    }


    // const update_single_book = async (id) => {
    // console.log('update_single_id', id);
    // * Notification - Left

    const update_single_book = async (id) => {
        console.log('update_single_id', id);
        let formData = new FormData();

        formData.append('title', title)
        formData.append('description', description)
        formData.append('categoryid', categoryId)
        formData.append('publisherid', publisher)
        formData.append('authors', author)
        formData.append('editionno', editionNo)
        formData.append('isbn10', isbn10)
        formData.append('isbn13', isbn13)
        formData.append('languageid', languageId)
        formData.append('volume', volume)
        formData.append('yearofpublishing', year)
        formData.append('img', coverFront)
        // formData.append('price', price)
        formData.append('noofpages', pageNo)
        formData.append('covertype', coverType)
        formData.append('currencyid', currencyId)
        formData.append('effectivefrom', effectiveFrom)


        const resp = await updateSingleBook(bookid, formData)

        console.log('update_resp', resp)

        if (resp.data.statuscode === '0') {

            toast.success(" Book updated successfully", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                closeButton: false,
                theme: "light"
            });
            page_navigation();
        }
        else {
            toast.error("Book Updation failed", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                closeButton: false,
                style: { fontWeight: 'bold', backgroundColor: "rgb(255, 237, 246)" }
            });
        }

        

        // if (priceResp.data.statuscode === '0') {

        //     toast.success(" Book price updated successfully", {
        //         position: "top-center",
        //         autoClose: 2000,
        //         hideProgressBar: true,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         closeButton: false,
        //         theme: "light"
        //     });
        //     page_navigation();
        // }
        // else {
        //     toast.error("Book price Updation failed", {
        //         position: "top-center",
        //         autoClose: 2000,
        //         hideProgressBar: true,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         closeButton: false,
        //         style: { fontWeight: 'bold', backgroundColor: "rgb(255, 237, 246)" }
        //     });
        // }

    }
    // }

    const identify_filetype_no = (val) => {
        let arr = val
        console.log('val_arr',arr)

        setFileTypeBool(true)
        // let count = 0

        // for (let i = 0; i < val.length; i++) {
            if (arr.epdf_link && arr.epub_link) {
                console.log('pdf+epu')
                setFile('both')
                setFileType('both')
            }
            else if (arr.epdf_link) {
                console.log('pdf')
                setFile('pdf')
                setFileType('pdf')
            }
            else {
                console.log('epub')
                setFile('epub')
                setFileType('epub')
            }
        }
    

    

    const pub_date = (val) => {

        if (val !== undefined) {
            let mydate = new Date(val.split(' ')[0]);
            mydate = mydate.toISOString().split('T')[0]
            return mydate
        }
        else {
            return ''
        }

    }

    const bookData = async (book_id) => {
        // console.log("book_id", book_id)
        let resp = await get_book_details(book_id, authData)
        
        
        // identify_filetype_no(resp)
        // setPdfname(resp?.epdf_link === 'null' ? 'No File Uploaded' : resp.epdf_link)
        // setEpubname(resp?.epub_link === 'null' ? 'No File Uploaded' : resp.epub_link)

        setTitle(resp?.title);
        // setCoverType(resp?.covertype)
        setDescription(resp?.description);
        setCategoryId(resp?.categoryid);
        setPublisher(resp?.publisherid);
        setAuthor(resp?.authors);
        setEditionNo(resp?.editionno);
        setIsbn13(resp?.isbn13);
        setIsbn10(resp?.isbn10);
        setLanguageId(resp?.languageid);
        setCoverType(resp?.covertype);
        setCurrencyId(resp?.currencyid);
        setCoverFront(resp?.img)
        setVolume(resp?.volume);
        setReadOnly(true)
       
        // setCoverbacktext(resp?.back_cover)
        // setCoverfronttext(resp?.front_cover)
        // console.log('year', resp?.publishdate)



        setYear(resp?.yearofpublishing)

      
        setPrice(resp?.price);
        setPageNo(resp?.noofpages);
        // setEffectiveFrom(resp.effectivefrom);

    }

    const openModal = () => {
        setUploadBooksModal(true);
        setUpdate(false)
    }
    const closeModal = () => {
        setUploadBooksModal(false);
    }

    const check = (e) => {
        setAccepted(!accepted)
        setApproved(!approved)
        // console.log(e.target.checked)
    }


    // useEffect(() => {
    //     getPublisherList();
    // }, []);


    const getPublisherList = async () => {
        const response = await getAllPublishers();
        // console.log("Publishers : ", response?.data?.output);
        setPublisherList(response?.data?.output);
    }

    const csvFile = (e) => {
        setFileHandler(e.target.files[0]);
        // console.log("file uploaded : ", e.target.files[0]);
        // console.log("EVENT PASSED : ", e);
    }

    const uploadBooksBulk = async () => {
        const formData = new FormData();
        formData.append('book', fileHandler);
        closeModal();
        const response = await uploadBooksInBulk_admin(formData);
        console.log("Upload_Books_resp : ", response);
    }

    const Edition_no = (e) => {
        setEditionNo(e.target.value);
        // console.log("Edition No. : ", e.target.value)
    }

    const coverBackHandler = (e) => {
        // console.log("back image", URL.createObjectURL(e.target.files[0]))
        setCoverBack(e.target.files[0])
        setCoverbacktext('')
        // setImageUrl(URL.createObjectURL(e.target.files[0]))
        // `${Config.API_URL + Config.PROFILE_IMAGES + image}`
    }

    const categoryHandler = (e) => {
        setCatBool(true)
        setCategoryId(e.target.value)
    }

    const fileTypeSelect = (e) => {
        setPdfname('')
        setEpubname('')

        setFileTypeBool(true);
        // console.log("checking file type", e.target.value)
        setFileType(e.target.value)
    }

    const publishingDate = (e) => {
        setYear(e.target.value);
        console.log("Publishing_Date : ", e.target.value)
    }

    const coverFrontHandler = (e) => {
        console.log("front image", e.target.files[0])
        console.log("cover", e)
        setCoverFront(e.target.files[0])
        // setCoverfronttext('')
        // setImageUrl(URL.createObjectURL(e.target.files[0]))
        // `${Config.API_URL + Config.PROFILE_IMAGES + image}`
    }

    // const get_pub_info = async (id) => {
    //     console.log("pub_upload", id);
    //     const resp = await get_pub_details(id)
    //     setPublisher(resp?.data?.output?.name)


    // }

    const pdf_epub_handler = (e) => {
        let file_ext = e.target.value.split('.')[1]
        // console.log("epub_pdf", e.target.value.split('.')[1])
        if (file_ext === 'pdf') {
            setPdfFile(e.target.files[0])
        }
        else {
            setEpubFile(e.target.files[0])
        }

        // setImageUrl(URL.createObjectURL(e.target.files[0]))
        // `${Config.API_URL + Config.PROFILE_IMAGES + image}`
    }

    const pdfHandler = (e) => {
        // console.log("pdf", URL.createObjectURL(e.target.files[0]))
        setPdfFile(e.target.files[0])
        setPdfname('')
        // console.log("pdf", e.target.files[0])
        // setImageUrl(URL.createObjectURL(e.target.files[0]))
        // `${Config.API_URL + Config.PROFILE_IMAGES + image}`
    }

    const epubHandler = (e) => {
        // console.log("epub", URL.createObjectURL(e.target.files[0]))
        setEpubFile(e.target.files[0])
        setEpubname('')
        // setImageUrl(URL.createObjectURL(e.target.files[0]))
        // `${Config.API_URL + Config.PROFILE_IMAGES + image}`
    }

    const uploadBook = async () => {


        let formData = new FormData();

        formData.append('title', title)
        formData.append('description', description)
        formData.append('categoryid', categoryId)
        formData.append('publisherid', publisher)
        formData.append('authors', author)
        formData.append('editionno', editionNo)
        formData.append('isbn10', isbn10)
        formData.append('isbn13', isbn13)
        formData.append('languageid', languageId)
        formData.append('volume', volume)
        formData.append('yearofpublishing', year)
        formData.append('covertype', coverType)
        formData.append('img', coverFront)
        formData.append('price', price)
        formData.append('noofpages', pageNo)
        formData.append('currencyid', currencyId)
        formData.append('effectivefrom', effectiveFrom)

        const resp = await uploadSingleBook(formData);
        console.log("upload_single_book_resp", resp)
        if (resp?.data?.statuscode === '0') {

            toast.success(" Book Uploaded successfully", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                closeButton: false,
                theme: "light"
            });

            page_navigation();
        }
        else {
            toast.error("Book Upload failed", {
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


    }

    

    return (
        <>
            <SideMenu />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <Header title="Upload Books" />
                {/* <div className="bg-white p-3 m-3 rounded-2">
                    <button type="button" className="btn btn-main" onClick={openModal}>Upload Books In Bulk</button>
                </div> */}
                <div className="m-3">
                    <div className="bg-white p-3 rounded-2">
                        <form>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <label for="isbn" className="form-label">ISBN 13 <span className="red"> *</span></label>
                                        <input type="text" className="form-control" id="isbn_id" placeholder="Enter ISBN 13" value={isbn13} onChange={(e) => setIsbn13(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label for="pubName" className="form-label">Publisher Name<span className="red">*</span></label>
                                        <select className="form-select" aria-label="Default select publisher name" onChange={(e) => setPublisher(e.target.value)} required>
                                            <option disabled selected>--Select--</option>
                                            {
                                                allPublisher.map((data, index) => (

                                                    <option value={data.id} key={index} selected={publisher === data.id ? true : false}>{data.name}</option>

                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label for="currency" className="form-label">Currency
                                         {/* <span className="red"> *</span> */}
                                         </label>
                                        <select className="form-select" aria-label="Default select currency" 
                                        onChange={(e) => setCurrencyId(e.target.value)} 
                                        // required
                                        >
                                            <option selected value='0'>--Select--</option>
                                            {currencies.map((data) => (
                                                <option value={data.id} key={data.id} selected={currencyId === data.id ? true : false}>{data.symbol}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label for="authorName" className="form-label">Author<span className="red"> *</span></label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Author Name" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                                    </div>
                                    <div className="mb-3">
                                        <label for="edition" className="form-label">Edition</label>
                                        <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="Enter Book Edition" value={editionNo} onChange={(e) => Edition_no(e)} />
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label for="edition" className="form-label">No. of Pages</label>
                                        <input type="number" className="form-control" id="exampleFormControlInput1" value={pageNo} placeholder="Enter no of pages" onChange={(e) => setPageNo(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <label for="isbn" className="form-label">ISBN 10 </label>
                                        <input type="text" className="form-control" id="isbn_id" placeholder="Enter ISBN 10" value={isbn10} onChange={(e) => setIsbn10(e.target.value)} required />
                                    </div>


                                    <div className="mb-3">
                                        <label for="vol" className="form-label">Volumes</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Volume no." value={volume} onChange={(e) => setVolume(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label for="listPrice" className="form-label">Price<span className="red"> *</span></label>
                                        <input type="text" readOnly={readOnly} className="form-control" id="exampleFormControlInput1" placeholder="Enter Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                                    </div>
                                    <div className="mb-3">
                                        <label for="genre" className="form-label">Category<span className="red"> *</span></label>
                                        <select className="form-select" aria-label="Default select genre" onChange={(e) => categoryHandler(e)} required>
                                            <option selected disabled>--Select--</option>
                                            {
                                                categoryList.map((data, index) => (

                                                    <option value={data.id} key={index} selected={categoryId === data.id ? true : false}>{data.name}</option>

                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label for="genre" className="form-label">Choose Cover Type<span className="red"> *</span></label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Book Title" value={coverType} 
                                        onChange={(e) => setCoverType(e.target.value)} 
                                        // required 
                                        />
                                        
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label for="language" className="form-label">Language <span className="red"> *</span></label>
                                        <select className="form-select" aria-label="Default select language" onChange={(e) => setLanguageId(e.target.value)} required>
                                            <option selected disabled>--Select--</option>
                                            {languages.map((data) => (
                                                <option value={data.id} key={data.id} selected={languageId === data.id ? true : false}>{data.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    
                                </div>
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <label for="exampleFormControlInput1" className="form-label">Title<span className="red"> *</span></label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Book Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                                    </div>

                                    
                                    <div className="mb-3">
                                        <label for="pubYear" className="form-label">Year of Publishing<span className="red"> *</span></label>
                                        <input type="text" className="form-control" id="pub_year" placeholder="Enter Year of Publishing" value={year} onChange={(e) => publishingDate(e)} required />
                                    </div>
                                    {/* <div className="mb-3">
                                        <label for="pages" className="form-label">Pages</label>
                                        <input type="number" className="form-control" id="pages" placeholder="500" />
                                    </div> */}
                                    <div className="mb-3">
                                        <label for="Year" className="form-label">Effective From the Date<span className="red"> *</span></label>
                                        <input type="date" readOnly={readOnly} className="form-control" id="eff_date" value={effectiveFrom} placeholder="Enter effective date" onChange={(e) => setEffectiveFrom(e.target.value)} required />
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label for="covFront" className="form-label"> Book Cover  &nbsp; &nbsp; 
                                        {/* <span className="red" style={{ fontSize: '11px' }}> 
                                        {coverFront === 'null' ? 'No File Uploaded' : coverFront} </span> */}
                                        </label>
                                        <input className="form-control" type="file" accept=".jpg, .png, .jpeg, .svg" onChange={(e) => coverFrontHandler(e)}  />
                                    </div>

                                    


                                    <div className="mb-3">
                                        <label for="aboutAuthor" className="form-label">Description</label>
                                        <textarea className="form-control" id="titleRemTextarea1" value={description} rows="2" onChange={(e) => setDescription(e.target.value)}></textarea>
                                        {/* <ReactQuill placeholder="Enter Description here..."
                                            theme="snow"
                                            value={description}
                                            onChange={setDescription} /> */}




                                    </div >
                                </div>
                                <div className="form-check ms-3">
                                    <label className="form-check-label" >
                                        Is approved ?<span className="red"> *</span>
                                    </label>
                                    <input className="form-check-input" type="checkbox"
                                        checked={accepted === true ? true : false}
                                        id="flexCheckDefault"
                                        onChange={(e) => check(e)}
                                        required />
                                </div>

                            </div>
                            <div className="border border-1 mt-5 mb-3"></div>
                            <div className="d-flex justify-content-end">
                                {
                                    update === true ? (<button type="button" className="btn btn-main me-2"  style={{width:'10%'}} onClick={() => update_single_book(bookid)}>Update</button>) :

                                        (<button type="button" className="btn btn-main me-2" style={{width:'10%'}}  onClick={() => uploadBook()}>Save</button>)

                                }

                                <button type="button" className="btn btn-outline-secondary">Cancel</button>
                            </div>
                        </form>
                    </div>
                    {/* =========Upload Books Modal========= */}
                    {/* <Modal show={uploadBooksModal} onHide={closeModal} centered
                        backdrop="static"
                        dialogClassName="upload-books-modal"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Upload books in bulk</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="mb-1">
                                
                                <div className="mb-1">
                                    <label className="form-label">Upload CSV file </label>
                                    <div className="input-group my-2 d-flex justify-content-between align-items-center">
                                        
                                        <input type="file" accept=".xlsx, .csv"
                                            className="form-control" id="fileUpload"
                                            onChange={csvFile}
                                        />
                                    </div>
                                    <div className="input-group my-2 d-flex justify-content-between align-items-center">
                                        
                                        <a href={Format} download="CSV-Format-Document" target="_blank" rel="noopener noreferrer">Download Format</a>
                                    </div>
                                </div>


                               

                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-main" onClick={uploadBooksBulk} style={{width:'10%'}}>
                                
                                Save
                            </button>
                        </Modal.Footer>
                    </Modal> */}
                </div>

                <ToastContainer />

            </div>

        </>
    );
}

export default UploadBooks;