

function bloodtype() {
  var containsA = parseYesNo(document.getElementById('a').value);
  var containsB = parseYesNo(document.getElementById('b').value);

  if (containsA != null && containsB != null) {
    if (containsA && containsB) {
      alert("ab");
    } else if(containsA) {
      alert("a");
    } else if(containsB) {
      alert("b");
    } else {
      alert("o");
    }
  }
}

function parseYesNo(arg) {
  if (arg == 'yes') {
    return true;
  } else if (arg == 'no') {
    return false;
  }
  alert('yesかnoを入力してください')
  return null;
}
