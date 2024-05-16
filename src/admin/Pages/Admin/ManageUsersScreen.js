import React, { useEffect, useState, } from "react";
import Header from "../../Layout/Header";
import SideMenu from "../../Layout/SideMenu";

import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import SVG from "react-inlinesvg";
import editIcon from '../../assets/icons/editicon.svg';
import rejectIcon from '../../assets/icons/x-circle.svg';
import approveIcon from '../../assets/icons/icons8-checkmark-30.svg';
import saveIcon from '../../assets/icons/save.svg';
import { AdminProfile } from "../../Context/AdminContext";





const ManageUserScreen = () => {

  useEffect(() => {
    // all_customers_admin()
  }

    , []);

  const { getAllCustomers_admin, customerList, deleteUserCustomer, restore_customer } = AdminProfile()

  const [actInactModal, setActInactModal] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState(0);

  // const openActInactModal = (id) => {
  //   // setCustomerId(id);
  //   // setActInactModal(true);
  //   if (window.confirm("Do you want to inactivate the customer?") == true) {
  //     // console.log("You pressed OK!");
  //     deleteUserCustomer(id);
  //   } else {
  //     console.log("You pressed cancel!");
  //   }
  // }

  const act_inact_cust = async (evt, id) => {
    if (evt.target.checked === true) {

      await restore_customer(id)
      console.log("Restorin", id)
    }
    else {

      if (window.confirm("Do you want to deactivate the user?") == true) {
        // console.log("You pressed OK!");
        await deleteUserCustomer(id)
      } else {
        console.log("You pressed cancel!");
      }

     
      console.log("delete", id)

    }
  }



  // const delete_cust = async (id) => {
  //   const response = await deleteUserCustomer(id)
  // }

  // const restore_cust = async (id) => {
  //   const response = await restore_customer(id);
  // }

  const closeActInactModal = () => {
    setActInactModal(false);
  }


  // const all_customers_admin = async () => {
  //   const resp = await getAllCustomers_admin()
  //   console.log("cust_resp ",resp)

  //   if (resp === undefined || resp === null ){
  //     setCustomers([])
  //   }
  //   else{
  //     console.log("all_customers_admin_resp ", resp)
  //     // if (resp.statuscode === "0" && resp.output.length > 0){
  //       setCustomers(resp.statuscode === "0" && resp.output.length > 0 ? [] : resp.output)
  //     // }
  //     // else{
  //     //   setCustomers([])
  //     // }
  //   }

  // }

  return (
    <>
      <SideMenu />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <Header title="Manage Customers" />
        <div className="m-3">
          <div className="bg-white p-3 rounded-2">
            <table className="table bg-white">
              <thead className="text-center">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Email</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {
                  customerList && customerList.map((data, index) => (

                    <tr key={index} className="custom-table-row">
                      <td className="all_col">{data.name?.length > 0 ? data.name : "Not Available"}</td>
                      <td className="all_col">{data.contactno !== "" ? data.contactno : "Not Available"}</td>
                      <td className="all_col">{data.email?.length > 0 ? data.email : "Not Available"}</td>
                      <td className={data?.isactive === 1 ? 'act_col' : 'inact_col'}>{data.isactive === 1 ? 'Active' : 'Inactive'}</td>
                      <td className="text-start">
                        {/* <SVG src={rejectIcon} style={{ fill: '#dc3545', marginRight: 10 }} width={20} 
                    onClick={()=>openActInactModal(data.id)} 
                    /> */}
                        <div className="form-check form-switch d-flex justify-content-start" >
                          <input
                            checked={data.isactive === 1 ? true : false}
                            className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"
                            onChange={(e) => act_inact_cust(e, data.id)} />
                        </div>
                      </td>
                    </tr>
                  ))}

              </tbody>
            </table>
          </div>
        </div>

        {/* =========Active Inactive Modal========= */}
        <Modal show={actInactModal} onHide={closeActInactModal} centered
          backdrop="static"
          dialogClassName="active-inactive-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Toggle User Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-1">
              <label className="form-label" htmlFor='selectPublisher'>Toggle Status</label>
              <select id='selectPublisher' className="form-select mb-2">
                <option value={0}>Select an option</option>
                <option>Activate</option>
                <option>Inactivate</option>
              </select>
              {/* <label className="form-label">Upload CSV file </label> */}
              {/* <div className="input-group my-2 d-flex justify-content-between align-items-center">
                <label className="input-group-text">Upload CSV</label>
                <input type="file" accept=".xlsx, .csv" className="form-control" id="fileUpload" />
              </div> */}
              {/* <div className="input-group my-2 d-flex justify-content-between align-items-center">
                <button className="btn btn-primary">
                  Activate
                </button>
              </div>
              <div className="input-group my-2 d-flex justify-content-between align-items-center">
                <button className="btn btn-danger">
                  Inactivate
                </button>
              </div> */}

            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-success">
              <SVG src={saveIcon} style={{ marginRight: 10 }} width={15} /> Save
            </button>
          </Modal.Footer>
        </Modal>

      </div>
    </>
  );
}

export default ManageUserScreen;