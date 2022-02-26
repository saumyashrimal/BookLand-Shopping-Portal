import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Logo from "../Logo";
import HeaderStyles from "./Header.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import RoomIcon from "@material-ui/icons/Room";
import SubHeader from "./SubHeader";
import SearchBar from "../Controls/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import booksActionCreator from "../../../Store/booksActionCreator";
import componentStateActionCreator from "../../../Store/componentStateActionCreator";
import { bindActionCreators } from "redux";
import AddAddressPopUP from "../Controls/AddAddressPopUP";
import axios from "../../../helpers/axios";
import SideNav from "../Controls/SideNav";

function Header() {
  let [trigger, setTrigger] = useState(false);
  let history = useHistory();
  const dispatch = useDispatch();
  //trigger for add Address pop up
  let [addressTrigger, setAddressTrigger] = useState(false);
  const { getCartData, getOrders } = bindActionCreators(
    booksActionCreator,
    dispatch
  );
  const { setCartState, setaddressList, setOrderState } = bindActionCreators(
    componentStateActionCreator,
    dispatch
  );
  let StoreObj = useSelector((store) => store);

  //cart count
  let [cartCount, setCartCount] = useState(0);

  //get username from
  let username = StoreObj.componentState.LoginState
    ? localStorage.getItem("username")
    : "Sign in";

  console.log("inside header ", StoreObj.componentState.addressList);
  let permanentAddress =
    StoreObj.componentState.addressList !== null &&
    StoreObj.componentState.addressList.length !== 0
      ? StoreObj.componentState.addressList[0].address
      : "Your Address";

  let [user, setUser] = useState(username);

  let handleSignIn = (e) => {
    if (!StoreObj.componentState.LoginState) {
      e.preventDefault();
      history.push("/signin");
    }
  };

  useEffect(() => {
    let totalBooks = 0;
    if (
      StoreObj.componentState.LoginState &&
      StoreObj.bookState.cartItems !== null &&
      StoreObj.bookState.cartItems.length !== 0
    ) {
      StoreObj.bookState.cartItems.forEach((cobj) => {
        totalBooks += +cobj.qty;
      });
    }
    setCartCount(totalBooks);

    // let email = email = JSON.parse(localStorage.getItem("user")).email;
  }, [cartCount, StoreObj.bookState.cartItems]);

  //handle cart Click

  let handleCartClick = (e) => {
    e.preventDefault();
    setCartState(true);
    history.push("/cartItems");
  };

  let handleAddClick = (e) => {
    e.preventDefault();
    setAddressTrigger(true);
  };

  let handleOrdersClick = (e) => {
    e.preventDefault();
    setOrderState(true);
    history.push("/orders");
  };

  return (
    <>
      <AddAddressPopUP
        trigger={addressTrigger}
        setAddressTrigger={setAddressTrigger}
      />
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        {/* burger icon */}
        <button
          className="navbar-toggler "
          type="button"
          data-toggle="collapse"
          onClick={(e) => {
            setTrigger(true);
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="sidenav ">
        <SideNav trigger={trigger} setTrigger={setTrigger} />
        </div>

        <div className="logo">
          {/* logo */}
          <a className="navbar-brand ms-2 py-4" href="#">
            <Logo textColor="white" />
          </a>
        </div>

        {/* cart div hidden */}
        <div className="cartdiv">
          <a className="cartlink" href="#" onClick={handleCartClick}>
            <ShoppingCartIcon />
            <span className="text-white">
              <span className="">{cartCount}</span>
            </span>
          </a>
        </div>

        {/* location */}
        <div id="address">
          <a
            className="nav-item bg-transparent border-0 text-white"
            id="Address"
            onClick={handleAddClick}
          >
            <RoomIcon />
            {permanentAddress.substring(0, 15)}...
          </a>
        </div>

        {/* search bar */}
        <SearchBar />

        <div className="nav-menu" id="navbarNav">
          <ul className="navbar-nav ms-auto me-4">
            <li className="nav-item active">
              <a className="nav-link bg-transparent" onClick={handleSignIn}>
                Hello, <span classname="username"> {user}</span>
                <span className="d-block ">
                  <p>Account & Lists</p>
                </span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={handleOrdersClick} href="#">
                Orders
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={handleCartClick} href="#">
                <ShoppingCartIcon />
                <span className="text-white">
                  <span className="">{cartCount}</span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      
      <div className="subheader">
        <SubHeader />
      </div>
    </>
  );
}

export default Header;
