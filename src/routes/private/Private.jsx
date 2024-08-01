import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"


const Private = () => {
  const auth = useSelector(state => state.token);
  return auth? <Outlet /> : <Navigate to="/auth" />
}

export default Private