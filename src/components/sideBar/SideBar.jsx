import React from "react";
import { Link, NavLink } from "react-router-dom";

const SideBar = ({ setPageTitle }) => {
  return (
    <aside
      className="sidebar-gradient-background sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl mt-3 fixed-start ms-3   bg-gradient-dark"
      id="sidenav-main"
      style={{ zIndex: 1 }}
    >
      <div className="sidenav-header">
        <i
          className="fas fa-times p-3 cursor-pointer opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
          aria-hidden="true"
          id="iconSidenav"
        ></i>
        <Link className="navbar-brand m-0" to="/">
          <img
            src="../assets/img/logo-ct-dark.png"
            className="navbar-brand-img h-100"
            alt="main_logo"
          />
          <span className="ms-1 font-weight-bold">AVS</span>
        </Link>
      </div>
      <hr className="horizontal light mt-0 mb-2" />
      <div
        className="collapse navbar-collapse  w-auto "
        id="sidenav-collapse-main"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink
              exact={"true"}
              to="/"
              className="nav-link sidebar-link-bg"
              onClick={() => setPageTitle("Home")}
            >
              <div className="text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10 ms-3">home</i>
              </div>
              <span className="nav-link-text ms-3">Home</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact={"true"}
              to="/stock" // Update the destination path
              className="nav-link sidebar-link-bg"
              onClick={() => setPageTitle("Stock")}
            >
              <div className=" text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">stock</i>
              </div>
              <span className="nav-link-text ms-1">Stock</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact={"true"}
              to="/receivable" 
              className="nav-link sidebar-link-bg"
              onClick={() => setPageTitle("Receivable")}
            >
              <div className=" text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10 ms-3 me-3">layers</i>
              </div>
              <span className="nav-link-text ms-1">Receivable</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact={"true"}
              to="/sale" 
              className="nav-link sidebar-link-bg"
              onClick={() => setPageTitle("Sale")}
            >
              <div className=" text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10  ms-3 me-3">real_estate_agent</i>
              </div>
              <span className="nav-link-text ms-1">Sale</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
