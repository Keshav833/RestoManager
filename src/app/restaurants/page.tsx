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
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <header className="mb-20">
          <Link 
            href="/" 
            className="brutal-btn bg-black text-white hover:bg-brand-primary hover:text-black mb-16 inline-block"
          >
            ← BACK TO SYSTEM
          </Link>

          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-12 border-b-8 border-black pb-12">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <span className="brutal-badge">DATASET // 01</span>
                <span className="text-black font-black uppercase tracking-tighter text-xl">COLLECTION VIEW</span>
              </div>
              <h1 className="text-6xl md:text-9xl font-black text-black tracking-tighter leading-[0.8] mb-8 uppercase italic">
                EXPLORE <br />
                <span className="bg-black text-brand-secondary px-4">THE GRID.</span>
              </h1>
              <p className="text-black text-2xl font-black uppercase leading-tight">
                Curated intelligence on local establishments. 
                STATUS: ACTIVE.
              </p>
            </div>
            
            <div className="w-full xl:w-auto bg-black border-8 border-black p-1 shadow-brutal">
              <div className="flex flex-col md:flex-row bg-brand-primary p-6 gap-8">
                <div className="flex-1 space-y-3">
                  <label className="text-black font-black uppercase text-sm italic tracking-widest">01 // STRING_SEARCH</label>
                  <SearchBar 
                    value={searchTerm} 
                    onChange={setSearchTerm} 
                    placeholder="ENTER NAME..." 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-black font-black uppercase text-sm italic tracking-widest">02 // CATEGORY_SELECT</label>
                  <div className="relative">
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value as any)}
                      className="brutal-input w-full md:w-[250px] appearance-none cursor-pointer bg-white pr-16 py-5"
                    >
                      <option value="All">ALL CATEGORIES</option>
                      <option value="Cafe">CAFE</option>
                      <option value="Fine Dining">FINE DINING</option>
                      <option value="Fast Food">FAST FOOD</option>
                      <option value="Cloud Kitchen">CLOUD KITCHEN</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-black">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))
          ) : (
            <div className="col-span-full py-40 text-center bg-white border-8 border-black shadow-brutal">
              <div className="text-9xl mb-10">🕵️</div>
              <h3 className="text-5xl font-black text-black mb-6 uppercase italic">NO DATA FOUND</h3>
              <p className="text-black max-w-lg mx-auto font-black text-2xl uppercase mb-12">
                THE SPECIFIED PARAMETERS RETURNED ZERO RESULTS.
              </p>
              <button 
                onClick={() => {setSearchTerm(""); setSelectedType("All")}}
                className="brutal-btn bg-brand-accent text-white"
              >
                PURGE FILTERS
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

