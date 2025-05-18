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
<<<<<<< HEAD
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6">
                {brands.map((brand, index) => (
                    <div
                        key={index}
                        className="group relative overflow-hidden bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                        onClick={() => handleClick(brand.name)}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-rose-500/0 to-rose-500/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
=======
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
>>>>>>> 2938213ae7de6588b056e54312fd3e314af3882a

                        <div className="flex flex-col items-center justify-center p-6 h-full">
                            <div className="w-24 h-24 flex items-center justify-center mb-4 relative z-0 group-hover:scale-110 transition-transform duration-300">
                                <img src={brand.img || "/placeholder.svg"} alt={brand.name} className="w-full h-full object-contain" />
                            </div>

                            <p className="text-xl font-semibold text-gray-800 group-hover:text-white relative z-20 transition-colors duration-300">
                                {brand.name}
                            </p>

                            <div className="absolute bottom-0 left-0 w-full h-1 bg-rose-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BrandCard