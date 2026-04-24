"use client";

import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ value, onChange, placeholder = "SEARCH..." }: SearchBarProps) => {
  return (
    <div className="relative w-full max-w-md">
      {!value && (
        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-black z-10 transition-opacity duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      )}
      <input
        type="text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`brutal-input w-full ${!value ? '!pl-20' : '!pl-6'} pr-4 py-5 uppercase tracking-tighter shadow-brutal-sm focus:shadow-brutal transition-all duration-300`}
      />
    </div>


  );
};

