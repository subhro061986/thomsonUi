import React, { useEffect } from 'react'
// import './App.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
//import { Routes } from 'react-router';
import GalleryScreen from './Pages/GalleryScreen';
import LoginScreen from './Pages/LoginScreen';
import ManageOrderScreen from './Pages/Admin/ManageOrderScreen';
import ManageUserScreen from './Pages/Admin/ManageUsersScreen';
import ManagePublishersScreen from './Pages/Admin/ManagePublishersScreen';
import ManageCategoriesScreen from './Pages/Admin/ManageCategoriesScreen';
import UploadBooks from './Pages/Admin/UploadBooks';



import { useAuth } from './Context/AuthContext';
import BookList from './Pages/Admin/BookList';
import BookApproval from './Pages/Admin/BookApproval';

import ApproveOrRejectBook from './Pages/Admin/ApproveOrRejectBook';
import ViewOrderDetails from './Pages/Admin/ViewOrderDetails';
import ChangePassword from './Pages/Admin/ChangePassword';
import CustomerSales from './Pages/Admin/CustomerSales';
import ManageDistributorScreen from './Pages/Admin/ManageDistributorScreen';
import ManageShipper from './Pages/Admin/ManageShipper';
import ManageDistributorOrderScreen from './Pages/Admin/ManageDistributorOrderScreen';
import ViewDistributorOrderDetails from './Pages/Admin/ViewDistributorOrderDetails';






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
             <Route exact path="/gallery" Component={GalleryScreen}/>
             <Route exact path='/manageorder' Component={ManageOrderScreen}/>
             <Route exact path='/manage-distributor-order' Component={ManageDistributorOrderScreen}/>
             <Route exact path='/manageusers' Component={ManageUserScreen}/>
             <Route exact path='/managepublishers' Component={ManagePublishersScreen}/>
             <Route exact path='/managecategories' Component={ManageCategoriesScreen}/>
             <Route exact path='/manageshippers' Component={ManageShipper}/>
             <Route exact path='/managedistributor' Component={ManageDistributorScreen}/>
             <Route exact path='/uploadbooks' Component={UploadBooks}/>
             <Route exact path='/booklist' Component={BookList}/>
             <Route exact path='/booklisting' Component={BookApproval}/>
             <Route exact path='/customersales' Component={CustomerSales}/>


             <Route exact path='/bookdetails' Component={ApproveOrRejectBook}/>
             <Route exact path='/changepassword' Component={ChangePassword}/>


             
             <Route exact path='/vieworderdetails' Component={ViewOrderDetails}/>
             <Route exact path='/view-distributor-orderdetails' Component={ViewDistributorOrderDetails}/>
             
         </Routes>
     
  )
  
}


export default Navigation;
