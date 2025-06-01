import React from 'react';
import { assets } from '../assets/assets';
import AnimatedContent from './AnimatedContent';

const InfiniteHorStrip = () => {
    // Array of brand image imports from your assets
    const brandImages = [
        assets.img1,
        assets.img2,
        assets.img3,
        assets.img4,
        assets.img5,
        assets.img6,
        assets.img7,
        assets.img8,
        assets.img9,
        assets.img10,
    ];

    return (
        <div className="w-full overflow-hidden py-12 bg-gray-50 relative group">

            <AnimatedContent
                distance={150}
                direction="vertical"
                reverse={false}
                config={{ tension: 80, friction: 20 }}
                initialOpacity={0.1}
                animateOpacity
                scale={1.0}
                threshold={0.3}
            >
                <div className="text-center mb-12"> 
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Explore Brands
                    </h2>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Discover our trusted partners and collaborators
                    </p>
                </div>
            </AnimatedContent>




            {/* Gradient fade edges */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

            {/* Double the array for seamless looping */}
            <div className="flex animate-infinite-scroll items-center">
                {[...brandImages, ...brandImages].map((imgSrc, index) => (
                    <div key={index} className="mx-8 flex-shrink-0">
                        <img
                            src={imgSrc}
                            alt={`Brand ${index % brandImages.length + 1}`}
                            className="h-12 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                            style={{ width: 'auto', maxWidth: '180px' }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfiniteHorStrip;