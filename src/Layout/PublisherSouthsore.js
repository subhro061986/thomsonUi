import React, { useEffect, useState, } from "react";
import SVG from "react-inlinesvg";
import art from "../Assets/Images/category_logo_1.png";
import noImg from "../Assets/Images/no-img.png";
import lang from "../Assets/Images/lang.png";
import biography from "../Assets/Images/biography.png";
import history from "../Assets/Images/history.png";
import dictionary from "../Assets/Images/dictionary.png";
import ThomsonLogo from "../Assets/Images/ThomsonReuterLogo.png";
import science from "../Assets/Images/science.png";
import { UserProfile } from "../Context/Usercontext"
import Config from "../Config/Config.json"
import dummy from "../Assets/Images/dummy.png";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { useNavigate } from 'react-router-dom';
import { all } from "axios";


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
    items: 2
  }
};

const PublisherSouthsore = () => {
  const navigate = useNavigate();

  const goToCatagory = (val) => {
    // console.log("pub val : ",val);
    navigate('/category', { state: { publisher_id: val.id } })
  }

  const { allActivePublisher } = UserProfile()

  // const [allcategory, setAllcategory] = useState([])
  // const [pubcat, setPubcat] = useState([])

  // ** Note : Here publisher id will be optained from the previous page. 
  // ** Note : callback fn in Useeffect will be fired immediately on receiving the publisher id from previous page

  useEffect(() => {
    // book_category()
    //book_category_by_publisher(1)
    console.log('All active publishers', allActivePublisher);
  }, [])



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
    <div className="d-flex justify-content-between align-items-center list_pub_bg">
      <div className="container">
        <div className="d-flex justify-content-center align-items-center section_head fw600">Listed Publishers</div>

        <div className="row mx-0">
          {allActivePublisher.length < 5 ? (
            // filter(pub => pub.isactive === 1).
            // <div className="d-flex justify-content-center align-items-center">
              allActivePublisher.map((data, index) => (

                data.isactive === 1 && (
                  <div
                    key={index}
                    className="col-md d-flex flex-column justify-content-center align-items-center mar publisher_card mx-2"
                    onClick={() => goToCatagory(data)}
                    style={{ cursor: 'pointer', borderRadius: '30px', backgroundColor: '#FFFFFF' }}
                  >
                    <div
                      className=" bg-transparent d-flex justify-content-center align-items-center pub_list_div"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={data.name}
                    >
                      {/* <img src={art} alt={"Category Image Not Found"} /> */}
                      <img src={data.logo === null || data.logo === "" ? ThomsonLogo : `${Config.API_URL + Config.PUB_IMAGES + data.id + '/' + data.logo}`} alt="publisher logo" width={140} />
                      {/* <img src={ThomsonLogo} alt="publisher logo" width={140}/> */}
                    </div>
                    <div className="text-center cat_txt fw500 mb-4">
                      {/* {data.name.length > 20 ? data.name.substring(0, 20) + ".." : data.name} */}
                      {data.name.replace("Thompson Reuters ", "").trim()}
                      {/* UK */}
                    </div>
                  </div>

                )

              ))
              // </div>
            
          ) : (
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
              {allActivePublisher.map((data, index) => (

                data.isactive === 1 && (
                  <div
                    key={index}
                    className="col-md d-flex flex-column justify-content-center align-items-center mar publisher_card mx-2"
                    onClick={() => goToCatagory(data)}
                    style={{ cursor: 'pointer', borderRadius: '30px', backgroundColor: '#FFFFFF' }}
                  >
                    <div
                      className=" bg-transparent d-flex justify-content-center align-items-center pub_list_div"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={data.name}
                    >
                      {/* <img src={art} alt={"Category Image Not Found"} /> */}
                      <img src={data.logo === null || data.logo === "" ? ThomsonLogo : `${Config.API_URL + Config.PUB_IMAGES + data.id + '/' + data.logo}`} alt="publisher logo" width={140} />
                      {/* <img src={ThomsonLogo} alt="publisher logo" width={140}/> */}
                    </div>
                    <div className="text-center cat_txt fw500 mb-4">
                      {/* {data.name.length > 20 ? data.name.substring(0, 20) + ".." : data.name} */}
                      {data.name.replace("Thompson Reuters ", "").trim()}
                      {/* UK */}
                    </div>
                  </div>

                )

              ))}

            </Carousel>
          )}
        </div>

      </div>

    </div>
    // </div>

  );
}

export default PublisherSouthsore;