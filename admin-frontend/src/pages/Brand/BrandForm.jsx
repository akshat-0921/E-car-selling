import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BrandForm = () => {
   const [form, setForm] = useState({ name: "", description: "" });
   const [logo, setLogo] = useState(null);
   const [preview, setPreview] = useState(null);
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const onChange = (e) => {
      setForm(f => ({ ...f, [e.target.name]: e.target.value }));
   };

   const handleFileChange = (e) => {
      const file = e.target.files[0];
      setLogo(file);
      setPreview(file ? URL.createObjectURL(file) : null);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!form.name) return toast.error("Name is required");
      setLoading(true);

      const data = new FormData();
      data.append("name", form.name);
      data.append("description", form.description);
      if (logo) data.append("logo", logo);

      try {
         await axiosInstance.post("/brand/add", data, {
            headers: { "Content-Type": "multipart/form-data" }
         });
         toast.success("Brand added!");
         navigate("/admin/brands");
      } catch (err) {
         toast.error(err?.response?.data?.msg || "Failed to add brand");
      }
      setLoading(false);
   };

   return (
      <div className="max-w-lg mx-auto mt-12 bg-white shadow-lg rounded-2xl p-8">
         <h2 className="text-2xl font-bold mb-6 text-center">Add Brand</h2>
         <form onSubmit={handleSubmit} className="space-y-5">
            <div>
               <label className="block font-semibold mb-2">Brand Name</label>
               <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Enter brand name"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400 transition"
               />
            </div>
            <div>
               <label className="block font-semibold mb-2">Description</label>
               <textarea
                  name="description"
                  value={form.description}
                  onChange={onChange}
                  placeholder="Describe this brand..."
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400 transition"
               />
            </div>
            <div>
               <label className="block font-semibold mb-2">Brand Logo</label>
               <label
                  htmlFor="brand-logo"
                  className="flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 bg-gray-50 rounded-xl h-40 hover:bg-gray-100 transition mb-3"
               >
                  {preview ? (
                     <img
                        src={preview}
                        alt="Logo preview"
                        className="h-28 object-contain"
                     />
                  ) : (
                     <div className="flex flex-col items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V8m10 8V8m-6 8V8m-7 6l7 6 7-6"></path>
                        </svg>
                        <span className="text-gray-500">Click or drag image to upload</span>
                        <span className="text-xs text-gray-400">(max 2MB, png/jpg/webp)</span>
                     </div>
                  )}
                  <input
                     id="brand-logo"
                     type="file"
                     accept="image/*"
                     onChange={handleFileChange}
                     className="hidden"
                  />
               </label>
            </div>

            <button
               type="submit"
               disabled={loading}
               className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
            >
               {loading ? "Adding..." : "Add Brand"}
            </button>
         </form>
      </div>
   );
};

export default BrandForm;
