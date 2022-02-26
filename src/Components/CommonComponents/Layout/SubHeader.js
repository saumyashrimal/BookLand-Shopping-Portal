import { useEffect, useState } from "react";
import booksActionCreator from "../../../Store/booksActionCreator";
import componentStateActionCreator from "../../../Store/componentStateActionCreator";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../../helpers/axios"
import { useHistory } from "react-router-dom";

function SubHeader() {

  //get the userdetail
  let username = localStorage.getItem("username")??"";
  
  let history = useHistory();
  console.log("subheader rendered");
  let StoreObj = useSelector((store) => store);
  const dispatch = useDispatch();
  const { getBooksByCategory ,getCartData } = bindActionCreators(
    booksActionCreator,
    dispatch
  );
  const { setBookListState,setLoginState } = bindActionCreators(
    componentStateActionCreator,
    dispatch
  );
  //categories list
  let [categories, setCategories] = useState([]);
  let email = (StoreObj.componentState.LoginState) ?  JSON.parse(localStorage.getItem("user")).email : "" ;

  useEffect(() => {

    if(StoreObj.componentState.LoginState){
      getCartData(email)
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
    history.push("/booklist")
  };

  let handleLogout = () => {
    console.log("inside logout")
    localStorage.clear();
    setLoginState(false)
    history.push("/signin")
  }

  return (
    <>
      <nav className="navbar navbar-expand bg-secondary subheader">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-3 text-white row">
            {categories.map((cObj, ind) => {
              return (
                <li key={ind} className="nav-item active col-sm-2">
                  <a
                    className="nav-link"
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
        </div>
        {username !== "" &&
            <div className="ms-auto me-3"><button className="btn btn-dark  border border-light text-white" onClick={handleLogout}>Logout</button></div>
         }
      
      </nav>
    </>
  );
}

export default SubHeader;
