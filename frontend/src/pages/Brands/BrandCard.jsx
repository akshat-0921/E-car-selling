import { Link } from "react-router-dom";

const BrandCard = ({ brand }) => {
   if (!brand) return null
   return (
      <Link to={`/brands/${brand._id}`}
         className="border border-gray-200 rounded-2xl p-6 flex flex-col items-center bg-white hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
      >
         <img
            src={brand.logo}
            alt={brand.name}
            className="w-32 h-32 object-contain mb-4"
         />
         <h3 className="text-lg font-medium text-gray-800 text-center">
            {brand.name}
         </h3>
      </Link>
   );
};

export default BrandCard;
