import { FaCarSide } from "react-icons/fa";

const dummyBrands = [
   { _id: "1", name: "Toyota", country: "Japan" },
   { _id: "2", name: "BMW", country: "Germany" },
   { _id: "3", name: "Ford", country: "USA" },
   { _id: "4", name: "Hyundai", country: "South Korea" },
   { _id: "5", name: "Tata", country: "India" },
];

const ShowBrands = () => {
   return (
      <div className="min-h-screen bg-gray-50 py-10 px-4">
         <h1 className="text-3xl font-bold text-center text-indigo-600 mb-10">
            Available Car Brands
         </h1>

         <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {dummyBrands.map((brand) => (
               <div
                  key={brand._id}
                  className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center hover:shadow-lg transition"
               >
                  <FaCarSide className="text-4xl text-indigo-500 mb-3" />
                  <h2 className="text-xl font-semibold text-gray-800">{brand.name}</h2>
                  <p className="text-sm text-gray-500 mt-1">{brand.country}</p>
               </div>
            ))}
         </div>
      </div>
   );
};

export default ShowBrands;
