import * as Handlebars from './handlebars-v4.1.1';

export default class Veiw {
    constructor() {
        this.cardList = document.querySelector(".card-list");
        this.sourse = document.querySelector(".template").innerHTML.trim();
        this.template = Handlebars.compile(this.sourse);
        this.form = document.querySelector(".form");
        this.input = this.form.querySelector("#input");

        this.cardList.addEventListener("click", this.removeCard.bind(this));
        // this.form.addEventListener("submit", addCard);
    }

    makeMarkUp(arr) {

        this.cardList.innerHTML = "";
        
        let markUp = arr.reduce((acc, link) => acc + this.template(link), "");

        this.cardList.insertAdjacentHTML("afterbegin", markUp);
        this.form.reset();
    }

    removeCard(e) {
	if (e.target.classList.value === "button") {
		e.target.parentNode.remove();
	}
}
}