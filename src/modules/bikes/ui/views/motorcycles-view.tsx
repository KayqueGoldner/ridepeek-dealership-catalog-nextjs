"use client";

import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constants";
import { Button } from "@/components/ui/button";
import { motorcyclesSearchParamsType } from "@/lib/search-params";

import { HeaderSection } from "../sections/header-section";
import { MotorcycleListSection } from "../sections/motorcycle-list-section";

interface MotorcyclesViewProps {
  searchParams: motorcyclesSearchParamsType;
}

export const MotorcyclesView = ({ searchParams }: MotorcyclesViewProps) => {
  const trpc = useTRPC();
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery(
      trpc.bikes.getMany.infiniteQueryOptions(
        {
          limit: DEFAULT_LIMIT,
          ...searchParams,
        },
        {
          getNextPageParam: (lastPage) => {
            return lastPage.bikes.length > 0 ? lastPage.nextPage : undefined;
          },
        },
      ),
    );

  const { data: manufacturers, isLoading: isManufacturersLoading } =
    useSuspenseQuery(
      trpc.manufacturers.getByType.queryOptions({
        type: "motorcycles",
      }),
    );

  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="h-full px-10 pt-28 pb-24 md:px-16 lg:px-28">
      <HeaderSection manufacturers={manufacturers} />
      <MotorcycleListSection
        motorcycles={data.pages.flatMap((page) => page.bikes)}
      />
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
