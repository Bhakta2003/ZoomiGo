import React from 'react'
import CountUp from './CountUp'
import AnimatedContent from './AnimatedContent'

const Achievements = () => {
    return (
        <div className='my-20'>

            <AnimatedContent
                distance={150}
                direction="vertical"
                reverse={false}
                config={{ tension: 80, friction: 20 }}
                initialOpacity={0.2}
                animateOpacity
                scale={1.0}
                threshold={0.3}
            >
                <div className="text-center">
                    <p className='text-4xl my-4'>Our <span className='text-blue-600'>Achievements</span></p>
                    <p className='text-md'>Our Journey Of Success is a testament to the collective efforts and determination of our team.</p>
                </div>
            </AnimatedContent>


            <div className='my-10 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8'>
                <div className='border-0 rounded-xl p-5 text-center'>
                    <CountUp
                        from={0}
                        to={600}
                        separator=","
                        direction="up"
                        duration={1}
                        className="count-up-text text-6xl font-bold"
                    /><span className='text-6xl font-bold'>+</span>
                    <p className='mt-2'>Happy Customers</p>
                </div>
                <div className='border-0 rounded-xl p-5 text-center'>
                    <CountUp
                        from={0}
                        to={50}
                        separator=","
                        direction="up"
                        duration={1}
                        className="count-up-text text-6xl font-bold"
                    /><span className='text-6xl font-bold'>+</span>
                    <p className='mt-2'>Vehicle Models</p>
                </div>
                <div className='border-0 rounded-xl p-5 text-center'>
                    <CountUp
                        from={0}
                        to={500}
                        separator=","
                        direction="up"
                        duration={1}
                        className="count-up-text text-6xl font-bold"
                    /><span className='text-6xl font-bold'>+</span>
                    <p className='mt-2'>Positive Rating</p>
                </div>
            </div>
        </div>
    )
}

export default Achievements