const router = require("express").Router();
const Product = require('../models/Product.model.js');

/* GET home page */
router.get("/", (req, res, next)=>{
  res.render("index");
});

router.get("/all", (req, res, next) => {
  Product.find()
    .then((productInfo) => {
        res.render('products/all-products.hbs', { products: productInfo});
    }).catch(err => console.log(err))
    
});

module.exports = router;
