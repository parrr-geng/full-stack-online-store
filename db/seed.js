const mongoose = require("mongoose");
const Product = require("../models/product.model");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/full-stack-online-store";



const products = [
  {
    name: "rockrider",
    description:
      "Raised position, stem can be raised up to 1.18 inch, ergonomic saddle: comfort that also yields greater efficiency. 27.5\" wheels, double disc brakes, 24 speeds.",
    price: 200,
  },
  {
    name: "home trainer",
    description:
      "Simple and effective, the In'Ride 100 and its magnetic resistance allows you to vary the resistance between 7 different levels (adjustable shifter) and achieves up to 550 watts.",
    price: 110,
  }
  
];


mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo database: "${x.connections[0].name}"`);

    // Create new documents in the products collection
    return Product.create(products);
  })
  .then((productsFromDB) => {
    console.log(`Created ${productsFromDB.length} products`);

    // Once the documents are created, close the DB connection
    return mongoose.connection.close();
  })
  .then(() => {
    // Once the DB connection is closed, print a message
    console.log("DB connection closed!");
  })
  .catch((err) => {
    console.log(`An error occurred while creating products from the DB: ${err}`);
  });