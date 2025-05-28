import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchVehiclesByBrandThunk } from '../../redux/brandSlice';
import { useParams } from 'react-router-dom';

const BrandDetails = () => {

   const { brandId } = useParams();
   const dispatch = useDispatch();
   const { vehicles, brandLoading, brandError } = useSelector((state) => state.vehicle)

   useEffect(() => {
      if (brandId) {
         dispatch(fetchVehiclesByBrandThunk(brandId))
      }
   }, [dispatch, brandId])

   if (brandLoading) return <p>Loading...</p>;
   if (brandError) return <p className="text-red-500">{brandError}</p>;

   return (
      <div>
         <h2 className="text-2xl font-semibold mb-6">Vehicles under this Brand</h2>
         <ul>
            {vehicles.map(vehicle => (
               <li key={vehicle._id}>{vehicle.name}</li>
            ))}
         </ul>
      </div>
   );
}

export default BrandDetails
