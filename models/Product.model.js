const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    stock: Number,
    seller: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const Product = model("Product", productSchema);
module.exports = Product;