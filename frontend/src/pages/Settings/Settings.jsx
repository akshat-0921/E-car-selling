// src/pages/SettingsPage.jsx (example path)

import { Link } from "react-router-dom";
// --- STYLING: Icons for visual enhancement and consistency ---
import { User, KeyRound, History, Trash2, AlertTriangle, ChevronRight } from "lucide-react";

// --- STYLING: Helper component for consistent section layout ---
const SettingsSection = ({ icon: Icon, title, description, children, isDanger = false }) => (
   <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-200 dark:border-slate-700 py-8 ${isDanger ? 'first:border-red-200 dark:first:border-red-900/50' : 'first:border-t-0 first:pt-0'}`}>
      <div className="md:col-span-1">
         <h3 className={`text-lg font-semibold flex items-center gap-3 ${isDanger ? 'text-red-700 dark:text-red-400' : 'text-slate-900 dark:text-white'}`}>
            <Icon className="w-6 h-6" />
            {title}
         </h3>
         <p className={`mt-1 text-sm ${isDanger ? 'text-red-600 dark:text-red-500' : 'text-slate-600 dark:text-slate-400'}`}>
            {description}
         </p>
      </div>
      <div className="md:col-span-2">
         <div className={`p-6 rounded-xl ${isDanger ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30' : 'bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700'}`}>
            {children}
         </div>
      </div>
   </div>
);

const SettingsPage = () => {
   // Note: User data is hardcoded as in the original component. In a real app, this would come from a state/context.
   const user = {
      name: "Ankit Shome",
      email: "ankit@example.com",
   };

   return (
      // --- STYLING: Themed page container ---
      <div className="bg-white dark:bg-slate-900 min-h-screen">
         <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
               <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Settings</h1>
               <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
                  Manage your account settings, profile, and data.
               </p>
            </div>

            <div className="divide-y divide-slate-200 dark:divide-slate-700">
               {/* Profile Section */}
               <SettingsSection
                  icon={User}
                  title="Profile Information"
                  description="View and edit your personal details."
               >
                  <div className="space-y-2 text-slate-700 dark:text-slate-300">
                     <p>Name: <span className="font-semibold text-slate-900 dark:text-white">{user.name}</span></p>
                     <p>Email: <span className="font-semibold text-slate-900 dark:text-white">{user.email}</span></p>
                  </div>
                  <Link to="/profile" className="inline-flex items-center gap-x-1 mt-4 text-sm font-semibold text-blue-600 hover:text-blue-500">
                     Go to Profile <ChevronRight className="w-4 h-4" />
                  </Link>
               </SettingsSection>

               {/* Change Password Section */}
               <SettingsSection
                  icon={KeyRound}
                  title="Change Password"
                  description="Update your password for better security."
               >
                  <form className="flex flex-col gap-4">
                     <input type="password" placeholder="Current Password" className="form-input w-full rounded-md dark:bg-slate-900 dark:border-slate-600" />
                     <input type="password" placeholder="New Password" className="form-input w-full rounded-md dark:bg-slate-900 dark:border-slate-600" />
                     <input type="password" placeholder="Confirm New Password" className="form-input w-full rounded-md dark:bg-slate-900 dark:border-slate-600" />
                     <button type="submit" className="self-start px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                        Update Password
                     </button>
                  </form>
               </SettingsSection>

               {/* Delete Search History Section */}
               <SettingsSection
                  icon={History}
                  title="Search History"
                  description="Permanently clear your past search queries."
               >
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                     <p className="text-sm text-slate-600 dark:text-slate-400">This action cannot be undone.</p>
                     <button className="px-4 py-2 bg-red-100 text-red-700 text-sm font-semibold rounded-lg hover:bg-red-200 transition-colors dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-900">
                        Clear History
                     </button>
                  </div>
               </SettingsSection>

               {/* Delete Account Section */}
               <SettingsSection
                  icon={AlertTriangle}
                  title="Delete Account"
                  description="Permanently delete your account and all associated data."
                  isDanger={true}
               >
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                     <p className="text-sm text-red-700 dark:text-red-300">This action is irreversible.</p>
                     <button className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors">
                        Delete My Account
                     </button>
                  </div>
               </SettingsSection>
            </div>
         </div>
      </div>
   );
};

export default SettingsPage;
