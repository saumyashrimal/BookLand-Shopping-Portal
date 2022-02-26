let initialState = {
  response: "",
  reviews: null,
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case "createReview":
      return { ...state, response: action.payload };

    case "updateReview":
      return { ...state, response: action.payload };

      case "getReviews":
          console.log({ ...state, reviews:action.payload});
      return { ...state, reviews:action.payload };

    default:
      return state;
  }
};

export default reviewReducer;
