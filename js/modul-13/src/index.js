
/*
  Возьмите домашнее задание №12 и перепишите его ипользуя паттерн MVC.
  
  Вынесите отдельно логику, отдельно представление и реакцию на действия пользователя. 
  Model, View и Controller вынести в отдельные файлы и сделать классами.
  
  Используйте ES6 модули и Webpack для сборки.
  
  Использование будет выглядеть следующим образом.
*/

// в index.js
// import Model from './model';
// import View from './view';
// import Controller from './controller';

// const model = new Model();
// const view = new View();

// new Controller(model, view);



import { LOCALSTORAGE } from './js/localstorage';

import Model from './js/model';
import View from './js/veiw';
import Controller from './js/controller';
import { EventEmitter } from "events";


const model = new Model();
const view = new View();
const ee = new EventEmitter();

new Controller(model, view);


// const sourse = document.querySelector(".template").innerHTML.trim();
// const template = Handlebars.compile(sourse);
// const cardList = document.querySelector(".card-list");
// const input = document.querySelector("#input");
// const form = document.querySelector(".form");
// // const button = document.querySelector(".button");
// // const URL =
// // 	"https://api.linkpreview.net/?key=5c90e99e4c39368cdd7cf8954323ce3a4329051385e2c&q=";

// let linksArr = [];



// (function preload() {
// 	if (LOCALSTORAGE.get("linksArr") === undefined) return;
// 	linksArr = LOCALSTORAGE.get("linksArr");
// 	makeMarkUp(linksArr);
// 	console.log(linksArr);
// })();

// function addCard(e) {
// 	e.preventDefault();

// 	if (input.value === "") {
// 		alert("Please, enter a link");
// 		form.reset();
// 		return;
// 	}

// 	if (!checkValue(input.value, linksArr)) {
// 		linksArr.unshift({ url: input.value });
// 		LOCALSTORAGE.set("linksArr", linksArr);
// 	} else {
// 		alert("This link is in the list of bookmarks alredy");
// 		form.reset();
// 		return;
// 	}

// 	cardList.innerHTML = "";
// 	makeMarkUp(linksArr);

// 	form.reset();
// }

// function checkValue(value, arr) {
// 	return arr.some(el => el.url === value);
// }

// function makeMarkUp(arr) {
// 	cardList.innerHTML = "";
// 	let markUp = arr.reduce((acc, link) => acc + template(link), "");
// 	cardList.insertAdjacentHTML("afterbegin", markUp);
// }

// function removeCard(e) {
// 	if (e.target.classList.value === "button") {
// 		e.target.parentNode.remove();

// 		linksArr = linksArr.filter(
// 			el => el.url != e.target.previousElementSibling.innerText
// 		);
// 		LOCALSTORAGE.set("linksArr", linksArr);
// 		cardList.innerHTML = "";
// 		makeMarkUp(linksArr);
// 	}
// }

// form.addEventListener("submit", addCard);
// cardList.addEventListener("click", removeCard);
