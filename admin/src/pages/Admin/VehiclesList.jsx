import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { HashLoader } from 'react-spinners';

const VehiclesList = () => {
  const { vehicles, aToken, getAllVehicles, changeAvailability, loading } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllVehicles()
    }
  }, [aToken])

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-[calc(100vh-80px)]">
        <HashLoader
          color="black"
          loading
          size={70}
          speedMultiplier={2}
        />
      </div>
    );
  }

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Vehicles</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          vehicles.map((item, index) => (
            <div className='border border-gray-300 rounded-xl max-w-46 overflow-hidden cursor-pointer group flex flex-col h-full' key={index}>
              {/* Image container - fixed height */}
              <div className='flex-shrink-0'>
                <img
                  className='w-full h-40 object-cover bg-white group-hover:scale-110 transition-all duration-500'
                  src={item.image}
                  alt={item.name}
                />
              </div>
              {/* Content container that fills remaining space */}
              <div className='px-4 pt-4 pb-4 bg-zinc-900 flex-grow flex flex-col'>
                <p className='text-gray-200 text-lg font-medium'>{item.name}</p>
                <p className='text-zinc-300 text-sm'>{item.type}</p>
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <input
                    onChange={() => changeAvailability(item._id)}
                    type="checkbox"
                    checked={item.available}
                  />
                  <p className={`${item.available ? 'text-green-400' : 'text-gray-400'}`}>
                    Available
                  </p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default VehiclesList