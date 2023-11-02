import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../../layout/Navbar";
import { AiOutlinePlus } from "react-icons/ai";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { postAddUser } from "../../../actions/PostActions";

const AddPost = (props) => {
  const { login, loginHandler } = props;

  const data = localStorage.getItem("access_token");

  const getDecoded = () => {
    if (data) {
      const tokenDec = jwtDecode(data);
      return tokenDec;
    }
  };

  const decoded = getDecoded() ? getDecoded() : false;

  const { postAddUserResult } = useSelector((state) => state.PostReducer);

  const [hasil, setHasil] = useState({
    name: "",
    description: "",
    UserId: decoded ? decoded.id : "",
  });

  const [isPost, setIsPost] = useState(false);
  // eslint-disable-next-line
  const [image, setImage] = useState("");
  // eslint-disable-next-line
  const [imageFrom, setImageFrom] = useState(
    "http://localhost:3000/assets/post/default.jpeg"
  );
  const [imageSave, setImageSave] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    // eslint-disable-next-line
    posted,
    handleSubmit,
    // eslint-disable-next-line
    formState: { errors },
  } = useForm();

  const addPosts = () => {
    Swal.fire({
      title: "Apakah data anda sesuai?",
      showCancelButton: true,
      cancelButtonText: "Tidak",
      showConfirmButton: true,
      confirmButtonText: "Ya, Sesuai!",
    }).then((res) => {
      const formData = new FormData();
      formData.append("name", hasil.name);
      formData.append("description", hasil.description);
      formData.append("image", imageSave);
      formData.append("UserId", hasil.UserId);
      if (res.isConfirmed) {
        setIsPost(true);
        dispatch(postAddUser(formData, data));
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
        text: "Berhasil menambahkan post!",
        showConfirmButton: true,
        confirmButtonColor: "rgb(50,205,50)",
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/post");
        }
      });
    }
    // eslint-disable-next-line
  }, [login, postAddUserResult]);

  return (
    <>
      <Navbar login={login} loginHandler={loginHandler} />
      <div className="container">
        <h1 className="mt-3">Add Post</h1>
        <form
          className="border rounded-2 container py-3"
          onSubmit={handleSubmit(addPosts)}
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
              onChange={(e) => setHasil({ ...hasil, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              required
              autoComplete="off"
              onChange={(e) =>
                setHasil({ ...hasil, description: e.target.value })
              }
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              className="form-control"
              type="file"
              name="image"
              id="image"
              onChange={(e) => {
                setImageSave(e.target.files[0]);
                setImage(
                  e.target.files[0] ? e.target.files[0] : "default.jpeg"
                );
              }}
              autoComplete="off"
            />
            <div className="w-100">
              <img
                src={imageFrom}
                alt="imagefrom"
                width={150}
                height={150}
                className="mt-2 object-fit-contain"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            <div className="d-flex align-items-center">
              <AiOutlinePlus className="me-2" /> Add
            </div>
          </button>
        </form>
      </div>
    </>
  );
};

export default AddPost;
