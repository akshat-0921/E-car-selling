
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { testDriveAPI, vehicleAPI } from "../../api"

const TestDriveCard = () => {
   const [vehicles, setVehicles] = useState([])
   const [loading, setLoading] = useState(true)
   const [formData, setFormData] = useState({
      vehicleName: "",
      brand: "",
      showroom: "",
      date: "",
      time: "",
   })
   const [submitting, setSubmitting] = useState(false)
   const [bookingComplete, setBookingComplete] = useState(false)
   const [bookingId, setBookingId] = useState("")

   // Fetch available vehicles for test drive
   useEffect(() => {
      const fetchVehicles = async () => {
         try {
            const response = await vehicleAPI.getAllVehicles({ testDriveAvailable: true })
            if (response.data.success) {
               setVehicles(response.data.vehicles || [])
            } else {
               toast.error(response.data.message || "Failed to fetch vehicles")
            }
         } catch (error) {
            console.error("Error fetching vehicles:", error)
            toast.error(error.response?.data?.message || "Failed to fetch vehicles")
         } finally {
            setLoading(false)
         }
      }

      fetchVehicles()
   }, [])

   const handleChange = (e) => {
      const { name, value } = e.target
      setFormData({
         ...formData,
         [name]: value,
      })

      // If vehicle is selected, auto-fill the brand
      if (name === "vehicleName") {
         const selectedVehicle = vehicles.find((v) => v._id === value || v.name === value)
         if (selectedVehicle) {
            const brandName = typeof selectedVehicle.brand === "object" ? selectedVehicle.brand.name : selectedVehicle.brand

            setFormData((prev) => ({
               ...prev,
               brand: brandName,
            }))
         }
      }
   }

   const handleSubmit = async (e) => {
      e.preventDefault()

      // Validate form
      if (!formData.vehicleName || !formData.showroom || !formData.date || !formData.time) {
         toast.error("Please fill in all required fields")
         return
      }

      try {
         setSubmitting(true)
         const response = await testDriveAPI.bookTestDrive(formData)

         if (response.data.success) {
            setBookingId(response.data.bookingId)
            setBookingComplete(true)
            toast.success("Test drive booked successfully!")
         } else {
            toast.error(response.data.message || "Failed to book test drive")
         }
      } catch (error) {
         console.error("Error booking test drive:", error)
         toast.error(error.response?.data?.message || "Failed to book test drive")
      } finally {
         setSubmitting(false)
      }
   }

   if (loading) {
      return <div className="text-center p-4">Loading available vehicles...</div>
   }

   if (bookingComplete) {
      return (
         <div className="flex flex-col sm:flex-row bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <div className="sm:w-1/3 w-full h-48 sm:h-auto bg-green-50 flex items-center justify-center">
               <div className="text-green-500 text-5xl">✓</div>
            </div>

            <div className="flex flex-col justify-between p-4 sm:w-2/3">
               <div>
                  <h2 className="text-xl font-semibold text-slate-800">Test Drive Booked!</h2>
                  <p className="text-slate-600">Vehicle: {formData.vehicleName}</p>
                  <p className="text-slate-600">Brand: {formData.brand}</p>
                  <p className="text-slate-600">Showroom: {formData.showroom}</p>
                  <p className="text-slate-600">Date: {formData.date}</p>
                  <p className="text-slate-600">Time: {formData.time}</p>
                  <p className="text-slate-500 text-sm mt-2">Booking ID: {bookingId}</p>
               </div>

               <div className="mt-4 flex gap-3">
                  <button
                     className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                     onClick={() => {
                        setBookingComplete(false)
                        setFormData({
                           vehicleName: "",
                           brand: "",
                           showroom: "",
                           date: "",
                           time: "",
                        })
                     }}
                  >
                     Book Another
                  </button>
               </div>
            </div>
         </div>
      )
   }

   return (
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 p-6">
         <h2 className="text-xl font-semibold text-slate-800 mb-4">Book a Test Drive</h2>

         <div className="space-y-4">
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Select Vehicle</label>
               <select
                  name="vehicleName"
                  value={formData.vehicleName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
               >
                  <option value="">Select a vehicle</option>
                  {vehicles.map((vehicle) => (
                     <option key={vehicle._id || vehicle.name} value={vehicle.name}>
                        {vehicle.brand && typeof vehicle.brand === "object" ? vehicle.brand.name : vehicle.brand} {vehicle.name}
                     </option>
                  ))}
               </select>
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
               <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  readOnly
                  className="w-full border border-gray-300 rounded-md p-2 bg-gray-50"
               />
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Showroom</label>
               <input
                  type="text"
                  name="showroom"
                  value={formData.showroom}
                  onChange={handleChange}
                  placeholder="Enter showroom name"
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
               />
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
               <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  min={new Date().toISOString().split("T")[0]} // Set min date to today
                  required
               />
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
               <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
               >
                  <option value="">Select a time slot</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
               </select>
            </div>
         </div>

         <div className="mt-6">
            <button
               type="submit"
               className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
               disabled={submitting}
            >
               {submitting ? "Booking..." : "Book Test Drive"}
            </button>
         </div>
      </form>
   )
}

export default TestDriveCard
