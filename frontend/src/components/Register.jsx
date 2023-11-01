import React, { useEffect, useState } from "react";
import Navbar from "./layout/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/AuthActions";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AiOutlineUserAdd } from "react-icons/ai";

const Register = (props) => {
  const { login, loginHandler } = props;

  const {
    register,
    handleSubmit,
    // eslint-disable-next-line
    formState: { errors },
  } = useForm();

  const { registerUsersResult, registerUsersError } = useSelector(
    (state) => state.AuthReducer
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);

  const registerUsers = (data) => {
    Swal.fire({
      title: "Apakah data ini sesuai?",
      showCancelButton: true,
      confirmButtonText: "Submit",
    }).then((res) => {
      if (res.isConfirmed) {
        const dataJson = {
          name: data.name,
          username: data.username,
          email: data.email,
          password: data.password,
          confirmpass: data.confirmpass,
          address: data.address,
          nohp: data.nohp,
        };
        setIsRegister(true);
        dispatch(registerUser(dataJson));
      }
    });
  };

  useEffect(() => {
    if (registerUsersResult || registerUsersError) {
      if (isRegister) {
        registerUsersResult
          ? Swal.fire({
              title: "Register is Successfully!",
              icon: "success",
              confirmButtonText: "OK",
              confirmButtonColor: "rgb(50,205,50)",
            }).then((res) => {
              if (res.isConfirmed || res.isDismissed) {
                navigate("/login");
              }
            })
          : Swal.fire("Gagal Register", registerUsersError, "error");
      }
    }
    // eslint-disable-next-line
  }, [registerUsersResult, registerUsersError]);

  return (
    <>
      <Navbar login={login} loginHandler={loginHandler} />
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-title">
                <h1 className="mt-2 text-center">Register</h1>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit(registerUsers)}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      id="name"
                      {...register("name")}
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
                      {...register("username")}
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
                      {...register("email")}
                      className="form-control"
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
                      {...register("password")}
                      className="form-control"
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
                      {...register("confirmpass")}
                      className="form-control"
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
                      {...register("address")}
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
                      {...register("nohp")}
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
