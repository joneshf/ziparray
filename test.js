'use strict';

const jsv = require('jsverify');
const R = require('ramda');

const ZipArray = require('.');

const ZipArrayArb = ty => jsv.array(ty).smap(ZipArray, xs => xs.runZipArray);
const env = {
  ZipArray: ZipArrayArb,
};

describe('ZipArray', () => {
  describe('#map', () => {
    jsv.property('identity law', 'ZipArray unit', env, xs =>
      R.equals(xs.runZipArray, xs.map(x => x).runZipArray)
    );

    jsv.property('composition law', 'ZipArray nat', 'nat', env, (xs, x) => {
      const f = R.curry((a, b) => a + b);
      const left = xs.map(y => f(x)(y)).runZipArray;
      const right = xs.map(f).map(f => f(x)).runZipArray;

      return R.equals(left, right);
    });
  });

  describe('#ap', () => {
    jsv.property('composition law',
      'ZipArray (unit -> unit)', 'ZipArray (unit -> unit)', 'ZipArray unit',
      env, (fs, gs, xs) => {
        const left = fs.map(f => g => x => f(g(x))).ap(gs).ap(xs).runZipArray;
        const right = fs.ap(gs.ap(xs)).runZipArray;

        return R.equals(left, right);
      });
  });
});
