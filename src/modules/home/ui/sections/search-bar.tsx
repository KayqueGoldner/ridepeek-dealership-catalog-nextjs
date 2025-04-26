"use client";

import { useState } from "react";
import { IoFilterOutline, IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!query.trim()) return;

    const url = `/cars?search=${query}`;
    router.push(url);
  };

  return (
    <div className="p-5 md:py-10">
      <div className="flex justify-center gap-3">
        <Input
          className="h-12 flex-1 rounded-full border border-black pr-3 pl-5 !text-lg md:h-16"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <Button
          variant="outline"
          size="lg"
          className="size-12 cursor-pointer rounded-full border-black md:size-16"
          onClick={handleSearch}
          aria-label="Search"
        >
          <IoSearchOutline className="size-5 md:size-6" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="size-12 cursor-pointer rounded-full border-black md:size-16"
          aria-label="Filter"
        >
          <IoFilterOutline className="size-5 md:size-6" />
        </Button>
      </div>
    </div>
  );
};
