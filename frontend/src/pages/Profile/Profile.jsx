// src/pages/Profile/Profile.jsx (example path)

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserThunk } from "../../redux/authSlice.js";

// --- STYLING: Icons from lucide-react for theme consistency ---
import { User, Mail, Phone, MapPin, Pen, Check, Loader, AlertCircle } from "lucide-react";

// --- STYLING: Sub-component for a themed 'not logged in' state ---
const NotLoggedInState = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <p className="mt-4 text-lg font-medium text-slate-800 dark:text-slate-200">
            Access Denied
        </p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Please log in to view and manage your profile.
        </p>
    </div>
);

const Profile = () => {
    // --- LOGIC: All state and hooks are preserved ---
    const dispatch = useDispatch();
    const userFromStore = useSelector((state) => state.auth.user);
    const loading = useSelector((state) => state.auth.loading);
    // const error = useSelector((state) => state.auth.error); // Original error state was unused, preserved here

    const [user, setUserLocal] = useState({
        firstName: "", lastName: "", email: "", phoneNumber: "", address: "",
    });
    const [editField, setEditField] = useState(null);

    useEffect(() => {
        if (userFromStore) {
            setUserLocal(userFromStore);
        }
    }, [userFromStore]);

    const handleChange = (field, value) => {
        setUserLocal((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        if (!editField) return;
        dispatch(updateUserThunk({ [editField]: user[editField] })); // Dispatch only the changed field
        setEditField(null);
    };

    // --- LOGIC: The renderField function's logic is preserved, but styling is updated ---
    const renderField = (label, fieldKey, Icon) => (
        <div className="group relative">
            <label htmlFor={fieldKey} className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                {label}
            </label>
            <div className="relative">
                 <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Icon className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                </div>
                <input
                    id={fieldKey} type="text" value={user[fieldKey] || ""} readOnly={editField !== fieldKey}
                    onChange={(e) => handleChange(fieldKey, e.target.value)}
                    className={`block w-full rounded-md border py-3 pl-10 pr-12 shadow-sm text-slate-900 dark:text-white transition-all duration-300
                        ${editField === fieldKey
                            ? "border-blue-500 bg-white dark:bg-slate-900 ring-2 ring-blue-500/50"
                            : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50"
                        }`}
                />
                 <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    {editField === fieldKey ? (
                        <button onClick={handleSave} disabled={loading} className="p-2 rounded-full text-white bg-green-600 hover:bg-green-700 disabled:bg-green-400">
                            {loading ? <Loader className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                        </button>
                    ) : (
                        <button onClick={() => setEditField(fieldKey)} className="p-2 rounded-full text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Pen className="h-4 w-4" />
                        </button>
                    )}
                 </div>
            </div>
        </div>
    );

    if (!userFromStore) {
        return <div className="bg-white dark:bg-slate-900"><NotLoggedInState /></div>;
    }

    return (
        // --- STYLING: Themed page container ---
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                {/* --- STYLING: Themed profile card --- */}
                <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-xl overflow-hidden">
                    {/* --- Card Header --- */}
                    <div className="p-8 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                        <div className="flex items-center space-x-6">
                            <div className="h-20 w-20 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <User className="h-10 w-10" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {user.firstName} {user.lastName}
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 mt-1">{user.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* --- Card Body --- */}
                    <div className="p-8 space-y-6">
                         {renderField("First Name", "firstName", User)}
                         {renderField("Last Name", "lastName", User)}
                         {renderField("Email", "email", Mail)}
                         {renderField("Phone Number", "phoneNumber", Phone)}
                         {renderField("Address", "address", MapPin)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
