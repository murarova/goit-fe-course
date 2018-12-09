const sharm = 15;
const hurgada = 25;
const taba = 6;

const cansel = 'Нам очень жаль, приходите еще!';
const error = 'Ошибка ввода';
const yesConfirm = 'Приятного путешествия в группе';
const noPlaces = 'Извините, столько мест нет ни в одной группе!';

let places = prompt('Пожалуйста, введите желаемое кол-во мест');

if(places === null) {
    alert(cansel);
    
    } else if(Number.isInteger(Number(places)) > 0) {

        if(places <= taba) {
            if(confirm(`Данное кол-во мест есть в группе Taba. Зарезервировать вам место в этой группе?`)) {
                alert(yesConfirm + ' Taba');
            } else {
                alert(cansel);
            }
        } else if(places <= sharm) {
            if(confirm(`Данное кол-во мест есть в группе Sharm. Зарезервировать вам место в этой группе?`)) {
                alert(yesConfirm + ' Sharm');
            } else {
                alert(cansel);
            }
        } else if(places <= hurgada) {
            if(confirm(`Данное кол-во мест есть в группе Hurgada. Зарезервировать вам место в этой группе?`)) {
                alert(yesConfirm +' Hurgada');
            } else {
                alert(cansel);
            }
        } else {
            alert(noPlaces);
        }
    } else {
        alert(error);
    }

