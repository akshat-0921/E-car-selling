// src/pages/Home/Home.jsx

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BrandGrid from "../../components/BrandGrid/BrandGrid";
import HeroSlider from "../../components/HeroSlider/slider";
import FeatureCard from "../../components/FeatureCard/Featurecard";
import { vehicleAPI } from "../../api";
import { MapPinIcon, SparklesIcon, MagnifyingGlassIcon, CalendarDaysIcon, TagIcon, Squares2X2Icon } from '@heroicons/react/24/outline';

const Home = () => {
   const navigate = useNavigate();
   const [featuredVehicles, setFeaturedVehicles] = useState([]);
   const [loading, setLoading] = useState(true);

   // --- Data Fetching (No changes needed) ---
   useEffect(() => {
      const fetchFeaturedVehicles = async () => {
         try {
            setLoading(true);
            const response = await vehicleAPI.getAllVehicles({ featured: true, limit: 4 });
            if (response.data.success) {
               setFeaturedVehicles(response.data.vehicles || []);
            } else {
               console.error("Failed to fetch featured vehicles:", response.data.message);
            }
         } catch (error) {
            console.error("Error fetching featured vehicles:", error);
         } finally {
            setLoading(false);
         }
      };

      fetchFeaturedVehicles();
   }, []);

   // --- Navigation Items (Unchanged) ---
   const navigationButtons = [
      { title: "Browse by Brand", description: "Find vehicles from your favorite manufacturers.", route: "/brands", icon: TagIcon },
      { title: "Advanced Search", description: "Use detailed filters to find the perfect car.", route: "/search", icon: MagnifyingGlassIcon },
      { title: "All Vehicles", description: "Explore our complete and extensive inventory.", route: "/vehicles", icon: Squares2X2Icon },
      { title: "Book a Test Drive", description: "Schedule a drive at your convenience.", route: "/test-drive", icon: CalendarDaysIcon },
      { title: "Find a Showroom", description: "Locate a dealership near you.", route: "/showrooms", icon: MapPinIcon },
      { title: "Special Offers", description: "View our latest deals and promotions.", route: "/offers", icon: SparklesIcon },
   ];

   return (
      // --- Main Page Container with theme-aware background ---
      <div className="bg-white dark:bg-slate-900">
         <HeroSlider />

         {/* --- Car Brand Section with Aurora background in dark mode --- */}
         <section className="relative overflow-hidden py-16 sm:py-24 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
            {/* Aurora effect for dark mode */}
            <div className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
               <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#3B82F6] to-[#14B8A6] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center max-w-2xl mx-auto">
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                     Find Your Drive, Your Way
                  </h2>
                  <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
                     Explore a curated selection of vehicles from the world's most trusted automotive brands.
                  </p>
               </div>
               <div className="mt-12">
                  <BrandGrid />
               </div>
            </div>
         </section>

         {/* --- Featured Vehicles Section --- */}
         {featuredVehicles.length > 0 && (
            <section className="py-16 sm:py-24 bg-white dark:bg-slate-900">
               <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto">
                     <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                        Featured Vehicles
                     </h2>
                     <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
                        Handpicked for quality and value, these models represent the best of our collection.
                     </p>
                  </div>

                  {/* --- Redesigned Vehicle Cards Grid with dark mode variants --- */}
                  <div className="mt-12 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-6 lg:gap-x-8">
                     {featuredVehicles.map((vehicle) => (
                        <div
                           key={vehicle._id}
                           onClick={() => navigate(`/vehicles/${vehicle._id}`)}
                           // Theme-aware card styling
                           className="group cursor-pointer rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:-translate-y-1"
                        >
                           <div className="overflow-hidden rounded-t-xl">
                              <img
                                 src={vehicle.image || (vehicle.images && vehicle.images.length > 0 ? vehicle.images[0] : "/placeholder.svg")}
                                 alt={vehicle.name}
                                 className="h-56 w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                              />
                           </div>
                           <div className="p-4">
                              <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                 {vehicle.brand?.name || vehicle.brand} {vehicle.name}
                              </h3>
                              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                                 ₹{vehicle.price?.toLocaleString() || "N/A"}
                              </p>
                              <div className="mt-4 flex items-center gap-x-2">
                                 {/* Theme-aware info tags */}
                                 <span className="inline-block bg-slate-100 dark:bg-slate-700 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 rounded-full">{vehicle.fuelType || "N/A"}</span>
                                 <span className="inline-block bg-slate-100 dark:bg-slate-700 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 rounded-full">{vehicle.transmission || "N/A"}</span>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>

                  <div className="mt-16 text-center">
                     <button
                        onClick={() => navigate("/vehicles")}
                        className="rounded-md bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-300 transform hover:scale-105"
                     >
                        View All Vehicles
                     </button>
                  </div>
               </div>
            </section>
         )}

         {/* --- Services Section with Glassmorphism --- */}
         <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            {/* Another Aurora effect for dark mode */}
            <div className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
               <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#14B8A6] to-[#9333EA] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center max-w-2xl mx-auto">
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                     Your Complete Car Buying Experience
                  </h2>
                  <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
                     From discovery to delivery, we provide the tools and services you need for a seamless journey.
                  </p>
               </div>

               {/* --- Redesigned Service Cards with Glassmorphism in dark mode --- */}
               <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {navigationButtons.map((button) => (
                     <button
                        key={button.title}
                        onClick={() => navigate(button.route)}
                        // In dark mode, we apply a semi-transparent background and a backdrop blur for the frosted glass effect.
                        className="group text-left block rounded-xl p-6 transition-all duration-300
                                           bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1
                                           dark:bg-white/5 dark:border-white/10 dark:hover:border-white/20 dark:backdrop-blur-lg"
                     >
                        <div className="flex items-center gap-x-4">
                           <div className="flex-shrink-0 rounded-lg bg-blue-100 dark:bg-blue-900/50 p-3">
                              <button.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                           </div>
                           <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                              {button.title}
                           </h3>
                        </div>
                        <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
                           {button.description}
                        </p>
                     </button>
                  ))}
               </div>
            </div>
         </section>

         {/* --- Features Section --- */}
         <div className="py-16 sm:py-24">
            <FeatureCard />
         </div>
      </div>
   );
};

export default Home;
