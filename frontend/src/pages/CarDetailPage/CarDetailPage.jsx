import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CarDetail from "../../components/CarModel/CarDetails"
import { vehicleAPI } from "../../api"
import { toast } from "react-toastify"

const CarDetailPage = () => {
    const { vehicleId } = useParams()
    const [car, setCar] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                setLoading(true)

                // If vehicleId is provided in URL, use it, otherwise fetch a featured car
                if (vehicleId) {
                    const response = await vehicleAPI.getVehicleById(vehicleId)
                    if (response.data.success) {
                        setCar(response.data.vehicle)
                    } else {
                        toast.error(response.data.message || "Failed to fetch car details")
                    }
                } else {
                    // Fetch a featured car if no ID is provided
                    const response = await vehicleAPI.getAllVehicles({ featured: true, limit: 1 })
                    if (response.data.success && response.data.vehicles.length > 0) {
                        setCar(response.data.vehicles[0])
                    } else {
                        toast.error("No featured cars available")
                    }
                }
            } catch (error) {
                console.error("Error fetching car data:", error)
                toast.error(error.response?.data?.message || "Failed to fetch car details")
            } finally {
                setLoading(false)
            }
        }

        fetchCarData()
    }, [vehicleId])

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-gray-500">Loading car details...</p>
                    </div>
                ) : car ? (
                    <CarDetail car={car} />
                ) : (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-gray-500">Car details not found</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CarDetailPage
