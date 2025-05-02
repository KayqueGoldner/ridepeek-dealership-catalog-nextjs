import { z } from "zod";

import { homeRouter } from "@/modules/home/server/procedures";
import { carsRouter } from "@/modules/cars/server/procedures";

import { baseProcedure, createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  home: homeRouter,
  cars: carsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
