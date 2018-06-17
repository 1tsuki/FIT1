function addCount() {
  for (var count = 1; count <= 99; count = count + 1) {
    var message = count;
    if (isMultiplesOf3(count) || isOnesPlace3(count) || isTensPlace3(count)) {
        message = message + 'アホ';
    }
    alert(message);
  }

}

function isMultiplesOf3(arg) {
  return arg % 3 == 0;
}

function isOnesPlace3(arg) {
  return arg % 10 == 3;
}

function isTensPlace3(arg) {
  return Math.floor(arg / 10) % 10 == 3;
}
