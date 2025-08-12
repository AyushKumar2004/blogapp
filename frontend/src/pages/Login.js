import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthProvider';

const Login = () => {

  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [role,setRole]=useState('');

  const {isAuthenticated,setIsAuthenticated,setProfile}=useAuth();
  const navigate=useNavigate();


  const handleLogin=async(e)=>{
    e.preventDefault();

    try{
      const {data}=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/login`,{email,password,role},{
        method: 'POST',
        withCredentials:true,
        headers: {
          'Content-Type': 'application/json'
        },
      });
      //console.log(data);
      //console.log(data);
      // Store the token in localStorage
      localStorage.setItem("jwt", data.token); // storing token in localStorage so that if user refreshed the page it will not redirect again in login
      toast.success(data.message || "User Logined successfully", {
        duration: 3000,
      });
      setIsAuthenticated(true);
      setProfile(data?.user)
      setEmail('');
      setPassword('');
      setRole('');
      navigate("/");
    }catch(error){
      console.log(error);
      toast.error( "please fill required fields")
    }
  }

  return (
    <div>
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='w-full max-w-md bg-white shadow-md rounded-lg p-8'>
          <form onSubmit={handleLogin}>
            <div className='font-semibold text-xl text-center'>
                Daily<span className='text-blue-500'>Blog</span>
            </div>
            <h1 className='text-xl font-semibold mb-6'>Login</h1>
            <select value={role} onChange={(e)=>setRole(e.target.value)} className='w-full p-2 mb-4 border rounded-md'>
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <div className='mb-4'>
              <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder='Your Email Address' value={email} className='w-full p-2  border rounded-md'></input>
            </div>
            <div className='mb-4'>
              <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder='Your Password' value={password} className='w-full p-2  border rounded-md'></input>
            </div>
            <p className='text-center mb-4'>Already Logined? <Link to='/register' className='text-blue-600'>Register Now</Link></p>
            <button type='submit' className='w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded:md text-white'>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login

