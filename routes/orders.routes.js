const router = require("express").Router();
const User = require("../models/User.model");
const Product = require('../models/Product.model.js');
const Cart = require("../models/Cart.model")
const calculateTotal = require("../utils/calculateTotal");

//GET the basket page to view all products in cart
router.get("/cart", (req, res, next)=>{
    Product.find({isInCart: true})
    .then(productsFromDB => {
        let totalPrice = calculateTotal(productsFromDB).toFixed(2);
        res.render("orders/basket.hbs", {products: productsFromDB, totalPrice: totalPrice});
    })
    .catch(err => console.log(err));
})

//GET the address form to place the order
router.get("/checkout", (req, res, next)=>{
    res.render("orders/delivery-address.hbs", {userInSession: req.session.currentUser});
})

//POST the address form to update user database
router.post("/placemyorder", (req, res, next)=>{
    const {fullName, phoneNumber, addressLine1, addressLine2, postcode, city} = req.body;
    let address = `${fullName}
    ${addressLine1}
    ${addressLine2}
    ${postcode} ${city}
    ${phoneNumber}`;
    
    if(!req.session.currentUser){
        res.redirect("/profile");
    }

    User.findByIdAndUpdate(req.session.currentUser._id, {address: address})
    .then((userFromDB)=>{
        Product.find({isInCart: true})
        .then(productsFromDB => {
            let totalPrice = calculateTotal(productsFromDB).toFixed(2);
            res.render("orders/place-order.hbs", {products: productsFromDB, userInSession: userFromDB, totalPrice: totalPrice});
        })
    })
    .catch(error => console.log(error));
});

router.post("/confirmmyorder", (req, res, next)=>{
    res.render("orders/succesful-order.hbs")
});


module.exports = router;