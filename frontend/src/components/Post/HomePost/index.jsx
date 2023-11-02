import React, { useEffect } from "react";
import Navbar from "../../layout/Navbar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const HomePost = (props) => {
  const { login, loginHandler } = props;

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      Swal.fire({
        title: "Oops!",
        text: "Anda harus login terlebih dahulu!",
        icon: "error",
        confirmButtonColor: "rgb(50,205,50)",
      });
      navigate("/login");
    }

    // eslint-disable-next-line
  }, [login]);
  return (
    <>
      <Navbar login={login} loginHandler={loginHandler} />
      <h1 className="container mt-3">Welcome to Post Page!</h1>
    </>
  );
};

export default HomePost;
