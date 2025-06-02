import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";
import { BikeView } from "@/modules/bikes/ui/views/car-view";

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
        <BikeView bikeId={bikeId} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default bikeIdPage;
