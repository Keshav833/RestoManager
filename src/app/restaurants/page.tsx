"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRestaurants } from "@/context/RestaurantContext";
import { RestaurantCard } from "@/components/RestaurantCard";
import { SearchBar } from "@/components/SearchBar";
import { RestaurantType } from "@/types/restaurant";

export default function ListingPage() {
  const { restaurants } = useRestaurants();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<"All" | RestaurantType>("All");

  const filteredRestaurants = restaurants.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All" || r.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-surface py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <header className="mb-16">
          <Link 
            href="/" 
            className="inline-flex items-center text-brand-primary hover:text-orange-600 transition-colors mb-10 font-black text-lg group"
          >
            <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
            Back to Dashboard
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-1 gradient-bg rounded-full"></span>
                <span className="text-brand-primary font-black uppercase tracking-widest text-sm">Our Collection</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none mb-6">
                Discover <br />
                <span className="gradient-text">New Flavors.</span>
              </h1>
              <p className="text-slate-500 text-xl max-w-xl font-medium leading-relaxed">
                Explore our curated list of the best establishments in the region.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto bg-white p-4 rounded-[2rem] border border-slate-100 shadow-soft">
              <div className="flex-1 lg:min-w-[320px]">
                <SearchBar 
                  value={searchTerm} 
                  onChange={setSearchTerm} 
                  placeholder="Find by name..." 
                />
              </div>
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-100 text-slate-900 px-8 py-3 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/5 focus:border-brand-primary transition-all font-black appearance-none"
                >
                  <option value="All">All Categories</option>
                  <option value="Cafe">Cafe</option>
                  <option value="Fine Dining">Fine Dining</option>
                  <option value="Fast Food">Fast Food</option>
                  <option value="Cloud Kitchen">Cloud Kitchen</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))
          ) : (
            <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border border-slate-100 shadow-soft">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-orange-50 border border-orange-100 text-brand-primary mb-8 animate-bounce">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-3">Zero matches!</h3>
              <p className="text-slate-500 max-w-sm mx-auto font-medium text-lg italic px-4">
                We couldn't find any results for your current combination of filters.
              </p>
              <button 
                onClick={() => {setSearchTerm(""); setSelectedType("All")}}
                className="mt-10 px-8 py-3 bg-slate-900 text-white font-black rounded-2xl hover:scale-105 transition-all shadow-xl"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
