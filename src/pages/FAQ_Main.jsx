import React, { useState } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

const FAQ_Main = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index); 
  };


  const faqs = [

      {
          "heading": "Managing Your Bookings",
          "question": "How can I view my bookings?",
          "answer": "You can easily view all your bookings in the 'My Trips' section on our website or app, keeping track of your upcoming journeys with ease."
      },
      {
          "heading": "Trip Management",
          "question": "How can I cancel my trip?",
          "answer": "Canceling your trip is simple! Just give us a call, and our support team will assist you in swiftly canceling your booking without any hassle."
      },
      {
          "heading": "Service Availability",
          "question": "Do you offer 24/7 service?",
          "answer": "Yes! Mega Cabs operates 24/7, ensuring you have access to reliable transportation whenever you need it, day or night."
      },
      {
          "heading": "Vehicle Options",
          "question": "Can I choose the type of vehicle for my trip?",
          "answer": "Absolutely! You can select from a range of vehicle options based on your preferences and travel needs, all at the touch of a button."
      }
  
  ];

  return (
    <div className='h-screen section_container'>
      <div className='h-3/5 bg-cover bg-center relative' style={{
        backgroundImage: "url('https://kangaroocabs.com/assets/hero-ac80e8ed.jpg')",
        backgroundPosition: 'center 20%',
      }}>

        <div className="absolute inset-0 bg-zinc-700 bg-opacity-50"></div>

        <div className="absolute inset-x-0 top-16 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-4">
            Got Questions?
          </h1>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            We’ve Got Answers!
          </h2>
          <h3 className="text-lg sm:text-2xl lg:text-xl pt-10">
            Find solutions to common queries about our services in our FAQ section
          </h3>
        </div>
      </div>


      <div className='w-full bg-white h-auto'>
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">

          {faqs.map((faq, index) => (
            <div key={index} className='mb-6 w-[90%] md:w-[100%] mx-auto'>
              <div className='bg-[#EDF1F2] min-h-[80px] rounded-lg shadow-md p-4'>
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
      </div>
    </div>
  );
};

export default FAQ_Main;
