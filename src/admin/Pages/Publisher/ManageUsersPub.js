import React, { useEffect, useState, } from "react";
import Header from "../../Layout/Header";
import SideMenu from "../../Layout/SideMenu";
import { Link } from "react-router-dom";
import SVG from "react-inlinesvg";
import editIcon from '../../assets/icons/editicon.svg';
import noImg from '../../assets/img/no-img.png';
import trashIcon from '../../assets/icons/deleteicon.svg';
import { Modal } from "react-bootstrap";
import saveIcon from '../../assets/icons/save.svg';
import { AdminProfile } from "../../Context/AdminContext";
import { useAuth } from "../../Context/AuthContext";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Config from "../../Config/Config.json";




const ManageUsersPub = () => {

  const { authDeatils } = useAuth()

  const { add_publisher_user, get_publisher_users, delete_pub_user, restore_pub_user } = AdminProfile();

  const [addPublisherModal, setAddPublisherModal] = useState(false);
  const [existingId, setExistingId] = useState('')
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')
  const [contactno, setContactno] = useState('')
  const [contactnoError, setContactnoError] = useState('')
  const [altcontactno, setAltcontactno] = useState('')
  const [contactemail, setContactemail] = useState('')
  const [contactemailError, setContactemailError] = useState('')

  const [pubId, setPubId] = useState('')
  const [users, setUsers] = useState([])

  // const openUser = () => {
  //   setAddPublisherModal(true);
  // }

  useEffect(() => {
    console.log("authdeatils called", authDeatils);
    setPubId(authDeatils.pub_id)
    get_users()
  }
    , [authDeatils]);

  const get_users = async () => {
    const resp = await get_publisher_users()
    console.log("all_users ", resp)

    if (resp !== undefined) {
      if (resp.data.statuscode === '0') {
        setUsers(resp.data.output)
      }
      else {
        setUsers([])
      }
    }
    else {
      setUsers([])
    }


  }

  const act_inact_pub = async (activeVal, id) => {
    console.log("event :  ", id);
    if (activeVal === 1) {

      if (window.confirm("Do you want to deactivate the user?") == true) {
        // console.log("You pressed OK!");
        await delete_pub_user(id);
        get_users()

      }

      else {
        console.log("You pressed cancel!");
      }

    }
    else {
      await restore_pub_user(id);
      get_users()
    }

  }




  const closeAdddPublisher = () => {
    setAddPublisherModal(false);
    setNameError('')
    setContactnoError('')
    setContactemailError('')
  }



  const savePub_user = () => {
    console.log("publisher_id", existingId)

    if (name === '' && contactno === '' && contactemail === '') {
      setNameError('Please enter Name')
      setContactnoError('Please enter Contact No.')
      setContactemailError('Please enter Contact Email')
    }
    else if (contactno === '' && name === '') {
      setNameError('Please enter Name')
      setContactnoError('Please enter Contact No.')
      setContactemailError('')
    }
    else if (contactno === '' && contactemail === '') {
      setNameError('')
      setContactnoError('Please enter Contact No.')
      setContactemailError('Please enter Contact Email')
    }
    else if (name === '' && contactemail === '') {
      setNameError('Please enter Name')
      setContactnoError('')
      setContactemailError('Please enter Contact Email')
    }
    else if (contactno === '') {
      setNameError('')
      setContactnoError('Please enter Contact No.')
      setContactemailError('')
    }
    else if (name === '') {
      setNameError('Please enter Name')
      setContactnoError('')
      setContactemailError('')
    }
    else if (contactemail === '') {
      setNameError('')
      setContactnoError('')
      setContactemailError('Please enter Contact Email')
    }
    else {

      if (existingId === '') {
        addPub_user();
        console.log("Add publisher user")
      }
      else {


        // updatePub_user();
        console.log("Update Publisher User")
      }
    }


  }








  const addPub_user = async () => {
    // setExistingId('')
    console.log("Inside add pub user.Id : ", existingId)


    let json = {
      "name": name,
      "publisherid": pubId,
      "email": contactemail,
      "contactno": contactno,
      "altcontactno": altcontactno
    }

    console.log('add_user_json ', json)


    const response = await add_publisher_user(json);
    console.log("Add_Publisher_user : ", response);

    if (response !== undefined) {

      if (response.data.statuscode === '0') {

        toast.success("User added successfully", {
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
        toast.error("User addition failed", {
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
    }

    get_users()
    closeAdddPublisher()


  }

  const add_publisheruser = () => {

    setExistingId('');

    setName('');
    setContactemail('');
    setContactno('');
    setAltcontactno('');

    setAddPublisherModal(true);
  }




  return (
    <>
      <SideMenu />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <Header title="Manage Users" />
        <div className="bg-white p-3 m-3 rounded-2">
          <button type="button" className="btn btn-main" onClick={add_publisheruser}>Add User</button>
        </div>
        <div className="m-3">
          <table className="table bg-white">
            <thead className="text-center">
              <tr>
                {/* <th>Image</th> */}
                <th>Name</th>
                <th>Phone</th>
                <th>Alt Phone</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {users.map((data, index) => (
                <tr key={index} className="custom-table-row">
                  {/* <td><img src={data.profileimage === null ? noImg : `${Config.API_URL + Config.PROFILE_IMAGES + data.profileimage + '?d='+ new Date()}`} alt="user logo" height={50} width={50} /></td> */}
                  <td className="all_col">{data?.name?.length > 0 ? data.name : "Not Available"}</td>
                  <td className="all_col">{data?.contactno?.length > 0 ? data.contactno : "Not Available"}</td>
                  <td className="all_col">{data?.altcontactno?.length > 0 ? data.altcontactno : "Not Available"}</td>
                  <td className="all_col">{data?.email?.length > 0 ? data.email : "Not Available"}</td>
                  <td className={data?.isactive === 1 ? 'act_col' : 'inact_col'}>{data.isactive === 1 ? 'Active' : 'Inactive'}</td>
                  <td className="d-flex justify-content-start ">


                    {/* <SVG src={editIcon} style={{ fill: '#000', marginRight: 10 }} width={15} height={15}/> */}




                    <div className="form-check form-switch" >
                      <input checked={data.isactive === 1 ? true : false} className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"
                        onChange={() => act_inact_pub(data.isactive, data.id)} />
                    </div>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
        {/* =========Add Publisher Modal========= */}
        <Modal show={addPublisherModal}
          onHide={closeAdddPublisher}
          backdrop="static"
          centered
          dialogClassName="add-publisher-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Add User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-1">
              <label className="form-label">Name <span className="red"> *</span></label>
              <p style={{ color: 'red' }}>{nameError}</p>
              <input type="text" className="form-control mb-2" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
              <div className="d-flex justify-content-between align-items-center">
                <div className="form-group">
                  <label className="form-label">Email <span className="red"> *</span></label>
                  <p style={{ color: 'red' }}>{contactemailError}</p>
                  <input type="email" className="form-control mb-2" placeholder="Enter email" value={contactemail} onChange={(e) => setContactemail(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone <span className="red"> *</span></label>
                  <p style={{ color: 'red' }}>{contactnoError}</p>
                  <input type="text" className="form-control mb-2" placeholder="Enter phone number" value={contactno} onChange={(e) => setContactno(e.target.value)} required />
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="form-group">
                  <label className="form-label">Alternate Phone</label>
                  <input type="text" className="form-control mb-2" placeholder="Enter phone number" value={altcontactno} onChange={(e) => setAltcontactno(e.target.value)} />
                </div>
                {/* <div className="form-group">
                  <label className="form-label">Profile Image</label>
                  <div className="input-group mb-2">
                    <input type="file" accept=".jpg, .png, .jpeg, .svg" className="form-control" id="logoUpload"  onChange={image} />
                  </div>
                </div> */}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <div className="text-danger">Contact Phone No. is the Default Password for Login</div>
            <button className="btn btn-main" onClick={() => savePub_user()} style={{ width: '10%' }}>
              {/* <SVG src={saveIcon} style={{ marginRight: 10 }} width={15} />  */}
              Save
            </button>
          </Modal.Footer>
        </Modal>


        <ToastContainer />
      </div>
    </>
  );
}

export default ManageUsersPub;