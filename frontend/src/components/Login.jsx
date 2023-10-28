import React, { useState } from "react";
import Navbar from "./layout/Navbar";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";

const Login = () => {
  const [login, setLogin] = useState(false);
  const loginHandler = () => {
    setLogin(true);
  };
  const logoutHandler = () => {
    setLogin(false);
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Login Status: {JSON.stringify(login)}</h1>
        {login ? (
          <button
            onClick={logoutHandler}
            className="d-flex align-items-center btn btn-danger"
          >
            <AiOutlineLogout className="me-2" /> Logout
          </button>
        ) : (
          <button
            onClick={loginHandler}
            className="d-flex align-items-center btn btn-success"
          >
            <AiOutlineLogin className="me-2" /> Login
          </button>
        )}
      </div>
    </>
  );
};

export default Login;
