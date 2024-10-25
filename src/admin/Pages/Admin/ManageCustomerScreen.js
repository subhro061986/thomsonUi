import React, { useEffect, useState } from "react";
import Header from "../../Layout/Header";
import SideMenu from "../../Layout/SideMenu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { AdminProfile } from "../../Context/AdminContext";

const ManageCustomerScreen = () =>{
    const { getAll_customer, customer, restore_distributor, delete_distributor} = AdminProfile()
    const {  authData } = useAuth();

    const[minPage,setMinPage] = useState(0)
    const[maxPage,setMaxPage] = useState(10)
    const navigate = useNavigate();
    
    useEffect(() => {
        console.log("customer List ", customer)
      }, [authData])


      const delete_Dist = async (id) => {
        const response = await delete_distributor(id);
        getAll_customer()

    }


    const restore_Dist = async (id) => {
        const response = await restore_distributor(id);
        getAll_customer()

    }

    const act_inact_dist = (activeVal, id) => {
        // console.log("event :  ", e.target.value);
        if (activeVal === 1) {

            if (window.confirm("Do you want to deactivate the customer?") == true) {
                console.log("You pressed OK!");
                delete_Dist(id);
            } else {
                console.log("You pressed cancel!");
            }

        }
        else {
            restore_Dist(id);
        }
    }

    const nextPage= () =>{
        if(customer.length <= maxPage) alert("we are already in last page")
        else {
            setMinPage(minPage + 10)
            setMaxPage(maxPage + 10)
        } 
    }
    const previousPage= () =>{
        if(minPage <= 0) alert("we are already in First page")
        else {
            setMinPage(minPage - 10)
            setMaxPage(maxPage - 10)
        } 
    }

    return (
        <>
            <SideMenu />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <Header title="Manage Customer" />
                <div className="m-3">
                        <table className="table bg-white">
                            <thead className="text-center">
                                <tr>
            
                                    <th className="text-start">Name</th>
                                
                                    <th className="text-start">Email</th>
                                    <th className="text-start">Contact No</th>
        
                                    <th className="text-start">Status</th>
                                    <th className="text-start">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {
                                    customer.slice(minPage,maxPage).map((data, index) => (
                                        <tr className="custom-table-row" key={index}>

                                            <td className="all_col text-start" data-bs-toggle="tooltip" data-bs-placement="top" title={data.name} style={{ cursor: "pointer" }}>{data.name === null ? 'Not Available' : data.name.length > 18 ? data.name.substring(0, 18) + '...' : data.name}</td>

                                            <td className="all_col text-start">{data.email === null || data?.email?.length === 0 ? 'Not Available' : data.email}</td>
                                            <td className="all_col text-start">{data.contactno === null || data?.contactno?.length === 0 ? 'Not Available' : data.contactno}</td>
                                            <td className={data?.isactive === 1 ? 'act_col text-start' : 'inact_col text-start'}>{data.isactive === 1 ? 'Active' : 'Inactive'}</td>
                                            <td>

                                                <div className="form-check form-switch" style={{ marginRight: 5 }} >
                                                    <input checked={data.isactive === 1 ? true : false} className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"
                                                        onChange={(e) => act_inact_dist(data.isactive, data.id)}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        <button className="btn btn-primary me-3" onClick={previousPage}>Previous</button>
                        <button className="btn btn-primary" onClick={nextPage}>Next</button>
                    </div>

                    
            </div>
       
        
        </>
    )
}

export default ManageCustomerScreen;