import axios from "../helpers/axios";

const createReview = (ReviewObj) => {
  return (dispatch) => {
    //axios call to create review
    axios
      .post(`/reviews/createreview`, ReviewObj)
      .then((res) => {
        dispatch({
          type: "createReview",
          payload: res.data.message,
        });
      })
      .catch((err) => console.log(err.message));
  };
};

const updateReview = (ReviewObj) => {
    return (dispatch) => {
      //axios call to create review
      axios
        .post(`/reviews/addreview`, ReviewObj)
        .then((res) => {
          dispatch({
            type: "updateReview",
            payload: res.data.message,
          });
        })
        .catch((err) => console.log(err.message));
    };
  };

const getReviews = (book) => {
  return (dispatch) => {
    axios
        .get(`/reviews/getreviews`, { params: { book:book } })
        .then((res) => {
          dispatch({
            type: "getReviews",
            payload: res.data.message,
          });
        })
        .catch((err) => console.log(err.message));
  };
};


export default {createReview , updateReview ,getReviews}