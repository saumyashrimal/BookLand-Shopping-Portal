import {useState , useEffect} from "react";
import adminActionCreator from "../../Store/adminActionCreator";
import componentStateActionCreator from "../../Store/componentStateActionCreator";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Popup from "../CommonComponents/Controls/Popup";
import AdminDashboard from "./AdminDashboard";

function AllOrders() {
  let [trigger, setTrigger] = useState(false);
  let [orderList, setOrderList] = useState("");
  let history = useHistory();
  let StoreObj = useSelector((store) => store);
  const dispatch = useDispatch();

  const { getAllOrders } = bindActionCreators(
    adminActionCreator,
    dispatch
  );

  useEffect(() => {
    getAllOrders();
    setOrderList(StoreObj.adminState.orders);
    console.log("inside all orders " , StoreObj)
  },[])



  return (
    <AdminDashboard>
      {orderList && (
        <div>
          <div className="text-center">
            <h1 className="bg-dark text-white p-1 ">Total Orders : {orderList.length}</h1>
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminDashboard>
  );
}

export default AllOrders;
