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
