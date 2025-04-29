import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const homeRouter = createTRPCRouter({
  getCars: baseProcedure.query(async ({ ctx }) => {
    const cars = await ctx.payload.find({
      collection: "cars",
      limit: 5,
    });

    return cars;
  }),
});
