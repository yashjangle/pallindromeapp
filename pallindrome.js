const bdayInput = document.querySelector("#bday-input");
const submitButton = document.querySelector(".submit-btn");
const output = document.querySelector(".output");

function reverseString(str) {
  const reversedStr = str.split("").reverse().join("");
  return reversedStr;
}

function isPalindrome(str) {
  const reverse = reverseString(str);
  return str === reverse;
}

function convertDateToStr(date) {
  const dateStr = { day: "", month: "", year: "" };
  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();
  return dateStr;
}

function convertToAllDateFormats(date) {
  const dateStr = convertDateToStr(date);
  const mmddyyyy = dateStr.day + dateStr.month + dateStr.year.split(-2);
  const yyyymmdd = dateStr.year.split(-2) + dateStr.month + dateStr.day;
  const ddmmyyyy = dateStr.day + dateStr.month + dateStr.year.split(-2);
  const mmddyy = dateStr.day + dateStr.month + dateStr.year;
  const yymmdd = dateStr.year + dateStr.month + dateStr.day;
  const ddmmyy = dateStr.day + dateStr.month + dateStr.year;
  return [mmddyyyy, yyyymmdd, ddmmyyyy, mmddyy, yymmdd, ddmmyy];
}

function checkAllPalindrome(date) {
  const isAnyPalindrome = convertToAllDateFormats(date);
  let flag = false;
  for (let i = 0; i < isAnyPalindrome.length; i++) {
    if (isPalindrome(isAnyPalindrome[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
}

function getNextDate(date) {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 30, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }
  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

// let date = {
//   day: 1,
//   month: 7,
//   year: 2020,
// };
// console.log(getNextDate(date));

function getNextPalindromeDate(date) {
  let nextDate = getNextDate(date);
  let ctr = 0;
  while (1) {
    ctr++;
    if (checkAllPalindrome(nextDate)) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [ctr, nextDate];
}

function clickHandler() {
  const bdayDateInput = bdayInput.value;
  if (bdayDateInput !== "") {
    const bdayDateInputStr = bdayDateInput.split("-");

    let date = {
      day: Number(bdayDateInputStr[2]),
      month: Number(bdayDateInputStr[1]),
      year: Number(bdayDateInputStr[0]),
    };
    if (checkAllPalindrome(date)) {
      output.innerText = ` Yay, your birthday is a palindrome! 🥳`;
    } else {
      let [ctr, nextDate] = getNextPalindromeDate(date);
      output.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days! 😔`;
    }
  }
}

submitButton.addEventListener("click", clickHandler);