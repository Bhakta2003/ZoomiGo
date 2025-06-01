import React from 'react'
import { assets, typeData } from '../assets/assets'
import { Link } from 'react-router-dom'
import TiltedCard from './TiltedCard';
import AnimatedContent from './AnimatedContent';

const TypeMenu = () => {
  return (
    <div id='type' className='flex flex-col items-center gap-4 py-16 text-gray-800'>
      
      <h1 className='text-3xl font-medium'>Find by type</h1>
      <p className='sm:w-1/3 text-center text-md'>
        Simply browse through our extensive list of vehicles, book your favourite-one hassle-free!!!
      </p>

      <div className='flex sm:justify-center gap-8 pt-5 w-full overflow-x-auto px-4'>
        {typeData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)} 
            key={index}
            to={`/vehicles/${item.type}`}
            className='flex-shrink-0'
          >
            <TiltedCard
              imageSrc={item.image}
              altText={item.type}
              captionText={item.type}
              containerHeight="250px"
              containerWidth="150px"
              imageHeight="200px"
              imageWidth="150px"
              rotateAmplitude={29}
              scaleOnHover={1.1}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <div className='px-4 py-4'>
                  <div className="px-5 py-2 text-white font-bold bg-black/70 rounded-full">
                    {item.type.toUpperCase()}
                  </div>
                </div>
              }
              className="hover:shadow-2xl transition-all duration-300"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TypeMenu;