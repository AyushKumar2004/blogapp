import React from 'react'
import Hero from '../home/Hero'
import Trending from '../home/Trending'
import Devotional from "../home/Devotional"
import PopularCreators from '../home/PopularCreators'
import { useAuth } from '../context/AuthProvider'

const Home = () => {

  const {isLoading}=useAuth();

  return (
    <>
      {isLoading ?(<div className='w-[90vw] h-[90vh] flex items-center justify-center'>Loading....</div>):(
      <div>
        <Hero/>
        <Trending/>
        <Devotional/>
        <PopularCreators/>
      </div>)
    }
    </>
  )
}

export default Home
