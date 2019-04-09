export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    addLink(link) {
        const arr = this.model.addCard(link);
        view.makeMarkUp(arr);
    }

    // removeLink()
}