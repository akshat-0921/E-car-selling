
import { useState, useEffect, useContext } from "react"
import { FaUser, FaEdit, FaCheck, FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard } from "react-icons/fa"
import { AuthContext } from "../../context/AuthContext"
import { vehicleAPI } from "../../api"
import { toast } from "react-toastify"

const Profile = () => {
   const { user, updateProfile, loading: authLoading } = useContext(AuthContext)
   const [userData, setUserData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
   })
   const [editField, setEditField] = useState(null)
   const [loading, setLoading] = useState(true)
   const [favorites, setFavorites] = useState([])
   const [loadingFavorites, setLoadingFavorites] = useState(false)

   // Load user data when component mounts
   useEffect(() => {
      if (user) {
         setUserData({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            phoneNumber: user.phoneNumber || "",
            address: user.address || "",
         })
         setLoading(false)
      }
   }, [user])

   // Fetch user's favorite vehicles
   useEffect(() => {
      const fetchFavorites = async () => {
         if (!user) return

         try {
            setLoadingFavorites(true)
            const response = await vehicleAPI.getFavorites()
            if (response.data.success) {
               setFavorites(response.data.favorites || [])
            } else {
               toast.error(response.data.message || "Failed to fetch favorites")
            }
         } catch (error) {
            console.error("Error fetching favorites:", error)
            toast.error(error.response?.data?.message || "Failed to fetch favorites")
         } finally {
            setLoadingFavorites(false)
         }
      }

      fetchFavorites()
   }, [user])

   const handleChange = (field, value) => {
      setUserData((prev) => ({ ...prev, [field]: value }))
   }

   const handleSave = async (field) => {
      try {
         const success = await updateProfile({ [field]: userData[field] })
         if (success) {
            setEditField(null)
         }
      } catch (error) {
         console.error("Error updating profile:", error)
         toast.error("Failed to update profile")
      }
   }

   const handleSaveAll = async () => {
      try {
         const success = await updateProfile(userData)
         if (success) {
            toast.success("Profile updated successfully")
         }
      } catch (error) {
         console.error("Error updating profile:", error)
         toast.error("Failed to update profile")
      }
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
               value={userData[fieldKey]}
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
                  onClick={() => handleSave(fieldKey)}
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

   if (loading || authLoading) {
      return (
         <div className="flex justify-center items-center min-h-screen">
            <p className="text-lg text-gray-600">Loading profile...</p>
         </div>
      )
   }

   if (!user) {
      return (
         <div className="flex justify-center items-center min-h-screen">
            <p className="text-lg text-gray-600">Please log in to view your profile</p>
         </div>
      )
   }

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
                           {userData.firstName} {userData.lastName}
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
                     <button
                        onClick={handleSaveAll}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
                     >
                        Save All Changes
                     </button>
                     <button
                        onClick={() => {
                           // Reset to original user data
                           if (user) {
                              setUserData({
                                 firstName: user.firstName || "",
                                 lastName: user.lastName || "",
                                 email: user.email || "",
                                 phoneNumber: user.phoneNumber || "",
                                 address: user.address || "",
                              })
                           }
                           setEditField(null)
                        }}
                        className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors duration-200"
                     >
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
                        {loadingFavorites ? "Loading..." : `${favorites.length} Cars`}
                     </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                     {loadingFavorites
                        ? "Loading your saved cars..."
                        : favorites.length > 0
                           ? `You have ${favorites.length} cars saved in your wishlist`
                           : "You haven't saved any cars yet"}
                  </p>
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
                  <p className="text-gray-600 text-sm">Last login: Today at {new Date().toLocaleTimeString()}</p>
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
