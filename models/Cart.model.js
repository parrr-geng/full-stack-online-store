const {Schema, model} = require('mongoose')

const cartSchema = new Schema(
    {
        products: Array,
        price: Number,
        image: String,
        quantity: Number
    }
);

const Cart = model("Cart", cartSchema);

// class Cart {
//     constructor(oldCart) {
//     this.Cart = model("Cart", cartSchema);
//     this.products = oldCart.products || {};
//     this.totalQty = oldCart.totalQty || 0;
//     this.totalPrice = oldCart.totalPrice || 0;
//     }

//     add (product, id) {
//         let storedProduct = this.products[id];
//         if(!storedProduct) {
//             storedProduct = this.products[id] = {product: product, quantity: 0, price: 0};
//         }
//         storedProduct.quantity++;
//         storedProduct.price = storedProduct.product.price * storedProduct.quantity;
//         this.totalQty++;
//         this.totalPrice += storedProduct.price;
//     };

//     generateArray () {
//         let productArr = [];
//         for(let id in this.products) {
//             productArr.push(this.products[id]);
//         }
//         return productArr;
//     }

//     getTotalPrice () {
//         return this.totalPrice;
//     }
//}

module.exports = Cart;
