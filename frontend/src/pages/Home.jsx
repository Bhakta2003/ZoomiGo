import React from 'react'
import Header from '../components/Header'
import Banner from '../components/Banner'
import InfiniteHorStrip from '../components/InfiniteHorStrip'
import TopVehicles from '../components/TopVehicles'
import Achievements from '../components/Achievements'
import TypeMenu from '../components/TypeMenu'
import VideoSection from '../components/VideoSection'
import ServicesOffered from '../components/ServicesOffered'

const Home = () => {
  return (
    <div className=''>
      <Header/>
      <InfiniteHorStrip/>
      <VideoSection/>
      <TypeMenu/>
      <TopVehicles/>
      <ServicesOffered/>
      <Achievements/>
      <Banner/>
    </div>
  )
}

export default Home
