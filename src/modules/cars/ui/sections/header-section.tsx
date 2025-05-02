import { Manufacturer } from "@/payload-types";

import { ManufacturersFilter } from "@/modules/cars/ui/components/manufacturers-filter";
import { SearchBar } from "@/modules/home/ui/sections/search-bar";

interface HeaderSectionProps {
  manufacturers: Manufacturer[];
}

export const HeaderSection = ({ manufacturers }: HeaderSectionProps) => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
        <h1 className="text-3xl font-bold md:text-5xl">Cars</h1>
        <div className="w-full max-w-2xl">
          <SearchBar />
        </div>
      </div>
      <ManufacturersFilter manufacturers={manufacturers} />
    </section>
  );
};
