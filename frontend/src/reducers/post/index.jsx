import {
  GET_LIST_POST,
  GET_LIST_POST_DETAIL,
  GET_SEARCH_POST,
} from "../../actions/PostActions";

const initialState = {
  getListPostResult: false,
  getListPostLoading: false,
  getListPostError: false,
  getListPostDetailResult: false,
  getListPostDetailLoading: false,
  getListPostDetailError: false,
  getListPostSearchResult: false,
  getListPostSearchLoading: false,
  getListPostSearchError: false,
};

const post = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_POST:
      return {
        ...state,
        getListPostResult: action.payload.data,
        getListPostLoading: action.payload.loading,
        getListPostError: action.payload.errorMessage,
      };
    case GET_LIST_POST_DETAIL:
      return {
        ...state,
        getListPostDetailResult: action.payload.data,
        getListPostDetailLoading: action.payload.loading,
        getListPostDetailError: action.payload.errorMessage,
      };
    case GET_SEARCH_POST:
      return {
        ...state,
        getListPostSearchResult: action.payload.data,
        getListPostSearchLoading: action.payload.loading,
        getListPostSearchError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default post;
