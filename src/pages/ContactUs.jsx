import React from 'react';

const ContactUs = () => {
  return (
    <div className='min-h-screen section_container pt-10 px-10 bg-white'>
      <div className='w-full flex flex-col items-center justify-center space-y-1'>
        <h1 className='text-primary-black text-4xl sm:text-5xl font-bold pt-10'>
          Connect with Us
        </h1>
        <p className='text-primary-black pt-3 text-lg text-center max-w-2xl px-4'>
          We’re here to answer your questions and provide support
        </p>
      </div>

      <div className='flex flex-col md:flex-row justify-between mt-20 px-24 md:px-28 max-w-8xl'>
        <div className='w-full md:w-[500px] p-8 bg-primary-light rounded-md h-96'>
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
                <p className='text-primary-black'>Mega Cabs - Headquarters
                  No 456 / B, Kings Lane, Bambalapitiya,
                  Sri Lanka</p>
              </div>
            </div>
          </div>
        </div>


        <div className='w-full md:w-1/2 mt-8 md:mt-0'>
          <form className='space-y-6 bg-primary-light p-8 rounded-md'>
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
            <button
              type='submit'
              className='bg-primary-black ml-[22rem] text-white px-6 py-3 rounded-lg'
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;