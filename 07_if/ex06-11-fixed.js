// 一つ前の画像要素が何だったかを保存しておく
var previousImage = ''

function showImage(img) {
  previousImage = document.getElementById('img').innerHTML;
  document.getElementById('img').innerHTML = img
}

function showPreviousImage() {
  showImage(previousImage);
}

function showImageAndFallback(img){
  showImage(img)
  setTimeout("showPreviousImage()",1000);
}
