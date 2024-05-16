// import logo from './logo.svg';
// import './App.css';
// import './Css/simplebar.css';
// import './Css/examples.css';
import './Css/style.css';
// import 'react-notifications/lib/notifications.css';
import Navigation from './AppRouter';
// import { UserProvider } from './Context/UserContext';
import { AuthProvider } from './Context/AuthContext';
import { AdminProvider } from './Context/AdminContext';
// import { NotificationContainer } from 'react-notifications';


const DefaultScreen=()=> {
  return (
    <AuthProvider>
      <AdminProvider>
        <Navigation/>
      </AdminProvider>
    </AuthProvider>
  );
}

export default DefaultScreen;