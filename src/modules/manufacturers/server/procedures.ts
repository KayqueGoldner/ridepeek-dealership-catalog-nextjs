import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { Where } from "payload";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const manufacturersRouter = createTRPCRouter({
  getAll: baseProcedure.query(async ({ ctx }) => {
    const manufacturers = await ctx.payload.find({
      collection: "manufacturers",
    });

    if (!manufacturers.docs.length) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No manufacturers found",
      });
    }

    return manufacturers.docs;
  }),
  getByType: baseProcedure
    .input(
      z.object({
        type: z.enum(["cars", "motorcycles", "both"]).default("both"),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { type } = input;

      let query: Where = {};

      if (type === "both") {
        query = {
          vehicleTypes: {
            in: ["motorcycles", "cars", "both"],
          },
        };
      } else {
        query = {
          vehicleTypes: {
            in: ["both", type],
          },
        };
      }

      const manufacturers = await ctx.payload.find({
        collection: "manufacturers",
        where: query,
      });

      return manufacturers.docs;
    }),
});
