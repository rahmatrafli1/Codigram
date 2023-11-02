import React, { useEffect, useState } from "react";
import Navbar from "./layout/Navbar";
import { AiOutlineLogin } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../actions/AuthActions";
import Swal from "sweetalert2";

const Login = (props) => {
  const { login, loginHandler } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setLogin] = useState("");

  const { loginUsersResult, loginUsersError } = useSelector(
    (state) => state.AuthReducer
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getDataSession = () => {
    const keyString = localStorage.getItem("access_token");
    return keyString;
  };
  const data = getDataSession() ? getDataSession() : false;

  const submitHandler = (e) => {
    e.preventDefault();
    setLogin(true);
    dispatch(loginUser({ username: username, password: password }));
  };

  useEffect(() => {
    if (data) {
      let timerInterval;
      isLogin
        ? loginUsersResult.access_token
          ? Swal.fire({
              title: "Login Sucessfully!",
              icon: "success",
              html: "You'll be directed",
              timer: 1500,
              showConfirmButton: true,
              timerProgressBar: true,
              willClose: () => {
                clearInterval(timerInterval);
              },
            }).then((res) => {
              if (res.dismiss) {
                navigate("/");
              }

              if (res.isConfirmed) {
                navigate("/");
              }
              loginHandler(true);
            })
          : Swal.fire("Login Failed", loginUsersError, "error")
        : navigate("/");
    }
    // eslint-disable-next-line
  }, [loginUsersResult, loginUsersError]);

  return (
    <>
      <Navbar login={login} loginHandler={loginHandler} />
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-title">
                <h1 className="mt-2 text-center">Login</h1>
              </div>
              <div className="card-body">
                <form onSubmit={(e) => submitHandler(e)}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={username}
                      name="username"
                      id="username"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="off"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary d-flex align-items-center"
                  >
                    <AiOutlineLogin className="me-2" /> Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
