import { useState, useEffect } from "react";
import adminActionCreator from "../../Store/adminActionCreator";
import componentStateActionCreator from "../../Store/componentStateActionCreator";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function AdminHomeContent() {
  let StoreObj = useSelector((store) => store);
  const dispatch = useDispatch();

  const { getAllBooks, getcategories, getAllOrders, getUserData } =
    bindActionCreators(adminActionCreator, dispatch);

  useEffect(() => {
    getAllBooks();
    getcategories();
    getAllOrders();
    getUserData();
  }, []);

  let totalBooks = StoreObj.adminState.books;
  let totalOrders = StoreObj.adminState.orders;
  let totalCategories = StoreObj.adminState.categories;
  let totalusers = StoreObj.adminState.users;

  return (
    <div>
      {totalBooks && totalOrders && totalCategories && totalusers && (
        <>
          <div className="row my-3">
            <div className="col-md-5 p-5 bg-dark text-white mx-3 my-4 ">
              <h1>Total Books : {totalBooks.length}</h1>
            </div>
            <div className="col-md-5 p-5 bg-dark text-white mx-3 my-4 ">
              <h1>Total Orders : {totalOrders.length}</h1>
            </div>
          </div>

          <div className="row my-3">
            <div className="col-md-5 p-5 bg-dark text-white mx-3 my-4 ">
              <h1>Total Categories : {totalCategories.length}</h1>
            </div>
            <div className="col-md-5 p-5 bg-dark text-white mx-3 my-4 ">
              <h1>Total Users : {totalusers.length}</h1>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminHomeContent;
