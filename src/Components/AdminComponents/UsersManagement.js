import { useState, useEffect } from "react";
import adminActionCreator from "../../Store/adminActionCreator";
import componentStateActionCreator from "../../Store/componentStateActionCreator";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Popup from "../CommonComponents/Controls/Popup";
import AdminDashboard from "./AdminDashboard";

function UsersManagement() {
  let [userList, setUserList] = useState(null);
  let [trigger, setTrigger] = useState(false);

  let history = useHistory();
  let StoreObj = useSelector((store) => store);
  const dispatch = useDispatch();

  const { getUserData, setCurrentUser, deleteUser, ResetResponse } =
    bindActionCreators(adminActionCreator, dispatch);

  useEffect(() => {
    getUserData();
    setUserList(StoreObj.adminState.users);
  }, [trigger]);

  let handleDeleteUser = (e, email) => {
    e.preventDefault();
    deleteUser(email);
    setTrigger(true);

    setTimeout(() => {
      setTrigger(false);
      ResetResponse();
    }, 1000);
  };

  return (
    <>
      <AdminDashboard>
        <Popup trigger={trigger}>{StoreObj.adminState.response}</Popup>
        {userList && (
          <div>
            <div className="text-center">
              <h1 className="bg-dark text-white p-1 ">
                Total Users : {userList.length}
              </h1>
            </div>

            <div className="orders-table">
              <table className="table container">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Sno.</th>
                    <th scope="col">Username</th>
                    <th scope="col">EmailId</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {userList.map((userObj, ind) => {
                    return (
                      <tr key={ind}>
                        <th scope="row">{ind + 1}</th>
                        <td>{userObj.username}</td>
                        <td>{userObj.email}</td>
                        {/* <td>{userObj.addres}</td> */}
                        <td>
                          <button
                            className="btn btn-dark border border-white text-white"
                            onClick={(e) => handleDeleteUser(e, userObj.email)}
                          >
                            Delete User
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
      </AdminDashboard>
    </>
  );
}

export default UsersManagement;
