import { Header } from "antd/es/layout/layout";
import axios from "axios";
import store from "../redux/store"
import { SIGN_OUT } from "../redux/actions/actions";

const instanceApi = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type": "application/json",

    },
    timeout: 10000
});

instanceApi.interceptors.request.use(
    (request) => {
        if(request) {
            request.headers.Authorization = `Bearer ${store.getState().token}`
            return request
        }
        (error) => {
            return Promise.reject(error)
        }
    }
)

instanceApi.interceptors.response.use(
    (response) => {
        if(response) {
            return response;
        }
    },
    (error) => {
        if(error.response?.status === 401 || error.response?.status === 403) {
            store.dispatch({type: SIGN_OUT})

        }
        return Promise.reject(error)
    }
)

export default instanceApi