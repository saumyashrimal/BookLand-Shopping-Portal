//create mini books express api
const exp = require("express");
const booksApi = exp.Router();

const multerObj = require("../Middlewares/appImages");

//getting bookscollection
let Bookscollection = require("../models/booksmodel");
let Bookcategoriescollection = require("../models/bookscategories");

let BookReviews = require("../models/ReviewWithBook");

//body parser middleware
booksApi.use(exp.json());
const expressErrorHandler = require("express-async-handler");

//get book categories from book category collection
booksApi.get(
  "/getcategories",
  expressErrorHandler(async (req, res) => {
    let result = await Bookcategoriescollection.find().select({
      category: 1,
      _id: 0,
    });
    console.log(result);
    res.send({ message: result });
  })
);

//create a books model in books collection

booksApi.post(
  "/createbook",
  multerObj.single("photo"),
  expressErrorHandler(async (req, res, next) => {
    //get user obj
    let newBook = JSON.parse(req.body.bookObject);
    console.log(newBook);
    //seach for existing user
    let existingBook = await Bookscollection.findOne({
      booksmodel: newBook.booksmodel,
    });
    console.log(existingBook);
    //if user is existed
    if (existingBook !== null) {
      res.send({ message: "Book already existed" });
    } else {
      //get req parameters

      let {
        booksmodel,
        bookname,
        bookauthor,
        availableqty,
        discount,
        bookprice,
        bookdescription,
        booklevel,
        parentcategory,
        selleremail,
      } = newBook;

      let filepath = req.file.path;

      //get seller details from local storage

      //make an instance of Book model to create a new book

      // let _book = new Bookscollection({...newBook ,booksPhotos: filepath })

      let _book = new Bookscollection({
        booksmodel,
        bookname,
        bookauthor,
        availableqty,
        discount,
        bookprice,
        bookdescription,
        booklevel,
        parentcategory,
        selleremail,
        booksPhotos: filepath,
      });

      //save the new seller object onto sellercollection
      await _book.save();

      //giving response
      res.send({ message: "Book created" });
    }
  })
);

//get books by categories
booksApi.get(
  "/getbooksbycategory",
  expressErrorHandler(async (req, res) => {
    //get request parameter
    let category = JSON.parse(req.query.category).category;
    console.log(category);
    //get the books by categories
    let books = await Bookscollection.find({ parentcategory: category });

    console.log(books);
    //send the response of books collection
    res.status(200).send({ message: books });
  })
);

//get product on search
booksApi.get(
  "/getbooksonsearch",
  expressErrorHandler(async (req, res) => {
    //get request parameter
    let searchText = req.query.searchText;
    console.log(searchText);

    //get the books by categories
    //using regex for autocomplete functionality on search

    let bookList = await Bookscollection.find({
      $or: [
        { bookname: { $regex: `${searchText}`, $options: "i" } },
        { bookauthor: { $regex: `${searchText}`, $options: "i" } },
        { parentcategory: { $regex: `${searchText}`, $options: "i" } },
      ],
    }).sort({ updatedAt: 1 });

    console.log(bookList);
    //send the response of books collection
    res.status(200).send({ message: bookList });
  })
);

//get book by book model
booksApi.get(
  "/getbookbymodel",
  expressErrorHandler(async (req, res) => {
    //get request parameter
    let bookmodel = req.query.bookmodel;

    let book = await Bookscollection.findOne({ booksmodel: bookmodel });

    console.log(book);
    //send the response of books collection
    res.status(200).send({ message: book });
  })
);

