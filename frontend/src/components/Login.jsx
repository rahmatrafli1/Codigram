import React, { useState } from "react";
import Navbar from "./layout/Navbar";
import { AiOutlineLogin } from "react-icons/ai";

const Login = () => {
  // const [login, setLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-title">
                <h1 className="mt-2 text-center">Login</h1>
              </div>
              <div className="card-body">
                <form>
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
