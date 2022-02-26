let initialState = {
  currentBook: null,
  currentOrder: null,
  books: null,
  orders: null,
  reviews: null,
  currentReview: null,
  users: null,
  currentUser: null,
  response: "",
  categories: null,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    //create book
    case "getAllBooks":
      return { ...state, books: action.payload };

    case "getAllOrders":
      return { ...state, orders: action.payload };

    case "setCurrentBook":
      return { ...state, currentOrder: action.payload };

    case "getbookReviews":
      return { ...state, reviews: action.payload };

    case "addcategory":
      return { ...state, response: action.payload };

    case "getcategories":
      return {
        ...state,
        categories: action.payload,
      };

    case "getUserData":
      return { ...state, users: action.payload };

    case "deleteUser":
      return { ...state, response: action.payload };

    case "deleteBook":
      return { ...state, response: action.payload };

    case "ResetResponse":
      return { ...state, response: "" };

    case "deleteReview":
      return { ...state, response: action.payload };


    case "setCurrentUser":
    return { ...state, currentUser: action.payload };

    case "ResetReviews":
      return { ...state, reviews: null };


    default:
      return state;
  }
};

export default Reducer;
