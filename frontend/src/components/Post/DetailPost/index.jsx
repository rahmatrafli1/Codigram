import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostDetail } from "../../../actions/PostActions";

const DetailPost = () => {
  const {
    getListPostDetailResult,
    getListPostDetailLoading,
    getListPostDetailError,
  } = useSelector((state) => state.PostReducer);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPostDetail(id));
  }, [dispatch, id]);
  const PostDate = new Date(getListPostDetailResult.createdAt);
  return (
    <>
      {getListPostDetailResult && getListPostDetailResult ? (
        <div className="card" key={getListPostDetailResult.id}>
          <img
            src={getListPostDetailResult.image_url}
            className="card-img-top"
            alt={getListPostDetailResult.image}
          />
          <div className="card-body">
            <span className="badge text-bg-primary mb-2">
              {getListPostDetailResult.User.name}
            </span>
            <p>
              {`${
                PostDate.getDate().toString().length === 1
                  ? "0" + PostDate.getDate()
                  : PostDate.getDate()
              }-${
                PostDate.getMonth().toString().length === 1
                  ? "0" + PostDate.getMonth()
                  : PostDate.getMonth()
              }-${PostDate.getFullYear()}
                                            `}{" "}
              {`${
                PostDate.getHours().toString().length === 1
                  ? "0" + PostDate.getHours()
                  : PostDate.getHours()
              }:${
                PostDate.getMinutes().toString().length === 1
                  ? "0" + PostDate.getMinutes()
                  : PostDate.getMinutes()
              }:${
                PostDate.getSeconds().toString().length === 1
                  ? "0" + PostDate.getSeconds()
                  : PostDate.getSeconds()
              }`}
            </p>
            <h5 className="card-title">{getListPostDetailResult.name}</h5>
            <p className="card-text">{getListPostDetailResult.description}</p>
          </div>
        </div>
      ) : getListPostDetailLoading ? (
        <p className="text-center">Loading...</p>
      ) : getListPostDetailError ? (
        <p className="text-center">{getListPostDetailError}</p>
      ) : (
        <p className="text-center">Data not loading</p>
      )}
    </>
  );
};

export default DetailPost;
