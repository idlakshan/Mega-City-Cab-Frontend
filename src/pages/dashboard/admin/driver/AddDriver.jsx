import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';

// Define the validation schema using yup
const contactSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Contact number must be 10 digits (e.g., 0712345678)')
    .required('Phone number is required'),
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required'),
});

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
      // Validate the form data using yup
      await contactSchema.validate(data, { abortEarly: false });

      formData.append("access_key", import.meta.env.VITE_EMAIL_KEY);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Message sent successfully!");
        event.target.reset(); // Reset the form
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        // Display validation errors using toast
        error.inner.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
        {/* Contact Information */}
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

        {/* Contact Form */}
        <div className='w-full md:w-1/2'>
          <form className='space-y-6 bg-primary-light p-6 md:p-8 rounded-md' onSubmit={onSubmit}>
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
                className='bg-primary-black text-white px-6 py-3 rounded-lg w-full md:w-auto disabled:opacity-50'
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;