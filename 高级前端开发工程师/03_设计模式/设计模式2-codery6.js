const loaclCache = {};

async function cache(cacheId, type) {
  if (!getItem(cacheId, type)) {
    const data = await request();
    setItem(cacheId, type, data);
  }
  return getItem(cacheId, type);
}

function getItem(cacheId, type) {
  const Strategyer = {
    hot(cacheId) {
      return loaclCache[cacheId];
    },
    notHot(cacheId) {
      const _data = localStorage.getItem(cacheId);
      return _data && JSON.parse(_data);
    },
  };
  return Strategyer[type](cacheId);
}

function setItem(cacheId, data, type) {
  if (!type) {
    throw new Error(`没有指定类型`);
  }
  const Strategyer = {
    hot(cacheId) {
      loaclCache[cacheId] = data;
    },
    notHot(cacheId) {
      localStorage.setItem(cacheId, JSON.stringify(data));
    },
  };
  Strategyer[type](cacheId);
}
