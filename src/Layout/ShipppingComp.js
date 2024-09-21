import React, { useEffect, useState, } from "react";
import { useNavigate } from 'react-router-dom';
import { Modal } from "react-bootstrap";
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
import { useAuth } from "../Context/Authcontext";


const ShippingComp = () => {
    
    const {authData}=useAuth()
    const { getAllShippingAddress, 
        shippingList, 
        addShippingAddress, 
        getSippingAddressById, 
        editShippingAddress, 
        delShippingAddress, 
        get_country_list, 
        get_state_list,
        selectShippingAddress,
        selectedShippingAddressId, } = UserProfile()

    const [addAddressModal, setAddAddressModal] = useState(false);
    const [modaltitle, setmodaltitle] = useState('');
    const [name, setName] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [selectedCountry, setSelectedCountry] = useState('')
    const [countries, setCountries] = useState([])
    const [countryId, setCountryId] = useState(0)
    const [selectedState, setSelectedState] = useState('')
    const [city, setCity] = useState('')
    const [pin, setPin] = useState('')

    const [countryList, setCountryList] = useState([])
    const [stateList, setStateList] = useState([])
    const [stateId, setStateId] = useState(0)
    const [shippingAddId, setShippingAddId] = useState(0)
    const [shipList, setShipList] = useState([])
    const [tempShippingArr,setTempShippingArr]=useState(shippingList)
    //const [tempShippingArr,setTempShippingArr]=useState(props.list)

    const [checkedItems, setCheckedItems] = useState(
        shippingList.reduce((acc, data) => {
          acc[data.id] = data.defaultChecked;
          return acc;
        }, {})
      );
      useEffect(() => {
        get_countries()
        get_states()
    }, [authData]);

    useEffect(() => {
        getShipLists()
    }, [selectedShippingAddressId]);

    useEffect(() => {
        console.log("SHIPPING LIST===>",shippingList)
        getShipLists()
    }, [shippingList]);

    const getShipLists = async () => {
        let tempArr=shippingList
        for(let i=0;i<tempArr.length;i++){
         if(tempArr[i]['id'] === selectedShippingAddressId){
             tempArr[i]['checked']=true;
         }
         else {
             tempArr[i]['checked']=false;
         }
 
        }
        setTempShippingArr([...tempArr]);
     }
      const handleCheckboxChange = async(id) => {
        // setCheckedItems((prevState) => ({
        //   ...prevState,
        //   [id]: !prevState[id],
        // }));
        const resp= await selectShippingAddress(id);
      };

    const navigate = useNavigate();
    const goToHome = () => {
        navigate("/home")
    }

    const openAddAddressModal = async (id) => {
        console.log("edit shipping id ", id)
        setAddAddressModal(true)

        const response = await getSippingAddressById(id)
        console.log("response of ship by id", response)
        if (id === 0) {
            setmodaltitle('Add Address')
            setStreetAddress('')
            setCountryId(0)
            setStateId(0)
            setCity('')
            setPin('')
            setShippingAddId(0)
        }
        else {
            setmodaltitle('Edit Address')
            setStreetAddress(response.data.output.streetaddress)
            setCountryId(response.data.output.countryid)
            setStateId(response.data.output.stateid)
            setCity(response.data.output.city)
            setPin(response.data.output.pincode)
            setShippingAddId(id)

        }
    }

    const closeAddAddressModal = () => {
        setAddAddressModal(false)
    }

    const get_countries = async () => {
        const resp = await get_country_list()
        // console.log("countries ", resp.output)

        if (resp !== undefined) {
            setCountries(resp.output)
        }

        else {
            setCountries([])
        }

    }

    const get_states = async (c_id) => {
        const resp = await get_state_list(c_id)


        if (resp !== undefined) {
            // console.log("states ", resp.output)
            setStateList(resp.output)
        }

        else {
            setStateList([])
        }

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


    const saveShipping = async () => {
        
        if (shippingAddId === 0) {
            let addShippingData = {
                streetAddress: streetAddress,
                countryid: countryId,
                stateid: stateId,
                city: city,
                pincode: pin
            }
            let response = await addShippingAddress(addShippingData)
            // console.log(" add shipping response ", response)
            if(response.statuscode !== 0){alert(response.message)}
            closeAddAddressModal()
        }
        else {

            let editShippingData = {
                streetAddress: streetAddress,
                countryid: countryId,
                stateid: stateId,
                city: city,
                pincode: pin
            }
            let response = await editShippingAddress(editShippingData, shippingAddId)
            // console.log(" add shipping response ", response)
            if(response.statuscode !== 0){alert(response.message)}
            closeAddAddressModal()
        }


    }

    const deleteAddress = async (id) => {
        const resp = await delShippingAddress(id)
        // console.log("delete resp ", resp)
        await getShipLists()
    }







    return (
        <>
            
            <div className="d-flex ms-2">
            <button className="btn rounded-pill d-flex justify-content-center align-items-center mt-2 px-4 py-2"  style={{background:'#058EFA',color:"white"}} onClick={() => openAddAddressModal(0)}>Add Address</button>
                </div>
            <div className="row my-4 mx-1">
                {tempShippingArr.map((data, index) => (
                    <div className="col-md-3 text-start border border-secondary  mx-2 mt-3 py-3 px-3" style={{borderRadius:15}} key={index}>
                        <input className="form-check-input" type="radio" checked={data.checked}
                            onChange={() => handleCheckboxChange(data.id)} value={data.id} />
                        <div className="">
                            <div>{data.streetaddress}</div>
                            <div>{data.city}</div>
                            <div>{data.statename}</div>
                            <div>{data.pincode}</div>
                            <div>{data.countryname}</div>
                            <div className="d-flex">
                            <button className="btn btn-outline-secondary rounded-pill d-flex justify-content-center align-items-center mt-2 px-4"  onClick={() => openAddAddressModal(data.id)}>Edit</button>
                                
                            </div>
                        </div>

                    </div>
                ))}
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

                            <label className="form-label">Building Number, Street Address</label>
                            <input type="text" className="form-control mb-2" placeholder="Type Building Number, Street Address"
                                value={streetAddress}
                                onChange={(e) => setStreetAddress(e.target.value)}
                                autocomplete="new-password"
                            />
                            <label className="form-label">City / Village</label>
                            <input type="text" className="form-control mb-2" placeholder="Type City / Village"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                autocomplete="new-password"
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
                                            autocomplete="new-password"
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
                                            autocomplete="new-password"
                                        >{data.name}</option>
                                    ))
                                }
                            </select>
                            <label className="form-label">Pin</label>
                            <input type="text" className="form-control mb-2" placeholder="Type Pin"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                autocomplete="new-password"
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


        </>
    )
}

export default ShippingComp