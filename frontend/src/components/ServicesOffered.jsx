import React from 'react'
import { premiumServices } from '../assets/assets'
import SpotlightCard from './SpotlightCard'

const ServicesOffered = () => {
  return (
    <div className='bg-black py-16 w-screen -mx-[calc((100vw-100%)/2)] overflow-hidden'>
      <p className='text-center text-white text-4xl font-medium mb-12'>Our Premium Services</p>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto'>
        {premiumServices.map((service, index) => (
          <div key={index} className='h-full border-0 rounded-3xl'> 
            <SpotlightCard 
              className="custom-spotlight-card h-full" 
              spotlightColor="rgba(255, 255, 255, 0.2)"
            >
              <div className='flex flex-col items-center gap-4 p-6 h-full '>
                <img
                  src={service.image}
                  alt={service.name}
                  className='w-16 h-16 object-contain'
                />
                <h1 className='text-lg font-medium text-center text-gray-300'>{service.title}</h1>
                <p className='text-sm text-center text-gray-300'>{service.description}</p>
              </div>
            </SpotlightCard>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ServicesOffered