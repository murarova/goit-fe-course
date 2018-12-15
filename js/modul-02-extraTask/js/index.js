'use strict'

const passwords = ['qwerty', '111qwe', '123123', 'r4nd0mp4zzw0rd'];
let attempts = 3;
let userPassword;

do {
  userPassword = prompt('Please enter your password');

  if(passwords.includes(userPassword)) {
    alert('Welcome username');
    break;
  } else if (userPassword === null) {
    break;
  } else {
    attempts = attempts - 1;

    if(attempts > 0) {
      alert(`Unvalid password, please try again. You have ${attempts} chances`);
    } else  {
      alert('Your account is blocked');
      break;
    }
  }

} while (attempts > 0);