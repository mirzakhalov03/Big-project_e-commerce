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
      const { token, user } = action.payload;
      localStorage.setItem('token', token);
      return {
        ...state,
        token: token || null,
        user: user || null,
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
        error: action.payload?.error || "An error occurred", 
        isError: true,
        isSuccess: false,
      };
    case "SIGN_OUT":
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
      };
    default:
      return state;
  }
};
