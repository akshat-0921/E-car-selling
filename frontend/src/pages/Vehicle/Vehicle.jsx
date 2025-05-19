import { useState } from "react"
import tucsonImage from "../../assets/cars/tucson.jpeg"
import VehicleCard from "../../cards/Vehicle Card/VehicleCard"
import Filter from "../../components/filter/Filter"
import { Grid3X3, List, SlidersHorizontal } from "lucide-react"

const vehicleList = [
   {
      vehicleId: "t34878sdi",
      brand: "Hyundai",
      name: "Tucson",
      category: "Diesel",
      price: 3500000,
      mileage: "18 to 20.09 kmpl",
      transmission: "Automatic",
      power: "1997 cc",
      seating: "5",
      image: tucsonImage,
   },
   {
      vehicleId: "94mkdsfp9m",
      brand: "Toyota",
      name: "Fortuner",
      category: "Diesel",
      price: 4500000,
      mileage: "10 to 14 kmpl",
      transmission: "Automatic",
      power: "2755 cc",
      seating: "7",
      image: tucsonImage,
   },
]

const Vehicle = () => {
   const [viewMode, setViewMode] = useState("list")
   const [sortBy, setSortBy] = useState("popular")

   return (
      <div className="min-h-screen bg-slate-50">
         <div className="flex flex-col md:flex-row">
            {/* Sidebar Filter */}
            <div className="w-full md:w-1/4 md:h-screen bg-white border-r p-4 md:p-6 md:sticky md:top-0">
               <div className="flex items-center gap-2 mb-6">
                  <SlidersHorizontal className="h-5 w-5" />
                  <h2 className="text-xl font-semibold">Filters</h2>
               </div>
               <Filter />
            </div>

            {/* Main Content */}
            <div className="w-full md:w-3/4 p-4 md:p-8">
               {/* Header with sorting and view options */}
               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                  <div>
                     <h1 className="text-2xl font-bold text-slate-800">Available Vehicles</h1>
                     <p className="text-slate-500">Showing {vehicleList.length} results</p>
                  </div>

                  <div className="flex items-center gap-3">
                     <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border rounded px-3 py-2 text-sm bg-white"
                     >
                        <option value="popular">Most Popular</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="newest">Newest First</option>
                     </select>

                     <div className="flex border rounded overflow-hidden">
                        <button
                           onClick={() => setViewMode("grid")}
                           className={`h-9 w-9 flex items-center justify-center ${viewMode === "grid" ? "bg-blue-600 text-white" : "hover:bg-slate-100"
                              }`}
                        >
                           <Grid3X3 className="h-4 w-4" />
                        </button>
                        <button
                           onClick={() => setViewMode("list")}
                           className={`h-9 w-9 flex items-center justify-center ${viewMode === "list" ? "bg-blue-600 text-white" : "hover:bg-slate-100"
                              }`}
                        >
                           <List className="h-4 w-4" />
                        </button>
                     </div>
                  </div>
               </div>

               {/* Vehicle List */}
               <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
                  {vehicleList.map((car, index) => (
                     <div key={index} className="transition-all hover:shadow-md">
                        <VehicleCard vehicle={car} />
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   )
}

export default Vehicle
