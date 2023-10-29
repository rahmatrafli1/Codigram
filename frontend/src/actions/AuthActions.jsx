import axios from "axios";
import Swal from "sweetalert2";

export const REGISTER_USER = "REGISTER_USER";

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
        Swal.fire("Sukses!", res.data.message, "success");
      })
      .catch((err) => {
        dispatch({
          type: REGISTER_USER,
          payload: {
            data: false,
            errorMessage: err.message,
          },
        });
      });
  };
};
