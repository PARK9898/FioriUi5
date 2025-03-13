var fruit = {
    name: "banana",
    color: "yellow",
    origin: "Puerto Rico",
    weigth: 230,
    size: 17,
  };
  var aFruit = [];

  for (var p in fruit) {
    console.log(p + ": " + fruit[p]);
    aFruit.push(fruit[p]);
  }
  alert(fruit.weigth);