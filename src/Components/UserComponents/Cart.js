import React from "react";
import BookListCard from "../BooksComponent/BookListCard";
import Home from "../Home";
import componentStateActionCreator from "../../Store/componentStateActionCreator";
import booksActionCreator from "../../Store/booksActionCreator";

import { useSelector, useDispatch } from "react-redux";
import CartStyles from "./CartStyles.css";
import {useHistory} from "react-router-dom"

function Cart() {

    let history = useHistory() ;
  let StoreObj = useSelector((store) => store);
  const dispatch = useDispatch();

  let CartItems = StoreObj.bookState.cartItems;

  let totalCartAmount = 0;
  if (CartItems) {
    StoreObj.bookState.cartItems.forEach(
      (cartObj) => (totalCartAmount += cartObj.bookObj.bookprice * cartObj.qty)
    );
  }

  //   const {  } = bindActionCreators(
  //     booksActionCreator,
  //     dispatch
  //   );

  let handleCheckout = (e) => {

      e.preventDefault();
      history.push("/checkout");
  }

  return (
    <Home>
      {CartItems !== null && CartItems.length !== 0 && (
        <>
          <h1 className="bg-dark text-white text-center border border-light rounded ">
            Cart Items
          </h1>
          <div className="row d-flex">
            {/* div for cart item list  */}
            <div className="col-md-8">
              <div className="container-fluid cartItem">
                {CartItems.map((cartObj) => {
                  return (
                    <BookListCard bookObj={cartObj.bookObj} qty={cartObj.qty} />
                  );
                })}
              </div>
            </div>
            {/* div for total amount and checkout options */}
            
            
            <div className="col-md-3 border border-dark shadow checkoutdiv">
              <h5>Cart Summary</h5>
              <p>
                <span className="boldText">Total : </span>
                <span>&#8377;</span>{totalCartAmount}
              </p>
              <button className="btn btn-dark text-white" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
      {(CartItems === null || CartItems.length === 0) && (
        <div className="emptyCart container mt-5 "  >
          <img
          className="w-100 h-100"
          style={{height:"200px;"}}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKSpKomYZlD3IfGKls2it_JX0BYGbN6e_qF9w4DrTw8z0fBAEUNVnNmz7jnP8NYFz5WeM&usqp=CAU"
            alt=""
          />
        </div>
      )}
    </Home>
  );
}

export default Cart;
