export default function transform(
  css: string,
  options?: {
    ignoreRule?: (selector: string) => boolean;
    parseMediaQueries?: boolean;
  },
): { [selector: string]: unknown };
