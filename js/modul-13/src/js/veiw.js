import * as Handlebars from './handlebars-v4.1.1';
import { EventEmitter } from "events";

export default class Veiw extends EventEmitter {
    constructor() {
        super();
        this.cardList = document.querySelector(".card-list");
        this.sourse = document.querySelector(".template").innerHTML.trim();
        this.template = Handlebars.compile(this.sourse);
        this.form = document.querySelector(".form");
        this.input = this.form.querySelector("#input");

        this.cardList.addEventListener("click", this.removeCard.bind(this));
        this.form.addEventListener("submit", this.handleAdd.bind(this));
    }

    handleAdd(e) {
        e.preventDefault();

        const {value} = this.input;

        if(value === '') return;
        this.emit('add', value);
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