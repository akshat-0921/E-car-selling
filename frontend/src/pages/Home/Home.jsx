import { useEffect } from "react"
import { Link } from "react-router-dom"
// import { useGetAllBrandsQuery } from "../../redux/api/brandApi"
// import { useGetAllVehiclesQuery } from "../../redux/api/vehicleApi"
// import { useSelector } from "react-redux"
// import { selectAllBrands, selectBrandsLoading, selectBrandsError } from "../../redux/slices/brandSlice"
// import { selectAllVehicles, selectVehiclesLoading, selectVehiclesError } from "../../redux/slices/vehicleSlice"
import BrandCard from "../../components/BrandCard/BrandCard"
import VehicleCard from "../../components/VehicleCard/VehicleCard"

const Home = () => {
    const { refetch: refetchBrands } = useGetAllBrandsQuery()
    const { refetch: refetchVehicles } = useGetAllVehiclesQuery()

    const brands = useSelector(selectAllBrands)
    const vehicles = useSelector(selectAllVehicles)
    const brandsLoading = useSelector(selectBrandsLoading)
    const vehiclesLoading = useSelector(selectVehiclesLoading)
    const brandsError = useSelector(selectBrandsError)
    const vehiclesError = useSelector(selectVehiclesError)

    useEffect(() => {
        refetchBrands()
        refetchVehicles()
    }, [refetchBrands, refetchVehicles])

    const featuredBrands = brands.slice(0, 4)

    const featuredVehicles = vehicles.slice(0, 6)

    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Find Your Dream Electric Car</h1>
                    <p>Explore the future of mobility with our premium selection of electric vehicles</p>
                    <div className="hero-buttons">
                        <Link to="/vehicles" className="primary-btn">
                            Explore Vehicles
                        </Link>
                        <Link to="/brands" className="secondary-btn">
                            View Brands
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Brands Section */}
            <section className="featured-brands-section">
                <div className="section-header">
                    <h2>Featured Brands</h2>
                    <Link to="/brands" className="view-all-link">
                        View All
                    </Link>
                </div>

                {brandsLoading ? (
                    <Loader />
                ) : brandsError ? (
                    <ErrorMessage message={brandsError} />
                ) : (
                    <div className="brands-grid">
                        {featuredBrands.map((brand) => (
                            <BrandCard key={brand._id} brand={brand} />
                        ))}
                    </div>
                )}
            </section>

            {/* Featured Vehicles Section */}
            <section className="featured-vehicles-section">
                <div className="section-header">
                    <h2>Featured Vehicles</h2>
                    <Link to="/vehicles" className="view-all-link">
                        View All
                    </Link>
                </div>

                {vehiclesLoading ? (
                    <Loader />
                ) : vehiclesError ? (
                    <ErrorMessage message={vehiclesError} />
                ) : (
                    <div className="vehicles-grid">
                        {featuredVehicles.map((vehicle) => (
                            <VehicleCard key={vehicle._id} vehicle={vehicle} />
                        ))}
                    </div>
                )}
            </section>

            {/* Why Choose Us Section */}
            <section className="why-choose-section">
                <h2>Why Choose E-Car?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🔋</div>
                        <h3>100% Electric</h3>
                        <p>All our vehicles are fully electric, helping you reduce your carbon footprint.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">💰</div>
                        <h3>Best Prices</h3>
                        <p>We offer competitive prices and special deals on premium electric vehicles.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🛠️</div>
                        <h3>Expert Support</h3>
                        <p>Our team of experts is always ready to assist you with any questions.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🔄</div>
                        <h3>Easy Financing</h3>
                        <p>Flexible financing options to make your dream car affordable.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
