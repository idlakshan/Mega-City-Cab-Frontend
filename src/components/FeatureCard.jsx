const FeatureCard = ({ img, name, desc }) => {
    return (
      <div className="bg-primary-light shadow-md rounded-lg p-4 w-full sm:w-80 md:w-72 lg:w-72 h-[20rem] flex flex-col items-center text-center mt-10 mb-20 justify-center mx-auto">
          <div className="w-28 h-28 sm:w-30 sm:h-24 md:w-32 md:h-28 lg:w-36 lg:h-28 overflow-hidden mb-5 mt-2">
              <img src={img} alt={name} className="w-full h-full object-cover" />
          </div>
          <h2 className="text-xl text-primary-black font-semibold">{name}</h2>
          <p className="text-sm text-primary-black pt-2">{desc}</p>
      </div>
    )
  }

  export default FeatureCard;