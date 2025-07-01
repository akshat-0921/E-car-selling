"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Plus, Car, Edit3, Trash2, ArrowLeft, IndianRupee } from "lucide-react"
import axiosInstance from "../../api/axiosInstance"

const VehicleList = () => {
   const { brandId } = useParams()
   const [vehicles, setVehicles] = useState([])
   const [loading, setLoading] = useState(false)
   const navigate = useNavigate()

   const loadVehicles = async () => {
      setLoading(true)
      try {
         const res = await axiosInstance.get(`/brand/get-vehicles/${brandId}`)
         setVehicles(res.data.vehicles)
         toast.success("Vehicles loaded successfully")
      } catch (error) {
         toast.error(error?.response?.data?.message || "Failed to fetch vehicles")
      }
      setLoading(false)
   }

   useEffect(() => {
      loadVehicles()
   }, [brandId])

   return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
         <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
               <button
                  onClick={() => navigate("/admin/brands")}
                  className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
               >
                  <ArrowLeft size={20} className="mr-2" />
                  Back to Brands
               </button>
               <div className="flex justify-between items-center">
                  <div>
                     <h1 className="text-3xl font-bold text-gray-900">Vehicle Management</h1>
                     <p className="text-gray-600 mt-1">Manage vehicles for this brand</p>
                  </div>
                  <button
                     onClick={() => navigate(`/admin/brand/${brandId}/add-vehicle`)}
                     className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-colors"
                  >
                     <Plus size={20} className="mr-2" />
                     Add Vehicle
                  </button>
               </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
               {loading ? (
                  <div className="flex items-center justify-center py-16">
                     <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-500">Loading vehicles...</p>
                     </div>
                  </div>
               ) : vehicles.length === 0 ? (
                  <div className="text-center py-16">
                     <Car size={48} className="mx-auto text-gray-300 mb-4" />
                     <h3 className="text-lg font-medium text-gray-900 mb-2">No vehicles found</h3>
                     <p className="text-gray-500 mb-6">Get started by adding your first vehicle</p>
                     <button
                        onClick={() => navigate(`/admin/brand/${brandId}/add-vehicle`)}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                     >
                        <Plus size={16} className="mr-2" />
                        Add Vehicle
                     </button>
                  </div>
               ) : (
                  <div className="divide-y divide-gray-200">
                     {vehicles.map((vehicle) => (
                        <div key={vehicle._id} className="p-6 hover:bg-gray-50 transition-colors">
                           <div className="flex items-center space-x-6">
                              {/* Vehicle Image */}
                              <div className="flex-shrink-0">
                                 <div className="w-24 h-16 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden">
                                    {vehicle.image ? (
                                       <img
                                          src={vehicle.image || "/placeholder.svg"}
                                          alt={vehicle.name}
                                          className="w-full h-full object-cover"
                                       />
                                    ) : (
                                       <div className="w-full h-full flex items-center justify-center">
                                          <Car size={20} className="text-gray-400" />
                                       </div>
                                    )}
                                 </div>
                              </div>

                              {/* Vehicle Info */}
                              <div className="flex-1 min-w-0">
                                 <div className="flex items-center space-x-3 mb-1">
                                    <h3 className="text-lg font-semibold text-gray-900 truncate">{vehicle.name}</h3>
                                    {vehicle.model && <span className="text-sm text-gray-500">• {vehicle.model}</span>}
                                 </div>
                                 <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                       {vehicle.category}
                                    </span>
                                    <span className="inline-flex items-center font-semibold text-gray-900">
                                       <IndianRupee size={14} className="mr-1" />
                                       {vehicle.price?.toLocaleString()}
                                    </span>
                                 </div>
                              </div>

                              {/* Actions */}
                              <div className="flex items-center space-x-2">
                                   <button
                                    onClick={() => toast("Edit functionality coming soon")}
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                 >
                                    <Edit3 size={16} className="mr-1" />
                                    Edit
                                 </button>
                                 <button
                                    onClick={() => toast("Delete functionality coming soon")}
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-700 bg-white border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                                 >
                                    <Trash2 size={16} className="mr-1" />
                                    Delete
                                 </button>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               )}
            </div>
         </div>
      </div>
   )
}

export default VehicleList
