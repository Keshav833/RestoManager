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
    if (!formData.name) newErrors.name = "REQUIRED";
    if (!formData.ownerName) newErrors.ownerName = "REQUIRED";
    if (!formData.mobile) newErrors.mobile = "REQUIRED";
    if (!formData.imageUrl) newErrors.imageUrl = "REQUIRED";
    if (!formData.address.line1) newErrors["address.line1"] = "REQUIRED";
    if (!formData.address.area) newErrors["address.area"] = "REQUIRED";
    if (!formData.address.city) newErrors["address.city"] = "REQUIRED";
    if (!formData.address.state) newErrors["address.state"] = "REQUIRED";
    if (!formData.address.pincode) newErrors["address.pincode"] = "REQUIRED";
    
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
    <form onSubmit={handleSubmit} className="brutal-card p-8 md:p-16 bg-white space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="md:col-span-2">
          <h2 className="text-4xl font-black text-black uppercase italic tracking-tighter border-b-8 border-black pb-4">
            REGISTRATION // 01 // BASIC INFO
          </h2>
        </div>

        <div className="space-y-3">
          <label className="text-lg font-black uppercase italic">Restaurant Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`brutal-input w-full ${errors.name ? 'bg-brand-accent/20 border-brand-accent' : ''}`}
            placeholder="THE NOISY DINER"
          />
          {errors.name && <p className="text-brand-accent font-black text-xs uppercase">{errors.name}</p>}
        </div>

        <div className="space-y-3">
          <label className="text-lg font-black uppercase italic">System Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="brutal-input w-full appearance-none cursor-pointer"
          >
            <option value="Cafe">CAFE // 01</option>
            <option value="Fine Dining">FINE DINING // 02</option>
            <option value="Fast Food">FAST FOOD // 03</option>
            <option value="Cloud Kitchen">CLOUD KITCHEN // 04</option>
          </select>
        </div>

        <div className="space-y-3">
          <label className="text-lg font-black uppercase italic">Owner / Commander</label>
          <input
            type="text"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            className={`brutal-input w-full ${errors.ownerName ? 'bg-brand-accent/20 border-brand-accent' : ''}`}
            placeholder="NAME OF COMMANDER"
          />
          {errors.ownerName && <p className="text-brand-accent font-black text-xs uppercase">{errors.ownerName}</p>}
        </div>

        <div className="space-y-3">
          <label className="text-lg font-black uppercase italic">Direct Line</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className={`brutal-input w-full ${errors.mobile ? 'bg-brand-accent/20 border-brand-accent' : ''}`}
            placeholder="+00 0000 0000"
          />
          {errors.mobile && <p className="text-brand-accent font-black text-xs uppercase">{errors.mobile}</p>}
        </div>

        <div className="md:col-span-2 space-y-3">
          <label className="text-lg font-black uppercase italic">Visual Asset URL</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className={`brutal-input w-full ${errors.imageUrl ? 'bg-brand-accent/20 border-brand-accent' : ''}`}
            placeholder="HTTPS://ASSETS.SYSTEM/IMAGE.JPG"
          />
          {errors.imageUrl && <p className="text-brand-accent font-black text-xs uppercase">{errors.imageUrl}</p>}
        </div>

        <div className="md:col-span-2 mt-10">
          <h2 className="text-4xl font-black text-black uppercase italic tracking-tighter border-b-8 border-black pb-4">
            REGISTRATION // 02 // LOCATION
          </h2>
        </div>

        <div className="md:col-span-2 space-y-3">
          <label className="text-lg font-black uppercase italic">Primary Address</label>
          <input
            type="text"
            name="address.line1"
            value={formData.address.line1}
            onChange={handleChange}
            className={`brutal-input w-full ${errors["address.line1"] ? 'bg-brand-accent/20 border-brand-accent' : ''}`}
            placeholder="SECTOR // 01 // STREET"
          />
          {errors["address.line1"] && <p className="text-brand-accent font-black text-xs uppercase">{errors["address.line1"]}</p>}
        </div>

        <div className="space-y-3">
          <label className="text-lg font-black uppercase italic">Zone / Area</label>
          <input
            type="text"
            name="address.area"
            value={formData.address.area}
            onChange={handleChange}
            className={`brutal-input w-full ${errors["address.area"] ? 'bg-brand-accent/20 border-brand-accent' : ''}`}
            placeholder="DOWNTOWN"
          />
          {errors["address.area"] && <p className="text-brand-accent font-black text-xs uppercase">{errors["address.area"]}</p>}
        </div>

        <div className="grid grid-cols-3 gap-6 md:col-span-1">
          <div className="col-span-1 space-y-3">
            <label className="text-lg font-black uppercase italic">City</label>
            <input
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              className={`brutal-input w-full ${errors["address.city"] ? 'bg-brand-accent/20 border-brand-accent' : ''}`}
              placeholder="NY"
            />
          </div>
          <div className="col-span-1 space-y-3">
            <label className="text-lg font-black uppercase italic">State</label>
            <input
              type="text"
              name="address.state"
              value={formData.address.state}
              onChange={handleChange}
              className={`brutal-input w-full ${errors["address.state"] ? 'bg-brand-accent/20 border-brand-accent' : ''}`}
              placeholder="NY"
            />
          </div>
          <div className="col-span-1 space-y-3">
            <label className="text-lg font-black uppercase italic">ZIP</label>
            <input
              type="text"
              name="address.pincode"
              value={formData.address.pincode}
              onChange={handleChange}
              className={`brutal-input w-full ${errors["address.pincode"] ? 'bg-brand-accent/20 border-brand-accent' : ''}`}
              placeholder="000"
            />
          </div>
        </div>
      </div>

      <div className="pt-10">
        <button
          type="submit"
          className="brutal-btn w-full bg-black text-white hover:bg-brand-primary hover:text-black py-8 text-3xl italic"
        >
          INITIALIZE SYSTEM →
        </button>
      </div>
    </form>
  );
};

