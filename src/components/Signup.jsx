import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Signup = () => {

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        phone: Yup.string()
            .matches(/^(?:\+94|0)?(?:7\d{8})$/, 'Invalid Sri Lankan phone number')
            .required('Phone number is required'),
        nic: Yup.string()
            .matches(/^(?:\d{9}[VvXx]|\d{12})$/, 'Invalid NIC format')
            .required('NIC is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(3, 'Password must be at least 3 characters')
            .required('Password is required'),
    });

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-primary-black mb-8">Sign Up</h2>

                <Formik
                    initialValues={{
                        name: '',
                        phone: '',
                        nic: '',
                        email: '',
                        password: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log('Signup successful', values);
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting, isValid, dirty }) => (
                        <Form className="space-y-6">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-primary-black">
                                    Name
                                </label>
                                <Field
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your name"
                                />
                                <ErrorMessage name="name" component="p" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-primary-black">
                                    Phone
                                </label>
                                <Field
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your phone number"
                                />
                                <ErrorMessage name="phone" component="p" className="text-red-500 text-sm mt-1" />
                            </div>


                            <div>
                                <label htmlFor="nic" className="block text-sm font-medium text-primary-black">
                                    NIC
                                </label>
                                <Field
                                    type="text"
                                    id="nic"
                                    name="nic"
                                    className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your NIC"
                                />
                                <ErrorMessage name="nic" component="p" className="text-red-500 text-sm mt-1" />
                            </div>


                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-primary-black">
                                    Email
                                </label>
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your email"
                                />
                                <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-primary-black">
                                    Password
                                </label>
                                <Field
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your password"
                                />
                                <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={!isValid || !dirty || isSubmitting}
                                    className={`w-full px-6 py-3 rounded-lg transition-colors duration-300 
                    ${isValid && dirty
                                            ? 'bg-primary-black text-white hover:bg-gray-900'
                                            : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                                        }`}
                                >
                                    {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                                </button>
                            </div>


                            <div className="text-center">
                                <p className="text-gray-600">
                                    Already have an account?{' '}
                                    <a href="/login" className="text-blue-500 hover:underline">
                                        Login
                                    </a>
                                </p>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Signup;
