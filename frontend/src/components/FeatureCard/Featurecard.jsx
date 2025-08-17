import { FaCar, FaRegCalendarCheck, FaTools, FaMoneyBillWave, FaShieldAlt, FaHeadset } from "react-icons/fa"

const features = [
    {
        icon: <FaHeadset className="text-4xl md:text-5xl text-rose-500" />,
        title: "Showroom Customer Service",
        description: "Get 24/7 support at showrooms to assist with your car purchases and services.",
        gradient: "from-rose-500 to-pink-500",
    },
    {
        icon: <FaCar className="text-4xl md:text-5xl text-blue-500" />,
        title: "Wide Range of Cars",
        description: "Explore a diverse collection of electric cars from top brands.",
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        icon: <FaRegCalendarCheck className="text-4xl md:text-5xl text-green-500" />,
        title: "Easy Test Drive Booking",
        description: "Book test drives effortlessly based on your preferred date and time.",
        gradient: "from-green-500 to-emerald-500",
    },
    {
        icon: <FaTools className="text-4xl md:text-5xl text-orange-500" />,
        title: "Car Servicing",
        description: "Get your car serviced at trusted showrooms with certified professionals.",
        gradient: "from-orange-500 to-amber-500",
    },
    {
        icon: <FaMoneyBillWave className="text-4xl md:text-5xl text-purple-500" />,
        title: "Flexible Payment Options",
        description: "Secure and flexible payment methods for hassle-free transactions.",
        gradient: "from-purple-500 to-violet-500",
    },
    {
        icon: <FaShieldAlt className="text-4xl md:text-5xl text-indigo-500" />,
        title: "Secure & Reliable",
        description: "Data security and reliable support to ensure a smooth experience.",
        gradient: "from-indigo-500 to-blue-600",
    },
]

const FeatureCard = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
            {/* Header Section */}
            <div className="text-center mb-12 md:mb-16">
                <div className="inline-block">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                        Why Choose{" "}
                        <span className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">DriveIt</span>
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-rose-500 to-orange-500 mx-auto rounded-full"></div>
                </div>
                <p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto">
                    Discover the advantages that make us the preferred choice for car enthusiasts
                </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100"
                        style={{
                            animationDelay: `${index * 100}ms`,
                        }}
                    >
                        {/* Background gradient overlay */}
                        <div
                            className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                        ></div>

                        {/* Content */}
                        <div className="relative p-6 md:p-8">
                            {/* Icon container */}
                            <div className="flex justify-center items-center mb-6">
                                <div
                                    className={`relative p-4 md:p-5 bg-gradient-to-br ${feature.gradient} bg-opacity-10 rounded-2xl group-hover:scale-110 transition-all duration-300`}
                                >
                                    <div className="relative z-10">{feature.icon}</div>
                                    {/* Icon glow effect */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-20 rounded-2xl blur-xl group-hover:opacity-40 transition-opacity duration-300`}
                                    ></div>
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl md:text-2xl font-bold text-gray-800 text-center mb-4 group-hover:text-gray-900 transition-colors duration-300">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 text-center leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                                {feature.description}
                            </p>
                        </div>

                        {/* Bottom accent line */}
                        <div
                            className={`h-1 w-full bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center`}
                        ></div>

                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FeatureCard
