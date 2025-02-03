import Booking from './Booking'


const Banner = () => {
  
    return (
        <div className="relative h-screen section_container">
            <div className="absolute inset-0 bg-cover bg-center" style={{
                backgroundImage: "url('https://kangaroocabs.com/assets/hero-ac80e8ed.jpg')",
            }}>
                <div className="absolute inset-0 bg-zinc-700 bg-opacity-50"></div>
            </div>

            <div className="absolute inset-x-0 top-16 flex flex-col items-center justify-center text-white text-center px-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-4">
                    Your Journey with Mega Cabs
                </h1>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                    Starts Here
                </h2>
                <h3 className="text-lg sm:text-2xl lg:text-xl pt-10">
                    Your safety and comfort is our concern
                </h3>
            </div>
           <Booking />
        </div>
    )
}

export default Banner