import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { Where } from "payload";

import { DEFAULT_LIMIT } from "@/constants";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Manufacturer, Media } from "@/payload-types";

export const bikesRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_LIMIT),
        manufacturer: z.string().optional(),
        search: z.string().optional(),
        manufacturers: z.string().optional(),
        minYear: z.number().optional(),
        maxYear: z.number().optional(),
        minPrice: z.number().optional(),
        maxPrice: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const {
        cursor,
        limit,
        manufacturer,
        search,
        manufacturers,
        maxPrice,
        maxYear,
        minPrice,
        minYear,
      } = input;

      let where: Where = {};

      if (manufacturer) {
        where["manufacturer"] = {
          equals: {
            relationTo: "manufacturers",
            value: manufacturer,
          },
        };
      }

      if (manufacturers) {
        const manufacturersIds = manufacturers.split(",");

        where["manufacturer"] = {
          in: manufacturersIds.map((id) => ({
            relationTo: "manufacturers",
            value: id,
          })),
        };
      }

      if (search) {
        where["name"] = { contains: search };
      }

      if (maxPrice) {
        where["price"] = {
          ...(where.price ?? {}),
          less_than_equal: maxPrice,
        };
      }

      if (minPrice) {
        where["price"] = {
          ...(where.price ?? {}),
          greater_than_equal: minPrice,
        };
      }

      if (maxYear) {
        where["year"] = { ...(where.year ?? {}), less_than_equal: maxYear };
      }

      if (minYear) {
        where["year"] = { ...(where.year ?? {}), greater_than_equal: minYear };
      }

      const bikes = await ctx.payload.find({
        collection: "motorcycles",
        limit,
        page: cursor,
        sort: "-createdAt",
        where,
      });

      return {
        bikes: bikes.docs,
        nextPage: bikes.nextPage,
      };
    }),
  getOne: baseProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;

      const bike = await ctx.payload.findByID({
        collection: "motorcycles",
        id,
      });

      if (!bike) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Motorcycle not found",
        });
      }

      const images = bike.images
        ? bike.images.map((image) => ({
            ...image,
            image: image.image as Media,
          }))
        : [];
      const primaryImage = images.find((image) => image.primary);

      return {
        ...bike,
        make: bike.manufacturer.value as Manufacturer,
        images,
        primaryImage,
      };
    }),
});
