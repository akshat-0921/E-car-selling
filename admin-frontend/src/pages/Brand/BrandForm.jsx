"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { ArrowLeft, Upload, X, Building2 } from "lucide-react"
import axiosInstance from "../../api/axiosInstance"

const BrandForm = () => {
   const [form, setForm] = useState({ name: "", description: "" })
   const [logo, setLogo] = useState(null)
   const [preview, setPreview] = useState(null)
   const [loading, setLoading] = useState(false)
   const navigate = useNavigate()

   const onChange = (e) => {
      setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
   }

   const handleFileChange = (e) => {
      const file = e.target.files[0]
      if (file) {
         if (file.size > 2 * 1024 * 1024) {
            toast.error("File size should be less than 2MB")
            return
         }
         setLogo(file)
         setPreview(URL.createObjectURL(file))
      }
   }

   const removeLogo = () => {
      setLogo(null)
      setPreview(null)
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      if (!form.name.trim()) {
         toast.error("Brand name is required")
         return
      }

      setLoading(true)
      const data = new FormData()
      data.append("name", form.name.trim())
      data.append("description", form.description.trim())
      if (logo) data.append("logo", logo)

      try {
         await axiosInstance.post("/brand/add", data, {
            headers: { "Content-Type": "multipart/form-data" },
         })
         toast.success("Brand added successfully!")
         navigate("/admin/brands")
      } catch (err) {
         toast.error(err?.response?.data?.msg || "Failed to add brand")
      }
      setLoading(false)
   }

   return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
         <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="mb-8">
               <button
                  onClick={() => navigate("/admin/brands")}
                  className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
               >
                  <ArrowLeft size={20} className="mr-2" />
                  Back to Brands
               </button>
               <h1 className="text-3xl font-bold text-gray-900">Add New Brand</h1>
               <p className="text-gray-600 mt-1">Create a new vehicle brand</p>
            </div>

            {/* Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
               <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Brand Name */}
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Brand Name *</label>
                     <input
                        name="name"
                        value={form.name}
                        onChange={onChange}
                        placeholder="Enter brand name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                     />
                  </div>

                  {/* Description */}
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                     <textarea
                        name="description"
                        value={form.description}
                        onChange={onChange}
                        placeholder="Describe this brand..."
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                     />
                  </div>

                  {/* Logo Upload */}
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Brand Logo</label>
                     {preview ? (
                        <div className="relative">
                           <div className="w-full h-48 bg-gray-50 rounded-lg border border-gray-300 flex items-center justify-center">
                              <img
                                 src={preview || "/placeholder.svg"}
                                 alt="Logo preview"
                                 className="max-h-40 max-w-full object-contain"
                              />
                           </div>
                           <button
                              type="button"
                              onClick={removeLogo}
                              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                           >
                              <X size={16} />
                           </button>
                        </div>
                     ) : (
                        <label
                           htmlFor="brand-logo"
                           className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                           <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-4 text-gray-500" />
                              <p className="mb-2 text-sm text-gray-500">
                                 <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">PNG, JPG or WEBP (MAX. 2MB)</p>
                           </div>
                           <input id="brand-logo" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                        </label>
                     )}
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4 pt-4">
                     <button
                        type="button"
                        onClick={() => navigate("/admin/brands")}
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
                              <Building2 size={16} className="mr-2" />
                              Add Brand
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

export default BrandForm
