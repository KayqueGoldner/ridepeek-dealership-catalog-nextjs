"use client";

import { MasonryGrid } from "@/components/masonry-grid";
import { ProductCard } from "@/modules/shop/ui/components/product-card";
import { Product } from "@/payload-types";

interface ShopProductListSectionProps {
  products: Product[];
}

export const ShopProductListSection = ({
  products,
}: ShopProductListSectionProps) => {
  return (
    <section className="pt-10">
      <MasonryGrid
        items={products}
        columns={{ sm: 1, md: 2, lg: 2, xl: 2 }}
        gap={3}
        className="w-full"
        getItemId={(product) => product.id}
        renderItem={(product) => <ProductCard product={product} />}
      />
    </section>
  );
};
