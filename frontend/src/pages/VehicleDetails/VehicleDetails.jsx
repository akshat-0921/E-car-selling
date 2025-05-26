import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchVehicleDetails, clearSelectedVehicle } from "../../redux/vehicleSlice";
import VehicleDetailsCard from "../../components/VehicleDetails/VehicleDetailsCard";

const VehicleDetails = () => {
   const { vehicleId } = useParams();
   const dispatch = useDispatch();
   const { selectedVehicle, loading, error } = useSelector((state) => state.vehicle);

   useEffect(() => {
      if (vehicleId) {
         dispatch(fetchVehicleDetails(vehicleId));
      }

      return () => {
         dispatch(clearSelectedVehicle());
      };
   }, [dispatch, vehicleId]);

   if (loading) return <div className="text-center mt-8">Loading...</div>;
   if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
   if (!selectedVehicle) return null;

   return <VehicleDetailsCard vehicle={selectedVehicle} />;
};

export default VehicleDetails;
