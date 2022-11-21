const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    category: {
        type: String,
        enum: ["cycling", "fitness", "yoga", "basketball", "football", "men's clothing", "women's clothing"]
    },
    image: String,
    imgName: String,
    imgPath: String,
    publicId: String,
    seller: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    rating: Array
});

const Product = model("Product", productSchema);
module.exports = Product;