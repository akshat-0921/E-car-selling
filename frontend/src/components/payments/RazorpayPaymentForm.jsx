// src/components/RazorpayPaymentForm.jsx

import { useState } from "react";
import axios from "axios";
// Icons added for visual enhancement only
import { User, Mail, Building, Banknote, CreditCard } from 'lucide-react';

// A reusable input component to keep the form code clean
const FormInput = ({ name, type, placeholder, value, onChange, icon: Icon }) => (
    <div>
        <label htmlFor={name} className="sr-only">{placeholder}</label>
        <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Icon className="h-5 w-5 text-slate-400 dark:text-slate-500" aria-hidden="true" />
            </div>
            <input
                id={name}
                type={type}
                name={name}
                placeholder={placeholder}
                required
                value={value}
                onChange={onChange}
                className="block w-full rounded-md border-slate-300 dark:border-slate-700 
                           bg-white dark:bg-slate-900 
                           py-3 pl-10 pr-3 shadow-sm transition
                           text-slate-900 dark:text-white
                           placeholder:text-slate-400 dark:placeholder:text-slate-500
                           focus:border-blue-500 focus:ring-blue-500 
                           dark:focus:border-blue-400 dark:focus:ring-blue-400 sm:text-sm"
            />
        </div>
    </div>
);


export default function RazorpayPaymentForm() {
    // --- LOGIC: Unchanged ---
    const [form, setForm] = useState({
        name: "",
        email: "",
        showroom: "",
        amount: "",
    });

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const loadRazorpay = (src) =>
        new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });

    const handleSubmit = async (e) => {
        console.log("Form submitted, attempting payment...");
        e.preventDefault();

        const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) return alert("Failed to load Razorpay SDK");

        const { data } = await axios.post("http://localhost:4000/api/payment/create-payment", {
            amount: form.amount,
        });

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: data.order.amount,
            currency: "INR",
            name: form.name,
            description: `Payment for ${form.showroom}`,
            order_id: data.order.id,
            handler: async function (response) {
                const verify = await axios.post("http://localhost:4000/api/payment/verify-razorpay", response);
                if (verify.data.success) {
                    alert("Payment Verified ✅");
                } else {
                    alert("Payment verification failed ❌");
                }
            },
            prefill: {
                name: form.name,
                email: form.email,
            },
            notes: {
                showroom: form.showroom,
            },
            theme: { color: "#2563EB" }, // Using our theme's accent color
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        // --- STYLING: Updated to a theme-aware card ---
        <div className="max-w-md mx-auto">
            <div className="rounded-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 dark:backdrop-blur-lg shadow-lg">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Secure Payment</h2>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                        Complete your booking with a secure payment via Razorpay.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* --- STYLING: Inputs are updated and use the FormInput component --- */}
                    <FormInput type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} icon={User} />
                    <FormInput type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} icon={Mail} />
                    <FormInput type="text" name="showroom" placeholder="Showroom Name" value={form.showroom} onChange={handleChange} icon={Building} />
                    <FormInput type="number" name="amount" placeholder="Amount (INR)" value={form.amount} onChange={handleChange} icon={Banknote} />

                    {/* --- STYLING: Button updated to match theme --- */}
                    <button
                        type="submit"
                        className="w-full flex justify-center items-center gap-x-2 mt-2 rounded-md bg-blue-600 px-6 py-3 
                                   text-base font-semibold text-white shadow-sm 
                                   hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 
                                   focus-visible:outline-offset-2 focus-visible:outline-blue-600 
                                   transition-all duration-300 transform hover:scale-105"
                    >
                        <CreditCard className="w-5 h-5" />
                        Proceed to Pay
                    </button>
                </form>
            </div>
        </div>
    );
}
