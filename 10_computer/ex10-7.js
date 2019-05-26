function addCount() {
  for (var count = 1; count <= 30; count = count + 1) {
    var mod3 = count % 3;
    var mod5 = count % 5;
    if (mod3 == 0 && mod5 == 0) {
      alert('Fizz Buzz');
    } else if (mod3 == 0) {
      alert('Fizz');
    } else if (mod5 == 0) {
      alert('Buzz');
    } else {
        alert(count);
    }
  }
}
