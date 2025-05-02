import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";

export const carsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const cars = await ctx.payload.find({
      collection: "cars",
    });

    if (!cars.docs.length)
      throw new TRPCError({ code: "NOT_FOUND", message: "No cars found" });

    const manufacturers = cars.docs
      .map((car) =>
        typeof car.make.value !== "string" ? car.make.value : null,
      )
      .filter((manufacturer) => manufacturer !== null)
      .filter(
        (manufacturer, index, self) =>
          index === self.findIndex((m) => m?.id === manufacturer?.id),
      );

    return {
      cars: cars.docs,
      manufacturers,
    };
  }),
  getManufacturers: baseProcedure.query(async ({ ctx }) => {
    const manufacturers = await ctx.payload.find({
      collection: "manufacturers",
    });

    return manufacturers;
  }),
});
