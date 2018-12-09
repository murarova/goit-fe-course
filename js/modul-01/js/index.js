const adminLogin = 'admin';
const adminPassword = 'm4ngo1zh4ackz0r';
const cansel = 'Отменено пользователем!';
const wrongLogin = 'Доступ запрещен, неверный логин!';
const wrongPassword = 'Доступ запрещен, неверный пароль!';
const welcome = 'Добро пожаловать!';

let login = prompt('Введите логин');

if(login === null) {
    alert(cansel);
} else if(login === adminLogin) {
    let password = prompt('Введите пароль');
    if(password === null) {
        alert(cansel);
    } else if (password === adminPassword) {
        alert(welcome);
    } else {
        alert(wrongPassword);
    }
} else {
    alert(wrongLogin);
}