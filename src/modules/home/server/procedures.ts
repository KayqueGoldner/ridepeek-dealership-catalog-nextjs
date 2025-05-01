import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const homeRouter = createTRPCRouter({
  getCars: baseProcedure.query(async ({ ctx }) => {
    const cars = await ctx.payload.find({
      collection: "cars",
      limit: 5,
    });

    return cars;
  }),
  getBikes: baseProcedure.query(async ({ ctx }) => {
    const bikes = await ctx.payload.find({
      collection: "motorcycles",
      limit: 5,
    });

    return bikes;
  }),
});
