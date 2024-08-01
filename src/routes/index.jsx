import { lazy } from "react"
import { Navigate, useRoutes } from "react-router-dom"
const Login = lazy(() => import("./auth/login/Login"))
const Register = lazy(() => import("./auth/register/Register"))
const Products = lazy(() => import("./dashboard/products/Products"))
const Users = lazy(() => import("./dashboard/users/Users"))
const Home = lazy(() => import("./home/Home"))
const Auth = lazy(() => import("./auth/Auth"))
const Profile = lazy(() => import("./profile/Profile"))
import Suspense from "../utils/index"
import Private from "./private/Private"
import { useSelector } from "react-redux"
const Dashboard = lazy(() => import("./dashboard/Dashboard"))


const RouteController = () => {
    const auth = useSelector(state => state.token);
    
    
    return useRoutes([
        {
            path: "",
            element: <Suspense><Home /></Suspense>
        },
        {
            path: "auth",
            element: auth? <Navigate to="/dashboard" /> : <Suspense><Auth /></Suspense>,
            children: [
                {
                    path: "",
                    element: <Suspense><Login/></Suspense>
                },
                {
                    path: "register",
                    element: <Suspense><Register/></Suspense>
                }
            ]
        },
        {
            path: "dashboard",
            element: <Suspense><Private/></Suspense>,
            children: [
                {
                    path: "",
                    element: <Suspense><Dashboard/></Suspense>,
                    children: [
                        {
                            path: "",
                            element: <Suspense><Products /></Suspense>
                        },
                        {
                            path: "/dashboard/users",
                            element: <Suspense><Users /></Suspense>
                        }
                    ]
                },
                {
                    path: "/dashboard/profile",
                    element: <Suspense><Profile /></Suspense>
                }

            ]
        }
    ])
  
}

export default RouteController