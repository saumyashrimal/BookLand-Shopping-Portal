import { useEffect, useState } from "react";
import adminActionCreator from "../../Store/adminActionCreator";
import componentStateActionCreator from "../../Store/componentStateActionCreator";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Popup from "../CommonComponents/Controls/Popup";
import AdminDashboard from "./AdminDashboard";
import "./ReviewsModalStyles.css";

function ReviewsAndRatings(props) {
  let [trigger, setTrigger] = useState(false);
  let history = useHistory();
  let StoreObj = useSelector((store) => store);
  const dispatch = useDispatch();

  const { getbookReviews, deleteReview, ResetResponse, ResetReviews } =
    bindActionCreators(adminActionCreator, dispatch);
    console.log(props)

  useEffect(() => {
    ResetReviews();
    getbookReviews(props.book);
    console.log("inside the reviewAndRAting", StoreObj);
  }, [trigger]);

  let handleDeleteReview = (e, username, comment) => {
    e.preventDefault();
    console.log(props);
    deleteReview({ book: props.book, reviews: { username, comment } });
    setTrigger(true);

    setTimeout(() => {
      setTrigger(false);
      ResetResponse();
      props.setReviewTrigger(false);
    }, 1000);
  };

  return (
    <>
      <Popup trigger={trigger}>{StoreObj.adminState.response}</Popup>
      {props.trigger && StoreObj.adminState.reviews && (
        <div className="modal-bg modal">
          <div className="modal-content border border-dark shadow rounded">
            <div className="mb-3">
              <button
                className="ImgModal-Close bg-dark text-white float-end border-none"
                onClick={() => props.setReviewTrigger(false)}
              >
                X
              </button>
            </div>
            <div className="text-center">
              <h1 className="bg-dark text-white p-1 ">
                Total Reviews : {StoreObj.adminState.reviews.length}
              </h1>
            </div>

            <div className="orders-table">
              <table class="table container">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">Sno.</th>
                    <th scope="col">Username</th>
                    <th scope="col">comment</th>
                    <th scope="col">Comment Date</th>
                    <th scope="col">Rating</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {StoreObj.adminState.reviews.map((reviewObj, ind) => {
                    return (
                      <tr key={ind}>
                        <th scope="row">{ind + 1}</th>
                        <td>{reviewObj.username}</td>
                        <td>{reviewObj.comment.substring(0, 30)}...</td>
                        <td>{reviewObj.reviewdate}</td>
                        <td>{reviewObj.rating}</td>
                        <td>
                          <button
                            className="btn btn-dark border border-white text-white"
                            onClick={(e) =>
                              handleDeleteReview(
                                e,
                                reviewObj.username,
                                reviewObj.comment
                              )
                            }
                          >
                            Delete Review
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {props.trigger && StoreObj.adminState.reviews === null && (
        <div className="modal-bg">
          <div className="modal-content border border-dark shadow rounded">
            <button
              className="ImgModal-Close bg-dark text-white float-end border-none"
              onClick={() => props.setReviewTrigger(false)}
            >
              X
            </button>
            <h1>No comments on this book</h1>
          </div>
        </div>
      )}
    </>
  );
}

export default ReviewsAndRatings;
