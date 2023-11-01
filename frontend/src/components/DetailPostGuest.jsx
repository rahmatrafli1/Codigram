import React from "react";
import Navbar from "./layout/Navbar";
import { DetailPost } from "./Post";

const DetailPostGuest = (props) => {
  const { login, loginHandler } = props;
  return (
    <>
      <Navbar login={login} loginHandler={loginHandler} />
      <div className="container">
        <h1 className="mt-3">Detail Post</h1>
        <hr />
        <DetailPost />
      </div>
    </>
  );
};

export default DetailPostGuest;
