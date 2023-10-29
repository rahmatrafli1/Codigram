import axios from "axios";

export const GET_LIST_POST = "GET_LIST_POST";
export const GET_LIST_POST_DETAIL = "GET_LIST_POST_DETAIL";

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
            errorMessage: err.message,
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
            errorMessage: err.message,
          },
        });
      });
  };
};
