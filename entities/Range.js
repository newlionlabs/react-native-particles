//@flow
export type RangeType = {
  min: number,
  max: number
};

// Constructor helper
export const Range = (min: number = 0, max: number = 1): VectorType => ({
  min,
  max
});
