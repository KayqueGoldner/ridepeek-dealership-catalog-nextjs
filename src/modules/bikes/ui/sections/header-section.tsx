import { Manufacturer } from "@/payload-types";

import { SearchBar } from "@/modules/home/ui/sections/search-bar";
import { ManufacturersFilter } from "@/modules/manufacturers/ui/components/manufacturers-filter";

interface HeaderSectionProps {
  manufacturers: Manufacturer[];
}

export const HeaderSection = ({ manufacturers }: HeaderSectionProps) => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
        <h1 className="text-3xl font-bold md:text-5xl">Motorcycles</h1>
        <div className="w-full max-w-2xl">
          <SearchBar pathname="/bikes" />
        </div>
      </div>
      <ManufacturersFilter manufacturers={manufacturers} />
    </section>
  );
};
