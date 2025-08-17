import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

const SearchBar = ({ onSearch, placeholder = "Search...", initialValue = "" }) => {
    const [searchTerm, setSearchTerm] = useState(initialValue)
    const navigate = useNavigate()
    const location = useLocation()

    // Update search term when URL changes
    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const query = params.get("q") || ""
        setSearchTerm(query)
    }, [location.search])

    // Handle input change
    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    }

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault()

        // Update URL with search query
        const params = new URLSearchParams(location.search)

        if (searchTerm) {
            params.set("q", searchTerm)
        } else {
            params.delete("q")
        }

        // Navigate to the same page with updated query params
        navigate(`${location.pathname}?${params.toString()}`)

        // Call the callback
        if (onSearch) {
            onSearch(searchTerm)
        }
    }

    // Clear search
    const clearSearch = () => {
        setSearchTerm("")

        // Update URL by removing search query
        const params = new URLSearchParams(location.search)
        params.delete("q")

        // Navigate to the same page without query
        navigate(`${location.pathname}?${params.toString()}`)

        // Call the callback
        if (onSearch) {
            onSearch("")
        }
    }

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder={placeholder}
                className="search-input"
            />

            {searchTerm && (
                <button type="button" className="clear-search-btn" onClick={clearSearch}>
                    ×
                </button>
            )}

            <button type="submit" className="search-btn">
                Search
            </button>
        </form>
    )
}

export default SearchBar
