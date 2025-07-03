"use client"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Phone, Building2, Save, Loader2, Navigation, Map } from "lucide-react"
import axiosInstance from "../../api/axiosInstance"

const AddShowroom = () => {
   const [loading, setLoading] = useState(false)
   const [brands, setBrands] = useState([])
   const [formData, setFormData] = useState({
      brandId: "",
      name: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      contactNumber: "",
      lat: "",
      lon: "",
   })
   const [errors, setErrors] = useState({})
   const navigate = useNavigate()
   const { brandId } = useParams()

   useEffect(() => {
      if (brandId) {
         setFormData((prev) => ({ ...prev, brandId }))
      }
      loadBrands()
   }, [brandId])

   const loadBrands = async () => {
      try {
         const res = await axiosInstance.get("/brand/get-all")
         setBrands(res.data.brands || [])
      } catch (error) {
         toast.error("Failed to load brands")
      }
   }

   const handleInputChange = (e) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))
      if (errors[name]) {
         setErrors((prev) => ({ ...prev, [name]: "" }))
      }
   }

   const getCurrentLocation = () => {
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(
            (position) => {
               const { latitude, longitude } = position.coords
               setFormData((prev) => ({
                  ...prev,
                  lat: latitude.toString(),
                  lon: longitude.toString(),
               }))
               toast.success("Location captured successfully")
            },
            () => {
               toast.error("Unable to get your location")
            },
         )
      } else {
         toast.error("Geolocation is not supported by this browser")
      }
   }

   const validateForm = () => {
      const newErrors = {}

      if (!formData.brandId) newErrors.brandId = "Brand is required"
      if (!formData.name.trim()) newErrors.name = "Showroom name is required"
      if (!formData.address.trim()) newErrors.address = "Address is required"
      if (!formData.city.trim()) newErrors.city = "City is required"
      if (!formData.state.trim()) newErrors.state = "State is required"
      if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required"
      if (!formData.contactNumber.trim()) newErrors.contactNumber = "Contact number is required"

      // Validate phone number format
      const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
      if (formData.contactNumber && !phoneRegex.test(formData.contactNumber.replace(/\s/g, ""))) {
         newErrors.contactNumber = "Please enter a valid phone number"
      }

      // Validate coordinates if provided
      if (formData.lat && (isNaN(formData.lat) || formData.lat < -90 || formData.lat > 90)) {
         newErrors.lat = "Latitude must be between -90 and 90"
      }
      if (formData.lon && (isNaN(formData.lon) || formData.lon < -180 || formData.lon > 180)) {
         newErrors.lon = "Longitude must be between -180 and 180"
      }

      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
   }

   const handleSubmit = async (e) => {
      e.preventDefault()

      if (!validateForm()) {
         toast.error("Please fix the errors in the form")
         return
      }

      setLoading(true)
      try {
         const submitData = {
            ...formData,
            lat: formData.lat ? Number.parseFloat(formData.lat) : undefined,
            lon: formData.lon ? Number.parseFloat(formData.lon) : undefined,
         }

         await axiosInstance.post(`/showroom/add/${formData.brandId}`, submitData)
         toast.success("Showroom added successfully")
         navigate("/showrooms")
      } catch (error) {
         toast.error(error?.response?.data?.message || "Failed to add showroom")
      }
      setLoading(false)
   }

   return (
      <div className="min-h-screen bg-gray-50 p-6">
         <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
               <div className="flex items-center gap-4 mb-4">
                  <button
                     onClick={() => navigate("/showrooms")}
                     className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                     <ArrowLeft size={20} />
                  </button>
                  <div>
                     <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Building2 className="text-blue-600" />
                        Add New Showroom
                     </h1>
                     <p className="text-gray-600">Create a new showroom location</p>
                  </div>
               </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-lg shadow-sm p-6">
               <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Brand Selection */}
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Brand *</label>
                     <select
                        name="brandId"
                        value={formData.brandId}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.brandId ? "border-red-500" : "border-gray-300"
                           }`}
                        disabled={!!brandId}
                     >
                        <option value="">Select a brand</option>
                        {brands.map((brand) => (
                           <option key={brand._id} value={brand._id}>
                              {brand.name}
                           </option>
                        ))}
                     </select>
                     {errors.brandId && <p className="text-red-500 text-sm mt-1">{errors.brandId}</p>}
                  </div>

                  {/* Showroom Name */}
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Showroom Name *</label>
                     <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter showroom name"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.name ? "border-red-500" : "border-gray-300"
                           }`}
                     />
                     {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  {/* Address */}
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                     <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter full address"
                        rows={3}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.address ? "border-red-500" : "border-gray-300"
                           }`}
                     />
                     {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>

                  {/* City, State, ZIP */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                        <input
                           type="text"
                           name="city"
                           value={formData.city}
                           onChange={handleInputChange}
                           placeholder="City"
                           className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.city ? "border-red-500" : "border-gray-300"
                              }`}
                        />
                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                     </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                        <input
                           type="text"
                           name="state"
                           value={formData.state}
                           onChange={handleInputChange}
                           placeholder="State"
                           className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.state ? "border-red-500" : "border-gray-300"
                              }`}
                        />
                        {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                     </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
                        <input
                           type="text"
                           name="zipCode"
                           value={formData.zipCode}
                           onChange={handleInputChange}
                           placeholder="ZIP Code"
                           className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.zipCode ? "border-red-500" : "border-gray-300"
                              }`}
                        />
                        {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                     </div>
                  </div>

                  {/* Contact Number */}
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number *</label>
                     <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <input
                           type="tel"
                           name="contactNumber"
                           value={formData.contactNumber}
                           onChange={handleInputChange}
                           placeholder="Enter contact number"
                           className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.contactNumber ? "border-red-500" : "border-gray-300"
                              }`}
                        />
                     </div>
                     {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>}
                  </div>

                  {/* Location Coordinates */}
                  <div>
                     <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700">Location Coordinates (Optional)</label>
                        <button
                           type="button"
                           onClick={getCurrentLocation}
                           className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                        >
                           <Navigation size={14} />
                           Get Current Location
                        </button>
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <div>
                           <input
                              type="number"
                              name="lat"
                              value={formData.lat}
                              onChange={handleInputChange}
                              placeholder="Latitude"
                              step="any"
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.lat ? "border-red-500" : "border-gray-300"
                                 }`}
                           />
                           {errors.lat && <p className="text-red-500 text-sm mt-1">{errors.lat}</p>}
                        </div>

                        <div>
                           <input
                              type="number"
                              name="lon"
                              value={formData.lon}
                              onChange={handleInputChange}
                              placeholder="Longitude"
                              step="any"
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.lon ? "border-red-500" : "border-gray-300"
                                 }`}
                           />
                           {errors.lon && <p className="text-red-500 text-sm mt-1">{errors.lon}</p>}
                        </div>
                     </div>

                     {formData.lat && formData.lon && (
                        <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                           <div className="flex items-center gap-2 text-green-700">
                              <Map size={16} />
                              <span className="text-sm">
                                 Location: {Number.parseFloat(formData.lat).toFixed(6)},{" "}
                                 {Number.parseFloat(formData.lon).toFixed(6)}
                              </span>
                           </div>
                        </div>
                     )}
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4 pt-4">
                     <button
                        type="button"
                        onClick={() => navigate("admin/showrooms")}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                     >
                        Cancel
                     </button>
                     <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                     >
                        {loading ? (
                           <>
                              <Loader2 className="animate-spin" size={16} />
                              Adding...
                           </>
                        ) : (
                           <>
                              <Save size={16} />
                              Add Showroom
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

export default AddShowroom
