import React, { useEffect, useState, } from "react";
import { useNavigate } from 'react-router-dom';
import TopBar from "../Layout/TopBar";
import ProfileTab from "../Layout/ProfileTab";
import { Button } from 'react-bootstrap';
import { UserProfile } from "../Context/Usercontext";
import Config from "../Config/Config.json"
import arrow_left from "../Assets/Images/arrow-left.png";
import BackButton from "../Layout/BackButton";
import TopBarSouthsore from "../Layout/TopBarSouthsore";
import Whatsapp from "../Layout/Whatsapp";
import NavBarSouthsore from "../Layout/NavBarSouthsore";


const MyProfile = () => {

    const { change_personal_details, change_contact_details, change_billing_address, my_profile, get_country_list, get_state_list } = UserProfile()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [selectedCountry, setSelectedCountry] = useState('')
    const [selectedState, setSelectedState] = useState('')
    const [city, setCity] = useState('')
    const [pin, setPin] = useState('')
    const [profileImage, setProfileImage] = useState('')

    const [countryList, setCountryList] = useState([])
    const [stateList, setStateList] = useState([])
    
    const navigate = useNavigate();
    const goToHome = () =>{
        navigate("/home")
    }

    const renderStateList = async (countyId) => {
        try {
            const resp = await get_state_list(countyId)
            setStateList(resp.output)
        } catch (err) {
            console.error(err);
        }
    }
    const renderCountryList = async () => {
        try {
            const resp = await get_country_list()
            setCountryList(resp.output)
        } catch (err) {
            console.error(err);
        }
    }

    const myProfileApi = async () => {

        const resp = await my_profile()

        setName(resp.output.name)
        setEmail(resp.output.email)
        setPhone(resp.output.contactno)
        setAddress(resp.output.addressline)
        setSelectedCountry(resp.output.countryid)
        setSelectedState(resp.output.stateid)
        setCity(resp.output.city)
        setPin(resp.output.pincode)

        setProfileImage(Config.API_URL + Config.UPLOAD_URL + resp.output.profileimage + '?d=' + new Date())

        if (resp.output.countryid !== null && resp.output.countryid !== '') {
            renderStateList(resp.output.countryid)
        }
    }
    useEffect(() => {

        myProfileApi()
        renderCountryList()
    }, []);


    const emailHandler = (e) => {
        setEmail(e.target.value)
    }
    const nameHandler = (e) => {
        setName(e.target.value)
    }
    const phoneHandler = (e) => {
        setPhone(e.target.value)
    }
    const addressHandler = (e) => {
        setAddress(e.target.value)
    }
    const countryHandler = async (e) => {

        if (selectedCountry == null || selectedCountry == '') {
            try {
                const resp = await get_state_list(e.target.value)


                setStateList(resp.output)

            } catch (err) {
                console.error(err);
            }

        }
        setSelectedCountry(e.target.value)
    }
    const stateHandler = (e) => {
        setSelectedState(e.target.value)
    }
    const cityHandler = (e) => {
        setCity(e.target.value)
    }
    const pinHandler = (e) => {
        setPin(e.target.value)
    }
    const profilePicHandler = (e) => {
        if (e.target.files.length !== 0) {
            setProfileImage(e.target.files[0])
        }
    }

    const saveData = async () => {


        const userDetails = new FormData();
        userDetails.append('profileimage', profileImage);
        userDetails.append('name', name)

        let changecontactDetails = {
            email: email,
            contactno: phone,
        }

        let changebillingDetails = {

            streetAddress: address,
            city: city,
            pincode: pin,
            stateid: selectedState,
            countryid: selectedCountry,

        }

        
        const personalDetailsPesponse = await change_personal_details(userDetails)
        const contactDetailsPesponse = await change_contact_details(changecontactDetails)
        const billingDetailsPesponse = await change_billing_address(changebillingDetails)
        console.log("PERSONAL DETAILS",personalDetailsPesponse)
        console.log("PERSONAL DETAILS===>1",contactDetailsPesponse)
        console.log("PERSONAL DETAILS===>2",billingDetailsPesponse)
        if(billingDetailsPesponse.statuscode === "0" && 
        contactDetailsPesponse.statuscode=== "0" && 
        personalDetailsPesponse.statuscode === "0"){
            alert("Information saved successfully")
        }
        else{
            alert("Contact updation failed")
        }

        
    }
    return (

        <div className="main-container">
            <div className="container">
                <TopBar />
                <NavBarSouthsore/>
                <ProfileTab />
            </div>
            
            <Whatsapp/>
            <div className="container">
                <div className="myProfile">

                    {/* <h3><b>My Profile</b></h3>

                    <hr></hr> */}
                    <div className="header border-bottom myProfileHeader py-2 pb-3">
                        <div className="left">
                            <h2>My Profile</h2>
                        </div>
                        {/* <div className="right" onClick={goToHome}>
                            <span className="back-to-home cursor-pointer"><img src={arrow_left} /> Back to home</span>
                        </div> */}
                         {/* <BackButton/> */}
                    </div>
                    {/* <form> */}
                    <div className="row mb-5">
                        <div className="col-md-6 horizontalLine">
                            <label className="form_label">Name</label>
                            <input className="form-control p_hold" type="text"
                                onChange={nameHandler} value={name} />

                            <label className="form_label">Email</label>
                            <input className="form-control p_hold" type="text"
                                value={email} onChange={emailHandler} readOnly />
                            {/* value={email} onChange={emailHandler} /> */}
                            <label className="form_label">Phone</label>
                            <input className="form-control p_hold" type="text"
                                onChange={phoneHandler} value={phone} />

                            <label className="form_label">Profile Picture</label>
                            <input className="form-control p_hold" type="file"
                                accept="image/*" onChange={(e) => profilePicHandler(e)} />
                            {profileImage !== null && profileImage !== '' &&
                                <img src={profileImage} className="img-fluid mt-4" height={100} width={100} />
                            }
                        </div>

                        <div className="col-md-6">
                            <label className="form_label">Address</label>
                            <input className="form-control p_hold" type="text"
                                onChange={addressHandler} value={address} />

                            <label className="form_label">City</label>
                            <input className="form-control p_hold" type="text"
                                onChange={cityHandler} value={city} />

                            <label className="form_label">State</label>
                            <select className="form-control p_hold" type="text"
                                onChange={stateHandler} value={selectedState}>

                                <option> Please Select</option>
                                {
                                    stateList.map((state, index) => (

                                        <option key={state.id} value={state.id} selected={selectedState === state.id ? true : false}> {state.name} </option>

                                    ))
                                }
                            </select>

                            <label className="form_label">Country</label>
                            <select className="form-control p_hold" type="text"
                                onChange={countryHandler} value={selectedCountry} >

                                <option> Please Select</option>
                                {
                                    countryList.map((country, index) => (

                                        <option key={country.id} value={country.id} selected={selectedCountry === country.id ? true : false}> {country.name} </option>

                                    ))
                                }
                            </select>

                            <label className="form_label">PIN</label>
                            <input className="form-control p_hold" type="text"
                                onChange={pinHandler} value={pin} />
                        </div>

                    </div>

                    <hr></hr>
                    <div className="d-flex justify-content-center mt-3 py-3">

                        <Button className=" rounded-pill px-4 " variant="primary" onClick={saveData}>Save</Button>
                    </div>
                    {/* </form> */}
                </div>
            </div>
        </div>
    )
}

export default MyProfile