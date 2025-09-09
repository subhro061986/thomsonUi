import React, { useEffect, useState } from "react";
import ThomsonLogo from "../Assets/Images/ThomsonReuterLogo.png";
import wishlight from "../Assets/Images/wishlight.png";
import wishlistedicon from "../Assets/Images/wishlistedicon.png";
import Config from "../Config/Config.json";
import dummy from "../Assets/Images/dummy.png";
import { UserProfile } from "../Context/Usercontext";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/Authcontext';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 6 },
    LargeDesktop: { breakpoint: { max: 3000, min: 1920 }, items: 6 },
    desktop: { breakpoint: { max: 1919, min: 1024 }, items: 6 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
};

const PublishersBooks = () => {
    const navigate = useNavigate();
    const { getBook_by_category, add_delete_to_wishlist, getNewArrivals, allActivePublisher } = UserProfile();
    const { wishlistshow, authData, authRole } = useAuth();

    const [booksByPublisher, setBooksByPublisher] = useState({}); // store books keyed by publisher id
    const [containerClass, setContainerClass] = useState("container");

    const updateContainerClass = () => {
        if (window.innerWidth === 1366) setContainerClass("");
        else if (window.innerWidth === 1920) setContainerClass("container");
        else setContainerClass("");
    };

    useEffect(() => {
        updateContainerClass();
        window.addEventListener("resize", updateContainerClass);
        return () => window.removeEventListener("resize", updateContainerClass);
    }, []);

    const fetchBooksForPublisher = async (pubid) => {
        console.log("Fetching books for publisher ID:", pubid);
        const json = {
            filterCriteria: {
                categoryids: [],
                publisherids: [pubid],
            },
        };
        const resp = await getBook_by_category(1, 6, json);
        console.log("Publisher Books Response:", resp);
        setBooksByPublisher((prev) => ({
            ...prev,
            [pubid]: resp?.output?.books || [], // store books
        }));
    };

    useEffect(() => {
        allActivePublisher.forEach((pub) => {
            fetchBooksForPublisher(pub.id);
        });
    }, [allActivePublisher]);

    const gotoDetails = (book_id) => {
        navigate("/productdetails", { state: { BOOK_ID: book_id } });
    };

    const Wishlist = (event, book_id) => {
        event.stopPropagation();
        if (wishlistshow) Add_To_Wishlist(book_id);
        else navigate("/login");
    };

    const Add_To_Wishlist = async (book_id) => {
        let json = { bookid: book_id, currentPage: 1, recordPerPage: 5 };
        await add_delete_to_wishlist(json);
        getNewArrivals();
    };

    return (
        <>
            {allActivePublisher?.map((data, index) => (
                <div className={`containerClass ${index % 2 === 0 ? "publiserWiseBg" : ""}`} key={index}>
                    <div className="p-5">
                        <div className="section_head fw500">
                            <img
                                src={
                                    data.logo === null || data.logo === ""
                                        ? ThomsonLogo
                                        : `${Config.API_URL + Config.PUB_IMAGES + data.id + "/" + data.logo}`
                                }
                                alt={data.name}
                                width={140}
                            />
                        </div>
                        <div className="row mx-3">
                            {/* Carousel of Books */}
                            <Carousel
                                responsive={responsive}
                                showDots={true}
                                dotListClass="custom-dot-list-style-publisher"
                                infinite={true}
                                containerClass="carousel-container-publisher"
                                itemClass="carousel-item-padding-40-px-publisher"
                            >
                                {(booksByPublisher[data.id] || []).map((book) => (
                                    // <div key={book.id} onClick={() => gotoDetails(book.id)}>
                                    //     <img src={book.imgLink} alt={book.title} style={{ width: "150px", height: "200px" }} />
                                    //     <div>{book.title}</div>
                                    // </div>
                                    <div
                                        key={book.id}
                                        className="col-md border card_border_light new_book_card h380 my-3 mx-5"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => { gotoDetails(book.id) }}
                                    >
                                        <div className="d-flex flex-column my-3">
                                            <div className="d-flex justify-content-end me-2"
                                                onClick={(e) => Wishlist(e, book.id)}
                                            >
                                                {
                                                    data.isFavourite === 1 ? (
                                                        <img src={wishlistedicon} width={20} height={20} />
                                                    )
                                                        :
                                                        (<img src={wishlight} width={20} height={20} />)
                                                }
                                            </div>
                                            <div className="d-flex justify-content-center align-items-start"
                                                style={{ marginTop: '-15px' }}>
                                                {/* {console.log("Data : ", data.image)} */}
                                                <img
                                                    src={book.img === null || book.img === 'null' || book.img === '' ? dummy : Config.API_URL + Config.PUB_IMAGES + book.publisherid + "/" + book.img + '?d=' + new Date()}
                                                    // src={nbook1}
                                                    width={100} height={150} alt={"Product Image Not Found"}
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="d-flex justify-content-center book_name mx-2 mt-2" title={book.title}>
                                                {book.title.length > 10 ? book.title.substring(0, 10) + ".." : book.title}
                                                {/* Insurance Coverage of Construction Disputes */}
                                            </div>
                                            {/* <div className="d-flex justify-content-center pub_name mt-2">Publisher: <span className="pub_span">{data.publisher.length > 20 ? data.publisher.substring(0, 20) + "..." : data.publisher}</span></div> */}
                                            <div className="d-flex justify-content-center author_name" title={book.authors}>
                                                Author:
                                                {/* Name */}
                                                {book.authors.length > 15 ? book.authors.substring(0, 15) + "..." : book.authors}
                                                {/* {book?.authors?.substring(0, 15) || "Unknown"}
                                                {book?.authors?.length > 15 && "..."} */}
                                            </div>
                                            <div className="d-flex justify-content-center new_price_style mt-1">{book.currency}

                                                {/* {authData === '' || authData === null ? data.customerprice : authRole === 'Distributor' ? data.distributorprice : data.customerprice} */}
                                                {/* $2,746.00 */}
                                                {book.price}
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default PublishersBooks;
