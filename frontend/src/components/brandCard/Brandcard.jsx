import React from "react";
import brandImages from "../../assets/brandImages";

const brands = Object.keys(brandImages).map((key) => ({
   name: key,
   img: brandImages[key],
}));

const BrandCard = () => {
   const handleClick = (brandName) => {
      alert(`Hello, welcome to ${brandName}`);
   };

   return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 p-5 max-w-[900px] mx-auto mt-12">
         {brands.map((brand, index) => (
            <div
               key={index}
               onClick={() => handleClick(brand.name)}
               className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:scale-105 hover:shadow-lg transition-transform cursor-pointer"
            >
               <img
                  src={brand.img}
                  alt={brand.name}
                  className="w-20 h-20 object-contain mb-2"
               />
               <p className="text-sm font-semibold text-center text-gray-800">
                  {brand.name}
               </p>
            </div>
         ))}
      </div>
   );
};

export default BrandCard;
