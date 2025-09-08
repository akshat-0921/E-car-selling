// src/pages/PaymentPage.jsx

import React, { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Import the correct thunks from your slices
import { fetchAllShowrooms } from '../../redux/showroomSlice';
import { fetchVehicleDetails, clearSelectedVehicle } from '../../redux/vehicleSlice';

import RazorpayPaymentForm from "../../components/payments/RazorpayPaymentForm";
import { Lock, Car, Building, Loader, ServerCrash } from "lucide-react";

// Helper components for loading and error states
const LoadingSpinner = () => (
   <div className="flex flex-col items-center justify-center p-10">
      <Loader className="h-10 w-10 text-slate-400 animate-spin" />
      <p className="mt-3 text-slate-500">Preparing your checkout...</p>
   </div>
);

const ErrorDisplay = ({ message }) => (
   <div className="flex flex-col items-center justify-center p-10 text-center">
      <ServerCrash className="h-10 w-10 text-red-500 mb-3" />
      <p className="text-red-600">{message || "An unknown error occurred."}</p>
   </div>
);

export default function PaymentPage() {
   const dispatch = useDispatch();
   const [searchParams] = useSearchParams();

   // Get data from URL
   const vehicleId = searchParams.get('vehicleId');
   const price = searchParams.get('price');
   const showroomId = searchParams.get('showroomId');

   // --- CORRECTED: Select state according to your slices ---
   const { user } = useSelector(state => state.auth);
   const { showrooms, loading: showroomsLoading } = useSelector(state => state.showroom);

   // Read from the 'vehicle' slice
   const {
      selectedVehicle,
      detailsLoading,
      detailsError
   } = useSelector(state => state.vehicle);

   // Fetch data on component mount
   useEffect(() => {
      // Fetch showrooms if they aren't loaded
      if (!showrooms || showrooms.length === 0) {
         dispatch(fetchAllShowrooms());
      }
      // Fetch vehicle details if we have an ID
      if (vehicleId) {
         dispatch(fetchVehicleDetails(vehicleId));
      }

      // Cleanup function to clear the selected vehicle when the component unmounts
      return () => {
         dispatch(clearSelectedVehicle());
      };
   }, [dispatch, vehicleId]); // Removed 'showrooms' dependency to prevent re-fetch

   // Find the selected showroom from the loaded list
   const selectedShowroom = useMemo(() =>
      showrooms?.find(s => s._id === showroomId),
      [showrooms, showroomId]);

   // Determine the overall loading state
   const isLoading = showroomsLoading || detailsLoading;

   if (isLoading) {
      return <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center"><LoadingSpinner /></div>;
   }

   if (detailsError) {
      return <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center"><ErrorDisplay message={detailsError} /></div>;
   }

   if (!selectedVehicle || !selectedShowroom || !price) {
      return <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center"><ErrorDisplay message="Invalid payment details. Please go back and try again." /></div>;
   }

   return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center py-12 px-4">
         <div className="w-full max-w-md space-y-8">
            <div className="text-center">
               <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                  <Lock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
               </div>
               <h1 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">Secure Checkout</h1>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
               <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 border-b pb-3 border-slate-200 dark:border-slate-700">Order Summary</h3>
               <dl className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                     <dt className="text-slate-600 dark:text-slate-400 flex items-center gap-2"><Car size={16} /> Vehicle</dt>
                     <dd className="font-medium text-slate-800 dark:text-slate-200">{selectedVehicle.name}</dd>
                  </div>
                  <div className="flex justify-between items-center">
                     <dt className="text-slate-600 dark:text-slate-400 flex items-center gap-2"><Building size={16} /> Showroom</dt>
                     <dd className="font-medium text-slate-800 dark:text-slate-200">{selectedShowroom.name}, {selectedShowroom.city}</dd>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-slate-200 dark:border-slate-700 text-base">
                     <dt className="font-bold text-slate-800 dark:text-slate-200">Total Amount</dt>
                     <dd className="font-bold text-blue-600 dark:text-blue-400">₹{parseInt(price).toLocaleString()}</dd>
                  </div>
               </dl>
            </div>

            {/* <RazorpayPaymentForm
               amount={price}
               vehicleId={vehicleId}
               showroomId={showroomId}
               vehicleName={selectedVehicle.name}
               showroomName={selectedShowroom.name}
               initialUserDetails={user}
            /> */}

            <RazorpayPaymentForm
               amount={price}
               vehicleId={vehicleId}
               showroomId={showroomId}
               vehicleName={selectedVehicle.name}
               showroomName={`${selectedShowroom.name}, ${selectedShowroom.city}`}
               initialUserDetails={user}
            />

         </div>
      </div>
   );
}
