"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constants";
import { Button } from "@/components/ui/button";

import { HeaderSection } from "../sections/header-section";
import { ShopProductListSection } from "@/modules/shop/ui/sections/shop-product-list-section";

export const ShopView = () => {
  const trpc = useTRPC();
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery(
      trpc.shop.getMany.infiniteQueryOptions(
        {
          limit: DEFAULT_LIMIT,
        },
        {
          getNextPageParam: (lastPage) => {
            return lastPage.products.length > 0 ? lastPage.nextPage : undefined;
          },
        },
      ),
    );

  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="h-full px-10 pt-28 pb-24 md:px-16 lg:px-28">
      <HeaderSection />
      <ShopProductListSection
        products={data.pages.flatMap((page) => page.products)}
      />
      {hasNextPage && (
        <div className="flex justify-center pt-8">
          <Button
            variant="outline"
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
            className="cursor-pointer"
          >
            Load more
          </Button>
        </div>
      )}
    </main>
  );
};
