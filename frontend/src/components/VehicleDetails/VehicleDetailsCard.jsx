// import React, { useState } from 'react';
// import {
//    Calendar, Clock, MapPin, Fuel, Cog, Users, Gauge, Star, Car, ShieldCheck, Palette
// } from 'lucide-react';
// import { Tab } from '@headlessui/react'; // For a better tabbed interface for details

// // Helper to conditionally apply classes
// function classNames(...classes) {
//    return classes.filter(Boolean).join(' ');
// }

// // Main Component
// const VehicleDetailsCard = ({ vehicle }) => {
//    if (!vehicle) {
//       // You can return a loading skeleton here for better UX
//       return <div>Loading vehicle details...</div>;
//    }

//    return (
//       <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200">
//          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
//                {/* Main Content Column (Image, Specs, etc.) */}
//                <main className="lg:col-span-2 space-y-8">
//                   <VehicleHeader vehicle={vehicle} />
//                   <VehicleImageGallery vehicle={vehicle} />
//                   <VehicleDetailsTabs vehicle={vehicle} />
//                </main>

//                {/* Sticky Sidebar Column (Test Drive Form) */}
//                <aside className="lg:col-span-1">
//                   <div className="sticky top-24">
//                      <TestDriveForm vehicle={vehicle} />
//                   </div>
//                </aside>
//             </div>
//          </div>
//       </div>
//    );
// };

// // --- Sub-components for better organization ---

// // 1. Vehicle Header (Name, Price, Rating)
// const VehicleHeader = ({ vehicle }) => (
//    <div>
//       <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
//          {vehicle.name}
//       </h1>
//       <div className="mt-3 flex items-center justify-between">
//          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
//             ₹{vehicle.price?.toLocaleString()}
//          </p>
//          <div className="flex items-center gap-x-2">
//             <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
//             <span className="font-semibold text-slate-700 dark:text-slate-300">
//                {vehicle.rating} (34 Reviews)
//             </span>
//          </div>
//       </div>
//    </div>
// );

// // 2. Image Gallery
// const VehicleImageGallery = ({ vehicle }) => (
//    <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
//       <img
//          src={vehicle.image || '/placeholder.jpg'}
//          alt={vehicle.name}
//          className="w-full h-auto object-cover"
//       />
//       {/* You could add thumbnail images here for a gallery */}
//    </div>
// );

// // 3. Test Drive Form
// const TestDriveForm = ({ vehicle }) => {
//    const [selectedDate, setSelectedDate] = useState('');
//    const [selectedTime, setSelectedTime] = useState('');
//    const [showroom, setShowroom] = useState('');

//    const handleSubmit = (e) => {
//       e.preventDefault();
//       alert(`Test drive booked for ${vehicle.name} on ${selectedDate} at ${selectedTime}!`);
//    };

//    return (
//       <div className="rounded-xl p-6 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 dark:backdrop-blur-lg shadow-lg">
//          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
//             <Calendar className="w-6 h-6 text-blue-500" />
//             Book a Test Drive
//          </h2>
//          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
//             {/* Form Input Component */}
//             <FormInput id="date" label="Select Date" type="date" value={selectedDate} onChange={setSelectedDate} icon={Calendar} />
//             <FormInput id="time" label="Select Time" type="time" value={selectedTime} onChange={setSelectedTime} icon={Clock} />
//             <FormInput id="showroom" label="Preferred Showroom" type="text" value={showroom} onChange={setShowroom} icon={MapPin} placeholder="e.g., Downtown Motors" />

//             <button
//                type="submit"
//                className="w-full rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-300 transform hover:scale-105"
//             >
//                Book Now
//             </button>
//          </form>
//       </div>
//    );
// };

