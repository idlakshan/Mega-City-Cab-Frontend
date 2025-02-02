import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className='min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8'>

      <div className='max-w-7xl mx-auto text-center mb-16'>
        <h1 className='text-4xl sm:text-5xl font-bold text-primary-black mb-6'>
          About Mega Cabs
        </h1>
        <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
          Your trusted partner for safe, reliable, and affordable transportation solutions. We are dedicated to making your journey comfortable and stress-free.
        </p>
      </div>


      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-16'>
        <div className='bg-white p-8 rounded-lg shadow-lg'>
          <h2 className='text-2xl font-bold text-primary-black mb-4'>Our Story</h2>
          <p className='text-gray-600 mb-4'>
            Mega Cabs was founded in 2010 with a vision to revolutionize the transportation industry. Over the years, we have grown into one of the most trusted cab service providers in the region.
          </p>
          <p className='text-gray-600'>
            Our commitment to excellence and customer satisfaction has earned us a loyal customer base and numerous industry accolades.
          </p>
        </div>
        <div className='bg-white p-8 rounded-lg shadow-lg'>
          <h2 className='text-2xl font-bold text-primary-black mb-4'>Our Mission</h2>
          <p className='text-gray-600 mb-4'>
            To provide safe, reliable, and affordable transportation services that exceed customer expectations. We strive to make every ride a pleasant experience.
          </p>
          <p className='text-gray-600'>
            Our mission is to connect people with their destinations seamlessly, while prioritizing safety and comfort.
          </p>
        </div>
      </div>

  
      <div className='max-w-7xl mx-auto mb-16'>
        <h2 className='text-3xl font-bold text-primary-black text-center mb-8'>Meet Our Team</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
        
          <div className='bg-white p-6 rounded-lg shadow-lg text-center'>
            <img
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpU9Dr0kiHTdH5ouqqUrU8t3z5Qh9I4WJ8JrclW5vK_h1gIe6jdQ52YE8rEoyl1gLq7eg&usqp=CAU'
              alt='Team Member'
              className='w-24 h-24 rounded-full mx-auto mb-4'
            />
            <h3 className='text-xl font-bold text-primary-black'>Dimuthu Lakshan</h3>
            <p className='text-gray-600'>CEO & Founder</p>
          </div>
   
          <div className='bg-white p-6 rounded-lg shadow-lg text-center'>
            <img
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_ErUv_8qe8jYxlVAwMmVWyYD3ZUMogUOS7HWsSIQ9z6b8T7SwqRSvd5omcjPmZLu5kVw&usqp=CAU'
              alt='Team Member'
              className='w-24 h-24 rounded-full mx-auto mb-4'
            />
            <h3 className='text-xl font-bold text-primary-black'>Dasun Perera</h3>
            <p className='text-gray-600'>Operations Manager</p>
          </div>
     
          <div className='bg-white p-6 rounded-lg shadow-lg text-center'>
            <img
              src='https://banner2.cleanpng.com/20240331/oyl/transparent-businessperson-business-attire-fashion-corporate-h-man-in-grey-suit-smiling-at-camera6609ca86ebe925.03440517.webp'
              alt='Team Member'
              className='w-24 h-24 rounded-full mx-auto mb-4'
            />
            <h3 className='text-xl font-bold text-primary-black'>Krishan Peries</h3>
            <p className='text-gray-600'>Head of Customer Service</p>
          </div>

          <div className='bg-white p-6 rounded-lg shadow-lg text-center'>
            <img
              src='https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTA4L3Jhd3BpeGVsX29mZmljZV8zNV9iZWF1dGlmdWxfc21pbGluZ195b3VuZ19pbmRpYW5fYnVzaW5lc3Nfd29tYV8yYWM3MjMyNS1jZmU3LTQ5ODgtODBkNi03YjViZTg3ODYzNjNfMS5qcGc.jpg'
              alt='Team Member'
              className='w-24 h-24 rounded-full mx-auto mb-4'
            />
            <h3 className='text-xl font-bold text-primary-black'>Disney Silva</h3>
            <p className='text-gray-600'>Marketing Director</p>
          </div>
        </div>
      </div>

    
      <div className='max-w-7xl mx-auto bg-primary-black text-white p-8 rounded-lg shadow-lg text-center'>
        <h2 className='text-3xl font-bold mb-4'>Ready to Ride with Us?</h2>
        <p className='text-lg mb-6'>
          Experience the best in class cab services. Book your ride today!
        </p>
        <Link to="/" className='bg-[#FCC737] text-primary-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors duration-300'>
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;