import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-slate-300' >
      <div className='w-[600px] h-[300px] bg-slate-100 flex flex-col rounded-xl shadow-cm p-[24px]'>
        <h1 className='text-center text-4xl font-bold text-[goldenrod]'>Welcome to the Home page</h1>
        <br />
        <br />
        <br />
        <p className='text-center'>Login to see full features</p>
        <br />
        <br />
        <NavLink to="/auth/" className='text-center text-2xl  pt-2 pb-2 pl-5 pr-5 rounded-2xl flex justify-center items-center bg-[dodgerblue] text-[white]'> Login </NavLink>
      </div>
    </div>
  )
}

export default Home