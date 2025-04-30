import React from 'react'
import Hero from '../home/Hero'
import Trending from '../home/Trending'
import Devotional from "../home/Devotional"
import PopularCreators from '../home/PopularCreators'

const Home = () => {
  return (
    <div>
      <Hero/>
      <Trending/>
      <Devotional/>
      <PopularCreators/>
    </div>
  )
}

export default Home
