import React, { useState } from 'react';

const CategoryCard = ({ categories, onUpdatePrice }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 shadow-sm mb-5" >
      {categories.map((category) => {
        const [price, setPrice] = useState(category.price);

        const handlePriceChange = (e) => {
          setPrice(e.target.value);
        };

        const handleUpdate = () => {
          onUpdatePrice(category.id, price);
        };

        const categoryIcon = new URL(`../assets/${category.icon}`, import.meta.url).href;

        return (
          <div key={category.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
          
            <div className="w-full bg-gray-200 flex items-center justify-center p-4">
              <img
                src={categoryIcon}
                alt={category.name}
                className="h-16 w-16 object-contain"
              />
            </div>
            <div className="p-4 flex flex-col items-center">
              <h1 className="text-lg font-semibold text-primary-black">{category.name}</h1>

        
              <div className="mt-4 flex items-center space-x-2">
                <input
                  type="number"
                  value={price}
                  onChange={handlePriceChange}
                  className="w-20 p-2 border border-gray-300 rounded-lg text-center text-sm focus:outline-none focus:ring-2 focus:ring-primary-yellow"
                />
                <span className="text-sm text-gray-600">/ per km</span>
              </div>

            
              <button
                onClick={handleUpdate}
                className="mt-4 w-full py-2 bg-primary-yellow text-primary-black rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center"
              >
                Update Price
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryCard;