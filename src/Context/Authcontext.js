import React, {
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import axios from "axios";
import Config from "../Config/Config.json";
import { jwtDecode } from "jwt-decode";
import { v4 as uuidv4 } from 'uuid';
import Cookies from "js-cookie";



const AuthContext = createContext();

const AuthProvider = ({ children }) => {



  const [authData, setAuthData] = useState('');
  const [wishlistshow, setWishlistshow] = useState(false)
  const [isexpired, setIsexpired] = useState(false)
  const [uuid,SetUuid] = useState()

  // !  wishlistshow === isLoggedin

  const getDataFromStorage = async () => {
    var userToken = localStorage.getItem("userid");
    console.log("userToken : ", userToken);
    if (authData === '') {

      console.log("Authdata_is_null")

      if (userToken === undefined || userToken === null || userToken === '') {
        console.log("No token available please login");
      }
      else {
        setAuthData(userToken)
        decode_token(userToken)
        detect_unique_id()
        console.log("Token available")
      }
    }
    else {
      console.log("Authdata_is_not_null")
      setIsexpired(false)
      decode_token(userToken)
      detect_unique_id()
    }



  }


  const decode_token = async (token) => {
    console.log("Token_to_decode :", token)
    let My_token = token

    if (My_token !== "") {
      const { exp } = jwtDecode(My_token)
      // Refreshing the token a minute early to avoid latency issues
      const expirationTime = (exp * 1000) - 60000

      if (Date.now() >= expirationTime) {
        console.log("Token Expired")
        setIsexpired(true)
        // localStorage.removeItem("userid")
        localStorage.setItem("userid", '');

      }
      else {
        setIsexpired(false)
      }
    }


    else {
      console.log("Token Not Expired")
      setIsexpired(false)
    }

   

  }

  //  Key : unique_id 

  const detect_unique_id = async () => {

    let my_unique_id = localStorage.getItem("unique_id")

    if (my_unique_id === "" || my_unique_id === null || my_unique_id === undefined ){

     
      let system_uuid = uuidv4()
      console.log("in If ", system_uuid)
      localStorage.setItem('unique_id', system_uuid)
      SetUuid(system_uuid)


    }
    else{
      console.log("in else ",my_unique_id)
      SetUuid(my_unique_id)

    }
  }

  



  useEffect(() => {
    getDataFromStorage();
    // wishlist_hide_show()

  }, [authData])


  const wishlist_hide_show = async () => {
    let token = localStorage.getItem("userid");
    if (token === null || token === undefined || token === "") {
      setWishlistshow(false)
    }
    else {
      setWishlistshow(true)
    }
  }



  const logIn = async (arg) => {
    console.log(arg)
    try {
      const response = await axios.post(Config.API_URL + Config.LOGIN_API, arg,
        {
          headers: {
            'Content-Type': 'application/json'
          },

        })
      console.log("token", response)
      if (response.status === 200) {
        setAuthData(response.data.token)
        setWishlistshow(true)
        // setAuthUsername(response.data.data[0].username)
        localStorage.setItem("userid", response.data.token);
        // localStorage.setItem("username", response.data.data[0].username);
      }
      else {
        setAuthData('')
        // setAuthUsername('')
        localStorage.setItem("userid", '');
        // localStorage.setItem("username", '');
      }
      return response

    } catch (error) {

      console.log("Log in context error : ", error);
    }

  }


  const networkConnection = async () => {
    //-----CHECK NETWORK CONNECTION-----//
  }


  const logOut = async () => {
    setAuthData('')
    // setWishlistshow(false)
    // setAuthUsername('')
    localStorage.setItem("userid", '');
    // localStorage.setItem("username", '');
    console.log("log out from authcontext");

    return 'Success';
  }

  const forgot_password = async (args) => {
    try {
      const response = await axios.post(Config.API_URL + Config.FORGOT_PASSWORD, args,
        {
          headers: {
            'Content-Type': 'application/json'
          },
        })
      console.log("ForgotPassword_resp: ", response);
      return response.data.message;
    }
    catch (error) {
      console.log("ForgotPassword_error : ", error)
    }
  }

  // **------------registration---------

  const Registration = async (arg) => {
    // console.log(arg)
    try {
      const response = await axios.post(Config.API_URL + Config.SIGN_IN_API, arg,
        {
          headers: {
            'Content-Type': 'application/json'
          },

        })

      if (response?.status === 200) {
        return response.data
      }



    } catch (error) {

      console.log("registration context error : ", error);
    }

  }
  const createNewPassword = async (arg) => {
    // console.log(arg)
    try {
      const response = await axios.post(Config.API_URL + Config.CREATE_NEW_PASSWORD, arg,
        {
          headers: {
            'Content-Type': 'application/json'
          },

        })

      if (response?.status === 200) {
        return response.data
      }



    } catch (error) {

      console.log("registration context error : ", error);
    }

  }
  const resendPasswordCreationEmail = async (arg) => {
    // console.log(arg)
    try {
      const response = await axios.post(Config.API_URL + Config.RESEND_PASSWORD_CREATION_EMAIL, arg,
        {
          headers: {
            'Content-Type': 'application/json'
          },

        })

      if (response?.status === 200) {
        return response.data
      }



    } catch (error) {

      console.log("registration context error : ", error);
    }

  }

  return (
    <AuthContext.Provider
      value={{
        logIn,
        logOut,
        forgot_password,
        authData,
        wishlistshow,
        isexpired,
        uuid,
        Registration,
        createNewPassword,
        resendPasswordCreationEmail
        // authUsername
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


