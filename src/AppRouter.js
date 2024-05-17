// import './Css.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';

import React, {
useState,
useEffect
} from "react";
import HomePage from './Pages/HomePage';
import WishList from './Pages/WishList';
import CategoryDetailsPage from './Pages/CategoryDetailsPage';
import ProductDetailsPage from './Pages/ProductDetailsPage';
import LoginPage from './Pages/LoginPage';
import Registration from './Pages/Registration';
import ConfirmOrder from './Pages/ConfirmOrder';
import CartPage from './Pages/CartPage';
import OrderPage from './Pages/OrderPage';
import MyBookShelf from './Pages/MyBookShelf';
import EpubreaderScreen from './Pages/EpubreaderScreen';
import PdfreaderScreen from './Pages/PdfreaderScreen';
import { useAuth } from './Context/Authcontext';
import MyProfile from './Pages/MyProfile';
import ChangePassword from './Pages/ChangePassword';
import BillingAddressPage from './Pages/BillingAddressPage';
import OrderConfirmation from './Pages/OrderConfirmationPage';
import SouthsoreScreen from './Pages/SouthsoreScreen';
import LoginPageSouthsore from './Pages/LoginPageSouthsore';
import PrivacyPolicyScreen from './Pages/PrivacyPolicyScreen';
import FaqScreen from './Pages/FaqScreen';
import FaqPubScreen from './Pages/FaqPubScreen';
import TermsScreen from './Pages/TermsScreen';
import CopyrightScreen from './Pages/CopyrightScreen';
import DisclaimerScreen from './Pages/DisclaimerScreen';
import RegistrationSouthshore from './Pages/RegistrationSouthshore';
import PrivacyPolicyPub from './Pages/PrivacyPolicyPub';
import LoginScreen from './admin/Pages/LoginScreen';
import DefaultScreen from './admin/DefaultScreen';
import GalleryScreen from './admin/Pages/GalleryScreen';







const AfterLogin=()=> {

  return (
    <Router>
        <Routes>
            <Route exact path="/" Component={SouthsoreScreen}/>
            <Route exact path="/home" Component={HomePage}/>
            <Route exact path="/wishlist" Component={WishList}/>
            <Route exact path="/category" Component={CategoryDetailsPage}/>
            <Route exact path="/productdetails" Component={ProductDetailsPage}/>
            <Route exact path="/login" Component={LoginPage}/>
            <Route exact path="/loginsouthsore" Component={LoginPageSouthsore}/>
            <Route exact path="/registration" Component={Registration}/>
            <Route exact path="/confirmorder" Component={ConfirmOrder}/>
            <Route exact path="/cartpage" Component={CartPage}/>
            <Route exact path="/orderpage" Component={OrderPage}/>
            <Route exact path="/mybookshelf" Component={MyBookShelf}/>
            <Route exact path="/epubreader" Component={EpubreaderScreen}/>
            <Route exact path="/pdfreader" Component={PdfreaderScreen}/>
            <Route exact path="/myprofile" Component={MyProfile}/>
            <Route exact path="/changePassword" Component={ChangePassword}/>
            <Route exact path="/billingaddress" Component={BillingAddressPage}/>
            <Route exact path="/orderconfirmation" Component={OrderConfirmation}/>
            <Route exact path="/privacypolicy" Component={PrivacyPolicyScreen}/>
            <Route exact path="/privacypolicypub" Component={PrivacyPolicyPub}/>
            <Route exact path="/faqs" Component={FaqScreen}/>
            <Route exact path="/faqpub" Component={FaqPubScreen}/>
            <Route exact path="/terms" Component={TermsScreen}/>
            <Route exact path="/copyright" Component={CopyrightScreen}/>
            <Route exact path="/disclaimer" Component={DisclaimerScreen}/>
            <Route exact path="/admin/*" Component={DefaultScreen}/>

        </Routes>
    </Router>
  );
}


const BeforeLogin=()=> {

  return (
    <Router>
        <Routes>
            <Route exact path="/" Component={SouthsoreScreen}/>
            <Route exact path="/home" Component={HomePage}/>
            <Route exact path="/category" Component={CategoryDetailsPage}/>
            <Route exact path="/productdetails" Component={ProductDetailsPage}/>
            <Route exact path="/login" Component={LoginPage}/>
            <Route exact path="/loginsouthsore" Component={LoginPageSouthsore}/>
            <Route exact path="/registration" Component={Registration}/>
            <Route exact path="/registrationsouthshore" Component={RegistrationSouthshore}/>
            <Route exact path="/confirmorder" Component={ConfirmOrder}/>
            <Route exact path="/cartpage" Component={CartPage}/>
            <Route exact path="/privacypolicy" Component={PrivacyPolicyScreen}/>
            <Route exact path="/privacypolicypub" Component={PrivacyPolicyPub}/>
            <Route exact path="/faqs" Component={FaqScreen}/>
            <Route exact path="/faqpub" Component={FaqPubScreen}/>
            <Route exact path="/terms" Component={TermsScreen}/>
            <Route exact path="/copyright" Component={CopyrightScreen}/>
            <Route exact path="/disclaimer" Component={DisclaimerScreen}/>
            <Route exact path="/admin/*" Component={DefaultScreen} /> 

            {/* Later redirect it as required if any of the above routes don't match*/}
            {/* <Route path='*' Component={HomePage}/> */}
            
        </Routes>
    </Router>
  );
}




const Navigation=()=> {
  const {authData,isexpired} = useAuth()
  useEffect(() => {
    
  }, [authData])

  if(authData==='' || authData=== null || authData===undefined && isexpired === true )
  {
      return <BeforeLogin/>
  }
  else{
      return <AfterLogin/>
  }
  
}




export default Navigation;
