import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedVehicles = ({ vehId, type }) => {
    const { vehicles } = useContext(AppContext)
    const navigate = useNavigate()
    const [relVeh, setRelVehs] = useState([])

    useEffect(() => {
        if (vehicles.length > 0 && type) {
            const vehiclesData = vehicles.filter((veh) => veh.type === type && veh._id != vehId)
            setRelVehs(vehiclesData)
        }
    }, [vehicles, vehId, type])

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-medium'>Top Vehicles to Book</h1>
            <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of vehicles.</p>
            <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {relVeh.slice(0, 5).map((item, index) => (
                    <div
                        onClick={() => { navigate(`/booking/${item._id}`); scrollTo(0, 0) }}
                        key={index}
                        className='border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] hover:shadow-2xl transition-all duration-500 flex flex-col h-full'
                    >
                        {/* Fixed size image container */}
                        <div className='w-full h-40 bg-gray-100 overflow-hidden flex items-center justify-center'>
                            <img
                                className='w-full h-full object-cover'
                                src={item.image}
                                alt={item.name}
                            />
                        </div>
                        <div className='p-4 flex-grow'>
                            <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'} `}>
                                <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></p>
                                <p>{item.available ? 'Available' : 'Booked'}</p>
                            </div>
                            <p className='text-gray-900 text-lg font-medium line-clamp-1'>{item.name}</p>
                            <p className='text-gray-600 text-sm'>{item.type}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button
                onClick={() => { navigate('/vehicles'); scrollTo(0, 0) }}
                className='bg-blue-200 text-gray-600 px-12 py-3 rounded-full mt-10 hover:bg-blue-500 hover:text-white transition-colors'
            >
                More
            </button>
        </div>
    )
}

export default RelatedVehicles