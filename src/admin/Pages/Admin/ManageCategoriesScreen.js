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

const ManageCategoriesScreen = () => {

  const [categoryName, setCategoryName] = useState('');
  const [categoryDesc, setCategoryDesc] = useState('');
  const [modaltitle, setmodaltitle] = useState('');
  const [categoryParent, setCategoryParent] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [categoriesModal, setcategoriesModal] = useState(false);
  const [deleteconfirmation, setdeleteconfirmation] = useState(false);
  const [delConfirm, setDelConfirm] = useState(false);


  const { getAllCategory, categoryList, getCategoryById, addCategory, editCategory, delCategory, restore_category } = AdminProfile();
  const { authData } = useAuth();

  useEffect(() => {
    //getCategory();
  }
    , [authData]);

  const opencategoriesModal = (id) => {
    // console.log("Category Id : ", id);
    setcategoriesModal(true);
    if (id === 0) {
      setmodaltitle('Add Category');
      setCategoryName('');
      setCategoryDesc('');
      setCategoryParent(0);
      setCategoryId(0);
    }
    else {
      setmodaltitle('Edit Category');
      getCategoriesById(id);
      setCategoryId(id);
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

  const getCategoriesById = async (id) => {
    const response = await getCategoryById(id);
    let category = response.data.output;
    // console.log("Categories by id : ", category);
    setCategoryId(category.id);
    setCategoryName(category.name);
    setCategoryDesc(category.description);
    setCategoryParent(category.parentid);
  }

  const selectParentId = (e) => {
    setCategoryParent(e.target.value);
  }



  const saveCategory = async () => {
    if (categoryId === 0) {
      // Add the category
      let obj = {
        name: categoryName,
        description: categoryDesc,
        parentid: categoryParent
      }
      let resp = await addCategory(obj);
      // console.log("Add category response : ", resp);


      if (resp.data.statuscode === '0' && resp.data.message === 'Information saved successfully.') {

        toast.success("Category added successfully", {
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
        toast.error("Category addition failed", {
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
        name: categoryName,
        description: categoryDesc,
        parentid: categoryParent
      }
      let resp = await editCategory(categoryId, obj);

      if (resp?.data?.statuscode === '0' && resp?.data?.message === 'Information saved successfully.') {

        toast.success("Category updated successfully", {
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
        toast.error("Category updation failed", {
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
      let resp = await restore_category(id);
    }
    else {
      //call delete
      if (window.confirm("Do you want to deactivate the category?") == true) {
        // console.log("You pressed OK!");
        let resp = await delCategory(id);
      } else {
        // console.log("You pressed cancel!");
      }

    }
  }

  return (
    <>
      <SideMenu />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <Header title="Manage Categories" />
        <div className="bg-white p-3 m-3 rounded-2">
          <button type="button" className="btn btn-main" onClick={() => opencategoriesModal(0)}>Add Category</button>
        </div>
        <div className="m-3">
          <table className="table bg-white">
            <thead className="text-center">
              <tr>
                {/* <th>Category ID</th> */}
                <th className="text-start">Name</th>
                <th className="text-start">Parent</th>
                <th className="text-start">Description</th>
                <th className="text-start">Status</th>
                <th className="text-start">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">{
              categoryList.map((data, index) => (
                <tr className="custom-table-row" key={index}>
                  {/* <td className="all_col">{data.id}</td> */}
                  <td className="all_col text-start">{data.name}</td>
                  <td className="all_col text-start">{data.parent}</td>
                  <td className="all_col text-start" dangerouslySetInnerHTML={{ __html: data.description === null || data?.description?.length === 0 ? 'Not Available' : data.description }}></td>
                  <td className={data?.isactive === 1 ? 'act_col text-start' : 'inact_col text-start'}>{data.isactive === 1 ? 'Active' : 'Inactive'}</td>
                  <td className="d-flex justify-content-start">
                    <SVG src={editIcon} style={{ fill: '#000', marginRight: 10 }} width={15}
                      onClick={() => opencategoriesModal(data.id)}

                    />
                    {/* <SVG src={trashIcon} style={{ fill: '#dc3545', marginRight: 10 }} width={15}
                    onClick={()=>deleteCategory(data.id)}
                    /> */}
                    <div className="form-check form-switch d-flex justify-content-start mt-1" >
                      <input
                        checked={data.isactive === 1 ? true : false}
                        className="form-check-input"
                        type="checkbox"
                        // checked={true}
                        id="flexSwitchCheckDefault"
                        onChange={(e) => act_inact_cat(e, data.id)}
                      />
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
                <label className="form-label" htmlFor='cat_prod'>Parent Category</label>
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
                </select>
                <label className="form-label">Category Name</label>
                <input type="text" className="form-control mb-2" placeholder="Type Category Name"
                  value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                <label className="form-label">Description</label>
                <input type="text" className="form-control mb-2" placeholder="Type a Description"
                  value={categoryDesc} onChange={(e) => setCategoryDesc(e.target.value)} />

                {/* <ReactQuill placeholder="Enter Description here..."
                  theme="snow"
                  value={categoryDesc}
                  onChange={setCategoryDesc} /> */}



              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>

            <button className="btn btn-main" onClick={saveCategory} style={{width:'20%'}}>
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
            <Modal.Title>Do you want to delete the category?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-lg-12 mb-3">
                Are you sure you want to delete this category?
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

export default ManageCategoriesScreen;