import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { SearchParams } from "nuqs/server";

import { getQueryClient, trpc } from "@/trpc/server";
import { DEFAULT_LIMIT } from "@/constants";
import { MotorcyclesView } from "@/modules/bikes/ui/views/motorcycles-view";
import { loadMotorcyclesSearchParams } from "@/lib/search-params";

interface CarsPageProps {
  searchParams: Promise<SearchParams>;
}

const BikesPage = async ({ searchParams }: CarsPageProps) => {
  const queries = await loadMotorcyclesSearchParams(searchParams);

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.manufacturers.getByType.queryOptions({
      type: "motorcycles",
    }),
  );
  void queryClient.prefetchInfiniteQuery(
    trpc.bikes.getMany.infiniteQueryOptions({
      limit: DEFAULT_LIMIT,
      ...queries,
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading...</div>}>
        <MotorcyclesView searchParams={queries} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default BikesPage;
