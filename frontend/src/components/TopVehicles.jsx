import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import { vehicles } from '../assets/assets';
import { AppContext } from '../context/AppContext'


const TopVehicles = () => {
    const navigate = useNavigate();
    const { vehicles } = useContext(AppContext)

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-medium'>Top Vehicles to Book</h1>
            <p className='sm:w-1/3 text-center text-md'>Browse our premium selection of vehicles for your next ride.</p>

            <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {vehicles.slice(0, 10).map((vehicle) => (
                    <div
                        onClick={() => {
                            navigate(`/booking/${vehicle._id}`);
                            window.scrollTo(0, 0)
                        }}
                        key={vehicle._id}
                        className='border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[10px] transition-all duration-500 flex flex-col h-full hover:shadow-2xl'
                    >
                        {/* Fixed height image container */}
                        <div className='h-48 bg-gray-100 flex items-center justify-center overflow-hidden'>
                            <img
                                className='w-full h-full object-cover '
                                src={vehicle.image}
                                alt={vehicle.name}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'path-to-fallback-image.jpg';
                                }}
                            />
                        </div>

                        {/* Content container with fixed padding and flex-grow */}
                        <div className='p-4 flex flex-col flex-grow'>
                            <div className='flex items-center gap-2 text-sm'>
                                <p className='flex items-center gap-1'>
                                    ⭐ {vehicle.stars}
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
                            <div className=' flex justify-between items-center mt-auto'>
                                <span className='text-sm font-medium capitalize'>{vehicle.type}</span>
                                <span className={`px-2 py-1 text-xs rounded-full ${vehicle.available ? 'bg-green-100 text-green-400' : 'bg-gray-100 text-gray-800'}`}>
                                    {vehicle.available ? 'Available' : 'Booked'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => {
                    navigate('/vehicles');
                    window.scrollTo(0, 0)
                }}
                className='bg-blue-600 text-white px-12 py-3 rounded-full mt-10 hover:bg-blue-400 transition-colors'
            >
                View All Vehicles
            </button>
        </div>
    );
};

export default TopVehicles;