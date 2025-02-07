import tucsonImage from "../../assets/cars/tucson.jpeg";
import VehicleCard from "../../cards/Vehicle Card/VehicleCard"; // Ensure you import the VehicleCard component
import Filter from "../../components/filter/Filter";

const vehicleList = [
   {
      vehicleId: "t34878sdi",
      brand: "Hyundai",
      name: "Tucson",
      category: "Diesel",
      price: 3500000, // Number for better formatting
      mileage: "18 to 20.09 kmpl",
      transmission: "Automatic",
      power: "1997 cc",
      seating: "5",
      image: tucsonImage // Replace with actual image URL
   },
   {
      vehicleId: "94mkdsfp9m",
      brand: "Toyota",
      name: "Fortuner",
      category: "Diesel",
      price: 4500000,
      mileage: "10 to 14 kmpl",
      transmission: "Automatic",
      power: "2755 cc",
      seating: "7",
      image: tucsonImage // Replace with actual image URL
   }
];


const Vehicle = () => {
   return (
      <div className="flex flex-col justify-start">
         <div className="flex w-screen items-start">
            <div className="w-1/4 h-screen bg-gray-100 p-4">
               <Filter />
            </div>

            <div className="flex flex-col w-3/4 overflow-auto max-w-screen gap-4 m-12">
               {vehicleList.map((car, index) => (
                  <VehicleCard key={index} vehicle={car} />
               ))}
            </div>
         </div>

      </div>

   );
};

export default Vehicle;
