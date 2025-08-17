"use client"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, MapPin, Phone, Building2, Edit, Trash2, Loader2, ExternalLink, Car, Navigation, IndianRupee } from "lucide-react"
import axiosInstance from "../../api/axiosInstance"

const ShowroomDetail = () => {
   const [loading, setLoading] = useState(true)
   const [showroom, setShowroom] = useState(null)
   const navigate = useNavigate()
   const { showroomId } = useParams()

   useEffect(() => {
      loadShowroom()
   }, [showroomId])

   const loadShowroom = async () => {
      setLoading(true)
      try {
         const res = await axiosInstance.get(`/showroom/get/${showroomId}`)
         setShowroom(res.data.showroom)
      } catch (error) {
         toast.error(error?.response?.data?.message || "Failed to fetch showroom details")
         navigate("/admin/showrooms")
      }
      setLoading(false)
   }

   const deleteShowroom = async () => {
      if (window.confirm("Are you sure you want to delete this showroom? This action cannot be undone.")) {
         try {
            await axiosInstance.delete(`/showroom/delete/${showroomId}`)
            toast.success("Showroom deleted successfully")
            navigate("/admin/showrooms")
         } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to delete showroom")
         }
      }
   }

   const openInMaps = () => {
      if (showroom.lat && showroom.lon) {
         const url = `https://www.google.com/maps?q=${showroom.lat},${showroom.lon}`
         window.open(url, "_blank")
      } else {
         const address = `${showroom.address}, ${showroom.city}, ${showroom.state} ${showroom.zipCode}`
         const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
         window.open(url, "_blank")
      }
   }

   if (loading) {
      return (
         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="flex items-center gap-3">
               <Loader2 className="animate-spin text-blue-600" size={32} />
               <span className="text-gray-600">Loading showroom details...</span>
            </div>
         </div>
      )
   }

   if (!showroom) {
      return (
         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
               <Building2 className="mx-auto text-gray-400 mb-4" size={48} />
               <h3 className="text-xl font-semibold text-gray-900 mb-2">Showroom not found</h3>
               <button onClick={() => navigate("admin/showrooms")} className="text-blue-600 hover:text-blue-700">
                  Back to showrooms
               </button>
            </div>
         </div>
      )
   }

   return (
      <div className="min-h-screen bg-gray-50 p-6">
         <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <button
                        onClick={() => navigate("/admin/showrooms")}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                     >
                        <ArrowLeft size={20} />
                     </button>
                     <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                           <Building2 className="text-blue-600" />
                           {showroom.name}
                        </h1>
                        <p className="text-gray-600 mt-1">Showroom Details</p>
                     </div>
                  </div>
                  <div className="flex gap-3">
                     <button
                        onClick={openInMaps}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                     >
                        <Navigation size={16} />
                        Open in Maps
                     </button>
                     <button
                        onClick={() => navigate(`admin/showrooms/edit/${showroom._id}`)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                     >
                        <Edit size={16} />
                        Edit
                     </button>
                     <button
                        onClick={deleteShowroom}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                     >
                        <Trash2 size={16} />
                        Delete
                     </button>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               {/* Main Information */}
               <div className="lg:col-span-2 space-y-6">
                  {/* Basic Info */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                     <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
                     <div className="space-y-4">
                        <div>
                           <label className="block text-sm font-medium text-gray-500 mb-1">Showroom Name</label>
                           <p className="text-gray-900">{showroom.name}</p>
                        </div>
                        <div>
                           <label className="block text-sm font-medium text-gray-500 mb-1">Showroom ID</label>
                           <p className="text-gray-900 font-mono text-sm">{showroom._id}</p>
                        </div>
                     </div>
                  </div>

                  {/* Address Information */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                     <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <MapPin className="text-blue-600" size={20} />
                        Address Information
                     </h2>
                     <div className="space-y-4">
                        <div>
                           <label className="block text-sm font-medium text-gray-500 mb-1">Full Address</label>
                           <p className="text-gray-900">{showroom.address}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                           <div>
                              <label className="block text-sm font-medium text-gray-500 mb-1">City</label>
                              <p className="text-gray-900">{showroom.city}</p>
                           </div>
                           <div>
                              <label className="block text-sm font-medium text-gray-500 mb-1">State</label>
                              <p className="text-gray-900">{showroom.state}</p>
                           </div>
                           <div>
                              <label className="block text-sm font-medium text-gray-500 mb-1">ZIP Code</label>
                              <p className="text-gray-900">{showroom.zipCode}</p>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Vehicles */}
                  {showroom.vehicles && showroom.vehicles.length > 0 && (
                     <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                           <Car className="text-blue-600" size={20} />
                           Available Vehicles ({showroom.vehicles.length})
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           {showroom.vehicles.map((vehicle) => (
                              <div key={vehicle._id} className="border border-gray-200 rounded-lg p-4">
                                 <h3 className="font-semibold text-gray-900">{vehicle.name}</h3>
                                 <p className="text-gray-600 text-sm">{vehicle.model}</p>
                                 {vehicle.price && (
                                    <p className="text-blue-600 font-semibold mt-2 flex items-center">
                                       <IndianRupee className="w-4 h-4 mr-1" /> {vehicle.price.toLocaleString()}
                                    </p>
                                 )}

                              </div>
                           ))}
                        </div>
                     </div>
                  )}
               </div>

               {/* Sidebar */}
               <div className="space-y-6">
                  {/* Contact Information */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                     <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Phone className="text-blue-600" size={20} />
                        Contact
                     </h2>
                     <div className="space-y-3">
                        <div>
                           <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
                           <a
                              href={`tel:${showroom.contactNumber}`}
                              className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
                           >
                              {showroom.contactNumber}
                              <ExternalLink size={14} />
                           </a>
                        </div>
                     </div>
                  </div>

                  {/* Location Coordinates */}
                  {showroom.lat && showroom.lon && (
                     <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Location Coordinates</h2>
                        <div className="space-y-3">
                           <div>
                              <label className="block text-sm font-medium text-gray-500 mb-1">Latitude</label>
                              <p className="text-gray-900 font-mono text-sm">{showroom.lat}</p>
                           </div>
                           <div>
                              <label className="block text-sm font-medium text-gray-500 mb-1">Longitude</label>
                              <p className="text-gray-900 font-mono text-sm">{showroom.lon}</p>
                           </div>
                           <button
                              onClick={openInMaps}
                              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                           >
                              <ExternalLink size={16} />
                              View on Map
                           </button>
                        </div>
                     </div>
                  )}

                  {/* Quick Actions */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                     <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                     <div className="space-y-3">
                        <button
                           onClick={() => navigate(`admin/showrooms/edit/${showroom._id}`)}
                           className="w-full flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                        >
                           <Edit size={16} />
                           Edit Showroom
                        </button>
                        <button
                           onClick={deleteShowroom}
                           className="w-full flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                        >
                           <Trash2 size={16} />
                           Delete Showroom
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ShowroomDetail


// "use client"

// import { useState, useEffect } from "react"
// import { toast } from "react-toastify"
// import { useNavigate, useParams } from "react-router-dom"
// import { ArrowLeft, MapPin, Phone, Building2, Edit, Trash2, Loader2, ExternalLink, Car, Navigation } from "lucide-react"
// import axiosInstance from "../../api/axiosInstance"

// const ShowroomDetail = () => {
//    const [loading, setLoading] = useState(true)
//    const [showroom, setShowroom] = useState(null)
//    const navigate = useNavigate()
//    const { showroomId } = useParams()

//    useEffect(() => {
//       loadShowroom()
//    }, [showroomId])

//    const loadShowroom = async () => {
//       setLoading(true)
//       try {
//          const res = await axiosInstance.get(`/showroom/get/${showroomId}`)
//          setShowroom(res.data.showroom)
//       } catch (error) {
//          toast.error(error?.response?.data?.message || "Failed to fetch showroom details")
//          navigate("/admin/showrooms")
//       }
//       setLoading(false)
//    }

//    const deleteShowroom = async () => {
//       if (window.confirm("Are you sure you want to delete this showroom? This action cannot be undone.")) {
//          try {
//             await axiosInstance.delete(`/showroom/delete/${showroomId}`)
//             toast.success("Showroom deleted successfully")
//             navigate("/admin/showrooms")
//          } catch (error) {
//             toast.error(error?.response?.data?.message || "Failed to delete showroom")
//          }
//       }
//    }

//    const openInMaps = () => {
//       if (showroom.lat && showroom.lon) {
//          const url = `https://www.google.com/maps?q=${showroom.lat},${showroom.lon}`
//          window.open(url, "_blank")
//       } else {
//          const address = `${showroom.address}, ${showroom.city}, ${showroom.state} ${showroom.zipCode}`
//          const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
//          window.open(url, "_blank")
//       }
//    }

//    if (loading) {
//       return (
//          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//             <div className="flex items-center gap-3">
//                <Loader2 className="animate-spin text-blue-600" size={32} />
//                <span className="text-gray-600">Loading showroom details...</span>
//             </div>
//          </div>
//       )
//    }

//    if (!showroom) {
//       return (
//          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//             <div className="text-center">
//                <Building2 className="mx-auto text-gray-400 mb-4" size={48} />
//                <h3 className="text-xl font-semibold text-gray-900 mb-2">Showroom not found</h3>
//                <button onClick={() => navigate("admin/showrooms")} className="text-blue-600 hover:text-blue-700">
//                   Back to showrooms
//                </button>
//             </div>
//          </div>
//       )
//    }

//    return (
//       <div className="min-h-screen bg-gray-50 p-6">
//          <div className="max-w-4xl mx-auto">
//             {/* Header */}
//             <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//                <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                      <button
//                         onClick={() => navigate("/admin/showrooms")}
//                         className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//                      >
//                         <ArrowLeft size={20} />
//                      </button>
//                      <div>
//                         <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
//                            <Building2 className="text-blue-600" />
//                            {showroom.name}
//                         </h1>
//                         <p className="text-gray-600 mt-1">Showroom Details</p>
//                      </div>
//                   </div>
//                   <div className="flex gap-3">
//                      <button
//                         onClick={openInMaps}
//                         className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//                      >
//                         <Navigation size={16} />
//                         Open in Maps
//                      </button>
//                      <button
//                         onClick={() => navigate(`admin/showrooms/edit/${showroom._id}`)}
//                         className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                      >
//                         <Edit size={16} />
//                         Edit
//                      </button>
//                      <button
//                         onClick={deleteShowroom}
//                         className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//                      >
//                         <Trash2 size={16} />
//                         Delete
//                      </button>
//                   </div>
//                </div>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                {/* Main Information */}
//                <div className="lg:col-span-2 space-y-6">
//                   {/* Basic Info */}
//                   <div className="bg-white rounded-lg shadow-sm p-6">
//                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
//                      <div className="space-y-4">
//                         <div>
//                            <label className="block text-sm font-medium text-gray-500 mb-1">Showroom Name</label>
//                            <p className="text-gray-900">{showroom.name}</p>
//                         </div>
//                         <div>
//                            <label className="block text-sm font-medium text-gray-500 mb-1">Showroom ID</label>
//                            <p className="text-gray-900 font-mono text-sm">{showroom._id}</p>
//                         </div>
//                      </div>
//                   </div>

//                   {/* Address Information */}
//                   <div className="bg-white rounded-lg shadow-sm p-6">
//                      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                         <MapPin className="text-blue-600" size={20} />
//                         Address Information
//                      </h2>
//                      <div className="space-y-4">
//                         <div>
//                            <label className="block text-sm font-medium text-gray-500 mb-1">Full Address</label>
//                            <p className="text-gray-900">{showroom.address}</p>
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                            <div>
//                               <label className="block text-sm font-medium text-gray-500 mb-1">City</label>
//                               <p className="text-gray-900">{showroom.city}</p>
//                            </div>
//                            <div>
//                               <label className="block text-sm font-medium text-gray-500 mb-1">State</label>
//                               <p className="text-gray-900">{showroom.state}</p>
//                            </div>
//                            <div>
//                               <label className="block text-sm font-medium text-gray-500 mb-1">ZIP Code</label>
//                               <p className="text-gray-900">{showroom.zipCode}</p>
//                            </div>
//                         </div>
//                      </div>
//                   </div>

//                   {/* Vehicles */}
//                   {showroom.vehicles && showroom.vehicles.length > 0 && (
//                      <div className="bg-white rounded-lg shadow-sm p-6">
//                         <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                            <Car className="text-blue-600" size={20} />
//                            Available Vehicles ({showroom.vehicles.length})
//                         </h2>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                            {showroom.vehicles.map((vehicle) => (
//                               <div key={vehicle._id} className="border border-gray-200 rounded-lg p-4">
//                                  <h3 className="font-semibold text-gray-900">{vehicle.name}</h3>
//                                  <p className="text-gray-600 text-sm">{vehicle.model}</p>
//                                  {vehicle.price && (
//                                     <p className="text-blue-600 font-semibold mt-2">${vehicle.price.toLocaleString()}</p>
//                                  )}
//                               </div>
//                            ))}
//                         </div>
//                      </div>
//                   )}
//                </div>

//                {/* Sidebar */}
//                <div className="space-y-6">
//                   {/* Contact Information */}
//                   <div className="bg-white rounded-lg shadow-sm p-6">
//                      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                         <Phone className="text-blue-600" size={20} />
//                         Contact
//                      </h2>
//                      <div className="space-y-3">
//                         <div>
//                            <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
//                            <a
//                               href={`tel:${showroom.contactNumber}`}
//                               className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
//                            >
//                               {showroom.contactNumber}
//                               <ExternalLink size={14} />
//                            </a>
//                         </div>
//                      </div>
//                   </div>

//                   {/* Location Coordinates */}
//                   {showroom.lat && showroom.lon && (
//                      <div className="bg-white rounded-lg shadow-sm p-6">
//                         <h2 className="text-xl font-semibold text-gray-900 mb-4">Location Coordinates</h2>
//                         <div className="space-y-3">
//                            <div>
//                               <label className="block text-sm font-medium text-gray-500 mb-1">Latitude</label>
//                               <p className="text-gray-900 font-mono text-sm">{showroom.lat}</p>
//                            </div>
//                            <div>
//                               <label className="block text-sm font-medium text-gray-500 mb-1">Longitude</label>
//                               <p className="text-gray-900 font-mono text-sm">{showroom.lon}</p>
//                            </div>
//                            <button
//                               onClick={openInMaps}
//                               className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
//                            >
//                               <ExternalLink size={16} />
//                               View on Map
//                            </button>
//                         </div>
//                      </div>
//                   )}

//                   {/* Quick Actions */}
//                   <div className="bg-white rounded-lg shadow-sm p-6">
//                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
//                      <div className="space-y-3">
//                         <button
//                            onClick={() => navigate(`admin/showrooms/edit/${showroom._id}`)}
//                            className="w-full flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
//                         >
//                            <Edit size={16} />
//                            Edit Showroom
//                         </button>
//                         <button
//                            onClick={deleteShowroom}
//                            className="w-full flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
//                         >
//                            <Trash2 size={16} />
//                            Delete Showroom
//                         </button>
//                      </div>
//                   </div>
//                </div>
//             </div>
//          </div>
//       </div>
//    )
// }

// export default ShowroomDetail
