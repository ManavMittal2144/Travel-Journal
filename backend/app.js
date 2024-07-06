const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const userRoutes = require("./Routes/auth");
const vlogRoutes = require("./Routes/vlog");
const cardRoutes = require("./Routes/card");
const cors = require("cors");
const seedDB = require("./seed");

const router = express.Router();
const User = require("./Models/User");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

mongoose
  .connect("mongodb+srv://ommittal2144:ommittal@cluster0.jvpqfkn.mongodb.net/")
  .then(() => {
    console.log("db successfully connected");
  })
  .catch((err) => {
    console.log("db not connected");
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//seedDB();
app.use(cardRoutes);
app.use(userRoutes);
app.use(vlogRoutes);
app.listen(8080, () => {
  console.log("connected");
});
