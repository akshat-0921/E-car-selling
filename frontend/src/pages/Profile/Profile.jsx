import { useState } from "react";

const Profile = () => {
   const [user, setUser] = useState({
      firstName: "John",
      lastName: "Doe",
      email: "john@gmail.com",
      phoneNumber: "9912343695",
      address: "NYX",
   });

   const [editField, setEditField] = useState(null);

   const handleChange = (field, value) => {
      setUser((prev) => ({ ...prev, [field]: value }));
   };

   const handleSave = () => {
      setEditField(null);
      // Optionally send `user` to backend here
   };

   // Option 1: Using Unicode symbols instead of SVGs
   const renderField = (label, fieldKey) => (
      <div className="mb-5">
         <label className="text-gray-700 text-sm font-medium block mb-1.5">
            {label}
         </label>
         <div className="flex items-center space-x-2 group">
            <input
               type="text"
               value={user[fieldKey]}
               readOnly={editField !== fieldKey}
               onChange={(e) => handleChange(fieldKey, e.target.value)}
               className={`
            flex-1 border rounded-md px-3 py-2.5 text-sm focus:outline-none transition-all duration-200
            ${editField === fieldKey
                     ? "border-blue-500 shadow-sm focus:ring-2 focus:ring-blue-200"
                     : "border-gray-200 bg-gray-50"
                  }
          `}
            />
            {editField === fieldKey ? (
               <button
                  onClick={handleSave}
                  className="flex items-center justify-center h-9 w-9 rounded-md text-white bg-green-500 hover:bg-green-600 transition-colors"
                  aria-label="Save"
               >
                  ✓
               </button>
            ) : (
               <button
                  onClick={() => setEditField(fieldKey)}
                  className="flex items-center justify-center h-9 w-9 rounded-md text-gray-400 hover:text-blue-500 hover:bg-blue-50 opacity-0 group-hover:opacity-100 transition-all duration-200"
                  aria-label="Edit"
               >
                  ✎
               </button>
            )}
         </div>
      </div>
   );

   return (
      <div className="bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen py-12 px-4">
         <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Profile Header */}
            <div className="bg-white px-6 py-6 border-b border-gray-200">
               <h2 className="text-xl font-bold text-gray-800 text-center">
                  User Profile
               </h2>
               <p className="text-center text-gray-500 text-sm mt-1">
                  Manage your personal information
               </p>
            </div>

            {/* Profile Content */}
            <div className="px-6 py-6">
               <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-500">
                     Profile Information
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                     Click on any field to edit your profile information
                  </p>
               </div>

               {renderField("First Name", "firstName")}
               {renderField("Last Name", "lastName")}
               {renderField("Email", "email")}
               {renderField("Phone Number", "phoneNumber")}
               {renderField("Address", "address")}

               <div className="mt-8">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-md font-medium transition-colors duration-200">
                     Save All Changes
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Profile;
