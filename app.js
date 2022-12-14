// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Use body parser to parse middlewares
/*
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
*/

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");
const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
require("./config/session.config")(app);

// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "full-stack-online-store";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const usersRoutes = require("./routes/users.routes");
app.use("/", usersRoutes);

const productsRoutes = require("./routes/products.routes");
app.use("/", productsRoutes);


const contactFormRoutes = require("./routes/contact.routes");
app.use("/", contactFormRoutes)

const ordersRoutes = require("./routes/orders.routes");
app.use("/", ordersRoutes);


// const messagesRoutes = require ("./routes/messages.routes")
// app.use("/", messagesRoutes)
// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
