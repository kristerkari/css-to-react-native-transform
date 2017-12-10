import parseCSS from "css/lib/parse";
import transformCSS from "css-to-react-native";
import { boxShadowToShadowProps } from "./transforms/boxShadow";
import { remToPx } from "./transforms/rem";

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
        } else {
          Object.assign(styles, transformCSS([[property, value]]));
        }
      }
    }
  }
  return result;
};

export default transform;
