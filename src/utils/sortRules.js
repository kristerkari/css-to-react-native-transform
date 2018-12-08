function compare(a, b) {
  return Array.isArray(a.selectors) && a.selectors[0] === ":export";
}

export function sortRules(rules) {
  return rules.sort(compare);
}
