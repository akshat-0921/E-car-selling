import React, { useState } from "react";
import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/Footer/footer";

const showrooms = [
    {
        id: 1,
        name: "Audi Showroom - Delhi",
        image: "https://via.placeholder.com/300x200",
        address: "A-45, Ring Road, Delhi",
        rating: 4.7,
        phone: "9876543210"
    },
    {
        id: 2,
        name: "BMW Showroom - Mumbai",
        image: "https://via.placeholder.com/300x200",
        address: "B-23, Link Road, Mumbai",
        rating: 4.5,
        phone: "9876543222"
    },
    {
        id: 3,
        name: "Mercedes Showroom - Bangalore",
        image: "https://via.placeholder.com/300x200",
        address: "MG Road, Bangalore",
        rating: 4.8,
        phone: "9876543233"
    }
];

const ShowroomPage = () => {
    const [filterBrand, setFilterBrand] = useState("");
    const [sort, setSort] = useState("top");

    const filteredShowrooms = showrooms
        .filter((s) => (filterBrand ? s.name.toLowerCase().includes(filterBrand.toLowerCase()) : true))
        .sort((a, b) => (sort === "top" ? b.rating - a.rating : a.name.localeCompare(b.name)));

    return (
        <>
            <div className="max-w-6xl mx-auto p-6 mt-16">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Car Dealers at Your Location</h1>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-6">
                    <select
                        className="border p-2 rounded"
                        value={filterBrand}
                        onChange={(e) => setFilterBrand(e.target.value)}
                    >
                        <option value="">Filter by Brand</option>
                        <option value="audi">Audi</option>
                        <option value="bmw">BMW</option>
                        <option value="mercedes">Mercedes</option>
                    </select>

                    <select
                        className="border p-2 rounded"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="top">Sort by Top Rated</option>
                        <option value="name">Sort by Name</option>
                    </select>
                </div>

                {/* Showroom Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredShowrooms.map((showroom) => (
                        <div key={showroom.id} className="bg-white shadow rounded overflow-hidden">
                            <img src={showroom.image} alt={showroom.name} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-1">{showroom.name}</h3>
                                <p className="text-gray-600 text-sm mb-2">{showroom.address}</p>
                                <p className="text-yellow-500 text-sm mb-2">⭐ {showroom.rating} / 5</p>
                                <div className="flex gap-4 mt-4">
                                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                                        Call Now
                                    </button>
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                                        Book Test Drive
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ShowroomPage;