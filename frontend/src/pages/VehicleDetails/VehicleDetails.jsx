import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
// import { useSelector, useDispatch } from "react-redux"
// import { useGetVehicleByIdQuery } from "../../redux/api/vehicleApi"
// import { selectSelectedVehicle, selectVehiclesLoading, selectVehiclesError } from "../../redux/slices/vehicleSlice"
// import { selectSelectedBrand } from "../../redux/slices/brandSlice"
// import { usePurchaseVehicleMutation } from "../../redux/api/vehicleApi"
// import { selectIsAuthenticated } from "../../redux/slices/authSlice"
import VehicleDetailsCard from "../../components/VehicleDetails/VehicleDetailsCard"

const VehicleDetails = () => {
   const { id } = useParams()
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const vehicle = useSelector(selectSelectedVehicle)
   const brand = useSelector(selectSelectedBrand)
   const isLoading = useSelector(selectVehiclesLoading)
   const error = useSelector(selectVehiclesError)
   const isAuthenticated = useSelector(selectIsAuthenticated)

   const { refetch: refetchVehicle } = useGetVehicleByIdQuery(id)
   const [purchaseVehicle, { isLoading: isPurchasing }] = usePurchaseVehicleMutation()

   useEffect(() => {
      refetchVehicle()

      if (vehicle?.brand) {
      }
   }, [id, refetchVehicle, vehicle?.brand])

   const handlePurchase = async () => {
      if (!isAuthenticated) {
         navigate("/login")
         return
      }

      try {
         navigate(`/payment/${id}`)
      } catch (error) {
         console.error("Error initiating purchase:", error)
      }
   }

   if (isLoading) {
      return <Loader />
   }

   if (error) {
      return <ErrorMessage message={error} />
   }

   if (!vehicle) {
      return <ErrorMessage message="Vehicle not found" />
   }

   return (
      <div className="vehicle-details-page">
         <div className="vehicle-details-container">
            <VehicleDetailsCard vehicle={vehicle} brand={brand} onPurchase={handlePurchase} isPurchasing={isPurchasing} />

            {/* Additional sections like specifications, features, etc. */}
            <div className="vehicle-specs-section">
               <h2>Specifications</h2>
               <div className="specs-grid">
                  <div className="spec-item">
                     <span className="spec-label">Range</span>
                     <span className="spec-value">{vehicle.range} km</span>
                  </div>
                  <div className="spec-item">
                     <span className="spec-label">Battery</span>
                     <span className="spec-value">{vehicle.battery} kWh</span>
                  </div>
                  <div className="spec-item">
                     <span className="spec-label">Charging Time</span>
                     <span className="spec-value">{vehicle.chargingTime} hours</span>
                  </div>
                  <div className="spec-item">
                     <span className="spec-label">Top Speed</span>
                     <span className="spec-value">{vehicle.topSpeed} km/h</span>
                  </div>
                  <div className="spec-item">
                     <span className="spec-label">Acceleration</span>
                     <span className="spec-value">{vehicle.acceleration} sec (0-100 km/h)</span>
                  </div>
                  <div className="spec-item">
                     <span className="spec-label">Seating Capacity</span>
                     <span className="spec-value">{vehicle.seatingCapacity} persons</span>
                  </div>
               </div>
            </div>

         </div>
      </div>
   )
}

export default VehicleDetails
