"use client";

import { Car } from "@/payload-types";

import { CarCard } from "../components/car-card";

interface CarsListSectionProps {
  cars: Car[];
}

export const CarsListSection = ({ cars }: CarsListSectionProps) => {
  return (
    <section className="pt-10">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  );
};
