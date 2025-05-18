import Image from "next/image";
import Link from "next/link";

import { Motorcycle } from "@/payload-types";

interface CarCardProps {
  motorcycle: Motorcycle;
}

export const MotorcycleCard = ({ motorcycle }: CarCardProps) => {
  const image =
    typeof motorcycle.images?.[0]?.image !== "string" &&
    motorcycle.images?.[0]?.image;

  return (
    <div className="group relative flex-1 overflow-hidden">
      <Link href={`/cars/${motorcycle.id}`}>
        <Image
          src={(image && image.url) || ""}
          alt={motorcycle.name}
          width={(image && image.width) || 760}
          height={(image && image.height) || 760}
          className="aspect-video object-cover transition-all duration-300 group-hover:scale-95"
        />
        <h1 className="truncate py-3 text-center text-lg font-bold">
          {motorcycle.name}
        </h1>
      </Link>
    </div>
  );
};
