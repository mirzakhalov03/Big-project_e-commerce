import { ERROR, LOADING, LOGIN, REGISTER } from "../actions/actions";

const initialState = {
  token: localStorage.getItem('token') || null,
  user: null,
  loading: false,
  error: null,
  isError: false,
  isSuccess: false,
};

export const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN:
    case REGISTER:
      return {
        ...state,
        token: action.payload?.token || null,
        user: action.payload?.user || null,
        loading: false,
        error: null,
        isError: false,
        isSuccess: true,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
        isError: false,
        isSuccess: false,
      };
    case ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload?.error || "An error occurred", // Use actual error message if available
        isError: true,
        isSuccess: false,
      };
    default:
      return state;
  }
};
