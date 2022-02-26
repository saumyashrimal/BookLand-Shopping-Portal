import { useState, useEffect } from "react";
import SectionDevider from "../CommonComponents/SectionDevider";
import Logo from "../CommonComponents/Logo";
import { useHistory } from "react-router-dom";
import SellerRegistration from "../SellerComponents/SellerRegistration";
import ErrorActionCreator from "../../Store/SellersActionReducer";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../helpers/axios";

function Register() {
  let StoreObj = useSelector((store) => store);
  const dispatch = useDispatch();

  let initialerrState = {
    usernameErr: "",
    emailErr: "",
    passwordErr: "",
    confirmPassErr: "",
  };

  let [errState, setErrState] = useState(initialerrState);
  //input states
  let [userObj, setUserObj] = useState({
    username: "",
    email: "",
    password: "",
  });
  let [confirmPass, setConfirmPass] = useState("");
  let history = useHistory();
  let handleSignIn = (e) => {
    e.preventDefault();
    history.goBack();
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    console.log("userObj = ", userObj);

    setErrState(initialerrState);
    //error handling
    if (userObj.username === "") {
      setErrState({...initialerrState , usernameErr: "Username required" });
    } else if (userObj.email === "") {
      setErrState({ ...initialerrState, emailErr: "Email required" });
    } else if (userObj.password === "") {
      setErrState({ ...initialerrState, passwordErr: "Password required" });
    } else if (userObj.password !== confirmPass) {
      setErrState({ ...initialerrState, confirmPassErr:"confirm password does not matches" });
    }
    //axios post request to post the userObj
    else {
      axios
        .post("/user/createuser", userObj)
        .then((res) => {
          alert(res.data.message);
          history.push("/signin");
        })
        .catch((err) => alert(err.message));
    }
  };

  //handle create business account
  let handleCreateBAccount = (e) => {
    e.preventDefault();
    history.push("/sellersregister");
  };

  return (
    <fragment className="d-flex flex-column ">
      <form onSubmit={handleSubmit}>
        <div className="text-center mt-3">
          <Logo />
        </div>
        <div className=" form-group border border-secondary shadow p-3 mb-5 bg-white rounded w-25 mx-auto m-3 p-4">
          <h4>Create Account</h4>
          {/* username field */}
          <label htmlFor="un" className="form-label">
            UserName
          </label>
          <input
            type="text"
            className="form-control"
            id="un"
            value={userObj.username}
            onChange={(e) =>
              setUserObj({ ...userObj, username: e.target.value })
            }
            placeholder="Enter your username"
          />

          {errState.usernameErr && (
            <p className="text-danger">{errState.usernameErr}</p>
          )}

          {/* Email field */}
          <label htmlFor="email" className="form-label mt-3">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={userObj.email}
            onChange={(e) => setUserObj({ ...userObj, email: e.target.value })}
            placeholder="Enter your Email Address"
          />

          {errState.emailErr && (
            <p className="text-danger">{errState.emailErr}</p>
          )}

          {/* password field */}
          <label htmlFor="pwd" className="form-label mt-3">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="pwd"
            value={userObj.password}
            onChange={(e) => setUserObj({...userObj , password:e.target.value})}
            placeholder="Enter your password"
          />
          {errState.passwordErr && (
            <p className="text-danger">{errState.passwordErr}</p>
          )}

          {/* confirm password field */}
          {/* password field */}
          <label htmlFor="cpwd" className="form-label mt-3">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpwd"
            value={confirmPass}
            placeholder="Enter your password again"
            onChange={(e) => setConfirmPass(e.target.value)}
          />
          {errState.confirmPassErr && (
            <p className="text-danger">{errState.confirmPassErr}</p>
          )}

          <div className="text-center">
            <button type="submit" className="btn btn-primary m-3 ">
              Register
            </button>
          </div>

          {/* section devider for Business Account*/}
          <SectionDevider
            text="Want to Create a Business Account?"
            lwidth="20%"
          />
          {/* create or register button */}
          <p className="text-center">
            <a className="text-primary" href="#" onClick={handleCreateBAccount}>
              Create Business Account
            </a>{" "}
          </p>
        </div>
      </form>
      <div className="w-25 mx-auto mb-3">
        {/* section devider for register section */}
        <SectionDevider text="Already have an account?" lwidth="20%" />
        {/* create or register button */}
        <p className="text-center">
          Already have an account?{" "}
          <a className="text-primary" href="#" onClick={handleSignIn}>
            Sign in
          </a>{" "}
        </p>
      </div>
    </fragment>
  );
}

export default Register;
