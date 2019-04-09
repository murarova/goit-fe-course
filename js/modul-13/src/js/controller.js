export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.on('add', this.addLink.bind(this));
    }

    addLink(link) {
        const arr = this.model.addCard(link);
        this.view.makeMarkUp(arr);

        console.log(this.model);
    }

    removeLink(e) {
        this.model.removeCard(e);
        this.view.removeCard(e);

        console.log(this.model);
    }
}