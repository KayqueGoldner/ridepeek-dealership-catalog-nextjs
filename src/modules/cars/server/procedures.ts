import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { DEFAULT_LIMIT } from "@/constants";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const carsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_LIMIT),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { cursor, limit } = input;

      const cars = await ctx.payload.find({
        collection: "cars",
        limit,
        page: cursor,
        sort: "-createdAt",
      });

      if (!cars.docs.length)
        throw new TRPCError({ code: "NOT_FOUND", message: "No cars found" });

      return {
        cars: cars.docs,
        nextPage: cars.nextPage,
      };
    }),
  getManufacturers: baseProcedure.query(async ({ ctx }) => {
    const manufacturers = await ctx.payload.find({
      collection: "manufacturers",
    });

    return manufacturers;
  }),
});
