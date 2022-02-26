//create express app
const exp = require("express");
const app = exp();
const path = require("path");
const mongoose = require("mongoose");

//to get keys from .env file
require("dotenv").config();

//import apis
const userApi = require("./APIS/UserAPIS/user");
const sellerApi = require("./APIS/SellersAPIS/sellers");
const booksApi = require("./APIS/BooksAPIS/bookscategories");
const reviewsApi = require("./APIS/BooksAPIS/booksReview");

//dbconnection url
const dburl = process.env.DATABASE_URL;

//mongodb connection

mongoose
  .connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then(
    //confirmation of db connect
    console.log("Db connection success")
    //getting all the collections using app.set passing it into the apis
  );

//execute specific api based on the path
app.use("/user", userApi);
app.use("/seller", sellerApi);
app.use("/books", booksApi);
app.use("/reviews", reviewsApi);



//middleware to handle wrong path

app.use((req, res, next) => {
  res.send({ message: `path ${req.url} is invalid` });
});

//handle errors
app.use((err, req, res, next) => {
  console.log(err);
  res.send({ message: err.message });
});

//assign port
const port = process.env.PORT || 2021;
app.listen(port, () =>
  console.log(`server is listening to port ${port}.......`)
);
