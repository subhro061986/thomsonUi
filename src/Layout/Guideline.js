import Card from 'react-bootstrap/Card';
import DownloadEpubReader from "../Assets/Images/download_epub_reader.png";
import SelectFavBook from "../Assets/Images/select_fav_book.png";
import PurchaseBook from "../Assets/Images/purchase_book.png";
const Guideline = () => {
    return (
        <div className="container-fluid guideline">
            <div className="container py-5">
                {/* <div className="row">
                    <div className="col-md-4 horizontalLine">
                        <h2>Buy your favorite book in just <b> 3 easy steps.</b></h2>
                    </div>

                    <div className='line_disp'>
                        <hr></hr>
                    </div>

                    <div className="col-md-8 textSmall">
                        <p> Becoming an author is a significant milestone in a writer's career, signifying a transition from simply crafting words to publishing and sharing their work with the world. This journey is both exhilarating and challenging, requiring dedication, patience, and a strategic approach. In this guide, we'll explore the steps and strategies that can help you transform from a writer into a successful author.</p>
                    </div>
                </div> */}
                <div className="text-center">
                    <h2>Buy your favorite book in just <b> 3 easy steps.</b></h2>
                </div>

                <div className="mt-3">
                    <h5 style={{textAlign: 'center'}}>Here are following <b>steps</b></h5>
                    <div className="row">
                        {/* <div className="col-md-4">
                            <Card className='card-des mb-3'>
                                <Card.Img className='centered-image' variant="top"  src={DownloadEpubReader} />
                                <Card.Body  style={{textAlign:'center'}}>
                                    <Card.Title className='my-3'> <b>Download E-Pub Reader</b> </Card.Title>
                                    <Card.Text className='card-desc-text'>Visit the official website or app store for your chosen <b>E-Pub reader </b>and download the application. Follow the installation instructions for your specific device.</Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-md-4">
                            <Card className='card-des mb-3'>
                                <Card.Img className='centered-image' variant="top"  src={SelectFavBook} />
                                <Card.Body style={{textAlign:'center'}}>
                                    <Card.Title className='my-3'><b>Select your favorite book</b> </Card.Title>
                                    <Card.Text className='card-desc-text'>Double-check the order details to ensure accuracy, including the book titles, quantity, customer information and select the specify book you want to read.</Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-md-4">
                            <Card className='card-des mb-3'>
                                <Card.Img className='centered-image' variant="top"  src={PurchaseBook} />
                                <Card.Body style={{textAlign:'center'}}>
                                    <Card.Title className='my-3'><b>Purchase book & Enjoy</b></Card.Title>
                                    <Card.Text className='card-desc-text'>Double-check the order details to ensure accuracy, including the book titles, quantity, customer information, and shipping address.</Card.Text>
                                </Card.Body>
                            </Card>
                        </div> */}
                        <div className="col-md-4 mb-4">
                            <Card className='card-des card_height'>
                                <Card.Img className='centered-image' variant="top" src={SelectFavBook} />
                                <Card.Body className='mb-3' style={{ textAlign: 'center' }}>
                                    <Card.Title className='my-3 guide_card_head'>Select your <span className='fw700'>favorite book</span> </Card.Title>
                                    <Card.Text className='card-desc-text'>Browse through the titles using keywords / filters and select based on Publisher / category across a range of genres / languages. Make your selection(s) in your shopping cart.</Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-md-4 mb-4">
                            <Card className='card-des card_height'>
                                <Card.Img className='centered-image' variant="top" src={PurchaseBook} />
                                <Card.Body className='mb-3' style={{ textAlign: 'center' }}>
                                    <Card.Title className='my-3 guide_card_head'><span className='fw700'>Purchase the book</span></Card.Title>
                                    <Card.Text className='card-desc-text'>Double-check the order details to ensure accuracy, including the book titles, quantity, customer information, and shipping address. Make your payment through our connected and secure payment gateway. Once complete the purchased book(s) will move to your bookshelf.</Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-md-4 mb-4">
                            <Card className='card-des card_height'>
                                <Card.Img className='centered-image' variant="top" src={DownloadEpubReader} />
                                <Card.Body className='mb-3' style={{ textAlign: 'center' }}>
                                    <Card.Title className='my-3 guide_card_head'> Download our reader <span className='fw700'>start reading</span> </Card.Title>
                                    <Card.Text className='card-desc-text'>Download our proprietary reader from the platform. Follow the installation instructions for your specific device. Once done you can download your books from your account and start reading.</Card.Text>
                                </Card.Body>
                            </Card>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Guideline;