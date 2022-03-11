/**
 * @param {number[][]} accounts
 * @return {number}
 * made in yjw
 */
var maximumWealth = function (accounts) {
  const record = new Array(accounts.length).fill(0);
  accounts.forEach((rows, i) => rows.forEach((item) => (record[i] += item)));
  console.log(record)
  record.sort((prev,next) => next - prev)
  return record[0]
};
