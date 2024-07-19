import React, { useEffect, useState, } from "react";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Header from "../../Layout/Header";
import SideMenu from "../../Layout/SideMenu";
import { Link } from "react-router-dom";
import SVG from "react-inlinesvg";
import editIcon from '../../assets/icons/editicon.svg';
import trashIcon from '../../assets/icons/deleteicon.svg';
import saveIcon from '../../assets/icons/save.svg';
import { Modal } from "react-bootstrap";
import { AdminProfile } from "../../Context/AdminContext";
import { useAuth } from "../../Context/AuthContext";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageShipper = () => {

  const [shipperName, setShipperName] = useState('');
  const [shipperEmail, setShipperEmail] = useState('');
  const [modaltitle, setmodaltitle] = useState('');
//   const [categoryParent, setCategoryParent] = useState(0);
  const [shipperContactNo, setShipperContactNo] = useState(0);
  const [shipperId, setShipperId] = useState(0);
  const [categoriesModal, setcategoriesModal] = useState(false);
  const [deleteconfirmation, setdeleteconfirmation] = useState(false);
  const [delConfirm, setDelConfirm] = useState(false);


  const { getAllCategory, categoryList,shipperInfoList, getCategoryById, getShipperById, addCategory, addShipper, editCategory, editShipper, delCategory, delete_shipper, restore_category, restore_shipper } = AdminProfile();
  const { authData } = useAuth();

  useEffect(() => {
    //getCategory();
    console.log("shipper list:", shipperInfoList);
  }
    , [authData]);

  const opencategoriesModal = (id) => {
    // console.log("Category Id : ", id);
    setcategoriesModal(true);
    if (id === 0) {
      setmodaltitle('Add Shipper');
      setShipperName('');
      setShipperEmail('');
      setShipperContactNo(0);
    //   setCategoryParent(0);
      setShipperId(0);
    }
    else {
      setmodaltitle('Edit Shipper');
      getShipperInfoById(id);
      setShipperId(id);
      setShipperContactNo(0);
    }
  }

  const openDelConfirmation = () => {
    setdeleteconfirmation(true);
  }

  const closecategoriesModal = () => {
    setcategoriesModal(false)
  }

  const closeDelConfirmation = () => {
    setdeleteconfirmation(false);
  }

  const getShipperInfoById = async (id) => {
    const response = await getShipperById(id);
    let shipperResp = response.data.output;
    // console.log("Categories by id : ", category);
    setShipperId(shipperResp.id);
    setShipperName(shipperResp.name);
    setShipperEmail(shipperResp.email);
    // setCategoryParent(category.parentid);
    setShipperContactNo(shipperResp.contactno);
  }

  



  const saveCategory = async () => {
    if (shipperId === 0) {
      // Add the shipper
      let obj = {
        name: shipperName,
        email: shipperEmail,
        contactno: shipperContactNo
      }
      let resp = await addShipper(obj);
      // console.log("Add shipper response : ", resp);


      if (resp.data.statuscode === '0' && resp.data.message === 'Information saved successfully.') {

        toast.success("Shipper information added successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          closeButton: false,
          theme: "light"
        });

      }
      else {
        toast.error("Shipper information addition failed", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          closeButton: false,
          style: { fontWeight: 'bold', backgroundColor: "rgb(255, 237, 246)" }
        });
      }

      closecategoriesModal();
    }
    else {
      // Edit the category
      let obj = {
        name: shipperName,
        email: shipperEmail,
        // parentid: categoryParent,
        contactno: shipperContactNo
      }
      let resp = await editShipper(shipperId, obj);

      if (resp?.data?.statuscode === '0' && resp?.data?.message === 'Information saved successfully.') {

        toast.success("Shipper information updated successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          closeButton: false,
          theme: "light"
        });
        // console.log("Edit category response : ", resp);
      }
      else {
        toast.error("Shipper information updation failed", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          closeButton: false,
          style: { fontWeight: 'bold', backgroundColor: "rgb(255, 237, 246)" }
        });
      }

      // console.log("Edit category response : ", resp);
      closecategoriesModal();
    }
  }

  const act_inact_cat = async (evt, id) => {
    if (evt.target.checked === true) {
      //call restore
      let resp = await restore_shipper(id);
    }
    else {
      //call delete
      if (window.confirm("Do you want to deactivate the category?") == true) {
        // console.log("You pressed OK!");
        let resp = await delete_shipper(id);
      } else {
        // console.log("You pressed cancel!");
      }

    }
  }

  return (
    <>
      <SideMenu />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <Header title="Manage Shippers" />
        <div className="bg-white p-3 m-3 rounded-2">
          <button type="button" className="btn btn-main" onClick={() => opencategoriesModal(0)}>Add Shipper Information</button>
        </div>
        <div className="m-3">
          <table className="table bg-white">
            <thead className="text-center">
              <tr>
                {/* <th>Category ID</th> */}
                <th className="text-start">Name</th>
                {/* <th className="text-start">Parent</th> */}
                <th className="text-start">Email</th>
                <th className="text-start">Contact No.</th>
                <th className="text-start">Status</th>
                <th className="text-start">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">{
              shipperInfoList.map((data, index) => (
                <tr className="custom-table-row" key={index}>
                  {/* <td className="all_col">{data.id}</td> */}
                  <td className="all_col text-start">{data.name}</td>
                  <td className="all_col text-start">{data.email}</td>
                  {/* <td className="all_col text-start" dangerouslySetInnerHTML={{ __html: data.description === null || data?.description?.length === 0 ? 'Not Available' : data.description }}></td> */}
                  <td className="all_col text-start">{data.contactno}</td>
                  <td className={data?.isactive === 1 ? 'act_col text-start' : 'inact_col text-start'}>{data.isactive === 1 ? 'Active' : 'Inactive'}</td>
                  <td>
                    <div className="d-flex justify-content-start align-items-start">
                      <SVG src={editIcon} style={{ fill: '#000', marginRight: 10, cursor: 'pointer' }} width={15}
                        onClick={() => opencategoriesModal(data.id)}

                      />
                      {/* <SVG src={trashIcon} style={{ fill: '#dc3545', marginRight: 10 }} width={15}
                    onClick={()=>deleteCategory(data.id)}
                    /> */}
                      <div className="form-check form-switch d-flex justify-content-start mt-1" >
                        <input
                          checked={data.isactive === 1 ? true : false}
                          className="form-check-input"
                          style={{cursor: 'pointer'}}
                          type="checkbox"
                          // checked={true}
                          id="flexSwitchCheckDefault"
                          onChange={(e) => act_inact_cat(e, data.id)}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            }
            </tbody>
          </table>
        </div>

        {/* ------------Add Category Modal------------ */}

        <Modal
          show={categoriesModal}
          onHide={closecategoriesModal}
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>{modaltitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-lg-12 mb-3">
                {/* <label className="form-label" htmlFor='cat_prod'>Parent Category</label>
                <select id='cat_prod' className="form-select mb-2" onChange={selectParentId}>
                  <option>Please Select</option>
                  {
                    categoryList.map((data, index) => {
                      if (shipperId !== data.id) {
                        return <option value={data.id} key={index} selected={categoryParent === data.id ? true : false}>{data.name}</option>
                      }
                      else {
                        return null;
                      }
                    })
                  }
                </select> */}
                <label className="form-label">Shipper Name</label>
                <input type="text" className="form-control mb-2" placeholder="Type Category Name"
                  value={shipperName} onChange={(e) => setShipperName(e.target.value)} />
                <label className="form-label">Email</label>
                <input type="text" className="form-control mb-2" placeholder="Type a Description"
                  value={shipperEmail} onChange={(e) => setShipperEmail(e.target.value)} />
                <label className="form-label">Contact No.</label>
                <input type="number" className="form-control mb-2" placeholder="Type a Shipment Duration"
                  value={shipperContactNo} onChange={(e) => setShipperContactNo(e.target.value)} />

                {/* <ReactQuill placeholder="Enter Description here..."
                  theme="snow"
                  value={shipperEmail}
                  onChange={setShipperEmail} /> */}



              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>

            <button className="btn btn-main" onClick={saveCategory} style={{ width: '20%' }}>
              {/* <SVG src={saveIcon} style={{ marginRight: 10 }} width={15} /> */}
              Save
            </button>
          </Modal.Footer>
        </Modal>

        {/*-------------Delete Confirmation Modal---------- */}
        <Modal
          show={deleteconfirmation}
          onHide={closeDelConfirmation}
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>Do you want to delete the shipper?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-lg-12 mb-3">
                Are you sure you want to delete this shipper?
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-danger" onClick={() => setDelConfirm(true)}>
              {/* <SVG src={saveIcon} style={{ marginRight: 10 }} width={15} /> */}
              Yes
            </button>
            <button className="btn btn-success" onClick={() => setDelConfirm(false)}>
              {/* <SVG src={saveIcon} style={{ marginRight: 10 }} width={15} /> */}
              No
            </button>
          </Modal.Footer>
        </Modal>


        <ToastContainer />
      </div>
    </>
  );
}

export default ManageShipper;