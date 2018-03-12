import parseCSS from "css/lib/parse";
import transformCSS from "css-to-react-native";
import { remToPx } from "./transforms/rem";
import { camelCase } from "./utils/camelCase";
import { allEqual } from "./utils/allEqual";
import { values } from "./utils/values";

const shorthandBorderProps = [
  "border-radius",
  "border-width",
  "border-color",
  "border-style",
];

const transformDecls = (styles, declarations) => {
  for (const d in declarations) {
    const declaration = declarations[d];
    if (declaration.type !== "declaration") continue;

    const property = declaration.property;
    const value = remToPx(declaration.value);

    if (shorthandBorderProps.indexOf(property) > -1) {
      // transform single value shorthand border properties back to
      // shorthand form to support styling `Image`.
      const transformed = transformCSS([[property, value]]);
      const vals = values(transformed);
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
};

const transform = (css, options) => {
  const { stylesheet } = parseCSS(css);

  const result = {};

  for (const r in stylesheet.rules) {
    const rule = stylesheet.rules[r];
    for (const s in rule.selectors) {
      const selector = rule.selectors[s].replace(/^\.|#/, "");
      const styles = (result[selector] = result[selector] || {});
      transformDecls(styles, rule.declarations);
    }

    if (
      rule.type == "media" &&
      options != null &&
      options.parseMediaQueries === true
    ) {
      const media = "@media " + rule.media;
      for (const r in rule.rules) {
        const ruleRule = rule.rules[r];
        for (const s in ruleRule.selectors) {
          result[media] = result[media] || {};
          const selector = ruleRule.selectors[s].replace(/^\.|#/, "");
          const mediaStyles = (result[media][selector] =
            result[media][selector] || {});
          transformDecls(mediaStyles, ruleRule.declarations);
        }
      }
    }
  }
  return result;
};

export default transform;
