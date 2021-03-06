import zora from 'zora';
import crud from '../index';

function getData () {
  return [
    {name: 'bob', lastName: 'leponge', age: 129},
    {name: 'foo', lastName: 'bar', age: 39},
    {name: 'raymond', lastName: 'deubaze', age: 25},
    {name: 'blah', lastName: 'woot', age: 69}
  ];
}

function mockTable () {

  let dispatchCall = [];
  let execCall = 0;

  return {
    dispatch(event, value){
      dispatchCall.push({event, value});
    },
    exec(){
      execCall++;
    },
    getDispatchCalls(){
      return dispatchCall;
    },
    getExecCalls(){
      return execCall;
    }
  };
}

export default zora()
  .test('update(full replacement) using the index', function * (t) {
    const data = getData();
    const table = mockTable();
    const crudTable = crud({data, table});
    crudTable.update(1, {name: 'edited'});
    t.equal(table.getExecCalls(), 1);
    t.deepEqual(data, [
      {name: 'bob', lastName: 'leponge', age: 129},
      {name: 'edited'},
      {name: 'raymond', lastName: 'deubaze', age: 25},
      {name: 'blah', lastName: 'woot', age: 69}
    ]);
  })
  .test('patch(partial update) using the index', function * (t) {
    const data = getData();
    const table = mockTable();
    const crudTable = crud({data, table});
    crudTable.patch(1, {name: 'edited', age: 66});
    t.equal(table.getExecCalls(), 0, 'should not refresh');
    t.deepEqual(data, [
      {name: 'bob', lastName: 'leponge', age: 129},
      {name: 'edited', lastName: 'bar', age: 66},
      {name: 'raymond', lastName: 'deubaze', age: 25},
      {name: 'blah', lastName: 'woot', age: 69}
    ]);
  })
  .test('remove using the index', function * (t) {
    const data = getData();
    const table = mockTable();
    const crudTable = crud({data, table});
    crudTable.remove(1);
    t.equal(table.getExecCalls(), 1);
    t.deepEqual(data, [
      {name: 'bob', lastName: 'leponge', age: 129},
      {name: 'raymond', lastName: 'deubaze', age: 25},
      {name: 'blah', lastName: 'woot', age: 69}
    ]);
  })
  .test('insert at start', function * (t) {
    const data = getData();
    const table = mockTable();
    const crudTable = crud({data, table});
    crudTable.insert({name: 'new', lastName: 'guy/girl', age: 22});
    t.equal(table.getExecCalls(), 1);
    t.deepEqual(data, [
      {name: 'new', lastName: 'guy/girl', age: 22},
      {name: 'bob', lastName: 'leponge', age: 129},
      {name: 'foo', lastName: 'bar', age: 39},
      {name: 'raymond', lastName: 'deubaze', age: 25},
      {name: 'blah', lastName: 'woot', age: 69}
    ]);
  })
  .test('insert at index', function * (t) {
    const data = getData();
    const table = mockTable();
    const crudTable = crud({data, table});
    crudTable.insert({name: 'new', lastName: 'guy/girl', age: 22}, 2);
    t.equal(table.getExecCalls(), 1);
    t.deepEqual(data, [
      {name: 'bob', lastName: 'leponge', age: 129},
      {name: 'foo', lastName: 'bar', age: 39},
      {name: 'new', lastName: 'guy/girl', age: 22},
      {name: 'raymond', lastName: 'deubaze', age: 25},
      {name: 'blah', lastName: 'woot', age: 69}
    ]);
  })
  .test('get from index', function * (t) {
    const data = getData();
    const table = mockTable();
    const crudTable = crud({data, table});
    const val = crudTable.get(2);
    t.equal(table.getExecCalls(), 0);
    t.deepEqual(val, {name: 'raymond', lastName: 'deubaze', age: 25});
  })
  .run();