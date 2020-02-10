const express = require("express");
const app = express();

//Enable Post on req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Enable Cors
app.use(require("cors")());

//Import the routes
app.use("/user", require("./routes/user"));
app.use("/product", require("./routes/product"));
app.use("/wishlist", require("./routes/wishlist"));
app.use(require("./handlers/errorHandlers").notFound);

//Export the app
module.exports = app;
