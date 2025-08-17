// src/components/VehicleDetailsCard.jsx

import React, { useState } from 'react';
import {
   Calendar, Clock, MapPin, Fuel, Cog, Users, Gauge, Star, Car, ShieldCheck, Palette
} from 'lucide-react';
import { Tab } from '@headlessui/react'; // For a better tabbed interface for details

// Helper to conditionally apply classes
function classNames(...classes) {
   return classes.filter(Boolean).join(' ');
}

// Main Component
const VehicleDetailsCard = ({ vehicle }) => {
   if (!vehicle) {
      // You can return a loading skeleton here for better UX
      return <div>Loading vehicle details...</div>;
   }

   return (
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
               {/* Main Content Column (Image, Specs, etc.) */}
               <main className="lg:col-span-2 space-y-8">
                  <VehicleHeader vehicle={vehicle} />
                  <VehicleImageGallery vehicle={vehicle} />
                  <VehicleDetailsTabs vehicle={vehicle} />
               </main>

               {/* Sticky Sidebar Column (Test Drive Form) */}
               <aside className="lg:col-span-1">
                  <div className="sticky top-24">
                     <TestDriveForm vehicle={vehicle} />
                  </div>
               </aside>
            </div>
         </div>
      </div>
   );
};

// --- Sub-components for better organization ---

// 1. Vehicle Header (Name, Price, Rating)
const VehicleHeader = ({ vehicle }) => (
   <div>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
         {vehicle.name}
      </h1>
      <div className="mt-3 flex items-center justify-between">
         <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            ₹{vehicle.price?.toLocaleString()}
         </p>
         <div className="flex items-center gap-x-2">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">
               {vehicle.rating} (34 Reviews)
            </span>
         </div>
      </div>
   </div>
);

// 2. Image Gallery
const VehicleImageGallery = ({ vehicle }) => (
   <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
      <img
         src={vehicle.image || '/placeholder.jpg'}
         alt={vehicle.name}
         className="w-full h-auto object-cover"
      />
      {/* You could add thumbnail images here for a gallery */}
   </div>
);

// 3. Test Drive Form
const TestDriveForm = ({ vehicle }) => {
   const [selectedDate, setSelectedDate] = useState('');
   const [selectedTime, setSelectedTime] = useState('');
   const [showroom, setShowroom] = useState('');

   const handleSubmit = (e) => {
      e.preventDefault();
      alert(`Test drive booked for ${vehicle.name} on ${selectedDate} at ${selectedTime}!`);
   };

   return (
      <div className="rounded-xl p-6 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 dark:backdrop-blur-lg shadow-lg">
         <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-500" />
            Book a Test Drive
         </h2>
         <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Form Input Component */}
            <FormInput id="date" label="Select Date" type="date" value={selectedDate} onChange={setSelectedDate} icon={Calendar} />
            <FormInput id="time" label="Select Time" type="time" value={selectedTime} onChange={setSelectedTime} icon={Clock} />
            <FormInput id="showroom" label="Preferred Showroom" type="text" value={showroom} onChange={setShowroom} icon={MapPin} placeholder="e.g., Downtown Motors" />

            <button
               type="submit"
               className="w-full rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-300 transform hover:scale-105"
            >
               Book Now
            </button>
         </form>
      </div>
   );
};

// Reusable Form Input component
const FormInput = ({ id, label, type, value, onChange, icon: Icon, placeholder }) => (
   <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-2">
         <Icon className="w-4 h-4" /> {label}
      </label>
      <input
         id={id}
         type={type}
         className="block w-full rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
         value={value}
         onChange={(e) => onChange(e.target.value)}
         placeholder={placeholder}
         required
      />
   </div>
);

// 4. Vehicle Details Tabs (Overview, Features, Specs)
const VehicleDetailsTabs = ({ vehicle }) => (
   <div className="w-full">
      <Tab.Group>
         <Tab.List className="flex space-x-1 rounded-xl bg-slate-200 dark:bg-slate-800 p-1">
            {['Overview', 'Features', 'Specifications'].map((category) => (
               <Tab
                  key={category}
                  className={({ selected }) =>
                     classNames(
                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                        'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                        selected
                           ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-white shadow'
                           : 'text-slate-600 dark:text-slate-400 hover:bg-white/[0.5] dark:hover:bg-white/[0.12]'
                     )
                  }
               >
                  {category}
               </Tab>
            ))}
         </Tab.List>
         <Tab.Panels className="mt-4">
            <Tab.Panel className="rounded-xl bg-white dark:bg-slate-800/50 p-4 border border-slate-200 dark:border-slate-800">
               <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{vehicle.description}</p>
               <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <SpecItem icon={Fuel} label="Fuel Type" value={vehicle.fuelType} />
                  <SpecItem icon={Cog} label="Transmission" value={vehicle.transmission} />
                  <SpecItem icon={Users} label="Seating" value={`${vehicle.seatingCapacity} Seater`} />
                  <SpecItem icon={Gauge} label="Mileage" value={vehicle.mileage} />
                  <SpecItem icon={Car} label="Engine" value={vehicle.engine} />
               </div>
            </Tab.Panel>
            <Tab.Panel className="rounded-xl bg-white dark:bg-slate-800/50 p-4 border border-slate-200 dark:border-slate-800">
               <div className="flex flex-wrap gap-2">
                  {(vehicle.features || []).map((feature, i) => (
                     <span key={i} className="px-3 py-1 text-sm bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-full">
                        {feature}
                     </span>
                  ))}
               </div>
            </Tab.Panel>
            <Tab.Panel className="rounded-xl bg-white dark:bg-slate-800/50 p-4 border border-slate-200 dark:border-slate-800">
               <SpecsTable vehicle={vehicle} />
            </Tab.Panel>
         </Tab.Panels>
      </Tab.Group>
   </div>
);

// Reusable Spec Item for the overview panel
const SpecItem = ({ icon: Icon, label, value }) => (
   <div className="flex items-center gap-2">
      <Icon className="w-5 h-5 text-blue-500" />
      <div>
         <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
         <p className="font-semibold text-slate-800 dark:text-slate-200">{value}</p>
      </div>
   </div>
);

// Detailed Specifications Table
const SpecsTable = ({ vehicle }) => (
   <div className="space-y-4">
      <div className="flow-root">
         <dl className="-my-3 divide-y divide-slate-200 dark:divide-slate-700 text-sm">
            <SpecRow label="Engine" value={vehicle.engine} />
            <SpecRow label="Mileage" value={vehicle.mileage} />
            <SpecRow label="Fuel Type" value={vehicle.fuelType} />
            <SpecRow label="Transmission" value={vehicle.transmission} />
            <SpecRow label="Seating Capacity" value={`${vehicle.seatingCapacity} Persons`} />
            <SpecRow label="Body Type" value={vehicle.type} />
         </dl>
      </div>
   </div>
);

const SpecRow = ({ label, value }) => (
   <div className="py-3 grid grid-cols-3 gap-4">
      <dt className="font-medium text-slate-600 dark:text-slate-400">{label}</dt>
      <dd className="text-slate-800 dark:text-slate-200 col-span-2">{value}</dd>
   </div>
);

export default VehicleDetailsCard;

