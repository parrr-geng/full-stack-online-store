const {Schema, model} = require("mongoose");

const orderSchema = new Schema({
    buyerId: String, // 1-to-1 relationship to the users, coz each product is a unique item.
    buyerAddress: String,
    totalPrice: Number,
    purchasedItems: Object
});

module.exports = model("Order", orderSchema);