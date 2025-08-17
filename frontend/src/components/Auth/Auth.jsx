// src/components/Auth.jsx

import { useSearchParams } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import { Car } from "lucide-react"; // Icon for branding

const Auth = () => {
   // --- LOGIC: Unchanged ---
   const [searchParams, setSearchParams] = useSearchParams();
   const mode = searchParams.get("mode") || "signup"; // Default to signup if no mode is set
   const isSign = mode === "signup";

   return (
      // --- STYLING: Themed page container ---
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900 p-4">
         <div className="w-full max-w-md">
            <div className="flex items-center justify-center gap-2 mb-6 text-3xl font-bold text-slate-900 dark:text-white">
               <Car className="h-8 w-8 text-blue-600" />
               <span>DriveIt</span>
            </div>

            {/* --- STYLING: Modern toggle switch for Login/Sign Up --- */}
            <div className="relative flex p-1 bg-slate-200 dark:bg-slate-800 rounded-lg mb-6">
               <span
                  className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-md bg-white dark:bg-slate-900 shadow-md transition-transform duration-300 ease-in-out"
                  style={{ transform: isSign ? 'translateX(0%)' : 'translateX(100%)' }}
               />
               <button
                  onClick={() => setSearchParams({ mode: "signup" })}
                  className={`relative z-10 w-1/2 py-2.5 text-sm font-semibold rounded-md transition-colors ${isSign ? "text-blue-600 dark:text-white" : "text-slate-600 dark:text-slate-300"}`}
               >
                  Sign Up
               </button>
               <button
                  onClick={() => setSearchParams({ mode: "login" })}
                  className={`relative z-10 w-1/2 py-2.5 text-sm font-semibold rounded-md transition-colors ${!isSign ? "text-blue-600 dark:text-white" : "text-slate-600 dark:text-slate-300"}`}
               >
                  Login
               </button>
            </div>

            {/* --- LOGIC: Form rendering is preserved --- */}
            <div>
               {isSign ? <SignUpForm /> : <LoginForm />}
            </div>
         </div>
      </div>
   );
};

export default Auth;
