"use client";

import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { carsSerialize } from "@/lib/search-params";
import { SearchBarFilter } from "@/components/search-bar-filter";

interface SearchBarProps {
  pathname?: string;
}

export const SearchBar = ({ pathname = "/cars" }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = (value: string) => {
    const url = carsSerialize(pathname, {
      ...Object.fromEntries(searchParams.entries()),
      search: value,
    });

    router.push(url);
  };

  useEffect(() => {
    setQuery(searchParams.get("search") || "");
  }, [searchParams]);

  return (
    <div className="p-5 md:py-10">
      <div className="flex justify-center gap-3">
        <Input
          className="h-12 flex-1 rounded-full border border-black pr-3 pl-5 !text-lg md:h-16"
          placeholder="Search"
          value={query}
          onChange={(e) => {
            if (!e.target.value) {
              handleSearch("");
            }

            setQuery(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && query.trim()) {
              handleSearch(query);
            }
          }}
        />
        <Button
          variant="outline"
          size="lg"
          className="size-12 cursor-pointer rounded-full border-black md:size-16"
          onClick={() => handleSearch(query)}
          aria-label="Search"
        >
          <IoSearchOutline className="size-5 md:size-6" />
        </Button>
        <SearchBarFilter pathname={pathname} />
      </div>
    </div>
  );
};
