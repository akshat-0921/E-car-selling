import { Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/footer"
import ScrollToTop from "../../components/ScrollToTop"

const AppLayout = () => {
   return (
      <div className="flex flex-col min-h-screen bg-gray-50">
         <ScrollToTop />
         <Navbar />
         <main className="flex-grow">
            <Outlet />
         </main>
         <Footer />
      </div>
   )
}

export default AppLayout
