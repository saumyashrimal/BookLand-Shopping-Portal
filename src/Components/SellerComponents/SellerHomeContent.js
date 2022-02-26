import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SellersActionReducer from "../../Store/SellersActionReducer";
import booksActionCreator from "../../Store/booksActionCreator";
import componentStateActionCreator from "../../Store/componentStateActionCreator";
import { bindActionCreators } from "redux";
import SellerDashboard from "./SellerDashboard";

function SellerHomeContent() {
  let StoreObj = useSelector((store) => store);

  const dispatch = useDispatch();

  const { getBooks, getOrders } = bindActionCreators(
    SellersActionReducer,
    dispatch
  );

  //get the user object from the local storage
  let selleremail = JSON.parse(localStorage.getItem("user")).email;
  useEffect(() => {
    getBooks(selleremail);
    getOrders(selleremail);
  }, []);

  return (
      <div>
        {StoreObj.sellerState.Books && StoreObj.sellerState.Orders && (
          <div className="row">
            <div className="col-md-5 p-5 bg-dark text-white mx-3 my-4 ">
              <h1>Total Books : {StoreObj.sellerState.Books.length}</h1>
            </div>
            <div className="col-md-5 p-5 bg-dark text-white mx-3 my-4 ">
              <h1>Total Orders : {StoreObj.sellerState.Orders.length}</h1>
            </div>
          </div>
        )}
      </div>
  );
}

export default SellerHomeContent;
