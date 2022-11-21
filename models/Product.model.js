const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    imgName: String,
    imgPath: String,
    publicId: String,
    seller: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const Product = model("Product", productSchema);
module.exports = Product;