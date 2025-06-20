import Image from "next/image";

import { Product } from "@/payload-types";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const image =
    typeof product.images?.[0]?.image !== "string" &&
    product.images?.[0]?.image;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative flex-1 cursor-pointer overflow-hidden">
          <Image
            src={(image && image.url) || ""}
            alt={product.name}
            width={(image && image.width) || 760}
            height={(image && image.height) || 760}
            className="object-cover transition-all duration-300"
          />
          <h1 className="truncate py-3 text-center text-lg font-bold">
            {product.name}
          </h1>
        </div>
      </DialogTrigger>
      <DialogContent className="w-max overflow-hidden rounded-none bg-transparent p-0">
        <DialogTitle
          className="sr-only"
          aria-hidden={true}
          aria-label={product.name}
        >
          {product.name}
        </DialogTitle>
        <div className="max-h-[90vh]">
          <Image
            src={(image && image.url) || ""}
            alt={product.name}
            width={(image && image.width) || 760}
            height={(image && image.height) || 760}
            className="h-full w-auto transition-all duration-300"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
