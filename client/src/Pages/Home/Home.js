import React, {useState, useEffect } from "react";
import './Home.css';
import '../../Components/common.css';
import '../../Components/common.scss';
import { useNavigate, useParams }  from 'react-router-dom';
import axios from 'axios';
import FOoterStand from "../../Components/Footer/Footer";
import Carousel from 'react-bootstrap/Carousel';
import ProductCard from "../../Components/ProductComponent/prodCard";




const Home =() =>{
    const history = useNavigate();
    const params= useParams();
    const email = params.email || "";
    const [restaurantMap, setRestaurantsMap] = useState(new Map());
    const [restaurants, setRestaurants] = useState([]);
    const [randomProds , setRandomProds] = useState([]);
   useEffect(()=>{
    async function fetchAllRestaurants(){
      await axios.get("/Restaurant/getAllRestaurants").then(res=>{
        console.log("Home Fetch Restaurants Debug =>",res.data);
              
              var temp_map = new Map()
              if(Array.isArray(res.data)){
                res.data.forEach(restaurant => {
                       temp_map.set(restaurant._id , restaurant);
                })
                var prods_temp = [];
                res.data.forEach((restaurant)=>{
                  restaurant.menu.forEach((product)=>{
                    prods_temp.push(product);
                  })
                })
                var randomProdsX = [];
                for(var i=0;i<5 && i<prods_temp.length;i++){
                  var random = i;
                  randomProdsX.push(prods_temp[random]);
                }

                setRandomProds(randomProdsX);
                
                console.log("Temp =>", temp_map)
                setRestaurantsMap(new Map(temp_map));
                setRestaurants(res.data);
              }
      }).catch(err=>{
        console.log("Admin Fetch Restaurants Debug => Error => ",err);
      }) 
    }
    fetchAllRestaurants();
   },[])

   console.log("Home debug =>", restaurants);

   const catagories =[ 
    {name:'Sandwitch' , img:"https://vegmichigan.org/wp-content/uploads/2022/06/Odd-Burger-220x134.jpg"  ,url:"/Query/Sandwitch"},
    { name:"2Meal", img:'https://www.thedailymeal.com/img/gallery/what-was-the-first-restaurant-chain-in-america/intro-1670877532.jpg',url:"/Query/2Meal" },
    {
        name:"Tacos",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6KPvob0sGBIZjzCj0Ag6-MQ6RiX3TNxhMeg&usqp=CAU"
        ,url:"/Query/Tacos"
    },
    {
      name:'Tamales',
      img:'https://www.todaysdelight.com/wp-content/uploads/2021/05/mexican-tamales-2698-r-246k-500x375.jpg'
      ,url:"/Query/Tamales"
    },
    {
        name:'Pizza',
        img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA-7xPcXNP4hcaeOL5Urm2nkjkCX1Y8doYMQ&usqp=CAU'
        ,url:"/Query/Pizza"
      },
    {
        name:'Shrimp Noodles',
        img:'https://www.allrecipes.com/thmb/jiV_4f8vXFle1RdFLgd8-_31J3M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/229960-shrimp-scampi-with-pasta-DDMFS-4x3-e065ddef4e6d44479d37b4523808cc23.jpg'
        ,url:"/Query/Shrimp Noodles"
    },
    {
        name:'Burger',
        url:"/Query/Burger",
        img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF7JJbSrwAT62mYx84YBjyRtqCTomlNSFXhQ&usqp=CAU'
    },
    {
        name:'fries',
        url:"/Query/fries",
        img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvc6FfDeSExghJjio0zn1R3YMJ-xz_2_9VzmJCYvwMHyMU2hNcie_j3pASjm2ad6quFvI&usqp=CAU'
    },
    {
        name:'Fudge Brownie',
        url:"/Query/Fudge Brownie",
        img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlKQTg13eHc9zA7ZRwgZ9HdG7aWMsbKkoOqA&usqp=CAU'
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
                        window.location.replace(`${cat.url}/${email}`)
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
        <Carousel.Item interval={4000} >
          <img
            className="d-block w-100"
            src="https://www.restaurant-promotions.net/assets/restaurant-promotions/img/images/home-section-1-3a354236e7.png.webp"
            alt="First slide"
          ></img>
        </Carousel.Item>
        <Carousel.Item interval={4500}>
          <img
           className="d-block w-100"
            src="https://images.prismic.io/brinker-chilis/d308f697-5786-4921-990c-cc82a6ff15f3_Web_Ft-Item_desktop_800x600+New+Image+Starting+at+25%25.png?auto=compress,format&rect=0,0,800,600&w=800&h=600"
            alt="second slide"
          ></img>
        </Carousel.Item>
        <Carousel.Item interval={4000}>
          <img
            className="d-block w-100"
            src="https://cdn2.gofoodservice.com/cms/restaurant-coupons-and-promotions-guide-large.5fca8cb9ed0bd.jpg"
            alt="third slide"
          ></img>
        </Carousel.Item>
        <Carousel.Item interval={4000}>
          <img
            className="d-block w-100"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsjrTbpmA0NuLTbQX750cbvDFfKabDB9w4TGyLjhKahGohic2Ka7YpHsAz2IVygZHj8sM&usqp=CAU"
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
          
         </div>
         </div>
         <div className="Home-MostPurchasedWrapper">
           <div className="Home-MostPurchasedContainer">
            {
                randomProds?
                ( 
                  randomProds.map((rest,key)=>{
                    return(
                    <ProductCard product={rest} restaurant={restaurants[0]}/>
                    )
                  })
                ) : (
                  <div></div>
                )
            }
           </div>
         </div>
        
        </div>
    )
}

export default Home;