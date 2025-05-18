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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6 max-w-[1200px] mx-auto">
            {brands.map((brand, index) => (
                <div
                    key={index}
                    className="w-full flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg cursor-pointer hover:scale-105 transform transition-transform duration-200 border border-gray-200"
                    onClick={() => handleClick(brand.name)}
                >
                    <img
                        src={brand.img}
                        alt={brand.name}
                        className="w-24 h-24 object-contain mb-3"
                    />
                    <p className="text-base font-semibold text-gray-800 text-center">
                        {brand.name}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default BrandCard;
