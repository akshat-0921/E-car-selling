// "use client"

// import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
// import { Package, Plus, Loader2, Building2, Car, IndianRupee, Hash } from "lucide-react"
// import { toast } from "react-toastify"
// import axiosInstance from "../../api/axiosInstance"

// const InventoryManagement = () => {
//    const [loading, setLoading] = useState(true)
//    const [showrooms, setShowrooms] = useState([])
//    const navigate = useNavigate()

//    useEffect(() => {
//       loadShowrooms()
//    }, [])

//    const loadShowrooms = async () => {
//       setLoading(true)
//       try {
//          const res = await axiosInstance.get("/showroom/get-all")
//          setShowrooms(res.data.showrooms || [])
//       } catch {
//          toast.error("Failed to load showrooms")
//       }
//       setLoading(false)
//    }

//    if (loading) {
//       return (
//          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//             <div className="flex items-center gap-3">
//                <Loader2 className="animate-spin text-blue-600" size={32} />
//                <span className="text-gray-600">Loading inventory...</span>
//             </div>
//          </div>
//       )
//    }

//    return (
//       <div className="min-h-screen bg-gray-50 p-6">
//          <div className="max-w-6xl mx-auto">
//             <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//                <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                      <Package className="text-blue-600" size={28} />
//                      <div>
//                         <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
//                         <p className="text-gray-600 mt-1">Manage vehicle inventory across all showrooms</p>
//                      </div>
//                   </div>
//                   <button
//                      onClick={() => navigate("/admin/showrooms/add")}
//                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//                   >
//                      <Plus size={16} />
//                      Add Showroom
//                   </button>
//                </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                {showrooms.length === 0 ? (
//                   <div className="col-span-2 text-center py-20 bg-white rounded-lg shadow-sm">
//                      <Car className="mx-auto text-gray-400 mb-4" size={48} />
//                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No showrooms found</h3>
//                      <p className="text-gray-600 mb-6">Start by adding a showroom to manage inventory</p>
//                      <button
//                         onClick={() => navigate("/admin/showrooms/add")}
//                         className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//                      >
//                         <Plus size={20} />
//                         Add Showroom
//                      </button>
//                   </div>
//                ) : (
//                   showrooms.map((showroom) => (
//                      <div
//                         key={showroom._id}
//                         className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
//                      >
//                         <div className="p-6 border-b border-gray-200 flex items-center gap-3">
//                            <Building2 className="text-blue-600" size={24} />
//                            <div>
//                               <h2 className="text-xl font-semibold text-gray-900">{showroom.name}</h2>
//                               <p className="text-gray-600">{showroom.city}, {showroom.state}</p>
//                            </div>
//                         </div>
//                         <div className="p-6">
//                            {showroom.inventory?.length === 0 ? (
//                               <p className="text-gray-500 text-center py-6">No vehicles in this showroom</p>
//                            ) : (
//                               <div className="divide-y divide-gray-200">
//                                  {showroom.inventory.map((item) => (
//                                     <div key={item._id} className="py-3 flex items-center justify-between">
//                                        <div>
//                                           <h3 className="font-semibold text-gray-900">{item.vehicleId?.name || "Unknown Vehicle"}</h3>
//                                           <p className="text-gray-600 text-sm">Model: {item.vehicleId?.model || "N/A"}</p>
//                                        </div>
//                                        <div className="flex gap-6">
//                                           <p className="text-gray-900 flex items-center">
//                                              <Hash className="w-4 h-4 mr-1" /> {item.quantity}
//                                           </p>
//                                           <p className="text-gray-900 flex items-center">
//                                              <IndianRupee className="w-4 h-4 mr-1" /> {item.price || "Default"}
//                                           </p>
//                                        </div>
//                                     </div>
//                                  ))}
//                               </div>
//                            )}
//                            <div className="mt-4 flex justify-end">
//                               <button
//                                  onClick={() => navigate(`/admin/inventory/${showroom._id}`)}
//                                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                               >
//                                  Manage Inventory
//                               </button>
//                            </div>
//                         </div>
//                      </div>
//                   ))
//                )}
//             </div>
//          </div>
//       </div>
//    )
// }

