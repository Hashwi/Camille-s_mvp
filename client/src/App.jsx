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
        <aside className='viewButtons'>
          <button className="oldUserButton" style={{backgroundColor: isNew? "#8DB580":""}} onClick={() => handleChangeView(true)}>Registered User</button>        
          <button className="newUserButton" style={{backgroundColor: isNew? "":"#8DB580"}} onClick={() => handleChangeView(false)}>New User</button>
        </aside>
        <h1>Ingredients Finder</h1>
        {isNew? (
        <ExistingUserView />
        ) : (
        <NewUserView />
        )}

      </div>
  );
}

export default App
