import parseCSS from "css/lib/parse";
import transformCSS from "css-to-react-native";
import { boxShadowToShadowProps } from "./transforms/boxShadow";
import { remToPx } from "./transforms/rem";
import { camelCase } from "./utils/camelCase";

const shorthandBorderProps = [
  "border-radius",
  "border-width",
  "border-color",
  "border-style",
];

const transform = css => {
  const { stylesheet } = parseCSS(css);

  const result = {};

  for (const rule of stylesheet.rules) {
    for (let selector of rule.selectors) {
      selector = selector.replace(/\.|#/g, "");

      let styles;

      styles = result[selector] = result[selector] || {};

      for (const declaration of rule.declarations) {
        if (declaration.type !== "declaration") continue;

        const property = declaration.property;
        const value = remToPx(declaration.value);

        // box-shadow is implemented in css-to-react-native,
        // but not released yet. Remove after it is supported.
        if (property === "box-shadow") {
          Object.assign(styles, boxShadowToShadowProps(value));
        } else if (shorthandBorderProps.indexOf(property) > -1) {
          // transform shorthand border properties back to
          // shorthand form to support styling `Image`.
          const transformed = transformCSS([[property, value]]);
          const vals = Object.keys(transformed).map(key => transformed[key]);
          const replacement = {};
          replacement[camelCase(property)] = vals[0];
          Object.assign(styles, replacement);
        } else {
          Object.assign(styles, transformCSS([[property, value]]));
        }
      }
    }
  }
  return result;
};

export default transform;
