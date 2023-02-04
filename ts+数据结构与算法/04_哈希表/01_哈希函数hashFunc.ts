/**
 * 哈希函数，将 key 映射成 index
 * @param key 要转换的 key
 * @param max 数组的长度（最大的数值）
 * @returns
 */
function hashFunc(key: string, max: number): number {
  // 1. 计算 hashCode cats => 60337 （27为底的时候）
  let hashCode = 0;
  const length = key.length;
  for (let i = 0; i < length; i++) {
    // 霍纳法则计算 hashCode
    hashCode = 31 * hashCode + key.charCodeAt(i);
  }

  // 2. 求出索引值
  const index = hashCode % max;
  return index;
}
