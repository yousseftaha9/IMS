const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const orderRouter = require("./routes/orderRoute");
var cors = require("cors");

const port = 4000;

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(cors());
// const corsOptions = {
//   origin: "http://localhost:5173", // Replace with the origin(s) you want to allow
//   methods: "GET,POST", // Specify the HTTP methods you want to allow
//   allowedHeaders: "Content-Type,Authorization", // Specify the headers you want to allow
// };

// app.use(cors(corsOptions));
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

// routes
// app.use(bodyParser.json());
app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.error(err);
  });
