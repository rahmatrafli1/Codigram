import React from "react";
import Navbar from "./layout/Navbar";
import { ListPost } from "./Post";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="mt-2">Home</h1>
        <hr />
        <ListPost />
      </div>
    </>
  );
};

export default Home;
