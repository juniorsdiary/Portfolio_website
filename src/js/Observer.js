export default class Observer {
    constructor(elements, behavior) {
      this.elements = elements;
      this.behavior = behavior;
    }
  
    notify(data, index) {
      this.elements.forEach((item, i) => this.behavior(item, data, i, index));
    }
  }