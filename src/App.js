import './Css/style.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Navigation from './AppRouter';
import { UserProvider } from './Context/Usercontext';
import { AuthProvider } from './Context/Authcontext';


const App=()=> {
  return (
    <AuthProvider>
      <UserProvider>
          <Navigation/> 
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
