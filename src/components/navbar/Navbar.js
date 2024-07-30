import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Navbar = ({ pageTitle }) => {
  const [title, setTitle] = useState("Home")
  const {pathname} = useLocation();

  useEffect(() => {
    if(pathname === "/") {
      setTitle("Home")
    }
    else{
      setTitle(pathname.slice(1,))
    }
  },[pageTitle])

  return (
    <nav
      className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
      id="navbarBlur"
      data-scroll="true"
    >
      <div className="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            <li className="breadcrumb-item text-sm">
              <span className="opacity-5 text-dark">
                Pages
              </span>
            </li>
            <li
              className="breadcrumb-item text-sm text-dark active"
              aria-current="page"
            >
              {title.toLowerCase()}
            </li>
          </ol>
          {/* <h6 className="font-weight-bolder mb-0">{title}</h6> */}
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
