import React, { useEffect, useState,} from "react";
import Header from "../Layout/Header";
import SideMenu from "../Layout/SideMenu";
import cardImg from "../assets/img/full.jpg"
import addIcon from '../assets/icons/plus.svg';
import editIcon from '../assets/icons/editicon.svg';
import deleteIcon from '../assets/icons/trash.svg';
import full from '../assets/img/full.jpg';
import saveIcon from '../assets/icons/save.svg';

import SVG from "react-inlinesvg";
// import { Modal} from 'react-bootstrap';
// import { UserProfile } from "../Context/UserContext.js";
// import Config from "../Config/Config.json";
// import {NotificationManager} from 'react-notifications';

const GalleryScreen=()=> {
//   const { allGallery,addGallery, updateGallery,deleteGallery} = UserProfile()

//   const [galleryModal,setGalleryModal]=useState(false)
//   const [galleryData,setGalleryData]=useState([])
//   const [galleryTitle,setGalleryTitle]=useState('')
//   const [galleryPicture,setGalleryPicture]=useState('')
//   const [titleError,setTitleError]=useState('')
//   const [imageError,setImageError]=useState('')
//   const [editableId,setEditableId]= useState('')
//   const [editableImage, setEditableImage] = useState('')
//   useEffect(() => {
    
//       if(allGallery===undefined || allGallery==='')
//       {
//         setGalleryData([])
//       }
//       else{
//         setGalleryData(allGallery.data)
//       }
//   }, [allGallery])

 
//   const openGalleryModal=()=>{
//     setGalleryModal(true)
//   }
//   const closeGalleryModal=()=>{
//     setGalleryModal(false)
//     setGalleryTitle('')
//     setEditableId('')
//     setEditableImage('')
//     setGalleryPicture('')
//   }
//   const titleHandler=(e)=>{
//     setGalleryTitle(e.target.value)
//   }
//   const pictureHandler=(e)=>{
//     setGalleryPicture(e.target.files[0])
//   }


//   const saveGallery=()=>{
//     if (editableId==='')
//     {
//       insertGallery()
      
//     }
//     else{
//       galleryUpdateById()
      
//     }

//   }
  
//   const insertGallery=async()=>{
//     if(galleryTitle==='' || galleryPicture==='')
//     {
//       setTitleError('Please enter title')
//       setImageError('Please upload image')
//     }
//     else if(galleryTitle==='')
//     {
//       setImageError('')
//       setTitleError('Please enter title')
//     }
//     else if(galleryPicture===''){
//         setTitleError('')
//         setImageError('Please upload image')
//     }
//     else{
//     const formData = new FormData();
//     formData.append("title",galleryTitle);
//     formData.append("image",galleryPicture);    
//     const resp = await addGallery(formData)
    
//     NotificationManager.info(resp.message,'', 5000);
//     closeGalleryModal()
//     }
//   }

//   const editGallery=(data)=>{
//     setGalleryModal(true)
//     setGalleryTitle(data.title)
//     setEditableId(data.id)
//     setEditableImage(data.image)
//   }

//   const galleryUpdateById=async()=>{
//     if(galleryTitle==='')
//     {
//       setTitleError('Please enter title')
//     }
//     else{
//       const formData = new FormData();
//       if (galleryPicture!== '')
//       {
//         formData.append("title",galleryTitle);
//         formData.append("image",galleryPicture); 
//       }
//       else{
//         formData.append("title",galleryTitle);
//         formData.append("image",'');
//       }
      
//       const resp = await updateGallery(editableId,formData)
//       closeGalleryModal()
//       NotificationManager.info(resp.message,'', 5000);
//     }
    
    
// }

  // const delGallery=async(id)=>{
  //   const resp = await deleteGallery(id)
    
  // }
  return (
    <>
    <SideMenu/>
    

    
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
      <Header title="Gallery"/>
        <div className="body flex-grow-1 px-3">
        
              <button type="button" 
                className="btn btn-primary mb-2"
                // onClick={openGalleryModal}
              >
                <SVG src={addIcon} style={{fill:'#fff',marginRight:10}} width={20}/>
                Add
              </button>
              <div className="row">
              {/* {galleryData.map((data, index) => (   */}
              <div className="col-md-3 mb-2" 
              // key={index}
              >
                <div className="card">
                  <img className="card-img-top" 
                    // src={Config.API_URL+data.image+'?d='+new Date()}
                    src={full}
                    alt=""
                    style={{height:'192px'}}
                  />
                        <div className="card-body">
                          <h5 className="card-title">Hello World</h5>
                          {/* <p className="card-text">Some quick example text to build on the card title 
                          and make up the bulk of the card's content.</p> */}

                          <button type="button" className="btn btn-info" 
                          // onClick={()=>editGallery(data)}
                          >
                            <SVG src={editIcon} style={{marginRight:10}} width={20}/>
                            Edit
                          </button>
                          <button type="button" className="btn btn-light ml-10" 
                          // onClick={()=>delGallery(data.id)}
                          >
                            <SVG src={deleteIcon} style={{marginRight:10}} width={20}/>
                            Delete
                          </button>

                        </div>
                  </div>
              </div>
              {/* ))} */}
            </div>

            {/* Modal for add edit */}
          
                        {/* <Modal 
                        show={galleryModal}
                        onHide={closeGalleryModal}
                        >
															<Modal.Header closeButton>
																<Modal.Title>Upload Photo</Modal.Title>
															</Modal.Header>
															<Modal.Body>
																<div className="row">


																	<div className="col-lg-12 mb-3">
                                    <label
                                      className="form-label">Title</label>
                                    <input 
                                      type="text" 
                                      className="form-control"
                                      value={galleryTitle}
																			onChange={titleHandler}

                                    />
                                    <p style={{color:'red'}}>{titleError}</p>
																	</div>


                                  

                                  <div className="col-lg-12 mb-3">
                                    <label className="form-label">
                                      Upload Image &nbsp;
                                      {editableId!== '' &&
                                        '('+editableImage+')'
                                        }
                                    </label>
                            
                                    <input 
                                      type="file" 
                                      className="form-control"
                                      onChange={pictureHandler}
                                  
                                    />
                                    <p style={{color:'red'}}>{imageError}</p>
                                  </div>

																	
																	
																	
																	
																</div>
															</Modal.Body>
															<Modal.Footer>
																
																<button className="btn btn-success" 
                                  onClick={saveGallery}
                                >
                                  <SVG src={saveIcon} style={{marginRight:10}} width={15}/>
																	Save
																</button>
															</Modal.Footer>
														</Modal> */}
        
      </div>
      </div>
      


      
      

    </>
  );
}

export default GalleryScreen;
