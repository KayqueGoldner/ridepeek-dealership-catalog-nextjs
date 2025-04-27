"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import { Hero } from "../sections/hero";
import { SearchBar } from "../sections/search-bar";
import { CarsList } from "../sections/cars-list";

export const HomeView = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const trpc = useTRPC();
  const { data: cars, isLoading: carsLoading } = useQuery(
    trpc.home.getCars.queryOptions(),
  );

  return (
    <main className="h-full pb-24">
      <Hero />
      <SearchBar />
      <CarsList cars={cars?.docs || []} isLoading={carsLoading || !isMounted} />
    </main>
  );
};
