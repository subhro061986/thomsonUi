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

const ManageAdmin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modaltitle, setmodaltitle] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [categoryId, setCategoryId] = useState(0);
  const [categoriesModal, setcategoriesModal] = useState(false);
  const [deleteconfirmation, setdeleteconfirmation] = useState(false);
  const [delConfirm, setDelConfirm] = useState(false);


  const { getAllCategory, categoryList, getCategoryById, addCategory, editCategory, delCategory, restore_category } = AdminProfile();
  const { authData } = useAuth();

  useEffect(() => {
    //getCategory();
    // console.log("category list:", categoryList);
  }
    , [authData]);

  const opencategoriesModal = () => {
    // console.log("Category Id : ", id);
    setcategoriesModal(true);
   // if (id === 0) {
       setmodaltitle('Add Admin');
    //   setEmail('');
    //   setPassword('');
    //   setConfirmPassword(0);
    //   setCategoryParent(0);
    //   setCategoryId(0);
   // }
    // else {
    //   setmodaltitle('Edit Admin');
    //   getCategoriesById(id);
    //   setCategoryId(id);
    //   setConfirmPassword(0);
    // }
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

  

  



  

  

  return (
    <>
      <SideMenu />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <Header title="Manage Admin" />
        <div className="bg-white p-3 m-3 rounded-2">
          <button type="button" className="btn btn-main" onClick={() => opencategoriesModal()}>Add Admin</button>
        </div>
        <div className="m-3">
          <table className="table bg-white">
            <thead className="text-center">
              <tr>
                {/* <th>Category ID</th> */}
                <th className="text-start">Email Id</th>
                {/* <th className="text-start">Parent</th> */}
                {/* <th className="text-start">Description</th>
                <th className="text-start">Shipment Duration</th> */}
                <th className="text-start">Status</th>
                <th className="text-start">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
                 
             {/* {categoryList.map((data, index) => ( */}
                <tr className="custom-table-row" 
                //key={index}
                >
                  {/* <td className="all_col">{data.id}</td> */}
                  <td className="all_col text-start">abcd@gmail.com</td>
                  {/* <td className="all_col text-start">{data.parent}</td> */}
                  {/* <td className="all_col text-start" dangerouslySetInnerHTML={{ __html: data.description === null || data?.description?.length === 0 ? 'Not Available' : data.description }}></td>
                  <td className="all_col text-start">{data.shipmentduration}  Day(s)</td> */}
                  <td 
                 // className={data?.isactive === 1 ? 'act_col text-start' : 'inact_col text-start'}
                  >active</td>
                  <td>
                    <div className="d-flex justify-content-start align-items-start">
                      <SVG src={editIcon} style={{ fill: '#000', marginRight: 10, cursor: 'pointer' }} width={15}
                        onClick={() => opencategoriesModal()}

                      />
                      {/* <SVG src={trashIcon} style={{ fill: '#dc3545', marginRight: 10 }} width={15}
                    onClick={()=>deleteCategory(data.id)}
                    /> */}
                      <div className="form-check form-switch d-flex justify-content-start mt-1" >
                        <input
                          checked={ true }
                          className="form-check-input"
                          type="checkbox"
                          // checked={true}
                          id="flexSwitchCheckDefault"
                          //onChange={(e) => act_inact_cat(e, data.id)}
                          style={{ cursor: 'pointer' }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
               {/* ))
            } */}
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
                      if (categoryId !== data.id) {
                        return <option value={data.id} key={index} selected={categoryParent === data.id ? true : false}>{data.name}</option>
                      }
                      else {
                        return null;
                      }
                    })
                  }
                </select> */}
                <label className="form-label">Email Id
                  {/* {categoryId === 0 &&
                    <span className="red"> *</span>
                  } */}
                </label>
                <input type="text" className="form-control mb-2" placeholder="Email Id"
                  value={email} onChange={(e) => setEmail(e.target.value)} />
                <label className="form-label">Password
                  {/* {categoryId === 0 &&
                    <span className="red"> *</span>
                  } */}
                </label>
                <input type="password" className="form-control mb-2"
                  value={password} onChange={(e) => setPassword(e.target.value)} />
                <label className="form-label">Confirm Password
                  {/* {categoryId === 0 &&
                    <span className="red"> *</span>
                  } */}
                </label>
                <input type="password" className="form-control mb-2" 
                  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                {/* <ReactQuill placeholder="Enter Description here..."
                  theme="snow"
                  value={password}
                  onChange={setPassword} /> */}



              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            {/* {categoryId === 0 &&
              <div className="text-danger">All fields are mandatory</div>
            } */}
            <button className="btn btn-main" 
            //onClick={saveCategory} 
            style={{ width: '20%' }}>
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
            <Modal.Title>Do you want to delete the Admin?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-lg-12 mb-3">
                Are you sure you want to delete this Admin?
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

export default ManageAdmin;