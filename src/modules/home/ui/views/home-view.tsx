"use client";

import { useEffect, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import { Hero } from "../sections/hero";
import { SearchBar } from "../../../../components/search-bar";
import { CarsList } from "../sections/cars-list";
import { BikesList } from "../sections/bikes-list";

export const HomeView = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const trpc = useTRPC();
  const { data: cars, isLoading: carsLoading } = useSuspenseQuery(
    trpc.home.getCars.queryOptions(),
  );
  const { data: bikes, isLoading: bikesLoading } = useSuspenseQuery(
    trpc.home.getBikes.queryOptions(),
  );
  const { data: heroItems, isLoading: heroItemsLoading } = useSuspenseQuery(
    trpc.hero.getMany.queryOptions(),
  );

  return (
    <main className="h-full pb-24">
      <Hero data={heroItems} isLoading={heroItemsLoading} />
      <SearchBar />
      <CarsList cars={cars?.docs || []} isLoading={carsLoading || !isMounted} />
      <BikesList
        bikes={bikes?.docs || []}
        isLoading={bikesLoading || !isMounted}
      />
    </main>
  );
};
