# smart-table-crud

[![CircleCI](https://circleci.com/gh/smart-table/smart-table-crud.svg?style=svg)](https://circleci.com/gh/smart-table/smart-table-crud)

Add CRUD behavior to a [smart-table](https://github.com/smart-table/smart-table-core)

## Installation

### npm

``npm install smart-table-crud --save``

### yarn

``yarn add smart-table-crud``

## Usage

### Compose with your smart table

```Javascript
import table from 'smart-table-core'
import crud from 'smart-table-crud'

const t = table({data=[/*some data*/]}, crud);

//your smart-table exposes now new methods from the crud API  

```

### update(index, newVal)

Process a full replace of an item and refresh the table based on its actual state (sort, filter, etc)

```Javascript
//assuming row 42 is {firstName:'blah', lastName:'woot'}
t.update(42, {firstName:'new firstname'});
//now row 42 is {firstName:'new firstname'}
```

### patch(index, patialNewValue)

Process a partial update of an item without refreshing the table (ideal for inline editing)

```Javascript
//assuming row 42 is {firstName:'blah', lastName:'woot'}
t.update(42, {firstName:'new firstname'});
//now row 42 is {firstName:'new firstname', lastName:'woot'}
```

### remove(index)

Remove an item from the table and refresh the table

```Javascript
t.remove(42);
```

### insert(newValue, [indexToInsert])

Insert a new value in the table at provided index (as first item otherwise) and refresh the table

```Javascript
t.insert({firstName:'new firstname'}); //insert as new first item of the table
t.insert({firstName:'new firstname'}, 42); //insert as 42th item
```

### get(index)

Get the **reference** of the item at index (or undefined)
 
```Javascript
const itemAt42 = t.get(42);
```

## Contributing

### test

``npm test``

or

``yarn test``

### issues

Only **bugs** coming with a **running example**
