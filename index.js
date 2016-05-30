'use strict';

const ZipArray = xs => ({
  map: f => ZipArray(xs.map(x => f(x))),
  ap: ys => {
    const zs = ys.runZipArray;
    let result = [];

    for (let i = 0, len = Math.min(xs.length, zs.length); i < len; ++i) {
      result.push(xs[i](zs[i]));
    }

    return ZipArray(result);
  },
  runZipArray: xs,
  inspect: () => `ZipArray([${xs}])`,
  toString: () => `ZipArray([${xs}])`,
});

module.exports = ZipArray;
