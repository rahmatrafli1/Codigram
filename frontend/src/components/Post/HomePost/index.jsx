import React, { useEffect, useState } from "react";
import Navbar from "../../layout/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AiOutlineClose, AiOutlineEye, AiOutlinePlus } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getListPostUser, postDeleteUser } from "../../../actions/PostActions";
import { jwtDecode } from "jwt-decode";

const HomePost = (props) => {
  function longString(params) {
    let res = params ? params.substring(0, 30) : "";
    return res + "...";
  }

  const {
    getListPostUserResult,
    getListPostUserLoading,
    getListPostUserError,
  } = useSelector((state) => state.PostReducer);

  const dispatch = useDispatch();

  const { login, loginHandler } = props;

  const navigate = useNavigate();

  const [isDelete, setIsDelete] = useState(false);

  const { postDeleteUserResult } = useSelector((state) => state.PostReducer);

  const data = localStorage.getItem("access_token");

  const getDecoded = () => {
    if (data) {
      const tokenDec = jwtDecode(data);
      return tokenDec;
    }
  };

  const decoded = getDecoded() ? getDecoded() : false;

  const deletePost = (id) => {
    Swal.fire({
      title: "Yakin Mau dihapus?",
      text: "Kalau anda menghapus post ini, post tersebut tidak bisa dikembalikan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Tidak",
    }).then((res) => {
      if (res.isConfirmed) {
        setIsDelete(true);
        dispatch(postDeleteUser({ UserId: decoded.id }, data, id));
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

    if (isDelete) {
      Swal.fire({
        title: "Sukses",
        icon: "success",
        text: "Berhasil menghapus post!",
        showConfirmButton: true,
        confirmButtonColor: "rgb(50,205,50)",
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/post");
        }
      });
    }

    dispatch(getListPostUser(data));
    // eslint-disable-next-line
  }, [login, postDeleteUserResult]);
  return (
    <>
      <Navbar login={login} loginHandler={loginHandler} />
      <h1 className="container mt-3">My Post</h1>
      <div className="container mb-2">
        <Link to="/post/add" className="btn btn-success">
          <div className="d-flex align-items-center">
            <AiOutlinePlus className="me-2" /> Add Post
          </div>
        </Link>
      </div>
      <table className="table table-bordered border-black container">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Created By</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {getListPostUserResult && getListPostUserResult ? (
            getListPostUserResult.map((post, index) => {
              return (
                <tr key={post.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{longString(post.name)}</td>
                  <td>{longString(post.description)}</td>
                  <td>{post.User.name}</td>
                  <td>
                    <Link
                      to="#"
                      className="btn btn-sm btn-info me-2 text-white fs-6"
                    >
                      <AiOutlineEye />
                    </Link>
                    <Link
                      to={`/post/edit/${post.id}`}
                      className="btn btn-sm btn-warning me-2 fs-6 text-white"
                    >
                      <BsPencilSquare />
                    </Link>
                    <button
                      onClick={() => deletePost(post.id)}
                      className="btn btn-sm btn-danger fs-6"
                    >
                      <AiOutlineClose />
                    </button>
                  </td>
                </tr>
              );
            })
          ) : getListPostUserLoading ? (
            <tr className="text-center">
              <td colSpan={5}>Loading...</td>
            </tr>
          ) : getListPostUserError ? (
            <tr className="text-center">
              <td colSpan={5}>{getListPostUserError}</td>
            </tr>
          ) : (
            <tr className="text-center">
              <td colSpan={5}>Data is Empty</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default HomePost;
