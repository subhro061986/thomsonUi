import React, { useEffect, useState, } from "react";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Header from "../../Layout/Header";
import SideMenu from "../../Layout/SideMenu";
import { Modal } from "react-bootstrap";
import SVG from "react-inlinesvg";
import saveIcon from '../../assets/icons/save.svg';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AdminProfile } from "../../Context/AdminContext";
import { useAuth } from "../../Context/AuthContext";
// import editIcon from '../../assets/icons/editicon.svg';
// import trashIcon from '../../assets/icons/deleteicon.svg';
import Format from "../../assets/book-upload-format/CSV_Format_For_Bulk_Upload.csv";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UploadBooksPub = () => {

    const { get_all_countries, categoryList, get_pub_details, languages, uploadSingleBook, updateSingleBook, get_book_details } = AdminProfile();
    const { authDeatils, authData } = useAuth();
    const navigate = useNavigate();

    const [uploadBooksModal, setUploadBooksModal] = useState(false);
    const [fileType, setFileType] = useState('');
    const [fileTypeBool, setFileTypeBool] = useState(false);
    const [catBool, setCatBool] = useState(false);
    const [countries, setCountries] = useState([]);
    const [fileHandler, setFileHandler] = useState(null);




    const [country, setCountry] = useState(0);
    const [coverFront, setCoverFront] = useState(null)
    const [coverBack, setCoverBack] = useState(null)
    const [isbn13, setIsbn13] = useState('');
    const [isbn10, setIsbn10] = useState('');
    const [title, setTitle] = useState('');
    const [publisher, setPublisher] = useState(0);
    const [volume, setVolume] = useState(0);
    const [year, setYear] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState(0);
    const [coupon, setCoupon] = useState('');
    const [editionNo, setEditionNo] = useState(0);
    const [categoryId, setCategoryId] = useState(0);
    const [subcategory, setSubcategory] = useState('');
    const [languageId, setLanguageId] = useState(0);
    const [description, setDescription] = useState('');
    const [pdffile, setPdfFile] = useState('');
    const [epubfile, setEpubFile] = useState('');
    const [pageNo, setPageNo] = useState(0);
    const [effectiveFrom, setEffectiveFrom] = useState('');

    const [coverfronttext, setCoverfronttext] = useState('')
    const [coverbacktext, setCoverbacktext] = useState('')

    const [update, setUpdate] = useState(false)

    // const [accepted, setAccepted] = useState(false)
    // const [approved, setApproved] = useState(false)
    const [file, setFile] = useState('')
    const [pdfname, setPdfname] = useState('')
    const [epubname, setEpubname] = useState('')
    const [bookid, setBookid] = useState(0)

    const location = useLocation()

    useEffect(() => {
        setFileTypeBool(false);
        get_pub_info(authDeatils.pub_id)
        setPublisher(authDeatils.pub_id)
    },
        [authData, authDeatils])

    useEffect(() => {
        console.log('location', location.state)

        if (location.state) {
            setBookid(location?.state?.BookId)
            // if (location.state.bookstatus === 'Accepted') {
            //     setAccepted(true)
            // }
            // else {
            //     setAccepted(false)
            // }

            console.log("Status of the book", location.state)
            bookData(location?.state?.BookId)
            setUpdate(true)
            // console.log(location?.state?.BookId)
        }


    },
        [location.state])

    const openModal = () => {
        setUploadBooksModal(true);
        setUpdate(false)
    }
    const closeModal = () => {
        setUploadBooksModal(false);
    }

    // const check = (e) =>{
    //     setAccepted(!accepted)
    //     setApproved(!approved)
    //     console.log(e.target.checked)
    // }

    const fileTypeSelect = (e) => {
        setPdfname('')
        setEpubname('')

        setFileTypeBool(true);
        console.log("checking file type", e.target.value)
        setFileType(e.target.value)
    }

    const get_countries = async () => {
        const resp = await get_all_countries()


        if (resp !== undefined) {

            if (resp.data.statuscode === '0') {
                console.log("countries ", resp.data.output)
                setCountries(resp.data.output)
            }
        }

        else {
            setCountries([])
        }

    }



    const select_country = async (e) => {
        console.log("country_id", e.target.value)
        setCountry(e.target.value)
    }


    const coverBackHandler = (e) => {
        console.log("back image", URL.createObjectURL(e.target.files[0]))
        setCoverBack(e.target.files[0])
        // setImageUrl(URL.createObjectURL(e.target.files[0]))
        // `${Config.API_URL + Config.PROFILE_IMAGES + image}`
    }

    const coverFrontHandler = (e) => {
        console.log("front image", URL.createObjectURL(e.target.files[0]))
        setCoverFront(e.target.files[0])
        // setImageUrl(URL.createObjectURL(e.target.files[0]))
        // `${Config.API_URL + Config.PROFILE_IMAGES + image}`
    }

    const pdfHandler = (e) => {
        console.log("pdf", URL.createObjectURL(e.target.files[0]))
        setPdfFile(e.target.files[0])
        console.log("pdf", e.target.files[0])
        // setImageUrl(URL.createObjectURL(e.target.files[0]))
        // `${Config.API_URL + Config.PROFILE_IMAGES + image}`
    }

    const epubHandler = (e) => {
        console.log("epub", URL.createObjectURL(e.target.files[0]))
        setEpubFile(e.target.files[0])
        // setImageUrl(URL.createObjectURL(e.target.files[0]))
        // `${Config.API_URL + Config.PROFILE_IMAGES + image}`
    }

    const pdf_epub_handler = (e) => {
        let file_ext = e.target.value.split('.')[1]
        console.log("epub_pdf", e.target.value.split('.')[1])
        if (file_ext === 'pdf') {
            setPdfFile(e.target.files[0])
        }
        else {
            setEpubFile(e.target.files[0])
        }

        // setImageUrl(URL.createObjectURL(e.target.files[0]))
        // `${Config.API_URL + Config.PROFILE_IMAGES + image}`
    }

    const categoryHandler = (e) => {
        setCatBool(true)
        setCategoryId(e.target.value)
    }

    const get_pub_info = async (id) => {
        console.log("pub_upload", id);
        const resp = await get_pub_details(id)
        setPublisher(resp?.data?.output?.name)


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
        formData.append('epdf_link', pdffile)
        formData.append('epub_link', epubfile)
        formData.append('volume', volume)
        formData.append('yearofpublishing', year)
        formData.append('frontcoverimage', coverFront)
        formData.append('backcoverimage', coverBack)
        formData.append('price', price)
        formData.append('noofpages', pageNo)
        // formData.append('createdby', description)
        formData.append('effectivefrom', effectiveFrom)

        const resp = await uploadSingleBook(formData);
        console.log("upload_single_book_resp", resp)
        if (resp.data.statuscode === '0') {

            toast.success(" Book Uploaded successfully", {
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
            toast.error("Book Upload failed", {
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
        // page_navigation();
        // navigate("/booklistpub");

    }

    const page_navigation = () => {

        const timer = setTimeout(() => {
            console.log('setTimeout called!');
            navigate("/booklistpub");
        }, 4000);

        return () => clearTimeout(timer);
    }

    


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

        let mydate = new Date(val.split(' ')[0]);
        mydate = mydate.toISOString().split('T')[0]

        return mydate
    }

    const bookData = async (book_id) => {
        console.log("book_id", book_id)
        let resp = await get_book_details(book_id, authData)
       

        console.log('book_det_resp', resp)
        // identify_filetype_no(Object.keys(resp))
        identify_filetype_no(resp)
        setPdfname(resp?.epdf_link === 'null' ? 'No File Uploaded' : resp?.epdf_link)
        setEpubname(resp?.epub_link === 'null' ? 'No File Uploaded' : resp?.epub_link)

        setTitle(resp?.title);
        setDescription(resp?.description);
        setCategoryId(resp?.categoryid);
        setPublisher(resp?.publisher);
        setAuthor(resp?.authors);
        setEditionNo(resp?.editionno);
        setIsbn13(resp?.isbn13);
        setIsbn10(resp?.isbn10);
        setLanguageId(resp?.languageid);
        // console.log('lang_id',resp?.languageId)
        setPdfFile(resp?.epdf_link);
        setEpubFile(resp?.epub_link);
        setVolume(resp?.volume);

        setCoverfronttext(resp?.front_cover)
        setCoverbacktext(resp?.back_cover)

        console.log('year', resp?.publishdate)



        // setYear(pub_date(resp?.publishdate))
        setYear(resp?.yearofpublishing)

        // setCoverFront(resp?.images[0]);
        // setCoverBack(resp?.images[1]);
        setPrice(resp?.price);
        setPageNo(resp?.noofpages);
        // setEffectiveFrom(pub_date(resp?.effectivefrom));

    }

    const update_single_book = async (id) => {
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
        formData.append('epdf_link', pdffile)
        formData.append('epub_link', epubfile)
        formData.append('volume', volume)
        formData.append('yearofpublishing', year)
        formData.append('frontcoverimage', coverFront)
        formData.append('backcoverimage', coverBack)
        formData.append('price', price)
        formData.append('noofpages', pageNo)
        // formData.append('createdby', description)
        formData.append('effectivefrom', effectiveFrom)


        const resp = await updateSingleBook(bookid, formData)

        console.log('update_resp', resp)

        if (resp !== undefined) {

            if (resp.data.statuscode === '0') {

                toast.success("Book Updated successfully", {
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
        }
    }




    const { uploadBooksInBulk_admin } = AdminProfile();

    const csvFile = (e) => {
        setFileHandler(e.target.files[0]);
        console.log("file uploaded : ", e.target.files[0]);
        console.log("EVENT PASSED : ", e);
    }

    const uploadBooksBulk = async () => {
        const formData = new FormData();
        formData.append('book', fileHandler);
        closeModal();
        const response = await uploadBooksInBulk_admin(formData);
        console.log("Upload_Books_resp : ", response);
    }

    const publishingDate = (e) => {
        setYear(e.target.value);
        console.log("Publishing_Date : ", e.target.value)
    }

    const Edition_no = (e) => {
        setEditionNo(e.target.value);
        console.log("Edition No. : ", e.target.value)
    }

    return (
        <>
            <SideMenu />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <Header title="Upload Books" />
                <div className="bg-white p-3 m-3 rounded-2">
                    <button type="button" className="btn btn-main" onClick={openModal}>Upload Books In Bulk</button>
                </div>
                <div className="m-3">
                    <div className="bg-white p-3 rounded-2">
                        <form>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <label for="isbn" className="form-label">ISBN 13<span className="red"> *</span></label>
                                        <input type="text" className="form-control" id="isbn_id" value={isbn13} placeholder="Enter ISBN 13" onChange={(e) => setIsbn13(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label for="pubName" className="form-label">Publisher</label>
                                        <input type="text" className="form-control" id="pubName" value={publisher} onChange={(e) => setPublisher(e.target.value)} disabled />
                                        {/* <select className="form-select" aria-label="Default select publisher name" required>
                                            <option selected>--Select--</option>
                                            <option value="1">Ananda Publishers</option>
                                            <option value="2">HarperCollins</option>
                                            <option value="3">Macmillan Publishers</option>
                                        </select> */}
                                    </div>
                                    <div className="mb-3">
                                        <label for="authorName" className="form-label">Author<span className="red"> *</span></label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" value={author} placeholder="Enter Author Name" onChange={(e) => setAuthor(e.target.value)} required />
                                    </div>
                                    <div className="mb-3">
                                        <label for="edition" className="form-label">Edition</label>
                                        <input type="number" className="form-control" id="exampleFormControlInput1" value={editionNo} placeholder="Enter Book Edition" onChange={(e) => Edition_no(e)} />
                                    </div>

                                    <div className="mb-3">
                                        <label for="covBack" className="form-label">Cover Back &nbsp; &nbsp; <span className="red" style={{ fontSize: '11px' }}> {coverbacktext === 'null' ? 'No File Uploaded' : coverbacktext} </span></label>
                                        <input className="form-control" type="file" id="formFile" accept=".jpg, .png, .jpeg, .svg" onChange={(e) => coverBackHandler(e)} />
                                    </div>

                                    <div className="mb-3">
                                        <label for="edition" className="form-label">No. of Pages</label>
                                        <input type="number" className="form-control" id="exampleFormControlInput1" value={pageNo} placeholder="Enter no of pages" onChange={(e) => setPageNo(e.target.value)} />
                                    </div>
                                    {/* <div className="mb-3">
                                        <label for="bookType" className="form-label">Book Type</label>
                                        <select className="form-select" aria-label="Default select book type">
                                            <option selected>Select book type</option>
                                            <option value="1">Nonfiction</option>
                                            <option value="2">Fiction</option>
                                            <option value="3">Study</option>
                                        </select>
                                    </div> */}
                                    {/* <div className="mb-3">
                                        <label for="exampleFormControlInput1" className="form-label">Discount</label>
                                        <select className="form-select" aria-label="Default select discount">
                                            <option selected>--Select--</option>
                                            <option value="1">10%</option>
                                            <option value="2">20%</option>
                                            <option value="3">30%</option>
                                        </select>
                                    </div> */}
                                    {/* <div className="mb-3">
                                        <label for="exampleFormControlInput1" className="form-label">Sub Category</label>
                                        <select className="form-select" aria-label="Default select subcategory">
                                            <option selected>--Select--</option>
                                            <option value="1">Cookbook</option>
                                            <option value="2">Fairytale</option>
                                            <option value="3">Science</option>
                                        </select>
                                    </div> */}
                                    {/* <div className="mb-3">
                                        <label for="exampleFormControlInput1" className="form-label">Product dimensions</label>
                                        <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="124 X 164" />
                                    </div> */}
                                    {/* <div className="mb-3">
                                        <label for="country" className="form-label">Country Origin<span className="red"> *</span></label>
                                        <select className="form-select publisher-profile-select" aria-label="Select country" onChange={(e) => select_country(e)}>


                                            <option disabled>--Select--</option>

                                            {
                                                countries && countries.map((data) => (

                                                    <option key={data.id} value={data.id}>{data.name}</option>


                                                ))}

                                        </select>
                                    </div> */}

                                </div>
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <label for="isbn" className="form-label">ISBN 10</label>
                                        <input type="text" className="form-control" id="isbn_id" value={isbn10} placeholder="Enter ISBN 10" onChange={(e) => setIsbn10(e.target.value)} required />
                                    </div>


                                    <div className="mb-3">
                                        <label for="vol" className="form-label">Volumes</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" value={volume} placeholder="Enter Volume no." onChange={(e) => setVolume(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label for="listPrice" className="form-label">Price<span className="red"> *</span></label>
                                        <input type="number" className="form-control" id="exampleFormControlInput1" value={price} placeholder="Enter Price" onChange={(e) => setPrice(e.target.value)} required />
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
                                    {/* <div className="mb-3">
                                        <label for="exampleFormControlInput1" className="form-label">Practice Area</label>
                                        <select className="form-select" aria-label="Default select genre">
                                            <option selected>--Select--</option>
                                            <option value="1">Administrative Law</option>
                                            <option value="2">Governments</option>
                                            <option value="3">Medical</option>
                                        </select>
                                    </div> */}

                                    <div className="mb-3">
                                        <label for="genre" className="form-label">Choose File Type<span className="red"> *</span></label>
                                        <select className="form-select" aria-label="Default select genre" onChange={(e) => fileTypeSelect(e)} required>
                                            <option selected disabled>--Select--</option>
                                            <option selected={file === 'pdf' ? true : false} value="pdf">PDF</option>
                                            <option selected={file === 'epub' ? true : false} value="epub">EPUB</option>
                                            <option selected={file === 'both' ? true : false} value="both">Both</option>
                                        </select>
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

                                    {/* <div className="mb-3">
                                        <label for="exampleFormControlInput1" className="form-label">Title Description</label>
                                        <textarea className="form-control" id="titleDesTextarea1" rows="2"></textarea>
                                    </div> */}
                                </div>
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <label for="exampleFormControlInput1" className="form-label">Title<span className="red"> *</span></label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" value={title} placeholder="Enter Book Title" onChange={(e) => setTitle(e.target.value)} required />
                                    </div>

                                    {/* <div className="mb-3">
                                        <label for="titleRem" className="form-label">Title Remarks</label>
                                        <textarea className="form-control" id="titleRemTextarea1" rows="2"></textarea>
                                    </div> */}
                                    <div className="mb-3">
                                        <label for="pubYear" className="form-label">Year of Publishing<span className="red"> *</span></label>
                                        <input type="text" className="form-control" id="pub_year" value={year} placeholder="Enter Publishing Year" onChange={(e) => publishingDate(e)} required />
                                    </div>
                                    <div className="mb-3">
                                        <label for="Year" className="form-label">Effective From the Date<span className="red"> *</span></label>
                                        <input type="date" className="form-control" id="eff_date" value={effectiveFrom} placeholder="Enter effective date" onChange={(e) => setEffectiveFrom(e.target.value)} required />
                                    </div>
                                    {/* <div className="mb-3">
                                        <label for="pages" className="form-label">Pages</label>
                                        <input type="number" className="form-control" id="pages" placeholder="500" />
                                    </div> */}
                                    {/* <div className="mb-3">
                                        <label for="disType" className="form-label">Select Coupon</label>
                                        <select className="form-select" aria-label="Default select discount types" onChange={(e) => setCoupon(e.target.value)}>
                                            <option selected disabled>--Select--</option>
                                            <option value="1">Seasonal discount</option>
                                            <option value="2">Bulk discount</option>
                                            <option value="3">Prepayment discount</option>
                                        </select>
                                    </div> */}
                                    {/* <div className="mb-3">
                                        <label for="category" className="form-label">Sub Category<span className="red"> *</span></label>
                                        <select className="form-select" aria-label="Default select category" onChange={(e) => setSubcategory(e.target.value)} required
                                            disabled={catBool === false ? true : false}
                                        >
                                            <option selected disabled>--Select--</option>
                                            <option value="1">Fantasy</option>
                                            <option value="2">Self-help book</option>
                                            <option value="3">Biography</option>
                                        </select>
                                    </div> */}

                                    <div className="mb-3">
                                        <label for="covFront" className="form-label">Cover Front  &nbsp; &nbsp; <span className="red" style={{ fontSize: '11px' }}> {coverfronttext === 'null' ? 'No File Uploaded' : coverfronttext} </span></label>
                                        <input className="form-control" type="file" accept=".jpg, .png, .jpeg, .svg" onChange={(e) => coverFrontHandler(e)} id="formFile" />
                                    </div>

                                    {
                                        fileTypeBool === true ? (fileType !== 'both' ? (
                                            <div className="mb-3">
                                                <label for="covBack" className="form-label" >{fileType === 'epub' ? 'Upload EPUB File' : 'Upload PDF File'}<span className="red" style={{ fontSize: '11px' }}> * {fileType === 'epub' ? epubname : pdfname}</span></label>
                                                <input className="form-control" type="file" accept={fileType === 'epub' ? '.epub' : '.pdf'} id="formFile" onChange={(e) => pdf_epub_handler(e)} required disabled={fileTypeBool === true ? false : true} />
                                            </div>
                                        ) : (
                                            <div className="mb-3">
                                                <label for="covBack" className="form-label">Upload EPUB File<span className="red" style={{ fontSize: '11px' }}> * {epubname}</span></label>
                                                <input className="form-control" type="file" accept=".epub" id="formFile" onChange={(e) => epubHandler(e)} required disabled={fileTypeBool === true ? false : true} />
                                                <label for="covBack" className="form-label mt-3">Upload PDF File<span className="red" style={{ fontSize: '11px' }}> * {pdfname}</span></label>
                                                <input className="form-control" type="file" accept=".pdf" id="formFile" onChange={(e) => pdfHandler(e)} required disabled={fileTypeBool === true ? false : true} />
                                            </div>
                                        )) : (
                                            <div className="mb-3">
                                                <label for="covBack" className="form-label">Upload File<span className="red"> *</span>&nbsp;&nbsp;&nbsp;<span style={{ color: 'red' }}>{fileTypeBool === false ? 'Select file type' : ''}</span></label>
                                                <input className="form-control" type="file" id="formFile" required disabled={fileTypeBool === true ? false : true} />

                                            </div>
                                        )
                                    }




                                    <div className="mb-3">
                                        <label for="aboutAuthor" className="form-label">Description</label>
                                        <textarea className="form-control" id="titleRemTextarea1" value={description} rows="2" onChange={(e) => setDescription(e.target.value)}></textarea>
                                        {/* <ReactQuill placeholder="Enter Description here..."
                                            theme="snow"
                                            value={description}
                                            onChange={setDescription} /> */}




                                    </div >
                                </div >
                                {/* <div className="form-check ms-3">
                                    <label className="form-check-label">
                                        Is approved ?<span className="red"> *</span>
                                    </label>
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" required />
                                </div> */}
                            </div >
                            <div className="border border-1 mt-5 mb-3"></div>
                            <div className="d-flex justify-content-end">
                                {
                                    update === true ? (<button type="button" className="btn btn-main me-2" onClick={() => update_single_book(bookid)}>Update</button>) :

                                        (<button type="button" className="btn btn-main me-2" onClick={() => uploadBook()}>Save</button>)

                                }
                                <button type="button" className="btn btn-outline-secondary">Cancel</button>
                            </div>
                        </form >
                    </div >
                    {/* =========Upload Books Modal========= */}
                    <Modal Modal show={uploadBooksModal} onHide={closeModal} centered
                        backdrop="static"
                        dialogClassName="upload-books-modal"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Upload books in bulk</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="mb-1">
                                <label className="form-label">Upload CSV file </label>
                                <div className="input-group my-2 d-flex justify-content-between align-items-center">
                                    {/* <label className="form-label">Upload CSV</label> */}
                                    <input type="file" accept=".xlsx, .csv" className="form-control" id="fileUpload" onChange={csvFile} />
                                </div>
                                <div className="input-group my-2 d-flex justify-content-between align-items-center">
                                    {/* <button className="btn btn-primary">
                                        Download Format
                                    </button> */}
                                    <a href={Format} download="CSV-Format-Document" target="_blank" rel="noopener noreferrer">Download Format</a>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-success" onClick={uploadBooksBulk}>
                                <SVG src={saveIcon} style={{ marginRight: 10 }} width={15} /> Save
                            </button>
                        </Modal.Footer>
                    </Modal>
                </div >

                <ToastContainer />

            </div >

        </>
    );
}

export default UploadBooksPub;