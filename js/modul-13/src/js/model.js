export default class Model {
    constructor(linksArr = []) {
        this.linksArr = linksArr;
    }

    addCard(text) {
    
        if (text === "") {
            alert("Please, enter a link");
            return;
        }
    
        if (!this.checkValue(text, this.linksArr)) {
            this.linksArr.unshift({ url: text });
            // LOCALSTORAGE.set("linksArr", this.linksArr);
        } else {
            alert("This link is in the list of bookmarks alredy");
            return;
        }
         // view.makeMarkUp(this.linksArr);
        return this.linksArr;
    }

    checkValue(value, arr) {
        return arr.some(el => el.url === value);
    }

    removeCard(e) {
        if (e.target.classList.value === "button") {
            e.target.parentNode.remove();
    
            this.linksArr = this.linksArr.filter(
                el => el.url != e.target.previousElementSibling.innerText
            );
            // LOCALSTORAGE.set("linksArr", this.linksArr);
        }
    }
}