// src/components/FeatureCard.jsx

// --- STYLING: Replaced react-icons with a consistent, modern icon set ---
import {
    Car,
    CalendarCheck,
    Wrench,
    CircleDollarSign,
    ShieldCheck,
    Headset,
} from "lucide-react";

// --- LOGIC: The features array structure is preserved. The icons are updated to the new library. ---
// The `gradient` property is no longer used but is kept to avoid changing the data structure.
const features = [
    {
        icon: Headset,
        title: "Showroom Customer Service",
        description: "Get 24/7 support at showrooms to assist with your car purchases and services.",
        gradient: "from-rose-500 to-pink-500",
    },
    {
        icon: Car,
        title: "Wide Range of Cars",
        description: "Explore a diverse collection of electric cars from top brands.",
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        icon: CalendarCheck,
        title: "Easy Test Drive Booking",
        description: "Book test drives effortlessly based on your preferred date and time.",
        gradient: "from-green-500 to-emerald-500",
    },
    {
        icon: Wrench,
        title: "Car Servicing",
        description: "Get your car serviced at trusted showrooms with certified professionals.",
        gradient: "from-orange-500 to-amber-500",
    },
    {
        icon: CircleDollarSign,
        title: "Flexible Payment Options",
        description: "Secure and flexible payment methods for hassle-free transactions.",
        gradient: "from-purple-500 to-violet-500",
    },
    {
        icon: ShieldCheck,
        title: "Secure & Reliable",
        description: "Data security and reliable support to ensure a smooth experience.",
        gradient: "from-indigo-500 to-blue-600",
    },
];

const FeatureCard = () => {
    return (
        // --- STYLING: Main container with theme-aware background ---
        <div className="bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">

                {/* --- STYLING: Themed header section --- */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                        Why Choose <span className="text-blue-600 dark:text-blue-400">DriveIt</span>
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg leading-8 text-slate-600 dark:text-slate-400">
                        Discover the advantages that make us the preferred choice for car enthusiasts.
                    </p>
                </div>

                {/* --- STYLING: Themed features grid --- */}
                <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {/* --- LOGIC: The map function is preserved --- */}
                    {features.map((feature, index) => {
                        const Icon = feature.icon; // Assign the component to a variable with a capital letter
                        return (
                            <div
                                key={index}
                                // --- STYLING: Themed feature card with simpler, more elegant interactions ---
                                className="group relative p-8 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                            >
                                <div className="flex flex-col items-center text-center">
                                    {/* --- STYLING: Themed icon container --- */}
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 mb-6 transition-transform duration-300 group-hover:scale-110">
                                        <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                                    </div>

                                    {/* --- STYLING: Themed title --- */}
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                        {feature.title}
                                    </h3>

                                    {/* --- STYLING: Themed description --- */}
                                    <p className="mt-2 text-base leading-7 text-slate-600 dark:text-slate-400">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FeatureCard;

