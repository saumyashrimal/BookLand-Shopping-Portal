import {useState} from "react";
import SellersLogo from "../CommonComponents/SellersLogo";
import SellerSubheader from './SellerSubheader';
import {useHistory} from "react-router-dom";
import componentStateActionCreator from "../../Store/componentStateActionCreator";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

function Header() {


  let history = useHistory();
  const dispatch = useDispatch();

  const { setLoginState } = bindActionCreators(
    componentStateActionCreator,
    dispatch
  );

     //get username from 
  let username = localStorage.getItem("username") ?? "Sign in" ;
  
  let [user, setUser] = useState(username);


  let handleLogout = () => {
    console.log("inside logout")
    localStorage.clear();
    setLoginState(false)
    history.push("/signin")
  }


  return (
      <>
    <div className="navbar navbar-dark bg-dark">


    {/* burger icon */}
    <button
          className="navbar-toggler "
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

    {/* Logo */}
      <div className="sellerlogo">
        <a className="navbar-brand pb-3 ms-2" href="#">
          <SellersLogo />
        </a>
      </div>

      <div className="nav-menu" id="navbarNav">
          <ul className="navbar-nav ms-auto me-4 text-white d-flex flex-row">
            <li className="nav-item active me-5">
              <a className="nav-link bg-transparent">
                Hello, <span className="username"> {user}</span>
              </a>
            </li>
            <li className="nav-item me-4">
              <a className="nav-link" href="#" onClick={handleLogout}>
               Logout
              </a>
            </li>
          </ul>
        </div>

    </div>
    <SellerSubheader/>
  
  </>
  
  );
}

export default Header;
