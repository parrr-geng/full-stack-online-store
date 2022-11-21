const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    category: {
        type: String,
        enum: ["cycling", "fitness", "yoga", "basketball", "football"]
    },
    image: String,
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