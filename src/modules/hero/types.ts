import { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@/trpc/routers/_app";

export type HeroGetManyOutput =
  inferRouterOutputs<AppRouter>["hero"]["getMany"];

export type HeroGetManyDocsOutput =
  inferRouterOutputs<AppRouter>["hero"]["getMany"]["docs"];

export type HeroGetManyDocsOutputSingle = HeroGetManyDocsOutput[number];
