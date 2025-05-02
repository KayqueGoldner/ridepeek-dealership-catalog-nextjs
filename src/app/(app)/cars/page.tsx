import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";
import { CarsView } from "@/modules/cars/ui/views/cars-view";

const CarsPage = () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.cars.getManufacturers.queryOptions());
  void queryClient.prefetchQuery(trpc.cars.getMany.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading...</div>}>
        <CarsView />
      </Suspense>
    </HydrationBoundary>
  );
};

export default CarsPage;
