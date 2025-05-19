"use client"

import { useState } from "react"
import { FaUser, FaEdit, FaCheck, FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard } from "react-icons/fa"

const Profile = () => {
   const [user, setUser] = useState({
      firstName: "John",
      lastName: "Doe",
      email: "john@gmail.com",
      phoneNumber: "9912343695",
      address: "NYX",
   })

   const [editField, setEditField] = useState(null)

   const handleChange = (field, value) => {
      setUser((prev) => ({ ...prev, [field]: value }))
   }

   const handleSave = () => {
      setEditField(null)
      // Optionally send `user` to backend here
   }

   const renderField = (label, fieldKey, icon) => (
      <div className="mb-6">
         <label className="text-gray-700 text-sm font-medium block mb-2 flex items-center">
            {icon}
            <span className="ml-2">{label}</span>
         </label>
         <div className="flex items-center space-x-2 group relative">
            <input
               type="text"
               value={user[fieldKey]}
               readOnly={editField !== fieldKey}
               onChange={(e) => handleChange(fieldKey, e.target.value)}
               className={`
            w-full border rounded-lg px-4 py-3 text-gray-700 focus:outline-none transition-all duration-200
            ${editField === fieldKey
                     ? "border-indigo-500 shadow-sm focus:ring-2 focus:ring-indigo-200"
                     : "border-gray-200 bg-gray-50"
                  }
          `}
            />
            {editField === fieldKey ? (
               <button
                  onClick={handleSave}
                  className="absolute right-3 flex items-center justify-center h-8 w-8 rounded-full text-white bg-green-500 hover:bg-green-600 transition-colors"
                  aria-label="Save"
               >
                  <FaCheck className="text-sm" />
               </button>
            ) : (
               <button
                  onClick={() => setEditField(fieldKey)}
                  className="absolute right-3 flex items-center justify-center h-8 w-8 rounded-full text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 opacity-0 group-hover:opacity-100 transition-all duration-200"
                  aria-label="Edit"
               >
                  <FaEdit className="text-sm" />
               </button>
            )}
         </div>
      </div>
   )

   return (
      <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-12 px-4">
         <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
               {/* Profile Header */}
               <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 px-6 py-8 text-white">
                  <div className="flex items-center">
                     <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center">
                        <FaUser className="text-3xl" />
                     </div>
                     <div className="ml-6">
                        <h2 className="text-2xl font-bold">
                           {user.firstName} {user.lastName}
                        </h2>
                        <p className="text-indigo-200 mt-1">Premium Member</p>
                     </div>
                  </div>
               </div>

               {/* Profile Content */}
               <div className="px-8 py-8">
                  <div className="mb-8">
                     <h3 className="text-lg font-semibold text-gray-800 mb-1">Profile Information</h3>
                     <p className="text-sm text-gray-500">Click on any field to edit your profile information</p>
                  </div>

                  <div className="space-y-2">
                     {renderField("First Name", "firstName", <FaIdCard className="text-indigo-500" />)}
                     {renderField("Last Name", "lastName", <FaIdCard className="text-indigo-500" />)}
                     {renderField("Email", "email", <FaEnvelope className="text-indigo-500" />)}
                     {renderField("Phone Number", "phoneNumber", <FaPhone className="text-indigo-500" />)}
                     {renderField("Address", "address", <FaMapMarkerAlt className="text-indigo-500" />)}
                  </div>

                  <div className="mt-10 flex flex-col sm:flex-row gap-4">
                     <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg">
                        Save All Changes
                     </button>
                     <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors duration-200">
                        Cancel
                     </button>
                  </div>
               </div>
            </div>

            {/* Additional Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
               <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                     <h3 className="font-semibold text-gray-800">Saved Cars</h3>
                     <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        3 Cars
                     </span>
                  </div>
                  <p className="text-gray-600 text-sm">You have 3 cars saved in your wishlist</p>
                  <button className="mt-4 w-full text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                     View All Saved Cars →
                  </button>
               </div>

               <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                     <h3 className="font-semibold text-gray-800">Recent Activity</h3>
                     <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        Active
                     </span>
                  </div>
                  <p className="text-gray-600 text-sm">Last login: Today at 10:23 AM</p>
                  <button className="mt-4 w-full text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                     View Activity Log →
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Profile
