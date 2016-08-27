'use strict';

const ZipArray = xs => ({
  map: f => ZipArray(xs.map(x => f(x))),
  ap: zipArray => {
    const ys = zipArray.runZipArray;
    const result = new Array(Math.min(xs.length, ys.length));

    for (let i = 0; i < result.length; ++i) {
      result[i] = xs[i](ys[i]);
    }

    return ZipArray(result);
  },
  runZipArray: xs,
  inspect: () => `ZipArray([${xs}])`,
  toString: () => `ZipArray([${xs}])`,
});

ZipArray.map = (f, xs) => xs.map(x => f(x));
ZipArray.ap = (fs, xs) => {
  const result = new Array(Math.min(fs.length, xs.length));

  for (let i = 0; i < result.length; ++i) {
    result[i] = fs[i](xs[i]);
  }

  return result;
};

module.exports = ZipArray;
