"use client"

import { useState, useEffect } from "react"
// import { useGetAllShowroomsQuery, useFindNearbyShowroomsQuery } from "../../redux/api/showroomApi"
// import { useSelector } from "react-redux"
// import {
//     selectAllShowrooms,
//     selectNearbyShowrooms,
//     selectShowroomsLoading,
//     selectShowroomsError,
// } from "../../redux/slices/showroomSlice"
// import ShowroomCard from "../../components/ShowroomCard/ShowroomCard"
import SearchBar from "../../components/Search/SearchBar.jsx"

const Showrooms = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredShowrooms, setFilteredShowrooms] = useState([])
    const [userLocation, setUserLocation] = useState(null)
    const [isNearbyMode, setIsNearbyMode] = useState(false)

    // Fetch all showrooms
    const { refetch: refetchAll } = useGetAllShowroomsQuery()

    // Fetch nearby showrooms if location is available
    const { refetch: refetchNearby } = useFindNearbyShowroomsQuery(
        userLocation ? { lat: userLocation.lat, lon: userLocation.lon, radius: 50 } : { skip: true },
    )

    // Get data from Redux store
    const allShowrooms = useSelector(selectAllShowrooms)
    const nearbyShowrooms = useSelector(selectNearbyShowrooms)
    const isLoading = useSelector(selectShowroomsLoading)
    const error = useSelector(selectShowroomsError)

    // Determine which showrooms to display
    const showrooms = isNearbyMode ? nearbyShowrooms : allShowrooms

    useEffect(() => {
        // Fetch all showrooms when component mounts
        refetchAll()
    }, [refetchAll])

    // Get user location
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords
                    setUserLocation({ lat: latitude, lon: longitude })
                },
                (error) => {
                    console.error("Error getting location:", error)
                },
            )
        }
    }, [])

    // Filter showrooms based on search term
    useEffect(() => {
        if (!showrooms) return

        const filtered = searchTerm
            ? showrooms.filter(
                (showroom) =>
                    showroom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    showroom.address.toLowerCase().includes(searchTerm.toLowerCase()),
            )
            : showrooms

        setFilteredShowrooms(filtered)
    }, [showrooms, searchTerm])

    // Handle search
    const handleSearch = (term) => {
        setSearchTerm(term)
    }

    // Toggle between all and nearby showrooms
    const toggleNearbyMode = () => {
        if (!isNearbyMode && userLocation) {
            refetchNearby()
        }
        setIsNearbyMode((prev) => !prev)
    }

    if (isLoading) {
        return <Loader />
    }

    if (error) {
        return <ErrorMessage message={error} />
    }

    return (
        <div className="showrooms-page">
            <div className="showrooms-header">
                <h1>Find Showrooms</h1>
                <div className="showrooms-actions">
                    <SearchBar onSearch={handleSearch} placeholder="Search showrooms..." />
                    <button
                        className={`nearby-toggle ${isNearbyMode ? "active" : ""}`}
                        onClick={toggleNearbyMode}
                        disabled={!userLocation}
                    >
                        {isNearbyMode ? "Show All Showrooms" : "Show Nearby Showrooms"}
                    </button>
                </div>
            </div>

            {filteredShowrooms.length === 0 ? (
                <div className="no-showrooms">
                    <p>No showrooms found matching your criteria.</p>
                </div>
            ) : (
                <div className="showrooms-grid">
                    {filteredShowrooms.map((showroom) => (
                        <ShowroomCard key={showroom._id} showroom={showroom} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Showrooms
