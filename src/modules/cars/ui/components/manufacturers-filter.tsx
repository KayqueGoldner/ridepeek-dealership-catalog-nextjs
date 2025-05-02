"use client";

import { Manufacturer } from "@/payload-types";

import { ManufacturersFilterItem } from "./manufacturers-filter-item";

interface ManufacturersFilterProps {
  manufacturers: Manufacturer[];
}

export const ManufacturersFilter = ({
  manufacturers,
}: ManufacturersFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 py-6">
      {manufacturers.map((manufacturer) => (
        <ManufacturersFilterItem key={manufacturer.id} data={manufacturer} />
      ))}
    </div>
  );
};
