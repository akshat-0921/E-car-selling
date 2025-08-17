import React from 'react';
import { useParams } from 'react-router-dom';
import Vehicle from '../Vehicle/Vehicle'; // Adjust import path as needed

const BrandDetails = () => {
   const { brandId } = useParams();

   return (
      <div>
         <h2 className="text-2xl font-semibold mb-6">Vehicles under this Brand</h2>
         {/* Pass brandId as the brand prop to Vehicle */}
         <Vehicle brandId={brandId} />
      </div>
   );
};

export default BrandDetails;
