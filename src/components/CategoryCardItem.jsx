import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import PropTypes from "prop-types";

const CategoryCardItem = ({ category, onUpdatePrice }) => {
  const [price, setPrice] = useState(category.price);
  const [isValid, setIsValid] = useState(true);

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setPrice(value);
      setIsValid(value.trim() !== "");
    }
  };

  const handleUpdate = () => {
    if (isValid) {
      onUpdatePrice(category.id, price);
    }
  };

  const categoryIcon = new URL(`../assets/${category.icon}`, import.meta.url)
    .href;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="w-full bg-gray-200 flex items-center justify-center p-4">
        <img
          src={categoryIcon}
          alt={category.name}
          className="h-16 w-16 object-contain"
        />
      </div>
      <div className="p-4 flex flex-col items-center">
        <h1 className="text-lg font-semibold text-primary-black">
          {category.name}
        </h1>
        <div className="mt-4 flex items-center space-x-2">
          <input
            type="text"
            value={price}
            onChange={handlePriceChange}
            className={`w-20 p-2 border rounded-lg text-center text-sm focus:outline-none focus:ring-2 ${
              isValid
                ? "border-gray-300 focus:ring-primary-yellow"
                : "border-red-500 focus:ring-red-500"
            }`}
          />
          <span className="text-sm text-gray-600">/ per km</span>
        </div>
        <button
          onClick={handleUpdate}
          className={`mt-4 w-full py-2 rounded-lg flex items-center justify-center transition-colors ${
            isValid
              ? "bg-primary-yellow text-primary-black hover:bg-opacity-90"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!isValid}
        >
          Update Price
          <FaCheck className="ml-2" />
        </button>
      </div>
    </div>
  );
};

CategoryCardItem.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  onUpdatePrice: PropTypes.func.isRequired,
};

export default CategoryCardItem;
