import { useState } from "react";
import BookListStyle from "./BookListCard.css";
import booksActionCreator from "../../Store/booksActionCreator";
import componentStateActionCreator from "../../Store/componentStateActionCreator";
import reviewsActionCreator from "../../Store/reviewsActionCreator";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import AddToCart from "../CommonComponents/Controls/AddToCart";
import Popup from "../CommonComponents/Controls/Popup";
import StarRating from "../CommonComponents/Controls/StarRating";

function BookListCard(props) {
  let history = useHistory();
  let bookObj = props.bookObj;
  console.log(bookObj);

  let StockStatus = bookObj.availableqty > 1 ? "In Stock" : "Out Of Stock";

  //state for quantity
  let [qty, setQty] = useState(props.qty);

  //array for qty
  let qtyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  //state for showing the pop up of the api response
  let [PopUpTrigger, setPopUpTrigger] = useState(false);

  //get the user email

  let StoreObj = useSelector((store) => store);
  const dispatch = useDispatch();
  const {
    loadCurrentItem,
    removeFromCart,
    getCartData,
    adjustOty,
    ResetResponse,
  } = bindActionCreators(booksActionCreator, dispatch);
  const { getReviews } = bindActionCreators(reviewsActionCreator, dispatch);
  const { setBookState } = bindActionCreators(
    componentStateActionCreator,
    dispatch
  );

  console.log(StoreObj.componentState.CartState);
  let handleViewItem = (e) => {
    e.preventDefault();
    loadCurrentItem(bookObj);
    getReviews(bookObj.booksmodel);
    setBookState(true);
    history.push("/currentbook");
  };

  let email = null;

  if (StoreObj.componentState.LoginState) {
    email = JSON.parse(localStorage.getItem("user")).email;
  }

  //handle remove item
  let handleRemove = (e) => {
    e.preventDefault();
    //create an object to remove the book from cart

    let book = { bookmodel: bookObj.booksmodel, qty: props.qty };
    let cartObj = { email, book };
    console.log(cartObj);
    removeFromCart(cartObj);
    setPopUpTrigger(true);
    setTimeout(() => {
      getCartData(email);
      setPopUpTrigger(false);
      ResetResponse();
    }, 1000);
  };

  //handle quantity change
  let handleQtyChange = (e) => {
    e.preventDefault();
    let newQty = +e.target.value;
    let book = { bookmodel: bookObj.booksmodel, qty: newQty };
    let cartObj = { email, book };
    adjustOty(cartObj);
    setPopUpTrigger(true);
    setTimeout(() => {
      getCartData(email);
      setPopUpTrigger(false);
      ResetResponse();
    }, 1000);
    setQty(newQty);
  };

  return (
    <>
      <Popup trigger={PopUpTrigger}>{StoreObj.bookState.response}</Popup>
      <div className="card container float-center border border-dark rounded my-3 shadow w-75">
        <div className="row d-flex flex-row">
          <div className="imgcol col-md-3">
            <img
              src={bookObj.booksPhotos}
              className="card-img border border-dark rounded w-100"
              alt="..."
            />
          </div>
          <div className="col-md-6 d-flex flex-column">
            <div className="card-body">
              <h5 className="card-title">
                {bookObj.bookname.substring(0, 20)}...
              </h5>
              <p className="card-text">
                {bookObj.bookdescription.substring(0, 50)}...
              </p>
              <div className="card-price mt-auto">
                <p>Price:<span>&#8377;</span>{bookObj.bookprice}</p>
              </div>
              {!StoreObj.componentState.CartState && (
                <>
                  <div className="card-rating mt-auto">
                    <p>
                      Rating:
                      <StarRating rating={bookObj.rating} />
                    </p>
                  </div>
                  <div className="stock-status mt-auto">
                    <h5 className="text-success">{StockStatus}</h5>
                  </div>
                </>
              )}
            </div>
          </div>

          {!StoreObj.componentState.CartState && (
            <div className="col-md-3 text-center d-inline">
              <button
                className="btn btn-dark text-white my-4 px-3"
                onClick={handleViewItem}
              >
                View Item
              </button>

              <AddToCart bookObj={bookObj} />
            </div>
          )}

          {StoreObj.componentState.CartState && (
            <div className="col-md-3 text-center d-inline">
              <button
                className="btn btn-dark text-white my-1 px-2"
                onClick={handleViewItem}
              >
                View Item
              </button>

              {/* quantity input */}

              <select
                className="custom-select p-1 border-secondary rounded d-block my-1 ms-2"
                id="level"
                value={qty}
                onChange={handleQtyChange}
              >
                <option selected>{props.qty}</option>
                {qtyArray.map((qty) => (
                  <option value={qty} key={qty}>
                    {qty}
                  </option>
                ))}
              </select>

              {/* Remove the item from cart */}
              <div className="my-1">
                <button
                  className=" btn btn-danger border border-dark rounded"
                  onClick={handleRemove}
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BookListCard;
