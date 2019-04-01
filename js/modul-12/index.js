const sourse = document.querySelector(".template").innerHTML.trim();
const template = Handlebars.compile(sourse);
const cardList = document.querySelector(".card-list");
const input = document.querySelector("#input");
const form = document.querySelector(".form");
const button = form.querySelector(".button");
const cardItem = document.querySelector(".card-item");
const URL =
	"https://api.linkpreview.net/?key=5c90e99e4c39368cdd7cf8954323ce3a4329051385e2c&q=";

let linksArr = [];


const LOCALSTORAGE = (w => {
	if (!w) return;

	const isActive = "localStorage" in w;

	const get = key => {
		try {
			const serializedState = localStorage.getItem(key);

			return serializedState === null
				? undefined
				: JSON.parse(serializedState);
		} catch (err) {
			console.error("Get state error: ", err);
		}
	};

	const set = (key, value) => {
		try {
			const serializedState = JSON.stringify(value);
			localStorage.setItem(key, serializedState);
		} catch (err) {
			console.error("Set state error: ", err);
		}
	};
	const remove = key => {
		try {
			localStorage.removeItem(key);
		} catch (err) {
			console.error("Remove state error: ", err);
		}
	};

	const publicAPI = {
		isActive,
		get,
		set,
		remove
	};

	return publicAPI;
})(window);

(function preload() {
    if (LOCALSTORAGE.get("linksArr") === undefined) return;
    linksArr = LOCALSTORAGE.get("linksArr");
    makeMarkUp(linksArr);
    console.log(linksArr);
  })();


function addCard(e) {
    e.preventDefault();

    let inputValue = {url: input.value};
    
    if (!linksArr.includes(inputValue)) {
        linksArr.unshift({url: input.value});
        LOCALSTORAGE.set("linksArr", linksArr);
      } else {
        alert("This link is in the list of bookmarks alredy");
        return;
      }
        
    cardList.innerHTML = '';
    makeMarkUp(linksArr);

	console.log(linksArr);
	form.reset();
}

function makeMarkUp (arr) {
    let markUp = arr.reduce((acc, link) => acc + template(link), "");
    cardList.insertAdjacentHTML("afterbegin", markUp);
}




form.addEventListener("submit", addCard);

