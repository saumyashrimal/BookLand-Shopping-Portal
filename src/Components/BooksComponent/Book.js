import {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import StarRating from "../CommonComponents/Controls/StarRating";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Header from "../CommonComponents/Layout/Header";
import Home from "../Home";
import AddReview from "./AddReview";
import {useHistory} from "react-router-dom";
import AddToCart from "../CommonComponents/Controls/AddToCart";
import "./BookStyles.css"

function Book() {

  let history = useHistory();

  //trigger state for review pop up
  let [reviewTrigger , setReviewTrigger] = useState(false);
  
  let bookStore = useSelector((store) => store);
  let bookObj = bookStore.bookState.currentItem;
  let reviews = bookStore.reviewState.reviews;
  console.log(bookStore);
  let rating = bookObj.rating;

  let handleWriteReview = (e) => {
    if(bookStore.componentState.LoginState){
    e.preventDefault();
    setReviewTrigger(true)
    }
    else{
      history.push("/signin")
    }
  }

  return (
    <>
      <AddReview trigger={reviewTrigger} setReviewTrigger={setReviewTrigger}/>
      <Home>
        <div className="d-flex flex-column mt-4 container">
          <hr />
          {/* for image and book information  */}
          <div className="Book d-flex flex-row row">
            {/* Book Image */}
            <div className="Book-Image col-md-3">
              <img src={bookObj.booksPhotos} width="100%" alt="" />
            </div>
            {/* Book Details */}
            <div className="BookDetails ms-2 col-md-5">
              {/* book title */}
              <div className="boldtxt">{bookObj.bookname}</div>
              {/* star rating  */}
              <div>
                <p className="boldtxt">
                  <StarRating rating={rating} />
                </p>
              </div>
              {/* book details */}
              <div>
                {/* book description */}
                <p className="">{bookObj.bookdescription}</p>
                {/* book level */}
                <p>
                  <span className="boldtxt">Difficulty level : </span>
                  {bookObj.booklevel}
                </p>
                {/* book Author */}
                <p>
                  <span className="boldtxt">Author Name : </span>
                  {bookObj.bookauthor}
                </p>
              </div>

              {/* book price */}
              <div className="Book-Price">
                <p>
                  <span className="boldtxt">Price : </span>
                  <span>&#8377;</span>
                  {bookObj.bookprice}
                </p>
              </div>
            </div>
            {/* Options to buy or add to cart  */}
            <div className="addbook col-md-3 border border-dark shadow px-3">
              <p className="mt-4">
                <span className="boldtxt">Price : </span>
                <span>&#8377;</span>
                {bookObj.bookprice}
              </p>
              <p className="mt-5">To Add Book Item to Cart click below</p>

              <AddToCart bookObj={bookObj} />

              {/* <p className="mt-3">Order the item</p> */}
              {/* <button className="bg-dark text-white rounded px-5 float-center">
                Order Book
              </button> */}
            </div>
          </div>
          <hr />
          {/* for comments section */}
          <div className="d-flex row flex-row mb-3">
            {/* button for adding the user comments  */}
            <div className="col-md-3 border border-dark shadow addRating">
              <div className="text-center mt-2">
                <h5>Rating of this Book </h5>
                <StarRating rating={rating} />
              </div>
              <div className="mt-5 ms-2">
                <h5>Review this book</h5>
                <p>Share your thoughts with other customers</p>
                <button className="mt-3 bg-dark text-white rounded px-5 mb3 float-center" onClick={handleWriteReview}>
                  Write a Book Review
                </button>
              </div>
            </div>

            {/* comments already added  */}
            <div className="container reviews col-md-6">
              <h3 className="mb-4">Top Reviews</h3>

              {(reviews !== null && reviews.length !== 0 ) &&
                reviews.map((cObj, key) => {
                  return (
                    <div className="comments">
                      <p className="boldtxt">
                        <AccountCircleIcon /> {cObj.username}
                        <StarRating rating={cObj.rating} />
                      </p>
                      <p className="bg-light p-3">{cObj.comment}</p>
                    </div>
                  );
                })}

                {reviews === null && 
                  <h4 className="bg-dark border border-light p-3 text-white rounded ">Be the First One to Review</h4>
                }
            </div>
          </div>
        </div>
      </Home>
    </>
  );
}

export default Book;
