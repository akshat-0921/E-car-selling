import { useEffect, useState } from "react";
import { showroomAPI } from "../../api";
import { toast } from "react-toastify";
import { MapPin, Star, Phone } from "lucide-react";

const NearbyShowrooms = () => {
    const [nearby, setNearby] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;
                try {
                    const { data } = await showroomAPI.getNearbyShowrooms({
                        lat: latitude,
                        lon: longitude,
                        radius: 10, // km
                    });

                    if (data.success) {
                        setNearby(data.showrooms);
                    } else {
                        toast.warn(data.msg);
                    }
                } catch (err) {
                    toast.error("Failed to fetch nearby showrooms");
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            },
            (err) => {
                toast.error("Location access denied");
                setLoading(false);
            }
        );
    }, []);

    if (loading) return <div className="text-center py-6">Loading nearby showrooms...</div>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Nearby Showrooms</h2>
            {nearby.length === 0 ? (
                <p className="text-gray-500">No nearby showrooms found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {nearby.map((s) => (
                        <div key={s._id} className="p-4 bg-white shadow rounded space-y-2">
                            <h3 className="text-lg font-bold">{s.name}</h3>
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {s.address}, {s.city}, {s.state} – {s.zipCode}
                            </p>
                            <p className="text-sm text-yellow-600 flex items-center gap-1">
                                <Star className="w-4 h-4" /> Rating: {s.rating || "N/A"}
                            </p>
                            <p className="text-sm text-blue-600 flex items-center gap-1">
                                <Phone className="w-4 h-4" /> {s.contactNumber}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NearbyShowrooms;
