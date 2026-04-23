"use client";

import React from "react";
import { RestaurantForm } from "@/components/RestaurantForm";
import Link from "next/link";

export default function AddRestaurantPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center text-brand-primary hover:text-brand-secondary transition-colors mb-8 font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-black text-white tracking-tight mb-4">
            Add New Restaurant
          </h1>
          <p className="text-slate-400 text-lg">
            Fill in the details below to register a new restaurant in your management system.
          </p>
        </div>

        <RestaurantForm />
      </div>
    </div>
  );
}
