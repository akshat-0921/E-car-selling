// src/components/CarDetail.jsx

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { vehicleAPI } from "../../api";
import { toast } from "react-toastify";
import { Tab } from "@headlessui/react";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { Cog8ToothIcon, CpuChipIcon, BeakerIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from "@heroicons/react/20/solid";

// Helper function for class names
function classNames(...classes) {
   return classes.filter(Boolean).join(' ');
}

// --- STYLING: Sub-components for better layout and loading/error states ---
const LoadingState = () => <div className="text-center p-8 text-slate-700 dark:text-slate-300">Loading vehicle details...</div>;
const ErrorState = ({ error }) => <p className="text-center text-red-600 dark:text-red-400 p-8">{error || "No car data available"}</p>;
const SpecItem = ({ icon: Icon, label, value }) => (
   <div className="flex items-center gap-3 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
      <Icon className="h-6 w-6 text-blue-500" />
      <div>
         <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
         <p className="font-semibold text-slate-800 dark:text-slate-200">{value}</p>
      </div>
   </div>
);

const CarDetail = () => {
   // --- LOGIC: All state and hooks are preserved ---
   const { vehicleId } = useParams();
   const [car, setCar] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [isFavorite, setIsFavorite] = useState(false);

   useEffect(() => {
      const fetchCarDetails = async () => {
         try {
            setLoading(true);
            setError(null);
            if (!vehicleId) {
               setError("Vehicle ID is missing");
               return;
            }
            const response = await vehicleAPI.getVehicleById(vehicleId);
            if (response.data.success) {
               setCar(response.data.vehicle);
               setIsFavorite(response.data.vehicle.isFavorite || false);
            } else {
               setError(response.data.message || "Failed to fetch vehicle details");
               toast.error(response.data.message || "Failed to fetch vehicle details");
            }
         } catch (error) {
            console.error("Error fetching car details:", error);
            const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
            setError(errorMessage);
            toast.error(errorMessage);
         } finally {
            setLoading(false);
         }
      };
      fetchCarDetails();
   }, [vehicleId]);

   const toggleFavorite = async () => {
      try {
         const action = isFavorite ? vehicleAPI.removeFromFavorites : vehicleAPI.addToFavorites;
         const response = await action(vehicleId);
         if (response.data.success) {
            setIsFavorite(!isFavorite);
            toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
         }
      } catch (error) {
         console.error("Error toggling favorite:", error);
         toast.error(error.response?.data?.message || "Failed to update favorites");
      }
   };

   if (loading) return <LoadingState />;
   if (error || !car) return <ErrorState error={error} />;

   return (
      // --- STYLING: Main container with themed background ---
      <div className="bg-white dark:bg-slate-900">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

               {/* --- STYLING: Main Content Column (Image, Tabs) --- */}
               <main className="lg:col-span-2 space-y-8">
                  <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                     <img
                        src={car.image || (car.images && car.images.length > 0 ? car.images[0] : "/placeholder.svg")}
                        alt={car.name}
                        className="w-full h-auto object-cover"
                     />
                  </div>
                  <Tab.Group>
                     <Tab.List className="flex space-x-1 rounded-xl bg-slate-200 dark:bg-slate-800 p-1">
                        <Tab className={({ selected }) => classNames('w-full rounded-lg py-2.5 text-sm font-medium leading-5', 'focus:outline-none', selected ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-white shadow' : 'text-slate-600 dark:text-slate-400 hover:bg-white/[0.5] dark:hover:bg-white/[0.12]')}>
                           Overview
                        </Tab>
                        <Tab className={({ selected }) => classNames('w-full rounded-lg py-2.5 text-sm font-medium leading-5', 'focus:outline-none', selected ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-white shadow' : 'text-slate-600 dark:text-slate-400 hover:bg-white/[0.5] dark:hover:bg-white/[0.12]')}>
                           Features
                        </Tab>
                     </Tab.List>
                     <Tab.Panels className="mt-4">
                        <Tab.Panel className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-6 border border-slate-200 dark:border-slate-800">
                           <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                              <SpecItem icon={BeakerIcon} label="Fuel Type" value={car.fuelType || "N/A"} />
                              <SpecItem icon={Cog8ToothIcon} label="Transmission" value={car.transmission || "N/A"} />
                              <SpecItem icon={CpuChipIcon} label="Top Speed" value={`${car.topSpeed || "N/A"} km/h`} />
                           </div>
                        </Tab.Panel>
                        <Tab.Panel className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-6 border border-slate-200 dark:border-slate-800">
                           <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 text-slate-700 dark:text-slate-300">
                              {(car.features || []).map((feature, index) => (
                                 <li key={index} className="flex items-center gap-x-2">
                                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                    <span>{feature}</span>
                                 </li>
                              ))}
                           </ul>
                        </Tab.Panel>
                     </Tab.Panels>
                  </Tab.Group>
               </main>

               {/* --- STYLING: Sticky Sidebar (Details & Actions) --- */}
               <aside className="lg:col-span-1">
                  <div className="sticky top-24 space-y-6">
                     <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                        {car.name}
                     </h1>
                     <p className="text-3xl font-bold text-slate-800 dark:text-slate-100">
                        ₹{car.price?.toLocaleString() || "N/A"}
                     </p>
                     <div className="flex flex-col gap-y-3">
                        <button className="w-full flex items-center justify-center gap-x-2 px-6 py-3 rounded-md text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm">
                           <ArrowTopRightOnSquareIcon className="h-5 w-5" /> Book Now
                        </button>
                        <button onClick={toggleFavorite} className="w-full flex items-center justify-center gap-x-2 px-6 py-3 rounded-md text-base font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                           {isFavorite ? <HeartIconSolid className="h-5 w-5 text-red-500" /> : <HeartIconOutline className="h-5 w-5" />}
                           {isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
                        </button>
                     </div>
                  </div>
               </aside>
            </div>
         </div>
      </div>
   );
};

export default CarDetail;