// // Reusable Form Input component
// const FormInput = ({ id, label, type, value, onChange, icon: Icon, placeholder }) => (
//    <div>
//       <label htmlFor={id} className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-2">
//          <Icon className="w-4 h-4" /> {label}
//       </label>
//       <input
//          id={id}
//          type={type}
//          className="block w-full rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//          value={value}
//          onChange={(e) => onChange(e.target.value)}
//          placeholder={placeholder}
//          required
//       />
//    </div>
// );

// // 4. Vehicle Details Tabs (Overview, Features, Specs)
// const VehicleDetailsTabs = ({ vehicle }) => (
//    <div className="w-full">
//       <Tab.Group>
//          <Tab.List className="flex space-x-1 rounded-xl bg-slate-200 dark:bg-slate-800 p-1">
//             {['Overview', 'Features', 'Specifications'].map((category) => (
//                <Tab
//                   key={category}
//                   className={({ selected }) =>
//                      classNames(
//                         'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
//                         'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
//                         selected
//                            ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-white shadow'
//                            : 'text-slate-600 dark:text-slate-400 hover:bg-white/[0.5] dark:hover:bg-white/[0.12]'
//                      )
//                   }
//                >
//                   {category}
//                </Tab>
//             ))}
//          </Tab.List>
//          <Tab.Panels className="mt-4">
//             <Tab.Panel className="rounded-xl bg-white dark:bg-slate-800/50 p-4 border border-slate-200 dark:border-slate-800">
//                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{vehicle.description}</p>
//                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
//                   <SpecItem icon={Fuel} label="Fuel Type" value={vehicle.fuelType} />
//                   <SpecItem icon={Cog} label="Transmission" value={vehicle.transmission} />
//                   <SpecItem icon={Users} label="Seating" value={`${vehicle.seatingCapacity} Seater`} />
//                   <SpecItem icon={Gauge} label="Mileage" value={vehicle.mileage} />
//                   <SpecItem icon={Car} label="Engine" value={vehicle.engine} />
//                </div>
//             </Tab.Panel>
//             <Tab.Panel className="rounded-xl bg-white dark:bg-slate-800/50 p-4 border border-slate-200 dark:border-slate-800">
//                <div className="flex flex-wrap gap-2">
//                   {(vehicle.features || []).map((feature, i) => (
//                      <span key={i} className="px-3 py-1 text-sm bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-full">
//                         {feature}
//                      </span>
//                   ))}
//                </div>
//             </Tab.Panel>
//             <Tab.Panel className="rounded-xl bg-white dark:bg-slate-800/50 p-4 border border-slate-200 dark:border-slate-800">
//                <SpecsTable vehicle={vehicle} />
//             </Tab.Panel>
//          </Tab.Panels>
//       </Tab.Group>
//    </div>
// );

// // Reusable Spec Item for the overview panel
// const SpecItem = ({ icon: Icon, label, value }) => (
//    <div className="flex items-center gap-2">
//       <Icon className="w-5 h-5 text-blue-500" />
//       <div>
//          <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
//          <p className="font-semibold text-slate-800 dark:text-slate-200">{value}</p>
//       </div>
//    </div>
// );

// // Detailed Specifications Table
// const SpecsTable = ({ vehicle }) => (
//    <div className="space-y-4">
//       <div className="flow-root">
//          <dl className="-my-3 divide-y divide-slate-200 dark:divide-slate-700 text-sm">
//             <SpecRow label="Engine" value={vehicle.engine} />
//             <SpecRow label="Mileage" value={vehicle.mileage} />
//             <SpecRow label="Fuel Type" value={vehicle.fuelType} />
//             <SpecRow label="Transmission" value={vehicle.transmission} />
//             <SpecRow label="Seating Capacity" value={`${vehicle.seatingCapacity} Persons`} />
//             <SpecRow label="Body Type" value={vehicle.type} />
//          </dl>
//       </div>
//    </div>
// );

// const SpecRow = ({ label, value }) => (
//    <div className="py-3 grid grid-cols-3 gap-4">
//       <dt className="font-medium text-slate-600 dark:text-slate-400">{label}</dt>
//       <dd className="text-slate-800 dark:text-slate-200 col-span-2">{value}</dd>
//    </div>
// );

