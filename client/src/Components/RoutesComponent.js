import react from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route 
} from 'react-router-dom';

import Home from '../Pages/Home/Home.js';
import Login from '../Pages/Login/Login.js';
import Query from '../Pages/Query/Query.js';

import SignUp from '../Pages/Login/SignUp.js';
import Description from '../Pages/Description/Description.js';
import Admin from '../Pages/Admin/Admin.jsx';
import Cart from '../Pages/Cart/Cart.js';
import Payment from '../Pages/Billing/Payment.js';
import Acknoledgemnt from '../Pages/Acknoledgment/Ackncoledgement.js';
import AdminLogin from '../Pages/Login/AdminLogin.js';
import User from '../Pages/User/User.jsx';
import RestaurantPage from '../Pages/RestaurantPage/RestaurantPage.jsx';
import { Checkbox } from '@mui/material';
import Checkout from '../Pages/Checkout/Checkout.js';
import ResetPassword from '../Pages/ResetPassword/ResetPassword.js';
const RoutesComponent =()=>{
    return(
        <Routes>
            
            <Route exact path ="/Login" element={<Login/>}/>
            <Route exact path = "/Admin/Login" element={<AdminLogin/>} />
            <Route exact path="/SignUp" element={ <SignUp/> }/>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/Search/Query/:SearchQuery" element={ <Query/> }/>
            <Route exact path="/Cart" element={ <Cart/> } />
            <Route exact path="/Description/:id/:restId" element={ <Description/> } />
            <Route exact path="/Admin/Account" element={ <Admin/> } />
            <Route exact path = "Account" element={<User/>} />
            <Route exact path="/Payment/:Total" element={ <Payment/> } />
             <Route exact path="/Acknoledgemnt/:orderType" element = { <Acknoledgemnt/>  }  />
             <Route exact path="/Shop" element={<Home/>} />
             <Route exact path="/Payment" element={ <Payment/> } />
             <Route exact path="/Restaurant/:id" element={<RestaurantPage/>}/>
             <Route exact path="/Checkout/:id" element={<Checkout/>}/>
             <Route exact path="/Query/:SearchQuery" element={ <Query/> }/>
             {/* <Route exact path= "/user/verifyAccount" element = { <VerifyAccount/> } /> */}
                <Route exact path= "/user/ResetPassword" element={ <ResetPassword />} />
        </Routes>
    )
}

export default RoutesComponent;