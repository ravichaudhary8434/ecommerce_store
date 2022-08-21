const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const User = require("./models/user");

app.set("view engine", "ejs");

app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("6301d4741f4ccc36b8764919")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);

app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://malhotraravi842:CzVmfmYwjIX8fsKR@cluster0.iyaxi.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((res) => {
    // const user = new User({
    //   name: "Ravi Chaudhary",
    //   email: "ravi@lcx.com",
    //   cart: {
    //     items: [],
    //   },
    // });
    // user.save();
    app.listen(3000);
  })
  .catch((err) => console.log(err));
