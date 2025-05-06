import { homeRouter } from "@/modules/home/server/procedures";
import { carsRouter } from "@/modules/cars/server/procedures";
import { manufacturersRouter } from "@/modules/manufacturers/server/procedures";

import { createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  home: homeRouter,
  cars: carsRouter,
  manufacturers: manufacturersRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
