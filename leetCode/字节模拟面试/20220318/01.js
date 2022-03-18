/**
 * @param {number[]} timeSeries
 * @param {number} duration
 * @return {number}
 */
var findPoisonedDuration = function (timeSeries, duration) {
  let p = duration,
    q = timeSeries[0];
  for (let i = 1; i < timeSeries.length; i++) {
    const interval = timeSeries[i] - q;
    if (interval < duration) {
      p -= duration - interval;
    }
    q = timeSeries[i];
    p += duration;
  }
  return p;
};
