import React from "react";
import "./BrandCard.css";
import brandImages from "../assets/brandImages";

const brands = Object.keys(brandImages).map((key) => ({
    name: key,
    img: brandImages[key],
}));

const BrandCard = () => {
    const handleClick = (brandName) => {
        alert(`Hello, welcome to ${brandName}`);
    };

    return (
        <div className="brand-card-container">
            {brands.map((brand, index) => (
                <div key={index} className="brand-card" onClick={() => handleClick(brand.name)}>
                    <img src={brand.img} alt={brand.name} className="brand-logo" />
                    <p>{brand.name}</p>
                </div>
            ))}
        </div>
    );
};

export default BrandCard;
