// In src/pages/BookingHistoryPage.jsx

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBookingHistory } from '../../redux/bookingslice';
import { Loader, ServerCrash, Car, Building, Calendar, BadgeCheck, Tag } from 'lucide-react';
import { format } from 'date-fns'; // A great library for date formatting: npm install date-fns

// Helper Components for different states
const LoadingState = () => (
    <div className="text-center py-20">
        <Loader className="mx-auto h-12 w-12 text-blue-500 animate-spin" />
        <p className="mt-4 text-slate-500">Loading your bookings...</p>
    </div>
);

const ErrorState = ({ error }) => (
    <div className="text-center py-20">
        <ServerCrash className="mx-auto h-12 w-12 text-red-500" />
        <p className="mt-4 font-semibold text-red-600">Failed to load bookings</p>
        <p className="text-slate-500">{error}</p>
    </div>
);

const EmptyState = () => (
    <div className="text-center py-20">
        <Car className="mx-auto h-12 w-12 text-slate-400" />
        <h3 className="mt-4 text-lg font-semibold text-slate-800 dark:text-white">No Bookings Yet</h3>
        <p className="mt-2 text-slate-500">Your vehicle purchases and bookings will appear here.</p>
    </div>
);

// Main Component
export default function BookingHistoryPage() {
    const dispatch = useDispatch();
    const { history, historyLoading, historyError } = useSelector((state) => state.booking);

    useEffect(() => {
        dispatch(fetchBookingHistory());
    }, [dispatch]);

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-8">
                    My Booking History
                </h1>

                {historyLoading ? (
                    <LoadingState />
                ) : historyError ? (
                    <ErrorState error={historyError} />
                ) : history.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="space-y-6">
                        {history.map((booking) => (
                            <BookingCard key={booking._id} booking={booking} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// Sub-component for displaying a single booking
const BookingCard = ({ booking }) => {
    const { vehicleId: vehicle, showroomId: showroom, bookingStatus, payment, createdAt } = booking;

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                    {/* Vehicle Image */}
                    <div className="flex-shrink-0">
                        <img
                            src={vehicle?.image || '/placeholder.jpg'}
                            alt={vehicle?.name || 'Vehicle'}
                            className="w-full sm:w-48 h-32 object-cover rounded-lg"
                        />
                    </div>
                    {/* Booking Details */}
                    <div className="flex-grow">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{vehicle?.name}</h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Booked on {format(new Date(createdAt), 'PPP')}
                                </p>
                            </div>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${bookingStatus === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                {bookingStatus}
                            </span>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 space-y-3 text-sm">
                            <DetailItem icon={Car} label="Price" value={`₹${vehicle?.price?.toLocaleString()}`} />
                            <DetailItem icon={Building} label="Showroom" value={`${showroom?.name}, ${showroom?.city}`} />
                            <DetailItem icon={Tag} label="Order ID" value={payment?.razorpayOrderId} />
                            <DetailItem icon={BadgeCheck} label="Payment Status" value={payment?.paymentStatus} className="capitalize" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailItem = ({ icon: Icon, label, value, className = '' }) => (
    <div className="flex items-center justify-between">
        <dt className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <Icon size={16} />
            <span>{label}</span>
        </dt>
        <dd className={`font-medium text-slate-700 dark:text-slate-200 ${className}`}>{value || 'N/A'}</dd>
    </div>
);
