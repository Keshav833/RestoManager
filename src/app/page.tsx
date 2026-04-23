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
    <div className="min-h-screen bg-surface">
      <Header searchValue={searchTerm} onSearchChange={setSearchTerm} />

      <main className="container mx-auto px-4 py-12">
        <section className="mb-20 text-center relative overflow-hidden py-24 rounded-[3rem] bg-orange-50/30 border border-orange-100/50">
          <div className="absolute inset-0 bg-brand-primary/5 blur-3xl rounded-full -top-24 -left-24 w-96 h-96"></div>
          <div className="absolute inset-0 bg-teal-500/5 blur-3xl rounded-full -bottom-24 -right-24 w-96 h-96"></div>
          
          <div className="relative z-10 px-4">
            <span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-700 text-xs font-black rounded-full border border-teal-100 uppercase tracking-widest mb-6">
              Welcome to RestoManager
            </span>
            <h2 className="text-5xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.9]">
              Managing <br />
              <span className="gradient-text">Great Food.</span>
            </h2>
            <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
              The all-in-one platform for modern restaurateurs. 
              Track, manage, and scale your restaurant empire with a single click.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link 
                href="/restaurants" 
                className="px-10 py-5 gradient-bg text-white font-black rounded-2xl hover:scale-105 transition-all shadow-xl shadow-orange-500/20 text-lg tracking-tight"
              >
                Browse Collection
              </Link>
              <Link 
                href="/manage/restaurant/add" 
                className="px-10 py-5 bg-white border border-slate-200 text-slate-900 font-black rounded-2xl hover:bg-slate-50 transition-all shadow-sm text-lg tracking-tight"
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>

        <section className="space-y-12">
          <div className="flex items-end justify-between border-b-4 border-orange-50 pb-8 px-2">
            <div>
              <h3 className="text-4xl font-black text-slate-900 tracking-tight">Our Favorites</h3>
              <p className="text-slate-500 mt-2 font-medium text-lg italic">The cream of the crop, handpicked for you.</p>
            </div>
            <Link href="/restaurants" className="text-brand-primary font-black flex items-center gap-2 hover:translate-x-2 transition-transform hidden sm:flex text-lg group">
              View all 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredRestaurants.length > 0 ? (
              featuredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))
            ) : (
              <div className="col-span-full py-24 text-center bg-white rounded-[2.5rem] border border-slate-100 shadow-soft">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-slate-400 text-xl font-bold italic">No results for "{searchTerm}"</p>
                <button 
                  onClick={() => setSearchTerm("")}
                  className="mt-6 text-brand-primary font-bold underline"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
          
          <div className="pt-8 text-center sm:hidden">
            <Link href="/restaurants" className="inline-flex px-10 py-4 bg-white border border-slate-200 text-brand-primary font-black rounded-2xl shadow-sm">
              View All Restaurants
            </Link>
          </div>
        </section>
      </main>
      
      <footer className="border-t border-slate-100 py-16 mt-24 text-center bg-white/50">
        <p className="text-slate-400 font-bold tracking-tight">
          © 2026 <span className="text-slate-900">RestoManager</span>. Crafting delightful experiences.
        </p>
      </footer>
    </div>
  );
}
