import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import AdminView from './components/AdminView';
import UserView from './components/UserView';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleChangeView = (isAdmin) => {
    setIsAdmin(isAdmin);
  };

  return (
      <div className="appContainer">
        <h1>Ingredients Finder</h1>
        <aside>
          <button className="adminButton" onClick={() => handleChangeView(true)}>Admin</button>        
          <button className="userButton" onClick={() => handleChangeView(false)}>User</button>
        </aside>
        {isAdmin? (
        <AdminView />
        ) : (
        <UserView />
        )}

      </div>
  );
}

export default App
