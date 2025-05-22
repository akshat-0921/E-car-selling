import React from "react"
import { Link } from "react-router-dom"

const SettingsPage = () => {
   return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-200 mt-10">
         <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>

         {/* Profile Section */}
         <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-700 mb-2">Profile</h2>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
               <p className="text-gray-600 mb-2">Name: <span className="font-medium">Ankit Shome</span></p>
               <p className="text-gray-600 mb-2">Email: <span className="font-medium">ankit@example.com</span></p>
               <Link to="/profile">
                  <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                     Edit Profile
                  </button>
               </Link>
            </div>
         </section>

         {/* Change Password Section */}
         <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-700 mb-2">Change Password</h2>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
               <div className="flex flex-col gap-3">
                  <input
                     type="password"
                     placeholder="Current Password"
                     className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                     type="password"
                     placeholder="New Password"
                     className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                     type="password"
                     placeholder="Confirm New Password"
                     className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="self-start px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all">
                     Update Password
                  </button>
               </div>
            </div>
         </section>

         {/* Delete Search History Section */}
         <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-700 mb-2">Delete Search History</h2>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
               <p className="text-gray-600">This will permanently delete your search history.</p>
               <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all">
                  Clear History
               </button>
            </div>
         </section>

         {/* Delete Account Section */}
         <section>
            <h2 className="text-xl font-semibold text-slate-700 mb-2">Delete Account</h2>
            <div className="bg-red-50 p-4 rounded-xl border border-red-300">
               <p className="text-red-600 mb-3 font-medium">
                  Warning: This action is irreversible. Your account and all associated data will be permanently deleted.
               </p>
               <button className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-all">
                  Delete My Account
               </button>
            </div>
         </section>
      </div>
   )
}

export default SettingsPage
