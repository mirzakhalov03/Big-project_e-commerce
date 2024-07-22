const initialState ={
  token: localStorage.getItem('token') || null,
  user: null,
  loading: false,
  error: null,
  isError: false,
  isSuccess: false,
  
}

export const authReducer = (state = initialState, action) => {
  switch(action.type){
    case "LOADING":
      return {
        ...state,
        loading: true
      }
    case "ERROR":
      return {
        loading: false,
        error: "Error",
        token: null,
        user: null
      }  
    case "LOGIN":
    case "REGISTER_USER":
      return {
        token: action.payload.token,
        user: action.payload.user,
        loading: false,
        error: null,
        isError: false,
        isSuccess: true
      }
      default:
        return state

      
  }
}