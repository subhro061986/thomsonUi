import { Button } from "react-bootstrap";
// import Banner from "../Assets/Images/bg-ss-banner-book.png";
import Banner from "../Assets/Images/banner_book.png";
const BannerSouthsore = () => {
    return (
        <div className="banner_southsore">
            <div className="row">
                <div className="col-md-6 banner_southsore_img" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '4%', marginBottom: '5%' }}>
                    <img src={Banner} height={350} width={260} />
                </div>
                <div className="col-md-6 banner_southsore_text" style={{ marginTop: '3%' }}>
                    <p
                        className="welcome_text"
                    >Online</p>
                    <p className="welcome_text">Bookshelf</p>
                    <p className="welcome_text" style={{ color: '#8d8e94' }}>for you</p>
                    <p
                        className="heading"
                    >Trusted expertise, powerful technology</p>
                    <div>
                        <button className="btn btn-outline-info rounded-pill explore_btn">Explore Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BannerSouthsore;