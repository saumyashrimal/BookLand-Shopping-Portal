import { useState } from "react";
import "./AddReviewStyle.css";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import ReactStars from "react-rating-stars-component";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import reviewsActionCreator from "../../Store/reviewsActionCreator";
import Popup from "../CommonComponents/Controls/Popup";


function AddReview(props) {

  let [responseTrigger,setResponseTrigger] = useState(false);

  let StoreObj = useSelector((store) => store);
  const dispatch = useDispatch();
  const {createReview , updateReview , getReviews } = bindActionCreators(reviewsActionCreator, dispatch);
  //state for star rating
  let [starRating, setStarRating] = useState(0);
  let [comment , setComment ] = useState(null);

  let handleSubmit = (e) => {
      e.preventDefault();
      let username = JSON.parse(localStorage.getItem("user")).username;
      let rating = starRating;
      let commenttext = comment ;
      let newReview = {username , rating , comment:commenttext};
      let currentBook = StoreObj.bookState.currentItem.booksmodel;
      let newReviewObj = {book:currentBook , newReview};
      let reviews = StoreObj.reviewState.reviews;
      console.log(newReviewObj);
      if(reviews === null){
        createReview(newReviewObj)
      }
      else{
        updateReview(newReviewObj)
      }

      setResponseTrigger(true);

      setTimeout(() => {
        getReviews(currentBook);
        props.setReviewTrigger(false);
        setResponseTrigger(false)
      },1000)


  }

  return (
    <>
      <Popup trigger={responseTrigger}>{StoreObj.reviewState.response}</Popup>
      {props.trigger && (
        <div className="ReviewModalbg">
          <div className="ReviewModalContent">
            <button
              className="reviewModal-Close bg-dark text-white float-end border-none"
              onClick={() => props.setReviewTrigger(false)}
            >
              X
            </button>
            <h4>Review the Product</h4>
            {/* star rating */}
            <div>
              <ReactStars
                activeColor="black"
                count={5}
                size={40}
                isHalf={true}
                onChange={(rating) => {
                  setStarRating(rating);
                }}
              />
            </div>
            {/* feedback text Area */}
            <div>
              <textarea rows="4" className="w-100" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Enter your feedback here ....."/>
            </div>

            {/* save feedback */}
            <button className="btn btn-dark text-white border border-light rounded" onClick={handleSubmit}>Submit Feedback</button>
          </div>
        </div>
      )}
    </>
  );
}

export default AddReview;
