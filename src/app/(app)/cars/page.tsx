import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";
import { CarsView } from "@/modules/cars/ui/views/cars-view";
import { DEFAULT_LIMIT } from "@/constants";

interface CarsPageProps {
  searchParams: Promise<{
    manufacturer?: string;
  }>;
}

const CarsPage = async ({ searchParams }: CarsPageProps) => {
  const { manufacturer } = await searchParams;

  console.log(manufacturer);

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.manufacturers.getByType.queryOptions({
      type: "cars",
    }),
  );
  void queryClient.prefetchInfiniteQuery(
    trpc.cars.getMany.infiniteQueryOptions({
      limit: DEFAULT_LIMIT,
      manufacturer,
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading...</div>}>
        <CarsView manufacturer={manufacturer} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default CarsPage;
