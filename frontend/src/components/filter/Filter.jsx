// src/components/Filter.jsx

import { useState, useEffect } from "react";
import Select from "react-select";
import { brandAPI } from "../../api";
import { toast } from "react-toastify";
import { SlidersHorizontal } from "lucide-react";

import suv from "../../assets/bodyType/suv_clr.svg";
import sedan from "../../assets/bodyType/sedan_clr.svg";
import hatchback from "../../assets/bodyType/hatchback_clr.svg";
import coupe from "../../assets/bodyType/coupe_clr.svg";
import convertible from "../../assets/bodyType/convertible_clr.svg";
import van from "../../assets/bodyType/van_clr.svg";
import truck from "../../assets/bodyType/truck_clr.svg";

const bodyTypeOptions = [
    { value: "SUV", label: "SUV", image: suv },
    { value: "Sedan", label: "Sedan", image: sedan },
    { value: "Hatchback", label: "Hatchback", image: hatchback },
    { value: "Coupe", label: "Coupe", image: coupe },
    { value: "Convertible", label: "Convertible", image: convertible },
    { value: "Van", label: "Van", image: van },
    { value: "Truck", label: "Truck", image: truck },
];

const categoryOptions = [
    { value: "Petrol", label: "Petrol" }, { value: "Diesel", label: "Diesel" },
    { value: "Electric", label: "Electric" }, { value: "CNG", label: "CNG" },
    { value: "Hybrid", label: "Hybrid" }, { value: "Hydrogen", label: "Hydrogen" },
    { value: "LPG", label: "LPG" }, { value: "Plug-in Hybrid", label: "Plug-in Hybrid" },
    { value: "Ethanol", label: "Ethanol" }, { value: "Biodiesel", label: "Biodiesel" },
];

const customSelectStyles = (isDarkMode) => ({
    control: (provided) => ({
        ...provided,
        backgroundColor: isDarkMode ? '#1f2937' : '#FFFFFF',
        borderColor: isDarkMode ? '#374151' : '#D1D5DB',
        minHeight: '42px',
        '&:hover': { borderColor: isDarkMode ? '#4B5563' : '#9CA3AF' },
        boxShadow: 'none',
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: isDarkMode ? '#1f2937' : '#FFFFFF',
        border: `1px solid ${isDarkMode ? '#374151' : '#E5E7EB'}`,
        zIndex: 50,
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#2563EB' : (state.isFocused ? (isDarkMode ? '#374151' : '#F3F4F6') : 'transparent'),
        color: state.isSelected ? '#FFFFFF' : (isDarkMode ? '#F3F4F6' : '#111827'),
        '&:active': { backgroundColor: '#1D4ED8' },
    }),
    singleValue: (provided) => ({ ...provided, color: isDarkMode ? '#F3F4F6' : '#111827' }),
    placeholder: (provided) => ({ ...provided, color: isDarkMode ? '#6B7280' : '#9CA3AF' }),
    indicatorSeparator: () => ({ display: 'none' }),
    dropdownIndicator: (provided) => ({ ...provided, color: isDarkMode ? '#9CA3AF' : '#6B7280' }),
});

const Filter = ({ onFilterChange }) => {
    const initialFilters = {
        minPrice: 100000, maxPrice: 50000000, bodyType: "", brand: "", category: ""
    };
    const [filters, setFilters] = useState(initialFilters);
    const [brandOptions, setBrandOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const darkModeMatcher = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(darkModeMatcher.matches);
        const listener = (e) => setIsDarkMode(e.matches);
        darkModeMatcher.addEventListener('change', listener);
        return () => darkModeMatcher.removeEventListener('change', listener);
    }, []);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                setLoading(true);
                const response = await brandAPI.getAllBrands();
                if (response.data.success) {
                    const brands = response.data.brands.map((brand) => ({
                        value: brand.name,
                        label: brand.name,
                    }));
                    setBrandOptions(brands);
                } else {
                    toast.error(response.data.message || "Failed to fetch brands");
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to fetch brands");
            } finally {
                setLoading(false);
            }
        };
        fetchBrands();
    }, []);

    const handleSelectChange = (selected, name) => {
        setFilters({ ...filters, [name]: selected ? selected.value : "" });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleMinPriceChange = (e) => {
        const minPrice = Number.parseInt(e.target.value, 10);
        if (minPrice <= filters.maxPrice) {
            setFilters({ ...filters, minPrice });
        }
    };

    const handleMaxPriceChange = (e) => {
        const maxPrice = Number.parseInt(e.target.value, 10);
        if (maxPrice >= filters.minPrice) {
            setFilters({ ...filters, maxPrice });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const cleanFilters = Object.entries(filters).reduce((acc, [k, v]) => {
            if (v !== "" && v !== null && v !== undefined) acc[k] = v;
            return acc;
        }, {});
        onFilterChange(cleanFilters);
    };

    const formatOptionLabel = ({ label, image }) => (
        <div className="flex items-center gap-x-3">
            {image && <img src={image} alt={label} className="w-8 h-8 object-contain" />}
            <span>{label}</span>
        </div>
    );

    const handleReset = () => {
        setFilters(initialFilters);
        onFilterChange({});
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg w-full max-w-sm space-y-6"
        >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-x-3">
                    <SlidersHorizontal className="h-6 w-6 text-blue-600" />
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Filters</h2>
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Price Range</label>
                <div className="flex justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                    <span>₹{filters.minPrice.toLocaleString()}</span>
                    <span>₹{filters.maxPrice.toLocaleString()}</span>
                </div>
                <div className="relative h-2">
                    <input type="range" name="minPrice" min="100000" max="50000000" step="100000" value={filters.minPrice} onChange={handleMinPriceChange} className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer range-slider" />
                    <input type="range" name="maxPrice" min="100000" max="50000000" step="100000" value={filters.maxPrice} onChange={handleMaxPriceChange} className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer range-slider" />
                </div>
            </div>

            <FilterGroup label="Body Type">
                <Select name="bodyType" options={bodyTypeOptions} value={bodyTypeOptions.find(o => o.value === filters.bodyType)} onChange={(s) => handleSelectChange(s, "bodyType")} styles={customSelectStyles(isDarkMode)} placeholder="Any Body Type" formatOptionLabel={formatOptionLabel} isClearable />
            </FilterGroup>

            <FilterGroup label="Brand">
                <Select name="brand" options={brandOptions} value={brandOptions.find(o => o.value === filters.brand)} onChange={(s) => handleSelectChange(s, "brand")} styles={customSelectStyles(isDarkMode)} placeholder={loading ? "Loading brands..." : "Any Brand"} isLoading={loading} isClearable />
            </FilterGroup>

            <FilterGroup label="Fuel Type">
                <Select name="category" options={categoryOptions} value={categoryOptions.find(o => o.value === filters.category)} onChange={(s) => handleSelectChange(s, "category")} styles={customSelectStyles(isDarkMode)} placeholder="Any Fuel Type" isClearable />
            </FilterGroup>

            <div className="flex items-center gap-x-3 pt-6 border-t border-slate-200 dark:border-slate-800">
                <button type="button" onClick={handleReset} className="w-full px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    Reset
                </button>
                <button type="submit" className="w-full px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                    Apply Filters
                </button>
            </div>
            
            {/* The invalid <style jsx global> block has been removed to fix the warning. */}
            {/* Remember to add the corresponding styles to your global CSS file. */}
        </form>
    );
};

const FilterGroup = ({ label, children }) => (
    <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
        {children}
    </div>
);

export default Filter;
