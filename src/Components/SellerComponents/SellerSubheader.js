import React from "react";
import { useSelector, useDispatch } from "react-redux";
import componentStateActionCreator from "../../Store/componentStateActionCreator";
import { bindActionCreators } from "redux";

import { useHistory } from "react-router-dom";

function SellerSubheader() {
  let history = useHistory();
  const dispatch = useDispatch();

  const { setEditBookState } = bindActionCreators(
    componentStateActionCreator,
    dispatch
  );
  let StoreObj = useSelector((store) => store);


  let handleAddBooks = (e) => {
    e.preventDefault();
    setEditBookState(false)
    history.push("/createbook");
  };
  let handleEditBooks = (e) => {
    e.preventDefault();
    setEditBookState(true)
    history.push("/sellerBooks");
  };
  let handleOrders = (e) => {
    e.preventDefault();
    history.push("/sellerorders");
  };
  return (
    <>
      <nav className="navbar navbar-expand bg-secondary subheader">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-3 text-white">
            <li className="nav-item active">
              <a className="nav-link" href="#" onClick={handleAddBooks}>
                Add Books
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={handleEditBooks}>
                Books
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={handleOrders}>
                Orders
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default SellerSubheader;