//get autocompolete list
booksApi.get(
  "/getAutocompleteListOfBooks",
  expressErrorHandler(async (req, res) => {
    //get request parameter
    let searchText = req.query.searchText;
    console.log(searchText);

    let suggestionList = [];
    //get the books by categories
    //using regex for autocomplete functionality on search
    if (searchText.trim(" ").length !== 0) {
      //get the suggestion by bookname
      let booknames = await Bookscollection.find({
        bookname: { $regex: `${searchText}`, $options: "i" },
      }).select({ bookname: 1, _id: 0 });

      let bookslist = booknames.map((bObj) => bObj.bookname);

      //get suggestions by bookauthor
      let bookauthors = await Bookscollection.find({
        bookauthor: { $regex: `${searchText}`, $options: "i" },
      }).select({ bookauthor: 1, _id: 0 });

      let authorslist = bookauthors.map((bObj) => bObj.bookauthor);

      //get suggestion by categories
      let categories = await Bookscollection.find({
        parentcategory: { $regex: `${searchText}`, $options: "i" },
      }).select({ parentcategory: 1, _id: 0 });
      let categorylist = categories.map((bObj) => bObj.parentcategory);

      suggestionList = [...bookslist, ...authorslist, ...categorylist];
    }

    console.log(suggestionList);
    //send the response of books collection
    res.status(200).send({ message: suggestionList });
  })
);

//get new releases
booksApi.get(
  "/getnewreleases",
  expressErrorHandler(async (req, res) => {
    //get the books sorted by date and time
    let newlyReleasedBooks = await Bookscollection.find()
      .sort({ createdAt: -1 })
      .limit(4);

    //send response
    res.status(200).send({ message: newlyReleasedBooks });
  })
);

//get mixed collections
booksApi.get(
  "/getmixedcollections",
  expressErrorHandler(async (req, res) => {
    let mixedCollection = [];
    //get the books sorted by date and time
    let nodejsbook = await Bookscollection.findOne({
      parentcategory: "Nodejs",
    }).sort({ createdAt: -1 });
    let fsebooks = await Bookscollection.find({
      parentcategory: "Full Stack Developer",
    })
      .sort({ createdAt: -1 })
      .limit(2);
    let reactjsbook = await Bookscollection.findOne({
      parentcategory: "Reactjs",
    }).sort({ createdAt: -1 });
    //send response
    mixedCollection = [...fsebooks, nodejsbook, reactjsbook];
    res.status(200).send({ message: mixedCollection });
  })
);

//get most popular books

booksApi.get(
  "/getmostpopularbooks",
  expressErrorHandler(async (req, res) => {
    console.log("inside the most popular books")
    //get the books with highest rating
    let books = await Bookscollection.find().sort({ rating: -1 }).limit(4);

    //send response
    res.status(200).send({ message: books });
  })
);

//update books
booksApi.put(
  "/updatebook",
  expressErrorHandler(async (req, res) => {

    //get the updated book
    let updatedBook = req.body;


    //update the book 
    await Bookscollection.updateOne({_id:updatedBook._id} , {$set : {bookprice:updatedBook.bookprice , qty:updatedBook.qty , discount:updatedBook.discount , booklevel:updatedBook.booklevel , parentcategory:updatedBook.parentcategory , bookdescription:updatedBook.bookdescription}})

    //send response 
    res.status(200).send({message:"Book Updated"})

   
  })
);


// delete book 
booksApi.delete(
  "/deletebook",
  expressErrorHandler(async (req, res) => {

    //get the updated book
    let bookmodel = req.query.bookmodel;
    //update the book 
    await Bookscollection.deleteOne({booksmodel:bookmodel})

    //send response 
    res.status(200).send({message:"Book Deleted"})

  })
);


//add a category
booksApi.post("/addcategory" ,  expressErrorHandler(async (req, res) => {

  //get the category from body 
  let categoryObj = req.body;

   let _bookCategory = new Bookcategoriescollection({category : categoryObj.category})

   //save the bookcategory
   await _bookCategory.save();

  //send response 
  res.status(200).send({message:"Book Category added"})

})
);

//get all books for admin
booksApi.get("/getallbooks" ,  expressErrorHandler(async (req, res) => {


   let Allbooks = await Bookscollection.find()

  //send response 
  res.status(200).send({message:Allbooks})

})
);


module.exports = booksApi;
