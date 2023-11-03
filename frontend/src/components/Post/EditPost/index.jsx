import React, { useEffect, useState } from "react";
import Navbar from "../../layout/Navbar";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { getPostDetail, postEditUser } from "../../../actions/PostActions";
import { BsPencil } from "react-icons/bs";

const EditPost = (props) => {
  const { login, loginHandler } = props;

  const {
    // eslint-disable-next-line
    handleSubmit,
    // eslint-disable-next-line
    formState: { errors },
  } = useForm();

  const data = localStorage.getItem("access_token");

  const getDecoded = () => {
    if (data) {
      const tokenDec = jwtDecode(data);
      return tokenDec;
    }
  };

  const decoded = getDecoded() ? getDecoded() : false;

  const { postEditUserResult, getListPostDetailResult } = useSelector(
    (state) => state.PostReducer
  );

  const [isPost, setIsPost] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const [UserId, setUserId] = useState(decoded.id);

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const getDataDetail = () => {
    dispatch(getPostDetail(id));
    setName(getListPostDetailResult.name);
    setDescription(getListPostDetailResult.description);
    setFile(getListPostDetailResult.image);
    setPreview(getListPostDetailResult.image_url);
    setUserId(decoded.id);
  };

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const updatePost = () => {
    Swal.fire({
      title: "Peringatan",
      text: "Apakah data anda sesuai?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Tidak",
      showConfirmButton: true,
      confirmButtonText: "Ya, Sesuai!",
    }).then((res) => {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("image", file);
      formData.append("UserId", UserId);
      if (res.isConfirmed) {
        setIsPost(true);
        dispatch(postEditUser(formData, data, id));
      }
    });
  };

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

    if (isPost) {
      Swal.fire({
        title: "Sukses",
        icon: "success",
        text: "Berhasil mengubah post!",
        showConfirmButton: true,
        confirmButtonColor: "rgb(50,205,50)",
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/post");
        }
      });
    }

    getDataDetail();

    // eslint-disable-next-line
  }, [login, postEditUserResult]);

  return (
    <>
      <Navbar login={login} loginHandler={loginHandler} />
      <div className="container mt-3">
        <h1>Edit Post</h1>
        <form
          className="border rounded-2 py-3 px-3"
          onSubmit={handleSubmit(updatePost)}
        >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              required
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              required
              autoComplete="off"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="file" className="form-label">
              Image
            </label>
            <input
              className="form-control"
              type="file"
              name="file"
              id="file"
              autoComplete="off"
              onChange={loadImage}
            />
            <div className="w-100">
              {preview ? (
                <img
                  src={preview}
                  alt={getListPostDetailResult.image}
                  width={150}
                  height={150}
                  className="mt-2 object-fit-contain"
                />
              ) : (
                <img
                  src="http://localhost:3000/assets/post/default.jpeg"
                  alt="default.jpeg"
                  width={150}
                  height={150}
                  className="mt-2 object-fit-contain"
                />
              )}
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            <div className="d-flex align-items-center">
              <BsPencil className="me-2" /> Update
            </div>
          </button>
        </form>
      </div>
    </>
  );
};

export default EditPost;
