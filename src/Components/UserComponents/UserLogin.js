import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import SectionDevider from "../CommonComponents/SectionDevider";
import Logo from "../CommonComponents/Logo";
import Register from "./Register";
import componentStateActionCreator from "../../Store/componentStateActionCreator";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../helpers/axios";

function UserLogin() {
  let StoreObj = useSelector((store) => store);
  const dispatch = useDispatch();

  const { setLoginState, setaddressList } = bindActionCreators(
    componentStateActionCreator,
    dispatch
  );

  //credentials state
  let [credentials, setCredentials] = useState({
    email: "",
    password: "",
    type: "",
  });

  let history = useHistory();

  const handleCreateAccount = (e) => {
    e.preventDefault();
    history.push("/register");
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    //handle Admin Login
    if (credentials.email === "admin@gmail.com") {
      if(credentials.password === "Admin")
      {
        history.push("/admindashboard")
        localStorage.setItem("username", "Admin");

      }
      else{
        alert("Incorrect Password");
      }

    } 
    
    
    else {
      //check if user have a business account
      await axios.get(`/seller/getseller/${credentials.email}`).then((res) => {
        console.log(res.data.message);
        if (res.data.message === "Found") {
          setCredentials((credentials.type = "seller"));
          console.log("credentials ", credentials);
        } else {
          // setCredentials((cObj) => cObj = {...cObj,type:"user"});
          setCredentials((credentials.type = "user"));
          console.log("credentials ", credentials);
        }
      });

      console.log(credentials.type);
      //axios post request for all sign in operation
      axios.post(`/${credentials.type}/signin`, credentials).then((res) => {
        //get res object
        let resObj = res.data;
        if (resObj.message === "login-success") {
          //save token to local storage
          localStorage.setItem("token", resObj.token);
          localStorage.setItem("username", resObj.username);
          localStorage.setItem("user", JSON.stringify(resObj.userObj));
          console.log(StoreObj);
          setLoginState(true);
          setaddressList(resObj.userObj.address);
          if (credentials.type === "user") {
            //navigate to user home component
            history.push(`/home`);
            // history.push({
            //   pathname: '/home',
            //   state: { username: resObj. }
            // })
          }
          if (credentials.type === "seller") {
            //navigate to seller dashboard
            history.push(`/sellerdashboard`);
          }
        } else {
          alert(resObj.message);
        }
      });
    }
  };

  useEffect(() => {
    console.log("userlogin page rendered");
  }, []);

  return (
    <>
      <form onSubmit={handleSignIn}>
        <div className="text-center mt-3">
          <Logo textColor="black" />
        </div>
        <div className=" form-group border border-secondary shadow-lg p-3 mb-5 bg-white rounded w-25 mx-auto m-3 p-4">
          <h4>Sign-In</h4>
          {/* Email field */}
          <label htmlFor="un">Email</label>
          <input
            type="email"
            className="form-control"
            id="un"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            placeholder="Enter your Email Address"
          />

          {/* password field */}
          <label htmlFor="pwd" className="mt-3">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="pwd"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            placeholder="Enter your password"
          />
          <div className="text-center">
            <button type="submit" className="btn btn-primary m-3 ">
              Sign-In
            </button>
          </div>

          {/* section devider for register section */}
          <SectionDevider text="New to BookLand?" lwidth="25%" />
          {/* create or register button */}
          <div
            className="btn btn-dark text-white border-none"
            onClick={handleCreateAccount}
          >
            Create your Bookland account
          </div>
        </div>
      </form>
    </>
  );
}

export default UserLogin;
