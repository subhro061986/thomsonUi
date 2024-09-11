import Footer from "../Layout/Footer";
import NavBar from "../Layout/NavBar";
import TopBar from "../Layout/TopBar";
import verify from "../Assets/Images/verify.png";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Whatsapp from "../Layout/Whatsapp";

const OrderConfirmation = () => {

    const navigate = useNavigate();
    
    const navigateToHome =()=>{
        navigate('/')
    }
    return (
        <div className="main-container">

            <div className="container">
                <TopBar />
                <NavBar />
            </div>
            <Whatsapp/>
            <div className="billingAddress" >

                <div className="container ">

                    <div  className=" card " >

                        <div className="card-body">
                    <img src={verify} width={100} height={100} className="mb-2"/>
                            <h2 className="card-title mb-2"><b>Your order is confirmed</b></h2>

                            Thank you for choosing Books Central. We have received your order and the same will be fulfilled shortly. Thank you for your business and we look forward to seeing you again
                            <div className="card-subtitle mb-2 ">Thank you for choosing <span className="blueText">Books Central.</span>, We have received your order and the same will be fulfilled shortly. <br/>
                                Thank you for your business and we look forward to seeing you again.
                            </div>

                            {/* <hr></hr>
                            

                                <h3> Your Order Details</h3>
                            <hr></hr>

                                <div className="row">
                                    <div className="col-md-6">
                                        <h5 className="highlightedText"><b>Confirmation No</b></h5>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mutedText">05973732100814</div>
                                    </div>
                                </div>
                            <hr></hr>

                                <div className="row">
                                    <div className="col-md-6">
                                        <h5 className="highlightedText"><b>Order Summery</b></h5>
                                    </div>
                                    <div className="col-md-6">
                                        <h5 className="mutedText"><b>Total</b> &nbsp;&nbsp; <span className="blueTotal">₹1024</span></h5>
                                    </div>
                                </div>
                            <hr></hr> */}
                            <Button className="mt-2 rounded-pill px-4" variant="outline-primary" onClick={navigateToHome}>Continue shopping</Button>
                            

                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default OrderConfirmation;