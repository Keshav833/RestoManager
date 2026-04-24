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
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center">
        <div className="brutal-card p-16 max-w-2xl bg-brand-accent text-white">
          <div className="text-9xl mb-10">🕵️</div>
          <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-8">MISSING RECORD // 404</h2>
          <p className="text-white text-2xl font-black uppercase leading-tight mb-12">
            THE SUBJECT <span className="bg-black text-brand-primary px-4">"{slug}"</span> IS NOT PRESENT IN THE CURRENT DATABASE.
          </p>
          <Link 
            href="/restaurants" 
            className="brutal-btn bg-black text-white hover:bg-white hover:text-black w-full block text-2xl"
          >
            RETURN TO GRID
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[50vh] md:h-[70vh] w-full border-b-8 border-black overflow-hidden">
        <div className="absolute inset-0 bg-slate-200">
          {restaurant.imageUrl ? (
            <img 
              src={restaurant.imageUrl} 
              alt={restaurant.name} 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-black bg-white text-9xl font-black italic uppercase">
              NO ASSET
            </div>
          )}
        </div>
        
        <div className="absolute top-10 left-10 z-10">
          <Link 
            href="/restaurants" 
            className="brutal-btn bg-brand-primary text-black"
          >
            ← BACK TO RECORDS
          </Link>
        </div>

        <div className="absolute bottom-10 right-10 z-10">
          <span className="brutal-badge text-2xl px-6 py-3">
            {restaurant.type} // ACTIVE
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-24 relative z-20 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div className="brutal-card p-12 md:p-20 bg-white">
              <h1 className="text-6xl md:text-9xl font-black text-black mb-12 tracking-tighter leading-[0.8] uppercase italic">
                {restaurant.name}
              </h1>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 pt-16 border-t-8 border-black">
                <div className="space-y-4">
                  <h3 className="brutal-badge inline-block">COMMANDER</h3>
                  <p className="text-4xl font-black text-black tracking-tighter uppercase">{restaurant.ownerName}</p>
                </div>
                <div className="space-y-4">
                  <h3 className="brutal-badge inline-block">DIRECT LINE</h3>
                  <p className="text-4xl font-black text-black tracking-tighter uppercase">{restaurant.mobile}</p>
                </div>
              </div>
            </div>

            <div className="brutal-card p-12 md:p-20 bg-brand-secondary">
              <h2 className="text-5xl font-black text-black mb-12 tracking-tighter uppercase italic">LOCATION // GEOSPATIAL</h2>
              <div className="space-y-12">
                <div className="flex items-start gap-8">
                  <div className="w-24 h-24 bg-black text-brand-primary border-4 border-black flex items-center justify-center shrink-0 shadow-brutal-sm">
                    <span className="text-5xl font-black italic">LOC</span>
                  </div>
                  <div>
                    <p className="text-black text-3xl font-black leading-none uppercase tracking-tighter">
                      {restaurant.address.line1},<br />
                      <span className="bg-black text-white px-2">{restaurant.address.area},</span><br />
                      <span className="text-black">{restaurant.address.city} - {restaurant.address.pincode}</span>
                    </p>
                  </div>
                </div>
                
                <div className="w-full bg-white border-8 border-black overflow-hidden shadow-brutal relative group">
                  {(() => {
                    const mapImages = ['/map1.png', '/map2.png', '/image (2).png'];
                    const mapIndex = (parseInt(restaurant.id) - 1) % mapImages.length;
                    const selectedMap = mapImages[mapIndex];
                    return (
                      <>
                        <img 
                          src={selectedMap} 
                          alt="Location Map" 
                          className="w-full h-[400px] object-cover grayscale hover:grayscale-0 transition-all duration-500"
                        />
                        <div className="absolute inset-0 border-4 border-black pointer-events-none"></div>
                        <div className="absolute top-4 right-4 bg-brand-primary text-black font-black px-4 py-2 border-4 border-black shadow-brutal-sm uppercase italic text-sm">
                          LIVE FEED // POS: {restaurant.address.city.toUpperCase()}
                        </div>
                      </>
                    );
                  })()}
                </div>

              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div className="brutal-card p-10 bg-black text-white">
              <h3 className="text-3xl font-black mb-10 tracking-tighter uppercase italic text-brand-primary">SYSTEM OPS</h3>
              <div className="space-y-6">
                <button className="brutal-btn w-full bg-brand-primary text-black text-xl">
                  EDIT DATA
                </button>
                <button className="brutal-btn w-full bg-brand-accent text-white text-xl">
                  PURGE RECORD
                </button>
              </div>
            </div>

            <div className="brutal-card p-10 bg-brand-accent text-white text-center">
              <div className="text-6xl mb-6">📡</div>
              <h3 className="text-3xl font-black mb-6 tracking-tighter uppercase italic">SUPPORT RELAY</h3>
              <p className="text-white text-xl font-black mb-10 uppercase leading-tight">
                ENCOUNTERING SYSTEM ANOMALIES? CONNECT TO OPERATOR.
              </p>
              <button className="brutal-btn bg-black text-white hover:bg-white hover:text-black w-full text-xl italic">
                OPEN CHANNEL →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

