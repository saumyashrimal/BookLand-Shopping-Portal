let initialState = {
  homeState: true,
  BookListState: false,
  BookState: false,
  CartState: false,
  LoginState: false,
  addToCartState: 0,
  OrderState: false,
  addressList:null,
  EditBookState:false,
};

const componentStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case "setHomeState":
      return {
        ...state,
        homeState: true,
        BookListState: false,
        BookState: false,
        CartState: false,
        OrderState: false,
        EditBookState:false
      };

    case "setBookListState":
      return {
        ...state,
        homeState: false,
        BookListState: true,
        BookState: false,
        CartState: false,
        OrderState: false,
        EditBookState:false
      };

    case "setBookState":
      return {
        ...state,
        homeState: false,
        BookListState: false,
        BookState: true,
        CartState: false,
        OrderState: false,
        EditBookState:false
      };

    case "setCartState":
      return {
        ...state,
        homeState: false,
        BookListState: false,
        BookState: false,
        CartState: true,
        OrderState: false,
        EditBookState:false
      };

    case "setLoginState":
      return { ...initialState, LoginState: action.payload };

    case "setAddToCartState":
      return { ...state, addToCartState: state.addToCartState + 1 };

    case "setOrderState":
      return {
        ...state,
        homeState: false,
        BookListState: false,
        BookState: false,
        CartState: false,
        OrderState: true,
        EditBookState:false
      };

      case "setEditBookState":
        return {
          ...state,
        homeState: false,
        BookListState: false,
        BookState: false,
        CartState: false,
        OrderState: false,
        EditBookState: action.payload
        }

      case "setaddressList":
        return {...state , addressList:action.payload}

    default:
      return state;
  }
};

export default componentStateReducer;
