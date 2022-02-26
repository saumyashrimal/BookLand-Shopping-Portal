//create a mini express application
const exp = require("express");
const userApi = exp.Router();

const Usercollection = require("../models/usermodel");
const UserCartCollection = require("../models/userCart");
let Bookscollection = require("../models/booksmodel");
const UserOrderCollection = require("../models/userorders");

const bcryptjs = require("bcryptjs");

const jwt = require("jsonwebtoken");

const expressErrorHandler = require("express-async-handler");

const CheckToken = require("../Middlewares/verifyToken");

require("dotenv").config();

let login = require("../Middlewares/login");

//body parser middleware
userApi.use(exp.json());

//create user
userApi.post(
  "/createuser",
  expressErrorHandler(async (req, res) => {
    //get collection object
    // let userCollectionObj = req.app.get("usercollection");

    //get user object
    let newUser = req.body;

    //search for existing user
    let foundUser = await Usercollection.findOne({ email: newUser.email });
    //if user already exist
    if (foundUser !== null) {
      res.send({ message: "user already exist" });
    } else {
      //hash the password before inserting
      let hashedPassword = await bcryptjs.hash(newUser.password, 8);

      //replace the password with the hashed pwd
      newUser.password = hashedPassword;

      //insert new user
      //set the values in the user model
      const { username, email, password } = req.body;
      //creating an instance of user collection
      const _user = new Usercollection({
        username: username,
        email: email,
        password: hashedPassword,
      });
      await _user.save();
      //send the response
      res.send({ message: "Successfully Registered" });
    }
  })
);

//login operation

userApi.post(
  "/signin",
  login,
  expressErrorHandler(async (req, res) => {
    //all the responses are send using login middleware
  })
);

//add address of user
userApi.post(
  "/addAddress",
  expressErrorHandler(async (req, res) => {
    //get the body
    let AddressObj = req.body;
    let newaddobj = { index: AddressObj.index, address: AddressObj.address };
    console.log(newaddobj);
    await Usercollection.updateOne(
      { email: AddressObj.email },
      { $push: { address: newaddobj } }
    );
    res.status(200).send({ message: "Address updated" });
  })
);

//change address
userApi.put(
  "/changeAddress",
  expressErrorHandler(async (req, res) => {
    //get the body
    let AddressObj = req.body;

    await Usercollection.updateOne(
      { email: AddressObj.email, "address.index": AddressObj.index },
      { $set: { "address.$.address": AddressObj.address } }
    );
    res.status(200).send({ message: "Address updated" });
  })
);

//remove address of user
userApi.post(
  "/removeAddress",
  expressErrorHandler(async (req, res) => {
    //gett the body
    let AddressObj = req.body;
    await Usercollection.updateOne(
      { email: AddressObj.email },
      { $pull: { address: { index: AddressObj.index } } }
    );

    res.status(200).send({ message: "Address removed" });
  })
);

//place an order
userApi.post(
  "/placeorder",
  expressErrorHandler(async (req, res) => {
    //get the body
    let orderObj = req.body;

    //inserting documents in user orders collection
    await UserOrderCollection.insertMany([...orderObj]);

    res.status(200).send({ message: "Order placed successfully" });
  })
);

//update the status of an order

userApi.put(
  "/updateorderstatus",
  expressErrorHandler(async (req, res) => {
    //get the body
    let orderObj = req.body;

    //inserting documents in user orders collection
    await UserOrderCollection.updateOne(
      { _id: orderObj._id },
      { $set: { status: orderObj.status } }
    );

    res.status(200).send({ message: "Order Status updated" });
  })
);

//get all address of user
userApi.get(
  "/getuseraddresslist",
  expressErrorHandler(async (req, res) => {
    //get the body
    let useremail = req.query.email;
    let addressList = null;

    console.log("email inside the user.js", useremail);

    addressList = await Usercollection.findOne({
      email: useremail,
    }).select({ _id: 0, address: 1 });

    console.log("inside user.js", addressList);

    //sending the response

    res.status(200).send({ message: addressList });
  })
);

//get users orders
userApi.get(
  "/getuserorders",
  expressErrorHandler(async (req, res) => {
    console.log(req.query);
    //get the body
    let useremail = req.query.useremail;
    // let orderStatus = req.query.status;
    let resultantOrders = null;
    // if (orderStatus !== "Canceled") {
    //   //inserting documents in user orders collection
    //   resultantOrders = await UserOrderCollection.find({
    //     useremail: useremail,
    //     status: { $ne: "Canceled" },
    //   });
    // } else {
    //   resultantOrders = await UserOrderCollection.find({
    //     useremail: useremail,
    //     status: "Canceled",
    //   });
    // }

    resultantOrders = await UserOrderCollection.find({
      useremail: useremail,
    });

    //sending the response

    res.status(200).send({ message: resultantOrders });
  })
);

