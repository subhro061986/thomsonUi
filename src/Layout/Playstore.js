import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState, } from "react";
import playstore_logo from "../Assets/Images/Playstore-icon.png";
import appstore_logo from "../Assets/Images/Appstore-icon.png";
import indusstore_logo from "../Assets/Images/indusstore-icon.svg";
import windows_logo from "../Assets/Images/windows10.png";

const Playstore = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const downloadReader=()=>{
        window.open('https://ebooksjunction.com/static/media/reader.exe','')
    }
    const handleIndus=()=>{
        window.open('https://www.indusappstore.com/','_blank')
    }

    return (
        <div>
            <div className="container-fluid playstore-note">
                <div className="container">
                    <div className="row play_py">
                        <div className="col-md-6 playstore-note-text card_bottom">
                            Our reader apps provide a seamless reading experience across platforms and you could download the app from the Google PlayStore or the Apple AppStore as the case maybe.
                        </div>
                        <div className="col-md-6 play_btn_pos">
                            <div className='playstore_div'>
                                {/* <div className="d-inline p-2 " style={{ position: "relative" }}>
                                    <button className='rounded-pill buttons' >
                                        <div className='images'>
                                            <img src={playstore_logo} />
                                        </div>
                                        <div className='p-2 ps-4 ms-3 playstore_font' onClick={handleShow}>
                                            Play Store
                                        </div>
                                    </button>
                                </div>
                                <div className="d-inline p-2 " style={{ position: "relative" }}>
                                    <button className='rounded-pill buttons' >
                                        <div className='images'>
                                            <img src={appstore_logo} />
                                        </div>
                                        <div className='p-2 ps-4 ms-3 playstore_font' onClick={handleShow}>
                                            App Store
                                        </div>
                                    </button>
                                </div> */}
                                <div className="d-inline p-2 " style={{ position: "relative" }}>
                                    <button className='rounded-pill buttons' onClick={handleIndus} 
                                        style={{
                                            backgroundColor:'#fff'

                                        }}>
                                        <div style={{padding:'8%'}}>
                                            <img src={indusstore_logo} style={{width:'70%'}}/>
                                        </div>
                                       
                                    </button>
                                </div>
                                <div className="d-inline p-2 " style={{ position: "relative" }}>
                                    <button className='rounded-pill buttons' >
                                        <div className='images'>
                                            <img src={windows_logo} width={22}/>
                                        </div>
                                        <div className='p-2 ps-4 ms-3 playstore_font' onClick={downloadReader}>
                                            Windows
                                        </div>
                                    </button>
                                </div>
                            </div>


                        </div>

                    </div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Our app will be available soon! </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Sorry for the inconvenience </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default Playstore