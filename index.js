const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const authrouter = require("./router/authrouter.js");
const categoryRouter = require("./router/categoryRouter.js");
const productrouter = require("./router/productRoute.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 5000;

// Load environment variables
dotenv.config();

const connectToDatabase = require('./config/db.js');

connectToDatabase();

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./client/build")));

// CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.use("/user", authrouter);
app.use("/category", categoryRouter);
app.use("/product", productrouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
