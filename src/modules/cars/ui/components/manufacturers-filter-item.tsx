import { Button } from "@/components/ui/button";
import { Manufacturer } from "@/payload-types";
import Image from "next/image";

interface ManufacturersFilterItemProps {
  data: Manufacturer;
}

export const ManufacturersFilterItem = ({
  data,
}: ManufacturersFilterItemProps) => {
  return (
    <Button
      variant="outline"
      className="size-auto cursor-pointer rounded-none px-5 py-2 text-base"
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
