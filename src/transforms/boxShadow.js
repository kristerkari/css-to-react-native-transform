export const boxShadowToShadowProps = value => {
  const pxs = value.match(/(\d*\.?\d+)px/g);
  const nums = pxs
    ? pxs.map(val => val.replace("px", "")).map(val => Number(val))
    : [];
  const offsetX = nums[0];
  const offsetY = nums[1];
  const blurRadius = nums[2];
  const filtered = pxs
    ? value.split(" ").filter(val => pxs.indexOf(val) === -1)
    : [];
  const color = filtered[0];

  if (offsetX === undefined || offsetY === undefined) {
    throw new Error(`Failed to parse declaration "boxShadow: ${value}"`);
  }
  return {
    shadowOffset: { width: offsetX, height: offsetY },
    shadowRadius: blurRadius !== undefined ? blurRadius : 0,
    shadowColor: color !== undefined ? color : "black",
  };
};
