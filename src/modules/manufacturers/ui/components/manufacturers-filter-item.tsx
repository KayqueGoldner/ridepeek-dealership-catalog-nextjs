import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Manufacturer } from "@/payload-types";

interface ManufacturersFilterItemProps {
  data: Manufacturer;
  isActive: boolean;
  onClick: () => void;
}

export const ManufacturersFilterItem = ({
  data,
  isActive,
  onClick,
}: ManufacturersFilterItemProps) => {
  return (
    <Button
      variant="outline"
      className={cn(
        "size-auto cursor-pointer rounded-none px-5 py-2 text-base",
        isActive && "border-black",
      )}
      onClick={onClick}
    >
      {typeof data.logo !== "string" && (
        <Image
          src={data.logo?.url!}
          alt={data.name}
          width={data.logo?.width || 60}
          height={data.logo?.height || 60}
          className="size-8 object-cover"
        />
      )}
      {data.name}
    </Button>
  );
};
