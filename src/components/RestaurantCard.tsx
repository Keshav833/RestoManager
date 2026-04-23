import React from "react";
import Link from "next/link";
import { Restaurant } from "@/types/restaurant";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  return (
    <Link href={`/restaurant/${restaurant.slug}`} className="group">
      <div className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/10 border border-slate-100 h-full flex flex-col shadow-soft">
        <div className="relative h-48 w-full overflow-hidden">
          {restaurant.imageUrl ? (
            <img 
              src={restaurant.imageUrl} 
              alt={restaurant.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-slate-50 flex items-center justify-center text-slate-400">
              No Image
            </div>
          )}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-teal-700 text-[10px] font-black rounded-full border border-teal-100 uppercase tracking-widest">
              {restaurant.type}
            </span>
          </div>
        </div>
        
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-primary transition-colors">
            {restaurant.name}
          </h3>
          
          <p className="text-slate-500 text-sm flex items-center gap-1.5 mb-4">
            <span className="text-brand-primary">📍</span>
            {restaurant.address.area}, {restaurant.address.city}
          </p>
          
          <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium italic">By {restaurant.ownerName}</span>
            <span className="text-brand-primary text-sm font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all">
              View details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
