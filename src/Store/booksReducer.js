import axios from "../helpers/axios";

let initialState = {
  //{booksmodel: "",bookname: "",bookauthor: "",booktitle: "",bookprice: 0,bookdescription: "",booklevel: "",parentcategory: "",booksPhotos: null,selleremail:""}
  books:null, 
  cartItems:null,
  currentItem :null,
  response : "",
  searchSuggestions : null,
  orders:null


}

const Reducer = (state = initialState, action) => {
  switch (action.type) {

    //create book
    case "createBook":
      return {...state,response:action.payload }


    case "getCartData" : 
    return {...state,cartItems:action.payload}

    case "addToCart" : 

    return {...state,response:action.payload}


    case "removeFromCart":
      return {...state,response:action.payload}

    case "adjustOty" :
      return {...state,response:action.payload}


    
    case "loadCurrentItem":
      return {
        ...state,currentItem:action.payload
      }


    case "getBooksByCategory":
      return {...state,books:action.payload}


      case "getBooksOnSearch":
        return {...state,books:action.payload}

    case "getAutocompleteListOfBooks" : 
    return {...state,searchSuggestions:action.payload}


    case "ResetResponse":
      return {...state , response:""}


      case "getOrders":
        return {...state , orders:action.payload}


      case "placeOrder":
        return {...state , response:action.payload}

      case "updateOrderStatus":
        return {...state , response:action.payload}

      case "removeWholeCart":
        return {...state , response:action.payload}

      case "getbookBybookmodel":
        return {...state , currentItem:action.payload}

      case "deleteBook" : 
      return {...state , response:action.payload}

      case "updateBook" : 
      return {...state , response:action.payload}

    default:
      return state;
  }
};

export default Reducer;
