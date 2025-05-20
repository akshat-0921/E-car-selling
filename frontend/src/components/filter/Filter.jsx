import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
// import { useGetAllBrandsQuery } from "../../redux/api/brandApi"

const VehicleFilters = ({ onFilter }) => {
   const navigate = useNavigate()
   const location = useLocation()
   const { data: brandsData } = useGetAllBrandsQuery()

   // Initialize filters from URL params
   const [filters, setFilters] = useState({
      brand: "",
      minPrice: "",
      maxPrice: "",
      fuelType: "",
      transmission: "",
      sort: "newest",
   })

   // Update filters when URL changes
   useEffect(() => {
      const params = new URLSearchParams(location.search)

      setFilters({
         brand: params.get("brand") || "",
         minPrice: params.get("minPrice") || "",
         maxPrice: params.get("maxPrice") || "",
         fuelType: params.get("fuelType") || "",
         transmission: params.get("transmission") || "",
         sort: params.get("sort") || "newest",
      })
   }, [location.search])

   // Handle filter change
   const handleFilterChange = (e) => {
      const { name, value } = e.target

      setFilters({
         ...filters,
         [name]: value,
      })
   }

   // Apply filters
   const applyFilters = () => {
      const params = new URLSearchParams(location.search)

      // Update or remove params based on filter values
      Object.entries(filters).forEach(([key, value]) => {
         if (value) {
            params.set(key, value)
         } else {
            params.delete(key)
         }
      })

      // Keep search query if it exists
      const searchQuery = params.get("q")
      if (searchQuery) {
         params.set("q", searchQuery)
      }

      // Navigate to the same page with updated query params
      navigate(`${location.pathname}?${params.toString()}`)

      // Call the callback
      if (onFilter) {
         onFilter(filters)
      }
   }

   // Reset filters
   const resetFilters = () => {
      // Keep only search query if it exists
      const params = new URLSearchParams()
      const searchQuery = new URLSearchParams(location.search).get("q")

      if (searchQuery) {
         params.set("q", searchQuery)
      }

      // Reset filters state
      setFilters({
         brand: "",
         minPrice: "",
         maxPrice: "",
         fuelType: "",
         transmission: "",
         sort: "newest",
      })

      // Navigate to the same page with only search query
      navigate(`${location.pathname}?${params.toString()}`)

      // Call the callback
      if (onFilter) {
         onFilter({})
      }
   }

   return (
      <div className="vehicle-filters">
         <h3>Filter Vehicles</h3>

         <div className="filter-group">
            <label htmlFor="brand">Brand</label>
            <select id="brand" name="brand" value={filters.brand} onChange={handleFilterChange}>
               <option value="">All Brands</option>
               {brandsData?.brands?.map((brand) => (
                  <option key={brand._id} value={brand._id}>
                     {brand.name}
                  </option>
               ))}
            </select>
         </div>

         <div className="filter-group">
            <label htmlFor="minPrice">Min Price</label>
            <input
               type="number"
               id="minPrice"
               name="minPrice"
               value={filters.minPrice}
               onChange={handleFilterChange}
               placeholder="Min Price"
            />
         </div>

         <div className="filter-group">
            <label htmlFor="maxPrice">Max Price</label>
            <input
               type="number"
               id="maxPrice"
               name="maxPrice"
               value={filters.maxPrice}
               onChange={handleFilterChange}
               placeholder="Max Price"
            />
         </div>

         <div className="filter-group">
            <label htmlFor="fuelType">Fuel Type</label>
            <select id="fuelType" name="fuelType" value={filters.fuelType} onChange={handleFilterChange}>
               <option value="">All Types</option>
               <option value="electric">Electric</option>
               <option value="hybrid">Hybrid</option>
               <option value="plugin_hybrid">Plug-in Hybrid</option>
            </select>
         </div>

         <div className="filter-group">
            <label htmlFor="transmission">Transmission</label>
            <select id="transmission" name="transmission" value={filters.transmission} onChange={handleFilterChange}>
               <option value="">All Transmissions</option>
               <option value="automatic">Automatic</option>
               <option value="manual">Manual</option>
            </select>
         </div>

         <div className="filter-group">
            <label htmlFor="sort">Sort By</label>
            <select id="sort" name="sort" value={filters.sort} onChange={handleFilterChange}>
               <option value="newest">Newest First</option>
               <option value="oldest">Oldest First</option>
               <option value="price_low">Price: Low to High</option>
               <option value="price_high">Price: High to Low</option>
            </select>
         </div>

         <div className="filter-actions">
            <button type="button" className="apply-filters-btn" onClick={applyFilters}>
               Apply Filters
            </button>

            <button type="button" className="reset-filters-btn" onClick={resetFilters}>
               Reset Filters
            </button>
         </div>
      </div>
   )
}

export default VehicleFilters
