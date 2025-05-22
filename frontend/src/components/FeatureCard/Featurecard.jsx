
import { FaCar, FaRegCalendarCheck, FaTools, FaMoneyBillWave, FaShieldAlt, FaHeadset } from "react-icons/fa"
const features = [
    {
        icon: <FaHeadset className="text-5xl text-rose-500" />,
        title: "Showroom Customer Service",
        description: "Get 24/7 support at showrooms to assist with your car purchases and services.",
    },
    {
        icon: <FaCar className="text-5xl text-rose-500" />,
        title: "Wide Range of Cars",
        description: "Explore a diverse collection of electric cars from top brands.",
    },
    {
        icon: <FaRegCalendarCheck className="text-5xl text-rose-500" />,
        title: "Easy Test Drive Booking",
        description: "Book test drives effortlessly based on your preferred date and time.",
    },
    {
        icon: <FaTools className="text-5xl text-rose-500" />,
        title: "Car Servicing",
        description: "Get your car serviced at trusted showrooms with certified professionals.",
    },
    {
        icon: <FaMoneyBillWave className="text-5xl text-rose-500" />,
        title: "Flexible Payment Options",
        description: "Secure and flexible payment methods for hassle-free transactions.",
    },
    {
        icon: <FaShieldAlt className="text-5xl text-rose-500" />,
        title: "Secure & Reliable",
        description: "Data security and reliable support to ensure a smooth experience.",
    },
]

const FeatureCard = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-16 bg-gray-50 rounded-3xl">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-3">
                    Why Choose <span className="text-rose-600">DriveIt</span>
                </h2>
                <div className="h-1 w-24 bg-rose-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
                    >
                        <div className="p-8">
                            <div className="flex justify-center items-center mb-6">
                                <div className="p-4 bg-rose-50 rounded-full group-hover:bg-rose-100 transition-colors duration-300">
                                    {feature.icon}
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 text-center mb-3 group-hover:text-rose-600 transition-colors duration-300">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 text-center leading-relaxed">{feature.description}</p>
                        </div>
                        <div className="h-1 w-full bg-gradient-to-r from-rose-400 to-rose-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FeatureCard
