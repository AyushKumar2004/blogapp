import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';


const MyBlogs = () => {

  const [myBlogs,setMyBlogs]=useState();
  console.log(myBlogs)
  useEffect(()=>{
    const fetchMyBlogs=async()=>{
      try{
        const {data}=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/blogs/my-blog`,
          {
            withCredentials:true,
          }
        )
        //console.log('myblogs',data);
        setMyBlogs(data);
      }catch(error){
        console.log(error);

      } 
    }
    fetchMyBlogs();
  },[])

  const handleDelete = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/api/blogs/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message || "Blog deleted successfully");
        setMyBlogs((value) => value.filter((blog) => blog._id !== id));
      })
      .catch((error) => {
        toast.error(error.response.message || "Failed to delete blog");
      });
  };

  return (
    <div>
      <div className="container mx-auto my-12 p-4 ml-50">
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:ml-20">
          {myBlogs && myBlogs.length > 0 ? (
            myBlogs.map((element) => (
              <div 
                className="bg-white shadow-lg rounded-lg overflow-hidden"
                key={element._id}
              >
              <Link to={`/blog/${element._id}`}>
                {element?.blogImage && (
                    <img
                      src={element?.blogImage?.url}
                      alt="blogImg"
                      className="w-full h-48 object-cover"
                    />
                  )}
              </Link>
                <div className="p-4">
                  <span className="text-sm text-gray-600">
                    {element?.category}
                  </span>
                  <h4 className="text-xl font-semibold my-2">
                    {element?.title}
                  </h4>
                  <div className="flex justify-between mt-4">
                    <Link
                      to={`/blog/update/${element._id}`}
                      className="text-blue-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 "
                    >
                      UPDATE
                    </Link>
                    <button
                      onClick={() => handleDelete(element._id)}
                      className="text-red-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 "
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              You have not posted any blog to see!
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyBlogs
