import React from "react";
import Navbar from "./layout/Navbar";
import { DetailPost } from "./Post";

const DetailPostGuest = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <h1>DetailPost</h1>
        <hr />
        <DetailPost />
      </div>
    </>
  );
};

export default DetailPostGuest;
