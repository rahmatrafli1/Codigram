import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListPost } from "../../../actions/PostActions";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";

const ListPost = () => {
  function longString(params) {
    let res = params ? params.substring(0, 100) : "";
    return res + "...";
  }
  const { getListPostResult, getListPostLoading, getListPostError } =
    useSelector((state) => state.PostReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListPost());
  }, [dispatch]);

  return (
    <>
      <h2>List Post</h2>
      <div className="py-2">
        <div className="row">
          {getListPostResult && getListPostResult ? (
            getListPostResult.map((post) => {
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
          ) : getListPostLoading ? (
            <p className="text-center">Loading...</p>
          ) : getListPostError ? (
            <p className="text-center">{getListPostError}</p>
          ) : (
            <p className="text-center">Data is Empty</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ListPost;
