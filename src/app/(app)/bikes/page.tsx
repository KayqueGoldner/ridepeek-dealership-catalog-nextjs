import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";
import { DEFAULT_LIMIT } from "@/constants";
import { MotorcyclesView } from "@/modules/bikes/ui/views/motorcycles-view";

interface CarsPageProps {
  searchParams: Promise<{
    manufacturer?: string;
    search?: string;
  }>;
}

const BikesPage = async ({ searchParams }: CarsPageProps) => {
  const { manufacturer, search } = await searchParams;

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.manufacturers.getByType.queryOptions({
      type: "motorcycles",
    }),
  );
  void queryClient.prefetchInfiniteQuery(
    trpc.bikes.getMany.infiniteQueryOptions({
      limit: DEFAULT_LIMIT,
      manufacturer,
      search,
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading...</div>}>
        <MotorcyclesView manufacturer={manufacturer} search={search} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default BikesPage;
