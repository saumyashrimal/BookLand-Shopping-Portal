import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import componentStateActionCreator from "../../Store/componentStateActionCreator";
import booksActionCreator from "../../Store/booksActionCreator";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import Home from "../Home";

function Orders() {
  let history = useHistory();

  let StoreObj = useSelector((store) => store);
  //orderlist state
  let [orderList, setOrderList] = useState(null);
  const dispatch = useDispatch();
  const { setBookState, setOrderState } = bindActionCreators(
    componentStateActionCreator,
    dispatch
  );
  const { loadCurrentItem, getbookBybookmodel, getOrders, updateOrderStatus } =
    bindActionCreators(booksActionCreator, dispatch);

  let email = JSON.parse(localStorage.getItem("user")).email;

  useEffect(() => {
    getOrders(email);
    console.log("inside use effect order ");

    setOrderList(StoreObj.bookState.orders);
    setOrderState(true);
  }, []);

  let handleViewItem = (e, bookmodel) => {
    e.preventDefault();
    let currentItem = getbookBybookmodel(bookmodel);
    loadCurrentItem(currentItem);

    setTimeout(() => {
      setBookState(true);
      history.push("/currentbook");
    }, 500);
  };

  let updateOrderState = (e, _id, status) => {
    e.preventDefault();
    let orderObj = { _id, status };
    updateOrderStatus(orderObj);
  };

  return (
    <Home>
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
                  <th scope="col">Shipping Address</th>
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
                      <td>{orderObj.address.substring(0, 20)}...</td>
                      <td>{orderObj.status}</td>
                      <td>
                        <button
                          className="btn btn-dark border border-white text-white"
                          onClick={(e) => handleViewItem(e, orderObj.bookmodel)}
                        >
                          View Item
                        </button>
                        {orderObj.status === "pending" && (
                          <button
                            className="btn btn-dark border border-white text-white"
                            onClick={(e) =>
                              updateOrderState(e, orderObj._id, "Canceled")
                            }
                          >
                            Cancel Order
                          </button>
                        )}
                        {orderObj.status === "Recieved" && (
                          <button
                            className="btn btn-dark border border-white text-white"
                            onClick={(e) =>
                              updateOrderState(e, orderObj._id, "Return")
                            }
                          >
                            Return Order
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Home>
  );
}

export default Orders;
