import { Button } from "react-bootstrap";
import Banner from "../Assets/Images/Banner_inside_img.png";
const BannerSouthsore = () => {
    return (
        <div className="banner_thomson" style={{
            boxShadow: '0px 10px 5px rgba(169, 170, 182, 0.25), 0px -1px 5px rgba(169, 170, 182, 0.25)',
            // boxShadow: "0px -10px 5px rgba(169, 170, 182, 0.25)"
            marginTop: '10px'
        }}>
            <div className="row">
                <div className="col-md-6 banner_southsore_img py-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={Banner} 
                    // height={400} 
                    height={300} 
                    width={450}
                    />
                </div>
                <div className="col-md-6 banner_southsore_text pt-4">
                    <div className="ban_head mb-2" style={{color: '#64646F'}}>A one stop shop for</div>
                    <p className="welcome_text"
                    >content across</p>
                    <p className="welcome_text"
                    >the genres of</p>
                    <p className="welcome_text"
                    // className="text_2_banner_head"
                    >law and humanities</p>

                    <p className="heading mt-4"
                        // style={{ lineHeight: '6px'}}
                    >A curated collection of books from leading international</p>
                    <p className="heading"
                        // style={{ lineHeight: '0px'}}
                    >and Indian publishers.</p>
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