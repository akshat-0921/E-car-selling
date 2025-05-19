import React from "react"

const TestDriveCard = ({ testDrive }) => {
    const {
        vehicleName,
        brand,
        image,
        showroom,
        date,
        time,
        bookingId,
    } = testDrive

    return (
        <div className="flex flex-col sm:flex-row bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all">
            <div className="sm:w-1/3 w-full h-48 sm:h-auto">
                <img
                    src={image}
                    alt={`${vehicleName}`}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex flex-col justify-between p-4 sm:w-2/3">
                <div>
                    <h2 className="text-xl font-semibold text-slate-800">{vehicleName}</h2>
                    <p className="text-slate-600">Brand: {brand}</p>
                    <p className="text-slate-600">Showroom: {showroom}</p>
                    <p className="text-slate-600">Date: {date}</p>
                    <p className="text-slate-600">Time: {time}</p>
                    <p className="text-slate-500 text-sm mt-2">Booking ID: {bookingId}</p>
                </div>

                <div className="mt-4 flex gap-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                        Reschedule
                    </button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
                        Cancel Booking
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TestDriveCard
