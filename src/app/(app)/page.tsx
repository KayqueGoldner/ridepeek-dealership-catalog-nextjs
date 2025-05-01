import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";
import { HomeView } from "@/modules/home/ui/views/home-view";

export default function Home() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.hello.queryOptions({ text: "world" }));
  void queryClient.prefetchQuery(trpc.home.getCars.queryOptions());
  void queryClient.prefetchQuery(trpc.home.getBikes.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading...</div>}>
        <HomeView />
      </Suspense>
    </HydrationBoundary>
  );
}
