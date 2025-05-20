import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
// import { useGetAllVehiclesQuery } from "../../redux/api/vehicleApi"
// import { useSelector } from "react-redux"
// import { selectAllVehicles, selectVehiclesLoading, selectVehiclesError } from "../../redux/slices/vehicleSlice"
import VehicleCard from "../../components/VehicleCard/VehicleCard"
import SearchBar from "../../components/Search/SearchBar.jsx"
import VehicleFilters from "../../components/filter/Filter"

const Vehicles = () => {
   const location = useLocation()
   const [currentPage, setCurrentPage] = useState(1)
   const [searchParams, setSearchParams] = useState({})

   // Get data from Redux store
   const vehicles = useSelector(selectAllVehicles)
   const isLoading = useSelector(selectVehiclesLoading)
   const error = useSelector(selectVehiclesError)

   // Parse query params
   useEffect(() => {
      const params = new URLSearchParams(location.search)

      const newParams = {
         page: params.get("page") || 1,
         search: params.get("q") || "",
         brand: params.get("brand") || "",
         minPrice: params.get("minPrice") || "",
         maxPrice: params.get("maxPrice") || "",
         fuelType: params.get("fuelType") || "",
         transmission: params.get("transmission") || "",
         sort: params.get("sort") || "newest",
      }

      setSearchParams(newParams)
      setCurrentPage(Number(newParams.page))
   }, [location.search])

   // Fetch vehicles with current params
   const { refetch } = useGetAllVehiclesQuery({
      page: currentPage,
      limit: 12,
      search: searchParams.search,
      brand: searchParams.brand,
      minPrice: searchParams.minPrice,
      maxPrice: searchParams.maxPrice,
      fuelType: searchParams.fuelType,
      transmission: searchParams.transmission,
      sort: searchParams.sort,
   })

   // Refetch when params change
   useEffect(() => {
      refetch()
   }, [searchParams, refetch])

   // Handle search
   const handleSearch = (searchTerm) => {
      // Search is handled by the SearchBar component which updates the URL
      console.log("Searching for:", searchTerm)
   }

   // Handle filter
   const handleFilter = (filters) => {
      // Filtering is handled by the VehicleFilters component which updates the URL
      console.log("Applying filters:", filters)
   }

   // Handle page change
   const handlePageChange = (page) => {
      const params = new URLSearchParams(location.search)
      params.set("page", page)

      // Update URL with new page
      window.history.pushState({}, "", `${location.pathname}?${params.toString()}`)

      setCurrentPage(page)
   }

   // Calculate total pages (assuming backend returns total count)
   const totalPages = 10 // This should come from the API response

   return (
      <div className="vehicles-page">
         <div className="vehicles-header">
            <h1>Browse Vehicles</h1>
            <SearchBar onSearch={handleSearch} placeholder="Search vehicles..." initialValue={searchParams.search} />
         </div>

         <div className="vehicles-content">
            <aside className="vehicles-sidebar">
               <VehicleFilters onFilter={handleFilter} />
            </aside>

            <div className="vehicles-main">
               {isLoading ? (
                  <Loader />
               ) : error ? (
                  <ErrorMessage message={error} />
               ) : vehicles.length === 0 ? (
                  <div className="no-vehicles">
                     <p>No vehicles found matching your criteria.</p>
                  </div>
               ) : (
                  <>
                     <div className="vehicles-grid">
                        {vehicles.map((vehicle) => (
                           <VehicleCard key={vehicle._id} vehicle={vehicle} />
                        ))}
                     </div>

                     <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                  </>
               )}
            </div>
         </div>
      </div>
   )
}

export default Vehicles
