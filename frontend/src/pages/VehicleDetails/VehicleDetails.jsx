// src/pages/VehicleDetails.jsx (example path)

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchVehicleDetails, clearSelectedVehicle } from "../../redux/vehicleSlice";
import VehicleDetailsCard from "../../components/VehicleDetails/VehicleDetailsCard";

// --- STYLING: Icons for loading/error states for theme consistency ---
import { Loader, ServerCrash } from "lucide-react";

// --- STYLING: Themed Loading State Component ---
const LoadingState = () => (
   <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Loader className="h-12 w-12 text-slate-400 dark:text-slate-500 animate-spin" />
      <p className="mt-4 text-lg font-medium text-slate-700 dark:text-slate-300">Loading Vehicle Details...</p>
   </div>
);

// --- STYLING: Themed Error State Component ---
const ErrorState = ({ error }) => (
   <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <ServerCrash className="h-12 w-12 text-red-500" />
      <p className="mt-4 text-lg font-medium text-red-600 dark:text-red-400">
         {error || "An error occurred"}
      </p>
   </div>
);

const VehicleDetails = () => {
   // --- LOGIC: All Redux and state management logic is preserved ---
   const { vehicleId } = useParams();
   const dispatch = useDispatch();
   const { selectedVehicle, detailsLoading, detailsError } = useSelector((state) => state.vehicle);

   useEffect(() => {
      if (vehicleId) {
         dispatch(fetchVehicleDetails(vehicleId));
      }

      // The cleanup function is preserved
      return () => {
         dispatch(clearSelectedVehicle());
      };
   }, [dispatch, vehicleId]);

   // --- STYLING: Themed page container ---
   return (
      <div className="bg-white dark:bg-slate-900 min-h-screen">
         <div className="py-12 px-4 sm:px-6 lg:px-8">
            {(() => {
               // --- LOGIC: The exact conditional rendering flow is preserved ---
               if (detailsLoading) return <LoadingState />;
               if (detailsError) return <ErrorState error={detailsError} />;
               if (!selectedVehicle) return null; // This is preserved from your original code

               return <VehicleDetailsCard vehicle={selectedVehicle} />;
            })()}
         </div>
      </div>
   );
};

export default VehicleDetails;