//remove all items from cart
userApi.delete(
  "/deletewholecart",
  expressErrorHandler(async (req, res) => {
    //get request obj
    let email = req.query.email;

    //updating the array of books
    await UserCartCollection.deleteOne({ email: email });
    //sending response
    res.status(200).send({ message: "cart removed" });
  })
);

//add the book cart
userApi.post(
  "/addtocart",
  expressErrorHandler(async (req, res) => {
    //get cart object
    let cartObj = req.body;

    //get if user already exist in the cart document
    let existingUser = await UserCartCollection.findOne({ email: cartObj.email });
    console.log(existingUser);
    if (existingUser !== null) {
      //add book to the array
      let newBookArray = [...existingUser.books, cartObj.book];
      //   console.log(newBookArray);
      //update new book to books array in the existing cart
      await UserCartCollection.updateOne(
        { email: cartObj.email },
        { $set: { books: newBookArray } },
        function (error, success) {
          if (error) {
            console.log(error);
          } else {
            console.log(success);
          }
        }
      );
      //sending response
      res.status(200).send({ message: "Book added to cart" });
    } else {
      let booksArray = [];
      booksArray.push(cartObj.book);
      let _userCartObj = new UserCartCollection({
        email: cartObj.email,
        books: booksArray,
      });
      //   console.log(_userCartObj);
      //add the newuserObj to cartcollection
      await _userCartObj.save();
      res.send({ message: "Book added to cart" });
    }
  })
);

//update quantity
userApi.put(
  "/updateqty",
  expressErrorHandler(async (req, res) => {
    //get request obj
    let bookObj = req.body;
    let newbookObj = req.body.book;

    //updating the qty
    await UserCartCollection.updateOne(
      { email: bookObj.email, "books.bookmodel": newbookObj.bookmodel },
      { $set: { "books.$.qty": newbookObj.qty } },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      }
    );
    //sending response
    res.status(200).send({ message: "quantity updated" });
  })
);

//deleting the cart item
userApi.put(
  "/deleteCartBook",
  expressErrorHandler(async (req, res) => {
    //get request obj
    let bookObj = req.body;
    console.log(bookObj);
    //updating the array of books
    await UserCartCollection.updateOne(
      { email: bookObj.email },
      { $pull: { books: { bookmodel: bookObj.book.bookmodel } } },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      }
    );
    //sending response
    res.status(200).send({ message: "item removed" });
  })
);

//get cart Books
userApi.get(
  "/getcartbooks",
  expressErrorHandler(async (req, res) => {
    //get cart query parameters
    let email = req.query.email;

    //get if user already exist in the cart document
    let existingUser = await UserCartCollection.findOne({ email: email });
    let cartbooks = [];
    let resultantBookswithqty = [];

    if (existingUser !== null) {
      //get the books array
      let books = await existingUser.books;

      //get whole book obj by book modelno
      books.forEach((bobj) => {
        cartbooks.push(bobj.bookmodel);
      });

      //get the documents for bookscollection
      let booksList = await Bookscollection.find({
        booksmodel: { $in: cartbooks },
      });

      //adding the quantity with bookobj in new array

      books.forEach((bobj) => {
        let bookObj = booksList.find(
          (book) => book.booksmodel === bobj.bookmodel
        );

        let qty = bobj.qty;
        let newcartObj = { qty, bookObj };
        // console.log(newcartObj);
        resultantBookswithqty.push(newcartObj);
      });

      //   console.log(resultantBookswithqty);

      res.status(200).send({ message: resultantBookswithqty });
    } else {
      //send the new cartbooks
      res.status(200).send({ message: null });
    }
  })
);

//get all the users data
userApi.get(
  "/getallusers",
  expressErrorHandler(async (req, res) => {
    let allUsers = await Usercollection.find();

    res.status(200).send({ message: allUsers });
  })
);

//delete an user
userApi.put(
  "/deleteuser",
  expressErrorHandler(async (req, res) => {
    //get request obj
    let email = req.body.email;
    console.log(email);

    //updating the array of books
    await Usercollection.deleteOne({ email: email } , function (err, result) {

      if (err) {

          console.log("error query");

      } else {

          console.log(result);

      }}
      );
    //sending response
    res.status(200).send({ message: " User Removed" });
  })
);


//get all the orders 

userApi.get("/getallorders" ,expressErrorHandler(async (req, res) => {

  //updating the array of books
  let allorders = await UserOrderCollection.find();
  //sending response
  res.status(200).send({ message: allorders });
})
);





module.exports = userApi;
