import React from 'react';
import {useHistory} from "react-router-dom"

function AdminSubheader() {

    let history = useHistory();

    let handleCategoriesClick = (e) => {
        e.preventDefault();
        history.push("/admincategory")
    }

    let handleUserManagementClick = (e) => {
        e.preventDefault();
        history.push("/adminusermgmnt")
    }

    let handleOrders = (e) => {
      e.preventDefault();
      history.push("/adminorders")
  }

  let handleBooksManagementClick = (e) => {
    e.preventDefault();
    history.push("/adminbooks")
  }

    
    return (
        <>
      <nav className="navbar navbar-expand bg-secondary subheader">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-3 text-white">
          <li className="nav-item">
              <a className="nav-link" href="#" onClick={handleCategoriesClick}>
                Categories
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="#" onClick={handleBooksManagementClick}>
                Books Management 
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={handleOrders}>
                Orders
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={handleUserManagementClick}>
                Users Management
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default AdminSubheader

