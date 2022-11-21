const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const User = require("../models/User.model");
const Product = require("../models/Product.model");

/* GET signup page */
router.get("/signup", (req, res, next)=>{
    res.render("users/signup.hbs");
});

/* POST signup info */
router.post("/signup", (req, res, next)=>{
    const {firstName, lastName, email, password} = req.body;
    if (!firstName || !lastName || !email || !password){
        res.render("users/signup.hbs", {message: "PLEASE FILL IN ALL THE REQUIRED FIELDS."})
    }

    if (password.length < 6){
        res.render("users/signup.hbs", {message: "Password should have at least 6 characters."})
    }

    User.findOne({email})
    .then((userFromDB)=>{
        if (userFromDB){
            res.render("users/signup.hbs", {message: "This email has already been registered."});
            return;
        } else {
            const salt = bcryptjs.genSaltSync();
            const hashedPassword = bcryptjs.hashSync(password, salt);

            User.create({firstName, lastName, email, password: hashedPassword})
            .then(userFromDB => {
                res.redirect("/login");
            })
        }
    })
    .catch(err => {
        console.log(err);
        next(err);
    });
})

/* GET login page */
router.get("/login", (req, res, next) => {
    if(req.session.currentUser){
        console.log(req.session.currentUser);
        res.redirect("/profile");
    } else {  
        res.render("users/login.hbs");
    }
  })

/* Post login info */
router.post("/login", (req, res, next) => {
  const { email, password } = req.body

  // Find user
  User.findOne({ email })
    .then(userFromDB => {
      if (userFromDB === null) {
        // User not found
        res.render("users/login.hbs", { message: "User not found" })
        return;
      }
      // User found in database
      // Check if password from input form matches hashed password from database
      if (bcryptjs.compareSync(password, userFromDB.password)) {
        // Password is correct => Login user
        req.session.currentUser = userFromDB;
        res.render("users/profile.hbs", {userInSession: req.session.currentUser});    
      } else {
        res.render("users/login.hbs", { message: "Wrong credentials" })
        return;
      }
    })
    .catch(err=>{
        console.log(err);
        next(err);
    });
})

/* GET profile page */
router.get("/profile", (req, res, next)=>{
   
    Product.find({seller: req.session.currentUser._id})
    .then(productsFromDB => {
        res.render("users/profile.hbs", {products: productsFromDB, userInSession: req.session.currentUser});
    })
    .catch(err => {
        console.log(err);
        next(err);
    })
});


router.get("/products/:productId/delete", (req, res, next)=>{
    const { productId } = req.params;

    Product.findByIdAndDelete( productId )
    .then(()=>{
        res.redirect("/profile");
    })
    .catch(err => {
        console.log(err);
        next(err)});
})


// Logout
router.get("/logout", (req, res, next) => {
    req.session.destroy()
    res.redirect("/")
  })


module.exports = router;