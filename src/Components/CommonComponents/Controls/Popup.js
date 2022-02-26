import React from "react";
import popupStyle from "./popupStyle.css"

function Popup(props) {
  return (
    <>
    {
      props.trigger && 
      <div className="popup-bg modal">
        <div className="popupcontent">{ props.children}</div>
      </div>
    }
    </>
  );
}

export default Popup;
