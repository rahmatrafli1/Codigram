import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineInstagram,
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineSearch,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { BsSignpostSplit } from "react-icons/bs";

const Navbar = () => {
  // eslint-disable-next-line
  const [login, setLogin] = useState(false);
  //   const loginHandler = () => {
  //     setLogin(true);
  //   };
  //   const logoutHandler = () => {
  //     setLogin(false);
  //   };
  return (
    <nav
      className="navbar navbar-expand-lg bg-dark sticky-top"
      data-bs-theme="dark"
    >
      <div className="container">
        <Link className="d-flex align-items-center navbar-brand" to="/">
          <AiOutlineInstagram className="me-2" /> Codigram
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link d-flex align-items-center" to="/">
                <AiOutlineHome className="me-2" /> Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link d-flex align-items-center"
                to="/search"
              >
                <AiOutlineSearch className="me-2" /> Search
              </NavLink>
            </li>

            {login ? (
              <>
                <li className="nav-item">
                  <button className="nav-link d-flex align-items-center">
                    <AiOutlineLogout className="me-2" /> Logout
                  </button>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link d-flex align-items-center"
                    to="/login"
                  >
                    <BsSignpostSplit className="me-2" /> Post
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link d-flex align-items-center"
                    to="/login"
                  >
                    <AiOutlineLogin className="me-2" /> Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link d-flex align-items-center"
                    to="/register"
                  >
                    <AiOutlineUserAdd className="me-2" /> Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
