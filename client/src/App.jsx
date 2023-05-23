import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import ExistingUserView from './components/ExistingUserView';
import NewUserView from './components/NewUserView';

function App() {
  const [isNew, setIsNew] = useState(true);

  const handleChangeView = (isNew) => {
    setIsNew(isNew);
  };

  return (
      <div className="appContainer">
        <h1>Ingredients Finder</h1>
        <aside>
          <button className="adminButton" onClick={() => handleChangeView(true)}>Registered User</button>        
          <button className="userButton" onClick={() => handleChangeView(false)}>New User</button>
        </aside>
        {isNew? (
        <ExistingUserView />
        ) : (
        <NewUserView />
        )}

      </div>
  );
}

export default App
