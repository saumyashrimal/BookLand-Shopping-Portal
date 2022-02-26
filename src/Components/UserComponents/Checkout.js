import { useState } from "react";
import Logo from "../CommonComponents/Logo";
import { useSelector, useDispatch } from "react-redux";
import AddAddressPopUP from "../CommonComponents/Controls/AddAddressPopUP";
import componentStateActionCreator from "../../Store/componentStateActionCreator";
import booksActionCreator from "../../Store/booksActionCreator";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import OrderConfirmation from "../CommonComponents/Controls/OrderConfirmation";

function Checkout() {
  //payment method array
  let paymentMethods = ["Cash on delivary", "UPI Payment "];
  let [paymentMethod, setPaymentMethod] = useState("Cash on delivary");
  

  //trigger for order confirmation
  let [orderConfirmed, setOrderconfirmed] = useState(false);

  let StoreObj = useSelector((store) => store);
  const dispatch = useDispatch();
  const { setBookState } = bindActionCreators(
    componentStateActionCreator,
    dispatch
  );
  const {
    placeOrder,
    removeWholeCart,
    loadCurrentItem,
    getbookBybookmodel,
    getCartData,
    getOrders,
    ResetResponse
  } = bindActionCreators(booksActionCreator, dispatch);

  console.log(StoreObj);

  let [addressTrigger, setAddressTrigger] = useState(false);
  let history = useHistory();

  //get the user address from local storage to select
  let addressList = StoreObj.componentState.addressList;
  let [address, setAddress] = useState(addressList[0].address);
  let CartItems = StoreObj.bookState.cartItems;

  let totalCartAmount = 0;
  if (CartItems) {
    StoreObj.bookState.cartItems.forEach(
      (cartObj) => (totalCartAmount += cartObj.bookObj.bookprice * cartObj.qty)
    );
  }

  let handlePlaceOrder = (e) => {
    e.preventDefault();
    let newOrderArray = [];
    //get the userEmail
    let useremail = JSON.parse(localStorage.getItem("user")).email;

    //loop through cart items to get other details
    CartItems.forEach((cartObj) => {
      let selleremail = cartObj.bookObj.selleremail;
      let bookmodel = cartObj.bookObj.booksmodel;
      let bookname = cartObj.bookObj.bookname;
      let qty = parseInt(cartObj.qty);
      let status = "pending";
      let price = cartObj.bookObj.bookprice;
      let paymentMethodselected = paymentMethod;
      let newObj = {
        useremail,
        selleremail,
        bookmodel,
        qty,
        status,
        address,
        price,
        bookname,
        paymentmethod: paymentMethodselected,
      };
      newOrderArray.push(newObj);
    });

    console.log(newOrderArray);

    //place the order
    placeOrder(newOrderArray);
    //empty the whole cart
    removeWholeCart(useremail);
    setOrderconfirmed(true);
    getOrders(useremail);

    setTimeout(() => {
      
      getCartData(useremail);
      setOrderconfirmed(false);
      ResetResponse();
      history.push("/orders");
    }, 2000);
  };

  let handleChangeAddress = (e) => {
    e.preventDefault();
    setAddressTrigger(true);
  };

  let handleViewItem = (e, bookmodel) => {
    e.preventDefault();
    let currentItem = getbookBybookmodel(bookmodel);
    loadCurrentItem(currentItem);

    setTimeout(() => {
      setBookState(true);
      history.push("/currentbook");
    }, 500);
  };

  return (
    <>
      <AddAddressPopUP
        trigger={addressTrigger}
        setAddressTrigger={setAddressTrigger}
      />

      <OrderConfirmation
        trigger={orderConfirmed}
        setOrderconfirmed={setOrderconfirmed}
      />

      <div className="container border border-dark p-3">
        <Logo textColor="black" />
        <h3 className="bg-dark p-1 w-100 text-white text-center">
          {" "}
          Place Your Order
        </h3>

        {/* Address Section  */}
        <div className="mt-4">
          <h4>Select your Address</h4>
        </div>
        <form className="form">
          {addressList.map((addressObj,ind) => {
            return (
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="address"
                  id={addressObj.index}
                  value={addressObj.address}
                  onClick={(e) => setAddress(e.target.value)}
                />
                <label className="form-check-label" for={addressObj.index}>
                  {addressObj.address}
                </label>
              </div>
            );
          })}
          <button
            className="btn btn-dark border border-white rounded w-50"
            onClick={handleChangeAddress}
          >
            Change or Add New Address
          </button>
        </form>

        {/* Order Details */}
        <h4 className="mt-4">Order Details :</h4>
        <table class="table container w-75">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Sno.</th>
              <th scope="col">BookName</th>
              <th scope="col">Qty</th>
              <th scope="col">Total Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {CartItems.map((cObj, ind) => {
              return (
                <tr key={ind}>
                  <th scope="row">{ind + 1}</th>
                  <td>{cObj.bookObj.bookname}</td>
                  <td>{cObj.qty}</td>
                  <td>{cObj.bookObj.bookprice * cObj.qty}</td>
                  <td>
                    <button
                      className="btn btn-dark border border-white text-white"
                      onClick={(e) =>
                        handleViewItem(e, cObj.bookObj.booksmodel)
                      }
                    >
                      View Item
                    </button>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>Total : {totalCartAmount}</td>
            </tr>
          </tbody>
        </table>

        {/* payment Options */}
        <div>
          <h4>Select payment options</h4>
          <form className="form">
            {paymentMethods.map((paymentmethod,ind) => {
              return (
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id={paymentmethod}
                    name="paymentmethod"
                    value={paymentmethod}
                    onClick={(e) => {
                      setPaymentMethod(e.target.value);
                    }}
                  />
                  <label className="form-check-label" for={paymentmethod}>
                    {paymentmethod}
                  </label>
                </div>
              );
            })}
          </form>
        </div>

        {/* place order button */}
        <div className="w-100 text-center">
          <button
            className="btn btn-dark w-50 border border-white text-white float-center"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}

export default Checkout;
