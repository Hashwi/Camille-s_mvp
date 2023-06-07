import { createContext, useContext, useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import './App.css'; 
import Login from './components/Login';


import ExistingUserView from './components/ExistingUserView';
import NewUserView from './components/NewUserView';
import { authProvider } from "./auth";
import axios from 'axios';

export const apiUrl = 'http://localhost:4000';

axios.interceptors.request.use(
  config => {
    const { origin } = new URL(config.url);
    const allowedOrigins = [apiUrl];
    const token = localStorage.getItem('token');
    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


// Auth related
let AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  let [user, setUser] = useState(null);
  let [error, setError] = useState(null);
  let signin = (userData, successCallback) => {
    setError(null)
    return authProvider.signin(userData,  {
      setUser,
      setError,
      successCallback
    });
  };

  let signout = (callback) => {
    return authProvider.signout(() => {
      setUser(null);
      callback();
    });
  };
  let value = { user, error, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();
  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

//Auth related ends

function App() {
  
// function AuthStatus() {
//   let auth = useAuth();
//   let navigate = useNavigate();

//   if (!auth.user) {
//     return <p>You are not logged in.</p>;
//   }

//   return (
//     <p>
//       Welcome {auth.user}!{" "}
//       <button
//         onClick={() => {
//           auth.signout(() => navigate("/"));
//         }}
//       >
//         Sign out
//       </button>
//     </p>
//   );
// }

  
  return (
    <AuthProvider>
    <div className="appContainer">
      <aside className='viewButtons'>
      <Link to="/login">
        <button type="button"
        className="oldUserButton">
          Login
      </button>
      </Link>
      <Link to="/newuser">
        <button type="button"
        className="newUserButton">
         Find Ingredients
      </button>
      </Link>
      </aside>
      <h1>Ingredients Finder</h1>

    </div>
     <div>
     <Routes>
       <Route path="/login" element={<Login/>} />
       <Route path="/newuser" element={<RequireAuth><NewUserView /> </RequireAuth>} /> 
     </Routes>
   </div>
   </AuthProvider>
  );
}

export default App;
