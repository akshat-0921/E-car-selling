import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";

const Auth = () => {
   const [searchParams, setSearchParams] = useSearchParams();
   const mode = searchParams.get("mode"); // "login" or "signup"
   const isSign = mode !== "login"; // default to signup if no mode

   return (
      <div className="flex flex-col justify-center gap-0 items-center min-h-screen bg-gray-100 py-12">
         {/* Button Container */}
         <div className="flex space-x-8 mb-8">
            <button
               onClick={() => setSearchParams({ mode: "signup" })}
               className={`px-8 py-3 rounded-md shadow-md font-semibold transition-all duration-300 ${isSign ? "bg-blue-600 text-white" : "bg-gray-300"}`}
            >
               Sign Up
            </button>
            <button
               onClick={() => setSearchParams({ mode: "login" })}
               className={`px-8 py-3 rounded-md shadow-md font-semibold transition-all duration-300 ${!isSign ? "bg-blue-600 text-white" : "bg-gray-300"}`}
            >
               Login
            </button>
         </div>

         {/* Render Forms */}
         <div className="w-full max-w-lg px-6 bg-gray-100 rounded-md">
            {isSign ? <SignUpForm /> : <LoginForm />}
         </div>
      </div>
   );
};


export default Auth;
