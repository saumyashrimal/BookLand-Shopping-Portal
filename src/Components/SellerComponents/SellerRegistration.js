import { useState } from "react";
import { useHistory } from "react-router";
import Logo from "../CommonComponents/Logo";
import axios from "../../helpers/axios";
import { useEffect } from "react";

function SellerRegistration() {
  let [confirmPass, setConfirmPass] = useState("");
  let [sellerObj, setSellerObj] = useState({
    businessname: "",
    email: "",
    password: "",
    username: "",
    contactno: "",
  });

  let initialErrState = {
    businessnameErr: "",
    emailErr: "",
    passwordErr: "",
    usernameErr: "",
    contactnoErr: "",
    confirmPassErr: "",
  };

  let [errorState, setErrorState] = useState(initialErrState);

  let history = useHistory();

  // form submit handle function
  let handleSubmit = (e) => {
    e.preventDefault();
    //error handling
    if (sellerObj.businessname === "") {
      setErrorState({
        ...initialErrState,
        businessnameErr: "Business name is required",
      });
    } else if (sellerObj.email === "") {
      setErrorState({ ...initialErrState, emailErr: "Email is required" });
    } else if (sellerObj.username === "") {
      setErrorState({
        ...initialErrState,
        usernameErr: "username is required",
      });
    } else if (sellerObj.contactno === "") {
      setErrorState({
        ...initialErrState,
        contactnoErr: "contact no. is required",
      });
    } else if (
      sellerObj.contactno !== "" &&
      sellerObj.contactno.match(/^[0-9]{10,10}$/g) === null
    ) {
      setErrorState({
        ...initialErrState,
        contactnoErr: "contact no. should be of 10 digits",
      });
    } else if (sellerObj.password === "") {
      setErrorState({
        ...initialErrState,
        passwordErr: "Password is required",
      });
    } else if (sellerObj.password !== confirmPass) {
      setErrorState({
        ...initialErrState,
        confirmPassErr: "Password does not match",
      });
    } else {
      console.log(sellerObj);

      //axios call for creating sellers account
      axios
        .post("/seller/createSelleraccount", sellerObj)
        .then((res) => {
          alert(res.data.message);
          history.push("/signin");
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  useEffect(() => {
    console.log("sellers register page rendered");
  }, []);

  return (
    <fragment className="d-flex flex-column ">
      <form onSubmit={handleSubmit}>
        <div className="text-center mt-3">
          <Logo />
        </div>
        <div className=" form-group border border-secondary shadow p-3 mb-5 bg-white rounded w-50 mx-auto m-3 p-4">
          <h4>Create Seller Account</h4>
          {/* Business Name */}
          <label htmlFor="bn" className="form-label">
            Business Name
          </label>
          <input
            type="text"
            className="form-control"
            id="bn"
            value={sellerObj.businessname}
            onChange={(e) =>
              setSellerObj({ ...sellerObj, businessname: e.target.value })
            }
            placeholder="Enter your Business name"
          />

          {errorState.businessnameErr && (
            <p className="text-danger">{errorState.businessnameErr}</p>
          )}

          {/* username field */}
          <label htmlFor="un" className="form-label">
            UserName
          </label>
          <input
            type="text"
            className="form-control"
            id="un"
            value={sellerObj.username}
            onChange={(e) =>
              setSellerObj({ ...sellerObj, username: e.target.value })
            }
            placeholder="Enter your username"
          />
          {errorState.usernameErr && (
            <p className="text-danger">{errorState.usernameErr}</p>
          )}

          {/* Email field */}
          <label htmlFor="email" className="form-label mt-3">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={sellerObj.email}
            onChange={(e) =>
              setSellerObj({ ...sellerObj, email: e.target.value })
            }
            placeholder="Enter your Email Address"
          />

          {errorState.emailErr && (
            <p className="text-danger">{errorState.emailErr}</p>
          )}

          {/* contact no */}
          <label htmlFor="cn" className="form-lable mt-3">
            Contact No
          </label>
          <input
            type="number"
            className="form-control"
            id="cn"
            placeholder="enter your contact no "
            value={sellerObj.contactno}
            onChange={(e) =>
              setSellerObj({ ...sellerObj, contactno: e.target.value })
            }
          />
          {errorState.contactnoErr && (
            <p className="text-danger">{errorState.contactnoErr}</p>
          )}

          {/* password field */}
          <label htmlFor="pwd" className="form-label mt-3">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="pwd"
            value={sellerObj.password}
            onChange={(e) =>
              setSellerObj({ ...sellerObj, password: e.target.value })
            }
            placeholder="Enter your password"
          />
          {errorState.passwordErr && (
            <p className="text-danger">{errorState.passwordErr}</p>
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
            placeholder="Enter your password again"
            value={confirmPass}
            onChange={(e) => {setConfirmPass(e.target.value)}}
          />
          {errorState.confirmPassErr && (
            <p className="text-danger">{errorState.confirmPassErr}</p>
          )}

          <div className="text-center">
            <button type="submit" className="btn btn-primary m-3 ">
              Register
            </button>
          </div>
        </div>
      </form>
    </fragment>
  );
}

export default SellerRegistration;
