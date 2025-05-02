import { Car } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";

interface CarCardProps {
  car: Car;
}

export const CarCard = ({ car }: CarCardProps) => {
  const image =
    typeof car.images?.[0]?.image !== "string" && car.images?.[0]?.image;

  return (
    <div className="group relative flex-1 overflow-hidden">
      <Link href={`/cars/${car.id}`}>
        <Image
          src={(image && image.url) || ""}
          alt={car.name}
          width={(image && image.width) || 760}
          height={(image && image.height) || 760}
          className="aspect-video object-cover transition-all duration-300 group-hover:scale-95"
        />
        <h1 className="truncate py-3 text-center text-lg font-bold">
          {car.name}
        </h1>
      </Link>
    </div>
  );
};
