import React, { useEffect, useState } from "react";
import Navbar from "../../layout/Navbar";
import { AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getListPostSearch } from "../../../actions/PostActions";
import { Link } from "react-router-dom";

const SearchPost = () => {
  function longString(params) {
    let res = params ? params.substring(0, 100) : "";
    return res + "...";
  }

  // eslint-disable-next-line
  const [search, setSearch] = useState([]);
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();

  // eslint-disable-next-line
  const getSearch = () => {
    const res = dispatch(getListPostSearch(keyword));
    setSearch(res);
  };

  const {
    getListPostSearchResult,
    getListPostSearchLoading,
    getListPostSearchError,
  } = useSelector((state) => state.PostReducer);

  useEffect(() => {
    getSearch();
    // eslint-disable-next-line
  }, [dispatch, keyword]);

  return (
    <>
      <Navbar />
      <div className="container">
        <form className="mt-3">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Cari berdasarkan nama dan deskripsi.."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
        </form>
        <div className="py-2">
          <div className="row">
            {getListPostSearchResult && getListPostSearchResult ? (
              getListPostSearchResult.map((post) => {
                return (
                  <div className="col-md-4 py-2" key={post.id}>
                    <div className="card">
                      <div className="card-block">
                        <img
                          src={post.image_url}
                          className="card-img-top"
                          alt={post.image}
                        />
                        <div className="card-body">
                          <span className="badge text-bg-primary mb-2">
                            {post.User.name}
                          </span>
                          <h5 className="card-title">{post.name}</h5>
                          <p className="card-text">
                            {longString(post.description)}
                          </p>
                          <Link
                            to={`/post/detailguest/${post.id}`}
                            className="btn btn-secondary d-flex align-items-center justify-content-center link-opacity-75-hover"
                          >
                            <AiOutlineEye className="me-2" /> Detail Post
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : getListPostSearchLoading ? (
              <p className="text-center">Loading...</p>
            ) : getListPostSearchError ? (
              <p className="text-center">{getListPostSearchError}</p>
            ) : (
              <p className="text-center">Data is Empty</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPost;
