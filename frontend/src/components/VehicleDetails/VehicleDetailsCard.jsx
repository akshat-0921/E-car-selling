
import { useState } from "react"
import { Link } from "react-router-dom"

const VehicleDetailsCard = ({ vehicle, brand, onPurchase, isPurchasing }) => {
   const [activeImageIndex, setActiveImageIndex] = useState(0)

   if (!vehicle) return null

   return (
      <div className="vehicle-details-card">
         <div className="vehicle-gallery">
            <div className="main-image">
               <img src={vehicle.images[activeImageIndex] || "/placeholder.svg"} alt={vehicle.name} />
            </div>
            <div className="image-thumbnails">
               {vehicle.images.map((image, index) => (
                  <div
                     key={index}
                     className={`thumbnail ${index === activeImageIndex ? "active" : ""}`}
                     onClick={() => setActiveImageIndex(index)}
                  >
                     <img src={image || "/placeholder.svg"} alt={`${vehicle.name} view ${index + 1}`} />
                  </div>
               ))}
            </div>
         </div>

         <div className="vehicle-info">
            <div className="vehicle-header">
               <h1 className="vehicle-name">{vehicle.name}</h1>
               {brand && (
                  <Link to={`/brands/${brand._id}`} className="vehicle-brand">
                     {brand.name}
                  </Link>
               )}
            </div>

            <div className="vehicle-price-section">
               <span className="price-label">Price:</span>
               <span className="price-value">₹{vehicle.price.toLocaleString()}</span>
            </div>

            <div className="vehicle-description">
               <p>{vehicle.description}</p>
            </div>

            <div className="key-features">
               <h3>Key Features</h3>
               <ul>
                  <li>Range: {vehicle.range} km</li>
                  <li>Battery: {vehicle.battery} kWh</li>
                  <li>Charging Time: {vehicle.chargingTime} hours</li>
                  <li>Top Speed: {vehicle.topSpeed} km/h</li>
               </ul>
            </div>

            <div className="vehicle-actions">
               <button className="purchase-btn" onClick={onPurchase} disabled={isPurchasing}>
                  {isPurchasing ? "Processing..." : "Purchase Now"}
               </button>
               <button className="test-drive-btn">Book Test Drive</button>
            </div>
         </div>
      </div>
   )
}

export default VehicleDetailsCard
