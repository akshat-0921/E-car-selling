// src/pages/BrandDetails.jsx (example path)

import React from 'react';
import { useParams } from 'react-router-dom';
import Vehicle from '../Vehicle/Vehicle'; // This path is preserved from your original code

const BrandDetails = () => {
   // --- LOGIC: The useParams hook and brandId are preserved ---
   const { brandId } = useParams();

   return (
      // --- STYLING: Main container for the page with theme-aware background ---
      <div className="bg-white dark:bg-slate-900">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

            {/* --- STYLING: Themed header for the page --- */}
            <div className="text-center">
               <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Vehicles From This Brand
               </h1>
               <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
                  Explore all the models available from your selected brand.
               </p>
            </div>

            {/* --- STYLING: Container for the vehicle list with top margin for spacing --- */}
            <div className="mt-12">
               {/* --- LOGIC: The Vehicle component and its brandId prop are preserved --- */}
               <Vehicle brandId={brandId} />
            </div>
         </div>
      </div>
   );
};

export default BrandDetails;
