const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const errorController = require("./controllers/error");
const mongoConnect = require("./util/database").mongoConnect;
const User = require("./models/user");

app.set("view engine", "ejs");

app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("6300dca91c78063bb4854854")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);

app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  // console.log(client);
  app.listen(3000);
});
