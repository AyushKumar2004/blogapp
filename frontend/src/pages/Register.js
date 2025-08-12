import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthProvider';

const Register = () => {

  const {isAuthenticated,setIsAuthenticated,profile,setProfile}=useAuth();
  const navigate=useNavigate();

  const [name,setName]=useState();
  const [email,setEmail]=useState();
  const [phone,setPhone]=useState();
  const [password,setPassword]=useState();
  const [role,setRole]=useState();
  const [education,setEducation]=useState();
  const [photo,setPhoto]=useState();
  const [photoPreview,setPhotoPreview]=useState();

  const changePhotoHandler=(e)=>{
    //console.log(e);
    const file=e.target.files[0];
    const reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onload=()=>{
      setPhotoPreview(reader.result);
      setPhoto(file)
    }
  }

  const handleRegister=async(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append('name',name);
    formData.append('email',email);
    formData.append('phone',phone);
    formData.append('password',password);
    formData.append('role',role);
    formData.append('education',education);
    formData.append('photo',photo);
    try{
      const {data}=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/register`,formData,{
        withCredentials:true,
        headers:{
          "Content-Type":"multipart/form-data"
        }
      });
      //console.log("this is my data",data);
      toast.success(data.message || 'User Registered Successful')
      
      localStorage.setItem("jwt", data.token); 
      setIsAuthenticated(true);
      setProfile(data.newUser);
      setEducation('');
      setEmail('');
      setName('');
      setPassword('');
      setPhone('');
      setRole('');
      setPhone('');
      setPhotoPreview('');
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
          <form onSubmit={handleRegister}>
            <div className='font-semibold text-xl text-center'>
                Daily<span className='text-blue-500'>Blog</span>
            </div>
            <h1 className='text-xl font-semibold mb-6'>Register</h1>
            <select value={role} onChange={(e)=>setRole(e.target.value)} className='w-full p-2 mb-4 border rounded-md'>
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <div className='mb-4'>
              <input type="text" placeholder='Your Name' value={name} onChange={(e)=>setName(e.target.value)} className='w-full p-2  border rounded-md'></input>
            </div>
            <div className='mb-4'>
              <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder='Your Email Address' value={email} className='w-full p-2  border rounded-md'></input>
            </div>
            <div className='mb-4'>
              <input type="number" onChange={(e)=>setPhone(e.target.value)} placeholder='Your Phone Number' value={phone} className='w-full p-2  border rounded-md'></input>
            </div>
            <div className='mb-4'>
              <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder='Your Password' value={password} className='w-full p-2  border rounded-md'></input>
            </div>
            <select value={education} onChange={(e)=>setEducation(e.target.value)} className='w-full p-2  border rounded-md'>
              <option value="">Select Your Education</option>
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
              <option value="MBA">MBA</option>
              <option value="BBA">BBA</option>
              <option value="BTech">BTech</option>
            </select>
            <div className='flex items-center mb-4'>
              <div className='photo w-20 h-20 mr-4'>
                <img src={photoPreview?`${photoPreview}`:"photo"} alt='photo'></img>
              </div>
              <input type="file" onChange={changePhotoHandler} className='w-full p-2 border rounded-md'></input>
            </div>
            <p className='text-center mb-4'>Already registered? <Link to='/login' className='text-blue-600'>Login Now</Link></p>
            <button type='submit' className='w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded:md text-white'>Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
