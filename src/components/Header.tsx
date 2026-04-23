"use client";

import React from "react";
import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";

interface HeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export const Header = ({ searchValue, onSearchChange }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-8">
        <Link href="/" className="flex-shrink-0">
          <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
            <span className="p-1.5 gradient-bg rounded-lg text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </span>
            <span className="gradient-text">RestoManager</span>
          </h1>
        </Link>

        <div className="flex-1 flex justify-center max-w-2xl hidden md:flex">
          <SearchBar 
            value={searchValue} 
            onChange={onSearchChange} 
            placeholder="Search restaurants..." 
          />
        </div>

        <Link 
          href="/manage/restaurant/add"
          className="flex-shrink-0 px-6 py-3 gradient-bg text-white font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-orange-500/20"
        >
          Add Restaurant
        </Link>
      </div>
      
      {/* Mobile search bar */}
      <div className="md:hidden px-4 pb-4">
        <SearchBar 
          value={searchValue} 
          onChange={onSearchChange} 
          placeholder="Search restaurants..." 
        />
      </div>
    </header>
  );
};
