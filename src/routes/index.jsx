import { lazy } from "react"
import { useRoutes } from "react-router-dom"
import Login from "./auth/login/Login"
import Register from "./auth/register/Register"
const Home = lazy(() => import("./home/Home"))
const Auth = lazy(() => import("./auth/Auth"))
import Suspense from "../utils/index"


const RouteController = () => {
    
    return useRoutes([
        {
            path: "",
            element: <Suspense><Home /></Suspense>
        },
        {
            path: "auth",
            element: <Suspense><Auth /></Suspense>,
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
        }
    ])
  
}

export default RouteController