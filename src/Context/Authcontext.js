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
  const [uuid, SetUuid] = useState()
  const [cartCount, setCartCount] = useState(0)
  const [cartItems, setCartItems] = useState([])
  const [subTotal, setSubTotal] = useState(0)
  const [authRole, setAuthRole] = useState('');
  const image_path = Config.API_URL + Config.PUB_IMAGES;

  // !  wishlistshow === isLoggedin

  const getDataFromStorage = async () => {
    var userToken = localStorage.getItem("userid");
    var userRole = localStorage.getItem("userRole");
    if (authData === '') {
      if (userToken === undefined || userToken === null || userToken === '') {
        console.log("No token available please login");
      }
      else {
        setAuthData(userToken)
        setAuthRole(userRole)
        decode_token(userToken)
        detect_unique_id()
      }
    }
    else {
      setIsexpired(false)
      decode_token(userToken)
      detect_unique_id()
    }



  }


  const decode_token = async (token) => {

    let My_token = token

    if (My_token !== "") {
      const { exp } = jwtDecode(My_token)
      // Refreshing the token a minute early to avoid latency issues
      const expirationTime = (exp * 1000) - 60000

      if (Date.now() >= expirationTime) {
        // console.log("Token Expired")
        setIsexpired(true)
        // localStorage.removeItem("userid")
        localStorage.setItem("userid", '');

      }
      else {
        setIsexpired(false)
      }
    }


    else {
      // console.log("Token Not Expired")
      setIsexpired(false)
    }



  }

  //  Key : unique_id 

  const detect_unique_id = async () => {

    let my_unique_id = localStorage.getItem("unique_id")

    if (my_unique_id === "" || my_unique_id === null || my_unique_id === undefined) {


      let system_uuid = uuidv4()
      localStorage.setItem('unique_id', system_uuid)
      SetUuid(system_uuid)


    }
    else {

      SetUuid(my_unique_id)

    }

    getCartData(authData, my_unique_id)

  }


  useEffect(() => {

  }, [cartItems])


  useEffect(() => {
    detect_unique_id()
    getDataFromStorage();
    wishlist_hide_show()


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

    try {
      const response = await axios.post(Config.API_URL + Config.LOGIN_API, arg,
        {
          headers: {
            'Content-Type': 'application/json'
          },

        })

      let decode_resp = jwtDecode(response.data.token)

      if (response.status === 200) {
        setAuthData(response.data.token)
        setAuthRole(decode_resp.role)
        setWishlistshow(true)
        // setAuthUsername(response.data.data[0].username)
        localStorage.setItem("userid", response.data.token);
        localStorage.setItem("userRole", decode_resp.role);
        getCartData(response.data.token)

        // localStorage.setItem("username", response.data.data[0].username);
      }
      else {
        setAuthData('')
        setAuthRole('')
        // setAuthUsername('')
        localStorage.setItem("userid", '');
        localStorage.setItem("cartData", '');
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
    setAuthRole('')
    setWishlistshow(false)
    // setAuthUsername('')
    localStorage.setItem("userid", '');
    localStorage.setItem("userRole", '');
    // localStorage.setItem("username", '');

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
      // console.log("ForgotPassword_resp: ", response);
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

  const getCartData = async (token, tempuuid) => {
    // console.log('uuid= ',tempuuid)
    let sendUUid = {
      deviceid: tempuuid
    }
    let tok = ''
    if (authData === '' || authData === null || authData === undefined) {
      tok = token
    }
    else {
      tok = authData
    }
    // -------- Before Login ----------//
    if (tok === '' || tok === null || tok === undefined) {
      let cc = localStorage.getItem("cartData")
      console.log("items after change= ", cc)
      if (cc !== null && cc !== undefined && cc !== '') {
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



        let cd = response.data.output
        // console.log("items befire change= ",cd)
        cd.map((item, index) => {
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
    let isPresent = false
    // console.log("inside add book to storage")
    // -------- Before Login ----------//
    console.log("authData in add book to storage= ", authData)
    console.log(authData, typeof authData);
    console.log("authData length:", authData?.length);

    if (authData === "" || authData === null || authData === undefined) {
      console.log("✅ BEFORE LOGIN BLOCK HIT");
      console.log("ALL localStorage keys:", Object.keys(localStorage));
      console.log("RAW cartData:", localStorage.getItem("cartData"));
      const cd = localStorage.getItem("cartData");
      console.log("cart data from storage= ", cd)
      const ui = localStorage.getItem("publisher_id");
      console.log("publisher id from storage= ", ui)

      // nothing present in async storage i.e first entry
      if (cd === null || cd === '' || cd === undefined || cd === '[]') {
        setCartCount(1)
        tempCartArray.push(data)
        console.log("cart data after first entry= ", tempCartArray)
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
          isPresent = true

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



          // get new updated cart items
          getCartData(authData)
        }
        else {
          isPresent = true
          console.log("Book already present in cart!")
        }

      }
      catch (error) {
        console.log('Add single item error=', error)
      }

    }

    // console.log("cart: ", response);
    if (isPresent) {
      return { message: "Book already present in cart", isPresent: true }
    }
    return { message: "Item added to cart", isPresent: false }
  }

  // only for guest mode
  const add_cart_item = async (args) => {
    // console.log("Auth Data add_cart_item:", token_guest);
    let authdata = localStorage.getItem("token");
    try {
      const response = await axios.post(Config.API_URL + Config.ADD_SINGLE_ITEM, args,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authdata
          },

        })

      // //if the function is called from buynow button then the state needs to be change quickly hence the manual state change
      // if (buyNow) {
      //   removeBookFromState(args.bookid)
      // }
      // // if it gets called from another place like cart page then we can call the getCardData api to fix it
      // else {
      //   // console.log("inside if of get cart adter removal")
      //   getCartData(authData)

      // }


      // await price_items_signin(response.data)

      return response.data

    }
    catch (error) {
      console.log("remove_cart_item_error : ", error)
    }
  }

  const remove_cart_item = async (args, buyNow) => {

    try {
      const response = await axios.post(Config.API_URL + Config.REMOVE_CART_ITEM, args,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },

        })

      //if the function is called from buynow button then the state needs to be change quickly hence the manual state change
      if (buyNow) {
        removeBookFromState(args.bookid)
      }
      // if it gets called from another place like cart page then we can call the getCardData api to fix it
      else {
        // console.log("inside if of get cart adter removal")
        getCartData(authData)

      }


      // await price_items_signin(response.data)

      return response.data

    }
    catch (error) {
      console.log("remove_cart_item_error : ", error)
    }
  }

  const clear_cart_items = async () => {
    // if (!authData) {
    //   authData = localStorage.getItem("token")
    // }
    
    let authdata = localStorage.getItem("token");
    try {
      const response = await axios.get(Config.API_URL + Config.CLEAR_CART_ITEMS,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authdata
          },

        })

      //if the function is called from buynow button then the state needs to be change quickly hence the manual state change
      // if (buyNow) {
      //   removeBookFromState(args.bookid)
      // }
      // // if it gets called from another place like cart page then we can call the getCardData api to fix it
      // else {
        // console.log("inside if of get cart adter removal")
        // getCartData(authData)

      // }


      // await price_items_signin(response.data)

      return response.data

    }
    catch (error) {
      console.log("remove_cart_item_error : ", error)
    }
  }

  const removeBookFromState = (bookid) => {

    setCartCount(cartCount - 1)
    let index = cartItems.findIndex((item, i) => {
      return item.id === bookid
    });
    let tempArr = cartItems
    tempArr.splice(index, 1)
    setCartItems(tempArr)
    localStorage.setItem("cartData", JSON.stringify(tempArr));
  }

  const incrementQuantityFromState = (bookid) => {
  //   setCartCount(cartCount + 1)
  //   let index = cartItems.findIndex((item, i) => {
  //     return item.bookid === bookid
  //   });
  //   let tempArr = cartItems
  //    console.log("tempArr index= ",tempArr[index])
  //   tempArr[index]["quantity"] += 1
  //   //tempArr[index]["quantity"]=tempArr[index]["quantity"]+1;
  //   console.log("tempArr before CALC=0 ", tempArr[index]["quantity"])
  //   let calculated_amount = tempArr[index]["price"] * tempArr[index]["quantity"]
  //   console.log("tempArr after CALC= ", calculated_amount)
  //   tempArr[index]["amount"] = calculated_amount
  //   console.log("tempArr after increment= ", tempArr)
  //   setCartItems([...tempArr])
  //   localStorage.setItem("cartData", JSON.stringify(tempArr));
  //   getCartData(authData)
  //   findSubtotal()

  const incCartItems = cartItems.map((item) => {
      if (item.bookid === bookid) {
        // Create a new object for the updated item
        return { ...item, amount: parseInt(item.price) * (parseInt(item.quantity) + 1), quantity: parseInt(item.quantity) + 1 };
      }
      console.log("item in increment= ", item)
      return item;
    });
    console.log("incCartItems after increment= ", incCartItems)
    localStorage.setItem("cartData", JSON.stringify(incCartItems));
    setCartItems([...incCartItems]); // Pass the new array to the setter

  }


  const decrementQuantityFromState = (bookid) => {

    // let index = cartItems.findIndex((item, i) => {
    //   return item.bookid === bookid
    // });
    // let tempArr = cartItems
    // // console.log("tempArr index= ",tempArr[index])
    // if (tempArr[index]["quantity"] > 1) {
    //   setCartCount(cartCount - 1)
    //   tempArr[index]["quantity"] -= 1
    //   tempArr[index]["amount"] = tempArr[index]["distributorprice"] * tempArr[index]["quantity"]
    //   setCartItems(tempArr)
    //   localStorage.setItem("cartData", JSON.stringify(tempArr));
    //   getCartData(authData)
    //   findSubtotal()
    // }
    // else {
    //   // removeBookFromState(bookid)
    //   alert("you must have atleasst one quantity")
    // }
    const decCartItems = cartItems.map((item) => {
      if (item.bookid === bookid) {
        // Create a new object for the updated item
        return { ...item, amount: parseInt(item.price) * (parseInt(item.quantity) - 1), quantity: parseInt(item.quantity) - 1 };
      }
      console.log("item in increment= ", item)
      return item;
    });
    console.log("decCartItems after increment= ", decCartItems)
    localStorage.setItem("cartData", JSON.stringify(decCartItems));
    setCartItems([...decCartItems]); // Pass the new array to the setter
  }

  const incrementQuantity = async (args) => {
    try {
      const response = await axios.post(Config.API_URL + Config.EDIT_CART_ITEM, args,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },

        })

      getCartData(authData)


      // await price_items_signin(response.data)

      return response.data

    }
    catch (error) {
      console.log("remove_cart_item_error : ", error)
    }
  }

  const decrementQuantity = async (args) => {
    try {
      const response = await axios.post(Config.API_URL + Config.EDIT_CART_ITEM, args,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },

        })

      getCartData(authData)



      // await price_items_signin(response.data)

      return response.data

    }
    catch (error) {
      console.log("remove_cart_item_error : ", error)
    }
  }
  const findSubtotal = () => {
    let subtotal = 0;

    if (cartItems.length > 0) {
      cartItems.map((data, index) => {
        subtotal = subtotal + data.amount
      })

      // console.log("subtotal function=", subtotal)
      setSubTotal(subtotal)

    } else {
      setSubTotal(0)
    }
    return subtotal
  }


  return (
    <AuthContext.Provider
      value={{
        logIn,
        logOut,
        forgot_password,
        authData,
        authRole,
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
        add_book_to_storage,
        decrementQuantityFromState,
        incrementQuantityFromState,
        incrementQuantity,
        decrementQuantity,
        subTotal,
        findSubtotal,
        clear_cart_items,
        add_cart_item

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


