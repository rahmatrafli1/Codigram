import { REGISTER_USER, LOGIN_USER } from "../../actions/AuthActions";

const initialState = {
  registerUsersResult: false,
  registerUsersError: false,
  loginUsersResult: false,
  loginUsersError: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loginUsersResult: action.payload.data,
        loginUsersError: action.payload.errorMessage,
      };
    case REGISTER_USER:
      return {
        ...state,
        registerUsersResult: action.payload.data,
        registerUsersError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default auth;
