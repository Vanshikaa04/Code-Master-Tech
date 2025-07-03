import React from "react";
import { Outlet } from "react-router-dom";
import "./css/Layout.css";

const Layout = () => {
  return (
    <div className="layout-wrapper w-100">
      <Outlet />
    </div>
  );
};

export default Layout;
