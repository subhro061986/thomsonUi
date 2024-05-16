import React from 'react'
import Footer from '../Layout/Footer'
import ProfileTab from '../Layout/ProfileTab'
import TopBar from '../Layout/TopBar'
import Whatsapp from '../Layout/Whatsapp'



const Pdf_reader_screen = () => {
    return (
        <div className='main-container'>
            <div className='container'>
                <TopBar />
                <ProfileTab />


                

            </div>
            <Whatsapp/>
            <Footer />
        </div>

    )
}

export default Pdf_reader_screen
