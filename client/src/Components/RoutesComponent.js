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

const RoutesComponent =()=>{
    return(
        <Routes>
            
            <Route exact path ="/Login" element={<Login/>}/>
            <Route exact path="/SignUp" element={ <SignUp/> }/>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/Query/:Query" element={ <Query/> }/>
            <Route exact path="/User/:UserName" element={<ConsumerProfile/> } />
            <Route exact path="/Seller/:UserName" element={ <SellerProfile/> } />
            <Route exact path="/Description/:ProductId" element={ <Description/> } />

        </Routes>
    )
}

export default RoutesComponent;