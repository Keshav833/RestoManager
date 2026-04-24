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
    <header className="sticky top-0 z-50 bg-white border-b-8 border-black">
      <div className="container mx-auto px-4 h-24 flex items-center justify-between gap-8">
        <Link href="/" className="flex-shrink-0 group">
          <h1 className="text-3xl font-black tracking-tighter text-black flex items-center gap-3">
            <span className="p-2 bg-brand-primary border-4 border-black group-hover:-rotate-3 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </span>
            <span className="uppercase italic">RestoManager</span>
          </h1>
        </Link>

        <div className="flex-1 flex justify-center max-w-2xl hidden md:flex">
          <SearchBar 
            value={searchValue} 
            onChange={onSearchChange} 
            placeholder="FIND YOUR TABLE..." 
          />
        </div>

        <Link 
          href="/manage/restaurant/add"
          className="brutal-btn hidden sm:block"
        >
          Add Restaurant
        </Link>
      </div>
      
      {/* Mobile search bar */}
      <div className="md:hidden px-4 pb-4">
        <SearchBar 
          value={searchValue} 
          onChange={onSearchChange} 
          placeholder="SEARCH..." 
        />
      </div>
    </header>
  );
};

