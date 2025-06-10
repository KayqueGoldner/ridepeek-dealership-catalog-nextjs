import { homeRouter } from "@/modules/home/server/procedures";
import { carsRouter } from "@/modules/cars/server/procedures";
import { manufacturersRouter } from "@/modules/manufacturers/server/procedures";
import { bikesRouter } from "@/modules/bikes/server/procedures";
import { heroRouter } from "@/modules/hero/server/procedures";
import { shopRouter } from "@/modules/shop/server/procedures";

import { createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  home: homeRouter,
  cars: carsRouter,
  bikes: bikesRouter,
  manufacturers: manufacturersRouter,
  hero: heroRouter,
  shop: shopRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
