const router = require("express").Router();
const Product = require("../models/Product.model");
const {uploader, cloudinary} = require("../config/cloudinary");

router.get("/product/add", (req, res, next)=>{
    res.render("products/new-product.hbs");
})


module.exports = router;