import React from "react";
import AdminHeader from "./AdminHeader";
import AdminHomeContent from "./AdminHomeContent";

function AdminDashboard(props) {
  return (
    <>
      <AdminHeader />
      {!props.children && <AdminHomeContent />}
      {props.children}
    </>
  );
}

export default AdminDashboard;
