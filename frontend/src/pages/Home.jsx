
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import BrandCard from "../components/BrandCard";
import ServiceCard from "../components/ServiceCard";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />

            {/* Car Brand Section */}
            <section className="text-center mt-16 px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Select Your Car Brand</h1>
                <BrandCard />
            </section>

            {/* Car Service Section */}
            <section className="text-center mt-12 px-4">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">Book a Car Service</h2>
                <ServiceCard />
            </section>

            {/* Car Model Navigation Button */}
            <section className="text-center mt-12 space-y-6">
                <div>
                    <button
                        className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-indigo-700 transition"
                        onClick={() => navigate("/car-model")}
                    >
                        View Car Model Details
                    </button>
                </div>

                {/* Search Page Navigation Button */}
                <div>
                    <button
                        className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-blue-600 transition"
                        onClick={() => navigate("/search")}
                    >
                        Search for Cars
                    </button>
                </div>

                {/* Brand Search Page Navigation Button */}
                <div>
                    <button
                        className="bg-green-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-green-600 transition"
                        onClick={() => navigate("/brand-search")}
                    >
                        Explore by Brand
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="mt-16">
                <FeatureCard />
            </section>

            {/* Footer */}
            <Footer />
        </>
    );
    return (
        <>
            <Navbar />
            <div className="text-center mt-24">
                <h1 className="text-2xl font-bold text-gray-800">Select Your Car Brand</h1>
                <BrandCard />
            </div>

            {/* Car Service Section */}
            <section className="text-center mt-12 px-4">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">Book a Car Service</h2>
                <ServiceCard />
            </section>

            {/* Car Model Navigation Button */}
            <section className="text-center mt-12 space-y-6">
                <div>
                    <button
                        className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-indigo-700 transition"
                        onClick={() => navigate("/car-model")}
                    >
                        View Car Model Details
                    </button>
                </div>

                {/* Search Page Navigation Button */}
                <div>
                    <button
                        className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-blue-600 transition"
                        onClick={() => navigate("/search")}
                    >
                        Search for Cars
                    </button>
                </div>

                {/* Brand Search Page Navigation Button */}
                <div>
                    <button
                        className="bg-green-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-green-600 transition"
                        onClick={() => navigate("/brand-search")}
                    >
                        Explore by Brand
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="mt-16">
                <FeatureCard />
            </section>

            {/* Footer */}
            <Footer />
        </>
    );
};

export default Home;
