const FeatureCard = ({ img, name, desc }) => {
  return (
      <div className="bg-primary-light shadow-lg rounded-xl p-6 w-full h-full flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-xl">
          <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 overflow-hidden mb-6">
              <img src={img} alt={name} className="w-full h-full object-contain" />
          </div>
          <h2 className="text-xl font-semibold text-primary-black mb-3">{name}</h2>
          <p className="text-sm text-gray-600">{desc}</p>
      </div>
  );
};

export default FeatureCard;