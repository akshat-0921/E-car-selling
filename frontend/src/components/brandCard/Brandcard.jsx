import { Link } from "react-router-dom"

const BrandCard = ({ brand }) => {
    if (!brand) return null

    return (
        <Link to={`/brands/${brand._id}`} className="brand-card">
            <div className="brand-logo">
                <img src={brand.logo || "/placeholder.svg"} alt={`${brand.name} logo`} />
            </div>
            <div className="brand-info">
                <h3 className="brand-name">{brand.name}</h3>
                <p className="brand-origin">{brand.origin}</p>
                <p className="brand-vehicles-count">{brand.vehicleCount || 0} vehicles</p>
            </div>
        </Link>
    )
}

export default BrandCard
