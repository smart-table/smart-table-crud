(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global['smart-table-crud'] = factory());
}(this, (function () { 'use strict';

function compose (first, ...fns) {
  return (...args) => fns.reduce((previous, current) => current(previous), first(...args));
}

function curry (fn, arityLeft) {
  const arity = arityLeft || fn.length;
  return (...args) => {
    if (arity === args.length) {
      return fn(...args);
    } else {
      const func = (...moreArgs) => fn(...args, ...moreArgs);
      return curry(func, arity - args.length);
    }
  };
}

const get = curry((array, index) => array[index]);
const replace = curry((array, newVal, index) => array.map((val, i) => (index === i ) ? newVal : val));
const patch = curry((array, newVal, index) => replace(array, Object.assign(array[index], newVal), index));
const remove = curry((array, index) => array.filter((val, i) => index !== i));
const insert = curry((array, newVal, index) => [...array.slice(0, index), newVal, ...array.slice(index)]);

var index = function ({data, table}) {
  const mutateData = (newData) => {
    data.splice(0, data.length);
    data.push(...newData);
  };
  const refresh = compose(mutateData, table.exec);

  return {
    update(index, newVal){
      const exec = compose(
        replace(data, newVal),
        refresh
      );
      return exec(index);
    },
    patch(index, newVal){
      const exec = compose(
        patch(data, newVal),
        refresh);
      return exec(index);
    },
    remove: compose(remove(data), refresh),
    insert(newVal, index = 0){
      const exec = compose(insert(data, newVal), refresh);
      return exec(index);
    },
    get: get(data)
  };
};

return index;

})));
//# sourceMappingURL=smart-table-crud.js.map
