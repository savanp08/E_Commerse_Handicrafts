
import './App.css';
import RoutesComponent from './Components/RoutesComponent.js';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar, { RespNavBar } from './Components/NavBar/NavBar.js';
import FOoterStand from './Components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import AuthFunctions, { AdminAuthFunctions } from './Handlers/Auth.js';
import { addUser } from './Store/Slices/UserSlice/UserSlice.js';
import { addAdmin } from './Store/Slices/UserSlice/adminSlice.js';
function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    console.log("Checking if user is logged in");
    async function fetchUser(){
       const res = await AuthFunctions();
       if(res.message==="success" && res.user ){
        if( res.user.userId)
        dispatch(addUser(res.user));
      else 
      dispatch(addAdmin(res.user));
       }
       const adminRes = await AdminAuthFunctions();
       console.log("XXXXXXXXXXX =>",adminRes);
       if(adminRes.message==="success" && adminRes.user){
        if( adminRes.user.userId)
        dispatch(addUser(adminRes.user));
      else 
      dispatch(addAdmin(adminRes.user));
       }
       
    }
    fetchUser();
  },[])
  

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
