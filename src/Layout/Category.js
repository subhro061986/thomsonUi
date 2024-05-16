import React, { useEffect, useState, } from "react";
import SVG from "react-inlinesvg";
import art from "../Assets/Images/art.png";
import lang from "../Assets/Images/lang.png";
import biography from "../Assets/Images/biography.png";
import history from "../Assets/Images/history.png";
import dictionary from "../Assets/Images/dictionary.png";
import desktop from "../Assets/Images/desktop.png";
import science from "../Assets/Images/science.png";
import { UserProfile } from "../Context/Usercontext"

import dummy from "../Assets/Images/dummy.png";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


import { useNavigate } from 'react-router-dom';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const Category = () => {
  const navigate = useNavigate();



  const goToCatagory = (cat_id) => {
    navigate('/category', { state: { category_id: cat_id } })
  }

  const { getAllCategory, category_by_publisher, categoryByPublisherList } = UserProfile()

  const [allcategory, setAllcategory] = useState([])
  const [pubcat, setPubcat] = useState([])

  // ** Note : Here publisher id will be optained from the previous page. 
  // ** Note : callback fn in Useeffect will be fired immediately on receiving the publisher id from previous page

  useEffect(() => {
    // book_category()
    //book_category_by_publisher(1)
  }, [])

  // const book_category_by_publisher = async (publisher_id) => {
  //   const resp = await category_by_publisher(publisher_id) 
  //   console.log("cat_resp",resp)
  //   if (resp === undefined || resp === null ){
  //     setPubcat([])
  //   }
  //   else{

  //     console.log("pub_cat_resp",resp)
  //     if (resp.statuscode === "0" && resp.output.length > 0){
  //       setPubcat(resp.output)
  //     }
  //     else{
  //       setPubcat([])
  //     }
  //   }

  //  }

  // const book_category = async () => {
  //  const resp = await getAllCategory() 
  //   console.log("resp",resp)
  //  if (resp !== undefined || resp !== null ) {
  //   if (resp.output.length > 0){
  //     setAllcategory(resp.output)
  //    }
  //    else{
  //     setAllcategory([])
  //    }
  //  }
  //  else{
  //   setAllcategory([])
  //  }

  // }

  return (
    // <div id="myCarousel" classNameName="carousel slide" data-bs-ride="carousel">
    <div className="d-flex justify-content-between align-items-center py-5 category_bg">
      <div className="container">
        <div className="d-flex justify-content-center align-items-center section_head fw600">Category</div>
        <div className="row mt-5 mx-0">

          <Carousel
            responsive={responsive}
            //autoPlay={true}
            //autoPlaySpeed={2000}
            infinite={true}
          >

            {
              categoryByPublisherList.map((data, index) => (


                <div key={index}
                  className="col-md d-flex flex-column justify-content-center align-items-center"
                  onClick={() => goToCatagory(data.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="rounded-circle bg-white d-flex justify-content-center align-items-center round_div">
                    <img src={art} alt={"Category Image Not Found"} />
                  </div>
                  <div className="text-center cat_txt fw500 mt-2">{data.name}</div>
                </div>

              ))}

          </Carousel>

        </div>
      </div>

    </div>
    // </div>

  );
}

export default Category;