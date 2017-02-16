import {curry} from 'smart-table-operators';

export const get = curry((array, index) => array[index]);
export const replace = curry((array, newVal, index) => array.map((val, i) => (index === i ) ? newVal : val));
export const patch = curry((array, newVal, index) => replace(array, Object.assign(array[index], newVal), index));
export const remove = curry((array, index) => array.filter((val, i) => index !== i));
export const insert = curry((array, newVal, index) => [...array.slice(0, index), newVal, ...array.slice(index)]);