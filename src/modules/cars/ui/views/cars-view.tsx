"use client";

import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constants";
import { Button } from "@/components/ui/button";

import { HeaderSection } from "../sections/header-section";
import { CarsListSection } from "../sections/cars-list-section";

interface CarsViewProps {
  manufacturer?: string;
  search?: string;
}

export const CarsView = ({ manufacturer, search }: CarsViewProps) => {
  const trpc = useTRPC();
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery(
      trpc.cars.getMany.infiniteQueryOptions(
        {
          limit: DEFAULT_LIMIT,
          manufacturer,
          search,
        },
        {
          getNextPageParam: (lastPage) => {
            return lastPage.cars.length > 0 ? lastPage.nextPage : undefined;
          },
        },
      ),
    );

  const { data: manufacturers, isLoading: isManufacturersLoading } =
    useSuspenseQuery(
      trpc.manufacturers.getByType.queryOptions({
        type: "cars",
      }),
    );

  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="h-full px-10 pt-28 pb-24 md:px-16 lg:px-28">
      <HeaderSection manufacturers={manufacturers} />
      <CarsListSection cars={data.pages.flatMap((page) => page.cars)} />
      {hasNextPage && (
        <div className="flex justify-center pt-8">
          <Button
            variant="outline"
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
            className="cursor-pointer"
          >
            Load more
          </Button>
        </div>
      )}
    </main>
  );
};
