import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";
import { ShopView } from "@/modules/shop/ui/views/shop-view";

const ShopPage = async () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.manufacturers.getByType.queryOptions({
      type: "cars",
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading...</div>}>
        <ShopView />
      </Suspense>
    </HydrationBoundary>
  );
};

export default ShopPage;
