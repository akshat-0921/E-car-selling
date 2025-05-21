import { useState } from "react"
import { Calendar, Car, Fuel, Info, MapPin, Ruler, Settings, Share2, ShoppingCart, Users } from "lucide-react"
import VehicleDetailsCard from "../../components/VehicleDetails/VehicleDetailsCard"

const VehicleDetails = () => {
   const [activeTab, setActiveTab] = useState("overview")

   return (
      <div className="min-h-screen bg-slate-50 py-8">
         <div className="max-w-6xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
               <div className="border-b sticky top-0 bg-white z-10">
                  <div className="px-6 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                     <div>
                        <h1 className="text-2xl font-bold">Vehicle Details</h1>
                        <p className="text-slate-500">Complete specifications and features</p>
                     </div>
                     <div className="flex gap-2">
                        <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md text-sm hover:bg-gray-100 transition">
                           <Share2 className="h-4 w-4" />
                           Share
                        </button>
                        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition">
                           <ShoppingCart className="h-4 w-4" />
                           Book Now
                        </button>
                     </div>
                  </div>

                  <div className="flex px-6 pt-4 border-t">
                     {[
                        { value: "overview", icon: <Info className="h-4 w-4 mr-2" />, label: "Overview" },
                        { value: "specs", icon: <Settings className="h-4 w-4 mr-2" />, label: "Specifications" },
                        { value: "dealers", icon: <MapPin className="h-4 w-4 mr-2" />, label: "Dealers" },
                     ].map((tab) => (
                        <button
                           key={tab.value}
                           className={`flex items-center px-4 py-2 text-sm rounded-t-md transition ${activeTab === tab.value
                              ? "bg-blue-50 text-blue-600 font-semibold"
                              : "text-gray-600 hover:text-blue-600"
                              }`}
                           onClick={() => setActiveTab(tab.value)}
                        >
                           {tab.icon}
                           {tab.label}
                        </button>
                     ))}
                  </div>
               </div>

               <div className="p-6">
                  {activeTab === "overview" && <VehicleDetailsCard />}

                  {activeTab === "specs" && (
                     <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="space-y-4">
                              <SpecItem icon={<Car />} label="Body Type" value="SUV" />
                              <SpecItem icon={<Fuel />} label="Fuel Type" value="Diesel" />
                              <SpecItem icon={<Users />} label="Seating Capacity" value="5 Persons" />
                           </div>
                           <div className="space-y-4">
                              <SpecItem icon={<Settings />} label="Transmission" value="Automatic" />
                              <SpecItem icon={<Ruler />} label="Mileage" value="18 to 20.09 kmpl" />
                              <SpecItem icon={<Calendar />} label="Model Year" value="2023" />
                           </div>
                        </div>
                     </div>
                  )}

                  {activeTab === "dealers" && (
                     <div className="bg-white rounded-lg shadow p-6 text-center py-12">
                        <MapPin className="h-12 w-12 mx-auto text-slate-400 mb-4" />
                        <h3 className="text-lg font-semibold">Dealer Information</h3>
                        <p className="text-slate-500 mt-2 mb-6">Find authorized dealers near your location</p>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
                           Find Dealers
                        </button>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   )
}

const SpecItem = ({ icon, label, value }) => (
   <div className="flex items-center gap-3">
      <div className="bg-slate-100 p-2 rounded-full">
         {icon && React.cloneElement(icon, { className: "h-5 w-5 text-slate-600" })}
      </div>
      <div>
         <p className="text-sm text-slate-500">{label}</p>
         <p className="font-medium">{value}</p>
      </div>
   </div>
)

export default VehicleDetails
