import React, { useEffect, useState, } from "react";
import Header from "../../Layout/Header";
import SideMenu from "../../Layout/SideMenu";
import { Link, useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import SVG from "react-inlinesvg";
import noImg from '../../assets/img/no-img.png';
import saveIcon from '../../assets/icons/save.svg';
import publisherLogo from "../../assets/img/juris_press_logo.png";
import { AdminProfile } from "../../Context/AdminContext";
import { useAuth } from "../../Context/AuthContext";
import Config from "../../Config/Config.json";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ManageContentPub = () => {
  // const navigate = useNavigate();
  // const returnToBookApprovals = () => {
  //   navigate("/bookapprovals");
  // };

  const { get_pub_details, get_states_by_country, update_pub_details, get_all_countries, get_state_by_id } = AdminProfile();
  const { authDeatils, authData } = useAuth();

  // const [pubid,setPubId] = useState()



  const [pubid, setPubid] = useState(0)


  const [pubname, setPubName] = useState('')
  const [contactemail, setContactemail] = useState('')
  const [contactno, setContactno] = useState('')
  const [contactperson, setContactPerson] = useState('')
  const [adress, setAdress] = useState('')
  const [country, setCountry] = useState(0)
  const [state, setState] = useState([])
  const [statename, setStatename] = useState('')
  const [selectedstate, setSelectedState] = useState(0)
  const [selectedcountry, setSelectedCountry] = useState(0)
  const [city, setCity] = useState('')
  const [pin, setPin] = useState('')
  const [gstin, setGstin] = useState('')
  const [about, setAbout] = useState('')
  const [image, setImage] = useState(null)
  const [countryname, setCountryName] = useState('')


  const [countries, setCountries] = useState([])
  const [imageurl, setImageUrl] = useState('')






  useEffect(() => {
    console.log("My_login_details ", authDeatils)
    setPubid(authDeatils.pub_id)
    get_pub_info(authDeatils.pub_id, false)
    get_countries()

  },
    [authData])


  const imagehandler = (e) => {
    console.log("image", URL.createObjectURL(e.target.files[0]))
    setImage(e.target.files[0])
    setImageUrl(URL.createObjectURL(e.target.files[0]))
    // `${Config.API_URL + Config.PROFILE_IMAGES + image}`
  }


  const get_state_inf = async (st_id) => {

    console.log('state_id ', st_id)
    const resp = await get_state_by_id(st_id)
    setState([resp.data.output])


    console.log("get_state_inf ", resp)
  }


  const get_states = async (c_id) => {
    const resp = await get_states_by_country(c_id)


    if (resp !== undefined) {

      if (resp.data.statuscode === '0') {
        console.log("states ", resp.data.output)
        setState(resp.data.output)
      }
    }

    else {
      setState([])
    }

  }

  const get_countries = async () => {
    const resp = await get_all_countries()


    if (resp !== undefined) {

      if (resp.data.statuscode === '0') {
        console.log("countries ", resp.data.output)
        setCountries(resp.data.output)
      }
    }

    else {
      setCountries([])
    }

  }

  const update_pub_profile = async () => {

    const formData = new FormData();

    formData.append('contactperson', contactperson)
    formData.append('contactemail', contactemail)
    formData.append('contactno', contactno)
    formData.append('gstin', gstin)

    // formData.append('altcontactno', image)
    // formData.append('panno', image)

    formData.append('addressline', adress)
    formData.append('city', city)
    formData.append('pincode', pin)
    formData.append('stateid', selectedstate)
    formData.append('countryid', country)
    formData.append('about', about)
    formData.append('logo', image)

    console.log("formdata ", formData)

    const resp = await update_pub_details(formData)
    console.log("Update_pub_resp ", resp)

    get_pub_info(pubid, true)

  }

  const select_country = async (e) => {
    console.log("country_id", e.target.value)
    setCountry(e.target.value)
    let country_id = e.target.value
    await get_states(country_id)
  }

  const select_states = async (e) => {
    setSelectedState(e.target.value)
    console.log("state_id", e.target.value)


  }


  const get_pub_info = async (id, display_notification) => {
    const resp = await get_pub_details(id)
    console.log("pub_info ", resp)

    if (resp !== undefined) {
      if (resp.data.statuscode === '0') {
        let data = resp.data.output
        await setprof_inf(data)

        // if (resp.data.statuscode === '0') {
        if (display_notification === true) {
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
    }

    else {
      if (display_notification === true) {
        toast.error("Publisher updation failed", {
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

  }






  const setprof_inf = async (data) => {


    setPubName(data?.name)
    setContactemail(data?.contactemail)
    setContactno(data?.contactno)
    setContactPerson(data?.contactperson)
    setAdress(data?.addressline)
    setCountry(data?.countryid)
    // setState(data?.state)
    setStatename(data?.state)
    setSelectedState(data?.stateid)
    setSelectedCountry(data?.countryid)
    setCountryName(data?.country)
    setCity(data?.city)
    setPin(data?.pincode)
    setGstin(data?.gstin)
    setAbout(data?.about)


    setImage(data?.logo)
    setImageUrl(Config.API_URL + Config.PUB_IMAGES + data?.id + "/" + data?.logo + '?d=' + new Date())


    await get_state_inf(data.stateid)

  }

  return (
    <>
      <SideMenu />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <Header title="Publisher Profile" />
        <div className="m-3 bg-white p-2">
          <div className="d-flex justify-content-start align-tems-start">
            {/* <div className="content-logo p-3">
              <img src={publisherLogo} alt="publisher logo" />
            </div> */}
            <div className="publisher-details p-3">
              <div className="mb-1">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-group">
                    <label className="form-label">Publisher Name</label>
                    <input type="text" className="form-control mb-2" placeholder="Type Publisher Name" value={pubname} disabled />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Contact Email</label>
                    <input type="email" className="form-control mb-2" placeholder="Enter email" value={contactemail} onChange={(e) => setContactemail(e.target.value)} />
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-group">
                    <label className="form-label">Contact Phone</label>
                    <input type="text" className="form-control mb-2" placeholder="Enter phone number" value={contactno} onChange={(e) => setContactno(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Contact Person</label>
                    <input type="text" className="form-control mb-2" placeholder="Enter block/plot no." value={contactperson} onChange={(e) => setContactPerson(e.target.value)} />
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-group">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control mb-2" placeholder="Enter street name" value={adress} onChange={(e) => setAdress(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Country</label>
                    <select className="form-select publisher-profile-select" aria-label="Select country" onChange={(e) => select_country(e)}>


                      <option disabled>--Select--</option>

                      {
                        countries && countries.map((data) => (

                          <option key={data.id} value={data.id} selected={selectedcountry === data.id ? true : false}>{data.name}</option>


                        ))}

                    </select>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-group">
                    <label className="form-label">State</label>

                    <select className="form-select publisher-profile-select" aria-label="Select state"
                      // value={selectedstate}  
                      onChange={(e) => select_states(e)}>

                      <option disabled>--Select--</option>
                      {
                        state && state.map((data) => (

                          <option key={data.id} value={data.id} selected={selectedstate === data.id ? true : false}>{data.name}</option>

                        ))}


                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <input type="text" className="form-control mb-2" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} />
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-group">
                    <label className="form-label">PIN Code</label>
                    <input type="text" className="form-control mb-2" placeholder="Enter PIN code" value={pin} onChange={(e) => setPin(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">GSTIN</label>
                    <input type="text" className="form-control mb-2" placeholder="Enter GSTIN Number" value={gstin} onChange={(e) => setGstin(e.target.value)} />
                  </div>
                </div>
                {/* <label className="form-label">Address</label>
                <div className="input-group mb-2">
                  <textarea className="form-control" placeholder="Enter the publisher's address" aria-label="Enter the publisher's address" value={"12/A MG Road, Mumbai. Maharashtra- 100010"}></textarea>
                </div> */}
                {/* <div className="d-flex justify-content-between align-items-center"> */}

                {/* <div className="d-flex justify-content-between align-items-center">
                  <div className="form-group">
                    <label className="form-label">Facebook</label>
                    <input type="text" className="form-control mb-2" placeholder="Enter Facebook url" value={"https://www.facebook.com/juris.press/"} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">LinkedIn</label>
                    <input type="text" className="form-control mb-2" placeholder="Enter LinkedIn url" value={"https://www.linkedin.com/in/juris-press/"} />
                  </div>
                </div> */}
                {/* <div className="d-flex justify-content-between align-items-center">
                  <div className="form-group">
                    <label className="form-label">YouTube</label>
                    <input type="text" className="form-control mb-2" placeholder="Enter YouTube url" value={"https://www.youtube.com/@JurisPress"} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Instagram</label>
                    <input type="text" className="form-control mb-2" placeholder="Enter Instagram url" value={"https://www.instagram.com/jurispress/"} />
                  </div>
                </div> */}
                <div className="d-flex justify-content-between">
                  <div className="form-group d-flex justify-content-start">
                    <div>
                      <div className="input-logo">
                        <label className="form-label">Upload Logo</label>
                        <div className="input-group">
                          <input type="file" accept=".jpg, .png, .jpeg, .svg" className="form-control" id="logoUpload" onChange={(e) => imagehandler(e)} />
                        </div>
                      </div>
                      <div className="content-logo" style={{ marginTop: '15px' }}>
                        <img src={image === null ? noImg : imageurl} style={{ width: '50%' }} alt="publisher logo" />
                      </div>
                    </div>

                  </div>
                  <div className="form-group">
                    <label className="form-label">About Publisher</label>
                    {/* <div className="input-group"> */}
                    {/* <textarea className="form-control"
                      placeholder="Enter about text for the publisher"
                      aria-label="Enter about text for the publisher" rows={3}
                      value={about} onChange={(e) => setAbout(e.target.value)}
                    ></textarea> */}
                    <ReactQuill placeholder="Enter Description here..."
                      theme="snow"
                      value={about}
                      onChange={setAbout} />

                    {/* </div> */}
                  </div>
                </div>
              </div>
              <button className="btn btn-main mt-3"
                onClick={update_pub_profile}
                style={{width:'10%'}}
              >
                {/* <SVG src={saveIcon} style={{ marginRight: 10 }} width={15} />  */}
                Save
              </button>
            </div>
          </div>
        </div>


        <ToastContainer />
      </div>
    </>
  );
}

export default ManageContentPub;