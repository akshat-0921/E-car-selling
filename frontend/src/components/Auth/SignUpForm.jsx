// src/components/SignUpForm.jsx

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// --- STYLING: Icons for inputs ---
import { User, Mail, Lock, Phone, Eye, EyeOff } from "lucide-react";

const SignUpForm = () => {
    // --- LOGIC: All state and hooks are preserved ---
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const navigate = useNavigate();

    const API = import.meta.env.VITE_BACKEND_URL;

    const sendOtpHandler = async () => {
        if (!email) return alert("Please enter your email to receive OTP!");
        try {
            const res = await axios.post(`${API}/user/send-otp`, { email });
            alert("OTP sent to your email!");
            setOtpSent(true);
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Failed to send OTP");
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!otpSent) return alert("Please send OTP to your email first!");
        if (!otp || otp.length !== 6) return alert("Please enter a valid 6 digit OTP");
        try {
            const res = await axios.post(`${API}/user/register`, {
                firstName, lastName, email, phoneNumber, password, otp,
            });
            alert(res.data.message || "Registered successfully!");
            navigate("/auth?mode=login"); // Navigate to login after successful signup
        } catch (error) {
            alert(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        // --- STYLING: Themed form container ---
        <form onSubmit={submitHandler} className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Create an Account</h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Join DriveIt today!</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput id="firstName" type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} icon={User} />
                <FormInput id="lastName" type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} icon={User} />
            </div>
            
            <FormInput id="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} icon={Mail} />
            <FormInput id="phoneNumber" type="tel" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} icon={Phone} />
            <FormInput id="password" type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} icon={Lock} togglePassword={() => setShowPassword(!showPassword)} showPassword={showPassword} />
            
            {!otpSent ? (
                <button type="button" onClick={sendOtpHandler} className="w-full flex justify-center items-center rounded-md bg-green-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-green-700 transition-colors">
                    Send OTP
                </button>
            ) : (
                <FormInput id="otp" type="text" placeholder="Enter 6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} icon={User} />
            )}
            
            <button
                type="submit"
                disabled={!otpSent}
                className="w-full flex justify-center items-center rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors disabled:bg-slate-400 dark:disabled:bg-slate-700 disabled:cursor-not-allowed"
            >
                Sign Up
            </button>
        </form>
    );
};

export default SignUpForm;

// --- STYLING: Helper component for consistent inputs ---
const FormInput = ({ id, type, placeholder, value, onChange, icon: Icon, togglePassword, showPassword }) => (
    <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon className="h-5 w-5 text-slate-400 dark:text-slate-500" />
        </div>
        <input
            id={id} type={type} placeholder={placeholder} required value={value} onChange={onChange}
            className="block w-full rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 py-3 pl-10 pr-4 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 text-slate-900 dark:text-white"
        />
        {togglePassword && (
            <button type="button" onClick={togglePassword} className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-700">
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
        )}
    </div>
);
