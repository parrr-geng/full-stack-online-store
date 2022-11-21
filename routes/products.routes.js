const router = require("express").Router();
const Product = require("../models/Product.model");
const {uploader, cloudinary} = require("../config/cloudinary");
const User = require("../models/User.model");

//add a new product by the logged-in user
router.get("/profile/add-product", (req, res, next)=>{
    res.render("products/new-product.hbs", {userInSession: req.session.currentUser}) 
});

//post the added product info from the logged-in user
router.post("/profile/add-product", uploader.single("productImage"), (req, res, next)=>{
    const {title, price, description, category} = req.body;
    const imgName = req.file.originalname;
    const imgPath = req.file.path;
    const publicId = req.file.filename;
    const seller = req.session.currentUser._id;
    console.log(publicId);
    console.log(seller);

    Product.create({title, price, description, category, imgName, imgPath, publicId, seller})
    .then(product => {
        console.log(product);
        res.redirect("/profile") //<-- how can I specify id in this?
    })
    .catch(err => {
        console.log(err);
        next(err);
    });
});





module.exports = router;