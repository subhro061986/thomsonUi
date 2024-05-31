import React, { useEffect, useState, } from "react";
import SVG from "react-inlinesvg";
import art from "../Assets/Images/cat_img.png";
import art1 from "../Assets/Images/cat_tax.png";
import art2 from "../Assets/Images/cat_fraud.png";
import art3 from "../Assets/Images/cat_legal.png";
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
    items: 4
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
    // <div className="d-flex justify-content-between align-items-center py-5 category_bg">
    //   <div className="container">
    //     <div className="d-flex justify-content-center align-items-center section_head fw600">Category</div>
    //     <div className="row mt-5 mx-0">

    //       <Carousel
    //         responsive={responsive}
    //         infinite={true}
    //       >

    //         {
    //           categoryByPublisherList.map((data, index) => (


    //             <div key={index}
    //               className="col-md d-flex flex-column justify-content-center align-items-center"
    //               style={{ cursor: 'pointer' }}

    //               onClick={() => goToCatagory(data.id)}
    //             >
    //               <div className="rounded-circle bg-white d-flex justify-content-center align-items-center round_div">
    //                 <img src={art} alt={"Category Image Not Found"} />
    //               </div>
    //               <div className="text-center cat_txt fw500 mt-2">{data.name}</div>


    //             </div>

    //           ))}

    //       </Carousel>

    //     </div>
    //   </div>

    // </div>
    // </div>

    <div className="p-5" style={{backgroundColor:'#F5F6FF'}}>
      <div className="section_head mb-2 fw500"><span className="fw600">
        Category
      </span></div>
      <div className="row mx-3 mb-5">

        <Carousel
          responsive={responsive}
          //autoPlay={true}
          //autoPlaySpeed={2000}
          showDots={true}
          dotListClass="custom-dot-list-style-publisher"
          infinite={true}
          containerClass="carousel-container-publisher"
          itemClass="carousel-item-padding-40-px-publisher"
        >

          {/* {
            categoryByPublisherList.map((data, index) => ( */}


          <div
            // key={index}
            className="col-md border card_border_light book_card h380 m-3"
            style={{ cursor: 'pointer' }}
          // onClick={() => goToCatagory(data.id)}
          >
            <div className="d-flex flex-column py-3 px-4">
              <div className="d-flex my-3">
                <img
                  // src={data.image === null || data.image === '' ? dummy : Config.API_URL + Config.PUB_IMAGES + data.publisherid + "/" + data.image + '?d=' + new Date()}
                  src={art3}
                  width={100} height={100} alt={"Product Image Not Found"}
                />
              </div>
              <div className="d-flex cat_title">
                {/* {data.name} */}
                {/* {data.name.length > 12 ? data.name.substring(0, 12) + ".." : data.name} */}
                Legal
              </div>
              <div className="category_desc mt-3">
                Get trusted answers faster, make high-stakes decisions with confidence
                , and increase productivity — Thomson Reuters AI and technology make it possible
              </div>
              {/* <div className="d-flex justify-content-center price_style my-3">&#8377;</div> */}
              {/* <div className="d-flex justify-content-center price_style my-3">&#8377;</div> */}
              {/* <div className="d-flex justify-content-center price_style mt-3">&#8377;</div> */}
              {/* <div className="d-flex justify-content-center price_style mt-3">&#8377;</div> */}


            </div>
          </div>

          <div
            // key={index}
            className="col-md border card_border_light book_card h380 m-3"
            style={{ cursor: 'pointer' }}
          // onClick={() => goToCatagory(data.id)}
          >
            <div className="d-flex flex-column py-3 px-4">
              <div className="d-flex my-3">
                <img
                  // src={data.image === null || data.image === '' ? dummy : Config.API_URL + Config.PUB_IMAGES + data.publisherid + "/" + data.image + '?d=' + new Date()}
                  src={art1}
                  width={100} height={100} alt={"Product Image Not Found"}
                />
              </div>
              <div className="d-flex cat_title">
                {/* {data.name} */}
                {/* {data.name.length > 12 ? data.name.substring(0, 12) + ".." : data.name} */}
                Tax and accounting
              </div>
              <div className="category_desc mt-3">
                Increase efficiency, mitigate risk
                , and provide premium client services with enhanced AI capabilities and expert insights
              </div>
              {/* <div className="d-flex justify-content-center price_style my-3">&#8377;</div> */}
              {/* <div className="d-flex justify-content-center price_style my-3">&#8377;</div> */}
              {/* <div className="d-flex justify-content-center price_style mt-3">&#8377;</div> */}
              {/* <div className="d-flex justify-content-center price_style mt-3">&#8377;</div> */}


            </div>
          </div>

          <div
            // key={index}
            className="col-md border card_border_light book_card h380 m-3"
            style={{ cursor: 'pointer' }}
          // onClick={() => goToCatagory(data.id)}
          >
            <div className="d-flex flex-column py-3 px-4">
              <div className="d-flex my-3">
                <img
                  // src={data.image === null || data.image === '' ? dummy : Config.API_URL + Config.PUB_IMAGES + data.publisherid + "/" + data.image + '?d=' + new Date()}
                  src={art}
                  width={100} height={100} alt={"Product Image Not Found"}
                />
              </div>
              <div className="d-flex cat_title">
                {/* {data.name} */}
                {/* {data.name.length > 12 ? data.name.substring(0, 12) + ".." : data.name} */}
                News & Media
              </div>
              <div className="category_desc mt-3">
                We tell all sides, but take none. We go back to the start
                , where there’s no bias and no agenda to tell the real story
              </div>
              {/* <div className="d-flex justify-content-center price_style my-3">&#8377;</div> */}
              {/* <div className="d-flex justify-content-center price_style my-3">&#8377;</div> */}
              {/* <div className="d-flex justify-content-center price_style mt-3">&#8377;</div> */}
              {/* <div className="d-flex justify-content-center price_style mt-3">&#8377;</div> */}


            </div>
          </div>

          <div
            // key={index}
            className="col-md border card_border_light book_card h380 m-3"
            style={{ cursor: 'pointer' }}
          // onClick={() => goToCatagory(data.id)}
          >
            <div className="d-flex flex-column py-3 px-4">
              <div className="d-flex my-3">
                <img
                  // src={data.image === null || data.image === '' ? dummy : Config.API_URL + Config.PUB_IMAGES + data.publisherid + "/" + data.image + '?d=' + new Date()}
                  src={art2}
                  width={100} height={100} alt={"Product Image Not Found"}
                />
              </div>
              <div className="d-flex cat_title">
                {/* {data.name} */}
                {/* {data.name.length > 12 ? data.name.substring(0, 12) + ".." : data.name} */}
                Risk & Fraud
              </div>
              <div className="category_desc mt-3">
                Risk is ever evolving — with AI-enhanced technology from Thomson Reuters
                , you can anticipate tomorrow’s threats and evolve faster
              </div>
              {/* <div className="d-flex justify-content-center price_style my-3">&#8377;</div> */}
              {/* <div className="d-flex justify-content-center price_style my-3">&#8377;</div> */}
              {/* <div className="d-flex justify-content-center price_style mt-3">&#8377;</div> */}
              {/* <div className="d-flex justify-content-center price_style mt-3">&#8377;</div> */}


            </div>
          </div>

          {/* ))} */}

        </Carousel>

      </div>
    </div>

  );
}

export default Category;