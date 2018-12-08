import { sortRules } from "./sortRules";

describe("sortRules", () => {
  it("should sort :export to be the last rule", () => {
    expect(
      sortRules([
        {
          type: "rule",
          selectors: [":export"],
          declarations: [
            {
              type: "declaration",
              property: "foo",
              value: "1",
              position: {
                start: { line: 3, column: 9 },
                end: { line: 3, column: 15 },
              },
            },
          ],
          position: {
            start: { line: 2, column: 7 },
            end: { line: 4, column: 8 },
          },
        },
        {
          type: "rule",
          selectors: [".foo"],
          declarations: [
            {
              type: "declaration",
              property: "color",
              value: "red",
              position: {
                start: { line: 7, column: 9 },
                end: { line: 7, column: 19 },
              },
            },
          ],
          position: {
            start: { line: 6, column: 7 },
            end: { line: 8, column: 8 },
          },
        },
      ]),
    ).toEqual([
      {
        type: "rule",
        selectors: [".foo"],
        declarations: [
          {
            type: "declaration",
            property: "color",
            value: "red",
            position: {
              start: { line: 7, column: 9 },
              end: { line: 7, column: 19 },
            },
          },
        ],
        position: {
          start: { line: 6, column: 7 },
          end: { line: 8, column: 8 },
        },
      },
      {
        type: "rule",
        selectors: [":export"],
        declarations: [
          {
            type: "declaration",
            property: "foo",
            value: "1",
            position: {
              start: { line: 3, column: 9 },
              end: { line: 3, column: 15 },
            },
          },
        ],
        position: {
          start: { line: 2, column: 7 },
          end: { line: 4, column: 8 },
        },
      },
    ]);

    expect(
      sortRules([
        {
          type: "rule",
          selectors: [".foo"],
          declarations: [
            {
              type: "declaration",
              property: "color",
              value: "red",
              position: {
                start: { line: 7, column: 9 },
                end: { line: 7, column: 19 },
              },
            },
          ],
          position: {
            start: { line: 6, column: 7 },
            end: { line: 8, column: 8 },
          },
        },
        {
          type: "rule",
          selectors: [":export"],
          declarations: [
            {
              type: "declaration",
              property: "foo",
              value: "1",
              position: {
                start: { line: 3, column: 9 },
                end: { line: 3, column: 15 },
              },
            },
          ],
          position: {
            start: { line: 2, column: 7 },
            end: { line: 4, column: 8 },
          },
        },
        {
          type: "rule",
          selectors: [".foo"],
          declarations: [
            {
              type: "declaration",
              property: "color",
              value: "red",
              position: {
                start: { line: 7, column: 9 },
                end: { line: 7, column: 19 },
              },
            },
          ],
          position: {
            start: { line: 6, column: 7 },
            end: { line: 8, column: 8 },
          },
        },
      ]),
    ).toEqual([
      {
        type: "rule",
        selectors: [".foo"],
        declarations: [
          {
            type: "declaration",
            property: "color",
            value: "red",
            position: {
              start: { line: 7, column: 9 },
              end: { line: 7, column: 19 },
            },
          },
        ],
        position: {
          start: { line: 6, column: 7 },
          end: { line: 8, column: 8 },
        },
      },
      {
        type: "rule",
        selectors: [".foo"],
        declarations: [
          {
            type: "declaration",
            property: "color",
            value: "red",
            position: {
              start: { line: 7, column: 9 },
              end: { line: 7, column: 19 },
            },
          },
        ],
        position: {
          start: { line: 6, column: 7 },
          end: { line: 8, column: 8 },
        },
      },
      {
        type: "rule",
        selectors: [":export"],
        declarations: [
          {
            type: "declaration",
            property: "foo",
            value: "1",
            position: {
              start: { line: 3, column: 9 },
              end: { line: 3, column: 15 },
            },
          },
        ],
        position: {
          start: { line: 2, column: 7 },
          end: { line: 4, column: 8 },
        },
      },
    ]);
  });

  it("should do nothing with an empty array", () => {
    expect(sortRules([])).toEqual([]);
  });
});
