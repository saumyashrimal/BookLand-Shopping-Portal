import axios from "../helpers/axios";

const getAllBooks = () => {
  return (dispatch) => {
    //axios call to create review
    axios
      .get(`/books/getallbooks`)
      .then((res) => {
        console.log(res);
        dispatch({
          type: "getAllBooks",
          payload: res.data.message,
        });
      })
      .catch((err) => console.log(err.message));
  };
};

const getAllOrders = () => {
  return (dispatch) => {
    //axios call to create review
    axios
      .get(`/user/getallorders`)
      .then((res) => {
        console.log(res);
        dispatch({
          type: "getAllOrders",
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

const setCurrentUser = (userObj) => {
    return (dispatch) => {
      //axios call to create review
      dispatch({
        type: "setCurrentUser",
        payload: userObj,
      });
    };
  };


  const ResetReviews = () => {
    return (dispatch) => {
      //axios call to create review
      dispatch({
        type: "ResetReviews",
      });
    };
  };

const getbookReviews = (book) => {
  return async (dispatch) => {
    //axios call to create review
    await axios
      .get(`/reviews/getreviews`, { params: { book: book } })
      .then((res) => {
        console.log(res);
        dispatch({
          type: "getbookReviews",
          payload: res.data.message,
        });
      })
      .catch((err) => console.log(err.message));
  };
};

const addcategory = (category) => {
  return (dispatch) => {
    //axios call to create review
    axios
      .post(`/books/addcategory`, category)
      .then((res) => {
        console.log(res);
        dispatch({
          type: "addcategory",
          payload: res.data.message,
        });
      })
      .catch((err) => console.log(err.message));
  };
};

const getcategories = () => {
  return (dispatch) => {
    //axios call to create review
    axios
      .get(`/books/getcategories`)
      .then((res) => {
        console.log(res);
        dispatch({
          type: "getcategories",
          payload: res.data.message,
        });
      })
      .catch((err) => console.log(err.message));
  };
};


const getUserData = () => {
    return (dispatch) => {
      //axios call to create review
      axios
        .get(`/user/getallusers`)
        .then((res) => {
          console.log(res);
          dispatch({
            type: "getUserData",
            payload: res.data.message,
          });
        })
        .catch((err) => console.log(err.message));
    };
  };




  const deleteUser = (email) => {
    return (dispatch) => {
      //axios call to create review
      axios
        .put(`/user/deleteuser`,{email:email})
        .then((res) => {
          console.log(res);
          dispatch({
            type: "deleteUser",
            payload: res.data.message,
          });
        })
        .catch((err) => console.log(err.message));
    };
  };

  const deleteBook = (bookmodel) => {
    return (dispatch) => {
      //axios call to create review
      axios
        .delete(`/books/deletebook` , {params:{bookmodel:bookmodel}})
        .then((res) => {
          console.log(res);
          dispatch({
            type: "deleteBook",
            payload: res.data.message,
          });
        })
        .catch((err) => console.log(err.message));
    };
  };


  const deleteReview = (bookObj) => {
    return (dispatch) => {
      //axios call to create review
      axios
        .put(`/reviews/deletereview` , bookObj)
        .then((res) => {
          console.log(res);
          dispatch({
            type: "deleteReview",
            payload: res.data.message,
          });
        })
        .catch((err) => console.log(err.message));
    };
  };

  const ResetResponse = () => {
    return(dispatch) => {
        dispatch(
            {
                type:"ResetResponse",
            }
        )
    }
}




export default {
  getAllBooks,
  getAllOrders,
  setCurrentBook,
  setCurrentOrder,
  setCurrentUser,
  getbookReviews,
  addcategory,
  getcategories,
  getUserData,
  deleteUser,
  deleteBook,
  deleteReview,
  ResetResponse,
  ResetReviews
};
