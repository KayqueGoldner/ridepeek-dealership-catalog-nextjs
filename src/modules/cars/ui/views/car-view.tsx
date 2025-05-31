"use client";

import Image from "next/image";
import { useSuspenseQuery } from "@tanstack/react-query";
import { RichText } from "@payloadcms/richtext-lexical/react";

import { useTRPC } from "@/trpc/client";
import { jsxConverters } from "@/components/jsx-converter";

interface CarViewProps {
  carId: string;
}

export const CarView = ({ carId }: CarViewProps) => {
  const trpc = useTRPC();

  const { data, isLoading } = useSuspenseQuery(
    trpc.cars.getOne.queryOptions({
      id: carId,
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
              <span className="font-bold">Model:</span>
              <span>{data.model}</span>
            </li>
            <li className="space-x-2">
              <span className="font-bold">Year:</span>
              <span>{data.year}</span>
            </li>
            <li className="space-x-2">
              <span className="font-bold">Color:</span>
              <span>{data.specifications?.color?.exterior}</span>
            </li>
            <li className="space-x-2">
              <span className="font-bold">Engine Type:</span>
              <span>{data.specifications?.engineType}</span>
            </li>
            <li className="space-x-2">
              <span className="font-bold">Fuel Type:</span>
              <span>{data.specifications?.fuelType}</span>
            </li>
            <li className="space-x-2">
              <span className="font-bold">Transmission:</span>
              <span>{data.specifications?.transmission}</span>
            </li>
            <li className="space-x-2">
              <span className="font-bold">MPG:</span>
              <span>{data.specifications?.mpg?.combined}</span>
            </li>
            {data.specifications?.engineType === "electric" && (
              <li className="space-x-2">
                <span className="font-bold">Eletric Range:</span>
                <span>{data.specifications.electricRange}</span>
              </li>
            )}
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
