import { useNavigate } from "react-router-dom"

const BrandSearchPage = () => {
    const navigate = useNavigate()

    const brandDetails = {
        name: "Audi",
        carsAvailable: 8,
        rating: 4.6,
        description:
            "Audi is a German luxury car manufacturer known for premium vehicles with cutting-edge technology and performance.",
        highlights: ["Luxurious interiors", "Advanced infotainment system", "Quattro all-wheel drive", "High resale value"],
        faqs: [
            {
                question: "What is the starting price of Audi cars in India?",
                answer: "The starting price is around ₹43 lakhs.",
            },
            {
                question: "Are Audi cars good for long drives?",
                answer: "Yes, they are equipped with comfort and performance features ideal for long-distance travel.",
            },
        ],
    }

    return (
        <>
            <div className="max-w-5xl mx-auto p-8 my-12 bg-white shadow-xl rounded-2xl">
                <div className="border-b border-gray-200 pb-6 mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">{brandDetails.name} Cars in India</h1>
                    <div className="flex items-center gap-6 mt-4">
                        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                            <span className="text-gray-600">Available Models:</span>
                            <span className="font-semibold text-gray-900">{brandDetails.carsAvailable}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-50 px-4 py-2 rounded-full">
                            <span className="text-yellow-500 text-lg">★</span>
                            <span className="font-semibold text-gray-900">{brandDetails.rating}/5</span>
                        </div>
                    </div>
                </div>

                <div className="mb-10">
                    <p className="text-gray-700 text-lg leading-relaxed mb-8">{brandDetails.description}</p>

                    <button
                        className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-8 py-3 rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                        onClick={() => navigate("/car-model")}
                    >
                        View Car Models
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-10 mb-10">
                    <div className="bg-gray-50 p-6 rounded-xl">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                            <span className="bg-indigo-100 text-indigo-700 p-2 rounded-lg mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                            Key Highlights
                        </h2>
                        <ul className="space-y-3">
                            {brandDetails.highlights.map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-indigo-500 mr-2">•</span>
                                    <span className="text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                            <span className="bg-indigo-100 text-indigo-700 p-2 rounded-lg mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                            FAQs
                        </h2>
                        <div className="space-y-4">
                            {brandDetails.faqs.map((faq, index) => (
                                <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                                    <p className="font-semibold text-gray-800 mb-1">Q: {faq.question}</p>
                                    <p className="text-gray-600">A: {faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BrandSearchPage
