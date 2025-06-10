"use client";

import Image from "next/image";
import { useSuspenseQuery } from "@tanstack/react-query";
import { RichText } from "@payloadcms/richtext-lexical/react";

import { useTRPC } from "@/trpc/client";
import { jsxConverters } from "@/components/jsx-converter";

interface MotorcycleViewProps {
  motorcycleId: string;
}

export const MotorcycleView = ({ motorcycleId }: MotorcycleViewProps) => {
  const trpc = useTRPC();

  const { data, isLoading } = useSuspenseQuery(
    trpc.bikes.getOne.queryOptions({
      id: motorcycleId,
    }),
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="h-full pt-20 pb-24">
      <section className="aspect-video w-full sm:h-[calc(80vh-80px)] lg:h-[calc(100vh-80px)]">
        <Image
          src={data.primaryImage?.image.url ?? ""}
          width={data.primaryImage?.image.width ?? 1980}
          height={data.primaryImage?.image.height ?? 1080}
          alt={data.primaryImage?.image.alt ?? "primary image"}
          className="size-full object-cover object-center"
        />
      </section>
      <section className="flex flex-col-reverse gap-5 px-5 pt-16 lg:flex-row lg:px-14">
        <div className="w-full space-y-10">
          <h1 className="text-5xl font-bold">{data.name}</h1>
          {data.description && (
            <RichText data={data.description} converters={jsxConverters} />
          )}
          {data.images.length > 0 && (
            <div className="flex flex-col gap-y-2">
              {data.images.map((image) => (
                <Image
                  key={image.id}
                  src={image.image.url ?? ""}
                  width={image.image.width ?? 1980}
                  height={image.image.height ?? 1080}
                  alt={image.image.alt ?? "primary image"}
                  className="size-full object-cover object-center"
                />
              ))}
            </div>
          )}
        </div>
        <div className="w-full max-w-md border-b border-black pb-10 lg:border-b-0 lg:border-l lg:pb-0 lg:pl-10">
          <ul className="sticky top-24 flex w-full flex-col gap-4">
            <li className="space-x-2">
              <span className="font-bold">Manufacturer:</span>
              <span>{data.make.name}</span>
            </li>
            <li className="space-x-2">
              <span className="font-bold">Year:</span>
              <span>{data.year}</span>
            </li>
            <li className="space-x-2">
              <span className="font-bold">Color:</span>
              <span>{data.colors[0].color}</span>
            </li>
            <li className="space-x-2">
              <span className="font-bold">Engine Type:</span>
              <span>
                {data.engineType === "custom"
                  ? data.customEngineType
                  : data.engineType}
              </span>
            </li>
            {data?.engineType !== "electric" &&
              data?.engineType !== "custom" && (
                <li className="space-x-2">
                  <span className="font-bold">Fuel Capacity:</span>
                  <span>{data.fuelCapacity}</span>
                </li>
              )}
            {(data?.engineType === "electric" ||
              data?.engineType === "hybrid") && (
              <li className="space-x-2">
                <span className="font-bold">Battery Capacity:</span>
                <span>{data.batteryCapacity}</span>
              </li>
            )}
            <li className="space-x-2">
              <span className="font-bold">Category:</span>
              <span>
                {data?.category === "custom-category"
                  ? data.customCategory
                  : data.category}
              </span>
            </li>
            <li className="space-x-2">
              <span className="font-bold">Transmission:</span>
              <span>{data.transmission}</span>
            </li>
            <li className="space-x-2">
              <span className="font-bold">Weight:</span>
              <span>{data.weight} KG</span>
            </li>
            <li className="space-x-2">
              <span className="font-bold">MPG:</span>
              <span>{data.mileage}</span>
            </li>
            <li className="space-x-2">
              <span className="font-bold">Price:</span>
              <span>
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(data.price)}
              </span>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
};
