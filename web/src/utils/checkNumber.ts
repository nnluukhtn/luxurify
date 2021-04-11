export const isInterger = (Number.isInteger =
  Number.isInteger ||
  function (value) {
    return (
      typeof value === 'number' &&
      isFinite(value) &&
      Math.floor(value) === value
    );
  });

export const isSafeInt = (Number.isSafeInteger =
  Number.isSafeInteger ||
  function (value: number) {
    let maxSafeInt = Number.MAX_SAFE_INTEGER;
    if (!maxSafeInt) {
      maxSafeInt = 9007199254740991; // Math.pow(2, 53) - 1;
    }
    return Number.isInteger(value) && Math.abs(value) <= maxSafeInt;
  });