// export default VehicleDetailsCard;



// src/components/VehicleDetails/VehicleDetailsCard.jsx

// src/components/VehicleDetails/VehicleDetailsCard.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { createBooking } from '../../redux/bookingSlice'; // Ensure this path is correct
import {
    Calendar, Clock, Building, Fuel, Cog, Users, Gauge, Star, Car, CreditCard
} from 'lucide-react';
import { Tab } from '@headlessui/react';
import { showroomAPI } from '../../api'; // Assuming this API export exists

// Helper to conditionally apply classes
function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

// Main Component (Structure Unchanged)
const VehicleDetailsCard = ({ vehicle }) => {
    if (!vehicle) {
        return (
            <div className="flex justify-center items-center min-h-[60vh] bg-white dark:bg-slate-900">
                <p className="text-slate-500">Loading vehicle details...</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    <main className="lg:col-span-2 space-y-8">
                        <VehicleHeader vehicle={vehicle} />
                        <VehicleImageGallery vehicle={vehicle} />
                        <VehicleDetailsTabs vehicle={vehicle} />
                    </main>
                    <aside className="lg:col-span-1">
                        <div className="sticky top-24">
                            {/* The combined form component */}
                            <TestDriveAndPaymentForm vehicle={vehicle} />
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

// --- REWRITTEN: This component now handles both Test Drive and Payment ---
const TestDriveAndPaymentForm = ({ vehicle }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn } = useSelector(state => state.auth);

    // State for Test Drive form
    const [testDriveDate, setTestDriveDate] = useState('');
    const [testDriveTime, setTestDriveTime] = useState('');
    const [testDriveShowroomId, setTestDriveShowroomId] = useState('');

    // State for Payment form
    const [paymentShowroomId, setPaymentShowroomId] = useState('');

    // Shared state for showrooms
    const [availableShowrooms, setAvailableShowrooms] = useState([]);
    const [loadingShowrooms, setLoadingShowrooms] = useState(false);

    // Fetch available showrooms based on vehicle brand
    useEffect(() => {
        const brandName = vehicle?.brand?.name || vehicle?.brand;
        if (!brandName) return;

        const fetchShowroomsByBrand = async () => {
            setLoadingShowrooms(true);
            try {
                const response = await showroomAPI.getAllShowrooms({ brand: brandName });
                if (response.data.success) {
                    setAvailableShowrooms(response.data.showrooms || []);
                }
            } catch (error) {
                toast.error("Failed to fetch available showrooms.");
                console.error("Showroom fetch error:", error);
            } finally {
                setLoadingShowrooms(false);
            }
        };

        fetchShowroomsByBrand();
    }, [vehicle]);

    // Handler for submitting the test drive booking
    const handleTestDriveSubmit = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            toast.info("Please log in to book a test drive.");
            navigate('/auth?mode=login');
            return;
        }

        if (!testDriveDate || !testDriveTime || !testDriveShowroomId) {
            toast.error("Please select a date, time, and showroom for the test drive.");
            return;
        }

        const bookingPayload = {
            bookingType: "Test Drive",
            bookingStatus: "Confirmed",
            isVehicleInStock: true, // Assumed for test drive
            payment: {
                totalAmount: 0,
                advancePayment: 0,
                pendingPayment: 0,
                razorpayOrderId: `TD-${Date.now()}`, // Placeholder ID for non-payment bookings
                paymentStatus: "N/A",
            },
        };

        const resultAction = await dispatch(createBooking({
            showroomId: testDriveShowroomId,
            vehicleId: vehicle._id,
            payload: bookingPayload,
        }));

        if (createBooking.fulfilled.match(resultAction)) {
            toast.success("Test drive booked! Check your booking history for details.");
            navigate('/booking-history');
        } else {
            toast.error(resultAction.payload || "Failed to book test drive.");
        }
    };

    // Handler for proceeding to payment
    const handlePayNow = () => {
        if (!paymentShowroomId) {
            toast.error("Please select a delivery showroom before paying.");
            return;
        }
        navigate(`/payment?vehicleId=${vehicle._id}&price=${vehicle.price}&showroomId=${paymentShowroomId}`);
    };

    // Reusable dropdown component for showrooms
    const ShowroomDropdown = ({ value, onChange, id }) => (
        <select
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-2.5 pl-3 pr-10 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-slate-900 dark:text-white"
        >
            <option value="">{loadingShowrooms ? 'Loading...' : 'Select a showroom'}</option>
            {availableShowrooms.map(s => <option key={s._id} value={s._id}>{s.name}, {s.city}</option>)}
        </select>
    );

    return (
        <div className="rounded-xl p-6 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 shadow-lg divide-y divide-slate-200 dark:divide-slate-700">
            {/* Test Drive Section */}
            <div className="pb-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Car className="w-6 h-6 text-blue-500" />
                    Book a Test Drive
                </h2>
                <form onSubmit={handleTestDriveSubmit} className="mt-6 space-y-4">
                    <FormInput id="date" label="Select Date" type="date" value={testDriveDate} onChange={setTestDriveDate} icon={Calendar} />
                    <FormInput id="time" label="Select Time" type="time" value={testDriveTime} onChange={setTestDriveTime} icon={Clock} />
                    <div>
                        <label htmlFor="testDriveShowroom" className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-2">
                            <Building className="w-4 h-4" /> Select Showroom
                        </label>
                        <ShowroomDropdown id="testDriveShowroom" value={testDriveShowroomId} onChange={setTestDriveShowroomId} />
                    </div>
                    <button type="submit" className="w-full rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 transition-all">
                        Book Now
                    </button>
                </form>
            </div>

            {/* Payment Section */}
            <div className="pt-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <CreditCard className="w-6 h-6 text-green-500" />
                    Or, Buy Now
                </h2>
                <div className="mt-6 space-y-4">
                    <div>
                        <label htmlFor="paymentShowroom" className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-2">
                            <Building className="w-4 h-4" /> Select Delivery Showroom
                        </label>
                        <ShowroomDropdown id="paymentShowroom" value={paymentShowroomId} onChange={setPaymentShowroomId} />
                    </div>
                    <button type="button" onClick={handlePayNow} disabled={!paymentShowroomId || loadingShowrooms} className="w-full rounded-md bg-green-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-green-700 transition-all disabled:opacity-50">
                        Proceed to Payment
                    </button>
                </div>
            </div>
        </div>
    );
};
// --- Sub-components (Structure Unchanged) ---

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

