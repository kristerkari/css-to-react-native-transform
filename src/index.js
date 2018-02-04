import parseCSS from "css/lib/parse";
import transformCSS from "css-to-react-native";
import { remToPx } from "./transforms/rem";
import { camelCase } from "./utils/camelCase";
import { allEqual } from "./utils/allEqual";

const shorthandBorderProps = [
  "border-radius",
  "border-width",
  "border-color",
  "border-style",
];

const transform = css => {
  const { stylesheet } = parseCSS(css);

  const result = {};

  for (const r in stylesheet.rules) {
    const rule = stylesheet.rules[r];
    for (const s in rule.selectors) {
      let selector = rule.selectors[s];
      selector = selector.replace(/\.|#/g, "");

      let styles;

      styles = result[selector] = result[selector] || {};

      for (const d in rule.declarations) {
        const declaration = rule.declarations[d];
        if (declaration.type !== "declaration") continue;

        const property = declaration.property;
        const value = remToPx(declaration.value);

        if (shorthandBorderProps.indexOf(property) > -1) {
          // transform single value shorthand border properties back to
          // shorthand form to support styling `Image`.
          const transformed = transformCSS([[property, value]]);
          const vals = Object.keys(transformed).map(key => transformed[key]);
          if (allEqual(vals)) {
            const replacement = {};
            replacement[camelCase(property)] = vals[0];
            Object.assign(styles, replacement);
          } else {
            Object.assign(styles, transformed);
          }
        } else {
          Object.assign(styles, transformCSS([[property, value]]));
        }
      }
    }
  }
  return result;
};

export default transform;
