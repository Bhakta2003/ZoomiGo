import React from 'react'
import { assets } from '../assets/assets'
import RotatingText from './RotatingText'

const Header = () => {
  return (
    <div className='w-screen relative left-1/2 right-1/2 mx-[-50vw]'>
      <div className='flex flex-col md:flex-row flex-wrap bg-gradient-to-r from-[#1c4ff7] to-[#50affc] px-6 md:px-10 lg:px-25 mx-auto max-w-screen md:min-h-[calc(100vh-4rem)] pt-20 md:pt-8'> 

        {/*--------Left side---------------*/}
        <div className='md:w-1/2 flex flex-col items-center justify-center gap-4 py-10 m-auto md:py-[10vw] md:pt-60'>
          <div className='text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
            <div className='text-4xl md:text-6xl lg:text-6xl'>
              Rent{' '}
              <span className='inline-block'>
                <RotatingText
                  texts={['Cars', 'Bikes', 'Scooters', 'SUVs', 'Vans']}
                  mainClassName="px-2 sm:px-2 md:px-3 bg-white/20 overflow-hidden py-0.5 sm:py-1 md:py-2 rounded-lg inline-flex"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={1700}
                />
              </span>{' '}
              <br />
              at your choice
            </div>
          </div>
          <div className='flex flex-col md:flex-row items-center gap-3 text-white text-lg font-light'>
            <img src={assets.group_profiles} className='w-32' alt="" />
            <p className='text-center'>Simply browse through our extensive collection,<br className='hidden sm:block' /> book your vehicle hassle-free.</p>
          </div>
          <a href="#type" className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-lg m-auto md:m-0 hover:scale-105 transition-all duration-300'>
            Book now <img src={assets.arrow_icon} className='w-3' alt="" />
          </a>
        </div>

        {/*--------Right side---------------*/}
        <div className='flex flex-col lg:flex-row md:w-1/2 relative overflow-hidden'>
          <img src={assets.car_top} className='md:max-w-[400px] lg:max-w-[600px] w-4xl md:absolute bottom-0 h-auto rounded-lg top-5 right-0 self-end' alt="" />
        </div>
      </div>
    </div>
  )
}

export default Header