// export default InventoryManagement


"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Building2, Package, Plus, Search, Loader2, Eye, ShoppingCart } from "lucide-react"
import { toast } from "react-toastify"
import axiosInstance from "../../api/axiosInstance"

const InventoryManagement = () => {
   const [loading, setLoading] = useState(true)
   const [showrooms, setShowrooms] = useState([])
   const [searchTerm, setSearchTerm] = useState("")
   const navigate = useNavigate()

   useEffect(() => {
      loadShowrooms()
   }, [])

   const loadShowrooms = async () => {
      setLoading(true)
      try {
         const res = await axiosInstance.get("/showroom/get-all")
         setShowrooms(res.data.showrooms || [])
      } catch (error) {
         toast.error("Failed to load showrooms")
      }
      setLoading(false)
   }

   const filteredShowrooms = showrooms.filter(
      (showroom) =>
         showroom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         showroom.city.toLowerCase().includes(searchTerm.toLowerCase()),
   )

   if (loading) {
      return (
         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="flex items-center gap-3">
               <Loader2 className="animate-spin text-blue-600" size={32} />
               <span className="text-gray-600">Loading inventory management...</span>
            </div>
         </div>
      )
   }

   return (
      <div className="min-h-screen bg-gray-50 p-6">
         <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <button
                        onClick={() => navigate("/admin")}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                     >
                        <ArrowLeft size={20} />
                     </button>
                     <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                           <Package className="text-blue-600" />
                           Inventory Management
                        </h1>
                        <p className="text-gray-600 mt-1">Manage vehicle inventory across all showrooms</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                     type="text"
                     placeholder="Search showrooms by name or city..."
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
               </div>
            </div>

            {/* Showrooms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {filteredShowrooms.map((showroom) => (
                  <div
                     key={showroom._id}
                     className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                     <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                           <div className="p-2 bg-blue-50 rounded-lg">
                              <Building2 className="text-blue-600" size={20} />
                           </div>
                           <div>
                              <h3 className="font-semibold text-gray-900">{showroom.name}</h3>
                              <p className="text-sm text-gray-600">
                                 {showroom.city}, {showroom.state}
                              </p>
                           </div>
                        </div>
                     </div>

                     <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                           <span className="text-gray-600">Address:</span>
                           <span className="text-gray-900 text-right">{showroom.address}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                           <span className="text-gray-600">Contact:</span>
                           <span className="text-gray-900">{showroom.contactNumber}</span>
                        </div>
                     </div>

                     <div className="flex gap-2 mt-6">
                        <button
                           onClick={() => navigate(`/admin/inventory/${showroom._id}`)}
                           className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                           <Eye size={16} />
                           View Inventory
                        </button>
                        <button
                           onClick={() => navigate(`/admin/inventory/add/${showroom._id}`)}
                           className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                        >
                           <Plus size={16} />
                           Add Vehicle
                        </button>
                     </div>
                  </div>
               ))}
            </div>

            {filteredShowrooms.length === 0 && (
               <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <ShoppingCart className="mx-auto text-gray-400 mb-4" size={48} />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                     {searchTerm ? "No showrooms found" : "No showrooms available"}
                  </h3>
                  <p className="text-gray-600 mb-6">
                     {searchTerm ? "Try adjusting your search terms" : "Create a showroom first to manage inventory"}
                  </p>
                  {!searchTerm && (
                     <button
                        onClick={() => navigate("/admin/showrooms/add")}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                     >
                        <Plus size={20} />
                        Add Showroom
                     </button>
                  )}
               </div>
            )}
         </div>
      </div>
   )
}

export default InventoryManagement
