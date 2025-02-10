import React, { useEffect } from 'react'
import Banner from '../components/Banner'
import Feature from './Feature'
import FAQ from '../components/FAQ'
import ContactUs from './ContactUs'




const Home = () => {

  useEffect(()=>{
    window.scrollTo(0,0)
  },[]);

  return (
    <>
    <Banner/>
    <Feature/>
    <FAQ/>
    <ContactUs/>
   
    </>
  )
}

export default Home