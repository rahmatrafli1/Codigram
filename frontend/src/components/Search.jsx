import React from "react";
import Search from "./Post/SearchPost";

const SearchComp = (props) => {
  const { login, loginHandler } = props;
  return (
    <>
      <Search login={login} loginHandler={loginHandler} />
    </>
  );
};

export default SearchComp;
