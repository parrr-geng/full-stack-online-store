const router = require("express").Router();
const Product = require('../models/Product.model.js');

/* GET home page */
router.get("/", (req, res, next)=>{
  res.render("index");
});

// Display all products
router.get("/products/all", (req, res, next) => {
  Product.find()
    .then((productInfo) => {
      res.render('products/all-products.hbs', {products: productInfo});
    })
    .catch(err => console.log(err)); 
});

//Get women page
router.get("/products/women", (req, res, next)=>{
  Product.find({category: "women's clothing"})
  .then((productsFromDB)=>{
    res.render("products/women-products.hbs", {products: productsFromDB});
  })
  .catch(err => console.log(err));
});

//Get men page
router.get("/products/men", (req, res, next)=>{
  Product.find({category: "men's clothing"})
  .then((productsFromDB)=>{
    res.render("products/women-products.hbs", {products: productsFromDB});
  })
  .catch(err => console.log(err));
});

//Get women page
router.get("/products/kids", (req, res, next)=>{
  Product.find({category: "kids clothing"})
  .then((productsFromDB)=>{
    res.render("products/women-products.hbs", {products: productsFromDB});
  })
  .catch(err => console.log(err));
});

//Get women page
router.get("/products/sports", (req, res, next)=>{
  Product.find({category: "sports"})
  .then((productsFromDB)=>{
    res.render("products/women-products.hbs", {products: productsFromDB});
  })
  .catch(err => console.log(err));
});

// Get about page
router.get("/about", (req, res, next) => {
  res.render('information/about.hbs');
});

router.get("/terms-and-conditions", (req, res, next)=>{
  res.render("information/terms-and-conditions.hbs");
});

// Search results
router.post("/search-results", (req, res, next) => {
  const search = req.body.search;
  console.log(search)
  let matchingProducts = [];
  Product.find({})
  .then((productsFromDB) => {
    console.log(productsFromDB)
    //const newArray = productsFromDB.filter(element => element.title.includes(searchKey))
    for(let data of productsFromDB) {
      if(data.title.toLowerCase().search(search.toLowerCase()) != -1) {
        matchingProducts.push(data);
      }
    }
    res.render('products/search-results.hbs', {products: matchingProducts, search})
  })
})

module.exports = router;
