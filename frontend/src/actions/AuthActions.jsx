import axios from "axios";

export const REGISTER_USER = "REGISTER_USER";
export const LOGIN_USER = "LOGIN_USER";

export const registerUser = (data) => {
  return (dispatch) => {
    dispatch({
      type: REGISTER_USER,
      payload: {
        data: false,
        errorMessage: false,
      },
    });

    axios({
      method: "POST",
      url: "http://localhost:3000/register",
      timeout: 120000,
      data: data,
    })
      .then((res) => {
        dispatch({
          type: REGISTER_USER,
          payload: {
            data: res.data,
            errorMessage: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: REGISTER_USER,
          payload: {
            data: false,
            errorMessage: err.response.data.message,
          },
        });
      });
  };
};

export const loginUser = (data) => {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_USER,
      payload: {
        data: false,
        errorMessage: false,
      },
    });

    axios({
      method: "POST",
      url: "http://localhost:3000/login",
      data: data,
      timeout: 120000,
    })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: LOGIN_USER,
          payload: {
            data: res.data,
            errorMessage: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_USER,
          payload: {
            data: false,
            errorMessage: err.response.data.message,
          },
        });
      });
  };
};
