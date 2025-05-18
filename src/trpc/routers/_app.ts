import { homeRouter } from "@/modules/home/server/procedures";
import { carsRouter } from "@/modules/cars/server/procedures";
import { manufacturersRouter } from "@/modules/manufacturers/server/procedures";

import { createTRPCRouter } from "../init";
import { bikesRouter } from "@/modules/bikes/server/procedures";

export const appRouter = createTRPCRouter({
  home: homeRouter,
  cars: carsRouter,
  bikes: bikesRouter,
  manufacturers: manufacturersRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
