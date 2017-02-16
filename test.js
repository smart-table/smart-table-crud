const data = ['a', 'b'];

function printer (data) {
  return {
    print(){
      console.dir(data)
    }
  }
}

const p = printer(data);

function mutater (data) {
  return {
    mutate(){
      data.splice(0,2);
      data.push(...['ab','cd']);
    }
  }
}

const m = mutater(data);


p.print();

m.mutate();

p.print();

