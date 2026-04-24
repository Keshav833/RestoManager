"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRestaurants } from "@/context/RestaurantContext";
import { RestaurantCard } from "@/components/RestaurantCard";
import { Header } from "@/components/Header";

export default function Home() {
  const { restaurants } = useRestaurants();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRestaurants = restaurants.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featuredRestaurants = filteredRestaurants.slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Header searchValue={searchTerm} onSearchChange={setSearchTerm} />

      <main className="container mx-auto px-4 py-16">
        <section className="mb-24 relative min-h-[600px] flex items-center border-8 border-black overflow-hidden group shadow-brutal hover:-translate-x-2 hover:-translate-y-2 transition-transform">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/restaurant.avif" 
              alt="Restaurant Interior" 
              className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700 scale-110 group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-brand-primary mix-blend-multiply opacity-60"></div>
          </div>

          <div className="absolute -top-10 -right-10 w-48 h-48 bg-brand-accent border-4 border-black -rotate-12 hidden md:flex items-center justify-center font-black text-black text-center text-xl uppercase p-4 z-20 shadow-brutal-sm">
            NEW SYSTEM ONLINE
          </div>
          
          <div className="relative z-10 p-12 md:p-24 bg-brand-primary/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none border-t-8 md:border-t-0 border-black mt-auto md:mt-0 w-full">
            <span className="brutal-badge mb-8 inline-block">
              V4.0 // RAW & UNFILTERED
            </span>
            <h2 className="text-6xl md:text-9xl font-black text-black mb-10 tracking-tighter leading-[0.85] uppercase italic">
              MANAGE <br />
              <span className="bg-black text-brand-primary px-4 mt-4">YOUR EMPIRE.</span>
            </h2>
            <p className="text-black text-xl md:text-2xl max-w-2xl mb-12 font-black leading-tight uppercase bg-white md:bg-transparent inline-block p-2 md:p-0 border-4 md:border-0 border-black">
              The only platform built for real restaurateurs. <br className="hidden md:block" />
              NO FLUFF. NO GLASS. JUST POWER.
            </p>
            <div className="flex flex-wrap gap-8">
              <Link 
                href="/restaurants" 
                className="brutal-btn bg-black text-white hover:bg-brand-accent hover:text-black text-xl"
              >
                BROWSE COLLECTION
              </Link>
              <Link 
                href="/manage/restaurant/add" 
                className="brutal-btn bg-white text-black hover:bg-brand-secondary text-xl"
              >
                GET STARTED →
              </Link>
            </div>
          </div>
        </section>


        <section className="space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b-8 border-black pb-12 gap-8">
            <div>
              <h3 className="text-5xl md:text-7xl font-black text-black tracking-tighter uppercase italic">
                THE FAVORITES
              </h3>
              <p className="text-black mt-4 font-bold text-xl uppercase">HANDPICKED DESTRUCTION. ONLY THE BEST.</p>
            </div>
            <Link href="/restaurants" className="brutal-btn bg-brand-secondary text-black text-lg group">
              VIEW ALL RECORDS
              <span className="ml-2 group-hover:translate-x-2 transition-transform inline-block">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {featuredRestaurants.length > 0 ? (
              featuredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))
            ) : (
              <div className="col-span-full py-32 text-center bg-white border-8 border-black shadow-brutal">
                <div className="text-8xl mb-8">🫙</div>
                <p className="text-black text-3xl font-black uppercase italic">EMPTY SPACE FOR "{searchTerm}"</p>
                <button 
                  onClick={() => setSearchTerm("")}
                  className="mt-10 brutal-btn bg-brand-primary"
                >
                  RESET SEARCH
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <footer className="border-t-8 border-black py-20 mt-32 bg-black text-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-2xl font-black uppercase italic tracking-tighter">
            RESTOMANAGER // 2026
          </p>
          <div className="flex gap-8">
            <span className="hover:text-brand-primary cursor-pointer font-black uppercase">TERMS</span>
            <span className="hover:text-brand-secondary cursor-pointer font-black uppercase">PRIVACY</span>
            <span className="hover:text-brand-accent cursor-pointer font-black uppercase">SYSTEM</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

