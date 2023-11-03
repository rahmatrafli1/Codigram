import React from "react";
import Navbar from "./layout/Navbar";
import { DetailPostUser } from "./Post";

const DetailPost = (props) => {
  const { login, loginHandler } = props;
  return (
    <>
      <Navbar login={login} loginHandler={loginHandler} />
      <div className="container">
        <h1 className="mt-3">Detail Post</h1>
        <hr />
        <DetailPostUser />
      </div>
    </>
  );
};

export default DetailPost;
