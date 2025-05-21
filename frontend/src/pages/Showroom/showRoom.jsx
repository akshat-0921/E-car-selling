import React, { useState } from "react";
import { Phone, MapPin, Star, Calendar } from "lucide-react";

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
    const [filterBrand, setFilterBrand] = useState("all");
    const [sort, setSort] = useState("top");

    const filteredShowrooms = showrooms
        .filter((s) => (filterBrand !== "all" ? s.name.toLowerCase().includes(filterBrand.toLowerCase()) : true))
        .sort((a, b) => (sort === "top" ? b.rating - a.rating : a.name.localeCompare(b.name)));

    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="max-w-6xl mx-auto p-6 pt-16">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">Car Dealers Near You</h1>
                        <p className="text-slate-500 mt-1">Find the best car showrooms in your area</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <select
                            value={filterBrand}
                            onChange={(e) => setFilterBrand(e.target.value)}
                            className="border border-gray-300 rounded px-4 py-2 bg-white text-sm"
                        >
                            <option value="all">All Brands</option>
                            <option value="audi">Audi</option>
                            <option value="bmw">BMW</option>
                            <option value="mercedes">Mercedes</option>
                        </select>

                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="border border-gray-300 rounded px-4 py-2 bg-white text-sm"
                        >
                            <option value="top">Top Rated</option>
                            <option value="name">Name</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredShowrooms.map((showroom) => (
                        <div
                            key={showroom.id}
                            className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-all"
                        >
                            <div className="relative">
                                <img
                                    src={showroom.image}
                                    alt={showroom.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute top-3 right-3 bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-yellow-500 stroke-yellow-500" />
                                    <span>{showroom.rating}</span>
                                </div>
                            </div>

                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-slate-800">{showroom.name}</h2>
                                <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {showroom.address}
                                </p>
                            </div>

                            <div className="px-4 pb-4 flex gap-2">
                                <button
                                    className="flex-1 bg-white border border-gray-300 text-slate-700 text-sm px-3 py-2 rounded flex items-center justify-center gap-1 hover:bg-gray-100"
                                >
                                    <Phone className="h-4 w-4" />
                                    Call
                                </button>
                                <button
                                    className="flex-1 bg-blue-600 text-white text-sm px-3 py-2 rounded flex items-center justify-center gap-1 hover:bg-blue-700"
                                >
                                    <Calendar className="h-4 w-4" />
                                    Book Test Drive
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShowroomPage;
