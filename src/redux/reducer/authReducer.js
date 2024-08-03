import { ERROR, LOADING, LOGIN, REGISTER, SIGN_OUT, PROMOTE, PRODUCT_ID, PROMOTE_SUCCESS, ADD_TO_CART, REMOVE_FROM_CART, INCREMENT, DECREMENT } from "../actions/actions";

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
      const updatedCartAdd = [...state.cart, action.payload];
      localStorage.setItem('cart', JSON.stringify(updatedCartAdd));
      return {
        ...state,
        cart: updatedCartAdd,
        loading: false,
        error: null,
        isError: false,
        isSuccess: true,
      };
    case REMOVE_FROM_CART:
      const updatedCartRemove = state.cart.filter(item => item.id !== action.payload.id);
      localStorage.setItem('cart', JSON.stringify(updatedCartRemove));
      return {
        ...state,
        cart: updatedCartRemove,
        loading: false,
        error: null,
        isError: false,
        isSuccess: true,
      };

    case INCREMENT:
      const updatedCartIncrement = state.cart.map(item => {
        if (item.id === action.payload) {
          return {
            ...item,
            quantity: item.quantity + 1
          };
        }
        return item;
      });
      localStorage.setItem('cart', JSON.stringify(updatedCartIncrement));
      return {
        ...state,
        cart: updatedCartIncrement
      };

    case DECREMENT: 
      const updatedCartDecrement = state.cart.map(item => {
        if (item.id === action.payload) {
          return {
            ...item,
            quantity: Math.max(item.quantity - 1, 0) 
          };
        }
        return item;
      });
      localStorage.setItem('cart', JSON.stringify(updatedCartDecrement));
      return {
        ...state,
        cart: updatedCartDecrement
      };

    default:
      return state;
  }
};
