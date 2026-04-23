"use client";

import React, { useState } from "react";
import { useRestaurants } from "@/context/RestaurantContext";
import { useRouter } from "next/navigation";
import { RestaurantType, Restaurant } from "@/types/restaurant";
import { generateSlug } from "@/lib/utils";

export const RestaurantForm = () => {
  const { addRestaurant } = useRestaurants();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    ownerName: "",
    mobile: "",
    type: "Cafe" as RestaurantType,
    imageUrl: "",
    address: {
      line1: "",
      area: "",
      city: "",
      state: "",
      pincode: "",
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes("address.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.ownerName) newErrors.ownerName = "Owner name is required";
    if (!formData.mobile) newErrors.mobile = "Mobile number is required";
    if (!formData.imageUrl) newErrors.imageUrl = "Image URL is required";
    if (!formData.address.line1) newErrors["address.line1"] = "Address Line 1 is required";
    if (!formData.address.area) newErrors["address.area"] = "Area is required";
    if (!formData.address.city) newErrors["address.city"] = "City is required";
    if (!formData.address.state) newErrors["address.state"] = "State is required";
    if (!formData.address.pincode) newErrors["address.pincode"] = "Pincode is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substr(2, 9);
    const slug = generateSlug(formData.name);
    
    addRestaurant({
      ...formData,
      id,
      slug,
    });
    
    router.push("/restaurants");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-soft">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4 md:col-span-2">
          <h2 className="text-2xl font-black text-slate-900 border-b-4 border-orange-100 pb-2 inline-block">Basic Information</h2>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Restaurant Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full bg-slate-50 border ${errors.name ? 'border-red-500' : 'border-slate-100'} rounded-2xl px-5 py-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-orange-500/5 focus:border-brand-primary transition-all font-medium`}
            placeholder="e.g. The Spicy Bistro"
          />
          {errors.name && <p className="text-red-500 text-xs font-medium">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Restaurant Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-orange-500/5 focus:border-brand-primary transition-all font-medium appearance-none"
          >
            <option value="Cafe">☕ Cafe</option>
            <option value="Fine Dining">🍴 Fine Dining</option>
            <option value="Fast Food">🍔 Fast Food</option>
            <option value="Cloud Kitchen">☁️ Cloud Kitchen</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Owner Name</label>
          <input
            type="text"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            className={`w-full bg-slate-50 border ${errors.ownerName ? 'border-red-500' : 'border-slate-100'} rounded-2xl px-5 py-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-orange-500/5 focus:border-brand-primary transition-all font-medium`}
            placeholder="John Doe"
          />
          {errors.ownerName && <p className="text-red-500 text-xs font-medium">{errors.ownerName}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className={`w-full bg-slate-50 border ${errors.mobile ? 'border-red-500' : 'border-slate-100'} rounded-2xl px-5 py-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-orange-500/5 focus:border-brand-primary transition-all font-medium`}
            placeholder="9876543210"
          />
          {errors.mobile && <p className="text-red-500 text-xs font-medium">{errors.mobile}</p>}
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className={`w-full bg-slate-50 border ${errors.imageUrl ? 'border-red-500' : 'border-slate-100'} rounded-2xl px-5 py-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-orange-500/5 focus:border-brand-primary transition-all font-medium`}
            placeholder="https://images.unsplash.com/..."
          />
          {errors.imageUrl && <p className="text-red-500 text-xs font-medium">{errors.imageUrl}</p>}
        </div>

        <div className="space-y-4 md:col-span-2 mt-8">
          <h2 className="text-2xl font-black text-slate-900 border-b-4 border-orange-100 pb-2 inline-block">Address Details</h2>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Address Line 1</label>
          <input
            type="text"
            name="address.line1"
            value={formData.address.line1}
            onChange={handleChange}
            className={`w-full bg-slate-50 border ${errors["address.line1"] ? 'border-red-500' : 'border-slate-100'} rounded-2xl px-5 py-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-orange-500/5 focus:border-brand-primary transition-all font-medium`}
            placeholder="123, Main Street"
          />
          {errors["address.line1"] && <p className="text-red-500 text-xs font-medium">{errors["address.line1"]}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Area</label>
          <input
            type="text"
            name="address.area"
            value={formData.address.area}
            onChange={handleChange}
            className={`w-full bg-slate-50 border ${errors["address.area"] ? 'border-red-500' : 'border-slate-100'} rounded-2xl px-5 py-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-orange-500/5 focus:border-brand-primary transition-all font-medium`}
            placeholder="Downtown"
          />
          {errors["address.area"] && <p className="text-red-500 text-xs font-medium">{errors["address.area"]}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">City</label>
          <input
            type="text"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            className={`w-full bg-slate-50 border ${errors["address.city"] ? 'border-red-500' : 'border-slate-100'} rounded-2xl px-5 py-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-orange-500/5 focus:border-brand-primary transition-all font-medium`}
            placeholder="New York"
          />
          {errors["address.city"] && <p className="text-red-500 text-xs font-medium">{errors["address.city"]}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">State</label>
          <input
            type="text"
            name="address.state"
            value={formData.address.state}
            onChange={handleChange}
            className={`w-full bg-slate-50 border ${errors["address.state"] ? 'border-red-500' : 'border-slate-100'} rounded-2xl px-5 py-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-orange-500/5 focus:border-brand-primary transition-all font-medium`}
            placeholder="NY"
          />
          {errors["address.state"] && <p className="text-red-500 text-xs font-medium">{errors["address.state"]}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Pincode</label>
          <input
            type="text"
            name="address.pincode"
            value={formData.address.pincode}
            onChange={handleChange}
            className={`w-full bg-slate-50 border ${errors["address.pincode"] ? 'border-red-500' : 'border-slate-100'} rounded-2xl px-5 py-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-orange-500/5 focus:border-brand-primary transition-all font-medium`}
            placeholder="10001"
          />
          {errors["address.pincode"] && <p className="text-red-500 text-xs font-medium">{errors["address.pincode"]}</p>}
        </div>
      </div>

      <div className="pt-8">
        <button
          type="submit"
          className="w-full py-5 gradient-bg text-white font-black rounded-[1.5rem] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-orange-500/30 text-xl tracking-tight"
        >
          Register Restaurant
        </button>
      </div>
    </form>
  );
};
