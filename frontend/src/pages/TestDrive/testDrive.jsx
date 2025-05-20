import { useState } from "react"
import { Calendar, Car, CheckCircle, MapPin, Phone } from "lucide-react"
import ServiceCard from "../../components/serviceCard/ServiceCard"
import TestDriveCard from "../../components/testDriveCard/testdrivecard"

const nearbyCenters = [
    {
        id: 1,
        name: "Audi Center Delhi",
        brand: "Audi",
        model: ["Q5", "e-tron"],
        address: "Ring Road, Delhi",
        phone: "9876543210",
    },
    {
        id: 2,
        name: "BMW Center Gurugram",
        brand: "BMW",
        model: ["X5", "i4"],
        address: "Sector 29, Gurugram",
        phone: "9876543222",
    },
    {
        id: 3,
        name: "Tesla Center Noida",
        brand: "Tesla",
        model: ["Model S", "Model 3"],
        address: "Sector 18, Noida",
        phone: "9876543233",
    },
]

const TestDriveBookingPage = () => {
    const [step, setStep] = useState(1)
    const [purpose, setPurpose] = useState("service")
    const [selectedBrand, setSelectedBrand] = useState("")
    const [selectedModel, setSelectedModel] = useState("")
    const [selectedCenter, setSelectedCenter] = useState(null)

    const handleNext = () => {
        if (step === 1 && selectedCenter) setStep(2)
        else if (step === 2 && purpose) setStep(3)
    }

    const filteredCenters = nearbyCenters.filter(
        (c) =>
            (!selectedBrand || selectedBrand === "all" || c.brand === selectedBrand) &&
            (!selectedModel || selectedModel === "all" || c.model.includes(selectedModel)),
    )

    return (
        <div className="bg-slate-50 min-h-screen py-8">
            <div className="max-w-4xl mx-auto p-6 space-y-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">Book a Car Service or Test Drive</h1>
                    <p className="text-slate-500 mt-2">Schedule your appointment in just a few steps</p>
                </div>

                <div className="flex justify-center mb-8">
                    <div className="flex items-center">
                        {[1, 2, 3].map((s, i) => (
                            <div key={s} className="flex items-center">
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= s ? "bg-blue-600 text-white" : "bg-slate-200"}`}>
                                    {s}
                                </div>
                                {i < 2 && <div className={`w-16 h-1 ${step > s ? "bg-blue-600" : "bg-slate-200"}`} />}
                            </div>
                        ))}
                    </div>
                </div>

                {step === 1 && (
                    <div className="bg-white rounded-lg shadow p-6 space-y-6">
                        <h2 className="text-xl font-semibold">Step 1: Find Nearby Service Centers</h2>
                        <p className="text-slate-500">Select a service center near you</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <select
                                value={selectedBrand}
                                onChange={(e) => {
                                    setSelectedBrand(e.target.value)
                                    setSelectedModel("")
                                }}
                                className="border p-2 rounded"
                            >
                                <option value="">Select Brand</option>
                                <option value="all">All Brands</option>
                                {[...new Set(nearbyCenters.map((c) => c.brand))].map((brand) => (
                                    <option key={brand} value={brand}>
                                        {brand}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={selectedModel}
                                onChange={(e) => setSelectedModel(e.target.value)}
                                disabled={!selectedBrand}
                                className="border p-2 rounded"
                            >
                                <option value="">Select Model</option>
                                <option value="all">All Models</option>
                                {selectedBrand &&
                                    nearbyCenters
                                        .find((c) => c.brand === selectedBrand)
                                        ?.model.map((m) => (
                                            <option key={m} value={m}>
                                                {m}
                                            </option>
                                        ))}
                            </select>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium">Available Centers:</h3>
                            {filteredCenters.length === 0 ? (
                                <p className="text-slate-500 text-center py-4">No centers match your criteria</p>
                            ) : (
                                filteredCenters.map((center) => (
                                    <div
                                        key={center.id}
                                        className={`border rounded-lg p-4 my-2 flex justify-between items-center cursor-pointer transition hover:shadow ${selectedCenter?.id === center.id ? "border-blue-600 ring-1 ring-blue-600" : ""
                                            }`}
                                        onClick={() => setSelectedCenter(center)}
                                    >
                                        <div>
                                            <h4 className="font-semibold">{center.name}</h4>
                                            <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                                                <MapPin className="w-4 h-4" />
                                                {center.address}
                                            </p>
                                            <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                                                <Phone className="w-4 h-4" />
                                                {center.phone}
                                            </p>
                                        </div>
                                        {selectedCenter?.id === center.id && <CheckCircle className="w-5 h-5 text-blue-600" />}
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={handleNext}
                                disabled={!selectedCenter}
                                className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="bg-white rounded-lg shadow p-6 space-y-6">
                        <h2 className="text-xl font-semibold">Step 2: Select Purpose</h2>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => setPurpose("service")}
                                className={`flex-1 border rounded-lg p-4 ${purpose === "service" ? "border-blue-600 bg-blue-50" : "hover:bg-gray-50"}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-100 p-2 rounded-full">
                                        <Car className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Service Booking</h3>
                                        <p className="text-sm text-gray-500">Regular maintenance and check-up</p>
                                    </div>
                                </div>
                            </button>
                            <button
                                onClick={() => setPurpose("test")}
                                className={`flex-1 border rounded-lg p-4 ${purpose === "test" ? "border-blue-600 bg-blue-50" : "hover:bg-gray-50"}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-100 p-2 rounded-full">
                                        <Calendar className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Test Drive</h3>
                                        <p className="text-sm text-gray-500">Experience the car before you buy</p>
                                    </div>
                                </div>
                            </button>
                        </div>
                        <div className="flex justify-between">
                            <button onClick={() => setStep(1)} className="border px-4 py-2 rounded">
                                Back
                            </button>
                            <button onClick={handleNext} className="bg-blue-600 text-white px-4 py-2 rounded">
                                Continue
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="bg-white rounded-lg shadow p-6 space-y-6">
                        <h2 className="text-xl font-semibold">Step 3: Complete Your Booking</h2>
                        <p className="text-slate-500">
                            {purpose === "service" ? "Schedule your service appointment" : "Schedule your test drive"}
                        </p>

                        {purpose === "service" ? (
                            <ServiceCard />
                        ) : (
                            <TestDriveCard />
                        )}

                        <div className="flex justify-between">
                            <button onClick={() => setStep(2)} className="border px-4 py-2 rounded">
                                Back
                            </button>
                            <button disabled={purpose === "test"} className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50">
                                {purpose === "service" ? "Book Service" : "Book Test Drive"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TestDriveBookingPage
