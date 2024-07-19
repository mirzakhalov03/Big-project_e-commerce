const initialState ={
  token: localStorage.getItem('token') || null,
  user: null
}

export const authReducer = (state = initialState, action) => {
  switch(action.type){
    case "LOGIN_USER":
    case "REGISTER_USER":
      const { token, user } = action.data.payload;
      localStorage.setItem('token', token);
      
      return {
        token,
        user
      }
      default:
        return state

      
  }
}