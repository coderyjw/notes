class HashTable<T = any> {
  // 创建一个数组，用来存放链地址法中的链
  storage: [string, T][][] = [];
  // 定义数组的长度
  private length: number = 7;
  // 记录已经存放元素的个数
  private count: number = 0;

  private hashFunc(key: string, max: number) {
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

  put(key: string, value: T) {
    // 1.根据key 获取数组中对应的索引值
    const index = this.hashFunc(key, this.length);
    // 2. 取出索引值对应位置的数组
    let bucket = this.storage[index];

    // 3. 判断 bucket 是否有值
    if (!bucket) {
      bucket = [];
      this.storage[index] = bucket;
    }

    // 4. 确定已经有一个数组了，但是数组中是否已经存在 key 时不确定的
    let isUpdate = false;
    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i];
      const tupleKey = tuple[0];
      if (tupleKey === key) {
        // 修改/更新的操作
        tuple[1] = value;
        isUpdate = true;
      }
    }

    // 5. 如果上面的代码没有进行覆盖，那么在该位置进行添加
    if (!isUpdate) {
      bucket.push([key, value]);
      this.count++;

      // 发现 loadFactor 比例已经大于 0.75，那么就直接扩容
      const loadFactor = this.count / this.length;
      if (loadFactor > 0.75) {
        this.resize(this.length * 2);
      }
    }
  }

  get(key: string): T | undefined {
    // 1. 根据 key 获取索引值 index
    const index = this.hashFunc(key, this.length);

    // 2. 获取 bucket（桶）
    const bucket = this.storage[index];
    if (!bucket) return undefined;

    // 3. 对 bucket 进行遍历
    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i];
      const tupleKey = tuple[0];
      const tupleValue = tuple[1];
      if (tupleKey === key) {
        return tupleValue;
      }
    }
    return undefined;
  }

  delete(key: string): T | undefined {
    // 1. 获取索引值的位置
    const index = this.hashFunc(key, this.length);

    // 2. 获取 bucket（桶）
    const bucket = this.storage[index];
    if (!bucket) return undefined;

    // 3. 对 bucket 进行遍历
    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i];
      const tupleKey = tuple[0];
      const tupleValue = tuple[1];
      if (tupleKey === key) {
        bucket.splice(i, 1);
        this.count--;

        // 发现 loadFactor 比例已经小于 0.75，那么就直接缩容
        const loadFactor = this.count / this.length;
        if (loadFactor < 0.25 && this.length > 7) {
          this.resize(Math.floor(this.length / 2));
        }

        return tupleValue;
      }
    }
    return undefined;
  }

  private resize(newLength: number) {
    // 设置新的长度
    this.length = newLength;

    // 获取原来所有的数据，并且重新放入到新的容量数组中
    // 1. 对数据进行的初始化操作
    const oldStorage = this.storage;
    this.storage = [];
    this.count = 0;

    // 2. 获取原来数据，放入新的数组中
    oldStorage.forEach((bucket) => {
      if (!bucket) return;

      for (let i = 0; i < bucket.length; i++) {
        const tuple = bucket[i];
        this.put(tuple[0], tuple[1]);
      }
    });
  }
}

const hashTable = new HashTable();

hashTable.put("aaa", 200);
hashTable.put("bbb", 300);
hashTable.put("ccc", 400);
hashTable.put("ddd", 500);
hashTable.put("eee", 600);
console.log(hashTable.storage.length); // 7
hashTable.put("fff", 600);
console.log(hashTable.storage.length); // 14
hashTable.delete("fff");
hashTable.delete("eee");
console.log(hashTable.storage.length); // 14
hashTable.delete("ddd");
console.log(hashTable.storage.length); // 7

export {};
