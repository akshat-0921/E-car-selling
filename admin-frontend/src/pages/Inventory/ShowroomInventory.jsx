"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Package, Plus, Edit, Trash2, Loader2, Car, Hash, Building2, IndianRupee } from "lucide-react"
import { toast } from "react-toastify"
import axiosInstance from "../../api/axiosInstance"

const ShowroomInventory = () => {
   const [loading, setLoading] = useState(true)
   const [showroom, setShowroom] = useState(null)
   const [inventory, setInventory] = useState([])
   const [editingItem, setEditingItem] = useState(null)
   const [editForm, setEditForm] = useState({ quantity: "", price: "" })
   const navigate = useNavigate()
   const { showroomId } = useParams()

   useEffect(() => {
      loadShowroomData()
      loadInventory()
   }, [showroomId])

   const loadShowroomData = async () => {
      try {
         const res = await axiosInstance.get(`/showroom/get/${showroomId}`)
         setShowroom(res.data.showroom)
      } catch {
         toast.error("Failed to load showroom data")
      }
   }

   const loadInventory = async () => {
      setLoading(true)
      try {
         const res = await axiosInstance.get(`/inventory/${showroomId}`)
         setInventory(res.data.vehicles || [])
      } catch {
         toast.error("Failed to load inventory")
      }
      setLoading(false)
   }

   const handleEditClick = (item) => {
      setEditingItem(item._id)
      setEditForm({
         quantity: item.quantity.toString(),
         price: item.price?.toString() || "",
      })
   }

   const handleUpdateInventory = async (inventoryId) => {
      try {
         const updateData = {
            quantity: Number(editForm.quantity),
            ...(editForm.price && { price: Number(editForm.price) }),
         }

         await axiosInstance.post(`/inventory/update/${inventoryId}`, updateData)
         toast.success("Inventory updated successfully")
         setEditingItem(null)
         loadInventory()
      } catch (error) {
         toast.error(error?.response?.data?.msg || "Failed to update inventory")
      }
   }

   const handleDeleteInventory = async (inventoryId) => {
      if (window.confirm("Are you sure you want to remove this vehicle from inventory?")) {
         try {
            await axiosInstance.delete(`/inventory/delete/${inventoryId}`)
            toast.success("Vehicle removed from inventory")
            loadInventory()
         } catch {
            toast.error("Failed to remove vehicle from inventory")
         }
      }
   }

   if (loading) {
      return (
         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="flex items-center gap-3">
               <Loader2 className="animate-spin text-blue-600" size={32} />
               <span className="text-gray-600">Loading inventory...</span>
            </div>
         </div>
      )
   }

   return (
      <div className="min-h-screen bg-gray-50 p-6">
         <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <button
                        onClick={() => navigate("/admin/inventory")}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                     >
                        <ArrowLeft size={20} />
                     </button>
                     <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                           <Package className="text-blue-600" />
                           {showroom?.name} Inventory
                        </h1>
                        <p className="text-gray-600 mt-1">Manage vehicles in this showroom</p>
                     </div>
                  </div>
                  <button
                     onClick={() => navigate(`/admin/inventory/add/${showroomId}`)}
                     className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                     <Plus size={16} />
                     Add Vehicle
                  </button>
               </div>
            </div>

            {showroom && (
               <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                     <Building2 className="text-blue-600" size={20} />
                     <h2 className="text-xl font-semibold text-gray-900">Showroom Information</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                     <div>
                        <span className="text-gray-600">Location:</span>
                        <p className="text-gray-900">
                           {showroom.city}, {showroom.state}
                        </p>
                     </div>
                     <div>
                        <span className="text-gray-600">Address:</span>
                        <p className="text-gray-900">{showroom.address}</p>
                     </div>
                     <div>
                        <span className="text-gray-600">Contact:</span>
                        <p className="text-gray-900">{showroom.contactNumber}</p>
                     </div>
                  </div>
               </div>
            )}

            <div className="bg-white rounded-lg shadow-sm">
               <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Vehicle Inventory ({inventory.length} items)</h2>
               </div>

               {inventory.length === 0 ? (
                  <div className="p-12 text-center">
                     <Car className="mx-auto text-gray-400 mb-4" size={48} />
                     <h3 className="text-xl font-semibold text-gray-900 mb-2">No vehicles in inventory</h3>
                     <p className="text-gray-600 mb-6">Start by adding vehicles to this showroom's inventory</p>
                     <button
                        onClick={() => navigate(`/admin/inventory/add/${showroomId}`)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                     >
                        <Plus size={20} />
                        Add First Vehicle
                     </button>
                  </div>
               ) : (
                  <div className="divide-y divide-gray-200">
                     {inventory.map((item) => (
                        <div key={item._id} className="p-6">
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                 <div className="p-3 bg-blue-50 rounded-lg">
                                    <Car className="text-blue-600" size={24} />
                                 </div>
                                 <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                       {item.vehicleId?.name || "Unknown Vehicle"}
                                    </h3>
                                    <p className="text-gray-600">
                                       Model: {item.vehicleId?.model || "N/A"}
                                    </p>
                                    <p className="text-gray-500 text-sm">Brand: {item.vehicleId?.brandId?.name || "N/A"}</p>
                                 </div>
                              </div>
                              <div className="flex items-center gap-3">
                                 {editingItem === item._id ? (
                                    <>
                                       <input
                                          type="number"
                                          value={editForm.quantity}
                                          onChange={(e) => setEditForm({ ...editForm, quantity: e.target.value })}
                                          className="w-24 px-2 py-1 border border-gray-300 rounded-lg"
                                          min="1"
                                          step="1"
                                          required
                                       />
                                       <input
                                          type="number"
                                          value={editForm.price}
                                          onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                                          className="w-28 px-2 py-1 border border-gray-300 rounded-lg"
                                          placeholder="Default"
                                          min="0"
                                          step="0.01"
                                       />
                                       <button
                                          onClick={() => handleUpdateInventory(item._id)}
                                          className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                       >
                                          Save
                                       </button>
                                       <button
                                          onClick={() => setEditingItem(null)}
                                          className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                                       >
                                          Cancel
                                       </button>
                                    </>
                                 ) : (
                                    <>
                                       <p className="text-gray-900 flex items-center">
                                          <Hash className="w-4 h-4 mr-1" /> {item.quantity}
                                       </p>
                                       <p className="text-gray-900 flex items-center">
                                          <IndianRupee className="w-4 h-4 mr-1" /> {item.price || "Default"}
                                       </p>
                                       <button
                                          onClick={() => handleEditClick(item)}
                                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                       >
                                          <Edit size={18} />
                                       </button>
                                       <button
                                          onClick={() => handleDeleteInventory(item._id)}
                                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                       >
                                          <Trash2 size={18} />
                                       </button>
                                    </>
                                 )}
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

export default ShowroomInventory


// "use client"

// import { useState, useEffect } from "react"
// import { useNavigate, useParams } from "react-router-dom"
// import { ArrowLeft, Package, Plus, Edit, Trash2, Loader2, Car, DollarSign, Hash, Building2, IndianRupee, IndianRupeeIcon } from "lucide-react"
// import { toast } from "react-toastify"
// import axiosInstance from "../../api/axiosInstance"

// const ShowroomInventory = () => {
//    const [loading, setLoading] = useState(true)
//    const [showroom, setShowroom] = useState(null)
//    const [inventory, setInventory] = useState([])
//    const [editingItem, setEditingItem] = useState(null)
//    const [editForm, setEditForm] = useState({ quantity: "", price: "" })
//    const navigate = useNavigate()
//    const { showroomId } = useParams()

//    useEffect(() => {
//       loadShowroomData()
//       loadInventory()
//    }, [showroomId])

//    const loadShowroomData = async () => {
//       try {
//          const res = await axiosInstance.get(`/showroom/get/${showroomId}`)
//          setShowroom(res.data.showroom)
//       } catch (error) {
//          toast.error("Failed to load showroom data")
//       }
//    }

//    const loadInventory = async () => {
//       setLoading(true)
//       try {
//          const res = await axiosInstance.get(`/inventory/${showroomId}`)
//          setInventory(res.data.vehicles || [])
//       } catch (error) {
//          toast.error("Failed to load inventory")
//       }
//       setLoading(false)
//    }

//    const handleEditClick = (item) => {
//       setEditingItem(item._id)
//       setEditForm({
//          quantity: item.quantity.toString(),
//          price: item.price.toString(),
//       })
//    }

//    const handleUpdateInventory = async (inventoryId) => {
//       try {
//          const updateData = {
//             quantity: Number.parseInt(editForm.quantity),
//             price: Number.parseFloat(editForm.price),
//          }

//          await axiosInstance.post(`/inventory/update/${inventoryId}`, updateData)
//          toast.success("Inventory updated successfully")
//          setEditingItem(null)
//          loadInventory()
//       } catch (error) {
//          toast.error(error?.response?.data?.msg || "Failed to update inventory")
//       }
//    }

//    const handleDeleteInventory = async (inventoryId) => {
//       if (window.confirm("Are you sure you want to remove this vehicle from inventory?")) {
//          try {
//             await axiosInstance.delete(`/inventory/delete/${inventoryId}`)
//             toast.success("Vehicle removed from inventory")
//             loadInventory()
//          } catch (error) {
//             toast.error("Failed to remove vehicle from inventory")
//          }
//       }
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
//             {/* Header */}
//             <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//                <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                      <button
//                         onClick={() => navigate("/admin/inventory")}
//                         className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//                      >
//                         <ArrowLeft size={20} />
//                      </button>
//                      <div>
//                         <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
//                            <Package className="text-blue-600" />
//                            {showroom?.name} Inventory
//                         </h1>
//                         <p className="text-gray-600 mt-1">Manage vehicles in this showroom</p>
//                      </div>
//                   </div>
//                   <button
//                      onClick={() => navigate(`/admin/inventory/add/${showroomId}`)}
//                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//                   >
//                      <Plus size={16} />
//                      Add Vehicle
//                   </button>
//                </div>
//             </div>

//             {/* Showroom Info */}
//             {showroom && (
//                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//                   <div className="flex items-center gap-3 mb-4">
//                      <Building2 className="text-blue-600" size={20} />
//                      <h2 className="text-xl font-semibold text-gray-900">Showroom Information</h2>
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//                      <div>
//                         <span className="text-gray-600">Location:</span>
//                         <p className="text-gray-900">
//                            {showroom.city}, {showroom.state}
//                         </p>
//                      </div>
//                      <div>
//                         <span className="text-gray-600">Address:</span>
//                         <p className="text-gray-900">{showroom.address}</p>
//                      </div>
//                      <div>
//                         <span className="text-gray-600">Contact:</span>
//                         <p className="text-gray-900">{showroom.contactNumber}</p>
//                      </div>
//                   </div>
//                </div>
//             )}

//             {/* Inventory List */}
//             <div className="bg-white rounded-lg shadow-sm">
//                <div className="p-6 border-b border-gray-200">
//                   <h2 className="text-xl font-semibold text-gray-900">Vehicle Inventory ({inventory.length} items)</h2>
//                </div>

//                {inventory.length === 0 ? (
//                   <div className="p-12 text-center">
//                      <Car className="mx-auto text-gray-400 mb-4" size={48} />
//                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No vehicles in inventory</h3>
//                      <p className="text-gray-600 mb-6">Start by adding vehicles to this showroom's inventory</p>
//                      <button
//                         onClick={() => navigate(`/admin/inventory/add/${showroomId}`)}
//                         className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//                      >
//                         <Plus size={20} />
//                         Add First Vehicle
//                      </button>
//                   </div>
//                ) : (
//                   <div className="divide-y divide-gray-200">
//                      {inventory.map((item) => (
//                         <div key={item._id} className="p-6">
//                            <div className="flex items-center justify-between">
//                               <div className="flex items-center gap-4">
//                                  <div className="p-3 bg-blue-50 rounded-lg">
//                                     <Car className="text-blue-600" size={24} />
//                                  </div>
//                                  <div>
//                                     <h3 className="text-lg font-semibold text-gray-900">
//                                        {item.vehicleId?.name || "Unknown Vehicle"}
//                                     </h3>
//                                     <p className="text-gray-600">{item.vehicleId?.model}</p>
//                                     <div className="flex items-center gap-4 mt-2 text-sm">
//                                        <div className="flex items-center gap-1">
//                                           <Hash className="text-gray-400" size={14} />
//                                           <span className="text-gray-600">Qty:</span>
//                                           {editingItem === item._id ? (
//                                              <input
//                                                 type="number"
//                                                 value={editForm.quantity}
//                                                 onChange={(e) => setEditForm({ ...editForm, quantity: e.target.value })}
//                                                 className="w-20 px-2 py-1 border border-gray-300 rounded text-gray-900"
//                                                 min="0"
//                                              />
//                                           ) : (
//                                              <span className="font-medium text-gray-900">{item.quantity}</span>
//                                           )}
//                                        </div>
//                                        <div className="flex items-center gap-1">
//                                           <IndianRupeeIcon className="text-gray-400" size={14} />
//                                           <span className="text-gray-600">Price:</span>
//                                           {editingItem === item._id ? (
//                                              <input
//                                                 type="number"
//                                                 value={editForm.price}
//                                                 onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
//                                                 className="w-24 px-2 py-1 border border-gray-300 rounded text-gray-900"
//                                                 min="0"
//                                                 step="0.01"
//                                              />
//                                           ) : (
//                                              <span className="font-medium text-green-600">
//                                                 ${Number.parseFloat(item.price).toLocaleString()}
//                                              </span>
//                                           )}
//                                        </div>
//                                     </div>
//                                  </div>
//                               </div>

//                               <div className="flex items-center gap-2">
//                                  {editingItem === item._id ? (
//                                     <>
//                                        <button
//                                           onClick={() => handleUpdateInventory(item._id)}
//                                           className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
//                                        >
//                                           Save
//                                        </button>
//                                        <button
//                                           onClick={() => setEditingItem(null)}
//                                           className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors"
//                                        >
//                                           Cancel
//                                        </button>
//                                     </>
//                                  ) : (
//                                     <>
//                                        <button
//                                           onClick={() => handleEditClick(item)}
//                                           className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                                        >
//                                           <Edit size={16} />
//                                        </button>
//                                        <button
//                                           onClick={() => handleDeleteInventory(item._id)}
//                                           className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                                        >
//                                           <Trash2 size={16} />
//                                        </button>
//                                     </>
//                                  )}
//                               </div>
//                            </div>
//                         </div>
//                      ))}
//                   </div>
//                )}
//             </div>
//          </div>
//       </div>
//    )
// }

// export default ShowroomInventory
