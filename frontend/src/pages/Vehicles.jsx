import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Vehicles = () => {
    const { type } = useParams()
    const [filterVehicles, setFilterVehicles] = useState([])
    const [showFilter, setShowFilter] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const { vehicles } = useContext(AppContext)

    const applyFilter = () => {
        if (type) {
            setFilterVehicles(vehicles.filter((vehicle) => vehicle.type === type))
        } else {
            setFilterVehicles(vehicles)
        }
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        const timer = setTimeout(() => {
            applyFilter()
        }, 1500)
        return () => clearTimeout(timer)
    }, [vehicles, type])

    // Skeleton Loading Component
    const SkeletonCard = () => (
        <div className='border border-gray-200 rounded-xl overflow-hidden flex flex-col h-full'>
            <div className='h-48 bg-gray-200 animate-pulse'></div>
            <div className='p-4 flex flex-col flex-grow space-y-3'>
                <div className='h-4 bg-gray-200 rounded-full animate-pulse w-3/4'></div>
                <div className='h-5 bg-gray-200 rounded-full animate-pulse w-full'></div>
                <div className='flex gap-2'>
                    <div className='h-3 bg-gray-200 rounded-full animate-pulse w-1/4'></div>
                    <div className='h-3 bg-gray-200 rounded-full animate-pulse w-1/4'></div>
                    <div className='h-3 bg-gray-200 rounded-full animate-pulse w-1/4'></div>
                </div>
                <div className='flex justify-between mt-4'>
                    <div className='h-3 bg-gray-200 rounded-full animate-pulse w-1/3'></div>
                    <div className='h-3 bg-gray-200 rounded-full animate-pulse w-1/4'></div>
                </div>
            </div>
        </div>
    )

    return (
        <div className='flex flex-col items-center gap-4 my-32 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-medium'>Top Vehicles to Book</h1>
            <p className='sm:w-1/3 text-center text-md'>Browse our premium selection of vehicles for your next ride.</p>

            <div className='flex flex-col sm:flex-row items-start gap-4 mt-5 w-full'>
                {/* Filter button - mobile only */}
                <button 
                    className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-blue-500 text-white' : ''}`}
                    onClick={() => setShowFilter(prev => !prev)}
                >
                    {showFilter ? 'Hide Filters' : 'Show Filters'}
                </button>

                {/* Filter sidebar */}
                <div className={`flex-col gap-4 text-sm text-gray-600 w-full sm:w-1/5 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
                    <p onClick={() => type === `Car` ? navigate('/vehicles') : navigate('/vehicles/Car')} 
                       className={`pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${type === 'Car' ? 'bg-blue-500 text-white' : ''}`}>
                        Cars
                    </p>
                    <p onClick={() => type === `Bike` ? navigate('/vehicles') : navigate('/vehicles/Bike')} 
                       className={`pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${type === 'Bike' ? 'bg-blue-500 text-white' : ''}`}>
                        Bikes
                    </p>
                    <p onClick={() => type === `Suv` ? navigate('/vehicles') : navigate('/vehicles/Suv')} 
                       className={`pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${type === 'Suv' ? 'bg-blue-500 text-white' : ''}`}>
                        SUVs
                    </p>
                    <p onClick={() => type === `Scooter` ? navigate('/vehicles') : navigate('/vehicles/Scooter')} 
                       className={`pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${type === 'Scooter' ? 'bg-blue-500 text-white' : ''}`}>
                        Scooters
                    </p>
                    <p onClick={() => type === `Sports Bike` ? navigate('/vehicles') : navigate('/vehicles/Sports Bike')} 
                       className={`pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${type === 'Sports Bike' ? 'bg-blue-500 text-white' : ''}`}>
                        Sports Bikes
                    </p>
                    <p onClick={() => type === `Van` ? navigate('/vehicles') : navigate('/vehicles/Van')} 
                       className={`pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${type === 'Van' ? 'bg-blue-500 text-white' : ''}`}>
                        Vans
                    </p>
                </div>

                {/* Vehicle cards grid */}
                <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 gap-y-6 px-3 sm:px-0'>
                    {loading ? (
                        Array(6).fill(0).map((_, index) => (
                            <SkeletonCard key={index} />
                        ))
                    ) : (
                        filterVehicles.map((vehicle) => (
                            <div
                                onClick={() => {
                                    navigate(`/booking/${vehicle._id}`)
                                    window.scrollTo(0, 0)
                                }}
                                key={vehicle._id}
                                className='border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 flex flex-col h-full hover:shadow-2xl'
                            >
                                <div className='h-48 bg-gray-100 flex items-center justify-center overflow-hidden'>
                                    <img
                                        className='w-full h-full object-cover'
                                        src={vehicle.image}
                                        alt={vehicle.name}
                                    />
                                </div>

                                <div className='p-4 flex flex-col flex-grow'>
                                    <div className='flex items-center gap-2 text-sm'>
                                        <p className='flex items-center gap-1'>
                                            {vehicle.stars}⭐
                                            <span className='text-gray-500 text-xs'>({Math.floor(vehicle.stars * 500)} reviews)</span>
                                        </p>
                                    </div>
                                    <p className='text-gray-900 text-lg font-medium mt-1 line-clamp-1'>{vehicle.name}</p>
                                    <div className='flex flex-wrap gap-2 mt-2 text-xs text-gray-600'>
                                        <span className='bg-blue-100 rounded-full py-0.5 px-1.5'><span className='text-blue-500'>{vehicle.seats} Seats</span></span>
                                        <span>•</span>
                                        <span>{vehicle.gear}</span>
                                        <span>•</span>
                                        <span>{vehicle.fuel}</span>
                                    </div>
                                    <div className='flex justify-between items-center mt-auto'>
                                        <span className='text-sm font-medium capitalize'>{vehicle.type}</span>
                                        <span className={`px-2 py-1 text-xs rounded-full ${vehicle.available ? 'bg-green-100 text-green-400' : 'bg-gray-100 text-gray-800'}`}>
                                            {vehicle.available ? 'Available' : 'Booked'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Vehicles