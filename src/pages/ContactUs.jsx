import React from 'react';

const ContactUs = () => {
  return (
    <div className='min-h-screen section_container pt-10 px-4 sm:px-10 bg-white'>
      <div className='w-full flex flex-col items-center justify-center space-y-1'>
        <h1 className='text-primary-black text-4xl sm:text-5xl font-bold pt-10 text-center'>
          Connect with Us
        </h1>
        <p className='text-primary-black pt-3 text-lg text-center max-w-2xl px-4'>
          We’re here to answer your questions and provide support
        </p>
      </div>

    
      <div className='flex flex-col md:flex-row justify-between mt-10 md:mt-20 px-4 sm:px-10 lg:px-24 max-w-8xl mx-auto'>
        <div className='w-full md:w-[500px] p-6 md:p-8 bg-primary-light rounded-md mb-8 md:mb-0'>
          <div className='space-y-6'>
            <div className='flex items-center space-x-4'>
              <div>
                <h3 className='text-lg font-semibold text-primary-black'>Email</h3>
                <p className='text-primary-black'>id.lakshan21@gmail.com</p>
              </div>
            </div>
            <div className='flex items-center space-x-4'>
              <div>
                <h3 className='text-lg font-semibold text-primary-black'>Phone</h3>
                <p className='text-primary-black'>071 4038546</p>
              </div>
            </div>
            <div className='flex items-center space-x-4'>
              <div>
                <h3 className='text-lg font-semibold text-primary-black'>Address</h3>
                <p className='text-primary-black'>
                  Mega Cabs - Headquarters
                  <br />
                  No 456 / B, Kings Lane, Bambalapitiya,
                  <br />
                  Sri Lanka
                </p>
              </div>
            </div>
          </div>
        </div>

       
        <div className='w-full md:w-1/2'>
          <form className='space-y-6 bg-primary-light p-6 md:p-8 rounded-md'>
            <div>
              <input
                type='text'
                id='name'
                name='name'
                className='mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Your Name'
              />
            </div>
            <div>
              <input
                type='email'
                id='email'
                name='email'
                className='mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Your Email'
              />
            </div>
            <div>
              <input
                type='tel'
                id='phone'
                name='phone'
                className='mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Your Phone Number'
              />
            </div>
            <div>
              <input
                type='text'
                id='subject'
                name='subject'
                className='mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Subject'
              />
            </div>
            <div>
              <textarea
                id='message'
                name='message'
                rows='4'
                className='mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Your Message'
              />
            </div>
            <div className='flex justify-center md:justify-end'>
              <button
                type='submit'
                className='bg-primary-black text-white px-6 py-3 rounded-lg w-full md:w-auto'
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;