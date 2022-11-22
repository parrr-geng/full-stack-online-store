const router = require("express").Router();
const Product = require('../models/Product.model.js');

/* GET home page */
router.get("/", (req, res, next) => {
  Product.find()
    .then((productInfo) => {
        res.render('index', { products: productInfo});
    }).catch(err => console.log(err))
    
});

// Get about page
router.get("/about", (req, res, next) => {
  res.render('information/about.hbs')
})

module.exports = router;
