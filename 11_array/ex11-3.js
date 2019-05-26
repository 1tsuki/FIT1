let WEEKDAYS = ['sun','mon','tue','wed','thu','fri','sat']; // 曜日定義
let MAX_DATES = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 各月の最大日付
let MAX_ROWNUM = 6; // カレンダーの最大行数

/**
 * カレンダーを表示する
**/
function showCalendar() {
  // セルの中身を初期化
  refreshCells();

  // 入力年月を取得
  let year = Number(document.getElementById('year').value);
  let month = Number(document.querySelector('option:checked').value);

  // 対象年月の開始曜日を取得
  let startingWeekDay = getWeekDay(year, month, 1);

  // カレンダーを描画
  for (var date = 1; date <= getMaxDateOfMonth(year, month); date = date + 1) {
    let cellId = getCellId(startingWeekDay, date);
    document.getElementById(cellId).innerHTML = date;
  }
}

/**
 * カレンダーの内容を初期化
**/
function refreshCells() {
  for(var i = 0; i < WEEKDAYS.length; i = i + 1) {
    for(var j = 0; j < MAX_ROWNUM; j = j + 1) {
      document.getElementById(WEEKDAYS[i] + j).innerHTML = "-";
    }
  }
}

/**
 * 月の開始曜日に応じて、日付に対応するセルを取得する
**/
function getCellId(startingWeekDay, date) {
  let weekDay = getWeekDayOfMonth(startingWeekDay, date);
  let weekNum = getWeekNumOfMonth(startingWeekDay, date);
  return weekDay + weekNum;
}

/**
 * 月初の曜日から逆算して対象日付の曜日を算出する
**/
function getWeekDayOfMonth(startingWeekDay, date) {
  return WEEKDAYS[(startingWeekDay + date - 1) % 7];
}

/**
 * 月初の曜日から逆算して対象日付の週番号を算出する (0 origin)
**/
function getWeekNumOfMonth(startingWeekDay, date) {
  return Math.floor((startingWeekDay + date - 1) / 7);
}

/**
 * 対象月の最大日付を取得する
**/
function getMaxDateOfMonth(year, month) {
  if (isLeapYear(year) && month == 2) {
    return 29;
  }
  return MAX_DATES[month - 1];
}

/**
 * うるう年の判定
**/
function isLeapYear(year) {
  return !(year % 4) && (year % 100) || !(year % 400) ? true : false;
}

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
