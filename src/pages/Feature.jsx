import React from 'react';
import BabySeat from '../assets/baby-seat.png';
import CancelCall from '../assets/cancel-free.png';
import Pioneer from '../assets/pioneer-cab.png';
import Wide from '../assets/wide-fleet.png';
import FeatureCard from '../components/FeatureCard';

const cards = [
    {
        id: 1,
        name: "Sri Lanka's Pioneer Cab Service",
        desc: "We set the standard for quality and innovation in transportation",
        img: Pioneer,
    },
    {
        id: 2,
        name: "Baby Seats",
        desc: "Travel safely with your little ones using our secure baby seats",
        img: BabySeat,
    },
    {
        id: 3,
        name: "Diverse Fleet Selection",
        desc: "Choose from a variety of vehicle categories to suit your every need",
        img: Wide,
    },
    {
        id: 4,
        name: "Free Cancellation",
        desc: "Cancel anytime at no cost with just one call",
        img: CancelCall,
    },
];

const Feature = () => {
    return (
        <div className='section_container_feature pt-[340px] sm:pt-[10px] md:pt-[100px] lg:pt-[300px] !mb-20'>
            <div className='w-full flex flex-col items-center justify-center space-y-1'>
                <h1 className='text-primary-black text-4xl sm:text-5xl font-bold pt-10'>
                    Our <span className='text-primary-blue'>Features</span>
                </h1>
                <p className='text-primary-black pt-3 text-lg text-center max-w-2xl px-4'>
                    Discover why Mega Cabs is a cut above the rest
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-8 lg:px-16 mt-12">
                {cards.map((card) => (
                    <FeatureCard key={card.id} img={card.img} name={card.name} desc={card.desc} />
                ))}
            </div>
        </div>
    );
};

export default Feature;