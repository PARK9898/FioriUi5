var star;
var blank;
for (var i = 0; i < 5; i++) {
  star = "";
  blank = "";
  for (var k = 0; k < 5 - i; k++) {
    blank += " ";
  }
  star += blank;
  for (var j = 0; j < i * 2 + 1; j++) {
    star += "*";
  }
  console.log(star);
}
