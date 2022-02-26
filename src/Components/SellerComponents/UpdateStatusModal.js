import {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import SellersActionReducer from "../../Store/SellersActionReducer";
import booksActionCreator from "../../Store/booksActionCreator";
import { bindActionCreators } from "redux";
import Popup from "../CommonComponents/Controls/Popup";

function UpdateStatusModal(props) {

    let [resTrigger,setResTrigger] = useState(false);
  let StoreObj = useSelector((store) => store);

  const dispatch = useDispatch();

  const { getOrders, setCurrentOrder } = bindActionCreators(
    SellersActionReducer,
    dispatch
  );
  const { updateOrderStatus ,ResetResponse } = bindActionCreators(
    booksActionCreator,
    dispatch
  );
  let orderStatus = StoreObj.sellerState.currentOrder
    ? StoreObj.sellerState.currentOrder.status
    : null;
  let updateOrderList =
    orderStatus === "pending"
      ? ["Recieved", "Canceled"]
      : ["Return in Progress", "Return Canceled"];

  console.log(updateOrderList);

  let handleActionSelect = (e) => {
    e.preventDefault();
    let newStatus = e.target.value;
    console.log(StoreObj.sellerState.currentOrder._id)
    console.log(newStatus)
    updateOrderStatus({_id:StoreObj.sellerState.currentOrder._id,status:newStatus});
    let email = JSON.parse(localStorage.getItem("user")).email;
    setResTrigger(true)
    setTimeout(() => {
      getOrders(email);
      setResTrigger(false)
      ResetResponse()
    }, 1000);
  };


  return (
    <>

    <Popup trigger={resTrigger}>{StoreObj.bookState.response} </Popup>
      {props.trigger && (
        <div className="modalfor">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update order Status</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={(e) => props.setTrigger(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body">
                <div className="form-group ">
                  <label className=" mr-2 d-block form-label" htmlFor="level">
                    Select Action
                  </label>
                  <select
                    className="custom-select mr-sm-2 border-secondary rounded p-1"
                    id="action"
                    onChange={handleActionSelect}
                  >
                    <option selected>Choose Action...</option>
                    {updateOrderList !== null &&
                      updateOrderList.map((actions, ind) => {
                        return (
                          <option key={ind} value={actions}>
                            {actions}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateStatusModal;
