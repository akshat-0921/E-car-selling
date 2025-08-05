
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import BrandCard from "../../components/brandCard/Brandcard"
import FeatureCard from "../../components/FeatureCard/Featurecard"
import HeroSlider from "../../components/HeroSlider/slider"
import { vehicleAPI } from "../../api"

const Home = () => {
   const navigate = useNavigate()
   const [featuredVehicles, setFeaturedVehicles] = useState([])
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      const fetchFeaturedVehicles = async () => {
         try {
            setLoading(true)
            const response = await vehicleAPI.getAllVehicles({ featured: true, limit: 4 })
            if (response.data.success) {
               setFeaturedVehicles(response.data.vehicles || [])
            } else {
               console.error("Failed to fetch featured vehicles:", response.data.message)
            }
         } catch (error) {
            console.error("Error fetching featured vehicles:", error)
         } finally {
            setLoading(false)
         }
      }

      fetchFeaturedVehicles()
   }, [])

   const navigationButtons = [
      {
         title: "See Brands",
         description: "Explore our extensive catalog of car models",
         route: "/brands",
         gradient: "from-rose-500 to-pink-500",
         icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
               />
            </svg>
         ),
      },
      {
         title: "Search for Cars",
         description: "Find your perfect car with our advanced search",
         route: "/search",
         gradient: "from-blue-500 to-cyan-500",
         icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
               />
            </svg>
         ),
      },
      {
         title: "Explore by Brand",
         description: "Discover cars from your favorite manufacturers",
         route: "/brand-search",
         gradient: "from-green-500 to-emerald-500",
         icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
               />
            </svg>
         ),
      },
      {
         title: "View Nearby Showrooms",
         description: "Find dealerships and showrooms in your area",
         route: "/showrooms",
         gradient: "from-purple-500 to-violet-500",
         icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
               />
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
         ),
      },
      {
         title: "See All Vehicles",
         description: "Choose from our wide range of car models",
         route: "/vehicles",
         gradient: "from-orange-500 to-amber-500",
         icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
               />
            </svg>
         ),
      },
      {
         title: "Test Drive",
         description: "Schedule a test drive for your favorite car",
         route: "/Test-Drive",
         gradient: "from-indigo-500 to-blue-600",
         icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
               />
            </svg>
         ),
      },
   ]

   return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
         {/* Hero Slider Section */}
         <HeroSlider />

         {/* Car Brand Section */}
         <section className="relative py-16 md:py-20 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-rose-50/50 to-orange-50/50"></div>
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-rose-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
            <div
               className="absolute bottom-0 right-1/4 w-72 h-72 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
               style={{ animationDelay: "2s" }}
            ></div>

            <div className="relative container mx-auto px-4 sm:px-6">
               <div className="text-center mb-12 md:mb-16">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
                     Select Your Car{" "}
                     <span className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">Brand</span>
                  </h1>
                  <div className="h-1 w-32 bg-gradient-to-r from-rose-500 to-orange-500 mx-auto rounded-full mb-4"></div>
                  <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
                     Choose from our premium collection of trusted automotive brands
                  </p>
               </div>
               <BrandCard />
            </div>
         </section>

         {/* Featured Vehicles Section */}
         {featuredVehicles.length > 0 && (
            <section className="py-16 md:py-20 bg-white">
               <div className="container mx-auto px-4 sm:px-6">
                  <div className="text-center mb-12 md:mb-16">
                     <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                        Featured{" "}
                        <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                           Vehicles
                        </span>
                     </h2>
                     <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-4"></div>
                     <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Discover our handpicked selection of premium vehicles
                     </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                     {featuredVehicles.map((vehicle, index) => (
                        <div
                           key={vehicle._id}
                           className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
                           onClick={() => navigate(`/vehicles/${vehicle._id}`)}
                           style={{ animationDelay: `${index * 100}ms` }}
                        >
                           <div className="relative overflow-hidden">
                              <img
                                 src={
                                    vehicle.image ||
                                    (vehicle.images && vehicle.images.length > 0
                                       ? vehicle.images[0]
                                       : "/placeholder.svg?height=200&width=300&query=car")
                                 }
                                 alt={vehicle.name}
                                 className="w-full h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                           </div>

                           <div className="p-4 md:p-6">
                              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                                 {vehicle.brand && typeof vehicle.brand === "object" ? vehicle.brand.name : vehicle.brand}{" "}
                                 {vehicle.name}
                              </h3>
                              <p className="text-2xl font-bold text-green-600 mb-3">
                                 ₹{vehicle.price?.toLocaleString() || "N/A"}
                              </p>
                              <div className="flex items-center justify-between text-sm text-gray-600">
                                 <span className="bg-gray-100 px-3 py-1 rounded-full">{vehicle.fuelType || "N/A"}</span>
                                 <span className="bg-gray-100 px-3 py-1 rounded-full">{vehicle.transmission || "N/A"}</span>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>

                  <div className="text-center mt-12">
                     <button
                        onClick={() => navigate("/vehicles")}
                        className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                     >
                        <span className="relative z-10">View All Vehicles</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                     </button>
                  </div>
               </div>
            </section>
         )}

         {/* Navigation Buttons Section */}
         <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4 sm:px-6">
               <div className="text-center mb-12 md:mb-16">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                     Explore Our{" "}
                     <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                        Services
                     </span>
                  </h2>
                  <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full mb-4"></div>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                     Everything you need for your perfect car buying experience
                  </p>
               </div>

               <div className="max-w-6xl mx-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                     {navigationButtons.map((button, index) => (
                        <button
                           key={index}
                           onClick={() => navigate(button.route)}
                           className="group relative overflow-hidden rounded-2xl bg-white p-6 md:p-8 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                           style={{ animationDelay: `${index * 100}ms` }}
                        >
                           {/* Background gradient */}
                           <div
                              className={`absolute inset-0 bg-gradient-to-br ${button.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                           ></div>

                           {/* Icon */}
                           <div
                              className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${button.gradient} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                           >
                              {button.icon}
                           </div>

                           {/* Content */}
                           <div className="relative z-10">
                              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300">
                                 {button.title}
                              </h3>
                              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">
                                 {button.description}
                              </p>
                           </div>

                           {/* Shine effect */}
                           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
                        </button>
                     ))}
                  </div>
               </div>
            </div>
         </section>

         {/* Features Section */}
         <section className="py-16 md:py-20 bg-white">
            <FeatureCard />
         </section>
      </div>
   )
}

export default Home
