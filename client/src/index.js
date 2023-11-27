import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './Store/GlobalStore/Store';
var i=0;
var images = [
  "https://wallpapercave.com/wp/sasJOik.jpg",
  "https://png.pngtree.com/thumb_back/fh260/back_our/20190621/ourmid/pngtree-chinese-food-pasta-simple-white-banner-image_179324.jpg",
  "https://png.pngtree.com/thumb_back/fh260/back_our/20190620/ourmid/pngtree-brown-simple-noodle-pasta-western-food-e-commerce-banner-image_174269.jpg",
  "https://www.shutterstock.com/image-photo/fast-food-dish-top-view-260nw-659655670.jpg",
];
window.onload = ()=>{
  setInterval(changeBGImage, 5000);
  function changeBGImage(){
    var x = document.getElementById("App-Wrapper");
    i++;
    i=i%4;
    x.style.backgroundImage = "url('"+images[i]+"')";
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

