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
        res.render("orders/basket.hbs", {products: productsFromDB, userInSession: req.session.currentUser, totalPrice: totalPrice});
    })
    .catch(err => console.log(err));
})

//GET the address form to place the order
router.get("/checkout", (req, res, next)=>{
    res.render("orders/delivery-address.hbs", {userInSession: req.session.currentUser});
})

router.get("/placemyorder", (req, res, next)=>{
    Product.find({isInCart: true})
        .then(productsFromDB => {
            let totalPrice = calculateTotal(productsFromDB).toFixed(2);
            res.render("orders/place-order.hbs", {products: productsFromDB, userInSession: req.session.currentUser, totalPrice: totalPrice});
        })
        .catch(error => console.log(error));

});

//POST the address form to update user database
router.post("/placemyorder", (req, res, next)=>{
    const {fullName, phoneNumber, addressLine1, addressLine2, postcode, city} = req.body;
    let address = `${fullName}
    ${addressLine1}
    ${addressLine2}
    ${postcode} ${city}
    ${phoneNumber}`;
    
    if(!req.session.currentUser){
        res.redirect("/login");
    }

    User.findByIdAndUpdate(req.session.currentUser._id, {address: address})
    .then((userFromDB)=>{
        Product.find({isInCart: true})
        .then(productsFromDB => {
            let totalPrice = calculateTotal(productsFromDB).toFixed(2);
            //let stripePrice = totalPrice * 100;
            res.render("orders/place-order.hbs", {products: productsFromDB, userInSession: userFromDB, totalPrice: totalPrice});
        })
    })
    .catch(error => console.log(error));
});

// Stripe setup
let Stripe_Key = "pk_test_Fvte6KjQ4hOb7eYuZgX9HfhQ";
let Secret_Key = "STRIPE_SECRET_KEY";
const stripe = require("stripe")(Secret_Key);

router.post("/pay", (req, res, next)=>{
    const userInSession = req.session.currentUser;

    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: "wei",
        address: userInSession.address
    })
    .then((customer) => {  
        return stripe.charges.create({
        amount: totalPrice, // Charing Rs 25
        description: 'Secondhand Sports-related products',
        currency: 'USD',
        customer: customer.id
        });
    })
    .then((charge) => {
        res.send("Success") // If no error occurs
    })
    .catch((err) => {
        res.send(err) // If some error occurs
    });
    
});


module.exports = router;