import React, {
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import axios from "axios";
import Config from "../Config/Config.json";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(''); // token
  const [authDeatils, setAuthDeatils] = useState('');
  // const [authUsername, setAuthUsername] = useState('');
  useEffect(() => {
    getDataFromStorage();
  }, [authData])
  useEffect(() => {
  }, [authDeatils])
  

  const getDataFromStorage = async () => {
    let token = localStorage.getItem("token");

    if (authData === '') {
      console.log("AUthdata is Null")
      if (token === null || token === '' || token === undefined) {
        console.log("No token available please login");
      }
      else {
        setAuthData(token);
        setAuthDeatils(jwtDecode(token));
        // console.log("Token is present",token)
        // setAuthUsername(name)
      }
    }
    else {
      console.log("Authdata is not null");
    }
  }
  // const logIn = (userName, password) => {
  //   console.log("Username passed to auth context : ", userName);
  //   setAuthUsername(userName);
  //   localStorage.setItem("username", userName);
  // }

  

  const logIn = async (arg) => {
    console.log("Arguments passed to login : ", arg)
    try {
      // const response = await axios.post('https://ebooksjunction.com/api/account/login', arg,
      const response = await axios.post(Config.API_URL + Config.LOGIN_API, arg,
        {
          headers: {
            'Content-Type': 'application/json'
          },
        });

      // console.log("Response frm login context: ", response);
      const token = response?.data?.token;

      if (response?.status === 200) {
        setAuthData(token);
        localStorage.setItem("token", token);
        setAuthDeatils(jwtDecode(token));
        return response.data
        // console.log("Response : ", response);
        // console.log("token : ",token);
        // console.log("auth deatils : ", jwtDecode(token));

      }
      else {
        setAuthData('');
        setAuthDeatils('');
        localStorage.setItem("token", '');
      }
      // return response.data

    } catch (error) {
      console.log("Error :", error);
    }
  }


  const networkConnection = async () => {
    //-----CHECK NETWORK CONNECTION-----//
  }


  // const logOut=async()=>{
  //   setAuthData('')
  //   // setAuthUsername('')
  //   localStorage.setItem("userid", '');
  //   // localStorage.setItem("username", '');

  //   return 'Success';
  // }
  const logOut = () => {
    setAuthData('');
    setAuthDeatils('');
    localStorage.setItem("token", '');
    return 'success';
  }

  const forgot_password = async (args) => {
    try {
      const response = await axios.post(Config.API_URL + Config.FORGOT_PASSWORD, args,
        {
          headers: {
            'Content-Type': 'application/json'
          },
        })
      console.log("ForgotPassword_resp: ", response.data.message);
      return response.data.message;
    }
    catch (error) {
      console.log("ForgotPassword_error : ", error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        logIn,
        logOut,
        forgot_password,
        authData,
        authDeatils
      }}
    >
      {children}
      {/* <ActivityLoader isLoaderShow ={loaderOn}/> */}
    </AuthContext.Provider>
  )
}
function useAuth() {
  const context = useContext(AuthContext)
  // if (!context) {
  //   throw new Error('userProfile must be used within an userProvider')
  // }
  return context
}
export { AuthContext, AuthProvider, useAuth }