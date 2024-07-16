import React, { useEffect, useState, } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Header from "../../Layout/Header";
import SideMenu from "../../Layout/SideMenu";
import { Link } from "react-router-dom";
import Config from "../../Config/Config.json";
import eye from '../../assets/icons/eye.svg';
import SVG from "react-inlinesvg";
import editIcon from '../../assets/icons/editicon.svg';
import pubLogo from '../../assets/img/publisher_demo.png';
import noImg from '../../assets/img/no-img.png';
import jurisPressLogo from '../../assets/img/juris_press_logo.png';
import trashIcon from '../../assets/icons/deleteicon.svg';
import { Modal } from "react-bootstrap";
import saveIcon from '../../assets/icons/save.svg';
import { AdminProfile } from "../../Context/AdminContext";
import { useAuth } from "../../Context/AuthContext";
import { toHaveFormValues } from "@testing-library/jest-dom/matchers";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManagePublishersScreen = () => {
  const { authDeatils, authData } = useAuth();

  useEffect(() => {
    getPublisherList();
  }
    , []);

  const [addPublisherModal, setAddPublisherModal] = useState(false);
  const [orderDescriptionModal, setOrderDescriptionModal] = useState(false)

  const [publisherList, setPublisherList] = useState([]);

  const [checkbool, setCheckbool] = useState(true)

  const [pubid, setPubid] = useState('')
  const [city, setCity] = useState('')
  const [cityError, setCityError] = useState('')
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')
  const [about, setAbout] = useState('')
  const [aboutError, setAboutError] = useState('')
  const [gst, setGst] = useState('')
  const [gstError, setGstError] = useState('')

  // const [pan, setPan] = useState('')
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState('')
  const [state, setState] = useState('')
  const [stateError, setStateError] = useState('')
  const [stateList, setStateList] = useState([])
  const [stateId, setStateId] = useState(0)
  const [isactive, setIsactive] = useState('')
  const [contactno, setContactno] = useState('')
  const [contactnoError, setContactnoError] = useState('')
  const [country, setCountry] = useState('')
  const [countryError, setCountryError] = useState('')
  const [countries, setCountries] = useState([])
  const [countryId, setCountryId] = useState(0)
  const [commission, setCommission] = useState('')
  const [commissionError, setCommissionError] = useState('')
  const [adressline, setAdressline] = useState('')
  const [adresslineError, setAdresslineError] = useState('')
  const [maxdiscount, setMaxdiscount] = useState('')
  const [maxdiscountError, setMaxdiscountError] = useState('')
  const [altcontactno, setAltcontactno] = useState('')
  const [contactemail, setContactemail] = useState('')
  const [contactemailError, setContactemailError] = useState('')
  const [contactperson, setContactPerson] = useState('')
  const [contactpersonError, setContactPersonError] = useState('')
  const [spcom1, setSpcom1] = useState('')
  const [spcom1Error, setSpcom1Error] = useState('')
  const [spcom2, setSpcom2] = useState('')
  const [spcom2Error, setSpcom2Error] = useState('')
  const [imageHandler, setImageHandler] = useState(null)
  const [logoError, setLogoError] = useState('')
  const [bannerimageHandler, setBannerImageHandler] = useState(null)
  const [bannerError, setBannerError] = useState('')
  const [existingId, setExistingId] = useState('')

  const [bannertext, setBannertext] = useState('')

  const [isValid, setIsValid] = useState(true)


  const { getAllPublishers, getPublisherDetails, addPublisher_admin, updatePublisher_admin, deletePublisher_admin, restore_publisher, get_all_countries, get_state_by_id, get_states_by_country } = AdminProfile();


  const act_inact_pub = (activeVal, id) => {
    // console.log("event :  ", e.target.value);
    if (activeVal === 1) {

      if (window.confirm("Do you want to deactivate the publisher?") == true) {
        // console.log("You pressed OK!");
        delete_Pub(id);
      } else {
        console.log("You pressed cancel!");
      }

    }
    else {
      restore(id);
    }

  }

  useEffect(() => {
    // console.log("My_login_details ", authDeatils)
    get_countries()
    get_states_by_country()
    get_states()
  }, [authData])

  const get_state_inf = async (st_id) => {

    // console.log('state_id ', st_id)
    const resp = await get_state_by_id(st_id)
    setStateList([resp.data.output])


    // console.log("get_state_inf ", resp)
  }


  const get_states = async (c_id) => {
    const resp = await get_states_by_country(c_id)


    if (resp !== undefined) {

      if (resp.data.statuscode === '0') {
        // console.log("states ", resp.data.output)
        setStateList(resp.data.output)
      }
    }

    else {
      setStateList([])
    }

  }

  const get_countries = async () => {
    const resp = await get_all_countries()
    if (resp !== undefined) {
      if (resp.data.statuscode === '0') {
        // console.log("countries ", resp.data.output)
        setCountries(resp.data.output)
      }
    }

    else {
      setCountries([])
    }

  }

  const delete_Pub = async (id) => {
    const response = await deletePublisher_admin(id);
    getPublisherList()

  }


  const restore = async (id) => {
    const response = await restore_publisher(id);
    getPublisherList()

  }

  const getPublisherList = async () => {
    const response = await getAllPublishers();
    // console.log("Publishers : ", response?.data?.output);
    setPublisherList(response?.data?.output);
  }

  const addPub_admin = async () => {
    setExistingId('')
    // console.log("Inside add pub admin. Exiting Id : ", existingId)

    const formData = new FormData();

    formData.append('name', name)
    // formData.append('contactperson', contactperson)
    formData.append('email', contactemail)
    formData.append('contactno', contactno)
    formData.append('altcontactno', altcontactno)
    formData.append('gstin', gst)
    // formData.append('panno', pan)
    formData.append('addressline', adressline)
    formData.append('city', city)
    formData.append('pincode', pin)
    formData.append('stateid', stateId)
    formData.append('countryid', countryId)
    // formData.append('maxdiscount', maxdiscount)
    // formData.append('commission', commission)
    // formData.append('special_commission_1', spcom1)
    // formData.append('special_commission_2', spcom2)
    // formData.append('about', about)
    formData.append('logo', imageHandler)
    // formData.append('banner', bannerimageHandler)


    const response = await addPublisher_admin(formData);
    // console.log("Add_Publishers_resp : ", response);
    getPublisherList()
    closeAdddPublisher()

    return response
  }

  const updatePub_admin = async () => {


    const formData = new FormData();

    // formData.append('id', pubid)
    formData.append('name', name)
    // formData.append('contactperson', contactperson)
    formData.append('email', contactemail)
    formData.append('contactno', contactno)
    formData.append('altcontactno', altcontactno)
    formData.append('gstin', gst)
    // formData.append('panno', pan)
    formData.append('addressline', adressline)
    formData.append('city', city)
    formData.append('pincode', pin)
    formData.append('stateid', stateId)
    formData.append('countryid', countryId)
    // formData.append('maxdiscount', maxdiscount)
    // formData.append('commission', commission)
    // formData.append('special_commission_1', spcom1)
    // formData.append('special_commission_2', spcom2)
    // formData.append('about', about);
    formData.append('logo', imageHandler)
    // console.log("logo", imageHandler);
    // formData.append('banner', bannerimageHandler)
    // console.log("banner", bannerimageHandler);

    const response = await updatePublisher_admin(existingId, formData);
    // console.log("Update_Publishers_resp : ", response);


    getPublisherList()
    closeAdddPublisher()

    return response
  }

  const image = (e) => {
    setImageHandler(e.target.files[0])
    // console.log("image : ", e.target.files[0]);
  }

  const banner_image = (e) => {
    setBannerImageHandler(e.target.files[0])
    // console.log("banner_image : ", e.target.files[0]);
  }

  const select_country = async (e) => {
    // alert(e.target.value)
    // console.log("country_id", e.target.value)
    setCountryId(e.target.value)
    let country_id = e.target.value
    await get_states(country_id)
  }


  const select_states = async (e) => {
    // alert(e.target.value)
    setStateId(e.target.value);
    // console.log("state_id", e.target.value);

  }


  const savePub = async () => {
    // console.log("publisher_id", existingId)

    // let isValid = true;
    // else {
    if (existingId === '') {

      // console.log('about', about)
      // console.log('gst', gst)
      // console.log('pin', pin)
      // console.log('state', state)
      // console.log('contactno', contactno)
      // console.log('country', country)
      // console.log('commission', commission)
      // console.log('adressline', adressline)
      // console.log('maxdiscount', maxdiscount)
      // console.log('contactemail', contactemail)
      // console.log('contactperson', contactperson)
      // console.log('spcom1', spcom1)
      // console.log('spcom2', spcom2)
      // console.log('imageHandler', imageHandler)
      // console.log('bannerimageHandler', bannerimageHandler)
      // console.log('name', name)
      // console.log('city', city)



      // if (
      //   // about === '' ||
      // gst === '' || pin === '' 
      // // || stateId === 0
      //   || contactno === '' 
      //   || countryId === 0 
      //   // || commission === ''
      //   || adressline === '' 
      //   // || maxdiscount === '' 
      //   || contactemail === ''
      //   // || contactperson === '' 
      //   // || spcom1 === '' || spcom2 === ''
      //   // || imageHandler === null || bannerimageHandler === null 
      //   || name === ''
      //   || city === '') {
      //   alert('Please enter all starred fields');
      // }

      // return isValid;


      // else {


      let resp = await addPub_admin();
      // console.log("add_resp ", resp)

      if (resp !== undefined) {

        if (resp.data.statuscode === '0' && resp.data.message === 'Information saved successfully.') {

          toast.success("Publisher added successfully", {
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
      }


      else {
        toast.error("Publisher addition failed", {
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
      // console.log("admin_add_pub_called ", resp)



      // }

      // return isValid;

    }

    else {
      let resp = await updatePub_admin();

      // console.log("edit_resp ", resp)

      if (resp !== undefined) {

        if (resp.data.statuscode === '0' && resp.data.message === 'Information saved successfully.') {

          toast.success("Publisher updated successfully", {
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
      }


      else {
        toast.error("Publisher updation failed", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          closeButton: false,
          // theme : "light"
          style: { fontWeight: 'bold', backgroundColor: "rgb(255, 237, 246)" }
        });
      }
    }
    // }
  }

  const openAdddPublisher = () => {
    setExistingId('');
    setPubid('')
    setCity('');
    setName('');
    // setAbout('');
    setGst('');
    // setPan('');
    setPin('');
    setState('');
    setIsactive('');
    setContactno('');
    setCountry('');
    setCountryId(0);
    setStateId(0);
    // setCommission('');
    setAdressline('');
    // setMaxdiscount('');
    setAltcontactno('');
    setContactemail('');
    // setContactPerson('');
    // setSpcom1('');
    // setSpcom2('');
    setAddPublisherModal(true);
    // setBannerImageHandler(null);

    // clear modal

  }

  const editPubMoadl = (id) => {
    // console.log("edit_id :", id)
    setAddPublisherModal(true);
    pub_det(id)
  }


  const closeAdddPublisher = () => {
    // if(isValid){
    setAddPublisherModal(false);

    // }



    // setBannerImageHandler(null);
    setPubid('')
    setCity('');
    setName('');
    // setAbout('');
    setGst('');
    // setPan('');
    setPin('');
    setState('');
    setIsactive('');
    setContactno('');
    setCountry('');
    setCountryId(0);
    setStateId(0);
    // setCommission('');
    setAdressline('');
    // setMaxdiscount('');
    setAltcontactno('');
    setContactemail('');
    // setContactPerson('');
    // setSpcom1('');
    // setSpcom2('');

    //clear error message


    // setAboutError('')
    // setGstError('')
    // setPinError('')
    // setStateError('')
    // setContactnoError('')
    // setCountryError('')
    // setCommissionError('')
    // setAdresslineError('')
    // setMaxdiscountError('')
    // setContactemailError('')
    // setContactPersonError('')
    // setSpcom1Error('')
    // setSpcom2Error('')
    // setLogoError('')
    // setBannerError('')
    // setNameError('')
    // setCityError('')

  }



  const openOrderDescriptionModal = (id) => {
    pub_det(id)
    setOrderDescriptionModal(true)
  }

  const closeOrderDescriptionModal = () => {
    setOrderDescriptionModal(false)
  }

  const pub_det = async (id) => {
    const response = await getPublisherDetails(id);
    // console.log("Publisher Details : ", response.data.output);
    // console.log("Publisher keys : ", response.data.output.keys());

    setExistingId(response.data.output.id);

    setImageHandler(null);
    // setBannerImageHandler(null);

    setPubid(response.data.output.id)
    setCity(response.data.output.city);
    setName(response.data.output.name);
    // setAbout(response.data.output.about);
    setGst(response.data.output.gstin);
    // setPan(response.data.output.panno);
    setPin(response.data.output.pincode);
    setState(response.data.output.state);
    setStateId(response.data.output.stateid);
    setIsactive(response.data.output.isactive);
    setContactno(response.data.output.contactno);
    setCountry(response.data.output.country);
    setCountryId(response.data.output.countryid);
    // setCommission(response.data.output.commission);
    setAdressline(response.data.output.addressline);
    // setMaxdiscount(response.data.output.maxdiscount);
    setAltcontactno(response.data.output.altcontactno);
    setContactemail(response.data.output.email);
    // setContactPerson(response.data.output.contactperson);
    // setSpcom1(response.data.output.special_commission_1);
    // setSpcom2(response.data.output.special_commission_2);
  }

  return (
    <>
      <SideMenu />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <Header title="Manage Publishers" />
        <div className="bg-white p-3 m-3 rounded-2">
          <button type="button" className="btn btn-main" onClick={openAdddPublisher}>Add Publisher</button>
        </div>
        <div className="m-3">
          <table className="table bg-white">
            <thead className="text-center">
              <tr>
                {/* <th>Logo</th> */}
                <th className="text-start">Name</th>
                {/* <th className="text-start">Contact Person</th> */}
                <th className="text-start">Contact Email</th>
                <th className="text-start">Contact Phone</th>


                <th className="text-start">Status</th>
                <th className="text-start">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {
                publisherList && publisherList.map((data, index) => (
                  <tr className="custom-table-row" key={index}>
                    {/* <td><img src={data.logo === null ? noImg : `${Config.API_URL + Config.PUB_IMAGES + data.id + "/" + data.logo}`} alt="publisher logo" width={85} height={30} /></td> */}
                    <td className="all_col text-start" data-bs-toggle="tooltip" data-bs-placement="top" title={data.name} style={{ cursor: "pointer" }}>{data.name === null ? 'Not Available' : data.name.length > 18 ? data.name.substring(0, 18) + '...' : data.name}</td>
                    {/* <td className="all_col text-start">{data.contactperson === null || data?.contactperson?.length === 0 ? 'Not Available' : data.contactperson}</td> */}
                    <td className="all_col text-start">{data.email === null || data?.email?.length === 0 ? 'Not Available' : data.email}</td>
                    <td className="all_col text-start">{data.contactno === null || data?.contactno?.length === 0 ? 'Not Available' : data.contactno}</td>


                    <td className={data?.isactive === 1 ? 'act_col text-start' : 'inact_col text-start'}>{data.isactive === 1 ? 'Active' : 'Inactive'}</td>
                    <td>
                      <div className="d-flex justify-content-start align-items-start">
                        <SVG src={editIcon}
                          style={{ fill: '#FF0000', marginRight: 10, marginTop: 1 }}
                          width={15} height={15}
                          onClick={() => editPubMoadl(data.id)} />
                        {/* <SVG src={trashIcon} style={{ fill: '#dc3545', marginRight: 10 }} width={15} 
                      onClick={()=>openActInactModal(data.id)}/> */}


                        <div className="form-check form-switch" style={{ marginRight: 5 }} >
                          <input checked={data.isactive === 1 ? true : false} className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"
                            onChange={(e) => act_inact_pub(data.isactive, data.id)} />
                        </div>


                        <SVG src={eye}
                          height={20} width={20}
                          onClick={() => openOrderDescriptionModal(data.id)}
                          style={{ fill: '#787B85' }}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              }
              {/* <tr className="custom-table-row">
                  <td><img src={jurisPressLogo} alt="publisher logo" /></td>
                  <td className="all_col">Juris Press</td>
                  <td className="all_col">9553456780</td>
                  <td className="all_col">info@jurispress.com</td>
                  <td className="act_col">Active</td>
                  <td className="all_col">12/A MG Road, Mum...</td>
                  <td className="all_col">Lorem ipsum, dolor...</td>
                  <td>
                    <SVG src={editIcon} style={{ fill: '#000', marginRight: 10 }} width={15} />
                    <SVG src={trashIcon} style={{ fill: '#dc3545', marginRight: 10 }} width={15} />
                  </td>
                </tr> */}
            </tbody>
          </table>
        </div>
        {/* =========Add Publisher Modal========= */}
        <Modal show={addPublisherModal} onHide={closeAdddPublisher} centered
          backdrop="static"
          dialogClassName="add-publisher-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>{existingId === '' ? 'Add Publisher' : 'Edit Publisher'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {existingId === '' ? (
              <div className="mb-1">
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label">Publisher Name <span className="red"> *</span></label>

                    <input type="text" className="form-control mb-2" placeholder="Type Publisher Name"
                      onChange={(e) => setName(e.target.value)} value={name} required />
                    <p style={{ color: 'red' }}>{nameError}</p>
                    {/* <label className="form-label"> Contact Person <span className="red"> *</span></label>
                  <input type="text" className="form-control mb-2" placeholder="Enter Contact Person"
                    onChange={(e) => setContactPerson(e.target.value)} value={contactperson} required />
                  <p style={{ color: 'red' }}>{contactpersonError}</p> */}
                    <label className="form-label"> Contact Phone <span className="red"> *</span></label>
                    <input type="text" className="form-control mb-2" placeholder="Enter phone number"
                      onChange={(e) => setContactno(e.target.value)} value={contactno} required />
                    <p style={{ color: 'red' }}>{contactnoError}</p>
                    {/* <label className="form-label">About Publisher <span className="red"> *</span></label> */}
                    {/* <div className="input-group">
                    <textarea className="form-control" placeholder="Enter about text for the publisher" aria-label="Enter about text for the publisher" onChange={(e) => setAbout(e.target.value)} value={about}></textarea>
                  </div> */}




                    {/* <ReactQuill placeholder="Enter Description here..."
                    theme="snow"
                    value={about}
                    onChange={setAbout} required />
                  <p style={{ color: 'red' }}>{aboutError}</p> */}

                    <label className="form-label" style={{ paddingTop: '4%' }}>Zip Code <span className="red"> *</span></label>
                    <input type="text" className="form-control mb-2" placeholder="Enter pin code"
                      onChange={(e) => setPin(e.target.value)} value={pin} required />
                    <p style={{ color: 'red' }}>{pinError}</p>
                    <label className="form-label">State</label>
                    {/* <input type="text" className="form-control mb-2" placeholder="Enter state"
                    onChange={(e) => setState(e.target.value)} value={state} /> */}
                    <select className="form-select publisher-profile-select" aria-label="Select state"
                      // value={selectedstate}  
                      onChange={select_states} required>
                      <option value='0'>--Select--</option>

                      {
                        stateList && stateList.map((data) => (
                          <option key={data.id} value={data.id} selected={stateId === data.id ? true : false}>{data.name}</option>
                        ))
                      }
                    </select>
                    <p style={{ color: 'red' }}>{stateError}</p>
                    <label className="form-label">GSTIN <span className="red"> *</span></label>
                    <input type="text" className="form-control mb-2" placeholder="Enter GSTIN"
                      onChange={(e) => setGst(e.target.value)} value={gst} required />
                    <p style={{ color: 'red' }}>{gstError}</p>
                    {/* <label className="form-label">Revenue Share % <span className="red"> *</span></label>
                  <input type="text" className="form-control mb-2" placeholder="Enter commission"
                    onChange={(e) => setCommission(e.target.value)} value={commission} required />
                  <p style={{ color: 'red' }}>{commissionError}</p>
                  <label className="form-label">Special Commission 2 <span className="red"> *</span></label>
                  <input type="text" className="form-control mb-2" placeholder="Enter sp comm 2"
                    onChange={(e) => setSpcom2(e.target.value)} value={spcom2} required />
                  <p style={{ color: 'red' }}>{spcom2Error}</p> */}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Upload Logo</label>
                    <div className="input-group mb-2">
                      <input type="file" accept=".jpg, .png, .jpeg, .svg" className="form-control" id="logoUpload"
                        onChange={image} required />
                      <p style={{ color: 'red' }}>{logoError}</p>
                    </div>
                    <label className="form-label">Email <span className="red"> *</span></label>
                    <input type="email" className="form-control mb-2" placeholder="Enter email"
                      onChange={(e) => setContactemail(e.target.value)} value={contactemail} required />
                    <p style={{ color: 'red' }}>{contactemailError}</p>
                    <label className="form-label"> Alternative Contact Phone <span className="red"> *</span></label>
                    <input type="text" className="form-control mb-2" placeholder="Enter alternative phone number"
                      onChange={(e) => setAltcontactno(e.target.value)} value={altcontactno} />
                    <label className="form-label">Address <span className="red"> *</span></label>
                    <div className="input-group">
                      <textarea className="form-control" placeholder="Enter the publisher's address" aria-label="Enter the publisher's address" onChange={(e) => setAdressline(e.target.value)} value={adressline} required></textarea>
                    </div>
                    <p style={{ color: 'red' }}>{adresslineError}</p>
                    <label className="form-label">City <span className="red"> *</span></label>
                    <input type="text" className="form-control mb-2" placeholder="Enter city"
                      onChange={(e) => setCity(e.target.value)} value={city} required />
                    <p style={{ color: 'red' }}>{cityError}</p>
                    <label className="form-label">Country</label>
                    {/* <input type="text" className="form-control mb-2" placeholder="Enter country"
                    onChange={(e) => setCountry(e.target.value)} value={country} /> */}
                    {/* <input type="text" className="form-control mb-2" placeholder="Enter country"
                      onChange={(e) => setCountry(e.target.value)} value={country} /> */}
                    <select className="form-select publisher-profile-select" aria-label="Select country"
                      onChange={(e) => select_country(e)} required>
                      <option value='0'>--Select--</option>
                      {
                        countries && countries.map((data) => (
                          <option key={data.id} value={data.id} selected={countryId === data.id ? true : false}>{data.name}</option>
                        ))}
                    </select>
                    <p style={{ color: 'red' }}>{countryError}</p>
                    {/* <label className="form-label">Max Discount Permissible <span className="red"> *</span></label>
                  <input type="text" className="form-control mb-2" placeholder="Enter max discount"
                    onChange={(e) => setMaxdiscount(e.target.value)} value={maxdiscount} required />
                  <p style={{ color: 'red' }}>{maxdiscountError}</p>
                  <label className="form-label">Special Commission 1 <span className="red"> *</span></label>
                  <input type="text" className="form-control mb-2" placeholder="Enter sp comm 1"
                    onChange={(e) => setSpcom1(e.target.value)} value={spcom1} required />
                  <p style={{ color: 'red' }}>{spcom1Error}</p> */}


                    {/* <label className="form-label">Banner Upload</label>
                  <div className="input-group mb-2">
                    <input type="file" accept=".jpg, .png, .jpeg, .svg" className="form-control" id="logoUpload"
                      onChange={banner_image} required />
                  </div>
                  <p style={{ color: 'red' }}>{bannerError}</p> */}

                    {/* <label className="form-label">Banner Text</label>
                  <input type="text" className="form-control mb-2" placeholder="Enter state"
                    onChange={(e) => setBannertext(e.target.value)} value={bannertext} /> */}
                  </div>
                </div>


                {/* <div className="d-flex justify-content-between align-items-center"> */}
                {/* <div className="form-group"> */}

                {/* </div> */}
                {/* <div className="form-group"> */}
                {/* <label className="form-label"> Contact Phone</label>
              <input type="text" className="form-control mb-2" placeholder="Enter phone number"
                onChange={(e) => setContactno(e.target.value)} value={contactno} /> */}




                {/* </div> */}

                {/* <div className="form-group"> */}

                {/* </div> */}
                {/* <div className="form-group"> */}

                {/* </div> */}
                {/* <div className="form-group"> */}

                {/* </div> */}
                {/* <div className="form-group"> */}

                {/* </div> */}
                {/* <div className="form-group"> */}


                {/* <label className="form-label">Pan No</label>
              <input type="text" className="form-control mb-2" placeholder="Enter pan no" 
              onChange={(e) => setPan(e.target.value)} value={pan} /> */}







                {/* </div> */}
                {/* </div> */}

                {/* <div className="d-flex justify-content-between align-items-center"> */}

                {/* <div className="d-flex justify-content-between align-items-center">
                <div className="form-group">
                  <label className="form-label">Facebook</label>
                  <input type="text" className="form-control mb-2" placeholder="Enter Facebook url" />
                </div>
                <div className="form-group">
                  <label className="form-label">LinkedIn</label>
                  <input type="text" className="form-control mb-2" placeholder="Enter LinkedIn url" />
                </div>
              </div> */}
                {/* <div className="d-flex justify-content-between align-items-center">
                <div className="form-group">
                  <label className="form-label">YouTube</label>
                  <input type="text" className="form-control mb-2" placeholder="Enter YouTube url" />
                </div>
                <div className="form-group">
                  <label className="form-label">Instagram</label>
                  <input type="text" className="form-control mb-2" placeholder="Enter Instagram url" />
                </div>
              </div> */}
                {/* <div className="d-flex justify-content-start align-items-center is-active">
                <label>Is Active ?</label>
                <input className="form-check-input mt-0" type="checkbox" />
              </div> */}
                {/* </div> */}
              </div>
            ) : (
              <div className="mb-1">
                {/* <p>{existingId}</p> */}
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label">Publisher Name <span className="red"> *</span></label>
                    <input type="text" className="form-control mb-2" placeholder="Type Publisher Name"
                      onChange={(e) => setName(e.target.value)} value={name} />
                    {/* <label className="form-label"> Contact Person </label>
                    <input type="text" className="form-control mb-2" placeholder="Enter Contact Person"
                      onChange={(e) => setContactPerson(e.target.value)} value={contactperson} /> */}
                    <label className="form-label"> Contact Phone </label>
                    <input type="text" className="form-control mb-2" placeholder="Enter phone number"
                      onChange={(e) => setContactno(e.target.value)} value={contactno} />
                    {/* <label className="form-label">About Publisher </label> */}
                    {/* <div className="input-group" contentEditable="true"> */}
                    {/* <p className="form-control" 
                      placeholder="Enter about text for the publisher" 
                      aria-label="Enter about text for the publisher" 
                      onChange={(e) => setAbout(e.target.value)} 
                      dangerouslySetInnerHTML={{ __html: about }}
                      value={about}
                      ></p> */}
                    {/* <ReactQuill placeholder="Enter Description here..."
                      theme="snow"
                      value={about}
                      onChange={setAbout} /> */}
                    {/* </div> */}
                    <label className="form-label mt-2">Zip Code </label>
                    <input type="text" className="form-control mb-2" placeholder="Enter pin code"
                      onChange={(e) => setPin(e.target.value)} value={pin} />
                    <label className="form-label">State <span className="red"> *</span></label>
                    {/* <input type="text" className="form-control mb-2" placeholder="Enter state"
                    onChange={(e) => setState(e.target.value)} value={state} /> */}
                    <select className="form-select publisher-profile-select" aria-label="Select state"
                      // value={selectedstate}  
                      onChange={(e) => select_states(e)}>
                      <option value='0'>--Select--</option>
                      {
                        stateList && stateList.map((data) => (
                          <option key={data.id} value={data.id} selected={stateId === data.id ? true : false}>{data.name}</option>
                        ))
                      }
                    </select>
                    <label className="form-label">GSTIN </label>
                    <input type="text" className="form-control mb-2" placeholder="Enter GSTIN"
                      onChange={(e) => setGst(e.target.value)} value={gst} />
                    {/* <label className="form-label">Revenue Share % </label>
                    <input type="text" className="form-control mb-2" placeholder="Enter commission"
                      onChange={(e) => setCommission(e.target.value)} value={commission} />
                    <label className="form-label">Special Commission 2 </label>
                    <input type="text" className="form-control mb-2" placeholder="Enter sp comm 2"
                      onChange={(e) => setSpcom2(e.target.value)} value={spcom2} disabled /> */}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Upload Logo</label>
                    <div className="input-group mb-2">
                      <input type="file" accept=".jpg, .png, .jpeg, .svg" className="form-control" id="logoUpload"
                        onChange={image} />
                    </div>
                    <label className="form-label">Email </label>
                    <input type="email" className="form-control mb-2" placeholder="Enter email"
                      onChange={(e) => setContactemail(e.target.value)} value={contactemail} />
                    <label className="form-label"> Alternative Contact Phone </label>
                    <input type="text" className="form-control mb-2" placeholder="Enter alternative phone number"
                      onChange={(e) => setAltcontactno(e.target.value)} value={altcontactno} />
                    <label className="form-label">Address</label>
                    <div className="input-group">
                      <textarea className="form-control" placeholder="Enter the publisher's address" aria-label="Enter the publisher's address" onChange={(e) => setAdressline(e.target.value)} value={adressline}></textarea>
                    </div>
                    <label className="form-label">City </label>
                    <input type="text" className="form-control mb-2" placeholder="Enter city"
                      onChange={(e) => setCity(e.target.value)} value={city} />
                    <label className="form-label">Country <span className="red"> *</span></label>
                    {/* <input type="text" className="form-control mb-2" placeholder="Enter country"
                      onChange={(e) => setCountry(e.target.value)} value={country} /> */}
                    <select className="form-select publisher-profile-select" aria-label="Select country" onChange={(e) => select_country(e)}>
                      <option value='0'>--Select--</option>
                      {
                        countries && countries.map((data) => (
                          <option key={data.id} value={data.id} selected={countryId === data.id ? true : false}>{data.name}</option>
                        ))}
                    </select>
                    {/* <label className="form-label">Max Discount Permissible </label>
                    <input type="text" className="form-control mb-2" placeholder="Enter max discount"
                      onChange={(e) => setMaxdiscount(e.target.value)} value={maxdiscount} />
                    <label className="form-label">Special Commission 1 </label>
                    <input type="text" className="form-control mb-2" placeholder="Enter sp comm 1"
                      onChange={(e) => setSpcom1(e.target.value)} value={spcom1} disabled /> */}
                    {/* <label className="form-label">Banner Upload</label>
                    <div className="input-group mb-2">
                      <input type="file" accept=".jpg, .png, .jpeg, .svg" className="form-control" id="logoUpload"
                        onChange={banner_image} />
                    </div> */}
                  </div>
                </div>


                {/* <div className="d-flex justify-content-between align-items-center"> */}
                {/* <div className="form-group"> */}

                {/* </div> */}
                {/* <div className="form-group"> */}
                {/* <label className="form-label"> Contact Phone</label>
              <input type="text" className="form-control mb-2" placeholder="Enter phone number"
                onChange={(e) => setContactno(e.target.value)} value={contactno} /> */}




                {/* </div> */}

                {/* <div className="form-group"> */}

                {/* </div> */}
                {/* <div className="form-group"> */}

                {/* </div> */}
                {/* <div className="form-group"> */}

                {/* </div> */}
                {/* <div className="form-group"> */}

                {/* </div> */}
                {/* <div className="form-group"> */}
                {/* <label className="form-label">Pan No</label>
              <input type="text" className="form-control mb-2" placeholder="Enter pan no" 
              onChange={(e) => setPan(e.target.value)} value={pan} /> */}

                {/* </div> */}
                {/* </div> */}

                {/* <div className="d-flex justify-content-between align-items-center"> */}

                {/* <div className="d-flex justify-content-between align-items-center">
                <div className="form-group">
                  <label className="form-label">Facebook</label>
                  <input type="text" className="form-control mb-2" placeholder="Enter Facebook url" />
                </div>
                <div className="form-group">
                  <label className="form-label">LinkedIn</label>
                  <input type="text" className="form-control mb-2" placeholder="Enter LinkedIn url" />
                </div>
              </div> */}
                {/* <div className="d-flex justify-content-between align-items-center">
                <div className="form-group">
                  <label className="form-label">YouTube</label>
                  <input type="text" className="form-control mb-2" placeholder="Enter YouTube url" />
                </div>
                <div className="form-group">
                  <label className="form-label">Instagram</label>
                  <input type="text" className="form-control mb-2" placeholder="Enter Instagram url" />
                </div>
              </div> */}
                {/* <div className="d-flex justify-content-start align-items-center is-active">
                <label>Is Active ?</label>
                <input className="form-check-input mt-0" type="checkbox" />
              </div> */}
                {/* </div> */}
              </div>
            )
            }

          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-end">
            {/* {existingId === '' &&
              <div className="text-danger">Contact Phone No. is the Default Password for Login</div>
            } */}
            <button className="btn btn-main" onClick={() => savePub()} style={{ width: '12%' }}>
              {/* <SVG src={saveIcon} style={{ marginRight: 10 }} width={15} />  */}
              Save
            </button>
          </Modal.Footer>
        </Modal>



        {/* ------------View publisher Modal------------ */}

        <Modal
          show={orderDescriptionModal}
          onHide={closeOrderDescriptionModal}
          backdrop="static"
          className="modal-xl"
        >
          <Modal.Header closeButton>
            <Modal.Title>{name}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: '500px' }}>
            <div className="row">
              <div className="col-md-6">
                <div>
                  <div className="card card-body" style={{ minHeight: '322px' }}>
                    {/* <p className="card-text">
                      <strong>Contact Person</strong> : {contactperson}
                    </p> */}
                    <p className="card-text">
                      <strong>Contact Email</strong> : {contactemail}
                    </p>
                    <p className="card-text">
                      <strong>Contact Phone</strong> : {contactno}
                    </p>
                    <p className="card-text">
                      <strong>Alternative Phone</strong> : {altcontactno}
                    </p>

                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <div className="card card-body" style={{ minHeight: '322px' }}>
                    <p className="card-text">
                      <strong>Address</strong> : {adressline}
                    </p>
                    <p className="card-text">
                      <strong>Pin Code</strong> : {pin}
                    </p>
                    <p><strong> City </strong> : {city}  </p>
                    <p><strong>  State </strong> : {state} </p>
                    <p><strong>  Country  </strong> : {country} </p>
                    <p><strong>  GST In </strong> : {gst} </p>

                  </div>
                </div>

              </div>
              {/* <div className="col-md-4">
                <div>
                  <div className="card card-body" style={{ minHeight: '322px' }}>
                    <p><strong>  Max Discount Permissible</strong> : {maxdiscount}  </p>
                    <p><strong>  Revenue Share % </strong>  : {commission} </p>
                    <p><strong>  Special Commission 1 </strong> : {spcom1}  </p>
                    <p><strong>  Special Commission 2 </strong> : {spcom2}</p>
                  </div>
                </div>
              </div> */}

              {/* <div className="row mt-3">
                <div className="col-md-12">
                  <div className="card card-body" style={{ minHeight: '297px' }}>
                    <p><strong> About &nbsp; </strong></p>
                    <div dangerouslySetInnerHTML={{ __html: about }}></div>
                  </div>
                </div>
              </div> */}
            </div>
          </Modal.Body>
        </Modal>
        <ToastContainer />
      </div>
    </>
  );
}

export default ManagePublishersScreen;