import React, { useEffect, useState, } from "react";

import wishlight from "../Assets/Images/wishlight.png";
import wishlistedicon from "../Assets/Images/wishlistedicon.png";
import book1 from "../Assets/Images/book1.png";
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

    const { getNewArrivals, add_delete_to_wishlist, wishlistitems, publisherData,allNewArrival } = UserProfile()
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

        //New_arrival()
        // console.log("wishlist items : ", wishlistitems)

        console.log("Wishlist_resp ", resp)
    }




    return (
        <div className="p-5">
            <div className="pub_name">
                {/* Modern <span className="pub_span">Publishing House</span> */}
                {publisherData?.name}
                </div>
            <div className="section_head mb-5 fw500"><span className="fw600">New Arrivals</span></div>
            <div className="row mx-3 mb-5">

                <Carousel
                    responsive={responsive}
                    //autoPlay={true}
                    //autoPlaySpeed={2000}
                    infinite={true}
                >

                    {
                        allNewArrival.map((data, index) => (


                            <div key={index}
                                className="col-md border card_border_light rounded-4 book_card h380 m-3"
                                style={{ cursor: 'pointer' }}
                                onClick={() => { gotoDetails(data.id) }}
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
                                        {/* {console.log("Data : ", data.image)} */}
                                        <img src={data.image === null || data.image === '' ? dummy : Config.API_URL + Config.PUB_IMAGES + data.publisherid + "/" + data.image + '?d=' + new Date()}
                                            width={120} height={170} alt={"Product Image Not Found"} 
                                            loading="lazy"
                                            />
                                    </div>
                                    <div className="d-flex justify-content-center book_name mx-2 mt-3">{data.title.length > 20 ? data.title.substring(0, 20) + ".." : data.title}</div>
                                    <div className="d-flex justify-content-center pub_name mt-2">Publisher: <span className="pub_span">{data.publisher.length > 20 ? data.publisher.substring(0, 20) + "..." : data.publisher}</span></div>
                                    <div className="d-flex justify-content-center author_name">
                                        Author: {data.authors}
                                    </div>
                                    <div className="d-flex justify-content-center price_style mt-3">&#8377;{data.price}</div>

                                </div>
                            </div>

                        ))}

                </Carousel>

            </div>
        </div>
    );
}

export default NewArrivalBooks;