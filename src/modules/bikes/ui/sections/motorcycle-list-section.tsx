"use client";

import { Motorcycle } from "@/payload-types";

import { MotorcycleCard } from "../components/motorcycle-card";

interface MotorcycleListSectionProps {
  motorcycles: Motorcycle[];
}

export const MotorcycleListSection = ({
  motorcycles,
}: MotorcycleListSectionProps) => {
  return (
    <section className="pt-10">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {motorcycles.map((bike) => (
          <MotorcycleCard key={bike.id} motorcycle={bike} />
        ))}
      </div>
    </section>
  );
};
