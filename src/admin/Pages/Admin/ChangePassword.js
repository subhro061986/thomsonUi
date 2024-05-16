import React, { useEffect, useState,} from "react";
import Header from "../../Layout/Header";
import SideMenu from "../../Layout/SideMenu";
import saveIcon from '../../assets/icons/save.svg';
import { AdminProfile } from "../../Context/AdminContext";
// import { UserProfile } from "../Context/UserContext";

import SVG from "react-inlinesvg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import {NotificationManager} from 'react-notifications';
// import { Button, ButtonGroup, Dropdown, DropdownButton, Form, Modal, ProgressBar } from 'react-bootstrap';

const ChangePassword=()=> {

  const { publisher_admin_password_change } = AdminProfile();
//   const { allContact , updatePassword} = UserProfile()
//   const [ contactData, setContactData] = useState([])
  const [oldPassword , setOldPassword] = useState('')
  const [newPassword , setNewPassword] = useState('')
  const [confirmPassword , setConfirmPassword] = useState('')

  const [olderror , setOlderror] = useState('')
  const [newerror , setNewerror] = useState('')
  const [confirmerror , setConfirmerror] = useState('')
//   useEffect(() => {
//     if(allContact=== undefined || allContact=== '')
//     {
//       setContactData([])
//     }
//     else{
//       setContactData(allContact.data)
//     }
//   }, [allContact])


  
 const newpasswordHandler = (e) => {
   
  setNewPassword(e.target.value)

 }

 const oldpasswordHandler = (e) => {
   
  setOldPassword(e.target.value)

 }

 const confirmpasswordHandler = (e) => {
   
  setConfirmPassword(e.target.value)

 }


 const passwordchange =async () => {

  if (oldPassword === '' && newPassword === '' && confirmPassword === '') {
    setOlderror('Please enter old password')
    setNewerror('Please enter new password')
    setConfirmerror('Please confirm your new password')
  }
  else if (oldPassword === '' && newPassword === ''){
    setOlderror('Please enter old password')
    setNewerror('Please enter new password')
    setConfirmerror('')
  }
  else if (newPassword === '' && confirmPassword === ''){
    setOlderror('')
    setNewerror('Please enter new password')
    setConfirmerror('Please confirm your new password')
  }
  else if (oldPassword === '' && confirmPassword === '') {
    setOlderror('Please enter old password')
    setNewerror('')
    setConfirmerror('Please confirm your new password')
  }

  else if(oldPassword === '') {
    setOlderror('Please enter old password')
    setNewerror('')
    setConfirmerror('')
  }
  else if (newPassword === ''){
    setOlderror('')
    setNewerror('Please enter new password')
    setConfirmerror('')
  }
  else if (confirmPassword === ''){
    setOlderror('')
    setNewerror('')
    setConfirmerror('Please confirm your new password')
  }
  else {

    if (newPassword !== confirmPassword){

      toast.error("Passwords didn't match", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        closeButton:false,
        style: {fontWeight: 'bold',backgroundColor:"rgb(255, 237, 246)"}
        });
      // NotificationManager.error('Confirm password and new password not matched','ERROR!', 5000);
      console.log("Passwords has not matched")
    }
    else{
      let senddata = {
        'password': oldPassword,
        'newpassword': newPassword
       }
    
       const result = await publisher_admin_password_change(senddata) 
      //  console.log("result", result)

       if (result.data.statuscode === '0'){

        toast.success("Password Changed Successfully", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          closeButton:false,
          theme: "dark",
          });
        setNewPassword('')
        setOldPassword('')
        setConfirmPassword('')
 
        setOlderror('')
        setNewerror('')
        setConfirmerror('')
       }
       else {
         toast.error(result.data.message, {
           position: "top-center",
           autoClose: 2000,
           hideProgressBar: true,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           closeButton: false,
           style: { fontWeight: 'bold', backgroundColor: "rgb(255, 237, 246)" }
         });
       }
      
      //  NotificationManager.info(result.message,'', 5000);
    }
  }


 }

   

  return (
    <>
      <SideMenu/>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <Header title="Change Password"/>
        <div className="body flex-grow-1 px-3">
          <div className="row">
            <div className="col-md-12 mb-2">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Change Password</h5>
                  <div className="col-lg-12 mb-3">
                      <label className="form-label">Old Password</label>
                      <input 
                        type="password" 
                        className="form-control"
                        onChange={oldpasswordHandler}
                        value={oldPassword} 
                      />
                      <p style={{color:'red'}}>{olderror}</p>
                    </div>
                    <div className="col-lg-12 mb-3">
                      <label className="form-label">New Password</label>
                      <input 
                        type="password" 
                        className="form-control"
                        value={newPassword}
                        onChange={newpasswordHandler} 
                      />
                      <p style={{color:'red'}}>{newerror}</p>
                    </div>
                    <div className="col-lg-12 mb-3">
                      <label className="form-label">Confirm Password</label>
                      <input 
                        type="password" 
                        className="form-control"
                        value={confirmPassword}
                        onChange={confirmpasswordHandler}
                      />
                      <p style={{color:'red'}}>{confirmerror}</p>
                    </div>
                    <button className="btn btn-success" 
                      onClick={passwordchange}
                    >
                      <SVG src={saveIcon} style={{marginRight:10}} width={15}/>
                      Save
                    </button>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        <ToastContainer />
      </div>
    </>
  );
}

export default ChangePassword;
