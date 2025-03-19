import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Contact number must be 10 digits (e.g., 0712345678)')
      .required('Phone number is required'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });
        formData.append('access_key', import.meta.env.VITE_EMAIL_KEY);

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(Object.fromEntries(formData)),
        });

        const result = await response.json();

        if (result.success) {
          toast.success('Message sent successfully!');
          formik.resetForm();
        } else {
          toast.error('Failed to send message. Please try again.');
        }
      } catch (error) {
        toast.error('An error occurred. Please try again later.');
      }
    },
  });

  return (
    <div id="contact" className='min-h-screen section_container pt-10 px-4 sm:px-10 bg-white'>
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
          <form onSubmit={formik.handleSubmit} className='space-y-6 bg-primary-light p-6 md:p-8 rounded-md'>
            <div>
              <input
                type='text'
                id='name'
                name='name'
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className='mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Your Name'
              />
              {formik.touched.name && formik.errors.name ? (
                <div className='text-red-500 text-sm mt-1'>{formik.errors.name}</div>
              ) : null}
            </div>
            <div>
              <input
                type='email'
                id='email'
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className='mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Your Email'
              />
              {formik.touched.email && formik.errors.email ? (
                <div className='text-red-500 text-sm mt-1'>{formik.errors.email}</div>
              ) : null}
            </div>
            <div>
              <input
                type='tel'
                id='phone'
                name='phone'
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className='mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Your Phone Number'
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className='text-red-500 text-sm mt-1'>{formik.errors.phone}</div>
              ) : null}
            </div>
            <div>
              <input
                type='text'
                id='subject'
                name='subject'
                value={formik.values.subject}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className='mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Subject'
              />
              {formik.touched.subject && formik.errors.subject ? (
                <div className='text-red-500 text-sm mt-1'>{formik.errors.subject}</div>
              ) : null}
            </div>
            <div>
              <textarea
                id='message'
                name='message'
                rows='4'
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className='mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Your Message'
              />
              {formik.touched.message && formik.errors.message ? (
                <div className='text-red-500 text-sm mt-1'>{formik.errors.message}</div>
              ) : null}
            </div>
            <div className='flex justify-center md:justify-end'>
              <button
                type='submit'
                className='bg-primary-black text-white px-6 py-3 rounded-lg w-full md:w-auto disabled:opacity-50'
                disabled={!formik.isValid || formik.isSubmitting}
              >
                {formik.isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;