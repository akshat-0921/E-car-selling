import tucsonImage from "../../assets/cars/tucson.jpeg";
// import fortunerImage from "./assets/cars/fortuner.jpg"; // Add more as needed


import VehicleCard from "../../cards/Vehicle Card/VehicleCard"; // Ensure you import the VehicleCard component
import Filter from "../../components/filter/Filter";

const vehicleList = [
   {
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
      <div className="flex">
         <Filter />
         <div className="flex flex-col w-full max-w-screen-sm gap-4 m-10">
            {vehicleList.map((car, index) => (
               <VehicleCard key={index} vehicle={car} />
            ))}
         </div>
      </div>

   );
};

export default Vehicle;
