"use client";

import { Hero } from "../sections/hero";
import { SearchBar } from "../sections/search-bar";

export const HomeView = () => {
  return (
    <main className="h-full">
      <Hero />
      <SearchBar />
    </main>
  );
};
