// 配列は [] を使って定義する
var weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

// 要素を取り出すときは1番目が0から始まることに注意
alert(weekdays[0]);
alert(weekdays[1]);

// 例えば、自動で曜日を割り当てる

for (var i = 1; i <= 31; i = i + 1) {
  alert (i + '(' + weekdays[i%7] + ')');
}


var elements = document.getElementsByTagName('li');

alert(elements[0].innerHTML);
alert(elements[1].innerHTML);
alert(elements[2].innerHTML);


var faculties = document.getElementsByName('faculty');

alert(faculties[0].checked);
alert(faculties[1].checked);
alert(faculties[2].checked);


var students = ['t09415is', 't09512ha', 't09363ga'];
for (var i = 0; i < students.length; i = i + 1) {
  // 提出課題を取得してファイルに保存する
  var targetUrl = 'http://web.sfc.keio.ac.jp/~' + students[i] + '/ex10-01.html';
  var request = http.get(targetUrl, function(response) {
    if (response.statusCode == 200) {
      var file = fs.createWriteStream(targetFilePath);
      response.pipe(file);
    }
  });
}
