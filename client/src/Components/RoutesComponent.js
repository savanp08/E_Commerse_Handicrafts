import react from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route 
} from 'react-router-dom';
import ConsumerProfile from '../Pages/ConsumerProfile/ConsumerProfile.js';
import Home from '../Pages/Home/Home.js';
import Login from '../Pages/Login/Login.js';
import Query from '../Pages/Query/Query.js';
import SellerProfile from '../Pages/SellerProfile/SellerProfile.js';
import SignUp from '../Pages/Login/SignUp.js';
import Description from '../Pages/Description/Description.js';
import Admin from '../Pages/Admin/Admin.jsx';
import Cart from '../Pages/Cart/Cart.js';
import Payment from '../Pages/Billing/Payment.js';
import Acknoledgemnt from '../Pages/Acknoledgment/Ackncoledgement.js';
const RoutesComponent =()=>{
    return(
        <Routes>
            
            <Route exact path ="/Login" element={<Login/>}/>
            <Route exact path="/SignUp" element={ <SignUp/> }/>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/Query/:Query" element={ <Query/> }/>
            <Route exact path="/Cart" element={ <Cart/> } />
            <Route exact path="/Description/:ProductId" element={ <Description/> } />
            <Route exact path="/User" element={ <Admin/> } />
            <Route exact path="/Payment/:Total" element={ <Payment/> } />
             <Route exact path="/Acknoledgemnt" element = { <Acknoledgemnt/>  }  />
             <Route exact path="/Shop" element={<Home/>} />

            <Route exact path="/User/:UserName" element={ <Admin/> } />
            <Route exact path="/Shop/:UserName" element={<Home/>} />
            <Route exact path="/Query/:Query/:UserName" element={<Query/>} />
            <Route exact path="/Description/:ProductId/:UserName" element={ <Description/> } />
            <Route exact path="/Cart/:UserName" element={ <Cart/> } />
            <Route exact path="/Payment/:UserName/:Total" element={ <Payment/> } />
        </Routes>
    )
}

export default RoutesComponent;