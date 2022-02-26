import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SellersActionReducer from "../../Store/SellersActionReducer";
import booksActionCreator from "../../Store/booksActionCreator";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import SellerDashboard from "./SellerDashboard";
import UpdateStatusModal from "./UpdateStatusModal";

function SellerOrders() {


    let [trigger,setTrigger] = useState(false);
  let history = useHistory();
  let [orderList,setOrderList] = useState(null);

  let StoreObj = useSelector((store) => store);

  const dispatch = useDispatch();
  
  const {getOrders ,setCurrentOrder} = bindActionCreators(SellersActionReducer, dispatch);

  const {updateOrderStatus} = bindActionCreators(booksActionCreator, dispatch);

  let email = JSON.parse(localStorage.getItem("user")).email;

  useEffect(() => {
    getOrders(email);
    
    setOrderList(StoreObj.sellerState.Orders)

    console.log(StoreObj);
    console.log("inside useEffect of sellers orders")

  }, []);


  let updateOrderState = (e, orderObj) => {
    e.preventDefault();
    setCurrentOrder(orderObj);
    setTrigger(true);
  };

  return (
      <>
      <UpdateStatusModal trigger={trigger} setTrigger={setTrigger} />
    <SellerDashboard>
      {orderList && (
        <div>
          <div className="text-center">
            <h1 className="bg-dark text-white p-1 ">Your Orders</h1>
          </div>

          <div className="orders-table">
            <table class="table container">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Sno.</th>
                  <th scope="col">Order Id</th>
                  <th scope="col">BookName</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Total Price</th>
                  <th scope="col">Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orderList.map((orderObj, ind) => {
                  return (
                    <tr key={ind}>
                      <th scope="row">{ind + 1}</th>
                      <td>{orderObj._id}</td>
                      <td>{orderObj.bookname.substring(0, 15)}...</td>
                      <td>{orderObj.qty}</td>
                      <td>{orderObj.price}</td>
                      <td>{orderObj.status}</td>
                      <td>

                          <button
                            className="btn btn-dark border border-white text-white"
                            onClick={(e) =>
                              updateOrderState(e, orderObj)
                            }
                          >
                            update Status
                          </button>
                        
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </SellerDashboard>
    </>
  );
}

export default SellerOrders
