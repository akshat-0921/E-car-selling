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
        <div className="flex flex-wrap justify-center gap-6 p-6">
            {brands.map((brand, index) => (
                <div
                    key={index}
                    className="brand-card w-48 h-48 flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg cursor-pointer hover:scale-105 transform transition-all duration-200"
                    onClick={() => handleClick(brand.name)}
                >
                    <img src={brand.img} alt={brand.name} className="w-24 h-24 object-contain mb-4" />
                    <p className="text-xl font-semibold text-gray-800">{brand.name}</p>
                </div>
            ))}
        </div>
    );
};

export default BrandCard;
