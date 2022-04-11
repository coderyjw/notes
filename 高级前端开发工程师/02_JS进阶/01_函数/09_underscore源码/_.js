(function (root) {
  const _ = function (data) {
    if (!(this instanceof _)) return new _(data);
    this.wrapper = data;
  };

  _.unique = function (source, callback) {
    const res = [];
    for (let i = 0; i < source.length; i++) {
      const target = callback ? callback(source[i]) : source[i];
      if (res.indexOf(target) === -1) {
        res.push(target);
      }
    }
    return res;
  };

  const model = function (instance, outcome) {
    if (instance._chain) {
      instance.wrapper = outcome;
      return instance;
    }
    return outcome;
  };

  const beforeHook = function (arr, callback) {
    for (let i = 0; i < arr.length; i++) {
      callback(arr[i]);
    }
  };

  _.process = function (target) {
    const res = [];
    for (let name in target) {
      res.push(name);
    }
    return res;
  };

  _.prototype.ending = function () {
    return this.wrapper;
  };

  _.chain = function (source) {
    const instance = _(source);
    instance._chain = true;

    // 特殊的实例
    return instance;
  };

  // 混入 1:可枚举 存储在数组中 2： 遍历
  _.mixin = function (target) {
    beforeHook(_.process(target), function (key) {
      const func = target[key];
      _.prototype[key] = function () {
        const decon = [this.wrapper];
        Array.prototype.push.apply(decon, arguments);
        return model(this, func.apply(this, decon));
      };
    });
  };

  _.mixin(_);
  root._ = _;
})(this);
