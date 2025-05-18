import { Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/footer"

const AppLayout = () => {
   return (
      <div>
         <Navbar />
         <Outlet />
         <Footer />
      </div>
   )
}

export default AppLayout
