"use client"

import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { Plus, Building2, Car, ArrowRight, Edit3, Trash2 } from "lucide-react"
import axiosInstance from "../../api/axiosInstance"

const BrandList = () => {
   const [brands, setBrands] = useState([])
   const [loading, setLoading] = useState(false)
   const navigate = useNavigate()

   const loadBrands = async () => {
      setLoading(true)
      try {
         const res = await axiosInstance.get("/brand/get-all")
         setBrands(res.data.brands)
         toast.success("Brands loaded successfully")
      } catch (error) {
         toast.error(error?.response?.data?.message || "Failed to fetch brands")
      }
      setLoading(false)
   }

   useEffect(() => {
      loadBrands()
   }, [])

   return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
         <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
               <div className="flex justify-between items-center">
                  <div>
                     <h1 className="text-3xl font-bold text-gray-900">Brand Management</h1>
                     <p className="text-gray-600 mt-1">Manage your vehicle brands and their inventory</p>
                  </div>
                  <button
                     onClick={() => navigate("/admin/brand/add")}
                     className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-colors"
                  >
                     <Plus size={20} className="mr-2" />
                     Add Brand
                  </button>
               </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
               {loading ? (
                  <div className="flex items-center justify-center py-16">
                     <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-500">Loading brands...</p>
                     </div>
                  </div>
               ) : brands.length === 0 ? (
                  <div className="text-center py-16">
                     <Building2 size={48} className="mx-auto text-gray-300 mb-4" />
                     <h3 className="text-lg font-medium text-gray-900 mb-2">No brands found</h3>
                     <p className="text-gray-500 mb-6">Get started by adding your first brand</p>
                     <button
                        onClick={() => navigate("/admin/brand/add")}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                     >
                        <Plus size={16} className="mr-2" />
                        Add Brand
                     </button>
                  </div>
               ) : (
                  <div className="divide-y divide-gray-200">
                     {brands.map((brand) => (
                        <div key={brand._id} className="p-6 hover:bg-gray-50 transition-colors">
                           <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                 {/* Brand Logo */}
                                 <div className="flex-shrink-0">
                                    <div className="w-16 h-16 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden">
                                       {brand.logo ? (
                                          <img
                                             src={brand.logo || "/placeholder.svg"}
                                             alt={`${brand.name} logo`}
                                             className="w-full h-full object-contain"
                                             loading="lazy"
                                          />
                                       ) : (
                                          <div className="w-full h-full flex items-center justify-center">
                                             <Building2 size={24} className="text-gray-400" />
                                          </div>
                                       )}
                                    </div>
                                 </div>

                                 {/* Brand Info */}
                                 <div className="flex-1 min-w-0">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{brand.name}</h3>
                                    <p className="text-gray-600 text-sm line-clamp-2">
                                       {brand.description || "No description available"}
                                    </p>
                                 </div>
                              </div>

                              {/* Actions */}
                              <div className="flex items-center space-x-3">
                                 <button
                                    onClick={() => navigate(`/admin/brand/${brand._id}/vehicles`)}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                                 >
                                    <Car size={16} className="mr-2" />
                                    View Vehicles
                                    <ArrowRight size={16} className="ml-2" />
                                 </button>

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

            {/* Stats */}
            {brands.length > 0 && (
               <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                     <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-lg">
                           <Building2 className="text-blue-600" size={20} />
                        </div>
                        <div className="ml-4">
                           <p className="text-sm font-medium text-gray-600">Total Brands</p>
                           <p className="text-2xl font-bold text-gray-900">{brands.length}</p>
                        </div>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}

export default BrandList
