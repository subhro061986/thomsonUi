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
  const [cartCount, setCartCount] = useState(0)
  const [cartItems, setCartItems] = useState([])
  const image_path = Config.API_URL + Config.PUB_IMAGES;

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
    getCartData(authData)

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
        getCartData(response.data.token)

        // localStorage.setItem("username", response.data.data[0].username);
      }
      else {
        setAuthData('')
        // setAuthUsername('')
        await localStorage.setItem("userid", '');
        await localStorage.setItem("cartData", '');
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
    // getCartData('')
    setCartCount(0)
    setCartItems([])
    return 'Success';
  }

  const clearCartStorage = async () => {
    localStorage.setItem("cartData", "")
    setCartCount(0)
    setCartItems([])
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

  const getCartData = async (token) => {
    let sendUUid={
      deviceid: uuid
    }
    console.log("SEND UUID",sendUUid)
    let tok=''
    if (authData === '' || authData === null || authData === undefined) {
      tok=token
    }
    else {
      tok=authData
    }
    // -------- Before Login ----------//
    if (tok === '' || tok === null || tok === undefined) {
      let cc =  localStorage.getItem("cartData")
      
      if (cc !== null) {
        let tempCartItems = JSON.parse(cc)
        setCartCount(tempCartItems.length)
        setCartItems(tempCartItems)
      }
    }
    // -------- After Login ----------//
    else {
      
      try {
        clearCartStorage()
        const response = await axios.post(Config.API_URL + Config.GET_CART_ITEMS, sendUUid,

          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + tok
            },

          })

        console.log("get_cart_items : ", response.data);

        let cd=response.data.output
        cd.map((item,index) =>{
          item.image = image_path + item.publisherid + '/' + item.image + '?d=' + new Date();
        })
        // console.log("items after change= ",cd)
        // let frontCover = image_path + pub_obj.publisherid + '/' + pub_obj.front_cover + '?d=' + new Date();

        setCartItems(cd)
        setCartCount(response.data.output.length)

        return response.data

      }
      catch (error) {
        console.log("get_cart_items_error : ", error)
      }


    }
  }
  const add_book_to_storage = async (data) => {


    let tempCartArray = []
    let isPresent=false
    console.log("inside add book to storage")
    // -------- Before Login ----------//
    if (authData === '' || authData === null || authData === undefined) {
      const cd =  localStorage.getItem('cartData');
      console.log("existing cart Data= ", cd)

      // nothing present in async storage i.e first entry
      if (cd === null) {
        setCartCount(1)
        tempCartArray.push(data)

        localStorage.setItem("cartData", JSON.stringify(tempCartArray));

      }
      // if data already present in async storage
      else {
        tempCartArray = JSON.parse(cd)
        
        // check if book already present in list of data
        let index = tempCartArray.findIndex((item, i) => {
          return item.bookid === data.bookid
        });

        // if book is not present 
        if (index == -1) {
          //add the new book to cart and update the count
          tempCartArray.push(data)
          setCartCount(tempCartArray.length)
          localStorage.setItem("cartData", JSON.stringify(tempCartArray));


        }
        // book already present in cart and do nothing 
        else {
          isPresent=true
          console.log("Book already present in cart")
        }

      }
      setCartItems(tempCartArray)

    }
    // -------- After Login ----------//
    else {
      try {

        // check if book already present in cart or not
        let index = cartItems.findIndex((item, i) => {
          return item.id === data.bookid
        });
      
       // if book not present in cart
        if (index == -1) {
          // save data to backend 
          const response = await axios.post(Config.API_URL + Config.ADD_SINGLE_ITEM, data,

            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authData
              },

            })

          console.log('add Single item resp=', response)

          // get new updated cart items
          getCartData(authData)
        }
        else {
          isPresent=true
          console.log("Book already present in cart!")
        }

      }
      catch (error) {
        console.log('Add single item error=', error)
      }

    }

    // console.log("cart: ", response);
    if (isPresent) {
      return {message :"Book already present in cart",isPresent : true}
    }
    return {message :"Item added to cart",isPresent : false}
  }

  const remove_cart_item = async (args,buyNow) => {

    try {
      const response = await axios.post(Config.API_URL + Config.REMOVE_CART_ITEM,args,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },

        })

        //if the function is called from buynow button then the state needs to be change quickly hence the manual state change
        if(buyNow){
          removeBookFromState(args.bookid)
        }
        // if it gets called from another place like cart page then we can call the getCardData api to fix it
        else{
          console.log("inside if of get cart adter removal")
          getCartData(authData)

        }


      // await price_items_signin(response.data)

      return response.data

    }
    catch (error) {
      console.log("remove_cart_item_error : ", error)
    }
  }
  const removeBookFromState=(bookid) =>{
    
    setCartCount(cartCount-1)
    let index = cartItems.findIndex((item, i) => {
      return item.id === bookid
    });
    let tempArr=cartItems
    tempArr.splice(index,1)
    setCartItems(tempArr)
    localStorage.setItem("cartData", JSON.stringify(tempArr));
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
        resendPasswordCreationEmail,
        getCartData,
        cartItems,
        cartCount,
        remove_cart_item,
        removeBookFromState,
        clearCartStorage,
        image_path,
        add_book_to_storage

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


