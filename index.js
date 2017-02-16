import {compose} from 'smart-table-operators';
import {get, replace, patch, remove, insert} from './crud';

export default function ({data, table}) {
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
}