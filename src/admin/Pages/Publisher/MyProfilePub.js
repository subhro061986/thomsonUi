import React, { useEffect, useState, } from "react";
import Header from "../../Layout/Header";
import SideMenu from "../../Layout/SideMenu";
import { Link, useNavigate } from "react-router-dom";
import SVG from "react-inlinesvg";
import saveIcon from '../../assets/icons/save.svg';
import publisherLogo from "../../assets/img/juris_press_logo.png";
import { AdminProfile } from "../../Context/AdminContext";
import noImg from '../../assets/img/no-img.png';

import Config from "../../Config/Config.json";
import { useAuth } from "../../Context/AuthContext";

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const MyProfilePub = () => {
  // const navigate = useNavigate();
  // const returnToBookApprovals = () => {
  //   navigate("/bookapprovals");
  // };
  const { authData } = useAuth();
  const { get_myprofile, update_myprofile_cnagepersonalinfo, update_myprofile_cnagecontactinfo } = AdminProfile();

  const [profileinfo, setProfileinfo] = useState([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [altphno, setAltphno] = useState('')
  const [email, setEmail] = useState('')

  const [image, setImage] = useState(null)
  // const [cond, setCond] = useState(false)
  const [imageurl,setImageUrl]  = useState('')




  useEffect(() => {
    get_userprofile()
    console.log("Hello")
  },
    [authData])

  


  const get_userprofile = async () => {
    const resp = await get_myprofile()
    console.log("get_user_profile_inf ", resp)

    if (resp !== undefined) {
      if (resp.data.statuscode === '0') {
        let data = resp.data.output
        setprof_inf(data)

      }

    }

  }



  const setprof_inf = (data) => {


    setName(data?.name)
    setPhone(data?.contactno)
    setEmail(data?.email)
    setAltphno(data?.altcontactno)

    setImage(data.profileimage)
    setImageUrl(Config.API_URL + Config.PROFILE_IMAGES + data.profileimage + '?d='+ new Date())


  }


  const update_prof = async () => {
    const formData = new FormData();

    formData.append('name', name)
    formData.append('profileimage', image)



    await update_personalinfo(formData)


    let json = {
      "email": email,
      "contactno": phone,
      "altcontactno": altphno
    }

    await update_contactinfo(json)

  }

  const update_personalinfo = async (args) => {
    const resp = await update_myprofile_cnagepersonalinfo(args)
    console.log("contactinfo_resp ", resp)
    await get_userprofile()
    // setCond(!cond)
  }

  const update_contactinfo = async (args) => {
    const resp = await update_myprofile_cnagecontactinfo(args)
    console.log("personalinfo_resp ", resp)
    await get_userprofile()
    // setCond(!cond)
  }

 const imagehandler = (e) =>{
  console.log("image" ,URL.createObjectURL(e.target.files[0]))
  setImage(e.target.files[0])
  setImageUrl(URL.createObjectURL(e.target.files[0]))
  // `${Config.API_URL + Config.PROFILE_IMAGES + image}`
 }


  return (
    <>
      <SideMenu />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <Header title="My Profile" />
        <div className="m-3 bg-white p-2">
          <div className="d-flex justify-content-start align-tems-start">
            {/* <div className="content-logo p-3">
              <img src={publisherLogo} alt="publisher logo" />
            </div> */}
            <div className="publisher-details p-3">
              <div className="mb-1">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control mb-2" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control mb-2" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} disabled />
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-control mb-2" placeholder="Enter phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Alternate Phone</label>
                    <input type="text" className="form-control mb-2" placeholder="Enter phone number" value={altphno} onChange={(e) => setAltphno(e.target.value)} />
                  </div>
                </div>

                {/* <div className="d-flex justify-content-between align-items-center"> */}
                <div className="d-flex justify-content-start align-items-end">
                  <div className="form-group">
                    <label className="form-label">Profile Image</label>
                    <div className="input-group">
                      <input type="file" accept=".jpg, .png, .jpeg, .svg" className="form-control" id="logoUpload" onChange={(e) => imagehandler(e)} />
                    </div>
                  </div>
                  <div className="content-logo" style={{ marginLeft: '20px' }}>

                    <img src={image === null ? noImg : imageurl} height={50} width={50} />


                  </div>
                </div>
              </div>
              <button className="btn btn-main mt-3"
                onClick={() => update_prof()}
                style={{width:'10%'}}
              >
                {/* <SVG src={saveIcon} style={{ marginRight: 10 }} width={15} />  */}
                Save
              </button>
            </div>
          </div>
        </div>

        {/* <ToastContainer/> */}
      </div>
    </>
  );
}

export default MyProfilePub;