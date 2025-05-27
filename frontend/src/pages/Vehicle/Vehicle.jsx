import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVehicles } from "../../redux/vehicleSlice";
import Filter from "../../components/serviceCard/ServiceCard";
import VehicleCard from "../../components/VehicleCard/VehicleCard";

const Vehicle = () => {
   const dispatch = useDispatch();
   const { vehicles, loading, error } = useSelector((state) => state.vehicle);

   useEffect(() => {
      dispatch(fetchVehicles());
   }, [dispatch]);

   return (
      <div className="flex flex-col lg:flex-row p-6 gap-6">
         <div className="w-full lg:w-1/4">
            <Filter onFilterChange={(filters) => console.log("Filter applied", filters)} />
         </div>
         <div className="w-full lg:w-3/4">
            {loading && <p className="text-center">Loading vehicles...</p>}
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
