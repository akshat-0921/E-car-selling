import { useState } from "react"

const Profile = () => {
   const [user, setUser] = useState({
      firstName: "John",
      lastName: "Doe",
      email: "john@gmail.com",
      phoneNumber: "9912343695",
      address: "NYX"
   })

   const [editField, setEditField] = useState(null)

   const handleChange = (field, value) => {
      setUser((prev) => ({ ...prev, [field]: value }))
   }

   const handleSave = () => {
      setEditField(null)
   }

   const renderField = (label, fieldKey) => {
      return (
         <div className="mb-4">
            <label className="text-gray-600">{label}</label>
            <div className="flex">
               <input
                  type="text"
                  value={user[fieldKey]}
                  readOnly={editField !== fieldKey}
                  onChange={(e) => handleChange(fieldKey, e.target.value)}
                  className={`flex-1 border rounded px-3 py-2 text-sm focus:outline-none
                  ${editField === fieldKey ?
                        "border-blue-500 focus:ring-2 focus:ring-blue-500"
                        :
                        "border-gray-300 bg-gray-100"
                     }
               `}
               />
               {editField === fieldKey ?
                  (<button
                     onClick={handleSave}
                     className="px-2 text-green-600 text-sm hover:underline">Save
                  </button>)
                  :
                  (<button
                     onClick={() => setEditField(fieldKey)}
                     className="px-2 text-blue-500 text-sm hover:underline"
                  >
                     Edit
                  </button>)
               }
            </div>
         </div>
      )
   }


   return (

      <div className="bg-gray-700 min-h-screen py-10">
         <div className="max-w-md mx-auto mt-15 p-5 bg-gray-200 shadow-md rounded-xl">
            <h2 className="mt-4 flex justify-center text-xl text-gray-700 bold">User Profile</h2>
            {renderField("First Name", "firstName")}
            {renderField("Last Name", "lastName")}
            {renderField("Email", "email")}
            {renderField("Phone Number", "phoneNumber")}
            {renderField("Address", "address")}
         </div>
      </div>
   )
}

export default Profile
