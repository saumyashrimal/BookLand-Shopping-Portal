//create mini books express api
const exp = require("express");
const booksReviewsApi = exp.Router();

//getting books Reviews
let BookReviews = require("../models/ReviewWithBook");
let Bookscollection = require("../models/booksmodel");

//body parser middleware
booksReviewsApi.use(exp.json());
const expressErrorHandler = require("express-async-handler");

//get date
let getCurrentDate = () => {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;

  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return (today = dd + "/" + mm + "/" + yyyy);
};

//create first Review
booksReviewsApi.post(
  "/createreview",
  expressErrorHandler(async (req, res) => {
    //get req body
    let book = req.body.book;
    let newReview = req.body.newReview;

    console.log("inside create", newReview);
    let _review = { ...newReview };
    //get todays date

    _review.reviewdate = getCurrentDate();

    //update review in book collection
    await Bookscollection.updateOne(
      { booksmodel: book },
      { $set: { rating: _review.rating } }
    );
    //create review
    let _BookReview = new BookReviews({ book: book, reviews: _review });

    //save the new review
    await _BookReview.save();

    //giving response
    res.send({ message: "Book Review created" });
  })
);

//update the review
booksReviewsApi.post(
  "/addreview",
  expressErrorHandler(async (req, res) => {
    //get req body
    let book = req.body.book;
    let newReview = req.body.newReview;

    // console.log("inside add ",newReview)
    let _review = { ...newReview };

    _review.reviewdate = getCurrentDate();

    //update the rating
    //get all the previous book rating
    let prevbookrating = await BookReviews.findOne({ book: book }).select({
      reviews: 1,
      _id: 0,
    });
    console.log(prevbookrating);
    let totalRatings = prevbookrating.reviews.length;
    console.log(totalRatings);
    let RatingSum = 0;
    prevbookrating.reviews.forEach((robj) => {
      // console.log(robj);
      RatingSum += robj.rating;
    });

    let newRating = (RatingSum + newReview.rating) / (totalRatings + 1);
    console.log("newRating", newRating);

    //update the rating in books collection
    await Bookscollection.updateOne(
      { booksmodel: book },
      { $set: { rating: newRating } }
    );

    //create review
    BookReviews.updateOne(
      { book: book },
      { $push: { reviews: _review } },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      }
    );
    res.send({ message: "Book Review created" });
  })
);

//get Reviews
booksReviewsApi.get(
  "/getreviews",
  expressErrorHandler(async (req, res) => {
    //get the book model
    let book = req.query.book;
    console.log(book);
    //get the reviews array
    let bookReviews = await BookReviews.findOne({ book: book });

    console.log(bookReviews);

    let resultantReviews = bookReviews ? bookReviews.reviews : null;
    //giving response
    res.send({ message: resultantReviews });
  })
);

//delete a review
booksReviewsApi.put(
  "/deletereview",
  expressErrorHandler(async (req, res) => {
    //get the book model
    let bookObj = req.body;

    console.log("at line 137",bookObj)

    //get the reviews array
    await BookReviews.updateOne(
      { book: bookObj.book },
      {
        $pull: {
          reviews: {
            username: bookObj.reviews.username,
            comment: bookObj.reviews.comment,
          },
        },
      },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      }
    );

    res.send({ message: "Review Deleted" });
  })
);

module.exports = booksReviewsApi;
