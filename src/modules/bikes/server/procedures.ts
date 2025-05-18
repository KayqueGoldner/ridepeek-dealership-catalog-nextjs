import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { Where } from "payload";

import { DEFAULT_LIMIT } from "@/constants";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const bikesRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_LIMIT),
        manufacturer: z.string().optional(),
        search: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { cursor, limit, manufacturer, search } = input;

      let where: Where = {};

      if (manufacturer) {
        where["manufacturer"] = {
          equals: {
            relationTo: "manufacturers",
            value: manufacturer,
          },
        };
      }

      if (search) {
        where["name"] = { contains: search };
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
});
