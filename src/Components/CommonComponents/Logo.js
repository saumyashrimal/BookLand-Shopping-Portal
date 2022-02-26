import React from "react";
import { useHistory } from "react-router-dom";
import componentStateActionCreator from "../../Store/componentStateActionCreator";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";

function Logo(props) {
  let history = useHistory();
  const dispatch = useDispatch();
  const { setHomeState } = bindActionCreators(
    componentStateActionCreator,
    dispatch
  );

  let handleLogoClick = (e) => {
    e.preventDefault();
    setHomeState(true);
    history.push("/home")
  };

  return (
    <button
      className="bg-transparent shadow-none"
      onClick={handleLogoClick}
      style={{ color: props.textColor, borderStyle: "none" }}
    >
      <h4 className="d-inline">BookLand</h4>
      <p className="d-inline me-2">.in</p>
      <img
        src="http://www.clker.com/cliparts/d/b/0/1/1207431622846796151bookstore%20book%20store%20white.svg.hi.png"
        alt=""
        width="36rem"
      />
    </button>
  );
}

export default Logo;
