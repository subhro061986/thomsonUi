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

const GalleryScreen=()=> {

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

        </div>
      </div>

    </>
  );
}

export default GalleryScreen;
