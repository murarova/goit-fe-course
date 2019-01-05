'use strict'

const logins = ["Mango", "robotGoogles", "Poly", "Aj4x1sBozz", "qwerty123"];

function isLoginValid(login) {
  return login.length >= 4 && login.length <=16 ? true : false;
}

function isLoginUnique(allLogins, login) {
  return !allLogins.includes(login);
}

function addLogin(allLogins, login) {

  if (isLoginValid(login)) {

    if(isLoginUnique(allLogins, login)) {
      logins.push(login);
      return alert('Логин успешно добавлен!');
    } return alert('Такой логин уже используется!');

  } return alert('Ошибка! Логин должен быть от 4 до 16 символов');
}

addLogin(logins,'Ajax'); // 'Логин успешно добавлен!'
addLogin(logins, 'robotGoogles'); // 'Такой логин уже используется!'
addLogin(logins, 'Zod'); // 'Ошибка! Логин должен быть от 4 до 16 символов'
addLogin(logins,'jqueryisextremelyfast'); // 'Ошибка! Логин должен быть от 4 до 16 символов'



