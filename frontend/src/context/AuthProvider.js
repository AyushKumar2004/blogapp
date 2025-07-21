import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from "axios"
import Cookies from "js-cookie"

export const AuthContext=createContext()

export const AuthProvider = ({children}) => {


    const [blogs,setBlogs]=useState();
    const [profile,setProfile]=useState();
    const [isAuthenticated,setIsAuthenticated]=useState(false)
    const [isLoading, setIsLoading] = useState(true);
    

    useEffect(()=>{
        async function fetchBlogs(){
            try{
                const response=await axios.get("http://localhost:5000/api/blogs/all-blogs",{withCredentials:true});
                console.log(response);
                setBlogs(response.data);
            }catch(error){
                console.log(error);
            }
        }
        async function fetchProfile(){
            try{
                let token = localStorage.getItem("jwt"); // Retrieve the token directly from the localStorage (Go to login.jsx)
                console.log(token);
                if(token){
                    const {data}=await axios.get("http://localhost:5000/api/users/my-profile",{
                        withCredentials:true,
                        headers:{
                            "Content-Type":"application/json",
                        }
                    });
                    console.log("this is profile",data);
                    setProfile(data?.user || data?.newUser);
                    setIsAuthenticated(true);
                }
            }catch(error){
                console.log(error);
                setIsAuthenticated(false);
            }finally {
                setIsLoading(false); // ✅ done loading
            }
        }
        fetchBlogs();
        fetchProfile();
    },[])


  return (
    <AuthContext.Provider value={{blogs,profile,setProfile,isAuthenticated,setIsAuthenticated,isLoading}}>{children}</AuthContext.Provider>
  )
}

export const useAuth=()=>useContext(AuthContext);