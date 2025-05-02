"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import { HeaderSection } from "../sections/header-section";
import { CarsListSection } from "../sections/cars-list-section";

export const CarsView = () => {
  const trpc = useTRPC();
  const { data, isLoading } = useSuspenseQuery(
    trpc.cars.getMany.queryOptions(),
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="h-full px-10 pt-28 pb-24 md:px-16 lg:px-28">
      <HeaderSection manufacturers={data.manufacturers} />
      <CarsListSection cars={data.cars} />
    </main>
  );
};
