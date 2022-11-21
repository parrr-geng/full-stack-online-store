const router = require("express").Router();
const Product = require("../models/Product.model");
const {uploader, cloudinary} = require("../config/cloudinary");

//add a new product by the logged-in user
router.get("/profile/:id/add-product", (req, res, next)=>{
    res.render("products/new-product.hbs");
});

//post the added product info from the logged-in user
router.post("profile/:id/add-product", uploader.single("productImage"), (req, res, next)=>{
    const {name, description, price} = req.body;
    const imgName = req.file.originalname;
    const imgPath = req.file.path;
    const publicId = req.file.filename;
    const seller = req.params.id;

    Product.create({name, description, price, imgName, imgPath, publicId, seller})
    .then(product => {
        console.log(product);
        res.redirect("/profile") //<-- how can I specify id in this?
    })
    .catch(err => next(err));
})


module.exports = router;