import { z } from "zod";
import { Where } from "payload";

import { Media } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const heroRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const heroItems = await ctx.payload.find({
      collection: "hero",
      depth: 1,
      limit: 6,
    });

    return {
      ...heroItems,
      docs: heroItems.docs.map((doc) => ({
        ...doc,
        image: doc.image as Media,
      })),
    };
  }),
});
