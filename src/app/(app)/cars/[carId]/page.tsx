import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";
import { CarView } from "@/modules/cars/ui/views/car-view";

interface CarIdPageProps {
  params: Promise<{
    carId: string;
  }>;
}

const CarIdPage = async ({ params }: CarIdPageProps) => {
  const { carId } = await params;

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.cars.getOne.queryOptions({
      id: carId,
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading...</div>}>
        <CarView carId={carId} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default CarIdPage;
