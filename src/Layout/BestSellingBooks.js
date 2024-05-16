import React, { useEffect, useState, } from "react";
import wishlight from "../Assets/Images/wishlight.png";
import wishlistedicon from "../Assets/Images/wishlistedicon.png";
import bbook1 from "../Assets/Images/bbook1.png";
import bbook2 from "../Assets/Images/bbook2.png";
import bbook3 from "../Assets/Images/bbook3.png";
import bbook4 from "../Assets/Images/bbook4.png";
import publogo from "../Assets/Images/publogo.png";
import dummy from "../Assets/Images/dummy.png";
import { useAuth } from '../Context/Authcontext';
import { UserProfile } from "../Context/Usercontext";

import { useNavigate } from 'react-router-dom';
import Config from "../Config/Config.json"


import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const BestSellingBooks = () => {
    const navigate = useNavigate();

    const { best_selling_books, add_delete_to_wishlist, publisherData,allBestSeller } = UserProfile()
    const { wishlistshow } = useAuth()

    const [bestselling, setBestSelling] = useState([])

    useEffect(() => {
        //Best_Selling()
        
    }, [])

    const gotoDetails = (book_id) => {
        navigate('/productdetails', { state: { BOOK_ID: book_id } })
    }

    // const Best_Selling = async () => {
    //     let records_no = 4
    //     const resp = await best_selling_books(records_no)
        

    //     if (resp === undefined || resp === null) {
    //         setBestSelling([])
    //     }
    //     else {
    //         if (resp.statuscode === "0" && resp.output.length > 0) {
    //             setBestSelling(resp.output)
    //         }
    //         else {
    //             setBestSelling([])
    //         }
    //     }


    // }



    const Wishlist = (event, book_id) => {
        event.stopPropagation()
        if (wishlistshow === true) {
            Add_To_Wishlist(book_id)
        }
        else {
            navigate('/login')
        }

    }


    const Add_To_Wishlist = async (book_id) => {
        let json = {

            "bookid": book_id,
            "currentPage": 1,
            "recordPerPage": 5

        }
        const resp = await add_delete_to_wishlist(json)
        //Best_Selling() 
    }


    return (
        <div className="p-5 best_book_section">
            <div className="pub_name">{publisherData.name}</div>
            <div className="section_head mb-5 fw500"><span className="fw600">Best Sellers</span></div>
            <div className="row mx-3">
                {/* <img src={publogo} className="publogo" height={70} width={70} /> */}
                {/* {console.log('bestselling book', bestselling)} */}

                <Carousel
                    responsive={responsive}
                    //autoPlay={true}
                    //autoPlaySpeed={2000}
                    infinite={true}
                >

                    {
                        allBestSeller.map((data, index) => (
                            
                            <div key={index}
                                className="col-md border border-white bg-white rounded-4 book_card h380 m-3"
                                onClick={() => { gotoDetails(data.id) }}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="d-flex flex-column">
                                    <div className="d-flex justify-content-end mt-2 me-2" onClick={(e) => Wishlist(e, data.id)}>
                                        {
                                            data.isFavourite === 1 ? (<img src={wishlistedicon} width={27} height={27} />)
                                                :
                                                (<img src={wishlight} width={27} height={27} />)
                                        }
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <img 
                                            src={data.image === null || data.image === '' ? dummy : Config.API_URL + Config.PUB_IMAGES + data.publisherid + "/" + data.image + '?d=' + new Date()} 
                                            width={120} height={170} 
                                            loading="lazy"
                                            />
                                    </div>
                                    <div className="d-flex justify-content-center book_name mx-2 mt-3">{data.title.length > 21 ? data.title.substring(0, 21) + ".." : data.title}</div>
                                    {/* <div className="d-flex justify-content-center pub_name">Publisher: <span className="pub_span">Spring & River</span></div> */}
                                    <div className="d-flex justify-content-center author_name mt-2">Author: {data.authors?.length > 0 ? data.authors : "Not Found"}</div>
                                    <div className="d-flex justify-content-center price_style mt-3">&#8377;{data.price !== null ? data.price : "Not Available"}</div>
                                </div>
                            </div>

                        ))}


                </Carousel>


            </div>
            {/* <div className="d-flex justify-content-center mt-5">
                <button type="button" className="btn btn-outline-secondary rounded-pill view_all_books d-flex justify-content-center align-items-center py-2">View all Books</button>
            </div> */}
        </div>
    );
}

export default BestSellingBooks;