import { Button } from "react-bootstrap";
import Banner from "../Assets/Images/thomson_banner_1.png";
const BannerSouthsore = ()=>{
    return(
        <div className="banner_thomson">
            <div className="row">
                <div className="col-md-6 banner_southsore_img" style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'5%'}}>
                    {/* <img src={Banner}/> */}
                </div>
                <div className="col-md-6 banner_southsore_text" style={{marginTop: '5%'}}>
                    <p className="welcome_text"
                    >Online</p>
                    <p className="welcome_text"
                    >Bookshelf</p>
                    <p className="text_2_banner_head" 
                    >for you</p>
                    
                    <p className="heading"
                    style={{lineHeight:'34px'}}
                    >Shop the print and ProView titles you need to support your business and respond to current issues </p>
                    {/* <p className="text_4"
                    >Shop, <span style={{color: '#6A7984'}}>Read</span>, <span style={{color: '#404D57'}}>Repeat!</span></p> */}
                    {/* <div className="mt-5">
                        <Button className="know_more_btn">Know More</Button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default BannerSouthsore;