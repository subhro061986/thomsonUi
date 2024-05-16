import Card from 'react-bootstrap/Card';
import quote from "../Assets/Images/quote.png";
import Dp1 from "../Assets/Images/UserProfilePicture1.png";
import Dp2 from "../Assets/Images/UserProfilePicture2.png";
import Dp3 from "../Assets/Images/UserProfilePicture3.png";
const Testimonials = () => {

    return (
        <div>
            <div className="container-fluid testimonials">
                <div className="container">
                    <div className="d-flex justify-content-center mb-5">

                        <h2>Customer  <b>feedback</b></h2>
                    </div>
                    <div className='row'>
                        <div className='col-md-4'>
                            <Card className='card-des '>
                                <Card.Body>
                                    <img src={quote} />
                                    <div className='ps-3'>

                                        <Card.Title className='mb-3' ><b>Best solution at all!</b></Card.Title>

                                        <Card.Text className='textSmall'>
                                            The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, focus
                                        </Card.Text>
                                        <hr></hr>
                                        <div className='d-flex align-items-center'>
                                        <div>
                                            <img src={Dp1} className="rounded-circle" />
                                        </div>
                                        <div className='px-3' >

                                            <div><b>Ross McColl</b></div>
                                            
                                            <div>Author</div>
                                            
                                        </div>

                                        </div>
                                    </div>

                                </Card.Body>
                            </Card>
                        </div>
                        <div className='col-md-4'>
                            <Card className='card-des '>
                                <Card.Body>
                                    <img src={quote} />
                                    <div className='ps-3'>

                                        <Card.Title className='mb-3' ><b>The best E-Book experience!</b></Card.Title>

                                        <Card.Text className='textSmall'>
                                        The placeholder text, beginning with the line “Lorem ipsum dolor sit amet, consectetur adipiscing elit”, looks like Latin because in its youth, centuries ago, it was Latin.
                                        </Card.Text>
                                        <hr></hr>
                                        <div className='d-flex align-items-center'>
                                        <div>
                                            <img src={Dp2} className="rounded-circle" />
                                        </div>
                                        <div className='px-3' >

                                            <div><b>Jenifer Wilson</b></div>
                                            
                                            <div>Writer, author</div>
                                            
                                        </div>

                                        </div>
                                    </div>

                                </Card.Body>
                            </Card>
                        </div>
                        <div className='col-md-4'>
                            <Card className='card-des '>
                                <Card.Body>
                                    <img src={quote} />
                                    <div className='ps-3'>

                                        <Card.Title className='mb-3' ><b>Making it the perfect book</b></Card.Title>

                                        <Card.Text className='textSmall'>
                                        Whether a medieval typesetter chose to garble a well-known (but non-Biblical—that would have been sacrilegious) text, or
                                        </Card.Text>
                                        <hr></hr>
                                        <div className='d-flex align-items-center'>
                                        <div>
                                            <img src={Dp3} className="rounded-circle" />
                                        </div>
                                        <div className='px-3' >

                                            <div><b>Mater Ferly</b></div>
                                            
                                            <div>Author</div>
                                            
                                        </div>

                                        </div>
                                    </div>

                                </Card.Body>
                            </Card>
                        </div>

                    </div>


                </div>
            </div>
        </div>
    )
}

export default Testimonials;