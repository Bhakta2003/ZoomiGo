import React from 'react';
import { AdvancedVideo } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { useNavigate } from 'react-router-dom';

const VideoSection = () => {

    const navigate = useNavigate();

    
    const cld = new Cloudinary({
        cloud: {
            cloudName: import.meta.env.VITE_CLOUDINARY_NAME 
        }
    });

    // Create a video instance
    const myVideo = cld.video('homepage_video_n84eh0'); // Replace with your video's public ID

    return (
        <section className="relative w-screen h-[80vh] overflow-hidden -mx-[calc((100vw-100%)/2)]">
            {/* Cloudinary Video Background */}
            <div className="absolute inset-0 w-screen">
                <AdvancedVideo
                    cldVid={myVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                />
                {/* Optional overlay */}
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 mx-auto max-w-7xl">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                    Premium Rides, Unforgettable Journeys
                </h1>
                <p className="text-xl text-white max-w-2xl mb-8">
                    Discover premium vehicles for your next journey
                </p>
                <button
                    onClick={() => {
                        navigate('/vehicles');
                        window.scrollTo(0, 0)
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors">
                    Explore Fleet
                </button>
            </div>
        </section>
    );
};

export default VideoSection;