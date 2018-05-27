function showX() {
  // idが'img'のHTML要素を探し出し、中身を <img src="x.png"> に書き換える
  document.getElementById('img').innerHTML = '<img src="x.png">';
}

function showO() {
  document.getElementById('img').innerHTML = '<img src="o.png">';
}

function showXthenO(){
  showImageX();
  setTimeout("showO()",3000);
}

function showOthenX(){
  showImageO();
  setTimeout("showX()",3000);
}
