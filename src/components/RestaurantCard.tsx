import React from "react";
import Link from "next/link";
import { Restaurant } from "@/types/restaurant";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  return (
    <Link href={`/restaurant/${restaurant.slug}`} className="group block h-full">
      <div className="brutal-card h-full flex flex-col overflow-hidden">
        <div className="relative h-56 w-full border-b-4 border-black overflow-hidden">
          {restaurant.imageUrl ? (
            <img 
              src={restaurant.imageUrl} 
              alt={restaurant.name} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-slate-200 flex items-center justify-center text-black font-black uppercase italic">
              NO IMAGE FOUND
            </div>
          )}
          <div className="absolute top-4 right-4">
            <span className="brutal-badge">
              {restaurant.type}
            </span>
          </div>
        </div>
        
        <div className="p-6 flex-1 flex flex-col bg-white group-hover:bg-brand-secondary transition-colors duration-100">
          <h3 className="text-2xl font-black text-black mb-2 uppercase tracking-tight">
            {restaurant.name}
          </h3>
          
          <p className="text-black text-sm font-bold flex items-center gap-2 mb-6">
            <span className="bg-black text-white p-1 text-[10px]">LOC</span>
            {restaurant.address.area}, {restaurant.address.city}
          </p>
          
          <div className="mt-auto pt-4 border-t-4 border-black flex items-center justify-between">
            <span className="text-xs font-black uppercase italic">OWNER: {restaurant.ownerName}</span>
            <span className="bg-black text-white px-3 py-1 text-xs font-black uppercase tracking-widest group-hover:bg-brand-primary group-hover:text-black transition-colors">
              EXPLORE →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

