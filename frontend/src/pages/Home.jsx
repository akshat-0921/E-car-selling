
import Navbar from "../components/Navbar/Navbar";
import BrandCard from "../components/brandCard/Brandcard";
import ServiceCard from "../components/serviceCard/ServiceCard";

const Home = () => {
   return (
      <>
         <Navbar />
         <h1 style={{ textAlign: "center", marginTop: "80px" }}>Select Your Car Brand</h1>
         <BrandCard />
         <h2 style={{ textAlign: "center", marginTop: "40px" }}>Book a Car Service</h2>
         <ServiceCard />
      </>
   );
};

export default Home;
