import { useSearchParams } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";

const Auth = () => {
   const [searchParams, setSearchParams] = useSearchParams();
   const mode = searchParams.get("mode"); // "login" or "signup"
   const isSign = mode !== "login"; // default to signup

   return (
      <div className="flex flex-col justify-start gap-6 items-center min-h-screen bg-gray-100 py-8 px-4">
         {/* Toggle Buttons */}
         <div className="flex space-x-6">
            <button
               onClick={() => setSearchParams({ mode: "signup" })}
               className={`px-6 py-2 rounded-md shadow font-semibold transition duration-300 ${isSign ? "bg-blue-600 text-white" : "bg-gray-300"
                  }`}
            >
               Sign Up
            </button>
            <button
               onClick={() => setSearchParams({ mode: "login" })}
               className={`px-6 py-2 rounded-md shadow font-semibold transition duration-300 ${!isSign ? "bg-blue-600 text-white" : "bg-gray-300"
                  }`}
            >
               Login
            </button>
         </div>

         {/* Form Container */}
         <div className="w-full max-w-lg bg-gray-100 rounded-md">
            {isSign ? <SignUpForm /> : <LoginForm />}
         </div>
      </div>
   );
};

export default Auth;
