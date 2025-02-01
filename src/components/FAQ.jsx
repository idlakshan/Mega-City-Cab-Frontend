import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            heading: "General Information",
            question: "What is Mega Cabs?",
            answer: "Mega Cabs is a reliable and convenient transportation service that offers various vehicle options for your travel needs."
        },
        {
            heading: "Account Registration",
            question: "How do I create an account?",
            answer: "You see the right corner login icon, then click and enter your details, and verify your email to create an account."
        },
        {
            heading: "Booking a Ride",
            question: "How can I book a ride?",
            answer: "You can enter your destination with a selected car category. Just a simple click, and we take your booking."
        },
        {
            heading: "Payment Option",
            question: "What are the payment options available?",
            answer: "We gladly accept payments through credit and debit cards, ensuring a seamless and secure transaction process for your convenience."

        }
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className='section_container pt-16 bg-primary-black'>
            <div className='w-full flex flex-col items-center justify-center'>
                <h1 className='text-white text-5xl'><span className='font-semibold'>FAQ</span></h1>
                <p className='text-white pt-3 text-lg'>Discover more information about Mega Cabs for your travel</p>
            </div>
            
            <div className='w-full px-4 md:px-16 mt-10'>
                {faqs.map((faq, index) => (
                    <div key={index} className='mb-6 w-[90%] md:w-[80%] mx-auto'>
                        <div className='bg-white min-h-[80px] rounded-lg shadow-md p-4'>
                            <h2 className='text-primary-black text-md mb-2'>{faq.heading}</h2>
                            <div
                                onClick={() => toggleFAQ(index)}
                                className='flex justify-between items-center cursor-pointer'
                            >
                                <p className='font-bold text-primary-black text-lg md:text-xl'>{faq.question}</p>
                                <div>
                                    {activeIndex === index ? (
                                        <FaChevronUp className='text-primary-black' />
                                    ) : (
                                        <FaChevronDown className='text-primary-black' />
                                    )}
                                </div>
                            </div>
                            {activeIndex === index && (
                                <div className='mt-2 text-primary-black'>
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

      
            <div className='w-full flex justify-center mt-10'>
                <button
               
                    className='text-primary-black bg-white py-3 px-6 rounded-md flex items-center justify-center space-x-2 font-semibold mb-6'
                >
                    <span>See More</span>
                    <img src="src/assets/arrow.png" alt="arrow icon" className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default FAQ;