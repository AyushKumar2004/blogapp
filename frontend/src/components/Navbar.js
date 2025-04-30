import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {IoCloseSharp} from "react-icons/io5"
import {AiOutlineMenu} from "react-icons/ai"
import { useAuth } from '../context/AuthProvider'
import axios from 'axios'
import toast from 'react-hot-toast'

const Navbar = () => {

    const [show,setShow]=useState(false)
    const {profile,isAuthenticated,setIsAuthenticated}=useAuth();
    console.log(profile)
    const navigate=useNavigate();

    const handleLogout=async(e)=>{
        e.preventDefault();
        try{
          const {data}=await axios.get("http://localhost:5000/api/users/logout",{
            withCredentials:true
          })
          toast.success(data.message)
          localStorage.removeItem("jwt");
          setIsAuthenticated(false)
          navigate("/");
        }catch(error){
          console.log(error);
          toast.error(error.data.message || "failed to logout")
        }
      }

  return (
    
    <nav className='shadow-lg px-4 py-3'>
        <div className='flex items-center justify-between container mx-auto'>
            <div className='font-semibold text-xl'>
                Daily<span className='text-blue-500'>Blog</span>
            </div>
            <div className='mx-6'>
                <ul className='hidden md:flex space-x-6'>
                    <li><Link to='/' className='hover:text-blue-500'>Home</Link></li>
                    <li><Link to='/blogs' className='hover:text-blue-500'>Blogs</Link></li>
                    <li><Link to='/creators' className='hover:text-blue-500'>Creators</Link></li>
                    <li><Link to='/about' className='hover:text-blue-500'>About</Link></li>
                    <li><Link to='/contact' className='hover:text-blue-500'>Contact</Link></li>
                </ul>
                <div className='md:hidden' onClick={()=>setShow(!show)}>
                    {
                        show?<IoCloseSharp size={25}/>:<AiOutlineMenu size={25}/>
                    }
                </div>
            </div>
            <div className='space-x-2 hidden md:flex'>
            {isAuthenticated && profile?.user?.role==="admin"
            ?(<Link to='/dashboard' className='uppercase bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 px-4 py-2 rounded'>Dashboard</Link>
            ):("")
            }


            {!isAuthenticated?(
            <Link to='/login' className='uppercase bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded'>Login</Link>
            ):(
            <div>
                <button onClick={handleLogout} className='uppercase bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded'>Logout</button>
            </div>

            )}
            </div>
        </div>

        {
            show && (
                <div className='bg-white'>
                    <ul className='flex flex-col h-screen items-center justify-center space-y-3 md:hidden text-xl'>
                        <li><Link to='/' onClick={()=>setShow(!show)} smooth='true' duration={500} offset={-70} activeclass='active' className='hover:text-blue-500'>Home</Link></li>
                        <li><Link to='/blogs' onClick={()=>setShow(!show)} smooth='true' duration={500} offset={-70} activeclass='active' className='hover:text-blue-500'>Blogs</Link></li>
                        <li><Link to='/creators' onClick={()=>setShow(!show)} smooth='true' duration={500} offset={-70} activeclass='active' className='hover:text-blue-500'>Creators</Link></li>
                        <li><Link to='/about' onClick={()=>setShow(!show)} smooth='true' duration={500} offset={-70} activeclass='active' className='hover:text-blue-500'>About</Link></li>
                        <li><Link to='/contact' onClick={()=>setShow(!show)} smooth='true' duration={500} offset={-70} activeclass='active' className='hover:text-blue-500'>Contact</Link></li>
                    </ul>
                </div>
            )
        }
    </nav>

  )
}

export default Navbar
