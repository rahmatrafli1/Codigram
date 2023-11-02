import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineInstagram,
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineSearch,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { BiSolidUserDetail } from "react-icons/bi";
import { BsSignpostSplit } from "react-icons/bs";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

const Navbar = (props) => {
  const { login, loginHandler } = props;

  const navigate = useNavigate();

  const logoutHandler = () => {
    Swal.fire({
      title: "Peringatan",
      text: "Yakin mau keluar?",
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Ya, Keluar",
      cancelButtonText: "Tidak",
    }).then((res) => {
      if (res.isConfirmed) {
        Swal.fire({
          title: "Sukses",
          text: "Berhasil Keluar",
          icon: "success",
          showConfirmButton: true,
          confirmButtonText: "OK",
          confirmButtonColor: "rgb(50,205,50)",
        }).then((res) => {
          if (res.isConfirmed || res.isDismissed) {
            localStorage.removeItem("access_token");
            loginHandler(false);
            navigate("/");
          }
        });
      }
    });
  };

  const data = localStorage.getItem("access_token");

  const getdecoded = () => {
    if (data) {
      const dec = jwtDecode(data);
      return dec;
    }
  };

  const decoded = getdecoded() ? getdecoded() : false;

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
                  <NavLink
                    className="nav-link d-flex align-items-center"
                    to="/post"
                  >
                    <BsSignpostSplit className="me-2" /> Post
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    to="#"
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {decoded ? (
                      <img
                        src={decoded.image_url}
                        alt={decoded.image}
                        width={20}
                        height={20}
                        className="rounded-circle me-2"
                      />
                    ) : (
                      ""
                    )}
                    {decoded ? decoded.name : ""}
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        to="#"
                        className="dropdown-item d-flex align-items-center"
                      >
                        <BiSolidUserDetail className="me-2" /> Detail User
                      </Link>
                    </li>
                    <li>
                      <button
                        className="dropdown-item d-flex align-items-center"
                        onClick={() => logoutHandler()}
                      >
                        <AiOutlineLogout className="me-2" /> Logout
                      </button>
                    </li>
                  </ul>
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
