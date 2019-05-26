/**
 * ツェラーの公式を利用して曜日を取得する
 * ツェラーの公式は土曜日originであるため、最後の処理で日曜日originに修正している
**/
function getWeekDay(year, month, day) {
  // 紀元前1年は0年として計算する必要がある
  if (year < 0) {
    year = 1 + year;
  }

  // 1月,2月は前年の13月,14月として扱う
  if (month <= 2) {
    month = month + 12;
    year = year - 1;
  }

  // ツェラーの公式
  let y = year % 100;
  let g = _calculateGamma(year);
  let weekDay = (day +  Math.floor((26 * (month + 1) / 10)) + y +  Math.floor(y / 4)  + g) % 7;

  // 土曜日Originを日曜日Originに修正
  return (weekDay + 6) % 7;
}

function _calculateGamma(year) {
  let c =  Math.floor(year / 100);
  if (_isGregorian(year)) {
    return -2 * c +  Math.floor(c / 4);
  }
  return -c + 5;
}

function _isGregorian(year) {
  return 1582 <= year
}
