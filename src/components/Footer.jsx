import { FaInstagram, FaFacebookF, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className='w-full bg-[#203145] text-white py-12 mt-10'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>

                    <div>
                        <h3 className='text-xl font-bold mb-4 text-[#FCC737]'>About Us</h3>
                        <p className='text-gray-300'>
                            We are a leading cab service provider, offering reliable and affordable transportation solutions to our customers.
                        </p>
                    </div>


                    <div>
                        <h3 className='text-xl font-bold mb-4 text-[#FCC737]'>Quick Links</h3>
                        <ul className='space-y-2'>
                            <li>
                                <a href='#' className='text-gray-300 hover:text-[#FCC737] transition-colors duration-300'>
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href='#' className='text-gray-300 hover:text-[#FCC737] transition-colors duration-300'>
                                    Services
                                </a>
                            </li>
                            <li>
                                <a href='#' className='text-gray-300 hover:text-[#FCC737] transition-colors duration-300'>
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href='#' className='text-gray-300 hover:text-[#FCC737] transition-colors duration-300'>
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>


                    <div>
                        <h3 className='text-xl font-bold mb-4 text-[#FCC737]'>Contact Us</h3>
                        <ul className='space-y-2 text-gray-300'>

                            <li className='flex items-center space-x-2'>
                                <FaMapMarkerAlt className='h-5 w-5 text-[#FCC737]' />
                                <span>123 Main St, City, Country</span>
                            </li>

                            <li className='flex items-center space-x-2'>
                                <FaEnvelope className='h-5 w-5 text-[#FCC737]' />
                                <span>support@example.com</span>
                            </li>

                            <li className='flex items-center space-x-2'>
                                <FaPhoneAlt className='h-5 w-5 text-[#FCC737]' />
                                <span>+1 (123) 456-7890</span>
                            </li>
                        </ul>
                    </div>


                    <div>
                        <h3 className='text-xl font-bold mb-4 text-[#FCC737]'>Follow Us</h3>
                        <div className='flex space-x-4'>

                            <a href='#' className='text-gray-300 hover:text-[#FCC737] transition-colors duration-300'>
                                <FaSquareXTwitter className='h-6 w-6' />
                            </a>

                            <a href='#' className='text-gray-300 hover:text-[#FCC737] transition-colors duration-300'>
                                <FaInstagram className='h-6 w-6' />
                            </a>

                            <a href='#' className='text-gray-300 hover:text-[#FCC737] transition-colors duration-300'>
                                <FaFacebookF className='h-6 w-6' />
                            </a>
                        </div>
                    </div>
                </div>

                <div className='border-t border-gray-700 mt-8 pt-8 text-center text-gray-300'>
                    <p>&copy; {new Date().getFullYear()} Mega city Cab Service. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;