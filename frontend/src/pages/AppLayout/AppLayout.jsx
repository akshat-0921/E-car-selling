// src/layouts/AppLayout.jsx

import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/footer";
import ScrollToTop from "../../components/ScrollToTop";

const AppLayout = () => {
   // --- LOGIC: The component structure and logic are preserved ---
   return (
      // --- STYLING: The root container now has a theme-aware background ---
      <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200">
         <ScrollToTop />
         <Navbar />

         {/* --- STYLING: The 'main' tag ensures content grows to fill available space --- */}
         <main className="flex-grow">
            <Outlet />
         </main>

         <Footer />
      </div>
   );
};

export default AppLayout;
