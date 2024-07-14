import React, {
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";

import Config from "../Config/Config.json"
import axios from "axios";
import { useAuth } from "./AuthContext";

const AdminContext = createContext();
const AdminProvider = ({ children }) => {
  const { authData, authDeatils } = useAuth();
  const [categoryList, setCategoryList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [allBookList, setAllBookList] = useState([]);
  const [manageOrder, setManageOrder] = useState([]);
  const [pubInfoImg, setPubInfoImg] = useState('');
  const [languages, setLanguages] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [allPublisher, setAllPublisher] = useState([]);
  const [allCoupons, setAllCoupons] = useState([]);
  const [ssadminDashboard, setSSadminDashboard] = useState([]);
  const [salesVal, setSalesVal] = useState([]);
  const [dimensionsVal, setDimensionsVal] = useState([]);
  const [legendVal, setlegendVal] = useState([]);
  const [currMonthlySale, setMonthlyCurrSale] = useState({});
  const [prevMonthlySale, setMonthlyPrevSale] = useState({});
  const [distributorList, setDistributorList] = useState({});
  const [shipperInfoList, setShipperInfoList] = useState({});
  const [orderInfo,setOrderInfo]= useState(null);

  useEffect(() => {

    // console.log(authData);
    if (authData === null || authData === undefined || authData === '') {
      console.log('No token available');
    }
    else {
      console.log("authDetails:", authDeatils)
      // if (authDeatils.role === "Admin") {
        getAllCategory();
        getAllBookList();
        get_pub_details();
        getAllPublishers();
        get_all_countries();
        //   // getAllCustomers_admin();
          getManageOrder();
        getAllLanguage();
        getAllCurrency();

        getAllDistributor();
        getAllShipper();
        // getAllCoupons();
      // }
      // else if(authDeatils.role === "South Shore Admin" ){
      // getAllCategory();
      // getAllBookList();
      // getAllCustomers_admin();
      // getAllLanguage();
      // getAllPublishers();
      // get_dashboard();
      // let currentYear = new Date().getFullYear();
      // let currentMonth = new Date().getMonth()+1;
      // let paddedMonth=currentMonth.toString().padStart(2,'0')
      // let args = {
      //   "yearmonth": currentYear + "-" + paddedMonth
      // };
      // let args = {
      //   "yearmonth": "2024-05"
      // };
      // get_admin_monthlysales(args)
      // get_book_details()
      // }

      // getAllPublishers();
    }
  }
    , [authData]);




  const getAllCategory = async () => {
    try {
      console.log("test cat api :", Config.API_URL + Config.ALL_BOOK_CATEGORY)
      const response = await axios.get(Config.API_URL + Config.ALL_BOOK_CATEGORY,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        })
      setCategoryList(response.data.output.length === 0 ? [] : response.data.output)
      console.log("GET ALL BOOK CATEGORY : ", response);
      return response;
    }
    catch (error) {
      setCategoryList([])
      console.log("Book_category_error : ", error);
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
      // console.log("GET ALL PUBLISHERS : ", response);
      setAllPublisher(response?.data?.output)
      return response;
    }
    catch (error) {
      console.log("Book_category_error : ", error);
    }
  }

  const getCategoryById = async (id) => {
    try {
      const response = await axios.get(Config.API_URL + Config.GET_CATEGORY_BY_ID + "/" + id,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        })
      console.log("GET CATEGORY BY ID: ", response);
      return response;
    }
    catch (error) {
      console.log("Get_category_by_id_error : ", error);
    }
  }

  const getBookById = async (id) => {
    try {
      const response = await axios.get(Config.API_URL + Config.BOOK_LIST_API + "/" + id,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        })
      // console.log("GET BOOK BY ID: ", response);
      return response;
    }
    catch (error) {
      console.log("Get_book_by_id_error : ", error);
    }
  }


  const getAllBookList = async () => {
    // console.log("currentpageno", Config.API_URL + Config.BOOK_LIST_API + "?currentPage=" + 1 + "&recordPerPage=" + 5)
    try {
      console.log("auth data= ", authData)
      const response = await axios.post(Config.API_URL + Config.BOOK_LIST_API + "?currentPage=" + 1 + "&recordPerPage=" + 50, {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      // }
      console.log("GET ALL BOOK LIST : ", response);
      setAllBookList(response.data.output.books);
      return response;

    }

    catch (error) {
      console.log("Book_List_Error : ", error)
    }
  }

  const uploadSingleBook = async (formData) => {
    // console.log("currentpageno", Config.API_URL + Config.BOOK_LIST_API + "?currentPage=" + 1 + "&recordPerPage=" + 5)

    try {
      const response = await axios.post(Config.API_URL + Config.UPLOAD_BOOKS_SINGLE, formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + authData
          },
        })
      // }
      if (response.data.statuscode === '0') {
        getAllBookList()
      }
      // console.log(" Upload Single Book Response : ", response);
      return response;

    }

    catch (error) {
      console.log("upload_single_book_Error : ", error)
    }
  }

  const updateSingleBook = async (id, formdata) => {
    // console.log('token in single update', authData)
    // console.log('took_update_id', id)
    // console.log('update_api',Config.API_URL + Config.UPDATE_SINGLE_BOOK + id)
    try {
      const response = await axios.post(Config.API_URL + Config.UPDATE_SINGLE_BOOK + id, formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + authData
          },
        })
      // }
      if (response.data.statuscode === '0') {
        getAllBookList()
      }
      // console.log(" update Single Book Response : ", response);
      return response;

    }

    catch (error) {
      console.log("update_single_book_Error : ", error)
    }
  }

  const getAllCustomers_admin = async () => {
    try {
      // console.log("all_customers_admin_Authdata :", authData)
      const response = await axios.get(Config.API_URL + "customer",
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      // console.log("GET ALL CUSTOMERS : ", response);
      const cust = response.data.output.length > 0 ? response.data.output : [];
      setCustomerList(cust === null || cust === undefined ? [] : cust);
      return cust === null || cust === undefined ? [] : cust;
    }
    catch (error) {
      console.log(" ALL CUSTOMERS ERROR : ", error)
    }
  }

  const getManageOrder = async (currentPage, recordPerPage) => {
    try {
      const response = await axios.get(Config.API_URL + Config.MANAGE_ORDER_API + "?currentPage=" + currentPage + "&recordPerPage=" + recordPerPage,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      console.log("GET MANAGE ORDER: ", response);
      setManageOrder(response.data);
      return response;
    }
    catch (error) {
      console.log("Get_manageorder_error : ", error);
    }
  }



  const getOrderbyPub = async (currentPage, recordPerPage) => {
    try {
      const response = await axios.get(Config.API_URL + Config.GET_PUBLISHER_ORDER + "currentPage=" + currentPage + "&recordPerPage=" + recordPerPage,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      // console.log("GET ORDER BY PUBLISHER: ", response.data);
      // setManageOrder(response.data);
      return response;
    }
    catch (error) {
      console.log("Get_order_by_publisher error : ", error);
    }
  }





  const getPublisherDetails = async (id) => {
    try {
      const response = await axios.get(Config.API_URL + "publisher/" + id,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      // console.log("GET PUBLISHER DETAILS: ", response.data);
      return response;
    }
    catch (error) {
      console.log("Get_pubdetails_error : ", error);
    }
  }

  const getAllLanguage = async () => {
    // console.log("Get_allLanguage")
    try {
      const response = await axios.get(Config.API_URL + Config.LANGUAGE_LIST,
        {
          headers: {
            'Content-Type': 'application/json'
          },
        })
      console.log("GET Language DETAILS: ", response.data);
      setLanguages(response.data.output)
      return response;
    }
    catch (error) {
      console.log("Get_language_error : ", error);
    }
  }

  const getAllCurrency = async () => {
    // console.log("Get_allLanguage")
    try {
      const response = await axios.get(Config.API_URL + Config.Currency_LIST,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      console.log("GET Currency DETAILS: ", response.data);
      setCurrencies(response.data.output)
      return response;
    }
    catch (error) {
      console.log("Get_language_error : ", error);
    }
  }

  const addCategory = async (args) => {
    // console.log("Args :", args);
    try {
      const response = await axios.post(Config.API_URL + Config.ADD_CATEGORY, args,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      getAllCategory();
      // console.log("ADD CATEGORY RESPONSE : ", response);
      return response;
    }
    catch (error) {
      console.log("ADD_CATEGORY_Error : ", error)
    }
  }

  const editCategory = async (id, args) => {
    // console.log("Args :", args);
    // console.log("Id :", id);
    try {
      const response = await axios.post(Config.API_URL + Config.EDIT_CATEGORY + "/" + id, args,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      getAllCategory();
      console.log("EDIT CATEGORY RESPONSE : ", response);
      return response;
    }
    catch (error) {
      console.log("EDIT_CATEGORY_Error : ", error)
    }
  }

  const delCategory = async (id) => {
    // console.log("Id :", id);
    try {
      const response = await axios.post(Config.API_URL + Config.DEL_CATEGORY + "/" + id,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      getAllCategory();
      console.log("DELETE CATEGORY RESPONSE : ", response);
      return response;
    }
    catch (error) {
      console.log("DEL_CATEGORY_Error : ", error)
    }
  }


  const addPublisher_admin = async (args) => {
    // console.log("Hello");
    // console.log("form-data :", args);
    try {
      const response = await axios.post(Config.API_URL + Config.ADD_PUBLISHER_API_ADMIN, args,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + authData
          },
        })
      // console.log("ADD PUBLISHER ADMIN RESPONSE : ", response);
      return response;
    }
    catch (error) {
      console.log("Add_Publisher_Admin_Error : ", error)
    }
  }

  const uploadBooksInBulk_admin = async (args) => {
    // console.log("Hello in uploadBooksInBulk_admin");
    // console.log("form-data :", args);
    try {
      const response = await axios.post(Config.API_URL + Config.UPLOAD_BOOKS_BULK_ADMIN, args,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + authData
          },
        })
      // console.log("UPLOAD_BOOKS_BULK_ADMIN ADMIN RESPONSE : ", response);
      return response;
    }
    catch (error) {
      console.log("UPLOAD_BOOKS_BULK_ADMIN_Error : ", error)
    }
  }


  const updatePublisher_admin = async (id, args) => {
    // console.log("id :", id);
    try {
      const response = await axios.post(Config.API_URL + Config.UPDATE_PUBLISHER_ADMIN + '/' + id, args,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + authData
          },
        })
      // console.log("UPDATE PUBLISHER ADMIN RESPONSE : ", response);
      return response;
    }
    catch (error) {
      console.log("Update_Publisher_admin : ", error)
    }
  }

  const deletePublisher_admin = async (id) => {
    // console.log("delete_id :", id);
    try {
      const response = await axios.post(Config.API_URL + Config.DELETE_PUBLISHER_ADMIN + id, {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      // console.log("DELETE PUBLISHER ADMIN RESPONSE : ", response);
      return response;
    }
    catch (error) {
      console.log("Delete_Publisher_admin : ", error)
    }
  }

  // const getAllOrders = async (currentpageno, record_no) => {
  //   console.log("Authdata in get all orders : ", authData);
  //   console.log("cuurent page np in get all orders : ", currentpageno);
  //   console.log("record no in get all orders : ", record_no);
  //   try {
  //     const response = await axios.get(Config.API_URL + Config.GET_ALL_ORDERS,
  //       "?currentPage=" + currentpageno + "&recordPerPage=" + record_no,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': 'Bearer ' + authData
  //         },
  //       });
  //     setOrderList(response.output.books);
  //     console.log("GET ALL ORDER LIST : ", response);
  //     return response;
  //   }    
  //   catch (error) {
  //     console.log("Order_List_Error : ", error)
  //   }
  // }


  const deleteUserCustomer = async (id) => {
    // console.log("Delete user with id :", id);
    try {
      const response = await axios.post(Config.API_URL + Config.DELETE_USER_CUSTOMER + "/" + id, {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      getAllCustomers_admin();
      // console.log("DELETE USER CUSTOMER RESPONSE : ", response);
      return response;
    }
    catch (error) {
      console.log("DELETE_USER_CUSTOMER_Error : ", error)
    }
  }


  const restore_customer = async (id) => {
    // console.log("Restore user with id :", id);
    try {
      const response = await axios.post(Config.API_URL + Config.RESTORE_CUSTOMER_ADMIN + id, {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      getAllCustomers_admin();

      // console.log("RESTORE USER CUSTOMER RESPONSE : ", response);
      return response;
    }
    catch (error) {
      console.log("RESTORE_USER_CUSTOMER_Error : ", error)
    }
  }

  const restore_category = async (id) => {
    // console.log("Restore user with id :", id);
    try {
      const response = await axios.post(Config.API_URL + Config.RESTORE_CATEGORY_ADMIN + id, {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      getAllCategory();

      // console.log("RESTORE USER CUSTOMER RESPONSE : ", response);
      return response;
    }
    catch (error) {
      console.log("RESTORE_USER_CUSTOMER_Error : ", error)
    }
  }




  const restore_publisher = async (id) => {
    // console.log("Args :", args);

    try {
      // console.log("restore_id ", typeof (id))
      // console.log("AuthToken ", authData)
      // console.log("URL ", Config.API_URL + Config.RESTORE_PUBLISHER_ADMIN + id)
      const response = await axios.post(Config.API_URL + Config.RESTORE_PUBLISHER_ADMIN + id, {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })

      // console.log("Restore Publisher RESP: ", response);
      return response;
    }
    catch (error) {
      console.log("Restore Publisher ERROR : ", error)
    }
  }


  const add_publisher_user = async (args) => {
    try {
      const response = await axios.post(Config.API_URL + Config.ADD_PUBLISHER_USER, args,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      // console.log(" ADD PUBLISHER USER : ", response.data);
      // setManageOrder(response.data);
      return response;
    }
    catch (error) {
      console.log("ADD PUBLISHER USER error : ", error);
    }
  }


  const get_publisher_users = async () => {
    try {
      const response = await axios.get(Config.API_URL + 'publisheruser',
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      // console.log(" GET PUBLISHER USERS : ", response.data);
      // setManageOrder(response.data);
      return response;
    }
    catch (error) {
      console.log("GET PUBLISHER USERS error : ", error);
    }
  }

  const restore_pub_user = async (id) => {
    try {
      const response = await axios.post(Config.API_URL + Config.RESTORE_PUBLISHER_USER + id, {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      // console.log(" RESTORE PUBLISHER USERS : ", response.data);
      // setManageOrder(response.data);
      return response;
    }
    catch (error) {
      console.log("RESTORE PUBLISHER USERS error : ", error);
    }
  }

  const delete_pub_user = async (id) => {
    try {
      const response = await axios.post(Config.API_URL + Config.DELETE_PUBLISHER_USER + id, {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      // console.log(" DELETE PUBLISHER USERS : ", response.data);
      // setManageOrder(response.data);
      return response;
    }
    catch (error) {
      console.log("DELETE PUBLISHER USERS error : ", error);
    }
  }

  const get_myprofile = async () => {
    try {
      const response = await axios.get(Config.API_URL + Config.GET_MYPROFILE,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      // console.log(" get_myprofile resp : ", response.data);
      // setManageOrder(response.data);
      return response;
    }
    catch (error) {
      console.log("get_myprofile error : ", error);
    }
  }

  const update_myprofile_cnagepersonalinfo = async (args) => {
    try {
      const response = await axios.post(Config.API_URL + Config.UPDATE_MYPROFILE_CHANGEPERSONALINFO, args,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + authData
          },
        })

      // setManageOrder(response.data);
      // get_myprofile()
      return response;
    }
    catch (error) {
      console.log("update_myprofile_cnagepersonalinfo error : ", error);
    }
  }

  const update_myprofile_cnagecontactinfo = async (args) => {
    try {
      // console.log("contact_args ", args)
      // console.log("contact_args_authdata ", authData)
      const response = await axios.post(Config.API_URL + Config.UPDATE_MYPROFILE_CHANGECONTACTINFO, args,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      // console.log(" update_myprofile_cnagecontactinfo resp : ", response.data);
      // setManageOrder(response.data);
      // get_myprofile()
      return response;
    }
    catch (error) {
      console.log("update_myprofile_cnagecontactinfo error : ", error);
    }
  }

  const get_pub_details = async (id) => {
    try {
      // console.log("pub_det_id", Config.API_URL + Config.GET_PUB_DETAILS + authDeatils.pub_id)
      const response = await axios.get(Config.API_URL + Config.GET_PUB_DETAILS + authDeatils.pub_id,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      // console.log(" uget_pub_details resp : ", response);
      if (response.data.statuscode === 0) {
        setPubInfoImg(Config.API_URL + Config.PUB_IMAGES + response.data.output.id + "/" + response.data.output.logo + '?d=' + new Date())
      }
      else {
        setPubInfoImg('')
      }
      // setManageOrder(response.data);
      // get_myprofile()
      return response;
    }
    catch (error) {
      console.log("get_pub_details error : ", error);
    }
  }

  const update_pub_details = async (args) => {
    try {

      const response = await axios.post(Config.API_URL + Config.UPDATE_PUBLISHER_PROFILE, args,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + authData
          },
        })
      // console.log(" update_pub_details resp : ", response.data);
      // setManageOrder(response.data);
      // get_myprofile()
      return response;
    }
    catch (error) {
      console.log("update_pub_details error : ", error);
    }
  }



  const get_all_countries = async () => {
    try {

      const response = await axios.get(Config.API_URL + Config.GET_ALL_COUNTRIES,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      console.log(" get_all_countries resp : ", response.data);
      // setManageOrder(response.data);
      // get_myprofile()
      return response;
    }
    catch (error) {
      console.log("get_all_countries error : ", error);
    }
  }

  const get_state_by_id = async (st_id) => {
    try {

      const response = await axios.get(Config.API_URL + Config.GET_STATE_BY_ID + st_id,
        {
          headers: {
            // 'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      // console.log(" get_state_by_id resp : ", response.data);
      // setManageOrder(response.data);
      // get_myprofile()
      return response;
    }
    catch (error) {
      console.log("get_state_by_id error : ", error);
    }

  }


  const get_states_by_country = async (c_id) => {

    try {
      // console.log("country_id in state by country", c_id)
      const response = await axios.get(Config.API_URL + Config.GET_STATES_BY_COUNTRY + c_id,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })

      console.log(" get_states_by_country resp : ", response.data);
      // setManageOrder(response.data);
      // get_myprofile()
      return response;
    }
    catch (error) {
      console.log("get_states_by_country error : ", error);
    }
  }



  const publisher_admin_password_change = async (args) => {
    try {
      const response = await axios.post(Config.API_URL + Config.CHANGE_PUBLISHER_PASSWORD, args,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      // console.log(" Pasword_change_resp : ", response.data);
      // setManageOrder(response.data);
      return response;
    }
    catch (error) {
      console.log("Pasword_change_resp error : ", error);
    }
  }

  const get_book_details = async (book_id, token) => {
    // console.log('my_token',token)
    // console.log('book_id_det',book_id)
    try {

      const response = await axios.get(Config.API_URL + "book/" + book_id,

        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },

        })

      console.log("Book_details_resp : ", response);

      return response.data.output

    }
    catch (error) {
      console.log("Book_details_error : ", error)
    }
  }

  const approveBook = async (book_id) => {
    try {
      const response = await axios.post(Config.API_URL + Config.APPROVE_BOOK + book_id, {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        }
      );
      // console.log("Approve_book_resp : ", response);
      // if(response.data.statuscode === 0){
      //   getAllBookList();
      // }
      getAllBookList();
      return response.data.message;
    }
    catch (error) {
      console.log("Approve_book_error : ", error)
    }
  }

  const rejectBook = async (book_id, rejectionReason) => {
    try {
      const response = await axios.post(Config.API_URL + Config.REJECT_BOOK + book_id, { rejectionreason: rejectionReason },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        }
      );
      // console.log("REJECT_book_resp : ", response);
      // if(response.data.statuscode === 0){
      getAllBookList();
      // }
      return response.data.message;
    }
    catch (error) {
      console.log("REJECT_BOOK_error : ", error)
    }
  }

  const deletebook = async (book_id) => {
    try {
      const response = await axios.post(Config.API_URL + Config.DELETE_BOOK + book_id, {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        }
      );
      // console.log("REJECT_book_resp : ", response);
      // if(response.data.statuscode === 0){
      getAllBookList();
      // }
      return response;
    }
    catch (error) {
      console.log("DELETE_BOOK_error : ", error)
    }
  }

  const restorebook = async (book_id) => {
    try {
      const response = await axios.post(Config.API_URL + Config.RESTORE_BOOK + book_id, {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        }
      );
      // console.log("REJECT_book_resp : ", response);
      // if(response.data.statuscode === 0){
      getAllBookList();
      // }
      return response;
    }
    catch (error) {
      console.log("RESTORE_BOOK_error : ", error)
    }
  }

  // Coupons section for publisher
  const createCoupon = async (args) => {
    try {
      const response = await axios.post(Config.API_URL + Config.ADD_COUPON, args,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      // console.log("Create_Coupon_resp : ", response.data);
      // setManageOrder(response.data);
      getAllCoupons();
      return response;
    }
    catch (error) {
      console.log("Create_Coupon_resp error : ", error);
    }
  }

  const updateCoupon = async (id, args) => {
    try {
      const response = await axios.post(Config.API_URL + Config.EDIT_COUPON + id, args,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      // console.log("Edit_Coupon_resp : ", response.data);
      // setManageOrder(response.data);
      getAllCoupons();
      return response;
    }
    catch (error) {
      console.log("Edit_Coupon_resp error : ", error);
    }
  }

  const getAllCoupons = async () => {
    try {
      const response = await axios.post(Config.API_URL + Config.GET_ALL_COUPON, {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },

        })

      console.log("Get_all_coupons_resp : ", response);
      setAllCoupons(response.data.output);
      return response.data.output

    }
    catch (error) {
      console.log("Get_all_coupons_error : ", error)
    }
  }

  const getACoupon = async (id) => {
    try {
      const response = await axios.post(Config.API_URL + Config.GET_COUPON_BY_ID + id, {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })

      console.log("Get_a_coupon_resp : ", response);
      return response.data.output

    }
    catch (error) {
      console.log("Get_a_coupon_error : ", error)
    }
  }

  const deleteCoupon = async (id) => {
    try {
      const response = await axios.post(Config.API_URL + Config.DEL_COUPON + id, {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      // console.log("Del_Coupon_resp : ", response.data);
      // setManageOrder(response.data);
      getAllCoupons();
      return response;
    }
    catch (error) {
      console.log("Del_Coupon_resp error : ", error);
    }
  }

  const restoreCoupon = async (id) => {
    try {
      const response = await axios.post(Config.API_URL + Config.RESTORE_COUPON + id, {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      // console.log("Restore_Coupon_resp : ", response.data);
      // setManageOrder(response.data);
      getAllCoupons();
      return response;
    }
    catch (error) {
      console.log("Restore_Coupon_resp error : ", error);
    }
  }

  // Dashboard
  const get_dashboard = async () => {
    console.log("token 1029 : ", authData);
    try {
      const response = await axios.get(Config.API_URL + "dashboard",
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      console.log("Dashboard_resp : ", response);
      setSSadminDashboard(response.data.output);
      return response.data.output;
    }
    catch (error) {
      console.log("Dashboard_error : ", error)
    }
  }

  const get_admin_monthlysales = async (args) => {
    console.log("ARGS FRM CONTEXT", args)
    try {
      const response = await axios.post(Config.API_URL + "dashboard/monthly", args,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      console.log("Dashboard_resp : ", response);
      let sortedArray = response.data.output.monthlySale.sort((a, b) => a.index - b.index);
      setSalesVal(sortedArray)

      let monthlySeriesOne = { name: '', data: [], type: 'bar', smooth: true }; // previous
      let monthlySeriesTwo = { name: '', data: [], type: 'bar', smooth: true }; // current
      for (let i = 0; i < sortedArray.length; i++) {
        monthlySeriesOne.name = sortedArray[i].previousseries;
        monthlySeriesOne.data.push(sortedArray[i].previous);
        monthlySeriesTwo.name = sortedArray[i].currentseries;
        monthlySeriesTwo.data.push(sortedArray[i].current);
      }
      console.log("MONTHLY SERIES", monthlySeriesTwo)
      setMonthlyCurrSale(monthlySeriesTwo);
      setMonthlyPrevSale(monthlySeriesOne);
      //   let diamVal=['name'];
      //   let points=[];
      //   let keys=Object.keys(response.data.output.monthlySale[0]);
      //   keys.forEach(element=>{
      //     if (element!='index' && element!='name'){
      //       points.push(element);
      //     }
      //   });
      //   points.sort(function(a, b){return new Date('01-'+a) - new Date('01-'+b)});
      //   diamVal=[...diamVal,...points];
      //   setlegendVal(points)
      //   setDimensionsVal(diamVal)
      //   console.log("DIMENSION VAL",diamVal)
      // console.log("SALES VAL",response.data.output.monthlySale)
      // console.log("LEGEND VAL",points)
      return response.data.output;
    }
    catch (error) {
      setSalesVal([])
      setMonthlyCurrSale({})
      setMonthlyPrevSale({})
      console.log("Dashboard_error : ", error)
    }

  }

  // end of dashboard

  const get_customer_invoices = async (args) => {
    try {
      console.log('auth data= ', args)
      const response = await axios.post(Config.API_URL + Config.GET_ALL_CUSTOMER_INVOICES, args,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      console.log("Customer Invoice_resp: ", response);
      return response.data;
    }
    catch (error) {
      console.log("Customer Invoice_error : ", error)
    }
  }

  const get_publisher_invoices = async (args) => {
    try {

      const response = await axios.post(Config.API_URL + Config.GET_ALL_PUBLISHER_INVOICES, args,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      console.log("Publisher Invoice_resp: ", response);
      return response.data;
    }
    catch (error) {
      console.log("Publisher Invoice_error : ", error)
    }
  }

  const get_single_publisher_invoice = async (args) => {
    try {

      const response = await axios.post(Config.API_URL + Config.GET_PUBLISHER_INVOICE, args,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      console.log("Publisher Invoice_resp: ", response);
      return response.data;
    }
    catch (error) {
      console.log("Publisher Invoice_error : ", error)
    }
  }

  //Distributor Management

  const addDistributor = async (formData) => {
    // console.log("currentpageno", Config.API_URL + Config.BOOK_LIST_API + "?currentPage=" + 1 + "&recordPerPage=" + 5)

    try {
      const response = await axios.post(Config.API_URL + Config.ADD_Distributor, formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      // }
      getAllDistributor();
      console.log("Add distributor Response : ", response);
      return response;

    }

    catch (error) {
      console.log("Add distributor Response Error : ", error)
    }
  }

  const getAllDistributor = async () => {
    try {
      const response = await axios.get(Config.API_URL + Config.GET_ALL_Distributor,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      console.log("GET ALL distributor address : ", response);
      setDistributorList(response.data.output)

      return response;
    }
    catch (error) {
      console.log("get_distributor_error : ", error);
    }
  }

  // const getDistributorById = async (id) => {
  //   try {
  //     const response = await axios.get(Config.API_URL + Config.GET_ALL_SHIPPING_ADDRESS + "/" + id,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': 'Bearer ' + authData
  //         },
  //       })
  //     console.log("GET SHIPPING ADDRESS BY ID: ", response);
  //     return response;
  //   }
  //   catch (error) {
  //     console.log("Get_shipping_by_id_error : ", error);
  //   }
  // }

  // const editDistributor = async (args, id) => {
  //   console.log("Args in edit distributor context :", args);
  //   console.log("Id in edit distributor context:", id);
  //   try {
  //     const response = await axios.post(Config.API_URL + Config.EDIT_DISTRIBUTOR_ADDRESS + "/" + id, args,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': 'Bearer ' + authData
  //         },
  //       })
  //       // getAllDistributor();
  //     console.log("EDIT distributor RESPONSE : ", response);
  //     return response;
  //   }
  //   catch (error) {
  //     console.log("EDIT_distributor_Error : ", error)
  //   }
  // }

  const restore_distributor = async (id) => {
    try {
      const response = await axios.get(Config.API_URL + Config.RESTORE_DISTRIBUTOR + id,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      // console.log(" RESTORE PUBLISHER USERS : ", response.data);
      // setDistributorList(response);
      return response;
    }
    catch (error) {
      console.log("RESTORE distributor error : ", error);
    }
  }

  const delete_distributor = async (id) => {
    console.log(" DELETE token USERS : ", authData);
    try {
      const response = await axios.get(Config.API_URL + Config.DELETE_DISTRIBUTOR + id,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      // console.log(" DELETE PUBLISHER USERS : ", response.data);
      // setDistributorList(response);
      return response;
    }
    catch (error) {
      console.log("DELETE distributor error : ", error);
    }
  }

  // Manage Shipper

  const getAllShipper = async () => {
    try {
      const response = await axios.get(Config.API_URL + Config.GET_ALL_SHIPPER,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      console.log("GET ALL shipper info : ", response);
      setShipperInfoList(response.data.output)

      return response;
    }
    catch (error) {
      console.log("get_shipper_info_error : ", error);
    }
  }

  const addShipper = async (formData) => {
    // console.log("currentpageno", Config.API_URL + Config.BOOK_LIST_API + "?currentPage=" + 1 + "&recordPerPage=" + 5)

    try {
      const response = await axios.post(Config.API_URL + Config.ADD_SHIPPER, formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      // }
      getAllShipper();
      console.log("Add shipper Response : ", response);
      return response;

    }

    catch (error) {
      console.log("Add shipper Response Error : ", error)
    }
  }

  const getShipperById = async (id) => {
    try {
      const response = await axios.get(Config.API_URL + Config.GET_ALL_SHIPPER + "/" + id,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      console.log("GET shipper BY ID: ", response);
      return response;
    }
    catch (error) {
      console.log("Get_shipper_by_id_error : ", error);
    }
  }

  const editShipper = async (id, args) => {
    // console.log("Args :", args);
    // console.log("Id :", id);
    try {
      const response = await axios.post(Config.API_URL + Config.EDIT_SHIPPER + "/" + id, args,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
        getAllShipper();
      console.log("EDIT shipper RESPONSE : ", response);
      return response;
    }
    catch (error) {
      console.log("EDIT_shipper_Error : ", error)
    }
  }

  const restore_shipper = async (id) => {
    try {
      const response = await axios.post(Config.API_URL + Config.RESTORE_SHIPPER + id, {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      // console.log(" RESTORE PUBLISHER USERS : ", response.data);
      getAllShipper()
      return response;
    }
    catch (error) {
      console.log("RESTORE shipper error : ", error);
    }
  }

  const delete_shipper = async (id) => {
    console.log(" DELETE token in shipper : ", authData);
    try {
      const response = await axios.post(Config.API_URL + Config.DELETE_SHIPPER + id, {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
      // console.log(" DELETE PUBLISHER USERS : ", response.data);
      getAllShipper()
      return response;
    }
    catch (error) {
      console.log("DELETE shipper error : ", error);
    }
  }
  const get_single_order = async (id) => {
    try {
      const response = await axios.get(Config.API_URL + Config.MANAGE_ORDER_API+ '/' + id,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
        setOrderInfo(response.data.output)
      return response.data;
    }
    catch (error) {
      console.log("GET SINGLE ORDER ERROR : ", error);
    }
  }
  const changeOrderStatus = async (args) => {
    try {
      const response = await axios.post(Config.API_URL + Config.MANAGE_ORDER_API+ Config.CHANGE_ORDER_STATUS,args,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authData
          },
        })
        await get_single_order(args.id)
      return response.data;
    }
    catch (error) {
      console.log("GET SINGLE ORDER ERROR : ", error);
    }
  }



  return (
    <AdminContext.Provider
      value={{
        getAllCategory,
        categoryList,
        getCategoryById,
        addCategory,
        editCategory,
        delCategory,
        customerList,
        deleteUserCustomer,
        getAllPublishers,
        getBookById,
        getAllBookList,
        getAllCustomers_admin,
        allBookList,
        getManageOrder,
        manageOrder,
        getOrderbyPub,
        getPublisherDetails,
        addPublisher_admin,
        get_publisher_users,
        delete_pub_user,
        restore_pub_user,
        get_myprofile,
        update_myprofile_cnagepersonalinfo,
        update_myprofile_cnagecontactinfo,
        update_pub_details,
        get_states_by_country,
        get_state_by_id,
        get_all_countries,
        get_pub_details,
        updatePublisher_admin,
        deletePublisher_admin,
        restore_publisher,
        restore_customer,
        restore_category,
        add_publisher_user,
        publisher_admin_password_change,
        pubInfoImg,
        uploadBooksInBulk_admin,
        languages,
        currencies,
        uploadSingleBook,
        updateSingleBook,
        allPublisher,
        get_book_details,
        approveBook,
        rejectBook,
        deletebook,
        restorebook,
        createCoupon,
        allCoupons,
        getACoupon,
        updateCoupon,
        deleteCoupon,
        restoreCoupon,
        get_dashboard,
        ssadminDashboard,
        get_admin_monthlysales,
        get_customer_invoices,
        get_publisher_invoices,
        get_single_publisher_invoice,
        salesVal,
        dimensionsVal,
        legendVal,
        currMonthlySale,
        prevMonthlySale,
        addDistributor,
        getAllDistributor,
        distributorList,
        restore_distributor,
        delete_distributor,
        getAllShipper,
        shipperInfoList,
        addShipper,
        getShipperById,
        editShipper,
        restore_shipper,
        delete_shipper,
        get_single_order,
        orderInfo,
        changeOrderStatus

      }}
    >
      {children}
    </AdminContext.Provider>
  )


}

function AdminProfile() {
  const context = useContext(AdminContext);
  return context
}


export { AdminProvider, AdminProfile, AdminContext }  