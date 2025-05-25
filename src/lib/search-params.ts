import {
  parseAsString,
  parseAsInteger,
  createLoader,
  type inferParserType,
  createSerializer,
} from "nuqs/server";

const stringOption = parseAsString
  .withOptions({ clearOnDefault: true })
  .withDefault("");
const integerOption = parseAsInteger
  .withOptions({ clearOnDefault: true })
  .withDefault(0);

export const carsSearchParams = {
  manufacturers: stringOption,
  search: stringOption,
  minYear: integerOption,
  maxYear: integerOption,
  minPrice: integerOption,
  maxPrice: integerOption,
};

export const loadCarsSearchParams = createLoader(carsSearchParams);

export type carsSearchParamsType = inferParserType<typeof carsSearchParams>;

export const serialize = createSerializer(carsSearchParams);
