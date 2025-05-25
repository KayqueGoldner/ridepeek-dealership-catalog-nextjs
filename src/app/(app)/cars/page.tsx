import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { SearchParams } from "nuqs/server";

import { getQueryClient, trpc } from "@/trpc/server";
import { CarsView } from "@/modules/cars/ui/views/cars-view";
import { DEFAULT_LIMIT } from "@/constants";
import { loadCarsSearchParams } from "@/lib/search-params";

interface CarsPageProps {
  searchParams: Promise<SearchParams>;
}

const CarsPage = async ({ searchParams }: CarsPageProps) => {
  const queries = await loadCarsSearchParams(searchParams);

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.manufacturers.getByType.queryOptions({
      type: "cars",
    }),
  );
  void queryClient.prefetchInfiniteQuery(
    trpc.cars.getMany.infiniteQueryOptions({
      limit: DEFAULT_LIMIT,
      ...queries,
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading...</div>}>
        <CarsView searchParams={queries} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default CarsPage;
