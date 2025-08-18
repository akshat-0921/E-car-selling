"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
   ArrowLeft,
   Calendar,
   Package,
   User,
   Car,
   Building2,
   DollarSign,
   Clock,
   CheckCircle,
   XCircle,
   Search,
   Filter,
   Loader2,
} from "lucide-react"
import { toast } from "react-toastify"
import axiosInstance from "../lib/axios"

const BookingManagement = () => {
   const [loading, setLoading] = useState(true)
   const [bookings, setBookings] = useState([])
   const [filteredBookings, setFilteredBookings] = useState([])
   const [searchTerm, setSearchTerm] = useState("")
   const [statusFilter, setStatusFilter] = useState("all")
   const [updatingStatus, setUpdatingStatus] = useState(null)
   const navigate = useNavigate()

   const bookingStatuses = [
      { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
      { value: "confirmed", label: "Confirmed", color: "bg-blue-100 text-blue-800", icon: CheckCircle },
      { value: "in_progress", label: "In Progress", color: "bg-purple-100 text-purple-800", icon: Package },
      { value: "completed", label: "Completed", color: "bg-green-100 text-green-800", icon: CheckCircle },
      { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800", icon: XCircle },
   ]

   useEffect(() => {
      loadBookings()
   }, [])

   useEffect(() => {
      filterBookings()
   }, [searchTerm, statusFilter, bookings])

   const loadBookings = async () => {
      setLoading(true)
      try {
         const res = await axiosInstance.get("/booking/admin/all")
         setBookings(res.data.bookings || [])
      } catch (error) {
         toast.error("Failed to load bookings")
      }
      setLoading(false)
   }

   const filterBookings = () => {
      let filtered = bookings

      if (searchTerm) {
         filtered = filtered.filter(
            (booking) =>
               booking.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
               booking.vehicleId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
               booking.showroomId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
               booking.payment?.razorpayOrderId?.toLowerCase().includes(searchTerm.toLowerCase()),
         )
      }

      if (statusFilter !== "all") {
         filtered = filtered.filter((booking) => booking.status === statusFilter)
      }

      setFilteredBookings(filtered)
   }

   const updateBookingStatus = async (bookingId, newStatus) => {
      setUpdatingStatus(bookingId)
      try {
         await axiosInstance.put(`/booking/admin/update-status/${bookingId}`, {
            status: newStatus,
         })
         toast.success("Booking status updated successfully")
         loadBookings()
      } catch (error) {
         toast.error(error?.response?.data?.msg || "Failed to update booking status")
      }
      setUpdatingStatus(null)
   }

   const getStatusInfo = (status) => {
      return bookingStatuses.find((s) => s.value === status) || bookingStatuses[0]
   }

   const formatCurrency = (amount) => {
      return new Intl.NumberFormat("en-IN", {
         style: "currency",
         currency: "INR",
      }).format(amount)
   }

   if (loading) {
      return (
         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="flex items-center gap-3">
               <Loader2 className="animate-spin text-blue-600" size={32} />
               <span className="text-gray-600">Loading bookings...</span>
            </div>
         </div>
      )
   }

   return (
      <div className="min-h-screen bg-gray-50 p-6">
         <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <button
                        onClick={() => navigate("/admin")}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                     >
                        <ArrowLeft size={20} />
                     </button>
                     <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                           <Calendar className="text-blue-600" />
                           Booking Management
                        </h1>
                        <p className="text-gray-600 mt-1">Manage vehicle booking orders and status updates</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                     <input
                        type="text"
                        placeholder="Search by customer, vehicle, showroom, or order ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     />
                  </div>
                  <div className="relative">
                     <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                     <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                     >
                        <option value="all">All Statuses</option>
                        {bookingStatuses.map((status) => (
                           <option key={status.value} value={status.value}>
                              {status.label}
                           </option>
                        ))}
                     </select>
                  </div>
               </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
               {bookingStatuses.map((status) => {
                  const count = bookings.filter((b) => b.status === status.value).length
                  const IconComponent = status.icon
                  return (
                     <div key={status.value} className="bg-white rounded-lg shadow-sm p-4">
                        <div className="flex items-center justify-between">
                           <div>
                              <p className="text-sm font-medium text-gray-600">{status.label}</p>
                              <p className="text-2xl font-bold text-gray-900">{count}</p>
                           </div>
                           <div
                              className={`p-2 rounded-lg ${status.color.replace("text-", "text-").replace("bg-", "bg-").replace("100", "50")}`}
                           >
                              <IconComponent size={20} />
                           </div>
                        </div>
                     </div>
                  )
               })}
            </div>

            {/* Bookings List */}
            <div className="bg-white rounded-lg shadow-sm">
               <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Bookings ({filteredBookings.length})</h2>
               </div>

               {filteredBookings.length === 0 ? (
                  <div className="p-12 text-center">
                     <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
                     <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
                     <p className="text-gray-600">
                        {searchTerm || statusFilter !== "all" ? "Try adjusting your filters" : "No bookings have been made yet"}
                     </p>
                  </div>
               ) : (
                  <div className="divide-y divide-gray-200">
                     {filteredBookings.map((booking) => {
                        const statusInfo = getStatusInfo(booking.status || "pending")
                        const StatusIcon = statusInfo.icon

                        return (
                           <div key={booking._id} className="p-6">
                              <div className="flex items-start justify-between">
                                 <div className="flex-1">
                                    {/* Booking Header */}
                                    <div className="flex items-center gap-3 mb-4">
                                       <div className="p-2 bg-blue-50 rounded-lg">
                                          <Car className="text-blue-600" size={20} />
                                       </div>
                                       <div>
                                          <h3 className="text-lg font-semibold text-gray-900">
                                             {booking.vehicleId?.name || "Unknown Vehicle"}
                                          </h3>
                                          <p className="text-gray-600 text-sm">
                                             Order ID: {booking.payment?.razorpayOrderId || booking._id}
                                          </p>
                                       </div>
                                       <div
                                          className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color} flex items-center gap-1`}
                                       >
                                          <StatusIcon size={14} />
                                          {statusInfo.label}
                                       </div>
                                    </div>

                                    {/* Booking Details Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                       <div className="flex items-center gap-2">
                                          <User className="text-gray-400" size={16} />
                                          <div>
                                             <p className="text-sm text-gray-600">Customer</p>
                                             <p className="font-medium text-gray-900">{booking.userId?.name || "Unknown Customer"}</p>
                                          </div>
                                       </div>

                                       <div className="flex items-center gap-2">
                                          <Building2 className="text-gray-400" size={16} />
                                          <div>
                                             <p className="text-sm text-gray-600">Showroom</p>
                                             <p className="font-medium text-gray-900">
                                                {booking.showroomId?.name || "Unknown Showroom"}
                                             </p>
                                          </div>
                                       </div>

                                       <div className="flex items-center gap-2">
                                          <DollarSign className="text-gray-400" size={16} />
                                          <div>
                                             <p className="text-sm text-gray-600">Total Amount</p>
                                             <p className="font-medium text-gray-900">
                                                {formatCurrency(booking.payment?.totalAmount || 0)}
                                             </p>
                                          </div>
                                       </div>

                                       <div className="flex items-center gap-2">
                                          <Package className="text-gray-400" size={16} />
                                          <div>
                                             <p className="text-sm text-gray-600">Stock Status</p>
                                             <p
                                                className={`font-medium ${booking.isVehicleInStock ? "text-green-600" : "text-orange-600"}`}
                                             >
                                                {booking.isVehicleInStock ? "In Stock" : "Out of Stock"}
                                             </p>
                                          </div>
                                       </div>
                                    </div>

                                    {/* Payment Details */}
                                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                       <h4 className="font-medium text-gray-900 mb-2">Payment Details</h4>
                                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                          <div>
                                             <span className="text-gray-600">Advance Paid:</span>
                                             <p className="font-medium text-green-600">
                                                {formatCurrency(booking.payment?.advancePayment || 0)}
                                             </p>
                                          </div>
                                          <div>
                                             <span className="text-gray-600">Pending:</span>
                                             <p className="font-medium text-orange-600">
                                                {formatCurrency(booking.payment?.pendingPayment || 0)}
                                             </p>
                                          </div>
                                          <div>
                                             <span className="text-gray-600">Payment Status:</span>
                                             <p className="font-medium text-gray-900">{booking.payment?.paymentStatus || "Unknown"}</p>
                                          </div>
                                       </div>
                                    </div>

                                    {/* User Notes */}
                                    {booking.userNotes && (
                                       <div className="bg-blue-50 rounded-lg p-4">
                                          <h4 className="font-medium text-gray-900 mb-2">Customer Notes</h4>
                                          <p className="text-gray-700 text-sm">{booking.userNotes}</p>
                                       </div>
                                    )}
                                 </div>

                                 {/* Status Update Actions */}
                                 <div className="ml-6">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                       <h4 className="font-medium text-gray-900 mb-3">Update Status</h4>
                                       <div className="space-y-2">
                                          {bookingStatuses.map((status) => {
                                             const StatusIcon = status.icon
                                             const isCurrentStatus = (booking.status || "pending") === status.value
                                             const isUpdating = updatingStatus === booking._id

                                             return (
                                                <button
                                                   key={status.value}
                                                   onClick={() => updateBookingStatus(booking._id, status.value)}
                                                   disabled={isCurrentStatus || isUpdating}
                                                   className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isCurrentStatus
                                                         ? `${status.color} cursor-not-allowed`
                                                         : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                                                      }`}
                                                >
                                                   {isUpdating ? (
                                                      <Loader2 className="animate-spin" size={14} />
                                                   ) : (
                                                      <StatusIcon size={14} />
                                                   )}
                                                   {status.label}
                                                   {isCurrentStatus && <span className="ml-auto text-xs">(Current)</span>}
                                                </button>
                                             )
                                          })}
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        )
                     })}
                  </div>
               )}
            </div>
         </div>
      </div>
   )
}

export default BookingManagement
