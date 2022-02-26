import axios from "../helpers/axios";


const getBooks = (selleremail) => {
    console.log(selleremail);
    return (dispatch) => {
      //axios call to create review
      axios
        .get(`/seller/gettotalbooks`, {params:{selleremail:selleremail}})
        .then((res) => {
          dispatch({
            type: "getBooks",
            payload: res.data.message,
          });
        })
        .catch((err) => console.log(err.message));
    };
  };



  const getOrders = (selleremail) => {
    return (dispatch) => {
      //axios call to create review
      axios
        .get(`/seller/gettotalorders`, {params:{selleremail:selleremail}})
        .then((res) => {
            console.log(res)
          dispatch({
            type: "getOrders",
            payload: res.data.message,
          });
        })
        .catch((err) => console.log(err.message));
    };
  };


  const setCurrentBook = (bookObj) => {
    return (dispatch) => {
      //axios call to create review
          dispatch({
            type: "setCurrentBook",
            payload: bookObj,
          });
    };
  };

  const setCurrentOrder = (orderObj) => {
    return (dispatch) => {
      //axios call to create review
          dispatch({
            type: "setCurrentOrder",
            payload: orderObj,
          });
    };
  };


  export default {getBooks , getOrders ,setCurrentBook , setCurrentOrder}


