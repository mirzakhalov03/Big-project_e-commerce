import React from 'react'
import { Outlet } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';

const Auth = () => {
  return (
    <div className='h-screen flex justify-center items-center p-[20px] bg-slate-400'>
        <div className='p-[24px] bg-white rounded-[10px] w-[400px] shadow-cm'>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                <Outlet/>
            </GoogleOAuthProvider>
        </div>
    </div>
  )
}

export default Auth