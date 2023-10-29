import React, { useState } from "react";
import Navbar from "./layout/Navbar";

const Login = () => {
  const [login, setLogin] = useState(false);
  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Login Status: {JSON.stringify(login)}</h1>
      </div>
    </>
  );
};

export default Login;
