import {compose} from 'smart-table-operators';
import {get, replace, patch, remove, insert} from './crud';

export default function ({data, table}) {
  // empty and refill data keeping the same reference
  const mutateData = (newData) => {
    data.splice(0);
    data.push(...newData);
  };
  const refresh = compose(mutateData, table.exec);
  return {
    update(index,newVal){
      return compose(replace(data,newVal),refresh)(index);
    },
    patch(index, newVal){
      return patch(data, newVal, index);
    },
    remove: compose(remove(data), refresh),
    insert(newVal, index = 0){
      return compose(insert(data, newVal), refresh)(index);
    },
    get: get(data)
  };
}