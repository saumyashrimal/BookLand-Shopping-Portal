let initialState = {
  Books: null,
  Orders: null,
  currentBook: null,
  currentOrder: null,
};

const SellerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "getBooks":
      return { ...state, Books: action.payload };
    case "getOrders":
      return { ...state, Orders: action.payload };

    case "setCurrentBook":
      return { ...state, currentBook: action.payload };

    case "setCurrentOrder":
      return { ...state, currentOrder: action.payload };

    default:
      return state;
  }
};

export default SellerReducer;
