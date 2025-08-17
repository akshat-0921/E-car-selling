// src/components/RazorpayPaymentForm.jsx
import { useState } from "react";
import axios from "axios";

export default function RazorpayPaymentForm() {
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
        // console.log(res)
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

                    // Optional: Call booking creation or navigate
                    // navigate("/success"); or display success message
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
            theme: { color: "#1d4ed8" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div className="max-w-md mx-auto p-6 border rounded-md shadow">
            <h2 className="text-xl font-semibold mb-4">Enter Payment Details</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="text" name="name" placeholder="Full Name" required value={form.name} onChange={handleChange} className="p-2 border rounded" />
                <input type="email" name="email" placeholder="Email" required value={form.email} onChange={handleChange} className="p-2 border rounded" />
                <input type="text" name="showroom" placeholder="Showroom Name" required value={form.showroom} onChange={handleChange} className="p-2 border rounded" />
                <input type="number" name="amount" placeholder="Amount (INR)" required value={form.amount} onChange={handleChange} className="p-2 border rounded" />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Proceed to Pay
                </button>
            </form>
        </div>
    );
}
