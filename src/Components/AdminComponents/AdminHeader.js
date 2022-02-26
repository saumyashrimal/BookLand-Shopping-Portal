import React from "react";
import {useHistory} from "react-router-dom";
import AdminSubheader from "./AdminSubheader";

function AdminHeader() {

    let history = useHistory();

    let handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear();
        history.push("/signin")
    }

    let handleAdminHome = (e) => {
      e.preventDefault();
      history.push("/admindashboard")
    }

  return (
    <>
      <div className="navbar navbar-dark bg-dark">
        {/* burger icon */}
        <button
          className="navbar-toggler "
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Logo */}
        <div className="sellerlogo">
          <a className="navbar-brand pb-3 ms-2" href="#" onClick={handleAdminHome}>
            BookLand.in Admin Dashboard
          </a>
        </div>

        <div className="nav-menu" id="navbarNav">
          <ul className="navbar-nav ms-auto me-4 text-white d-flex flex-row">
            <li className="nav-item active me-5">
              <a className="nav-link bg-transparent">
                Hello, <span className="username"> Admin</span>
              </a>
            </li>
            <li className="nav-item me-4">
              <a className="nav-link" href="#" onClick={handleLogout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
      <AdminSubheader />
    </>
  );
}

export default AdminHeader;
