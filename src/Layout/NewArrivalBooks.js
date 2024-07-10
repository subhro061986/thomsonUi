import React, { useEffect, useState, } from "react";

import wishlight from "../Assets/Images/wishlight.png";
import wishlistedicon from "../Assets/Images/wishlistedicon.png";
import nbook1 from "../Assets/Images/nbook1.png";
import dummy from "../Assets/Images/dummy.png";
import book3 from "../Assets/Images/book3.png";
import book4 from "../Assets/Images/book4.png";

import Config from "../Config/Config.json"

import { UserProfile } from "../Context/Usercontext";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/Authcontext';

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

const NewArrivalBooks = () => {
    const navigate = useNavigate();

    const goToProductDetails = () => {
        navigate('/productdetails')
    }

    const { getNewArrivals, add_delete_to_wishlist, wishlistitems, publisherData, allNewArrival } = UserProfile()
    const { wishlistshow } = useAuth()

    const [newarrival, setNewarrival] = useState([])


    // useEffect(() => {

    // }, [pubid])

    // useEffect(() => {

    // }, [allNewArrival])



    const gotoDetails = (book_id) => {
        navigate('/productdetails', { state: { BOOK_ID: book_id } })
    }


    // const New_arrival = async () => {
    //     let records_no = 4
    //     const resp = await getNewArrivals(records_no,pubid)
    //     console.log("CALL CHECK",resp)
    //     if (resp === undefined || resp === null) {
    //         setNewarrival([])
    //     }
    //     else {
    //         if (resp.statuscode === "0" && resp.output.length > 0) {
    //             setNewarrival(resp.output)
    //         }
    //         else {
    //             setNewarrival([])
    //         }
    //     }


    // }

    // const publisherName = async(id) => {
    //     const resp = await getPublishersById(id);
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

        // New_arrival()
        getNewArrivals()
        // console.log("wishlist items : ", wishlistitems)

        console.log("Wishlist_resp ", resp)
    }




    return (
        <div className="p-5">
            <div className="pub_name">
                {/* Modern <span className="pub_span">Publishing House</span> */}
                {/* {publisherData?.name} */}
            </div>
            <div className="section_head fw500" style={{ lineHeight: '20px' }}><span className="fw600">New Arrivals</span></div>
            <div className="row mx-3 mb-5">

                <Carousel
                    responsive={responsive}
                    //autoPlay={true}
                    //autoPlaySpeed={2000}
                    showDots={true}
                    dotListClass="custom-dot-list-style-publisher"
                    infinite={true}
                    containerClass="carousel-container-publisher"
                    itemClass="carousel-item-padding-40-px-publisher"
                >

                    {
                        allNewArrival.map((data, index) => (


                            <div
                                key={index}
                                className="col-md border card_border_light new_book_card h380 m-3"
                                style={{ cursor: 'pointer' }}
                                onClick={() => { gotoDetails(data.id) }}
                            >
                                <div className="d-flex flex-column my-3">
                                    <div className="d-flex justify-content-end mt-1 me-3"
                                        onClick={(e) => Wishlist(e, data.id)}
                                    >
                                        {
                                            data.isFavourite === 1 ? (
                                                <img src={wishlistedicon} width={27} height={27} />
                                            )
                                                :
                                                (<img src={wishlight} width={27} height={27} />)
                                        }
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        {/* {console.log("Data : ", data.image)} */}
                                        <img
                                            src={data.img === null || data.img === '' ? dummy : Config.API_URL + Config.PUB_IMAGES + data.publisherid + "/" + data.img + '?d=' + new Date()}
                                            // src={nbook1}
                                            width={120} height={170} alt={"Product Image Not Found"}
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="d-flex justify-content-center book_name mx-2 mt-2">
                                        {data.title.length > 20 ? data.title.substring(0, 20) + ".." : data.title}
                                        {/* Insurance Coverage of Construction Disputes */}
                                    </div>
                                    {/* <div className="d-flex justify-content-center pub_name mt-2">Publisher: <span className="pub_span">{data.publisher.length > 20 ? data.publisher.substring(0, 20) + "..." : data.publisher}</span></div> */}
                                    <div className="d-flex justify-content-center author_name">
                                        Author:
                                        {/* Name */}
                                        {data.authors}
                                    </div>
                                    <div className="d-flex justify-content-center new_price_style mt-1">
                                        {/* &#8377; */}
                                        {data.price}
                                        {/* $2,746.00 */}
                                    </div>

                                </div>
                            </div>

                        ))}



                </Carousel>

            </div>
        </div>
    );
}

export default NewArrivalBooks;