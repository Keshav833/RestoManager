"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Restaurant } from "@/types/restaurant";
import { MOCK_RESTAURANTS } from "@/lib/mockData";
import { generateSlug } from "@/lib/utils";

interface RestaurantContextType {
  restaurants: Restaurant[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredRestaurants: Restaurant[];
  addRestaurant: (restaurant: Restaurant) => void;
  getRestaurantBySlug: (slug: string) => Restaurant | undefined;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider = ({ children }: { children: ReactNode }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(MOCK_RESTAURANTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("restaurants_v3");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setRestaurants(parsed);
      } else {
        setRestaurants(MOCK_RESTAURANTS);
      }
    } else {
      // Check if we can migrate from old key or just use mock
      const oldData = localStorage.getItem("restaurants");
      if (oldData) {
        localStorage.removeItem("restaurants"); // Clean up old data
      }
      setRestaurants(MOCK_RESTAURANTS);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("restaurants_v3", JSON.stringify(restaurants));
    }
  }, [restaurants, isLoaded]);

  const addRestaurant = (restaurant: Restaurant) => {
    setRestaurants((prev) => [...prev, restaurant]);
  };

  const getRestaurantBySlug = (slug: string) => {
    return restaurants.find((r) => r.slug === slug);
  };

  const filteredRestaurants = restaurants.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        searchQuery,
        setSearchQuery,
        filteredRestaurants,
        addRestaurant,
        getRestaurantBySlug,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurants = () => {
  const context = useContext(RestaurantContext);
  if (context === undefined) {
    throw new Error("useRestaurants must be used within a RestaurantProvider");
  }
  return context;
};
