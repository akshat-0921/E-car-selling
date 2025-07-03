import { toast } from "react-toastify";

// Store the last message and timestamp globally
let lastToast = { msg: null, time: 0 };
const DUPLICATE_INTERVAL = 500; // ms

export function showToast(type, msg, options = {}) {
   const now = Date.now();
   if (msg === lastToast.msg && now - lastToast.time < DUPLICATE_INTERVAL) {
      // Ignore duplicate within the interval
      return;
   }
   lastToast = { msg, time: now };

   switch (type) {
      case "success":
         toast.success(msg, options);
         break;
      case "error":
         toast.error(msg, options);
         break;
      case "info":
         toast.info(msg, options);
         break;
      case "warn":
         toast.warn(msg, options);
         break;
      default:
         toast(msg, options);
   }
}
