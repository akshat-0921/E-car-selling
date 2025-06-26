// src/pages/AddVehicle.jsx
import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddVehicle = () => {
   const { brandId } = useParams();
   const [form, setForm] = useState({
      name: "",
      model: "",
      price: "",
   });
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const onChange = (e) =>
      setForm(f => ({ ...f, [e.target.name]: e.target.value }));

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
         await axiosInstance.post("/vehicle", { ...form, brand: brandId });
         toast.success("Vehicle added!");
         navigate(`/admin/brand/${brandId}/vehicles`);
      } catch (err) {
         toast.error(err?.response?.data?.message || "Failed to add vehicle");
      }
      setLoading(false);
   };

   return (
      <div className="max-w-md mx-auto mt-12 bg-white shadow rounded p-8">
         <h2 className="text-xl font-bold mb-6">Add Vehicle</h2>
         <form onSubmit={handleSubmit} className="space-y-4">
            <input
               name="name"
               value={form.name}
               onChange={onChange}
               placeholder="Vehicle Name"
               required
               className="w-full p-2 border rounded"
            />
            <input
               name="model"
               value={form.model}
               onChange={onChange}
               placeholder="Model"
               required
               className="w-full p-2 border rounded"
            />
            <input
               name="price"
               value={form.price}
               onChange={onChange}
               placeholder="Price"
               type="number"
               required
               className="w-full p-2 border rounded"
            />
            <button
               type="submit"
               disabled={loading}
               className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
            >
               {loading ? "Adding..." : "Add Vehicle"}
            </button>
         </form>
      </div>
   );
};

export default AddVehicle;
