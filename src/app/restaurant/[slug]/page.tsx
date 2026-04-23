"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useRestaurants } from "@/context/RestaurantContext";
import Link from "next/link";

export default function RestaurantDetails() {
  const { slug } = useParams();
  const router = useRouter();
  const { getRestaurantBySlug } = useRestaurants();
  
  const restaurant = getRestaurantBySlug(slug as string);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-white p-12 md:p-16 rounded-[3rem] max-w-xl w-full border border-red-50 shadow-soft">
          <div className="text-7xl mb-8">🥘</div>
          <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight leading-none">Missing Ingredient!</h2>
          <p className="text-slate-500 mb-10 text-lg font-medium leading-relaxed">
            The restaurant <span className="text-brand-primary font-black bg-orange-50 px-3 py-1 rounded-xl">"{slug}"</span> doesn't seem to be on our menu.
          </p>
          <Link 
            href="/restaurants" 
            className="inline-block w-full py-5 gradient-bg text-white font-black rounded-2xl hover:scale-105 transition-all shadow-xl shadow-orange-500/20 text-lg"
          >
            Explore Listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="relative h-[45vh] md:h-[65vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-slate-100">
          {restaurant.imageUrl ? (
            <img 
              src={restaurant.imageUrl} 
              alt={restaurant.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50 text-7xl">
              🍽️
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/10 to-transparent"></div>
        </div>
        
        <div className="absolute top-10 left-10 z-10">
          <Link 
            href="/restaurants" 
            className="flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-md text-slate-900 font-black rounded-2xl border border-white shadow-xl hover:scale-110 transition-all group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white p-10 md:p-16 rounded-[3rem] border border-slate-50 shadow-soft">
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <span className="px-5 py-2 bg-teal-50 text-teal-700 text-xs font-black rounded-full border border-teal-100 uppercase tracking-widest">
                  {restaurant.type}
                </span>
                <span className="text-slate-200">•</span>
                <span className="text-slate-400 font-black text-sm uppercase tracking-tight">{restaurant.address.city}, {restaurant.address.state}</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-10 tracking-tighter leading-[0.85]">
                {restaurant.name}
              </h1>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-12 border-t-4 border-orange-50">
                <div className="space-y-3">
                  <h3 className="text-brand-primary text-xs font-black uppercase tracking-widest">Managing Partner</h3>
                  <p className="text-3xl font-black text-slate-900 tracking-tight">{restaurant.ownerName}</p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-brand-primary text-xs font-black uppercase tracking-widest">Reservation Line</h3>
                  <p className="text-3xl font-black text-slate-900 tracking-tight">{restaurant.mobile}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 md:p-16 rounded-[3rem] border border-slate-50 shadow-soft">
              <h2 className="text-4xl font-black text-slate-900 mb-10 tracking-tighter">Locate Us</h2>
              <div className="space-y-10">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 shadow-sm shadow-orange-500/5">
                    <span className="text-3xl">📍</span>
                  </div>
                  <div>
                    <p className="text-slate-900 text-2xl font-black leading-tight tracking-tight">
                      {restaurant.address.line1},<br />
                      <span className="text-slate-400 text-xl font-medium">{restaurant.address.area},</span><br />
                      <span className="text-brand-primary">{restaurant.address.city} - {restaurant.address.pincode}</span>
                    </p>
                  </div>
                </div>
                
                <div className="h-[350px] w-full bg-slate-50 rounded-[2.5rem] border border-slate-100 flex items-center justify-center text-slate-300 font-black text-2xl italic">
                  Digital Map Coming Soon
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <div className="bg-white p-10 rounded-[3rem] border border-slate-50 shadow-soft">
              <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Administrative</h3>
              <div className="space-y-5">
                <button className="w-full py-5 gradient-bg text-white font-black rounded-2xl shadow-xl shadow-orange-500/20 hover:scale-[1.03] transition-all text-lg">
                  Edit Profile
                </button>
                <button className="w-full py-5 bg-white border-2 border-slate-100 text-slate-400 font-black rounded-2xl hover:border-red-100 hover:text-red-500 transition-all text-lg">
                  Unlist Restaurant
                </button>
              </div>
            </div>

            <div className="p-10 rounded-[3rem] bg-linear-to-br from-brand-primary/5 to-teal-500/5 border border-orange-100 text-center shadow-soft">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">Support Desk</h3>
              <p className="text-slate-500 text-base font-medium mb-8 leading-relaxed px-2">
                Need help managing your listing? Our specialists are online.
              </p>
              <button className="text-brand-primary font-black hover:scale-110 transition-transform flex items-center gap-2 mx-auto text-lg group">
                Open Chat <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
