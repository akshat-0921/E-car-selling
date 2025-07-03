"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { ArrowLeft, Upload, X, Car } from "lucide-react"
import axiosInstance from "../../api/axiosInstance"

import suv from "../../assets/bodyType/suv_clr.svg"
import sedan from "../../assets/bodyType/sedan_clr.svg"
import hatchback from "../../assets/bodyType/hatchback_clr.svg"
import coupe from "../../assets/bodyType/coupe_clr.svg"
import convertible from "../../assets/bodyType/convertible_clr.svg"
import van from "../../assets/bodyType/van_clr.svg"
import truck from "../../assets/bodyType/truck_clr.svg"

const CATEGORIES = [
   "Petrol",
   "Diesel",
   "CNG",
   "Electric",
   "Hybrid",
   "Hydrogen",
   "LPG",
   "Plug-in Hybrid",
   "Ethanol",
   "Biodiesel",
]

const bodyTypeOptions = [
   { value: "SUV", label: "SUV", image: suv },
   { value: "Sedan", label: "Sedan", image: sedan },
   { value: "Hatchback", label: "Hatchback", image: hatchback },
   { value: "Coupe", label: "Coupe", image: coupe },
   { value: "Convertible", label: "Convertible", image: convertible },
   { value: "Van", label: "Van", image: van },
   { value: "Truck", label: "Truck", image: truck },
]


const AddVehicle = () => {
   const { brandId } = useParams()
   const [form, setForm] = useState({
      name: "",
      category: "",
      fuelType: "",
      bodyType: "",
      price: "",
   })
   const [image, setImage] = useState(null)
   const [preview, setPreview] = useState(null)
   const [loading, setLoading] = useState(false)
   const navigate = useNavigate()

   const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

   const handleFileChange = (e) => {
      const file = e.target.files[0]
      if (file) {
         if (file.size > 2 * 1024 * 1024) {
            toast.error("File size should be less than 2MB")
            return
         }
         setImage(file)
         setPreview(URL.createObjectURL(file))
      }
   }

   const removeImage = () => {
      setImage(null)
      setPreview(null)
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      setLoading(true)
      try {
         const data = new FormData()
         data.append("name", form.name)
         data.append("category", form.category)
         data.append("price", form.price)
         data.append("bodyType", form.bodyType)
         if (image) data.append("image", image)

         await axiosInstance.post(`/vehicle/add/${brandId}`, data, {
            headers: { "Content-Type": "multipart/form-data" },
         })
         toast.success("Vehicle added successfully!")
         navigate(`/admin/brand/${brandId}/vehicles`)
      } catch (err) {
         toast.error(err?.response?.data?.msg || "Failed to add vehicle")
      }
      setLoading(false)
   }

   return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
         <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="mb-8">
               <button
                  onClick={() => navigate(`/admin/brand/${brandId}/vehicles`)}
                  className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
               >
                  <ArrowLeft size={20} className="mr-2" />
                  Back to Vehicles
               </button>
               <h1 className="text-3xl font-bold text-gray-900">Add New Vehicle</h1>
               <p className="text-gray-600 mt-1">Add a new vehicle to your brand</p>
            </div>

            {/* Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
               <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Vehicle Name */}
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Name *</label>
                     <input
                        name="name"
                        value={form.name}
                        onChange={onChange}
                        placeholder="Enter vehicle name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                     />
                  </div>

                  {/* Body Type */}
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Body Type *</label>
                     <select
                        name="bodyType"
                        value={form.bodyType}
                        onChange={onChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus-ring-blue-500 focus:border-blue-500 transition-colors"
                     >
                        <option value="">Select a category</option>
                        {
                           bodyTypeOptions.map((type) => (
                              <option key={type.value} value={type.value}>
                                 {type.value}
                              </option>
                           ))
                        }

                     </select>
                  </div>

                  {/* Category */}
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                     <select
                        name="category"
                        value={form.category}
                        onChange={onChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                     >
                        <option value="">Select a category</option>
                        {CATEGORIES.map((cat) => (
                           <option key={cat} value={cat}>
                              {cat}
                           </option>
                        ))}
                     </select>
                  </div>

                  {/* Price */}
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹) *</label>
                     <input
                        name="price"
                        value={form.price}
                        onChange={onChange}
                        placeholder="Enter price"
                        type="number"
                        min="0"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                     />
                  </div>

                  {/* Image Upload */}
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Image</label>
                     {preview ? (
                        <div className="relative">
                           <img
                              src={preview || "/placeholder.svg"}
                              alt="Vehicle preview"
                              className="w-full h-48 object-cover rounded-lg border border-gray-300"
                           />
                           <button
                              type="button"
                              onClick={removeImage}
                              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                           >
                              <X size={16} />
                           </button>
                        </div>
                     ) : (
                        <label
                           htmlFor="vehicle-image"
                           className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                           <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-4 text-gray-500" />
                              <p className="mb-2 text-sm text-gray-500">
                                 <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">PNG, JPG or WEBP (MAX. 2MB)</p>
                           </div>
                           <input
                              id="vehicle-image"
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="hidden"
                           />
                        </label>
                     )}
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4 pt-4">
                     <button
                        type="button"
                        onClick={() => navigate(`/admin/brand/${brandId}/vehicles`)}
                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                     >
                        Cancel
                     </button>
                     <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
                     >
                        {loading ? (
                           <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Adding...
                           </>
                        ) : (
                           <>
                              <Car size={16} className="mr-2" />
                              Add Vehicle
                           </>
                        )}
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   )
}

export default AddVehicle
