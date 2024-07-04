import { Button } from "react-bootstrap";
import Banner from "../Assets/Images/thomson_banner_1.png";
const BannerSouthsore = () => {
    return (
        <div className="banner_thomson" style={{
            boxShadow: '0px 10px 5px rgba(169, 170, 182, 0.25), 0px -1px 5px rgba(169, 170, 182, 0.25)',
            marginTop: '10px'
        }}>
            <div className="row">
                <div className="col-md-6 banner_southsore_img" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {/* <img src={Banner}/> */}
                </div>
                <div className="col-md-6 banner_southsore_text" style={{ marginTop: '5%', marginLeft: '58%' }}>
                    <div className="ban_head mb-2" style={{color: '#64646F'}}>A one stop shop for</div>
                    <p className="welcome_text"
                    >legal &</p>
                    <p className="welcome_text"
                    >academic</p>
                    <p className="welcome_text"
                    // className="text_2_banner_head"
                    >content</p>

                    <p className="heading"
                        style={{ lineHeight: '24px', paddingRight: '29%', fontSize: '16px' }}
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