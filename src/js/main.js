function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset,
  };
}

class Observable {
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
class Observer {
  constructor(elements, behavior) {
    this.elements = elements;
    this.behavior = behavior;
  }
  notify(data, index) {
    this.elements.forEach((item, i) => this.behavior(item, data, i, index));
  }
}

const changeActiveState = (item, data) => {
  if (item === data) {
    item.classList.remove('inactive_link');
    item.classList.add('active_link');
  } else {
    item.classList.remove('active_link');
    item.classList.add('inactive_link');
  }
};
const scrollToAnchor = (item, _, i, index) => {
  if (i === index) {
    setTimeout(() => {
      window.scrollTo({
        top: getCoords(item).top,
        behavior: 'smooth',
      });
    }, 500);

    item.parentNode.classList.remove('clear_page');
    item.parentNode.classList.add(`paint_page_${i}`);
  } else {
    item.parentNode.classList.remove(`paint_page_${i}`);
    item.parentNode.classList.add('clear_page');
  }
};
const navLinks = document.querySelectorAll('.nav_link');
const anchors = document.querySelectorAll('.anchor');

const HeadObservable = new Observable();

const Links = new Observer(navLinks, changeActiveState);
const Anchors = new Observer(anchors, scrollToAnchor);

HeadObservable.addObserver(Links);
HeadObservable.addObserver(Anchors);

[...navLinks].forEach((item, i) =>
  item.addEventListener(
    'click',
    HeadObservable.update.bind(HeadObservable, item, i)
  )
);
