# ZipArray

Provides an alternative `Apply` implementation for arrays.

![fantasyland](https://raw.githubusercontent.com/fantasyland/fantasy-land/master/logo.png)
![static-land](https://raw.githubusercontent.com/rpominov/static-land/master/logo/logo.png)

## Installation

```
npm install ziparray
```

## Motivation

The common implementation of `Apply` for arrays works with all combinations. However, there is another implementation of `Apply` for arrays that works in "pairwise" fashion. You can think of this as a data type level encoding of the `zip` family of functions. Encoding the effect ("pairwise" application) in the data type allows us to write code that expresses our intentions better.

## Usage

### Fantasy Land

```js
> const ZipArray = require('ziparray');
undefined
> ZipArray([1,2,3])
ZipArray([1,2,3])
> ZipArray([1,2,3]).map(x => x * 10)
ZipArray([10,20,30])
> ZipArray([x => x + 1, x => x * 3]).ap(ZipArray([1,2,3]))
ZipArray([2,6])
> ZipArray([x => x + 1, x => x * 3]).ap(ZipArray([1,2]))
ZipArray([2,6])
> ZipArray([x => y => x + y, x => y => x * y]).ap(ZipArray([1,20])).ap(ZipArray([3,40]))
ZipArray([4,800])
```

### Static Land

```js
> const ZipArray = require('.');
undefined
> const {map, ap} = ZipArray;
undefined
> map(x => x + 10, [1,2,3])
[ 11, 12, 13 ]
> ap([x => x + 1, x => x * 3], [1,2,3])
[ 2, 6 ]
> ap([x => x + 1, x => x * 3], [1,2])
[ 2, 6 ]
> ap(ap([x => y => x + y, x => y => x * y], [1,20]), [3,40])
[ 4, 800 ]
```
