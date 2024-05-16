import React, { useEffect, useState, } from "react";
import Header from "../../Layout/Header";
import SideMenu from "../../Layout/SideMenu";

import eye from '../../assets/icons/eye.svg';
import SVG from "react-inlinesvg";
import { AdminProfile } from "../../Context/AdminContext";
import { useAuth } from "../../Context/AuthContext";
import Datetime from "../../GlobalFunctions.js/Datetime";





const ManageOrderPub = () => {

    const [puborders,setPuborders] = useState([])

    const {authData} = useAuth();


    const {getOrderbyPub}= AdminProfile();


    useEffect(() => {
        pub_orders()
        console.log("hello Pub")
    },[authData])

    const pub_orders = async () => {
        let currPage = 1
        let recPerPage = 5
        const resp = await getOrderbyPub(currPage,recPerPage)
        
       
        if (resp === undefined || resp === null ){
            setPuborders([])
        }
        else{
         
          console.log("pub_order_resp ", resp)
          if (resp.data.statuscode === "0" ){
            setPuborders(resp.data.output.books)
            console.log("pub_order_resp_obtained ", resp.data.output.books)
          }
          else{
            console.log("pub book array is empty")
            setPuborders([])
          }
        }
    
      }




    return (
        <>
            <SideMenu />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <Header title="View Orders" />
                <div className="bg-white p-3 m-3 rounded-2 d-flex">
                    <select name="order-filter" id="order-filter" className="form-select order-filter" aria-label="Filter orders by">
                        <option selected>Filter orders by</option>
                        <option value="All">All</option>
                        <option value="Completed">Succeeded</option>
                        <option value="Failed">Failed</option>
                    </select>
                    <input type="text" className="form-control ms-2" style={{width:'40%'}} id="exampleFormControlInput1" placeholder="Search"/>
                </div>
                <div className="m-3">
                    <div className="bg-white p-3 rounded-2">
                        {puborders.length ===  0 ? ( <div>No records found</div>) : (
                            <table className="table bg-white">
                            <thead className="text-center">
                                <tr>
                                    <th>Order No</th>
                                    <th>Order Date</th>
                                    <th>Customer</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    {/* <th>Actions</th> */}
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {puborders.map((data,index) => (
                                    <tr key={index} className="custom-table-row">
                                        <td className="all_col">{data?.orderno?.length > 0 ? data.orderno : "Not Available"}</td>
                                        <td className="all_col">{Datetime(data.orderdate)}</td>
                                        <td className="all_col">{data?.customer?.length > 0 ? data.customer : "Not Available" }</td>
                                        <td className="all_col">{data.amount !== null ? "₹" + data.amount : "Not Available"}</td>
                                        <td className={data?.status === "Success" ? 'act_col' : 'inact_col'}>
                                            {data?.status?.length > 0 ? data.status : "Not Available" }
                                            
                                        </td>
                                        {/* <td>
                                            <SVG src={eye}
                                                // style={{ fill: '#000', marginRight: 10 }}
                                                height={20} width={20}
                                            // onClick={openOrderDescriptionModal}
                                            />
                                        </td> */}
                                    </tr>
                                ))}
                                
                            </tbody>
                        </table>
                        )
                        }
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default ManageOrderPub;