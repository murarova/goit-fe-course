'use strict'

let userNumber;
let arr = [];
let sum = 0;

do {
  userNumber = prompt('Enter a number');

  if( Number.isNaN(Number(userNumber)) ) {
    alert('It is not a number. Please, try again');
    continue;
  }
  arr.push(Number(userNumber));
} while(userNumber !== null);

arr.pop();

for(let el of arr) {
  sum += el;
}

if(arr.length > 0) {
  alert(`Sum: ${sum}`)
}


