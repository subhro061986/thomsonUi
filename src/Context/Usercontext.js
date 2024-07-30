import React, {
  createContext,
  useState,
  useContext,
  useEffect
} from "react";
import Config from "../Config/Config.json"
import axios from "axios";
import { useAuth } from "./Authcontext";
import LoadingOverlay from 'react-loading-overlay-ts';

const UserContext = createContext();

const UserProvider = ({ children }) => {

  const { authData, wishlistshow, isexpired, uuid, authRole } = useAuth();

  // const [catrproducts , setCartproducts] = useState([])
  const [isActive, setActive] = useState(false)
  const [items, setItems] = useState()
  const [price, setprice] = useState()
  const [wishlistitems, setWishlistItems] = useState([])

  const [wishbooksid, setWishbooksid] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [allActivePublisher, setAllActivePublisher] = useState([])
  const [allActivePublisher1, setAllActivePublisher1] = useState([])
  const [publisherData, setPublisherData] = useState('')
  const [publisherId, setPublisherId] = useState(0)
  const [categoryByPublisherList, setCategoryByPublisherList] = useState([])
  const [allCategoryList, setAllCategoryList] = useState([])
  const [allNewArrival, setallNewArrival] = useState([])
  const [allBestSeller, setAllBestSeller] = useState([])
  const [shippingList, setShippingList] = useState([])
  const [selectedShippingAddressId, setSelectedShippingAddressId] = useState(0)
  const [userShippingAddress, setUserShippingAddress] = useState(null)
  const [orderConfirmation, setOrderConfirmation] = useState(null)
  const [profileImage, setProfileImage] = useState('')
  
  





  useEffect(() => {

    getAllPublishers();
    getAllActivePublishers();
    //category_all();
    getAllCategory();
    getNewArrivals()


    if (authData === '' || authData === null || authData === undefined) {
      // get_items()
      // total_price_itemsno()

    }
    else {
      // category_all();
      // get_items()
      // total_price_itemsno()
      // cart_items({
      //   deviceid: "9E7C1A59-7473-405F-81A7-11E25C70F0AC"
      // })
      get_wishlist_books(1, 5)
      getAllShippingAddress();
      getSippingAddressById();
      delShippingAddress();
      myorders(1, 10);
      my_profile();

      // localstorage_price_items_signin()
      // get_wish_books_id()
    }
  }
    , [authData]);


  useEffect(() => {
    let loc_pub = localStorage.getItem('publisher_id')

    if (publisherId === 0 || publisherId === '0' || publisherId === '' || publisherId === null || publisherId === undefined) {
      setPublisherId(loc_pub)
    }

  }, [publisherId]);

  // ** --------------------- GALLERY API ------------------------------

  const getAllCategory = async () => {
    try {
      const response = await axios.get(Config.API_URL + Config.ALL_BOOK_CATEGORY,
        {
          headers: {
            'Content-Type': 'application/json',
          },

        })
      setAllCategoryList(response.data.output)
      return response.data

    }
    catch (error) {
      console.log("Book_category_error : ", error)
    }
  }



  const getNewArrivals = async (record_no) => {



    try {
      const response = await axios.get(Config.API_URL + Config.NEW_ARRIVAL + "?recordPerPage=" + 5,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': wishlistshow === true ? ('Bearer ' + authData) : null
          },

        })
      if (response === undefined || response === null) {
        setallNewArrival([])
      }
      else {
        if (response.data.statuscode === "0" && response.data.output.length > 0) {
          setallNewArrival(response.data.output)
        }
        else {
          setallNewArrival([])
        }
      }


      return response.data

    }
    catch (error) {
      console.log("Book_new_arrival error : ", error)
    }
  }


  const best_selling_books = async (record_per_page, publisher_id) => {
    let pub_id = 0;
    if (publisher_id === undefined || publisher_id === 0 || publisher_id === '0') {
      if (publisherId === 0 || publisherId === '0') {
        pub_id = localStorage.getItem('publisher_id')
      }
      else {
        pub_id = publisherId

      }

    }
    else {
      pub_id = publisher_id
    }
    // try {
    //   const response = await axios.get(Config.API_URL + Config.BEST_SELLING + "/"+ pub_id + "?recordPerPage=" + record_per_page,

    //     {
    //       headers: {
    //         'Authorization': wishlistshow === true ? ('Bearer ' + authData) : null
    //       },

    //     })
    //     if (response === undefined || response === null) {
    //       setAllBestSeller([])
    //   }
    //   else {
    //       if (response.data.statuscode === "0" && response.data.output.length > 0) {
    //         setAllBestSeller(response.data.output)
    //       }
    //       else {
    //         setAllBestSeller([])
    //       }
    //   }

    //   return response.data

    // }
    // catch (error) {
    //   setAllBestSeller([])
    //   console.log("Book_details_error : ", error)
    // }
  }



  const getBook_by_category = async (currentpageno, record_no, args) => {
    try {
      const response = await axios.post(Config.API_URL + Config.BOOK_BY_GENRE +
        "?currentPage=" + currentpageno + "&recordPerPage=" + record_no, args,

        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': wishlistshow === true ? ('Bearer ' + authData) : null
            // 'Authorization': 'Bearer ' + authData
          },

        })
      return response.data

    }
    catch (error) {
      console.log("Book_cat_Erget_book_authdataror : ", error)
    }
  }






  const get_book_details = async (book_id) => {
    try {
      const response = await axios.get(Config.API_URL + "book/" + book_id,

        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': wishlistshow === true ? ('Bearer ' + authData) : null
          },

        })



      return response.data

    }
    catch (error) {
      console.log("Book_details_error : ", error)
    }
  }
  const place_order = async (buyNow) => {
    try {
      const response = await axios.get(Config.API_URL + Config.PLACE_ORDER + `?buynow=${buyNow}`,

        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },

        })



      return response.data

    }
    catch (error) {
      console.log("place_order_error : ", error)
    }
  }

  const myorders = async (currentpageno, record_no) => {
    try {
      const response = await axios.get(Config.API_URL + Config.MY_ORDERS + "?currentPage=" + currentpageno + "&recordPerPage=" + record_no,

        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },

        })



      return response.data

    }
    catch (error) {
      console.log("myorders_error : ", error)
    }
  }

  const applyCoupon = async (args) => {
    try {
      const response = await axios.post(Config.API_URL + Config.COUPON_CODE, args,

        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },

        })



      return response.data

    }
    catch (error) {
      console.log("applyCoupon_error : ", error)
    }
  }



  const addto_cart = async (json_obj) => {
    //console.log("Before Login cart item context : ", json_obj);

    let default_img = json_obj.front_cover !== null ? json_obj.front_cover : null;

    let basket = JSON.parse(localStorage.getItem("cart_data")) || []

    let json_data = {
      title: json_obj.title,
      author: json_obj.authors,
      price: json_obj.price,
      publisher: json_obj.publisher,
      items_no: 1,
      my_book_id: json_obj.id,
      image: default_img,
      category: json_obj.category,
      publisherid: json_obj.publisherid
    }
    //console.log("json_data", json_data)

    let book_id = json_obj.id

    let is_present_prod = basket.find((val) => val.my_book_id === book_id)

    if (is_present_prod === undefined) {
      basket.push(json_data)
      localStorage.setItem("cart_data", JSON.stringify([...basket]))
    } else {
      //console.log(`${json_obj.title} : Already present in basket`)
    }

    get_items()
    total_price_itemsno()
    //console.log("Cart in context :", basket)
  }




  const get_items = async () => {
    //console.log("Hello in context")
    let array_item = []
    let local_storage_data = JSON.parse(localStorage.getItem("cart_data"))
    if (local_storage_data === undefined || local_storage_data === null) {
      array_item = []
    }

    else {
      array_item = [...local_storage_data]
    }

    let item_no = array_item.length
    setItems(item_no)
    total_price_itemsno()
    //console.log("getcartitems", item_no)
  }



  const total_price_itemsno = async () => {
    // //console.log("executing " )
    let total_price = 0
    let items_no = 0
    let storage_arr = JSON.parse(localStorage.getItem("cart_data"))
    for (let i = 0; i < storage_arr?.length; i++) {

      total_price = total_price + storage_arr[i].items_no * storage_arr[i].price
      items_no = items_no + storage_arr[i].items_no
    }
    localStorage.setItem("cart_items_no", items_no)
    setprice(total_price)


  }

  //  **  ----------------------   Wishlist ------------------------------------- 


  const get_wishlist_books = async (current_page, record_per_page) => {



    try {

      const response = await axios.get(Config.API_URL + Config.GET_WISHLIST_BOOKS +
        "?currentPage=" + current_page + "&recordPerPage=" + record_per_page,

        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },

        })

      setWishlistItems(response.data.output)

      return response.data

    }
    catch (error) {
      console.log("wishlist_books_resp_error : ", error)
    }
  }





  const add_delete_to_wishlist = async (args) => {
    try {
      const response = await axios.post(Config.API_URL + Config.ADD_DELETE_IN_WISHLIST, args,

        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },

        })

      // console.log("add_del_wish_resp", response);

      return response.data

    }
    catch (error) {
      console.log("Add_to_wishlist_error : ", error)
    }
  }

  // *  ------------------  Cart (After Sign-in ) ------------------------- 

  const cart_items = async (args) => {

    try {
      //console.log("get_carg_args :", args)
      const response = await axios.post(Config.API_URL + Config.GET_CART_ITEMS, args,


        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },

        })


      setCartItems(response.data.output)

      return response.data

    }
    catch (error) {
      console.log("get_cart_items_error : ", error)
    }
  }


  const add_single_item = async (args) => {
    try {
      const response = await axios.post(Config.API_URL + Config.ADD_SINGLE_ITEM, args,

        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },

        })

      await price_items_signin(response.data)

      return response.data

    }
    catch (error) {
      console.log("add_single_item_error : ", error)
    }
  }



  const localstorage_price_items_signin = async () => {



    //console.log("Called localstorage_price_items_signin function")

    let localstorage_bookids = []
    let localstorage_array_item = []
    let local_storage_data = JSON.parse(localStorage.getItem("cart_data"))
    let local_storage_uuid = localStorage.getItem("unique_id")

    if (local_storage_data === undefined || local_storage_data === null) {

      localstorage_bookids = []

    }

    else {


      const resp = await cart_items({
        deviceid: local_storage_uuid
        // "9E7C1A59-7473-405F-81A7-11E25C70F0AC"
      })

      if (resp === undefined || resp === null) {
        localstorage_bookids = []
        //console.log("My_uuid :", local_storage_uuid)
      }
      else {
        //console.log("My_uuid :", local_storage_uuid)

        let cartitems = resp.output

        //console.log("cart_items_resp_else ", resp)

        localstorage_array_item = [...local_storage_data]

        for (let i = 0; i < localstorage_array_item.length; i++) {
          let book_id = localstorage_array_item[i].my_book_id

          // let book_is_present = cartItems.find((val) => val.id === book_id)
          let book_is_present = cartitems.find((val) => val.id === book_id)

          //console.log("book_is_present ", book_is_present)

          if (book_is_present === undefined) {
            localstorage_bookids.push(book_id)
          }


        }
      }
    }

    //console.log("localstorage_bookids_aray : ", localstorage_bookids)

    let mul_json =
    {
      deviceid: local_storage_uuid,
      // "9E7C1A59-7473-405F-81A7-11E25C70F0AC",
      bookids: localstorage_bookids
    }

    const response = await add_multiple_item(mul_json)
    //console.log("Multiple_resp ", response)
    localStorage.removeItem('cart_data')

    //console.log("Token_is_expired :", isexpired)

    if (response === undefined || response === null || isexpired === true) {
      setItems(0)
      setprice(0)
    }
    else {
      price_items_signin(response)
    }




  }


  // const g_json = {
  //   deviceid: "9E7C1A59-7473-405F-81A7-11E25C70F0AC"
  // }

  // const response = await cart_items(g_json)

  const price_items_signin = async (response) => {
    //console.log("price_items_signin response", response)
    let item_no = response.output.length
    let tot_price = 0
    let get_book_arr = response.output

    for (let i = 0; i < item_no; i++) {
      tot_price = tot_price + get_book_arr[i].price
    }

    setItems(item_no)
    setprice(tot_price)
  }













  const add_multiple_item = async (args) => {
    try {
      const response = await axios.post(Config.API_URL + Config.ADD_MULTIPLE_ITEMS, args,

        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },

        })

      //console.log("add_multiple_item : ", response.data);

      return response.data

    }
    catch (error) {
      console.log("add_multiple_item_error : ", error)
    }
  }



  const remove_cart_item = async (args) => {

    try {


      const response = await axios.post(Config.API_URL + Config.REMOVE_CART_ITEM, args,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },

        })

      await price_items_signin(response.data)

      return response.data

    }
    catch (error) {
      console.log("remove_cart_item_error : ", error)
    }
  }


  const change_personal_details = async (args) => {
    try {
      const response = await axios.post(Config.API_URL + Config.CHANGE_PERSONAL_INFO, args,

        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + authData
          },

        })

      //console.log("change_personal_details : ", response.data);

      return response.data

    }
    catch (error) {
      console.log("change_personal_details_error : ", error)
    }
  }


  const change_contact_details = async (args) => {
    try {
      const response = await axios.post(Config.API_URL + Config.CHANGE_CONTACT_INFO, args,

        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },

        })

      //console.log("change_contact_details : ", response.data);

      return response.data

    }
    catch (error) {
      console.log("change_contact_details_error : ", error)
    }
  }
  const change_billing_address = async (args) => {
    try {
      const response = await axios.post(Config.API_URL + Config.EDIT_BILLING_ADDRESS, args,

        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },

        })

      //console.log("change_billing_address : ", response.data);

      return response.data

    }
    catch (error) {
      console.log("change_billing_address_error : ", error)
    }
  }


  const change_password = async (args) => {
    try {
      const response = await axios.post(Config.API_URL + Config.CHANGE_PASSWORD, args,

        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },

        })

      //console.log("change_password : ", response.data);

      return response.data

    }
    catch (error) {
      console.log("change_password_error : ", error)
    }
  }


  const my_profile = async () => {
    try {
      const response = await axios.get(Config.API_URL + Config.MY_PROFILE,

        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },

        })

      console.log("my_profile : ", response.data);
      setProfileImage(response.data.output.profileimg)

      return response.data

    }
    catch (error) {
      console.log("my_profile_error : ", error)
    }
  }
  const get_country_list = async () => {
    try {
      const response = await axios.get(Config.API_URL + Config.COUNTRY_LIST,

        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },

        })

      //console.log("get_country_list : ", response.data);

      return response.data

    }
    catch (error) {
      console.log("get_country_list_error : ", error)
    }
  }
  const get_state_list = async (countryId) => {
    try {
      const response = await axios.get(Config.API_URL + Config.STATE_LIST + countryId,

        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },

        })

      //console.log("get_country_list : ", response.data);

      return response.data

    }
    catch (error) {
      console.log("get_country_list_error : ", error)
    }
  }

  const getAllPublishers = async () => {
    try {
      const response = await axios.get(Config.API_URL + Config.ALL_PUBLISHERS,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        })
      setAllActivePublisher(response.data.output)


      return response;
    }
    catch (error) {
      //console.log("PUBLISHER CONTEXT ERROR: ", error);
    }
  }
  const getAllActivePublishers = async () => {
    try {
      const response = await axios.get(Config.API_URL + Config.ALL_ACTIVE_PUBLISHERS,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        })
      setAllActivePublisher1(response.data.output)

      return response;
    }
    catch (error) {
      console.log("PUBLISHER CONTEXT ERROR: ", error);
    }
  }

  // const getBookShelf = async () => {
  //   try {
  //     const response = await axios.get(Config.API_URL + Config.BOOK_SHELF + "?currentPage=" + 1 + "&recordPerPage=" + 10,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': 'Bearer ' + authData
  //         },
  //       })
  //     // setAllActivePublisher(response.data.output)
  //     return response.data;
  //   }
  //   catch (error) {
  //     console.log("BOOKSHELF CONTEXT ERROR: ", error);
  //   }
  // }

  /* Razor Pay */
  const createRazorpayOrder = async (data) => {
    try {
      const response = await axios.post(Config.API_URL + Config.RAZORPAY_CREATE_ORDER, data,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      return response.data;
    }
    catch (error) {
      console.log("Razor CONTEXT ERROR: ", error);
    }
  }
  const processPayment = async (data) => {
    try {
      const response = await axios.post(Config.API_URL + Config.RAZORPAY_PROCESS_PAYMENT, data,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })

      //console.log("razor pay payment confirmed  : ", response);
       setOrderConfirmation(response.data)
      return response.data;
    }
    catch (error) {
      console.log("process payment CONTEXT ERROR: ", error);
    }
  }

  const getPublishersById = async (id) => {

    //setPublisherId(0)
    let pub_id = 0;
    if (id === undefined || id === 0 || id === '0') {
      if (publisherId === 0 || publisherId === '0') {
        pub_id = localStorage.getItem('publisher_id')
      }
      else {
        pub_id = publisherId
      }

    }
    else {
      pub_id = id
    }

    try {
      setActive(true)
      const response = await axios.get(Config.API_URL + Config.GET_PUB_DETAILS + pub_id,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        })

      setPublisherData(response?.data?.output)
      setPublisherId(response?.data?.output?.id)
      localStorage.setItem('publisher_id', response?.data?.output?.id)
      getNewArrivals(4, response?.data?.output?.id)
      best_selling_books(4, response?.data?.output?.id)
      setActive(false)
      return response;
    }
    catch (error) {
      setActive(false)
      console.log("PUBLISHER CONTEXT ERROR: ", error);
    }
  }


  const getInvoiceById = async (invoiceId) => {
    try {
      const response = await axios.get(Config.API_URL + Config.INVOICE_DETAILS + "/" + invoiceId,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      return response.data;
    }
    catch (error) {
      console.log("invoice CONTEXT ERROR: ", error);
    }
  }

  const getCouponByPublisherId = async (data) => {
    try {
      const response = await axios.post(Config.API_URL + Config.GET_COUPON_BY_PUBLISHERID, data,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })


      return response.data;
    }
    catch (error) {
      console.log("coupon CONTEXT ERROR: ", error);
    }
  }

  const sendEmail = async (data) => {
    try {
      const response = await axios.post(Config.API_URL + Config.NEWSLETTER, data,
        {
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer ' + authData
          },
        })


      return response.data;
    }
    catch (error) {
      console.log("Newsletter CONTEXT ERROR: ", error);
    }
  }

  const getBooksBySearchText = async (data) => {
    try {
      const response = await axios.post(Config.API_URL + Config.SEARCH_BOOKS, data,
        {
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer ' + authData
          },
        })

      //console.log("news letter details  : ", response);
      return response.data;
    }
    catch (error) {
      console.log("Newsletter CONTEXT ERROR: ", error);
    }
  }

  // shipping Address APIs

  const addShippingAddress = async (formData) => {
    // console.log("currentpageno", Config.API_URL + Config.BOOK_LIST_API + "?currentPage=" + 1 + "&recordPerPage=" + 5)

    try {
      const response = await axios.post(Config.API_URL + Config.ADD_SHIPPING_ADDRESS, formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      // }
      getAllShippingAddress();

      return response;

    }

    catch (error) {
      console.log("Add shipping Response Error : ", error)
    }
  }

  const getAllShippingAddress = async () => {
    try {
      const response = await axios.get(Config.API_URL + Config.GET_ALL_SHIPPING_ADDRESS,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      console.log("CALL SHIPPED==>", response);
      setShippingList(response.data.output)

      return response;
    }
    catch (error) {
      console.log("get_shipping address_error : ", error);
    }
  }

  const getSippingAddressById = async (id) => {
    try {
      const response = await axios.get(Config.API_URL + Config.GET_ALL_SHIPPING_ADDRESS + "/" + id,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })

      return response;
    }
    catch (error) {
      console.log("Get_shipping_by_id_error : ", error);
    }
  }

  const editShippingAddress = async (args, id) => {

    try {
      const response = await axios.post(Config.API_URL + Config.EDIT_SHIPPING_ADDRESS + "/" + id, args,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      await getAllShippingAddress();

      return response;
    }
    catch (error) {
      console.log("EDIT_SHIPPING_Error : ", error)
    }
  }

  const delShippingAddress = async (id) => {
    try {
      const response = await axios.get(Config.API_URL + Config.DELETE_SHIPPING_ADDRESS + "/" + id,

        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      // setShippingList();
      getAllShippingAddress();

      return response;
    }
    catch (error) {
      console.log("DEL_SHIPPING_Error : ", error)
    }
  }

  const getBillingAddress = async () => {
    try {
      const response = await axios.get(Config.API_URL + Config.GET_BILLING_ADDRESS,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })



      return response.data;
    }
    catch (error) {
      console.log("get_shipping address_error : ", error);
    }
  }

  const editBillingAddress = async (args) => {
    try {
      const response = await axios.post(Config.API_URL + Config.EDIT_BILLING_ADDRESS, args,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })



      return response.data;
    }
    catch (error) {
      console.log("get_shipping address_error : ", error);
    }
  }

  const createAppOrder = async (buyNow, args) => {
    try {
      const response = await axios.post(Config.API_URL + Config.ORDER_CREATE + `?buynow=${buyNow}`, args,

        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },

        })



      return response.data

    }
    catch (error) {
      console.log("place_order_error : ", error)
    }
  }
  const cancelOrder = async (args) => {
    try {
      const response = await axios.post(Config.API_URL + Config.CANCEL_ORDER, args,

        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },

        })



      return response.data

    }
    catch (error) {
      console.log("place_order_error : ", error)
    }
  }

  const returnOrderRequest = async (args) => {
    try {
      const response = await axios.post(Config.API_URL + Config.RETURN_ORDER, args,

        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },

        })



      return response.data

    }
    catch (error) {
      console.log("place_order_error : ", error)
    }
  }

  const selectShippingAddress = async (id) => {
    setSelectedShippingAddressId(id)
    let shippingaddress = shippingList.find((val) => val.id === id)
    setUserShippingAddress(shippingaddress)
    return id
  }
  return (
    <UserContext.Provider
      value={{
        getAllCategory,
        //category_all,
        getNewArrivals,
        allNewArrival,
        best_selling_books,
        allBestSeller,
        getBook_by_category,
        get_book_details,
        addto_cart,
        items,
        price,
        get_items,
        get_wishlist_books,
        add_delete_to_wishlist,
        wishlistitems,
        wishbooksid,
        cart_items,
        add_single_item,
        add_multiple_item,
        remove_cart_item,
        change_personal_details,
        change_contact_details,
        change_billing_address,
        change_password,
        place_order,
        myorders,
        applyCoupon,
        my_profile,
        get_country_list,
        get_state_list,
        getAllPublishers,
        getAllActivePublishers,
        allActivePublisher,
        allActivePublisher1,
        getPublishersById,
        publisherData,
        publisherId,
        categoryByPublisherList,
        allCategoryList,
        createRazorpayOrder,
        processPayment,
        getInvoiceById,
        getCouponByPublisherId,
        sendEmail,
        getBooksBySearchText,
        addShippingAddress,
        getAllShippingAddress,
        shippingList,
        getSippingAddressById,
        editShippingAddress,
        delShippingAddress,
        getBillingAddress,
        editBillingAddress,
        createAppOrder,
        selectShippingAddress,
        selectedShippingAddressId,
        cancelOrder,
        returnOrderRequest,
        userShippingAddress,
        orderConfirmation,
        profileImage


      }}
    >
      <LoadingOverlay
        active={isActive}
        spinner
        text='Loading your content...'
      >
        {children}
      </LoadingOverlay>

    </UserContext.Provider>
  )
}


function UserProfile() {
  const context = useContext(UserContext)



  return context
}


export { UserContext, UserProvider, UserProfile }


