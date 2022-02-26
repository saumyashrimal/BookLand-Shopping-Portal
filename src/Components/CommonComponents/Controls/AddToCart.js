import { useState } from "react";
import booksActionCreator from "../../../Store/booksActionCreator";
import componentStateActionCreator from "../../../Store/componentStateActionCreator";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Popup from "./Popup";

function AddToCart(props) {
    let history = useHistory();
  //state for confirmation of book added to cart
  let [triggerPopup, setTriggerPopup] = useState(false);

  let StoreObj = useSelector((store) => store);
  const dispatch = useDispatch();
  const { addToCart, getCartData, adjustOty , ResetResponse } = bindActionCreators(
    booksActionCreator,
    dispatch
  );
  const { setCartState, setAddToCartState } = bindActionCreators(
    componentStateActionCreator,
    dispatch
  );

  //function to handle add to cart
  let handleAddtoCart = (e) => {
    e.preventDefault();
    if(StoreObj.componentState.LoginState){
    let user = JSON.parse(localStorage.getItem("user"));
    let bookmodel = props.bookObj.booksmodel;
    let qty = 1;
    let book = { bookmodel, qty };
    let cartObj = { email: user.email, book };
    //check if the item already exist in cart
    let existingItem = StoreObj.bookState.cartItems
      ? StoreObj.bookState.cartItems.find(
          (cobj) => cobj.bookObj.booksmodel === bookmodel
        )
      : null;

      console.log(existingItem)
      console.log(StoreObj.bookState.cartItems)
    if (existingItem !== null && existingItem !== undefined) {
      let newqty = (+existingItem.qty) + 1;
      let newBook = { bookmodel, qty:newqty };
      let newCartObj = { email: user.email, book:newBook };

      //update the qty in the existing book
      adjustOty(newCartObj);
      setTriggerPopup(true);
      setTimeout(() => {
        setTriggerPopup(false);
        getCartData(user.email);
        setAddToCartState();
        ResetResponse()
      }, 1000);
    } 

    else {
      console.log("inside add to cart ", cartObj);

      addToCart(cartObj);
      setTriggerPopup(true);
      setTimeout(() => {
        setTriggerPopup(false);
        getCartData(user.email);
        setAddToCartState();
        ResetResponse()
      }, 1000);
    }
  }
  else{
    history.push("/signin")
  }
  };

  return (
    <>
      <Popup trigger={triggerPopup}>
        <h4>{StoreObj.bookState.response}</h4>
      </Popup>
      <button
        className="btn btn-light border border-dark  text-dark my-4 mx-2"
        onClick={handleAddtoCart}
      >
        Add to Cart
      </button>
    </>
  );
}

export default AddToCart;
