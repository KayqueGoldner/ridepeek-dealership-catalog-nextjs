"use client";

import { IoFilterOutline } from "react-icons/io5";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

import { carsSerialize } from "@/lib/search-params";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTRPC } from "@/trpc/client";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  search: z.string().optional(),
  manufacturers: z.array(z.string()).optional(),
  minYear: z.number().optional(),
  maxYear: z.number().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
});

interface SearchBarFilterProps {
  pathname: string;
}

export const SearchBarFilter = ({ pathname }: SearchBarFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: searchParams.get("search") || "",
      manufacturers: searchParams.get("manufacturers")?.split(",") || [],
      minYear: parseInt(searchParams.get("minYear") || "0"),
      maxYear: parseInt(searchParams.get("maxYear") || "0"),
      minPrice: parseInt(searchParams.get("minPrice") || "0"),
      maxPrice: parseInt(searchParams.get("maxPrice") || "0"),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const url = carsSerialize(pathname, {
      ...values,
      manufacturers: values.manufacturers?.toString() ?? "",
    });

    router.push(url);
  }

  const trpc = useTRPC();
  const { data: manufacturers, isLoading: isLoadingManufacturers } = useQuery(
    trpc.manufacturers.getAll.queryOptions(),
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="size-12 cursor-pointer rounded-full border-black md:size-16"
          aria-label="Filter"
        >
          <IoFilterOutline className="size-5 md:size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="pt-10">
          <SheetTitle className="text-2xl">
            Search and filter vehicles
          </SheetTitle>
          <SheetDescription>
            Use the filters below to narrow down your vehicle search results.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="px-5">
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Search"
                      className="h-12 flex-1 rounded-full border border-black pr-3 pl-5 !text-lg md:h-16"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Accordion type="single" className="my-10" collapsible>
              <AccordionItem value="manufacturers">
                <AccordionTrigger className="cursor-pointer rounded-none border-t border-black px-5">
                  Manufacturers
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                  {!isLoadingManufacturers ? (
                    manufacturers && manufacturers.length > 0 ? (
                      <>
                        {manufacturers.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="manufacturers"
                            render={({ field }) => (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start gap-2 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...(field.value ?? []),
                                            item.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel>{item.name}</FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </>
                    ) : (
                      <p>No manufacturers</p>
                    )
                  ) : (
                    <p>Loading...</p>
                  )}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="year">
                <AccordionTrigger className="cursor-pointer rounded-none border-t border-black px-5">
                  Year
                </AccordionTrigger>
                <AccordionContent className="flex gap-2 px-2">
                  <FormField
                    control={form.control}
                    name="minYear"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Minimum</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="Year"
                            className="border-black"
                            min={0}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormDescription>e.g. 1990</FormDescription>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="maxYear"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Maximum</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="Year"
                            className="border-black"
                            min={0}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          e.g. {new Date().getFullYear()}
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="price">
                <AccordionTrigger className="cursor-pointer rounded-none border-t border-black px-5">
                  Price
                </AccordionTrigger>
                <AccordionContent className="flex gap-2 px-2">
                  <FormField
                    control={form.control}
                    name="minPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="Price"
                            className="border-black"
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                        <FormDescription>e.g. 10.000</FormDescription>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="maxPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="Price"
                            className="border-black"
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormDescription>e.g. 100.000</FormDescription>
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Button
              type="submit"
              className="h-12 w-full cursor-pointer rounded-full text-base"
            >
              Filter
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
