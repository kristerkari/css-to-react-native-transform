export const boxShadowToShadowProps = value => {
  const pxs = value.match(/(\d*\.?\d+)px/g);
  const nums = pxs
    ? pxs.map(val => val.replace("px", "")).map(val => Number(val))
    : [];
  const [offsetX, offsetY, blurRadius] = nums;
  const [color] = pxs
    ? value.split(" ").filter(val => pxs.indexOf(val) === -1)
    : [];

  if (offsetX === undefined || offsetY === undefined) {
    throw new Error(`Failed to parse declaration "boxShadow: ${value}"`);
  }
  return {
    shadowOffset: { width: offsetX, height: offsetY },
    shadowRadius: blurRadius !== undefined ? blurRadius : 0,
    shadowColor: color !== undefined ? color : "black",
  };
};
