import React, { useEffect, useState, } from "react";
import PasswordChecklist from "react-password-checklist";
import TopBar from "../Layout/TopBar";
import ProfileTab from "../Layout/ProfileTab";
import { Button } from 'react-bootstrap';
import verify from "../Assets/Images/verify.png";
import { UserProfile } from "../Context/Usercontext";
import TopBarSouthsore from "../Layout/TopBarSouthsore";
import BackButton from "../Layout/BackButton";
import Whatsapp from "../Layout/Whatsapp";
import NavBarSouthsore from "../Layout/NavBarSouthsore";


const ChangePassword = () => {

    const { change_password } = UserProfile()
    const [password, setPassword] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
    const [passwordVerified, setPasswordVerified] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMEssage] = useState('')

    // useEffect(()=>{
    //     // validatePassword()
    // },[password])

    // useEffect(()=>{
    //     // validatePassword()
    // },[confirmPassword])


    const validatePassword = (new_pass) => {
        var lowerCase = /[a-z]/g;
        var upperCase = /[A-Z]/g;
        var numbers = /[0-9]/g;
        var spChars = /!@#\$%\^\&*/g;
        if (!new_pass.match(lowerCase)) {
            setPasswordErrorMessage("Password should contains lowercase letters!");
        } else if (!new_pass.match(upperCase)) {
            setPasswordErrorMessage("Password should contain uppercase letters!");
        } else if (!new_pass.match(numbers)) {
            setPasswordErrorMessage("Password should contain numbers also!");
        } else if (new_pass.match(spChars)) {
            setPasswordErrorMessage("Password should contain special characters!");
        } else if (new_pass.length < 6) {
            setPasswordErrorMessage("Password length should be more than 6.");
        } else {
            setPasswordErrorMessage("");
            return true
        }
        return false
    }
    const passwordHandler = (e) => {
        let new_pass = e.target.value
        setPassword(e.target.value)
        // let pass_verify=validatePassword(new_pass)
        // setPasswordVerified(pass_verify)
    }
    const confirmPasswordHandler = (e) => {
        setConfirmPassword(e.target.value)
    }
    const oldPasswordHandler = (e) => {
        setOldPassword(e.target.value)
    }

    const saveData = async () => {
        let data = {
            password: oldPassword,
            newpassword: password
        }

        const response = await change_password(data)
        console.log(response)
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
                <div className=" ChangePassword">
                    <div className="d-flex align-items-center justify-content-between mt-3">
                    <h3><b>Change Password</b></h3>
                

                    </div>
                    <hr></hr>
                    <div className="mb-5 row">
                        <div className="col-md-6">

                            <label className="form_label mt-1">Old Password</label>
                           
                            <input className="form-control p_hold" type="password"
                                onChange={oldPasswordHandler} />

                            <label className="form_label  mt-1">New Password</label>
                            <div className="d-flex align-items-sm-center">

                                <input className="form-control p_hold" type="password"
                                    onChange={passwordHandler} />
                                {/* {passwordVerified? (<img src={verify} width={30} height={30} className="ms-2"/>) : (<span className="newPasswordErrorMessage">{passwordErrorMessage}</span>) } */}

                            </div>

                            <label className="form_label mt-1">Confirm New Password</label>
                            <span>{confirmPasswordErrorMessage}</span>
                            <input className="form-control p_hold" type="password"
                                onChange={confirmPasswordHandler} />
                        </div>
                        <div className="col-md-6 mt-2">

                            <PasswordChecklist
                                rules={["capital", "match", "specialChar", "minLength", "number", "lowercase", "notEmpty"]}
                                minLength={8}
                                value={password}
                                valueAgain={confirmPassword}
                            />
                        </div>
                    </div>
                    <hr></hr>
                    <div className="d-flex justify-content-center mt-2">

                        <Button className=" rounded-pill px-4 " variant="primary" onClick={saveData}>Save</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword