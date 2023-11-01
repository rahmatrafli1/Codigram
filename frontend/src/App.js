import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import DetailPostGuest from "./components/DetailPostGuest";
import Search from "./components/Search";
import { HomePost } from "./components/Post";
import { useState } from "react";

function App() {
  const [login, setLogin] = useState(false);

  const loginHandler = (result) => {
    setLogin(result);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home login={login} loginHandler={loginHandler} />}
        />
        <Route
          path="/search"
          element={<Search login={login} loginHandler={loginHandler} />}
        />
        <Route
          path="/post/detailguest/:id"
          element={
            <DetailPostGuest login={login} loginHandler={loginHandler} />
          }
        />
        {login ? (
          <>
            <Route
              path="/post"
              element={<HomePost login={login} loginHandler={loginHandler} />}
            />
          </>
        ) : (
          <>
            <Route
              path="/login"
              element={<Login login={login} loginHandler={loginHandler} />}
            />
            <Route
              path="/register"
              element={<Register login={login} loginHandler={loginHandler} />}
            />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
