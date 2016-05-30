'use strict';

const ZipArray = xs => ({
  map: f => ZipArray(xs.map(x => f(x))),
  ap: zipArray => {
    const ys = zipArray.runZipArray;
    const result = new Array(Math.min(xs.length, ys.length));
    for (let i = 0; i < result.length; ++i) result[i] = xs[i](ys[i]);
    return ZipArray(result);
  },
  runZipArray: xs,
  inspect: () => `ZipArray([${xs}])`,
  toString: () => `ZipArray([${xs}])`,
});

module.exports = ZipArray;