const VehicleImageGallery = ({ vehicle }) => (
    <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
        <img
            src={vehicle.image || '/placeholder.jpg'}
            alt={vehicle.name}
            className="w-full h-auto object-cover"
        />
    </div>
);

// --- MODIFIED: TestDriveForm now includes the Payment option ---
const TestDriveForm = ({ vehicle }) => {
    // Existing state for Test Drive
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [showroom, setShowroom] = useState('');

    // --- NEW: State for Payment Flow ---
    const [availableShowrooms, setAvailableShowrooms] = useState([]);
    const [loadingShowrooms, setLoadingShowrooms] = useState(false);
    const [selectedShowroomId, setSelectedShowroomId] = useState('');
    const navigate = useNavigate();

    // --- NEW: Fetch showrooms for the payment dropdown ---
    useEffect(() => {
        const brandName = vehicle?.brand?.name || vehicle?.brand;
        if (!brandName) return;

        const fetchShowroomsByBrand = async () => {
            setLoadingShowrooms(true);
            try {
                const response = await showroomAPI.getAllShowrooms({ brand: brandName });
                if (response.data.success) {
                    setAvailableShowrooms(response.data.showrooms || []);
                } else {
                    toast.error("Could not load showrooms for this brand.");
                }
            } catch (error) {
                toast.error("Failed to fetch available showrooms.");
            } finally {
                setLoadingShowrooms(false);
            }
        };

        fetchShowroomsByBrand();
    }, [vehicle]);

    const handleTestDriveSubmit = (e) => {
        e.preventDefault();
        alert(`Test drive booked for ${vehicle.name} on ${selectedDate} at ${selectedTime}!`);
    };

    // --- NEW: Handler for the Pay Now button ---
    const handlePayNow = () => {
        if (!selectedShowroomId) {
            toast.error("Please select a showroom before proceeding to payment.");
            return;
        }
        // Navigate to payment page with required params
        navigate(`/payment?vehicleId=${vehicle._id}&price=${vehicle.price}&showroomId=${selectedShowroomId}`);
    };

    return (
        <div className="rounded-xl p-6 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 dark:backdrop-blur-lg shadow-lg divide-y divide-slate-200 dark:divide-slate-700">
            {/* --- Existing Test Drive Section --- */}
            <div className="pb-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-blue-500" />
                    Book a Test Drive
                </h2>
                <form onSubmit={handleTestDriveSubmit} className="mt-6 space-y-4">
                    <FormInput id="date" label="Select Date" type="date" value={selectedDate} onChange={setSelectedDate} icon={Calendar} />
                    <FormInput id="time" label="Select Time" type="time" value={selectedTime} onChange={setSelectedTime} icon={Clock} />
                    <FormInput id="showroom" label="Preferred Showroom" type="text" value={showroom} onChange={setShowroom} icon={MapPin} placeholder="e.g., Downtown Motors" />
                    <button
                        type="submit"
                        className="w-full rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 transition-all"
                    >
                        Book Now
                    </button>
                </form>
            </div>

            {/* --- NEW Payment Section --- */}
            <div className="pt-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <CreditCard className="w-6 h-6 text-green-500" />
                    Or, Buy Now
                </h2>
                <div className="mt-6 space-y-4">
                    <div>
                        <label htmlFor="paymentShowroom" className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-2">
                            <Building className="w-4 h-4" /> Select Showroom
                        </label>
                        <select
                            id="paymentShowroom"
                            name="paymentShowroom"
                            value={selectedShowroomId}
                            onChange={(e) => setSelectedShowroomId(e.target.value)}
                            required
                            className="block w-full rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-2.5 pl-3 pr-10 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-slate-900 dark:text-white"
                        >
                            <option value="">{loadingShowrooms ? 'Loading...' : 'Select a delivery showroom'}</option>
                            {availableShowrooms.map(s => <option key={s._id} value={s._id}>{s.name}, {s.city}</option>)}
                        </select>
                    </div>
                    <button
                        type="button"
                        onClick={handlePayNow}
                        disabled={!selectedShowroomId || loadingShowrooms}
                        className="w-full rounded-md bg-green-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Proceed to Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

// Reusable Form Input component (Unchanged)
const FormInput = ({ id, label, type, value, onChange, icon: Icon, placeholder }) => (
    <div>
        <label htmlFor={id} className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-2">
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

// Vehicle Details Tabs and other sub-components (Unchanged)
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

const SpecItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-blue-500" />
        <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
            <p className="font-semibold text-slate-800 dark:text-slate-200">{value}</p>
        </div>
    </div>
);

const SpecsTable = ({ vehicle }) => (
    <div className="space-y-4">
        <div className="flow-root">
            <dl className="-my-3 divide-y divide-slate-200 dark:divide-slate-700 text-sm">
                <SpecRow label="Engine" value={vehicle.category} />
                <SpecRow label="Fuel Type" value={vehicle.category} />
                <SpecRow label="Transmission" value={"AMT"} />
                <SpecRow label="Seating Capacity" value={`${4} Persons`} />
                <SpecRow label="Body Type" value={"SUV"} />
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
