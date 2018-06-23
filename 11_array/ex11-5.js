function student() {
  var f = '不明';
  var g = '不明';
  var x = document.getElementsByName('faculty');
  for (var i = 0; i < x.length; i = i + 1) {
    if (x[i].checked) {
      f = x[i].value;
    }
  }

  var y = document.getElementsByName('grade');
  for (var i = 0; i < y.length; i = i + 1) {
    if (y[i].checked) {
      g = y[i].value;
    }
  }


  alert("学部:" + f + " 学年:" + g);
}
