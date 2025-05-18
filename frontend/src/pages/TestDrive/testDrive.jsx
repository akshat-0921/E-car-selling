import React, { useState } from "react";
import ServiceCard from "../../components/serviceCard/ServiceCard";

const nearbyCenters = [
    { id: 1, name: "Audi Center Delhi", brand: "Audi", model: ["Q5", "e-tron"], address: "Ring Road, Delhi", phone: "9876543210" },
    { id: 2, name: "BMW Center Gurugram", brand: "BMW", model: ["X5", "i4"], address: "Sector 29, Gurugram", phone: "9876543222" },
    { id: 3, name: "Tesla Center Noida", brand: "Tesla", model: ["Model S", "Model 3"], address: "Sector 18, Noida", phone: "9876543233" }
];

const TestDriveBookingPage = () => {
    const [step, setStep] = useState(1);
    const [purpose, setPurpose] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [selectedCenter, setSelectedCenter] = useState(null);

    const handleNext = () => {
        if (step === 1 && selectedCenter) setStep(2);
        else if (step === 2 && purpose) setStep(3);
    };

    const filteredCenters = nearbyCenters.filter(
        (c) =>
            (!selectedBrand || c.brand === selectedBrand) &&
            (!selectedModel || c.model.includes(selectedModel))
    );

    return (
        <>
            {/* <Navbar /> */}
            <div className="max-w-4xl mx-auto p-6 mt-16 space-y-8">
                <h1 className="text-3xl font-bold">Book a Car Service or Test Drive</h1>

                {step === 1 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Step 1: Find Nearby Service Centers</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <select
                                value={selectedBrand}
                                onChange={(e) => {
                                    setSelectedBrand(e.target.value);
                                    setSelectedModel("");
                                }}
                                className="border p-2 rounded"
                            >
                                <option value="">Select Brand</option>
                                {[...new Set(nearbyCenters.map((c) => c.brand))].map((brand) => (
                                    <option key={brand} value={brand}>{brand}</option>
                                ))}
                            </select>
                            <select
                                value={selectedModel}
                                onChange={(e) => setSelectedModel(e.target.value)}
                                className="border p-2 rounded"
                            >
                                <option value="">Select Model</option>
                                {selectedBrand &&
                                    nearbyCenters
                                        .find((c) => c.brand === selectedBrand)?.model.map((m) => (
                                            <option key={m} value={m}>{m}</option>
                                        ))}
                            </select>
                        </div>

                        <h3 className="text-lg font-semibold mb-2">Matching Centers:</h3>
                        <div className="grid gap-4">
                            {filteredCenters.map((c) => (
                                <div
                                    key={c.id}
                                    className={`border p-4 rounded shadow ${selectedCenter?.id === c.id ? "border-blue-500" : ""}`}
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h4 className="font-bold">{c.name}</h4>
                                            <p className="text-sm text-gray-600">{c.address}</p>
                                            <p className="text-sm text-gray-600">Contact: {c.phone}</p>
                                        </div>
                                        <button
                                            onClick={() => setSelectedCenter(c)}
                                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                        >
                                            Select
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 text-right">
                            <button
                                disabled={!selectedCenter}
                                onClick={handleNext}
                                className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Step 2: Select Purpose</h2>
                        <div className="flex gap-4">
                            <button
                                className={`border px-4 py-2 rounded ${purpose === "service" ? "bg-blue-600 text-white" : ""}`}
                                onClick={() => setPurpose("service")}
                            >
                                Service Booking
                            </button>
                            <button
                                className={`border px-4 py-2 rounded ${purpose === "test" ? "bg-blue-600 text-white" : ""}`}
                                onClick={() => setPurpose("test")}
                            >
                                Test Drive
                            </button>
                        </div>
                        <div className="mt-6 text-right">
                            <button
                                disabled={!purpose}
                                onClick={handleNext}
                                className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="mt-8">
                        {purpose === "service" ? (
                            <ServiceCard />
                        ) : (
                            <div className="text-gray-700">
                                <p className="mb-4">Test Drive booking form coming soon...</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            {/* <Footer /> */}
        </>
    );
};

export default TestDriveBookingPage;
