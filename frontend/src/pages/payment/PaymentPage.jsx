// src/pages/PaymentPage.jsx (example path)

import RazorpayPaymentForm from "../../components/payments/RazorpayPaymentForm";
// --- STYLING: Icon for the header to build trust ---
import { Lock } from "lucide-react";

export default function PaymentPage() {
  // --- LOGIC: The component structure is preserved ---
  return (
    // --- STYLING: Themed page container with consistent padding and background ---
    <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* --- STYLING: Themed header to provide context and trust --- */}
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
            <Lock className="h-8 w-8 text-blue-600 dark:text-blue-400" aria-hidden="true" />
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Secure Checkout
          </h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
            Complete your payment with confidence.
          </p>
        </div>

        {/* --- LOGIC: The RazorpayPaymentForm is rendered as before --- */}
        <RazorpayPaymentForm />
      </div>
    </div>
  );
}
