const removePx = val => val.replace(/(\d+)px/g, "$1");

const formatNumber = val => Number(removePx(val));

const matchNumbers = val =>
  val.replace(/rgba?\(.*\)/g, "").match(/(^|\s+)\d+(px)?/g);

const isZeroOrPxValue = val => val === "0" || /\d+px/.test(val);

const filterNonNumbers = val =>
  val.split(/\s+(?![^(]*?\))/).filter(val => isNaN(formatNumber(val)));

const filterNumbers = nums => {
  if (!nums) {
    return [];
  }
  return nums.map(val => val.trim()).map(val => {
    if (!isZeroOrPxValue(val)) {
      return undefined;
    }
    return formatNumber(val);
  });
};

export const boxShadowToShadowProps = value => {
  const nums = filterNumbers(matchNumbers(value));
  const nonNums = filterNonNumbers(value);
  const offsetX = nums[0];
  const offsetY = nums[1];
  const blurRadius = nums[2];
  const color = nonNums[0];

  if (offsetX === undefined || offsetY === undefined) {
    throw new Error(`Failed to parse declaration "boxShadow: ${value}"`);
  }
  return {
    shadowOffset: { width: offsetX, height: offsetY },
    shadowRadius: blurRadius !== undefined ? blurRadius : 0,
    shadowColor: color !== undefined ? color : "black",
  };
};
