import React, {
    useState,
    useEffect
} from "react";
import Footer from '../Layout/Footer'
import ProfileTab from '../Layout/ProfileTab'
import TopBar from '../Layout/TopBar'
import { MinimalButton, ScrollMode, SpecialZoomLevel, Viewer, ViewMode, Worker } from '@react-pdf-viewer/core';
import { NextIcon, pageNavigationPlugin, PreviousIcon } from '@react-pdf-viewer/page-navigation';
import { ThumbnailDirection, thumbnailPlugin } from '@react-pdf-viewer/thumbnail';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import { useLocation } from 'react-router-dom';
import Config from "../Config/Config.json"

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import '@react-pdf-viewer/thumbnail/lib/styles/index.css';
import Whatsapp from "../Layout/Whatsapp";


const PdfreaderScreen = () => {

    const [pdfURL,setPdfURL] =useState("")
    const location = useLocation()
    // const pdfURL = 'https://cors-anywhere.herokuapp.com/https://springandriver.com/apk/Chhori.pdf';
    // const pdfURL = 'https://arxiv.org/pdf/quant-ph/0410100.pdf';

    const pageNavigationPluginInstance = pageNavigationPlugin();
    const { jumpToNextPage, jumpToPreviousPage } = pageNavigationPluginInstance;

    const thumbnailPluginInstance = thumbnailPlugin();
    const { Thumbnails } = thumbnailPluginInstance;

    const zoomPluginInstance = zoomPlugin();
    const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;

    // useEffect(() => {

    //     // if (context) {
    //     //     context.clearRect(0, 0, canvas.width, canvas.height);
    //     //     context.beginPath();
    //     // }

    //     let viewer=document.querySelectorAll("canvas")
    //     let newCanvas=document.createElement("canvas")

    //     // let view=document.getElementById("pdf-viewer")
    //     // console.log("viewer=",view)

    //     // view.clear
    //     let element=viewer[0].parentElement;
    //     element.removeChild(viewer[0])
    //     element.appendChild(newCanvas)
    //     // if(viewer.length >0 ) viewer[0].remove()



    // }, [])
    useEffect(() => {
        console.log('publisher id=',location.state.publisher_id )

        // setPdfURL( Config.API_URL+location.state.publisher_name+"/"+location.state.url) 
        setPdfURL( Config.API_URL+Config.PUB_IMAGES+location.state.publisher_id+"/"+location.state.url) 

    },[]);
    return (
        <div className='main-container'>
            <div id="pdf-viewer" className='container'>
                <TopBar />
                <ProfileTab />
                <Whatsapp/>
                <div>
                    
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">

                        {/* <Viewer 
                    // defaultScale={SpecialZoomLevel.PageFit}
                    // scrollMode={ScrollMode.Page}
                    // viewMode={ViewMode.DualPageWithCover}
                    // plugins={[pageNavigationPluginInstance, thumbnailPluginInstance]}
                    fileUrl={pdfURL}/>
                    <Thumbnails thumbnailDirection={ThumbnailDirection.Horizontal} /> */}



                        <div
                            style={{
                                border: '1px solid rgba(0, 0, 0, .3)',
                                display: 'flex',
                                flexDirection: 'column',
                                overflow:'hidden'
                            }}
                        >
                            <div
                                style={{
                                    borderBottom: '1px solid rgba(0, 0, 0, .3)',
                                    height: '40rem',
                                    position: 'relative',
                                }}
                            >
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '1rem',
                                        transform: 'translate(0, -100%) rotate(-90deg)',
                                        zIndex: '1',
                                    }}
                                >
                                    <MinimalButton onClick={jumpToPreviousPage}>
                                        <PreviousIcon />
                                    </MinimalButton>
                                </div>

                                <div
                                    style={{
                                        alignItems: 'center',
                                        backgroundColor: '#eeeeee',
                                        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        padding: '4px',
                                    }}
                                >
                                    <ZoomOutButton />
                                    <ZoomPopover />
                                    <ZoomInButton />
                                </div>
                                <Viewer
                                    defaultScale={SpecialZoomLevel.PageFit}
                                    scrollMode={ScrollMode.Page}
                                    // viewMode={ViewMode.DualPageWithCover}
                                    // fileUrl={pdfURL}
                                    fileUrl={pdfURL}
                                    plugins={[pageNavigationPluginInstance, thumbnailPluginInstance,zoomPluginInstance]}
                                />
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        right: '1rem',
                                        transform: 'translate(0, -100%) rotate(-90deg)',
                                        zIndex: '1',
                                    }}
                                >
                                    <MinimalButton onClick={jumpToNextPage}>
                                        <NextIcon />
                                    </MinimalButton>
                                </div>
                            </div>
                            <div
                                style={{
                                    height: '12rem',
                                    overflow: 'auto',
                                    display:"none",
                                }}
                            >
                                <Thumbnails thumbnailDirection={ThumbnailDirection.Horizontal} />
                            </div>
                        </div>

                    </Worker>
                </div>



            </div>
            <Footer />
        </div>

    )
}

export default PdfreaderScreen
