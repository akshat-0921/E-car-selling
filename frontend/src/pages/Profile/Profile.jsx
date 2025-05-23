import { useState, useEffect } from "react";
import {
   FaUser,
   FaEdit,
   FaCheck,
   FaEnvelope,
   FaPhone,
   FaMapMarkerAlt,
   FaIdCard,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setLoading, setError, updateUser } from "../../redux/authSlice.js";

const Profile = () => {
   const dispatch = useDispatch();
   const API = import.meta.env.VITE_BACKEND_URL;

   // Select user & state from auth slice
   const userFromStore = useSelector((state) => state.auth.user);
   const loading = useSelector((state) => state.auth.loading);
   const error = useSelector((state) => state.auth.error);

   // Local user state for form editing
   const [user, setUserLocal] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
   });

   const [editField, setEditField] = useState(null);

   // Sync local state with redux user whenever redux user changes
   useEffect(() => {
      if (userFromStore) {
         setUserLocal(userFromStore);
      }
   }, [userFromStore]);

   const handleChange = (field, value) => {
      setUserLocal((prev) => ({ ...prev, [field]: value }));
   };

   const handleSave = async () => {
      if (!editField) return;

      dispatch(setLoading(true));
      dispatch(setError(null));
      try {
         // PUT updated user data to backend
         const { data } = await axios.put(`${API}/user/update`, user, {
            withCredentials: true,
         });

         // Update redux user state with fresh data from backend
         dispatch(updateUser(data.user));

         // Also update local state to reflect UI changes immediately
         setUserLocal(data.user);

         setEditField(null);
      } catch (err) {
         dispatch(setError(err.response?.data?.message || err.message));
      } finally {
         dispatch(setLoading(false));
      }
   };

   const renderField = (label, fieldKey, icon) => (
      <div className="mb-6">
         <label className="text-gray-700 text-sm font-medium block mb-2 flex items-center">
            {icon}
            <span className="ml-2">{label}</span>
         </label>
         <div className="flex items-center space-x-2 group relative">
            <input
               type="text"
               value={user[fieldKey] || ""}
               readOnly={editField !== fieldKey}
               onChange={(e) => handleChange(fieldKey, e.target.value)}
               className={`w-full border rounded-lg px-4 py-3 text-gray-700 focus:outline-none transition-all duration-200 ${editField === fieldKey
                     ? "border-indigo-500 shadow-sm focus:ring-2 focus:ring-indigo-200"
                     : "border-gray-200 bg-gray-50"
                  }`}
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
   );

   if (!userFromStore) {
      return (
         <div className="p-4 text-center text-red-600">
            User not logged in. Please login to view profile.
         </div>
      );
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
                           {user.firstName} {user.lastName}
                        </h2>
                        <p className="text-indigo-200 mt-1">Premium Member</p>
                     </div>
                  </div>
               </div>

               {/* Profile Content */}
               <div className="px-8 py-8">
                  <div className="mb-8">
                     <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        Profile Information
                     </h3>
                     <p className="text-sm text-gray-500">
                        Click on any field to edit your profile information
                     </p>
                  </div>

                  <div className="space-y-2">
                     {renderField("First Name", "firstName", <FaIdCard className="text-indigo-500" />)}
                     {renderField("Last Name", "lastName", <FaIdCard className="text-indigo-500" />)}
                     {renderField("Email", "email", <FaEnvelope className="text-indigo-500" />)}
                     {renderField("Phone Number", "phoneNumber", <FaPhone className="text-indigo-500" />)}
                     {renderField("Address", "address", <FaMapMarkerAlt className="text-indigo-500" />)}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Profile;
