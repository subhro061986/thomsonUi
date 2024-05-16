import { Button } from "react-bootstrap";
import Banner from "../Assets/Images/bg-ss-banner-book.png";
const BannerSouthsore = ()=>{
    return(
        <div className="banner_southsore">
            <div className="row">
                <div className="col-md-6 banner_southsore_img" style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'5%'}}>
                    <img src={Banner}/>
                </div>
                <div className="col-md-6 banner_southsore_text" style={{marginTop: '5%'}}>
                    <p className="welcome_text"
                        // style={{
                        //    fontSize: '32px',
                        //    fontWeight:'600',
                        //    fontFamily: "Poppins",
                        //    fontStyle: "normal",
                        //    lineHeight: "41.18px",
                        //    marginBottom: '0px'
                        // }} 
                    >Welcome to</p>
                    <p className="heading"
                    // style={{
                    //        color:"#133B72",
                    //        fontSize: '100px',
                    //        fontFamily: "Poppins",
                    //        fontWeight: '900',
                    //        lineHeight: '120px',
                    //        marginTop:'-5px',
                    //        letterSpacing: '3.3px'
                    //     }} 
                    >E-Books</p>
                    <p className="text_2" 
                    // style={{
                    //        color:"#7D93A1",
                        //    fontSize: '60px',
                        //    fontWeight:'700',
                        //    marginTop:'-6%'
                        // }}
                    >Endless</p>
                    <p className="text_3" 
                    // style={{
                    //        color:"#7D93A1",
                    //        fontSize: '60px',
                    //        fontWeight:'700',
                    //        marginTop:'-6%'
                    //     }}
                    >Possibilities</p>
                    <p className="text_4"
                    // style={{
                    //        color:"#8FA0AC",
                    //        fontSize: '40px',
                    //        fontWeight:'700',
                    //        marginTop:'-6%'
                    //     }}
                    
                    >Shop, <span style={{color: '#6A7984'}}>Read</span>, <span style={{color: '#404D57'}}>Repeat!</span></p>
                    {/* <div className="mt-5">
                        <Button className="know_more_btn">Know More</Button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default BannerSouthsore;