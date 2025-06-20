import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";
import { MotorcycleView } from "@/modules/bikes/ui/views/motorcycle-view";

interface bikeIdPageProps {
  params: Promise<{
    bikeId: string;
  }>;
}

const bikeIdPage = async ({ params }: bikeIdPageProps) => {
  const { bikeId } = await params;

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.bikes.getOne.queryOptions({
      id: bikeId,
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading...</div>}>
        <MotorcycleView motorcycleId={bikeId} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default bikeIdPage;
