function sayhello() {
  alert('Hello, ' + document.getElementById('who').value + '!');
}



function addXandY() {
  var x = document.getElementById('x').value;
  var y = document.getElementById('y').value;

  alert(x + y);
}



if (document.getElementById('answer').value == '1') {
  alert('値は1でした');
} else if(document.getElementById('answer').value == '2') {
  alert('値は2でした');
}else {
  alert('値は1でも2でもありませんでした');
}
