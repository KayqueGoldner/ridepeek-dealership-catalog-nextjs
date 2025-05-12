import { createSerializer, parseAsString } from "nuqs/server";

const stringValue = parseAsString
  .withOptions({
    clearOnDefault: true,
    history: "replace",
    shallow: true,
  })
  .withDefault("");

export const searchParams = {
  search: stringValue,
  manufacturer: stringValue,
};

export const serialize = createSerializer(searchParams);
