import { SerializedHeadingNode } from "@payloadcms/richtext-lexical";
import {
  JSXConverters,
  JSXConvertersFunction,
} from "@payloadcms/richtext-lexical/react";

export const TocJSXConverter: JSXConverters<SerializedHeadingNode> = {
  heading: ({ node, nodesToJSX }) => {
    const text = nodesToJSX({ nodes: node.children }).join("");
    const id = text.toLowerCase().replace(/\s+/g, "-");

    switch (node.tag) {
      case "h1":
        return (
          <h1 id={id} className="prose-2xl prose-black font-bold">
            {text}
          </h1>
        );
      case "h2":
        return (
          <h2 id={id} className="prose-xl prose-black font-bold">
            {text}
          </h2>
        );
      case "h3":
        return (
          <h3 id={id} className="prose-lg prose-black font-bold">
            {text}
          </h3>
        );
      case "h4":
        return (
          <h4 id={id} className="prose prose-black font-semibold">
            {text}
          </h4>
        );
      default:
        return null;
    }
  },
};

export const jsxConverters: JSXConvertersFunction = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...TocJSXConverter,
});
