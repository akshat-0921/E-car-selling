// src/pages/TestDriveBookingPage.jsx (example path)

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { showroomAPI, vehicleAPI } from "../../api";
import { toast } from "react-toastify";
import ServiceCard from "../../components/serviceCard/ServiceCard";
import TestDriveCard from "../../components/testDriveCard/testdrivecard";

// --- STYLING: Icons for visual enhancement ---
import { MapPin, Phone, Car, Wrench, Check, CheckCircle, Loader, ServerCrash, ArrowRight, ArrowLeft } from "lucide-react";

// --- STYLING: Helper components for a cleaner layout ---
const LoadingState = ({ message }) => (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader className="h-12 w-12 text-slate-400 dark:text-slate-500 animate-spin" />
        <p className="mt-4 text-lg font-medium text-slate-700 dark:text-slate-300">{message}</p>
    </div>
);
const EmptyState = ({ message }) => (
    <div className="col-span-full flex flex-col items-center justify-center py-10 text-center">
        <ServerCrash className="h-10 w-10 text-slate-400 dark:text-slate-500" />
        <p className="mt-4 text-base font-medium text-slate-700 dark:text-slate-300">{message}</p>
    </div>
);
const StepIndicator = ({ currentStep }) => {
    const steps = [
        { number: 1, label: 'Select Center' }, { number: 2, label: 'Choose Purpose' }, { number: 3, label: 'Book Slot' }
    ];
    return (
        <div className="flex items-center justify-center">
            {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                    <div className="flex flex-col items-center text-center">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 ${currentStep >= step.number ? "bg-blue-600 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"}`}>
                            {currentStep > step.number ? <Check className="w-6 h-6" /> : step.number}
                        </div>
                        <p className={`mt-2 text-xs font-semibold hidden sm:block w-20 ${currentStep >= step.number ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'}`}>{step.label}</p>
                    </div>
                    {index < steps.length - 1 && (
                        <div className={`flex-auto border-t-2 transition-colors duration-300 mx-2 w-8 sm:w-16 ${currentStep > step.number ? 'border-blue-600' : 'border-slate-200 dark:border-slate-700'}`} />
                    )}
                </div>
            ))}
        </div>
    );
};
const PurposeCard = ({ icon: Icon, title, description, isSelected, onClick }) => (
    <button onClick={onClick} className={`text-left p-6 rounded-xl border-2 w-full transition-all ${isSelected ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'}`}>
        <div className="flex items-center gap-4">
            <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
            </div>
        </div>
    </button>
);

const TestDriveBookingPage = () => {
    // --- LOGIC: All state and hooks are preserved ---
    const location = useLocation();
    const [step, setStep] = useState(1);
    const [purpose, setPurpose] = useState("service");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [selectedCenter, setSelectedCenter] = useState(null);
    const [nearbyCenters, setNearbyCenters] = useState([]);
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const showroomId = searchParams.get("showroom");
        if (showroomId) {
            const fetchShowroom = async () => { /* ... existing logic ... */ };
            fetchShowroom();
        }
    }, [location.search]);

    useEffect(() => {
        const fetchData = async () => { /* ... existing logic ... */ };
        fetchData();
    }, []);

    useEffect(() => {
        if (!selectedBrand) { /* ... existing logic ... */ return; }
        const fetchModels = async () => { /* ... existing logic ... */ };
        fetchModels();
    }, [selectedBrand]);

    const handleNext = () => {
        if (step === 1 && selectedCenter) setStep(2);
        else if (step === 2 && purpose) setStep(3);
    };

    const filteredCenters = nearbyCenters.filter(
        (c) => (!selectedBrand || selectedBrand === "all" || (c.brand?.name || c.brand) === selectedBrand) &&
               (!selectedModel || selectedModel === "all" || (c.models?.some(m => m.name === selectedModel)))
    );

    if (loading && step === 1 && !selectedCenter) {
        return <div className="bg-white dark:bg-slate-900 min-h-screen"><LoadingState message="Loading Service Centers..." /></div>;
    }

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Book an Appointment</h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">Schedule your service or test drive in just a few simple steps.</p>
                </div>
                <StepIndicator currentStep={step} />

                <div className="bg-white dark:bg-slate-800/50 p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800">
                    {step === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Step 1: Find a Service Center</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <select value={selectedBrand} onChange={(e) => { setSelectedBrand(e.target.value); setSelectedModel(""); }} className="form-select w-full rounded-md dark:bg-slate-900 dark:border-slate-700">
                                    <option value="">Filter by Brand</option>
                                    <option value="all">All Brands</option>
                                    {brands.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
                                </select>
                                <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} disabled={!selectedBrand || selectedBrand === "all"} className="form-select w-full rounded-md dark:bg-slate-900 dark:border-slate-700 disabled:opacity-50">
                                    <option value="">Filter by Model</option>
                                    <option value="all">All Models</option>
                                    {models.map((model) => <option key={model._id} value={model.name}>{model.name}</option>)}
                                </select>
                            </div>
                            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                                {filteredCenters.length === 0 ? <EmptyState message="No centers match your criteria." /> : filteredCenters.map((center) => (
                                    <div key={center._id} onClick={() => setSelectedCenter(center)} className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedCenter?._id === center._id ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20" : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"}`}>
                                        <div>
                                            <p className="font-semibold text-slate-900 dark:text-white">{center.name}</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2"><MapPin className="w-4 h-4" />{center.address}</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2"><Phone className="w-4 h-4" />{center.contactNumber}</p>
                                        </div>
                                        {selectedCenter?._id === center._id && <CheckCircle className="w-6 h-6 text-blue-600" />}
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-700">
                                <button onClick={handleNext} disabled={!selectedCenter} className="inline-flex items-center gap-x-2 rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50">Continue <ArrowRight className="w-4 h-4" /></button>
                            </div>
                        </div>
                    )}
                    {step === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Step 2: Choose Your Purpose</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <PurposeCard icon={Wrench} title="Service Booking" description="Regular maintenance and check-up" isSelected={purpose === 'service'} onClick={() => setPurpose('service')} />
                                <PurposeCard icon={Car} title="Test Drive" description="Experience the car before you buy" isSelected={purpose === 'test'} onClick={() => setPurpose('test')} />
                            </div>
                            <div className="flex justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                                <button onClick={() => setStep(1)} className="inline-flex items-center gap-x-2 rounded-md bg-white dark:bg-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white shadow-sm border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600">
                                    <ArrowLeft className="w-4 h-4" /> Back
                                </button>
                                <button onClick={handleNext} className="inline-flex items-center gap-x-2 rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">Continue <ArrowRight className="w-4 h-4" /></button>
                            </div>
                        </div>
                    )}
                    {step === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Step 3: Complete Your Booking</h2>
                            <p className="text-slate-600 dark:text-slate-400">{purpose === "service" ? "Please fill out the details for your service appointment." : "Please fill out the details for your test drive."}</p>
                            {purpose === "service" ? <ServiceCard showroomId={selectedCenter?._id} /> : <TestDriveCard showroomId={selectedCenter?._id} />}
                            <div className="flex justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                                <button onClick={() => setStep(2)} className="inline-flex items-center gap-x-2 rounded-md bg-white dark:bg-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white shadow-sm border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600">
                                    <ArrowLeft className="w-4 h-4" /> Back
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TestDriveBookingPage;
