import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineInstagram,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container">
        <Link className="d-flex align-items-center navbar-brand" to="/">
          <AiOutlineInstagram /> Codigram
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
              <NavLink
                className="nav-link d-flex align-items-center"
                aria-current="page"
                to="/"
              >
                <AiOutlineHome /> Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link d-flex align-items-center"
                aria-current="page"
                to="/login"
              >
                <AiOutlineLogin /> Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link d-flex align-items-center"
                aria-current="page"
                to="/register"
              >
                <AiOutlineUserAdd /> Register
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
