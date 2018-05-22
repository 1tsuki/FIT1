var prevImage                 //１つ前の画像
var currentImage = 'img1.jpg' //現在の画像

// 画像を差し替える
function changeImage(src) {
  // id='image' の要素の中身を新しい画像に差し替える
  document.getElementById('image').innerHTML = '<img src="' + src + '">';

  // 前の画像を記憶しておく
  prevImage = currentImage;
  currentImage = src;
  printVariables();
}

// 一つ前の画像に巻き戻す
function rollbackImage() {
  changeImage(prevImage);
}

// 画像を一度変更し、一定時間経過後に巻き戻す
function changeImageWithTimer(src, duration) {
  changeImage(src);
  setTimeout(rollbackImage, duration);
}

function printVariables() {
  console.log("prevImage: "+ prevImage + " currentImage: " + currentImage)
}

printVariables();
