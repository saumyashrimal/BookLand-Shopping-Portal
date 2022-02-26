import { useState, useEffect } from "react";
import "./SideNavStyles.css";
import booksActionCreator from "../../../Store/booksActionCreator";
import componentStateActionCreator from "../../../Store/componentStateActionCreator";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../../helpers/axios";
import { useHistory } from "react-router-dom";

function SideNav(props) {
  console.log(props);

  //get the userdetail
  let username = localStorage.getItem("username") ?? "";

  let history = useHistory();
  console.log("subheader rendered");
  let StoreObj = useSelector((store) => store);
  let LoginState = StoreObj.componentState.LoginState;
  const dispatch = useDispatch();
  const { getBooksByCategory, getCartData } = bindActionCreators(
    booksActionCreator,
    dispatch
  );
  const { setBookListState, setLoginState , setHomeState , setOrderState} = bindActionCreators(
    componentStateActionCreator,
    dispatch
  );
  //categories list
  let [categories, setCategories] = useState([]);
  let email = StoreObj.componentState.LoginState
    ? JSON.parse(localStorage.getItem("user")).email
    : "";

  useEffect(() => {
    if (StoreObj.componentState.LoginState) {
      getCartData(email);
    }
    // get all the categories
    axios
      .get("books/getcategories")
      .then((res) => {
        setCategories(res.data.message);
        console.log(categories);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  //to handle category select
  let handleCategorySelect = (e, cObj) => {
    e.preventDefault();
    console.log(cObj);
    setBookListState(true);
    getBooksByCategory(cObj);
    props.setTrigger(false);
    history.push("/booklist");
  };

  let handleLogout = () => {
    console.log("inside logout");
    localStorage.clear();
    setLoginState(false);
    history.push("/signin");
  };

  let handleHome = (e) => {
    e.preventDefault();
    setHomeState(true);
    history.push("/home")
  }


  let handleOrders = (e) => {
    e.preventDefault();
    setOrderState(true);
    history.push("/orders");

  }

  return (
    <>
      {props.trigger && (
        <div className="sidenav bg-white mt-3 p-3">
          <div className="close-btn float-end mt-4 ">
            <button
              className="btn btn-dark text-white"
              onClick={(e) => {
                props.setTrigger(false);
              }}
            >
              X
            </button>
          </div>
          <div className="py-4 px-3 mb-4 bg-light mt-4">
            <ul className="navContent mt-5" id="navContent">
              <li>
                <h4>
                  <a href="" onClick={handleHome}> Home </a>
                </h4>
              </li>
              <li>
                <h4>
                  <a href="" onClick={handleOrders}> Your Orders </a>
                </h4>
              </li>
              <li>
                <h2>Categories</h2>
                <ul className="navbar-nav ms-3 text-white row">
                  {categories.map((cObj, ind) => {
                    return (
                      <li key={ind} className="nav-item active col-sm-2">
                        <a
                          className="nav-link text-dark"
                          href="#"
                          onClick={(e) => {
                            handleCategorySelect(e, cObj);
                          }}
                        >
                          {cObj.category}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li>
                {!LoginState && (
                  <h4>
                    <a href=""> Sign In </a>
                  </h4>
                )}
                {LoginState && (
                  <h4>
                    <a href="" onClick={handleLogout}> Log out </a>
                  </h4>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default SideNav;
