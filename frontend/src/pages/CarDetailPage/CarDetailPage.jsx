// import Navbar from "../../components/NavBar/Navbar"
import CarDetail from "../../components/CarModel/CarDetails"
// import Footer from "../../components/Footer/footer"

const carData = {
    name: "Audi A6",
    price: "70,00,000",
    image: "https://source.unsplash.com/800x500/?audi,car",
    fuelType: "Petrol",
    transmission: "Automatic",
    mileage: "14",
    topSpeed: "250",
    features: ["Sunroof", "Touchscreen Infotainment", "360-degree Camera", "Wireless Charging", "ADAS Safety System"],
}

const CarDetailPage = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* <Navbar /> */}
            <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6">
                <CarDetail car={carData} />
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default CarDetailPage
