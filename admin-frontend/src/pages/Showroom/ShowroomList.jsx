"use client"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { MapPin, Phone, Building2, Plus, Search, Trash2, Eye, Loader2, Navigation } from "lucide-react"
import axiosInstance from "../../api/axiosInstance"

const ShowroomList = () => {
   const [loading, setLoading] = useState(false)
   const [showrooms, setShowrooms] = useState([])
   const [searchTerm, setSearchTerm] = useState("")
   const [filteredShowrooms, setFilteredShowrooms] = useState([])
   const navigate = useNavigate()

   const loadShowrooms = async () => {
      setLoading(true)
      try {
         const res = await axiosInstance.get("/showroom/get-all")
         setShowrooms(res.data.showrooms)
         setFilteredShowrooms(res.data.showrooms)
         toast.success("Showrooms loaded successfully")
      } catch (error) {
         toast.error(error?.response?.data?.message || "Failed to fetch showrooms")
      }
      setLoading(false)
   }

   const deleteShowroom = async (showroomId) => {
      if (window.confirm("Are you sure you want to delete this showroom?")) {
         try {
            await axiosInstance.delete(`/showroom/delete/${showroomId}`)
            toast.success("Showroom deleted successfully")
            loadShowrooms()
         } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to delete showroom")
         }
      }
   }

   const findNearbyShowrooms = async () => {
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(
            async (position) => {
               try {
                  const { latitude, longitude } = position.coords
                  const res = await axiosInstance.get(`/showroom/find-nearby?lat=${latitude}&lon=${longitude}&radius=50`)
                  setFilteredShowrooms(res.data.showrooms)
                  toast.success(`Found ${res.data.showrooms.length} nearby showrooms`)
               } catch (error) {
                  toast.error(error?.response?.data?.message || "No nearby showrooms found")
               }
            },
            () => {
               toast.error("Location access denied")
            },
         )
      } else {
         toast.error("Geolocation is not supported by this browser")
      }
   }

   useEffect(() => {
      loadShowrooms()
   }, [])

   useEffect(() => {
      const filtered = showrooms.filter(
         (showroom) =>
            showroom.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            showroom.address?.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            showroom.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            showroom.state?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredShowrooms(filtered)
   }, [searchTerm, showrooms])

   return (
      <div className="min-h-screen bg-gray-50 p-6">
         <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
               <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                     <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                        <Building2 className="text-blue-600" />
                        Showrooms
                     </h1>
                     <p className="text-gray-600 mt-1">Manage your showroom locations</p>
                  </div>
                  <div className="flex gap-3">
                     <button
                        onClick={findNearbyShowrooms}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                     >
                        <Navigation size={16} />
                        Find Nearby
                     </button>
                     <button
                        onClick={() => navigate("/admin/showrooms/add")}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                     >
                        <Plus size={16} />
                        Add Showroom
                     </button>
                  </div>
               </div>
            </div>

            {/* Search */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                     type="text"
                     placeholder="Search showrooms by name, city, or state..."
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
               </div>
            </div>

            {/* Loading State */}
            {loading && (
               <div className="flex items-center justify-center py-12">
                  <Loader2 className="animate-spin text-blue-600" size={32} />
                  <span className="ml-2 text-gray-600">Loading showrooms...</span>
               </div>
            )}

            {/* Empty State */}
            {!loading && filteredShowrooms.length === 0 && (
               <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <Building2 className="mx-auto text-gray-400 mb-4" size={48} />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No showrooms found</h3>
                  <p className="text-gray-600 mb-6">
                     {searchTerm ? "Try adjusting your search terms" : "Get started by adding your first showroom"}
                  </p>
                  {!searchTerm && (
                     <button
                        onClick={() => navigate("/admin/showrooms/add")}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                     >
                        <Plus size={16} />
                        Add First Showroom
                     </button>
                  )}
               </div>
            )}

            {/* Showrooms Grid */}
            {!loading && filteredShowrooms.length > 0 && (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredShowrooms.map((showroom) => (
                     <div
                        key={showroom._id}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                     >
                        <div className="p-6">
                           <div className="flex items-start justify-between mb-4">
                              <h3 className="text-xl font-semibold text-gray-900">{showroom.name}</h3>
                              <div className="flex gap-2">
                                 <button
                                    onClick={() => navigate(`/admin/showrooms/${showroom._id}`)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="View Details"
                                 >
                                    <Eye size={16} />
                                 </button>
                                 <button
                                    onClick={() => deleteShowroom(showroom._id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Delete Showroom"
                                 >
                                    <Trash2 size={16} />
                                 </button>
                              </div>
                           </div>

                           <div className="space-y-3">
                              <div className="flex items-start gap-3">
                                 <MapPin className="text-gray-400 mt-0.5 flex-shrink-0" size={16} />
                                 <div className="text-sm text-gray-600">
                                    <div>{showroom.address}</div>
                                    <div>
                                       {showroom.city}, {showroom.state} {showroom.zipCode}
                                    </div>
                                 </div>
                              </div>

                              {showroom.contactNumber && (
                                 <div className="flex items-center gap-3">
                                    <Phone className="text-gray-400 flex-shrink-0" size={16} />
                                    <span className="text-sm text-gray-600">{showroom.contactNumber}</span>
                                 </div>
                              )}
                           </div>

                           <div className="mt-4 pt-4 border-t border-gray-100">
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                 <span>Showroom ID: {showroom._id.slice(-6)}</span>
                                 {showroom.lat && showroom.lon && (
                                    <span className="flex items-center gap-1">
                                       <MapPin size={12} />
                                       Located
                                    </span>
                                 )}
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            )}

            {/* Results Count */}
            {!loading && filteredShowrooms.length > 0 && (
               <div className="mt-6 text-center text-gray-600">
                  Showing {filteredShowrooms.length} of {showrooms.length} showrooms
               </div>
            )}
         </div>
      </div>
   )
}

export default ShowroomList
