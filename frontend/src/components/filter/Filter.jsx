"use client"

import { useState, useEffect } from "react"
import { FaFilter } from "react-icons/fa"
import Select from "react-select"
import { brandAPI } from "../../api"
import { toast } from "react-toastify"

// Import SVG images.  Adjust paths if needed.
import suv from "../../assets/bodyType/suv_clr.svg"
import sedan from "../../assets/bodyType/sedan_clr.svg"
import hatchback from "../../assets/bodyType/hatchback_clr.svg"
import coupe from "../../assets/bodyType/coupe_clr.svg"
import convertible from "../../assets/bodyType/convertible_clr.svg"
import van from "../../assets/bodyType/van_clr.svg"
import truck from "../../assets/bodyType/truck_clr.svg"

const bodyTypeOptions = [
   { value: "SUV", label: "SUV", image: suv },
   { value: "Sedan", label: "Sedan", image: sedan },
   { value: "Hatchback", label: "Hatchback", image: hatchback },
   { value: "Coupe", label: "Coupe", image: coupe },
   { value: "Convertible", label: "Convertible", image: convertible },
   { value: "Van", label: "Van", image: van },
   { value: "Truck", label: "Truck", image: truck },
]

const fuelTypeOptions = [
   { value: "Petrol", label: "Petrol" },
   { value: "Diesel", label: "Diesel" },
   { value: "Electric", label: "Electric" },
]

const Filter = ({ onFilterChange }) => {
   const [filters, setFilters] = useState({
      minPrice: 100000,
      maxPrice: 5000000,
      bodyType: [],
      brand: "",
      fuelType: [],
   })

   const [brandOptions, setBrandOptions] = useState([])
   const [loading, setLoading] = useState(false)

   // Fetch brands from API
   useEffect(() => {
      const fetchBrands = async () => {
         try {
            setLoading(true)
            const response = await brandAPI.getAllBrands()
            if (response.data.success) {
               const brands = response.data.brands.map((brand) => ({
                  value: brand._id || brand.name,
                  label: brand.name,
               }))
               setBrandOptions(brands)
            } else {
               toast.error(response.data.message || "Failed to fetch brands")
            }
         } catch (error) {
            console.error("Error fetching brands:", error)
            toast.error(error.response?.data?.message || "Failed to fetch brands")
         } finally {
            setLoading(false)
         }
      }

      fetchBrands()
   }, [])

   const handleMultipleChange = (selected, name) => {
      setFilters({
         ...filters,
         [name]: selected ? selected.map((item) => item.value) : [],
      })
   }

   const handleChange = (e) => {
      const { name, value } = e.target
      setFilters({
         ...filters,
         [name]: value,
      })
   }

   const handleMinPriceChange = (e) => {
      const minPrice = Number.parseInt(e.target.value, 10)
      if (minPrice <= filters.maxPrice) {
         setFilters({ ...filters, minPrice })
      }
   }

   const handleMaxPriceChange = (e) => {
      const maxPrice = Number.parseInt(e.target.value, 10)
      if (maxPrice >= filters.minPrice) {
         setFilters({ ...filters, maxPrice })
      }
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      onFilterChange(filters)
   }

   const formatOptionLabel = ({ label, image }) => (
      <div className="flex items-center">
         {image && <img src={image || "/placeholder.svg"} alt={label} className="w-6 h-6 mr-2" />}
         <span>{label}</span>
      </div>
   )

   return (
      <form onSubmit={handleSubmit} className="flex flex-col p-4 bg-white rounded-lg shadow-md w-full max-w-sm">
         <div className="flex items-center mb-4">
            <FaFilter size={18} className="mr-2 text-gray-700" />
            <p className="text-lg font-semibold text-gray-700">Filter By</p>
         </div>

         <label className="w-full text-sm text-gray-600">Price Range</label>
         <div className="flex flex-col space-y-2 mt-1">
            <div className="flex items-center">
               <label htmlFor="minPrice" className="mr-2">
                  Min:
               </label>
               <input
                  type="range"
                  id="minPrice"
                  name="minPrice"
                  min="100000"
                  max="5000000"
                  value={filters.minPrice}
                  onChange={handleMinPriceChange}
                  className="w-full"
               />
               <span className="ml-2">₹{filters.minPrice.toLocaleString()}</span>
            </div>
            <div className="flex items-center mt-2">
               <label htmlFor="maxPrice" className="mr-2">
                  Max:
               </label>
               <input
                  type="range"
                  id="maxPrice"
                  name="maxPrice"
                  min="100000"
                  max="5000000"
                  value={filters.maxPrice}
                  onChange={handleMaxPriceChange}
                  className="w-full"
               />
               <span className="ml-2">₹{filters.maxPrice.toLocaleString()}</span>
            </div>
         </div>

         <label className="w-full text-sm text-gray-600 mt-3">Body Type</label>
         <Select
            name="bodyType"
            isMulti
            options={bodyTypeOptions}
            value={bodyTypeOptions.filter((option) => filters.bodyType.includes(option.value))}
            onChange={(selected) => handleMultipleChange(selected, "bodyType")}
            className="w-full mt-1"
            placeholder="Select body type"
            formatOptionLabel={formatOptionLabel}
            formatGroupLabel={formatOptionLabel} // For grouped options (if any)
         />

         <label className="w-full text-sm text-gray-600 mt-3">Brand</label>
         <Select
            name="brand"
            options={brandOptions}
            value={brandOptions.find((option) => option.value === filters.brand) || null}
            onChange={(selected) => handleChange({ target: { name: "brand", value: selected ? selected.value : "" } })}
            className="w-full mt-1"
            placeholder={loading ? "Loading brands..." : "Select brand"}
            isLoading={loading}
         />

         <label className="w-full text-sm text-gray-600 mt-3">Fuel Type</label>
         <Select
            name="fuelType"
            isMulti
            options={fuelTypeOptions}
            value={fuelTypeOptions.filter((option) => filters.fuelType.includes(option.value))}
            onChange={(selected) => handleMultipleChange(selected, "fuelType")}
            className="w-full mt-1"
            placeholder="Select fuel type"
         />

         <button type="submit" className="w-full mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Apply Filters
         </button>
      </form>
   )
}

export default Filter
