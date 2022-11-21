const router = require("express").Router();

//const Product = require('../models/Product.model.js')


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});



module.exports = router;
