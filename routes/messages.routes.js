const router = require("express").Router();
const mongoose = require("mongoose");

// const User = require("../models/User.model");
// const Product = require("../models/product.model");

// const bodyParser = require('body-parser')
// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: false }))


// require("dotenv/config")
// const dbUrl = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/full-stack-online-store";

// let Message = mongoose.model('Message', { firstName: String, message: String })

// router.get("/profile/messages", (req, res, next) => {
//     res.render("users/messages.hbs", { userInSession: req.session.currentUser })
// });

// router.get("/profile/messages", (req, res, next) => {
//     Message.find({}, (err, messages) => {
//         res.render("users/messages.hbs", { userInSession: req.session.currentUser })
//     })
// });

// router.post("/profile/messages", (req, res) => {
//     const {firstName, message} = new Message(req.body);
//     message.save((err) => {
//         if (err) {
//             sendStatus(500);
//         }
//         res.sendStatus(200)
//     })
// })

 module.exports = router;
