const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const User = require("../models/User.model");

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

    User.findOne(email)
    .then((userFromDB)=>{
        if (userFromDB){
            res.render("users/signup.hbs", {message: "This email has already been registered."});
            return;
        } else {
            const salt = bcryptjs.genSaltSync();
            const hashedPassword = bcryptjs.hashSync(password, salt);

            User.create({firstName, lastName, email, password})
            .then(userFromDB => {
                res.redirect("/login");
            })
        }
        
    })
    .catch(err => next(err));
})

/* GET login page */
router.get("/login", (req, res, next) => {
    res.render("users/login.hbs")
  })
/* Post login info */


module.exports = router;
