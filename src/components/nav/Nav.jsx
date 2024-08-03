import { BsCart4 } from "react-icons/bs"; 
import { Link, NavLink } from 'react-router-dom'
import { MdOutlineDashboardCustomize } from "react-icons/md"; 
import useFetch from "../../hooks/useFetch";


const Nav = () => {
    const [data, loading] = useFetch("/auth/profile");
  return (
    <nav className='w-full bg-black'>
        <div className="container text-white">
          <div className="nav__hug flex items-center justify-between p-[20px]">
          <NavLink className="pl-[10px] pr-[10px] pt-1 pb-1 rounded-full border border-white" style={{display: "flex", gap: "6px", alignItems: "center"}} to="/dashboard"><MdOutlineDashboardCustomize style={{width: "40px", height: "40px"}} /> Dashboard</NavLink>
          <NavLink to="/" ><img style={{ height: "50px"}} src="https://freelogopng.com/images/all_img/1655873088shopify-logo-transparent.png" alt="" /></NavLink>
          <div className='flex gap-5 items-center'>
            <Link to="/cart"><BsCart4 style={{width: "25px", height: "25px"}} /></Link>
            <NavLink style={{display: "flex", gap: "6px", alignItems: "center"}} to="/dashboard/profile"><img className='w-[50px]' style={{width: "50px", height: "50px"}} src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" />
                {
                    loading ? <p className="text-[white]">Loading...</p> : <>
                        <span className="text-[white] text-center">Hello, {data?.first_name}</span>
                    </>
                }
            </NavLink>
          </div>
          </div>
        </div>
      </nav>
  )
}

export default Nav