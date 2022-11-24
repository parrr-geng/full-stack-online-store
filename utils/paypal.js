const paypal = require("paypal-rest-sdk");
const router = require("express").Router();

paypal.configure({
    "mode": "sandbox", //sandbox or production or live?
    "client_id": "test",
    "client_secret": "secret"
});


module.exports = router;