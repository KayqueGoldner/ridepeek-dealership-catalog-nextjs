"use client";

import { parseAsString, useQueryState } from "nuqs";

import { Manufacturer } from "@/payload-types";

import { ManufacturersFilterItem } from "./manufacturers-filter-item";

interface ManufacturersFilterProps {
  manufacturers: Manufacturer[];
}

export const ManufacturersFilter = ({
  manufacturers,
}: ManufacturersFilterProps) => {
  const [manufacturerQuery, setManufacturerQuery] = useQueryState(
    "manufacturer",
    parseAsString
      .withOptions({
        clearOnDefault: true,
        shallow: false,
      })
      .withDefault(""),
  );

  const handleManufacturerChange = (manufacturer: string) => {
    if (manufacturer === manufacturerQuery) {
      setManufacturerQuery("");
      return;
    }

    setManufacturerQuery(manufacturer);
  };

  return (
    <div className="flex flex-wrap gap-2 py-6">
      {manufacturers.map((manufacturer) => (
        <ManufacturersFilterItem
          key={manufacturer.id}
          data={manufacturer}
          isActive={manufacturer.id === manufacturerQuery}
          onClick={() => handleManufacturerChange(manufacturer.id)}
        />
      ))}
    </div>
  );
};
