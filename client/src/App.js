
import './App.css';
import RoutesComponent from './Components/RoutesComponent.js';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar, { RespNavBar } from './Components/NavBar/NavBar.js';
import FOoterStand from './Components/Footer/Footer';

function App() {

  const originalSetItem = localStorage.setItem;

localStorage.setItem = function(key, value) {
  const event = new Event('itemInserted');

  event.value = value; // Optional..
  event.key = key; // Optional..

  document.dispatchEvent(event);

  originalSetItem.apply(this, arguments);
}; 
  return (
    <div className="App-Wrapper">
       <Router>
      <div className='NavDiv-InApp'>
     <NavBar />
     <RespNavBar />
     </div>
     <div className='Content-InApp'>
     
     <RoutesComponent/>
     <FOoterStand/>
     </div>
    
     </Router>
    
    </div>
  );
}

export default App;
