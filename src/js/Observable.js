export default class Observable {
    constructor() {
      this.observersList = [];
    }
  
    update(elem, index) {
      this.observersList.forEach(item => item.notify(elem, index));
    }
  
    addObserver(obs) {
      this.observersList.push(obs);
    }
  }