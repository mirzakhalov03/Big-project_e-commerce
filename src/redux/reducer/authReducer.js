import { ERROR, LOADING, LOGIN, REGISTER, SIGN_OUT, PROMOTE, PRODUCT_ID, PROMOTE_SUCCESS, ADD_TO_CART, REMOVE_FROM_CART } from "../actions/actions";

const initialState = {
  token: localStorage.getItem('token') || null,
  user: null,
  loading: false,
  error: null,
  isError: false,
  isSuccess: false,
  productID: null,
  promote: false,
  cart: JSON.parse(localStorage.getItem('cart')) || [], 
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
    case SIGN_OUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        loading: false,
        error: null,
        isError: false,
        isSuccess: false,
        productID: null,
        promote: false,
        cart: [], 
      };
    case PROMOTE:
      return {
        ...state,
        loading: true,
        error: null,
        isError: false,
        isSuccess: false,
      };
    case PROMOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        promote: true,
        isSuccess: true,
      };
    case PRODUCT_ID:
      return {
        ...state,
        loading: false,
        error: null,
        isError: false,
        isSuccess: false,
        productID: action.payload
      };
    case ADD_TO_CART:
      localStorage.setItem('cart', JSON.stringify([...state.cart, action.payload]));
      return {
        ...state,
        cart: [...state.cart, action.payload], 
        loading: false,
        error: null,
        isError: false,
        isSuccess: true,
      };
    case REMOVE_FROM_CART:
      localStorage.removeItem('cart', JSON.stringify(state.cart.filter(item => item.id !== action.payload.id)));
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id), 
        loading: false,
        error: null,
        isError: false,
        isSuccess: true,
      };
    default:
      return state;
  }
};
