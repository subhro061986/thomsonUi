import React, { useEffect } from 'react'
// import './App.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
//import { Routes } from 'react-router';
import DashboardScreen from './Pages/Admin/DashboardScreen';
import GalleryScreen from './Pages/GalleryScreen';
import LoginScreen from './Pages/LoginScreen';
import ManageOrderScreen from './Pages/Admin/ManageOrderScreen';
import ManageUserScreen from './Pages/Admin/ManageUsersScreen';
import ManagePublishersScreen from './Pages/Admin/ManagePublishersScreen';
import ManageCategoriesScreen from './Pages/Admin/ManageCategoriesScreen';
import UploadBooks from './Pages/Admin/UploadBooks';

import DashboardPub from './Pages/Publisher/DashboardPub';
import ManageOrderPub from './Pages/Publisher/ManageOrderPub';
import BookListPub from './Pages/Publisher/BookListPub';
import UploadBooksPub from './Pages/Publisher/UploadBooksPub';
import ManageContentPub from './Pages/Publisher/ManageContentPub';

import { useAuth } from './Context/AuthContext';
import BookList from './Pages/Admin/BookList';
import BookApproval from './Pages/Admin/BookApproval';
import RejectedBookList from './Pages/Admin/RejectedBookList';
import RejectedBookDetails from './Pages/Admin/RejectedBookDetails';

import ApproveOrRejectBook from './Pages/Admin/ApproveOrRejectBook';
import MyProfilePub from './Pages/Publisher/MyProfilePub';
import ChangePasswordPub from './Pages/Publisher/ChangePasswordPub';
import ManageUsersPub from './Pages/Publisher/ManageUsersPub';
import ViewOrderDetails from './Pages/Admin/ViewOrderDetails';
import FAQPub from './Pages/Publisher/FAQPub';
import ChangePassword from './Pages/Admin/ChangePassword';
import ManageCouponsScreenPub from './Pages/Publisher/ManageCouponsScreenPub';
import RejectedBookListPub from './Pages/Publisher/RejectedBookListPub';
import Invoice from './Pages/Publisher/Invoice';
import CustomerSales from './Pages/Admin/CustomerSales';
import PublisherSales from './Pages/Admin/PublisherSales';
import PublisherDashboard from './Pages/Publisher/PublisherDashboard';
import DashboardScreenNew from './Pages/Admin/DashboardScreenNew';
import BookDetailsPub from './Pages/Publisher/BookDetailsPub';
import ManageDistributorScreen from './Pages/Admin/ManageDistributorScreen';
import ManageShipper from './Pages/Admin/ManageShipper';


// const BeforeLogin=()=>{
//   return (
//     <Router basename="/admin">
//         <Routes>
//             <Route exact path="/" Component={LoginScreen}/>
//             <Route exact path="/login" Component={LoginScreen}/>
//             <Route path="*" Component={NotFoundScreen} />
//         </Routes>
//     </Router>
//   );
// }

// const AfterLogin=()=>{
//   return (
//     <Router basename="/admin">
//         <Routes>
//             <Route exact path="/" Component={DashboardScreen}/>
//             <Route exact path="/dashboard" Component={DashboardScreen}/>
//             <Route exact path="/gallery" Component={GalleryScreen}/>
//             <Route exact path="/portfolio" Component={PortfolioScreen}/>
//             <Route exact path="/contact" Component={ContactScreen}/>
//             <Route exact path="/blog" Component={BlogScreen}/>
//             <Route exact path="/product" Component={ProductScreen}/>
//             <Route exact path="/login" Component={LoginScreen}/>
//             <Route path="*" Component={NotFoundScreen} />
//         </Routes>
//     </Router>
//   );
// }

const Navigation=()=> {
  // const {authData} = useAuth()
  // useEffect(() => {
    
  // }, [authData])

  // if(authData==='' || authData=== null || authData===undefined)
  // {
  //     return <BeforeLogin/>
  // }
  // else{
  //     return <AfterLogin/>
  // }

  return (
    
         < Routes>
             <Route exact path="/" Component={LoginScreen}/>
             {/* <Route exact path="/dashboard" Component={DashboardScreen}/> */}
             {/* <Route exact path="/dashboard" Component={DashboardScreenNew}/> */}
             <Route exact path="/gallery" Component={GalleryScreen}/>
             <Route exact path='/manageorder' Component={ManageOrderScreen}/>
             <Route exact path='/manageusers' Component={ManageUserScreen}/>
             <Route exact path='/managepublishers' Component={ManagePublishersScreen}/>
             <Route exact path='/managecategories' Component={ManageCategoriesScreen}/>
             <Route exact path='/manageshippers' Component={ManageShipper}/>
             <Route exact path='/managedistributor' Component={ManageDistributorScreen}/>
             <Route exact path='/uploadbooks' Component={UploadBooks}/>
             <Route exact path='/booklist' Component={BookList}/>
             <Route exact path='/bookapprovals' Component={BookApproval}/>
             <Route exact path='/rejectedbooklist' Component={RejectedBookList}/>
             <Route exact path='/customersales' Component={CustomerSales}/>
             <Route exact path='/publishersales' Component={PublisherSales}/>


             <Route exact path='/approveorreject' Component={ApproveOrRejectBook}/>
             <Route exact path='/rejectedbookdetails' Component={RejectedBookDetails}/>
             <Route exact path='/changepassword' Component={ChangePassword}/>

             {/* <Route exact path='/dashboardpub' Component={DashboardPub}/> */}
             {/* <Route exact path='/pubdashboard' Component={PublisherDashboard}/> */}

             {/* <Route exact path='/manageorderpub' Component={ManageOrderPub}/> */}
             {/* <Route exact path='/booklistpub' Component={BookListPub}/> */}
             {/* <Route exact path='/uploadbookspub' Component={UploadBooksPub}/> */}
             {/* <Route exact path='/changepasswordpub' Component={ChangePasswordPub}/> */}
             {/* <Route exact path='/managecontentpub' Component={ManageContentPub}/> */}
             {/* <Route exact path='/myprofilepub' Component={MyProfilePub}/> */}
             {/* <Route exact path='/manageuserspub' Component={ManageUsersPub}/> */}
             <Route exact path='/vieworderdetails' Component={ViewOrderDetails}/>
             {/* <Route exact path='/faqspub' Component={FAQPub}/> */}
             {/* <Route exact path='/managecouponspub' Component={ManageCouponsScreenPub}/> */}
             {/* <Route exact path='/invoicepub' Component={Invoice}/> */}
             {/* <Route exact path='/rejectedbooklistpub' Component={RejectedBookListPub}/> */}
             {/* <Route exact path='/bookdetailspub' Component={BookDetailsPub}/> */}

             {/* <Route path="*" Component={NotFoundScreen} /> */}
         </Routes>
     
  )
  
}
// const Navigation=()=> {
//   const {authData} = useAuth()
  
//   useEffect(() => {
//   }, [authData])
//   return (
//     <Router>
//         <Routes>
//             <Route exact path="/" Component={LoginScreen}/>
//             <Route exact path="/dashboard" Component={DashboardScreen}/>
//             <Route exact path="/gallery" Component={GalleryScreen}/>
//             <Route exact path="/portfolio" Component={PortfolioScreen}/>
//             <Route exact path="/contact" Component={ContactScreen}/>
//             <Route exact path="/blog" Component={BlogScreen}/>
//             <Route exact path="/product" Component={ProductScreen}/>
//             <Route path="*" Component={NotFoundScreen} />
//         </Routes>
//     </Router>
//   );
// }

export default Navigation;
