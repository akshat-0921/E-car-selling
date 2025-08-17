import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVehicles } from "../../redux/vehicleSlice";
import { fetchVehiclesByBrandThunk } from "../../redux/vehicleSlice";
import Filter from "../../components/filter/Filter";
import VehicleCard from "../../components/VehicleCard/VehicleCard";

const Vehicle = ({ brandId }) => {
   const dispatch = useDispatch();
   const { vehicles, allLoading, allError, brandLoading, brandError } = useSelector((state) => state.vehicle);

   useEffect(() => {
      if (brandId) {
         dispatch(fetchVehiclesByBrandThunk(brandId));
      } else {
         dispatch(fetchVehicles());
      }
   }, [dispatch, brandId]);

   const isLoading = brandId ? brandLoading : allLoading;
   const error = brandId ? brandError : allError;

   const handleFilterChange = (filters) => {
      console.log("Sending filters to backend:", filters);
      dispatch(fetchVehicles(filters))
   }

   return (
      <div className="flex flex-col lg:flex-row p-6 gap-6">
         {!brandId && (
            <div className="w-full lg:w-1/4">
               <Filter onFilterChange={handleFilterChange} />
            </div>
         )}

         <div className={`w-full ${!brandId ? "lg:w-3/4" : ""}`}>
            {isLoading && <p className="text-center">Loading vehicles...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
               {vehicles.map((vehicle) => (
                  <VehicleCard key={vehicle._id} vehicle={vehicle} />
               ))}
            </div>
         </div>
      </div>
   );
};

export default Vehicle;
