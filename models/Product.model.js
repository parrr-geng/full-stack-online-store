const {Schema, model} = require('mongoose');

const productSchema = new Schema(
    {
        title: String,
        price: Number,
        description: String,
        category: {
            type: String,
            enum: ["cycling", "fitness", "yoga", "basketball", "football", "men's clothing", "women's clothing", "kids clothing", "sports"]
        },
        image: String,
        imgName: String,
        imgPath: String,
        publicId: String,
        seller: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        rating: Array,
        isInCart : {
            type: Boolean,
            default: false
        }
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`    
        timestamps: true
    }
);

const Product = model("Product", productSchema);
module.exports = Product;