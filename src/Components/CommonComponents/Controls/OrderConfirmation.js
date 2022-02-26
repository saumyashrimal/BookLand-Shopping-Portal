import React from "react";
import "./OrderConfirmationStyles.css";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

function OrderConfirmation(props) {
  return (
    <>
      {props.trigger && (
        <div className="orderModalbg">
          <div className="orderModalcontent">
            <div>
              <CheckCircleOutlineIcon />
            </div>

            <h1>Thank You for Your Order</h1>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderConfirmation;
