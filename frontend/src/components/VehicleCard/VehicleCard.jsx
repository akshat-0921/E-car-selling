
import { Link } from "react-router-dom"

const VehicleCard = ({ vehicle }) => {
   if (!vehicle) return null

   return (
      <Link to={`/vehicles/${vehicle._id}`} className="vehicle-card">
         {/* <div className="vehicle-image">
                <img src={vehicle.images[0] || "/placeholder.svg"} alt={vehicle.name} />
            </div> */}
         <div className="vehicle-info">
            <h3 className="vehicle-name">{vehicle.name}</h3>
            {/* <p className="vehicle-brand">{vehicle.brand?.name || "Unknown Brand"}</p> */}
            {/* <div className="vehicle-specs">
                    <span className="vehicle-range">{vehicle.range} km</span>
                    <span className="vehicle-battery">{vehicle.battery} kWh</span>
                </div> */}
            <div className="vehicle-price">
               <span className="price-label">Price:</span>
               <span className="price-value">₹{vehicle.price.toLocaleString()}</span>
            </div>
         </div>
      </Link>
   )
}

export default VehicleCard
