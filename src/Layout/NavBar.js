import React, { useEffect, useState, } from "react";
import notification from "../Assets/Images/notification.png";
import heart from "../Assets/Images/heart.png";
import shopping_cart from "../Assets/Images/shopping-cart.png";
import menu from '../Assets/Images/menu.png';
import Accordion from 'react-bootstrap/Accordion';
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { UserProfile } from "../Context/Usercontext"
import { useAuth } from '../Context/Authcontext';
import {Modal,Button} from 'react-bootstrap';
import close from "../Assets/Images/close-circle.png"

const NavBar = () => {
    const navigate = useNavigate();
    const {items, categoryByPublisherList, allCategoryList } = UserProfile()
    const { wishlistshow,cartCount } = useAuth()
    const [pubcat, setPubcat] = useState([])
    const [cartno, setCartno] = useState()
    const [drawerStat, setDrawerStat] = useState(false)
    const [modal, setModal] = useState(false);
    const [selectedId, setSelectedId] = useState(0);

    const toggleModal = () => {
        setModal(false);
        navigate('/')
    };
    const handleClose=()=>{
        setModal(false)
    }
    const modalSelectoption = () => {
        setModal(false);
        navigate('/')
 
    }

    const pub_homepage = () => {
        setModal(false);
        navigate('/home')
    }

    const openDrawer = () => {
        setDrawerStat(!drawerStat)
    }

    // useEffect(() => {
    //     console.log("Hello category list", categoryList)
    // },[])

    useEffect(() => {
    }, [wishlistshow])

    

    const gotoWishlist = () => {
        if (wishlistshow === true) {
            navigate('/wishlist')
        }
        else {
            navigate('/login')
        }

    }

    const goToCart = () => {
        navigate('/cartpage');
    }

    const cat_dropdown_nav = (e) => {
        let cat_id = e.target.value
        // console.log('cat_id from nav select', cat_id)
        navigate('/category',
            { state: { category_id: cat_id } }
        )
    }

    const cat_dropdown_nav_mobile = (category_id) => {
        navigate('/category',
            { state: { category_id: category_id } }
        )
    }

    useEffect(() => {
       
    }, [items])



    

    


    return (
        <>
            <div className="mobile_menu_display_pub" onClick={openDrawer}>
                <img src={menu} alt="mobile menu button" />
            </div>
            {
                drawerStat == true && (
                    <nav className="navbar navbar-expand-lg top-nav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 mobile_nav_ul">
                            <li className="nav-item">
                                <button className="nav-link" aria-expanded="false" onClick={toggleModal}>
                                    Home
                                </button>
                            </li>
                            {/* <li className="nav-item">
                                <HashLink smooth className="nav-link" to='/home/#new_arrivals' > About Thomson Reuters </HashLink>
                            </li> */}
                            {/*<li className="nav-item dropdown mb-3">
                               
                                <Accordion>
                                    <Accordion.Item eventKey="0" className="accordian_item">
                                        <Accordion.Header>Categories-1</Accordion.Header>
                                        {
                                            allCategoryList.map(
                                                (data, index) => (
                                                    <Accordion.Body key={index} value={data.id}
                                                        onClick={() => cat_dropdown_nav_mobile(data.id)}>
                                                        {data.name}
                                                    </Accordion.Body>
                                                )
                                            )
                                        }
                                    </Accordion.Item>
                                </Accordion>
                                    </li>*/}

                            {/* {modal && ( */}

                                {/* // <div className="custom_modal">
                                //     <div className="custom_overlay"></div>
                                //     <div className="custom_content pos_rel">
                                //         <div className="pe-4">
                                //             <h4> Are you sure you want to stay on this page ?</h4>
                                //         </div>



                                //         <div className="d-flex justify-content-start  mt-5" >
                                //             <button className="btn btn-primary rounded-pill me-5" onClick={pub_homepage}> Stay on this page</button>
                                //             <button className="btn btn-primary rounded-pill" onClick={modalSelectoption}> Leave </button>
                                //         </div>
                                //         <button className='btn_modal_class rounded-circle' onClick={toggleModal}>
                                //             <img src={close} />
                                //         </button>
                                //     </div>
                                // </div> */}

                                
                            {/* )} */}






                            {/* <li className="nav-item">
                                <HashLink smooth className="nav-link" to='/home/#new_arrivals' > About Thomson Reuters </HashLink>
                            </li> */}

                            
                            {/* <li className="nav-item">
                                <HashLink smooth className="nav-link" to='/home/#best_selling' > About Southshore </HashLink>
                            </li> */}
                        </ul>
                    </nav >
                )
            }
            {
                drawerStat == false && (
                    <nav className="navbar navbar-expand-lg top-nav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 bar_menu">
                            <li className="nav-item">
                                <button className="nav-link" aria-expanded="false" onClick={toggleModal}>
                                    Home
                                </button>
                            </li>

                            {/* <li className="nav-item">
                                <HashLink smooth className="nav-link" to='/home/#new_arrivals' > About Thomson Reuters </HashLink>
                                
                            </li> */}

                            {/* <li className="nav-item dropdown">
                                
                                <select className="cat_dropdown mt-3 me-3"
                                    onChange={(e) => { cat_dropdown_nav(e) }}
                                    >
                                    <option defaultValue={"0"} disabled selected={true}>Categories</option>

                                    {allCategoryList.map((data, index) => (

                                        <option style={{ backgroundColor: "#E4E8F3" }} key={index} value={data.id}>{data.name}</option>

                                    ))}

                                </select>


                            </li> */}

                            
                            {/* <li className="nav-item">
                                <HashLink smooth className="nav-link" to='/home/#new_arrivals' > New Arrivals </HashLink>
                                
                            </li>  */}
                        </ul>
                        <ul className="navbar-nav right-nav mb-2 mb-lg-0 wishlist_cart_icons">
                            {/* <li className="pos_rel me-2">
                                <button className="btn btn-circle">
                                    <img src={notification} />
                                </button>
                                <span className="badge rounded-pill text-bg-danger">5</span>
                            </li> */}
                            <li className="borders"><button className="btn btn-circle" onClick={gotoWishlist}><img src={heart} /></button></li>
                            <li className="pos_rel">
                                <button className="btn btn-circle" onClick={goToCart}>
                                    <img src={shopping_cart} />
                                </button>
                                {/* <span className="badge rounded-pill text-bg-danger">{cartno}</span> */}
                                <span className="badge rounded-pill text-bg-danger">{cartCount}</span>
                            </li>
                        </ul>
                    </nav >
                )
            }

            <Modal show={modal} onHide={handleClose}>
                    <Modal.Header closeButton>
                            
                    </Modal.Header>                    
                    <Modal.Body>
                        Do you want to leave this page ?
                    </Modal.Body>
                    <Modal.Footer>
                            <Button variant="secondary" onClick={pub_homepage}>
                                Stay on this page
                            </Button>
                            <Button variant="primary" onClick={modalSelectoption}>
                                Leave
                            </Button>
                    </Modal.Footer>
                </Modal>
        </>
    );
}

export default NavBar;