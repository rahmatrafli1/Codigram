import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { postDetailUser } from "../../../actions/PostActions";
import Swal from "sweetalert2";

const DetailPostUser = () => {
  const data = localStorage.getItem("access_token");

  const { postDetailUserResult, postDetailUserLoading, postDetailUserError } =
    useSelector((state) => state.PostReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!data) {
      Swal.fire({
        title: "Oops!",
        text: "Anda harus login terlebih dahulu!",
        icon: "error",
        confirmButtonColor: "rgb(50,205,50)",
      });
      navigate("/login");
    }

    dispatch(postDetailUser(data, id));
  }, [dispatch, data, id, navigate]);

  const PostDate = new Date(postDetailUserResult.createdAt);
  return (
    <>
      {postDetailUserResult && postDetailUserResult ? (
        <div className="card" key={postDetailUserResult.id}>
          <img
            src={postDetailUserResult.image_url}
            className="card-img-top"
            alt={postDetailUserResult.image}
          />
          <div className="card-body">
            <span className="badge text-bg-primary mb-2">
              {postDetailUserResult.User.name}
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
            <h5 className="card-title">{postDetailUserResult.name}</h5>
            <p className="card-text">{postDetailUserResult.description}</p>
          </div>
        </div>
      ) : postDetailUserLoading ? (
        <p className="text-center">Loading...</p>
      ) : postDetailUserError ? (
        <p className="text-center">{postDetailUserError}</p>
      ) : (
        <p className="text-center">Data not loading</p>
      )}
    </>
  );
};

export default DetailPostUser;
