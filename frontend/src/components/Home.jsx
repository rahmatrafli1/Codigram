import React from "react";
import Navbar from "./layout/Navbar";
import { ListPost } from "./Post";

const Home = (props) => {
  const { login, loginHandler } = props;

  return (
    <>
      <Navbar login={login} loginHandler={loginHandler} />
      <div className="container">
        <h1 className="mt-2">Home</h1>
        <hr />
        <ListPost />
      </div>
    </>
  );
};

export default Home;
