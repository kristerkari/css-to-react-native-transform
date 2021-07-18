## v2.0.0

- Breaking: updated `css-to-react-native` dependency to v3.0.0. This version removes the support for line-height with multiplier, adds support for `place-content` CSS property, and more.
- Breaking: updated `css` dependency to v3.0.0.

## v1.9.0

- Added: Typescript type definitions.

## v1.8.1

- Fixed: flex-box shorthands missing `flex-basis: auto` in some cases.
- Fixed: sorting :export blocks on Node.js version 11 was not working.

## v1.8.0

- Added: support for parsing CSS modules (ICSS) `:export` blocks.

## v1.7.1

- Fixed: an error is now thrown for a `line-height` value without unit (`line-height` multiplier value is not supported in React Native).
- Updated: `css-to-react-native` dependency to v2.2.2 and `css` dependency to v2.2.4.

## v1.7.0

- Updated: `css-to-react-native` dependency to v2.2.1.
- Added: support for more platforms in CSS media queries.

## v1.6.0

- Added: a feature flag for CSS viewport units.

## v1.5.0

- Updated: `css-to-react-native` dependency to v2.2.0.
- Fixed: the parser now allows passing through CSS units that are not supported by React Native.

## v1.4.0

- Added: skip parsing of all other selector types than class selectors.

## v1.3.1

- Fixed: allow multiple parts for parsed media queries to support `OR` media queries.

## v1.3.0

- Added: transformation result now includes parsed CSS media queries under `__mediaQueries` object. This removes the need to re-parse media queries after transforming CSS.

## v1.2.0

- Added: validate that CSS Media Queries have correct syntax.

## v1.1.0

- Added: experimental support for parsing CSS Media Queries. Use `parseMediaQueries: true` to enable parsing media queries.

## v1.0.8

- Updated: `css-to-react-native` dependency to v2.1.2.

## v1.0.7

- Updated: `css-to-react-native` dependency to v2.1.1.

## v1.0.6

- Fixed: Only apply `Image` styling fix for shorthand border props with a single value.

## v1.0.5

- Fixed: Get rid of the requirement for `Symbol` by replacing `for of` loops with `for in` loops.

## v1.0.4

- Fixed: `Image` styling fix for shorthand border props.

## v1.0.3

- Fixed: Add missing `shadowOpacity` prop.
- Fixed: box-shadow:support for rgb and rgba colors.

## v1.0.2

- Fixed: Support unitless values for `box-shadow`.

## v1.0.1

- Fixed: Remove array destructuring to make transpiled code ES5 compatible.

## v1.0.0

- Initial release
