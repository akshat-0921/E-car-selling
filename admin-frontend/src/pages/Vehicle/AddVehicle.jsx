import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CATEGORIES = [
   "Petrol", "Diesel", "CNG", "Electric", "Hybrid", "Hydrogen", "LPG", "Plug-in Hybrid", "Ethanol", "Biodiesel"
];

const AddVehicle = () => {
   const { brandId } = useParams();
   const [form, setForm] = useState({
      name: "",
      category: "",
      price: ""
   });
   const [image, setImage] = useState(null);
   const [preview, setPreview] = useState(null);
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

   const handleFileChange = (e) => {
      const file = e.target.files[0];
      setImage(file);
      setPreview(file ? URL.createObjectURL(file) : null);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
         const data = new FormData();
         data.append("name", form.name);
         data.append("category", form.category);
         data.append("price", form.price);
         if (image) data.append("image", image);

         await axiosInstance.post(`/vehicle/add/${brandId}`, data, {
            headers: { "Content-Type": "multipart/form-data" }
         });
         toast.success("Vehicle added!");
         navigate(`/admin/brand/${brandId}/vehicles`);
      } catch (err) {
         toast.error(err?.response?.data?.msg || "Failed to add vehicle");
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
            <select
               name="category"
               value={form.category}
               onChange={onChange}
               required
               className="w-full p-2 border rounded"
            >
               <option value="">Select category</option>
               {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
               ))}
            </select>
            <input
               name="price"
               value={form.price}
               onChange={onChange}
               placeholder="Price"
               type="number"
               required
               className="w-full p-2 border rounded"
            />

            <label className="block font-semibold mb-2">Vehicle Image</label>
            <label
               htmlFor="vehicle-image"
               className="flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 bg-gray-50 rounded-xl h-32 hover:bg-gray-100 transition mb-3"
            >
               {preview ? (
                  <img src={preview} alt="Vehicle preview" className="h-24 object-contain" />
               ) : (
                  <span className="text-gray-500">Click or drag image to upload</span>
               )}
               <input
                  id="vehicle-image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
               />
            </label>

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
