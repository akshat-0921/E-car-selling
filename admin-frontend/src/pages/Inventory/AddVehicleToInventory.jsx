"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Plus, Loader2, Car, Building2, Hash, Search, IndianRupee } from "lucide-react"
import { toast } from "react-toastify"
import axiosInstance from "../../api/axiosInstance"

const AddVehicleToInventory = () => {
   const [loading, setLoading] = useState(true)
   const [submitting, setSubmitting] = useState(false)
   const [showroom, setShowroom] = useState(null)
   const [vehicles, setVehicles] = useState([])
   const [filteredVehicles, setFilteredVehicles] = useState([])
   const [searchTerm, setSearchTerm] = useState("")
   const [formData, setFormData] = useState({
      vehicleId: "",
      quantity: 1,
      price: "",
   })
   const navigate = useNavigate()
   const { showroomId } = useParams()

   useEffect(() => {
      loadShowroomData()
   }, [showroomId])

   useEffect(() => {
      if (showroom?.brandId) {
         loadVehicles(showroom.brandId)
      }
   }, [showroom])

   useEffect(() => {
      const filtered = vehicles.filter(
         (vehicle) =>
            vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicle.brandId?.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredVehicles(filtered)
   }, [searchTerm, vehicles])

   const loadShowroomData = async () => {
      try {
         const res = await axiosInstance.get(`/showroom/get/${showroomId}`)
         setShowroom(res.data.showroom)
      } catch (error) {
         toast.error("Failed to load showroom data")
         navigate("/admin/inventory")
      }
   }

   const loadVehicles = async (brandId) => {
      setLoading(true)
      try {
         const res = await axiosInstance.get(`/brand/get-vehicles/${brandId}`)
         setVehicles(res.data.vehicles || [])
         setFilteredVehicles(res.data.vehicles || [])
      } catch (error) {
         toast.error("Failed to load vehicles")
      }
      setLoading(false)
   }

   const handleSubmit = async (e) => {
      e.preventDefault()

      if (!formData.vehicleId || !formData.quantity) {
         toast.error("Please select a vehicle and quantity")
         return
      }

      setSubmitting(true)
      try {
         const payload = {
            showroomId,
            vehicleId: formData.vehicleId,
            quantity: Number(formData.quantity),
            ...(formData.price && { price: Number(formData.price) }),
         }

         await axiosInstance.post("/inventory/add-vehicle", payload)
         toast.success("Vehicle added to inventory successfully")
         navigate(`/admin/inventory/${showroomId}`)
      } catch (error) {
         toast.error(error?.response?.data?.msg || "Failed to add vehicle to inventory")
      }
      setSubmitting(false)
   }

   const handleVehicleSelect = (vehicle) => {
      setFormData({
         ...formData,
         vehicleId: vehicle._id,
         price: vehicle.price || "",
      })
   }

   if (loading) {
      return (
         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="flex items-center gap-3">
               <Loader2 className="animate-spin text-blue-600" size={32} />
               <span className="text-gray-600">Loading vehicles...</span>
            </div>
         </div>
      )
   }

   return (
      <div className="min-h-screen bg-gray-50 p-6">
         <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
               <div className="flex items-center gap-4">
                  <button
                     onClick={() => navigate(`/admin/inventory/${showroomId}`)}
                     className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                     <ArrowLeft size={20} />
                  </button>
                  <div>
                     <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                        <Plus className="text-green-600" />
                        Add Vehicle to Inventory
                     </h1>
                     <p className="text-gray-600 mt-1">Add a vehicle to {showroom?.name} inventory</p>
                  </div>
               </div>
            </div>

            {showroom && (
               <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                     <Building2 className="text-blue-600" size={20} />
                     <h2 className="text-xl font-semibold text-gray-900">Target Showroom</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                     <div>
                        <span className="text-gray-600">Name:</span>
                        <p className="text-gray-900 font-medium">{showroom.name}</p>
                     </div>
                     <div>
                        <span className="text-gray-600">Location:</span>
                        <p className="text-gray-900">
                           {showroom.city}, {showroom.state}
                        </p>
                     </div>
                     <div>
                        <span className="text-gray-600">Contact:</span>
                        <p className="text-gray-900">{showroom.contactNumber}</p>
                     </div>
                  </div>
               </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
               <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Vehicle</h2>
                  <div className="relative mb-4">
                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                     <input
                        type="text"
                        placeholder="Search vehicles by name, model, or brand..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     />
                  </div>
                  <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg">
                     {filteredVehicles.length === 0 ? (
                        <div className="p-8 text-center">
                           <Car className="mx-auto text-gray-400 mb-4" size={48} />
                           <h3 className="text-lg font-semibold text-gray-900 mb-2">No vehicles found</h3>
                           <p className="text-gray-600">Try adjusting your search terms</p>
                        </div>
                     ) : (
                        <div className="divide-y divide-gray-200">
                           {filteredVehicles.map((vehicle) => (
                              <div
                                 key={vehicle._id}
                                 className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${formData.vehicleId === vehicle._id ? "bg-blue-50 border-l-4 border-blue-500" : ""
                                    }`}
                                 onClick={() => handleVehicleSelect(vehicle)}
                              >
                                 <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 rounded-lg">
                                       <Car className="text-blue-600" size={20} />
                                    </div>
                                    <div className="flex-1">
                                       <h3 className="font-semibold text-gray-900">{vehicle.name}</h3>
                                       <p className="text-gray-600 text-sm">{vehicle.model}</p>
                                       <p className="text-gray-500 text-xs">Brand: {vehicle.brandId?.name || "Unknown"}</p>
                                    </div>
                                    {formData.vehicleId === vehicle._id && (
                                       <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                                          <div className="w-2 h-2 bg-white rounded-full"></div>
                                       </div>
                                    )}
                                 </div>
                              </div>
                           ))}
                        </div>
                     )}
                  </div>
               </div>

               <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Inventory Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                           <Hash className="inline w-4 h-4 mr-1" />
                           Quantity
                        </label>
                        <input
                           type="number"
                           value={formData.quantity}
                           onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           placeholder="Enter quantity"
                           min="1"
                           step="1"
                           required
                        />
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                           <IndianRupee className="inline w-4 h-4 mr-1" />
                           Price per Unit
                        </label>
                        <input
                           type="number"
                           value={formData.price}
                           onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           placeholder="Leave empty to use vehicle default price"
                           min="0"
                           step="0.01"
                        />
                     </div>
                  </div>
               </div>

               <div className="flex gap-4">
                  <button
                     type="button"
                     onClick={() => navigate(`/admin/inventory/${showroomId}`)}
                     className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                     Cancel
                  </button>
                  <button
                     type="submit"
                     disabled={submitting || !formData.vehicleId || !formData.quantity}
                     className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                     {submitting ? (
                        <>
                           <Loader2 className="animate-spin" size={20} />
                           Adding...
                        </>
                     ) : (
                        <>
                           <Plus size={20} />
                           Add to Inventory
                        </>
                     )}
                  </button>
               </div>
            </form>
         </div>
      </div>
   )
}

export default AddVehicleToInventory

// "use client"

// import { useState, useEffect } from "react"
// import { useNavigate, useParams } from "react-router-dom"
// import { ArrowLeft, Plus, Loader2, Car, Building2, DollarSign, Hash, Search, IndianRupeeIcon } from "lucide-react"
// import { toast } from "react-toastify"
// import axiosInstance from "../../api/axiosInstance"

// const AddVehicleToInventory = () => {
//    const [loading, setLoading] = useState(true)
//    const [submitting, setSubmitting] = useState(false)
//    const [showroom, setShowroom] = useState(null)
//    const [vehicles, setVehicles] = useState([])
//    const [filteredVehicles, setFilteredVehicles] = useState([])
//    const [searchTerm, setSearchTerm] = useState("")
//    const [formData, setFormData] = useState({
//       vehicleId: "",
//       quantity: "",
//       price: "",
//    })
//    const navigate = useNavigate()
//    const { showroomId } = useParams()

//    useEffect(() => {
//       loadShowroomData();
//    }, [showroomId]);

//    useEffect(() => {
//       if (showroom?.brandId) {
//          loadVehicles(showroom.brandId);
//       }
//    }, [showroom])

//    useEffect(() => {
//       const filtered = vehicles.filter(
//          (vehicle) =>
//             vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             vehicle.brandId?.name.toLowerCase().includes(searchTerm.toLowerCase()),
//       )
//       setFilteredVehicles(filtered)
//    }, [searchTerm, vehicles])

//    const loadShowroomData = async () => {
//       try {
//          const res = await axiosInstance.get(`/showroom/get/${showroomId}`)
//          setShowroom(res.data.showroom)
//       } catch (error) {
//          toast.error("Failed to load showroom data")
//          navigate("/admin/inventory")
//       }
//    }

//    const loadVehicles = async (brandId) => {
//       setLoading(true);
//       try {
//          const res = await axiosInstance.get(`/brand/get-vehicles/${brandId}`);
//          setVehicles(res.data.vehicles || []);
//          setFilteredVehicles(res.data.vehicles || []);
//       } catch (error) {
//          toast.error("Failed to load vehicles");
//       }
//       setLoading(false);
//    };

//    const handleSubmit = async (e) => {
//       e.preventDefault()

//       if (!formData.vehicleId || !formData.quantity || !formData.price) {
//          toast.error("Please fill in all fields")
//          return
//       }

//       setSubmitting(true)
//       try {
//          const payload = {
//             showroomId,
//             vehicleId: formData.vehicleId,
//             quantity: Number.parseInt(formData.quantity),
//             price: Number.parseFloat(formData.price),
//          }

//          await axiosInstance.post("/inventory/add-vehicle", payload)
//          toast.success("Vehicle added to inventory successfully")
//          navigate(`/admin/inventory/${showroomId}`)
//       } catch (error) {
//          toast.error(error?.response?.data?.msg || "Failed to add vehicle to inventory")
//       }
//       setSubmitting(false)
//    }

//    const handleVehicleSelect = (vehicleId) => {
//       setFormData({ ...formData, vehicleId })
//    }

//    if (loading) {
//       return (
//          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//             <div className="flex items-center gap-3">
//                <Loader2 className="animate-spin text-blue-600" size={32} />
//                <span className="text-gray-600">Loading vehicles...</span>
//             </div>
//          </div>
//       )
//    }

//    return (
//       <div className="min-h-screen bg-gray-50 p-6">
//          <div className="max-w-4xl mx-auto">
//             {/* Header */}
//             <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//                <div className="flex items-center gap-4">
//                   <button
//                      onClick={() => navigate(`/admin/inventory/${showroomId}`)}
//                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//                   >
//                      <ArrowLeft size={20} />
//                   </button>
//                   <div>
//                      <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
//                         <Plus className="text-green-600" />
//                         Add Vehicle to Inventory
//                      </h1>
//                      <p className="text-gray-600 mt-1">Add a vehicle to {showroom?.name} inventory</p>
//                   </div>
//                </div>
//             </div>

//             {/* Showroom Info */}
//             {showroom && (
//                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//                   <div className="flex items-center gap-3 mb-4">
//                      <Building2 className="text-blue-600" size={20} />
//                      <h2 className="text-xl font-semibold text-gray-900">Target Showroom</h2>
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//                      <div>
//                         <span className="text-gray-600">Name:</span>
//                         <p className="text-gray-900 font-medium">{showroom.name}</p>
//                      </div>
//                      <div>
//                         <span className="text-gray-600">Location:</span>
//                         <p className="text-gray-900">
//                            {showroom.city}, {showroom.state}
//                         </p>
//                      </div>
//                      <div>
//                         <span className="text-gray-600">Contact:</span>
//                         <p className="text-gray-900">{showroom.contactNumber}</p>
//                      </div>
//                   </div>
//                </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-6">
//                {/* Vehicle Selection */}
//                <div className="bg-white rounded-lg shadow-sm p-6">
//                   <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Vehicle</h2>

//                   {/* Search */}
//                   <div className="relative mb-4">
//                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                      <input
//                         type="text"
//                         placeholder="Search vehicles by name, model, or brand..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                      />
//                   </div>

//                   {/* Vehicle List */}
//                   <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg">
//                      {filteredVehicles.length === 0 ? (
//                         <div className="p-8 text-center">
//                            <Car className="mx-auto text-gray-400 mb-4" size={48} />
//                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No vehicles found</h3>
//                            <p className="text-gray-600">Try adjusting your search terms</p>
//                         </div>
//                      ) : (
//                         <div className="divide-y divide-gray-200">
//                            {filteredVehicles.map((vehicle) => (
//                               <div
//                                  key={vehicle._id}
//                                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${formData.vehicleId === vehicle._id ? "bg-blue-50 border-l-4 border-blue-500" : ""
//                                     }`}
//                                  onClick={() => handleVehicleSelect(vehicle._id)}
//                               >
//                                  <div className="flex items-center gap-3">
//                                     <div className="p-2 bg-blue-50 rounded-lg">
//                                        <Car className="text-blue-600" size={20} />
//                                     </div>
//                                     <div className="flex-1">
//                                        <h3 className="font-semibold text-gray-900">{vehicle.name}</h3>
//                                        <p className="text-gray-600 text-sm">{vehicle.model}</p>
//                                        <p className="text-gray-500 text-xs">Brand: {vehicle.brandId?.name || "Unknown"}</p>
//                                     </div>
//                                     {formData.vehicleId === vehicle._id && (
//                                        <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
//                                           <div className="w-2 h-2 bg-white rounded-full"></div>
//                                        </div>
//                                     )}
//                                  </div>
//                               </div>
//                            ))}
//                         </div>
//                      )}
//                   </div>
//                </div>

//                {/* Inventory Details */}
//                <div className="bg-white rounded-lg shadow-sm p-6">
//                   <h2 className="text-xl font-semibold text-gray-900 mb-4">Inventory Details</h2>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                      <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                            <Hash className="inline w-4 h-4 mr-1" />
//                            Quantity
//                         </label>
//                         <input
//                            type="number"
//                            value={formData.quantity}
//                            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
//                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                            placeholder="Enter quantity"
//                            min="1"
//                            required
//                         />
//                      </div>

//                      <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                            <IndianRupeeIcon className="inline w-4 h-4 mr-1" />
//                            Price per Unit
//                         </label>
//                         <input
//                            type="number"
//                            value={formData.price}
//                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                            placeholder="Enter price"
//                            min="0"
//                            step="0.01"
//                            required
//                         />
//                      </div>
//                   </div>
//                </div>

//                {/* Submit Button */}
//                <div className="flex gap-4">
//                   <button
//                      type="button"
//                      onClick={() => navigate(`/admin/inventory/${showroomId}`)}
//                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                      Cancel
//                   </button>
//                   <button
//                      type="submit"
//                      disabled={submitting || !formData.vehicleId || !formData.quantity || !formData.price}
//                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
//                   >
//                      {submitting ? (
//                         <>
//                            <Loader2 className="animate-spin" size={20} />
//                            Adding...
//                         </>
//                      ) : (
//                         <>
//                            <Plus size={20} />
//                            Add to Inventory
//                         </>
//                      )}
//                   </button>
//                </div>
//             </form>
//          </div>
//       </div>
//    )
// }

// export default AddVehicleToInventory
