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

const ManageCouponsScreenPub = () => {

  const [CouponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [validFrom, setValidFrom] = useState('');
  const [validTo, setValidTo] = useState('');
  const [modaltitle, setmodaltitle] = useState('');
  const [CouponId, setCouponId] = useState(0);
  const [CouponsModal, setCouponsModal] = useState(false);
  const [deleteconfirmation, setdeleteconfirmation] = useState(false);
  const [delConfirm, setDelConfirm] = useState(false);


  const { createCoupon, allCoupons, getACoupon, updateCoupon, deleteCoupon, restoreCoupon } = AdminProfile();
  const couponList = [
    {
      id : 1,
      isactive : 1
    },
    {
      id : 2,
      isactive : 1
    },
    {
      id : 3,
      isactive : 0
    }
  ];
  const { authData } = useAuth();

  useEffect(() => {
    //getCoupon();
  }
    , [authData]);

  const openCouponsModal = (id) => {
    console.log("Coupon Id : ", id);
    setCouponsModal(true);
    if (id === 0) {
      setmodaltitle('Add Coupon');
      let couponCode =  generateRandomValue();
      setCouponCode(couponCode);
      setDiscount(0);
      setValidFrom('');
      setValidTo('');
    }
    else {
      setmodaltitle('Edit Coupon');
      getCouponsById(id);
      setCouponId(id);
    }
  }

  const openDelConfirmation = () => {
    setdeleteconfirmation(true);
  }

  const closeCouponsModal = () => {
    setCouponsModal(false)
  }

  const closeDelConfirmation = () => {
    setdeleteconfirmation(false);
  }

  const getCouponsById = async (id) => {
    console.log('getCoupon by id : ' + id);
    const response = await getACoupon(id);
    // console.log("Coupons ", response);
    setCouponId(response.id);
    setCouponCode(response.couponcode);
    setDiscount(response.discount);
    let tempDate = response.validfrom;
    let formattedDate = new Date(tempDate).toLocaleDateString('en-CA');
    setValidFrom(formattedDate);
    tempDate = response.validto;
    formattedDate = new Date(tempDate).toLocaleDateString('en-CA');
    setValidTo(formattedDate);
  }

  const saveCoupon = async () => {
    if (CouponId === 0) {
      // Add the Coupon
      let couponObj = {
        couponcode: CouponCode,
        discount: Number(discount),
        discounttype : "percent",
        validfrom : validFrom,
        validto : validTo
      }
      console.log("Coupon Obj :", couponObj);
      let resp = await createCoupon(couponObj);
      console.log("Add Coupon response : ", resp);
      if (resp.data.statuscode === '0' && resp.data.message === 'Information saved successfully.') {
        successMessage("Coupon added successfully");
      }
      else {
        failureMessage("Coupon addition failed");
      }

      closeCouponsModal();
    }
    else {
      // Edit the Coupon
      let coupon = {
        id: CouponId,
        couponcode: CouponCode,
        discount: Number(discount),
        discounttype : "percent",
        validfrom : validFrom,
        validto : validTo
      }
      let resp = await updateCoupon(CouponId, coupon);
      console.log("Update coupon : ", resp);
      if (resp?.data?.statuscode === '0' && resp?.data?.message === 'Information saved successfully.') {
        successMessage("Coupon updated successfully");
      }
      else {
        failureMessage("Coupon updation failed");
      }

      // console.log("Edit coupon response : ", resp);
      closeCouponsModal();
    }
  }

  const act_inact_coupon = async (evt, id) => {
    if (evt.target.checked === true) {
      //call restore
      let resp = await restore_Coupon(id);
    }
    else {
      //call delete
      if (window.confirm("Do you want to deactivate the Coupon?") === true) {
        console.log("You pressed OK!");
        let resp = await delCoupon(id);
      } else {
        console.log("You pressed cancel!");
      }

    }
  }

  const delCoupon = async (id) => {
    let resp = await deleteCoupon(id);
    console.log("DELETE COUPON RESPONSE : ", resp);
    if (resp.data.statuscode === '0' && resp?.data?.message === 'Information deleted successfully.') {
      successMessage("Coupon deleted successfully");
    }
    else {
      failureMessage("Coupon deletion failed");
    }
  }

  const restore_Coupon = async (id) => {
    let resp = await restoreCoupon(id);
    console.log("RESTORE COUPON RESPONSE : ", resp && resp?.data?.message === 'Information restored successfully.');
    if (resp.data.statuscode === '0') {
      successMessage("Coupon restored successfully");
    }
    else {
      failureMessage("Coupon restoration failed");
    }
  }

  // Tools

  const generateRandomValue = () => {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomValue = '';

    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      // console.log("Randome index : ", randomIndex);
      randomValue += characters.charAt(randomIndex);
    }
    // console.log("Randome value : ", randomValue);
    return randomValue;
  };

  const successMessage = (message) => {
    toast.success(message, {
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

  const failureMessage = (message) => {
    toast.error(message, {
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

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);

    // Get day, month, and year components
    const day = dateObject.getDate().toString().padStart(2, '0');
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = dateObject.getFullYear();

    // Format the date as dd-mm-yyyy
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  }

  return (
    <>
      <SideMenu />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <Header title="Manage Coupons" />
        <div className="bg-white p-3 m-3 rounded-2">
          <button type="button" className="btn btn-main" onClick={() => openCouponsModal(0)}>Add Coupon</button>
        </div>
        <div className="m-3">
          <table className="table bg-white">
            <thead className="text-center">
              <tr>
                {/* <th>Coupon ID</th> */}
                <th className="text-start">Coupon Code</th>
                <th className="text-start">Discount</th>
                <th className="text-start">Valid From</th>
                <th className="text-start">Valid To</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {
                // console.log("All coupons : ", allCoupons)
              allCoupons && allCoupons.map((data, index) => (
                <tr className="custom-table-row" key={index}>
                  {/* <td className="all_col">{data.id}</td> */}
                  <td className="all_col text-start">{data.couponcode}</td>
                  <td className="all_col text-start">{data.discount}</td>
                  <td className="all_col text-start">{formatDate(data.validfrom)}</td>
                  <td className="all_col text-start">{formatDate(data.validto)}</td>
                  <td className={data?.isactive === 1 ? 'act_col' : 'inact_col'}>{data.isactive === 1 ? 'Active' : 'Inactive'}</td>
                  <td className="d-flex justify-content-center">
                    <SVG src={editIcon} style={{ fill: '#000', marginRight: 10 }} width={15}
                      onClick={() => openCouponsModal(data.id)}
                    />
                    <div className="form-check form-switch d-flex justify-content-center mt-1" >
                      <input
                        checked={data.isactive === 1 ? true : false}
                        className="form-check-input"
                        type="checkbox"
                        // checked={true}
                        id="flexSwitchCheckDefault"
                        onChange={(e) => act_inact_coupon(e, data.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            }
            </tbody>
          </table>
        </div>

        {/* ------------Add Coupon Modal------------ */}

        <Modal
          show={CouponsModal}
          onHide={closeCouponsModal}
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>{modaltitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-lg-12 mb-3">
                <label className="form-label">Coupon Code</label>
                <input type="text" className="form-control mb-2" placeholder="Enter Coupon Code" disabled
                  value={CouponCode} onChange={(e) => setCouponCode(e.target.value)} />
                <label className="form-label">Discount Amount (%) </label>
                <input type="text" className="form-control mb-2" placeholder="Enter the discount percentage" maxLength={2}
                  value={discount} onChange={(e) => setDiscount(e.target.value)} />
                <label className="form-label">Valid from</label>
                <input type="date" className="form-control mb-2" placeholder="Select Valid From date"
                  value={validFrom} onChange={(e) => setValidFrom(e.target.value)} />
                <label className="form-label">Valid To</label>
                <input type="date" className="form-control mb-2" placeholder="Select Valid To date"
                  value={validTo} onChange={(e) => setValidTo(e.target.value)} />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-main" onClick={saveCoupon} style={{width:'17%'}}>
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
            <Modal.Title>Do you want to delete the Coupon?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-lg-12 mb-3">
                Are you sure you want to delete this Coupon?
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

export default ManageCouponsScreenPub;