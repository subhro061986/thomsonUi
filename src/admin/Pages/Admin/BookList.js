import React, { useEffect, useState, } from "react";
import Header from "../../Layout/Header";
import SideMenu from "../../Layout/SideMenu";
import { Link } from "react-router-dom";

import { AdminProfile } from "../../Context/AdminContext.js";
import { useAuth } from "../../Context/AuthContext";
import noImg from '../../assets/img/no-img.png';
import Config from "../../Config/Config.json";

const BookList = () => {

  const { authData } = useAuth();
  const { allBookList } = AdminProfile()

  // const [bookListData,setBookListData]=useState([])
  const [currentPageNo, setCurrentPageNo] = useState(1)
  const [recordPerPage, setRecordPerPage] = useState(2)

  useEffect(() => {
    // console.log("all book list : ", allBookList)
    // if(allBookList===undefined || allBookList==='')
    // {
    //   setBookListData([])
    // }
    // else{
    //   setBookListData(allBookList.data)
    // }
    // bookList()
  }, [authData])

  // const bookList = async () => {
  //   const resp = await 
  // }

  return (
    <>
      <SideMenu />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <Header title="Book Lists" />

        <div className="m-3">
          <table className="table bg-white">
            <thead className="text-start">
              <tr>
                <th>Cover</th>
                <th>ISBN 13</th>
                <th>Name</th>
                <th>Publisher</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="text-start">
              {allBookList.map((data, index) => (
                <tr className="custom-table-row" key={index}>
                  <td className="all_col">
                    <img src={data.image === null || data.image === '' ? noImg : Config.API_URL + Config.PUB_IMAGES + data.publisherid + "/" + data.image + '?d=' + new Date()} width={40} height={40} />
                  </td>
                  <td className="all_col">{data.isbn13 === null || data.isbn13 === '' ? "Not Available" : data.isbn13}</td>
                  <td className="all_col">{data?.title?.length > 0 ? data.title : "Not Available"}</td>
                  <td className="all_col">{data?.publisher?.length > 0 ? data.publisher : "Not Available"}</td>
                  <td className="all_col">{data.category.length > 0 ? data.category : "Not Available"}</td>
                  <td className="all_col">{data.price === null || data.price === '' ? "Not Available": data.price }</td>
                  <td className={data.status === "Accepted" ? 'act_col' : 'inact_col'}>{data.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default BookList;