import React, { useState } from "react";
import Navbar from "./layout/Navbar";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { registerUser } from "../actions/AuthActions";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmPass] = useState("");
  const [address, setAddress] = useState("");
  const [nohp, setNoHP] = useState("");

  const dispatch = useDispatch();

  const registerHandler = (e) => {
    e.preventDefault();
    dispatch(
      registerUser({
        name: name,
        username: username,
        email: email,
        password: password,
        confirmpass: confirmpass,
        address: address,
        nohp: nohp,
      })
    );
    setName("");
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPass("");
    setAddress("");
    setNoHP("");
  };

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-title">
                <h1 className="mt-2 text-center">Register</h1>
              </div>
              <div className="card-body">
                <form onSubmit={registerHandler}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      name="password"
                      id="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmpass" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmpass"
                      id="confirmpass"
                      className="form-control"
                      value={confirmpass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <textarea
                      className="form-control"
                      name="address"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      autoComplete="off"
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="nohp" className="form-label">
                      No HP
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="nohp"
                      id="nohp"
                      value={nohp}
                      onChange={(e) => setNoHP(e.target.value)}
                      required
                      autoComplete="off"
                    ></input>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary d-flex align-items-center"
                  >
                    <AiOutlineUserAdd className="me-2" /> Register
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

export default Register;
