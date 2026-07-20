export const remToPx = (value) => {
  return value.replace(
    /(\d*\.?\d+)rem/gi,
    (match, m1) => parseFloat(m1, 10) * 16 + "px",
  );
};
