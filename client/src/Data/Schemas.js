const cart_initialState = []

const product_initialState = {
    _id:null,
    FullName: "",
    productId: null,
    restaurantId: null,
    Description: ["No Description Provided"],
    Specifications: [],
    Rating: 0,
    NumberOfRatings:0,
    reviews: [],
    Price:0,
    Offers: [],
    Promos: [],
    Media: [],
    Quantity: 0,
    SellerId: null,
    ProductsSold: 0,
}

const restaurant_initialState ={
    _id : null,
    restaurantId: null,
    restaurantName: null,
    location: {
      street1: "",
      street2: "",
      apartment: "",
      city: "",
      state: "",
      pinCode: "",
      coordinates: {
        lat: null,
        lng: null,
      },
    },
    orders: [],
    menu: [],
    media: [],
    promos: [],
    rating: 0, // You can set an initial value if needed
    num_ratings: 0, // You can set an initial value if needed
    reviews: [],
}
const user_initialSchema = {
    _id: null,
    userId: null,
    email: null,
    password: null,
    FirstName: "",
    LastName: "",
    FullName: "",
    location: {
      university: null,
      street1: null,
      street2: null,
      apartment: null,
      city: null,
      state: null,
      pinCode: null,
      coordinates: {
        lat: null,
        lng: null
      }
    },
    OrderHistory: [],
    cart: [],
    Cart:[],
    reviews:[],
  }

const admin_initialSchema = {
    _id: null,
    adminId: null,
    adminName: "",
    email: null,
    password: null,
  };

export {
cart_initialState,
product_initialState,
restaurant_initialState,
user_initialSchema,
admin_initialSchema

}
