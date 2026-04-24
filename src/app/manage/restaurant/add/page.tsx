"use client";

import React from "react";
import { RestaurantForm } from "@/components/RestaurantForm";
import Link from "next/link";

export default function AddRestaurantPage() {
  return (
    <div className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/" 
          className="brutal-btn bg-black text-white hover:bg-brand-primary hover:text-black mb-16 inline-block"
        >
          ← BACK TO SYSTEM
        </Link>

        <div className="mb-16 border-b-8 border-black pb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="brutal-badge">ACTION // 01</span>
            <span className="text-black font-black uppercase tracking-tighter text-xl">SYSTEM REGISTRATION</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-black tracking-tighter mb-8 uppercase italic leading-none">
            INITIALIZE <br />
            <span className="bg-black text-brand-primary px-4">NEW ASSET.</span>
          </h1>
          <p className="text-black text-2xl font-black uppercase leading-tight">
            PROVIDE DATA STRINGS FOR THE SPECIFIED RESTAURANT ENTITY.
          </p>
        </div>

        <RestaurantForm />
      </div>
    </div>
  );
}
