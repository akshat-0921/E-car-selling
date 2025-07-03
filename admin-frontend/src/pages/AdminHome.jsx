"use client"

import { useNavigate } from "react-router-dom"
import { Tag, Plus, Car, Truck, ArrowRight, Building2, MapPin } from "lucide-react"

const AdminHome = () => {
   const navigate = useNavigate()

   const dashboardItems = [
      {
         title: "View All Brands",
         description: "Manage and view all vehicle brands",
         icon: Tag,
         onClick: () => navigate("/admin/brands"),
         color: "bg-slate-50 hover:bg-slate-100 border-slate-200",
         iconColor: "text-slate-600",
      },
      {
         title: "Add New Brand",
         description: "Create a new vehicle brand",
         icon: Plus,
         onClick: () => navigate("/admin/brand/add"),
         color: "bg-emerald-50 hover:bg-emerald-100 border-emerald-200",
         iconColor: "text-emerald-600",
      },
      {
         title: "View All Showrooms",
         description: "Manage and view all showroom locations",
         icon: Building2,
         onClick: () => navigate("/admin/showrooms"),
         color: "bg-orange-50 hover:bg-orange-100 border-orange-200",
         iconColor: "text-orange-600",
      },
      {
         title: "Add New Showroom",
         description: "Create a new showroom location",
         icon: MapPin,
         onClick: () => navigate("/admin/showrooms/add"),
         color: "bg-cyan-50 hover:bg-cyan-100 border-cyan-200",
         iconColor: "text-cyan-600",
      },
      {
         title: "View Vehicles by Brand",
         description: "Browse vehicles organized by brand",
         icon: Car,
         onClick: () => navigate("/admin/brands"),
         color: "bg-blue-50 hover:bg-blue-100 border-blue-200",
         iconColor: "text-blue-600",
      },
      {
         title: "Add Vehicle to Brand",
         description: "Add new vehicles to existing brands",
         icon: Truck,
         onClick: () => navigate("/admin/brands"),
         color: "bg-purple-50 hover:bg-purple-100 border-purple-200",
         iconColor: "text-purple-600",
      },
   ]

   return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
         <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
               <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
               <p className="text-gray-600">Manage your vehicle brands, showrooms, and inventory</p>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
               {dashboardItems.map((item, index) => {
                  const IconComponent = item.icon
                  return (
                     <div
                        key={index}
                        className={`${item.color} border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] group`}
                        onClick={item.onClick}
                     >
                        <div className="flex items-start justify-between mb-4">
                           <div className={`p-3 rounded-lg bg-white shadow-sm ${item.iconColor}`}>
                              <IconComponent size={24} />
                           </div>
                           <ArrowRight
                              size={20}
                              className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200"
                           />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                     </div>
                  )
               })}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
               <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
               <div className="flex flex-wrap gap-3">
                  <button
                     onClick={() => navigate("/admin/brands")}
                     className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 text-sm font-medium"
                  >
                     <Tag size={16} className="mr-2" />
                     View Brands
                  </button>
                  <button
                     onClick={() => navigate("/admin/brand/add")}
                     className="inline-flex items-center px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg transition-colors duration-200 text-sm font-medium"
                  >
                     <Plus size={16} className="mr-2" />
                     Add Brand
                  </button>
                  <button
                     onClick={() => navigate("/showrooms")}
                     className="inline-flex items-center px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-lg transition-colors duration-200 text-sm font-medium"
                  >
                     <Building2 size={16} className="mr-2" />
                     View Showrooms
                  </button>
                  <button
                     onClick={() => navigate("/showrooms/add")}
                     className="inline-flex items-center px-4 py-2 bg-cyan-100 hover:bg-cyan-200 text-cyan-700 rounded-lg transition-colors duration-200 text-sm font-medium"
                  >
                     <MapPin size={16} className="mr-2" />
                     Add Showroom
                  </button>
               </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
               <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm font-medium text-gray-600">Total Brands</p>
                        <p className="text-2xl font-bold text-gray-900">--</p>
                     </div>
                     <div className="p-3 bg-blue-50 rounded-lg">
                        <Tag className="text-blue-600" size={20} />
                     </div>
                  </div>
               </div>
               <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm font-medium text-gray-600">Total Showrooms</p>
                        <p className="text-2xl font-bold text-gray-900">--</p>
                     </div>
                     <div className="p-3 bg-orange-50 rounded-lg">
                        <Building2 className="text-orange-600" size={20} />
                     </div>
                  </div>
               </div>
               <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm font-medium text-gray-600">Total Vehicles</p>
                        <p className="text-2xl font-bold text-gray-900">--</p>
                     </div>
                     <div className="p-3 bg-green-50 rounded-lg">
                        <Car className="text-green-600" size={20} />
                     </div>
                  </div>
               </div>
               <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm font-medium text-gray-600">Recent Updates</p>
                        <p className="text-2xl font-bold text-gray-900">--</p>
                     </div>
                     <div className="p-3 bg-purple-50 rounded-lg">
                        <Truck className="text-purple-600" size={20} />
                     </div>
                  </div>
               </div>
            </div>

            {/* Recent Activity Section */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
               <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Brands</h2>
                  <div className="space-y-3">
                     <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                        <div className="flex items-center gap-3">
                           <div className="p-2 bg-blue-50 rounded-lg">
                              <Tag className="text-blue-600" size={16} />
                           </div>
                           <span className="text-gray-600 text-sm">No recent brands</span>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Showrooms</h2>
                  <div className="space-y-3">
                     <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                        <div className="flex items-center gap-3">
                           <div className="p-2 bg-orange-50 rounded-lg">
                              <Building2 className="text-orange-600" size={16} />
                           </div>
                           <span className="text-gray-600 text-sm">No recent showrooms</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default AdminHome
