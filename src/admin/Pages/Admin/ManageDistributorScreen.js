import React, { useEffect, useState, } from "react";
import { useNavigate } from 'react-router-dom';
import { Modal } from "react-bootstrap";

import { Button } from 'react-bootstrap';
import { AdminProfile } from "../../Context/AdminContext";
import { useAuth } from "../../Context/AuthContext";

import Header from "../../Layout/Header";
import SideMenu from "../../Layout/SideMenu";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ManageDistributorScreen = () => {

    const { getAllShippingAddress, shippingList, addDistributor, getSippingAddressById, editDistributor, delShippingAddress, get_all_countries, get_state_list, get_state_by_id, get_states_by_country } = AdminProfile()

    const [addAddressModal, setAddAddressModal] = useState(false);
    const [modaltitle, setmodaltitle] = useState('');
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [altPhone, setAltPhone] = useState('')
    const [selectedCountry, setSelectedCountry] = useState('')
    const [countries, setCountries] = useState([])
    const [countryId, setCountryId] = useState(0)
    const [selectedState, setSelectedState] = useState('')
    const [city, setCity] = useState('')
    const [pin, setPin] = useState('')

    const [countryList, setCountryList] = useState([])
    const [stateList, setStateList] = useState([])
    const [stateId, setStateId] = useState(0)
    const [gstIn, setGstIn] = useState('')
    const [distributorAddId, setDistributorAddId] = useState(0)
    const [shipList, setShipList] = useState([])

    const navigate = useNavigate();
    const goToHome = () => {
        navigate("/home")
    }

    const openAddAddressModal = async (
        // id
    ) => {
        // console.log("edit shipping id ", id)
        setAddAddressModal(true)

        // const response = await getSippingAddressById(id)
        // console.log("response of ship by id", response)
        // if (id === 0) {
        setmodaltitle('Add Distributor')
        setName('')
        setEmail('')
        setPhone('')
        setStreetAddress('')
        setCountryId(0)
        setStateId(0)
        setCity('')
        setPin('')
        setAltPhone('')
        setGstIn('')
        setDistributorAddId(0)
        // }
        // else {
        //     setmodaltitle('Edit Address')
        //     setName(response.data.output.name)
        //     setEmail(response.data.output.email)
        //     setPhone(response.data.output.contactno)
        //     setStreetAddress(response.data.output.streetaddress)
        //     setCountryId(response.data.output.countryid)
        //     setStateId(response.data.output.stateid)
        //     setCity(response.data.output.city)
        //     setPin(response.data.output.pincode)
        //     setAltPhone(response.data.output.altPhone)
        //     setGstIn(response.data.output.gstin)
        //     setDistributorAddId(id)

        // }
    }

    const closeAddAddressModal = () => {
        setAddAddressModal(false)
    }


    useEffect(() => {
        get_countries()
        get_states()
        // getShipLists()
    }, []);

    const getShipLists = async () => {
        const resp = await getAllShippingAddress()
        console.log("ship list ", resp)
        setShipList(resp.data.output)
    }

    const get_countries = async () => {
        const resp = await get_all_countries()
        console.log("countries ", resp)

        if (resp !== undefined) {
            setCountries(resp.data.output)
        }

        else {
            setCountries([])
        }

    }

    const get_states = async (c_id) => {
        const resp = await get_states_by_country(c_id)
        console.log("states ", resp)

        if (resp !== undefined) {
            console.log("states ", resp.data.output)
            setStateList(resp.data.output)
        }

        else {
            setStateList([])
        }

    }

    const select_country = async (e) => {
        // alert(e.target.value)
        console.log("country_id", e.target.value)
        setCountryId(e.target.value)
        let country_id = e.target.value
        await get_states(country_id)
    }

    const select_states = async (e) => {
        // alert(e.target.value)
        setStateId(e.target.value);
        console.log("state_id", e.target.value);

    }

    // const addDistributorData = async () => {
    //     setDistributorAddId(0)
    //     const formData = new FormData();
    //     formData.append('streetAddress', streetAddress)
    //     formData.append('countryid', countryId)
    //     formData.append('stateid', stateId)
    //     formData.append('city', city)
    //     formData.append('pincode', pin)

    //     const resp = await addShippingAddress(formData)
    //     console.log(" add shipping address resp ", resp)

    //     return resp
    // }

    const saveShipping = async () => {
        // console.log("shipping id in save fnc ", distributorAddId)
        // if (distributorAddId === 0) {
        let addDistributorData = {
            name: name,
            email: email,
            contactno: phone,
            altcontactno: altPhone,
            addressline: streetAddress,
            countryid: countryId,
            stateid: stateId,
            city: city,
            pincode: pin,
            gstin: gstIn
        }
        let response = await addDistributor(addDistributorData)
        console.log(" add distributor response ", response)
        // getShipLists()
        closeAddAddressModal()

        if (response !== undefined) {

            if (response.data.statuscode === '0' && response.data.message === 'Information saved successfully.') {

                toast.success("Distributor added successfully", {
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
            toast.error("Distributor addition failed", {
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
        // }
        // else {

        //     let editDistributorData = {
        //         name: name,
        //         email: email,
        //         contactno : phone,
        //         altcontactno : altPhone,
        //         addressline: streetAddress,
        //         countryid: countryId,
        //         stateid: stateId,
        //         city: city,
        //         pincode: pin,
        //         gstin : gstIn
        //     }
        //     let response = await editDistributor(editDistributorData, distributorAddId)
        //     console.log(" edit distributor response ", response)
        //     getShipLists()
        //     closeAddAddressModal()
        // }


    }

    const deleteAddress = async (id) => {
        const resp = await delShippingAddress(id)
        console.log("delete resp ", resp)
        await getShipLists()
    }







    return (
        <>
            <SideMenu />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <Header title="Manage Publishers" />
                <div className="bg-white p-3 m-3 rounded-2">
                    <button type="button" className="btn btn-main" onClick={() => openAddAddressModal(0)}>Add Distributor</button>
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
                            {/* {
                                publisherList && publisherList.map((data, index) => (
                                    <tr className="custom-table-row" key={index}>
                                        
                                        <td className="all_col text-start" data-bs-toggle="tooltip" data-bs-placement="top" title={data.name} style={{ cursor: "pointer" }}>{data.name === null ? 'Not Available' : data.name.length > 18 ? data.name.substring(0, 18) + '...' : data.name}</td>
                                        
                                        <td className="all_col text-start">{data.email === null || data?.email?.length === 0 ? 'Not Available' : data.email}</td>
                                        <td className="all_col text-start">{data.contactno === null || data?.contactno?.length === 0 ? 'Not Available' : data.contactno}</td>


                                        <td className={data?.isactive === 1 ? 'act_col text-start' : 'inact_col text-start'}>{data.isactive === 1 ? 'Active' : 'Inactive'}</td>
                                        <td className="d-flex justify-content-start align-items-start">
                                            <SVG src={editIcon}
                                                style={{ fill: '#FF0000', marginRight: 10, marginTop: 1 }}
                                                width={15} height={15}
                                                onClick={() => editPubMoadl(data.id)} />
                                           


                                            <div className="form-check form-switch" style={{ marginRight: 5 }} >
                                                <input checked={data.isactive === 1 ? true : false} className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"
                                                    onChange={(e) => act_inact_pub(data.isactive, data.id)} />
                                            </div>


                                            <SVG src={eye}
                                                height={20} width={20}
                                                onClick={() => openOrderDescriptionModal(data.id)}
                                                style={{ fill: '#787B85' }}
                                            />
                                        </td>
                                    </tr>
                                ))
                            } */}
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

                {/* Add Address Modal */}

                <Modal
                    show={addAddressModal}
                    onHide={closeAddAddressModal}
                    backdrop="static"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{modaltitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-lg-12 mb-3">

                                <label className="form-label">Name</label>
                                <input type="text" className="form-control mb-2" placeholder="Type Distributor Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />

                                <label className="form-label">Email</label>
                                <input type="text" className="form-control mb-2" placeholder="Type email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <label className="form-label">Contact No.</label>
                                <input type="text" className="form-control mb-2" placeholder="Type contact no"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />

                                <label className="form-label">Alternative Contact No.</label>
                                <input type="text" className="form-control mb-2" placeholder="Type alternative contact no"
                                    value={altPhone}
                                    onChange={(e) => setAltPhone(e.target.value)}
                                />

                                <label className="form-label">Address</label>
                                <input type="text" className="form-control mb-2" placeholder="TypeAddress"
                                    value={streetAddress}
                                    onChange={(e) => setStreetAddress(e.target.value)}
                                />
                                <label className="form-label">City / Village</label>
                                <input type="text" className="form-control mb-2" placeholder="Type City"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                                <label className="form-label" htmlFor='cat_prod'>Country</label>
                                <select id='cat_prod' className="form-select mb-2"
                                    onChange={(e) => select_country(e)}
                                >
                                    <option value='0'>--Select--</option>
                                    {
                                        countries && countries.map((data) => (
                                            <option key={data.id} value={data.id}
                                                selected={countryId === data.id ? true : false}
                                            >{data.name}</option>
                                        ))
                                    }
                                </select>
                                <label className="form-label" htmlFor='cat_prod'>State</label>
                                <select id='cat_prod' className="form-select mb-2"
                                    onChange={select_states}
                                >
                                    <option>Please Select</option>
                                    <option value='0'>--Select--</option>

                                    {
                                        stateList && stateList.map((data) => (
                                            <option key={data.id} value={data.id}
                                                selected={stateId === data.id ? true : false}
                                            >{data.name}</option>
                                        ))
                                    }
                                </select>
                                <label className="form-label">Pin</label>
                                <input type="text" className="form-control mb-2" placeholder="Type Pin"
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                />

                                <label className="form-label">GST No.</label>
                                <input type="text" className="form-control mb-2" placeholder="Type gst no"
                                    value={gstIn}
                                    onChange={(e) => setGstIn(e.target.value)}
                                />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>

                        <button className="btn btn-main"
                            onClick={saveShipping}
                            style={{ width: '20%' }}>
                            Save
                        </button>
                    </Modal.Footer>
                </Modal>
                <ToastContainer />
            </div>

        </>
    )
}

export default ManageDistributorScreen