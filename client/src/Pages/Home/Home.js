import React, {useState, useEffect } from "react";
import './Home.css';
import '../../Components/common.css';
import '../../Components/common.scss';
import { useNavigate, useParams }  from 'react-router-dom';
import axios from 'axios';
import FOoterStand from "../../Components/Footer/Footer";
import Carousel from 'react-bootstrap/Carousel';import ProductCard from "../../Components/ProductCard/ProductCard";
;



const Home =() =>{
    const history = useNavigate();
    const params= useParams();
    const UserName = params.UserName || "";
   const catagories =[ 
    {name:'Decor' , img:"https://i.pinimg.com/originals/53/82/df/5382df3f498ec0ed31ed8bef6f68fc52.jpg"  ,url:"/Query/Decor"},
    { name:"Painting", img:'https://m.media-amazon.com/images/I/81nh7yEGiHL._SX355_.jpg',url:"/Query/Painting" },
    {
        name:"Glass crafts",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF7d6K1XSvqF1OqhqPUZbZVazgIqUXd8gIKYzyY0hWmcd4LUbPXcERkqTidiiauEeYvdM&usqp=CAU"
        ,url:"/Query/Glass Crafts"
    },
    {
      name:'Jewelry',
      img:'https://i.pinimg.com/originals/36/e0/26/36e0265095be7af716ab31f847e65c7d.jpg'
      ,url:"/Query/Jewelry"
    },
    {
        name:'Clothes',
        img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_5gMkWHsL5fVrAZx2Ux9LTZpJw0ruHUJJWw&usqp=CAU'
        ,url:"/Query/Clothes"
      },
    {
        name:'Weveing',
        img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-9rIfRis0mjs-GU-vZd4W9eWP4tiyq6oD-Q8REvQi4_XBnCB71S36j0VrtrPck4fbAMs&usqp=CAU'
        ,url:"/Query/weveing"
    },
    {
        name:'Paper crafts',
        url:"/Query/Paper Crafts",
        img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFlUixthxSiEkiWzmB9FWso0-jI5ZC9M2hnQ&usqp=CAU'
    },
    {
        name:'Wood crafts',
        url:"/Query/Wood Crafts",
        img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHwhRyz1i6k5lk0IJMkWxWfudOwXoROAfT1w&usqp=CAU'
    },
    {
        name:'Metal crafts',
        url:"/Query/Metal Crafts",
        img:'https://3.bp.blogspot.com/-x39C5WIdpe8/VnigqzS9S8I/AAAAAAAABNA/wjfIJYFYOI0/s1600/pebarti.jpg'
    }
     ]

     const [offers ,setOffers] = useState([]);
     const [ mostPurchased,setMostPurchased ] = useState([]);
     const [AllProducts,setAllProducts] = useState([]);
     const [MostRecent, setMostRecent]= useState([]);

     useEffect(()=>{
            
        axios.get('/offers/some')
        .then(res=>{
            setOffers(res);
        })
        .catch(err=>{
            console.log("Error while fetching some offers");
        })
        
        axios.get('/Purchased')
        .then(res=>{
            setMostPurchased(res);
        })
      },[]);
         
      useEffect(()=>{
        const Port ="http://localhost:5000";
      axios.get(`${Port}/Products/get`)
      .then(res=>{
        console.log("Products fetched for user are ", res.data);
           setAllProducts(res.data);
          setMostRecent(res.data);
      })
      .catch(err=>{
        console.log("Error fetching products",err);
      })
    },[])

    var count=0;

    return(
        <div className="Home-Wrapper">
            <div className="Home-title">
            Products
            </div>
         <div className="Home-Catagories">
          {
            catagories.map(cat=>{
                return(
                    <div className="Category-ele-Wrapper">
                      <img src={cat.img} alt="err" className="category-ele-avatar"  
                      onClick={()=>{
                        window.location.replace(`${cat.url}/${UserName}`)
                      }}
                      />
                      <span className="category-ele-name" >
                        {cat.name}
                      </span>
                    </div>
                )
            })
          }
         </div>
         <div className="Home-CarouselWrapper">
         <Carousel className="Carousel-home" >
        <Carousel.Item interval={2000} >
          <img
            className="d-block w-100"
            src="https://thumbs.dreamstime.com/z/traditional-handicrafts-india-india-offers-wide-range-handicrafts-crafted-artisans-mainly-villages-142561390.jpg"
            alt="First slide"
          ></img>
        </Carousel.Item>
        <Carousel.Item interval={2500}>
          <img
           className="d-block w-100"
            src="https://pcprd.azureedge.net/content/amazing-activities-to-introduce-children-to-handicrafts-7793065292914.jpg"
            alt="second slide"
          ></img>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST4DipFAXADikp4FQMvpOKKCT5xSsEZbpdrA&usqp=CAU"
            alt="third slide"
          ></img>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTOyxeTcTMYDsiAGKvKCeXcl3bW9lqnfCXeJqORlnrkqObG_k2W3owtMynD6GbzVoZ2LY&usqp=CAU"
            alt="Fourth slide"
          ></img>
        </Carousel.Item>
      </Carousel>
         </div>
         <div className="Home-BestOffersWrapper">
          <span className="Home-Title-MostRecent">
            Most Recent
          </span>
            <div className="Home-BestOffersContainer">
            {
               
                   MostRecent.map(product=>{ count++;
                    if(count<=10) {
                    return(
                      
                        <ProductCard product={MostRecent[MostRecent.length-count]} />
                      
                    )
                    }
                   })
            }
         </div>
         </div>
         <div className="Home-MostPurchasedWrapper">
           <div className="Home-MostPurchasedContainer">
            {
                mostPurchased.map(ele=>{
                    <div className="Home-Most-eleWrapper">
                        <div className="Home-Most-Image">

                        </div>
                        <div className="Home-Most-TextWrapper">
                        <div className="Home-Most-Price">

                        </div>
                        <div className="Home-Most-Categories">

                        </div>
                        </div>

                    </div>
                })
            }
           </div>
         </div>
        
        </div>
    )
}

export default Home;