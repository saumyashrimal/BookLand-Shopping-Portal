//create a mini express application
const exp = require("express");
const sellerApi = exp.Router();
const bcryptjs = require("bcryptjs");
const expressErrorHandler = require("express-async-handler");
require("dotenv").config();

//login middleware for sellers login application
let login = require("../Middlewares/login");

let sellersCollectionObj = require("../models/sellermodel");
let userCollectionObj = require("../models/usermodel");
let Bookscollection = require("../models/booksmodel");
const UserOrderCollection = require("../models/userorders");

//body parser middleware
sellerApi.use(exp.json());

//to check if seller account exist
sellerApi.get(
  "/getSeller/:email",
  expressErrorHandler(async (req, res) => {
    //check if the seller exist
    let foundSeller = await sellersCollectionObj.findOne({
      email: req.params.email,
    });

    console.log("found seller = ", foundSeller);

    foundSeller === null
      ? res.send({ message: "Not-Found" })
      : res.send({ message: "Found" });
  })
);

//login seller account

sellerApi.post(
  "/signin",
  login,
  expressErrorHandler(async (req, res) => {
    // res send throught middleaware
  })
);

//seller api to creaete the new sellers account
sellerApi.post(
  "/createSelleraccount",
  expressErrorHandler(async (req, res) => {
    //get collection object
    //get new Seller object
    let newSeller = req.body;

    //serch if there is existing users account with the given account

    //get user collection object

    let foundUser = await userCollectionObj.findOne({ email: newSeller.email });
    if (foundUser !== null) {
      res
        .status(202)
        .send({ message: "User account already exist with this email" });
    }
    //no user found with the same mail id in user collection
    else {
      //search for existing business account
      let foundSeller = await sellersCollectionObj.findOne({
        email: newSeller.email,
      });
      //if Business already exist
      if (foundSeller !== null) {
        res.status(202).send({ message: "Business account already exist" });
      } else {
        //hash the password before inserting
        let hashedPassword = await bcryptjs.hash(newSeller.password, 8);

        //replace the password with the hashed pwd
        newSeller.password = hashedPassword;

        //insert new user
        //get req parameters

        let { businessname, email, password, username, contactno } = req.body;

        //make an instance of sellermodel to create a new seller object
        let _seller = new sellersCollectionObj({
          businessname,
          email,
          password: hashedPassword,
          username,
          contactno,
        });

        //save the new seller object onto sellercollection
        await _seller.save();

        //send the response
        res.status(200).send({ message: "Business account created" });
      }
    }
  })
);

//get seller products
sellerApi.get(
  "/gettotalbooks",
  expressErrorHandler(async (req, res) => {
    //get the seller email from the req params
    let sellerEmail = req.query.selleremail;
    console.log(sellerEmail)

    //get total books
    let bookList = await Bookscollection.find({ selleremail: sellerEmail }).sort({createdAt:-1});

    //sending the response
    res.status(200).send({ message: bookList });
  })
);


//get total orders 

sellerApi.get(
  "/gettotalorders",
  expressErrorHandler(async (req, res) => {
    //get the seller email from the req params
    let sellerEmail = req.query.selleremail;

    //get total books
    let userorders = await UserOrderCollection.find({ selleremail: sellerEmail });

    //sending the response
    res.status(200).send({ message: userorders });
  })
);


module.exports = sellerApi;
