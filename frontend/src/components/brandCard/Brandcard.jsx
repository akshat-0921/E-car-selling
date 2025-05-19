"use client"
import brandImages from "../../assets/brandImages"

const brands = Object.keys(brandImages).map((key) => ({
    name: key,
    img: brandImages[key],
}))

const BrandCard = () => {
    const handleClick = (brandName) => {
        alert(`Hello, welcome to ${brandName}`)
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6 max-w-[1200px] mx-auto">
            {brands.map((brand, index) => (
                <div
                    key={index}
                    className="relative group w-full flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg cursor-pointer hover:scale-105 transform transition-transform duration-300 border border-gray-200"
                    onClick={() => handleClick(brand.name)}
                >
                    <div className="w-24 h-24 flex items-center justify-center mb-4">
                        <img
                            src={brand.img || "/placeholder.svg"}
                            alt={brand.name}
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <p className="text-base font-semibold text-gray-800 group-hover:text-rose-500 transition-colors duration-300">
                        {brand.name}
                    </p>
                    <div className="absolute bottom-4 left-6 right-6 h-1 bg-rose-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                </div>
            ))}
        </div>
    )
}

export default BrandCard
