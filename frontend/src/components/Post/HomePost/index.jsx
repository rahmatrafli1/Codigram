import React from "react";
import Navbar from "../../layout/Navbar";

const HomePost = (props) => {
  const { login, loginHandler } = props;
  return (
    <>
      <Navbar login={login} loginHandler={loginHandler} />
      <h1 className="container mt-3">Welcome to Post Page!</h1>
    </>
  );
};

export default HomePost;
