# css-to-react-native-transform

[![NPM version](http://img.shields.io/npm/v/css-to-react-native-transform.svg)](https://www.npmjs.org/package/css-to-react-native-transform)
[![Build Status](https://travis-ci.org/kristerkari/css-to-react-native-transform.svg?branch=master)](https://travis-ci.org/kristerkari/css-to-react-native-transform)
[![Build status](https://ci.appveyor.com/api/projects/status/75s8ls2m47by8b1x/branch/master?svg=true)](https://ci.appveyor.com/project/kristerkari/css-to-react-native-transform/branch/master)
[![Coverage Status](https://coveralls.io/repos/github/kristerkari/css-to-react-native-transform/badge.svg?branch=master)](https://coveralls.io/github/kristerkari/css-to-react-native-transform?branch=master)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)
[![Greenkeeper badge](https://badges.greenkeeper.io/kristerkari/css-to-react-native-transform.svg)](https://greenkeeper.io/)

A lightweight wrapper on top of
[css-to-react-native](https://github.com/styled-components/css-to-react-native)
to allow valid CSS to be turned into React Native Stylesheet objects.

To keep things simple it only transforms class selectors (e.g. `.myClass {}`) and grouped class selectors (e.g. `.myClass, .myOtherClass {}`). Parsing of more complex selectors can be added as a new feature behind a feature flag (e.g. `transform(css, { parseAllSelectors: true })`) in the future if needed.

Example:

```css
.myClass {
  font-size: 18px;
  line-height: 24px;
  color: red;
}

.other {
  padding: 1rem;
}
```

is transformed to:

```js
{
  myClass: {
    fontSize: 18,
    lineHeight: 24,
    color: "red"
  },
  other: {
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16
  }
}
```

## API

### Transform CSS

```js
import transform from "css-to-react-native-transform";
// or const transform = require("css-to-react-native-transform").default;

transform(`
  .foo {
    color: #f00;
  }
`);
```

↓ ↓ ↓ ↓ ↓ ↓

```js
{
  foo: {
    color: "#f00";
  }
}
```

### CSS Media Queries (experimental)

_The API and parsed syntax for CSS Media Queries might change in the future_

```js
transform(
  `
  .container {
    background-color: #f00;
  }

  @media (orientation: landscape) {
    .container {
      background-color: #00f;
    }
  }
`,
  { parseMediaQueries: true },
);
```

↓ ↓ ↓ ↓ ↓ ↓

```js
{
  __mediaQueries: {
    "@media (orientation: landscape)": [{
      expressions: [
        {
          feature: "orientation",
          modifier: undefined,
          value: "landscape",
        },
      ],
      inverse: false,
      type: "all",
    }],
  },
  container: {
    backgroundColor: "#f00",
  },
  "@media (orientation: landscape)": {
    container: {
      backgroundColor: "#00f",
    },
  },
}
```

You can also speficy a platform as the media query type ("android", "dom", "ios", "macos", "web", "windows"):

```js
transform(
  `
  .container {
    background-color: #f00;
  }

  @media android and (orientation: landscape) {
    .container {
      background-color: #00f;
    }
  }
`,
  { parseMediaQueries: true },
);
```

### CSS Viewport Units (experimental)

When [CSS Viewport Units](https://caniuse.com/#feat=viewport-units) are used, a special `__viewportUnits` feature flag is added to the result. This is done so that the implementation that transforms viewport units to pixels knows that the style object has viewport units inside it, and can avoid doing extra work if the style object does not contain any viewport units.

```js
transform(`.foo { font-size: 1vh; }`);
```

↓ ↓ ↓ ↓ ↓ ↓

```js
{
   __viewportUnits: true,
  foo: {
    fontSize: "1vh";
  }
}
```

## Limitations

- For `rem` unit the root element `font-size` is currently set to 16 pixels. A
  setting needs to be implemented to allow the user to define the root element
  `font-size`.
- There is also support for the `box-shadow` shorthand, and this converts into
  `shadow-` properties. Note that these only work on iOS.
