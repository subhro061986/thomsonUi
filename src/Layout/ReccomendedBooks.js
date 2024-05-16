import React, { useEffect, useState, } from "react";

import wishlight from "../Assets/Images/wishlight.png";
import rbook1 from "../Assets/Images/rbook1.png";
import rbook2 from "../Assets/Images/rbook2.png";
import rbook3 from "../Assets/Images/rbook3.png";
import rbook4 from "../Assets/Images/rbook4.png";

import { useNavigate } from 'react-router-dom';
import { UserProfile } from "../Context/Usercontext";

const ReccomendedBooks = () => {

    const navigate = useNavigate();

    const { publisherData } = UserProfile()

    const goToProductDetails = () => {
        navigate('/productdetails')
    }

    return (
        <div className="p-5 best_book_section">
            <div className="pub_name">{publisherData.name}</div>
            <div className="section_head mb-5 fw500"><span className="fw600">Recommendations</span></div>
            <div className="row mx-3">
                <div className="col-md border border-white bg-white rounded-4 book_card h380 m-3">
                    <div className="d-flex flex-column">
                        <div className="d-flex justify-content-end mt-2">
                            <img src={wishlight} width={27} height={27} />
                        </div>
                        <div className="d-flex justify-content-center">
                            <img src={rbook1} width={120} height={170} onClick={goToProductDetails} />
                        </div>
                        <div className="d-flex justify-content-center book_name mx-2 mt-3">All-Time Favorites f..</div>
                        {/* <div className="d-flex justify-content-center pub_name">Publisher: <span>Spring & River</span></div> */}
                        <div className="d-flex justify-content-center author_name">Author: Ruskin Bond</div>
                        <div className="d-flex justify-content-center price_style mt-3">&#8377;200</div>
                    </div>
                </div>
                <div className="col-md border border-white bg-white rounded-4 book_card h380 m-3">
                    <div className="d-flex flex-column">
                        <div className="d-flex justify-content-end mt-2">
                            <img src={wishlight} width={27} height={27} />
                        </div>
                        <div className="d-flex justify-content-center">
                            <img src={rbook2} width={120} height={170} onClick={goToProductDetails} />
                        </div>
                        <div className="d-flex justify-content-center book_name mx-2 mt-3">Think Like A Monk</div>
                        {/* <div className="d-flex justify-content-center pub_name">Publisher: <span>Spring & River</span></div> */}
                        <div className="d-flex justify-content-center author_name">Author: Jay Shetty</div>
                        <div className="d-flex justify-content-center price_style mt-3">&#8377;324</div>
                    </div>
                </div>
                <div className="col-md border border-white bg-white rounded-4 book_card h380 m-3">
                    <div className="d-flex flex-column">
                        <div className="d-flex justify-content-end mt-2">
                            <img src={wishlight} width={27} height={27} />
                        </div>
                        <div className="d-flex justify-content-center">
                            <img src={rbook3} width={120} height={170} onClick={goToProductDetails} />
                        </div>
                        <div className="d-flex justify-content-center book_name mx-2 mt-3">Touch of Eternity</div>
                        {/* <div className="d-flex justify-content-center pub_name">Publisher: <span>Spring & River</span></div> */}
                        <div className="d-flex justify-content-center author_name">Author: Jay Shetty</div>
                        <div className="d-flex justify-content-center price_style mt-3">&#8377;324</div>
                    </div>
                </div>
                <div className="col-md border border-white bg-white rounded-4 book_card h380 m-3">
                    <div className="d-flex flex-column">
                        <div className="d-flex justify-content-end mt-2">
                            <img src={wishlight} width={27} height={27} />
                        </div>
                        <div className="d-flex justify-content-center">
                            <img src={rbook4} width={120} height={170} onClick={goToProductDetails} />
                        </div>
                        <div className="d-flex justify-content-center book_name mx-2 mt-3">Harry Potter and t..</div>
                        {/* <div className="d-flex justify-content-center pub_name">Publisher: <span>Spring & River</span></div> */}
                        <div className="d-flex justify-content-center author_name">Author: J. K. Rowling</div>
                        <div className="d-flex justify-content-center price_style mt-3">&#8377;391</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReccomendedBooks;