import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";

import { Test } from "./test";

export default function Home() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.hello.queryOptions({ text: "world" }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="h-[200vh] bg-cyan-900">
          <Test />
        </div>
      </Suspense>
    </HydrationBoundary>
  );
}
