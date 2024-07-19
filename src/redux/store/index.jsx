import { legacy_createStore } from "redux";
import { authReducer } from "../reducer/authReducer";

const store = legacy_createStore(authReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store