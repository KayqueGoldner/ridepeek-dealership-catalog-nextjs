import { z } from "zod";

import { DEFAULT_LIMIT } from "@/constants";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const shopRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_LIMIT),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { cursor, limit } = input;

      const products = await ctx.payload.find({
        collection: "products",
        limit,
        page: cursor,
        sort: "-createdAt",
      });

      return {
        products: products.docs,
        nextPage: products.nextPage,
      };
    }),
});
