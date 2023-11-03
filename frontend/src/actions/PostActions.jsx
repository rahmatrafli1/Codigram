import axios from "axios";

export const GET_LIST_POST = "GET_LIST_POST";
export const GET_LIST_POST_DETAIL = "GET_LIST_POST_DETAIL";
export const GET_SEARCH_POST = "GET_SEARCH_POST";
export const GET_LIST_POST_USER = "GET_LIST_POST_USER";
export const POST_ADD_USER = "POST_ADD_USER";
export const POST_EDIT_USER = "POST_EDIT_USER";
export const POST_DELETE_USER = "POST_DELETE_USER";
export const POST_DETAIL_USER = "POST_DETAIL_USER";

export const getListPost = () => {
  return (dispatch) => {
    // loading
    dispatch({
      type: GET_LIST_POST,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // get API
    axios({
      method: "GET",
      url: "http://localhost:3000/post",
      timeout: 120000,
    })
      .then((res) => {
        dispatch({
          type: GET_LIST_POST,
          payload: {
            loading: false,
            data: res.data,
            errorMessage: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_LIST_POST,
          payload: {
            loading: false,
            data: false,
            errorMessage: err.response.data.message,
          },
        });
      });
  };
};

export const getPostDetail = (id) => {
  return (dispatch) => {
    dispatch({
      type: GET_LIST_POST_DETAIL,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    axios({
      method: "GET",
      url: `http://localhost:3000/post/${id}`,
      timeout: 120000,
    })
      .then((res) => {
        dispatch({
          type: GET_LIST_POST_DETAIL,
          payload: {
            loading: false,
            data: res.data,
            errorMessage: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_LIST_POST_DETAIL,
          payload: {
            loading: false,
            data: false,
            errorMessage: err.response.data.message,
          },
        });
      });
  };
};

export const getListPostSearch = (data) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: GET_SEARCH_POST,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // get API
    axios({
      method: "GET",
      url: `http://localhost:3000/spost?search_query=${data}`,
      timeout: 120000,
      data: data,
    })
      .then((res) => {
        dispatch({
          type: GET_SEARCH_POST,
          payload: {
            loading: false,
            data: res.data,
            errorMessage: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_SEARCH_POST,
          payload: {
            loading: false,
            data: false,
            errorMessage: err.response.data.message,
          },
        });
      });
  };
};

export const getListPostUser = (token) => {
  return (dispatch) => {
    dispatch({
      type: GET_LIST_POST_USER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    axios({
      method: "GET",
      url: "http://localhost:3000/post/user",
      headers: { access_token: token },
      timeout: 120000,
    })
      .then((res) => {
        dispatch({
          type: GET_LIST_POST_USER,
          payload: {
            loading: false,
            data: res.data,
            errorMessage: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_LIST_POST_USER,
          payload: {
            loading: false,
            data: false,
            errorMessage: err.response.data.message,
          },
        });
      });
  };
};

export const postAddUser = (data, token) => {
  return (dispatch) => {
    dispatch({
      type: POST_ADD_USER,
      payload: {
        data: false,
        errorMessage: false,
      },
    });

    axios({
      method: "POST",
      url: "http://localhost:3000/post",
      headers: { access_token: token },
      data: data,
      timeout: 120000,
    })
      .then((res) => {
        dispatch({
          type: POST_ADD_USER,
          payload: {
            data: res.data,
            errorMessage: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: POST_ADD_USER,
          payload: {
            data: false,
            errorMessage: err.response.data.message,
          },
        });
      });
  };
};

export const postEditUser = (data, token, id) => {
  return (dispatch) => {
    dispatch({
      type: POST_EDIT_USER,
      payload: {
        data: false,
        errorMessage: false,
      },
    });

    axios({
      method: "PUT",
      url: "http://localhost:3000/post/" + id,
      headers: { access_token: token },
      data: data,
      timeout: 120000,
    })
      .then((res) => {
        dispatch({
          type: POST_EDIT_USER,
          payload: {
            data: res.data,
            errorMessage: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: POST_EDIT_USER,
          payload: {
            data: false,
            errorMessage: err.response.data.message,
          },
        });
      });
  };
};

export const postDeleteUser = (data, token, id) => {
  return (dispatch) => {
    dispatch({
      type: POST_DELETE_USER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    axios({
      method: "DELETE",
      headers: { access_token: token },
      url: `http://localhost:3000/post/${id}`,
      data: data,
      timeout: 120000,
    })
      .then((res) => {
        dispatch({
          type: POST_DELETE_USER,
          payload: {
            loading: false,
            data: res.data,
            errorMessage: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: POST_DELETE_USER,
          payload: {
            loading: false,
            data: false,
            errorMessage: err.response.data.message,
          },
        });
      });
  };
};

export const postDetailUser = (token, id) => {
  return (dispatch) => {
    dispatch({
      type: POST_DETAIL_USER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    axios({
      method: "GET",
      headers: { access_token: token },
      url: `http://localhost:3000/post/${id}`,
      timeout: 120000,
    })
      .then((res) => {
        dispatch({
          type: POST_DETAIL_USER,
          payload: {
            loading: false,
            data: res.data,
            errorMessage: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: POST_DETAIL_USER,
          payload: {
            loading: false,
            data: false,
            errorMessage: err.response.data.message,
          },
        });
      });
  };
};
