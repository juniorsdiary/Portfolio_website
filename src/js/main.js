import Observer from './Observer'
import Observable from './Observable'

const changeActiveState = (item, data) => {
  if (item === data) {
    item.classList.remove('inactive_link');
    item.classList.add('active_link');
  } else {
    item.classList.remove('active_link');
    item.classList.add('inactive_link');
  }
};

const scrollToAnchor = (item, data, i, index) => {
  
  if (i === index) {
    // item.classList.remove(`clear_page`);
  } else {
    // item.classList.add(`clear_page`);
  }
};

const navLinks = document.querySelectorAll('.nav_link');
const pages = document.querySelectorAll('section');

const HeadObservable = new Observable();

const Links = new Observer(navLinks, changeActiveState);
const Pages = new Observer(pages, scrollToAnchor);

HeadObservable.addObserver(Links);
HeadObservable.addObserver(Pages);

[...navLinks].forEach((item, i) =>
  item.addEventListener(
    'click',
    HeadObservable.update.bind(HeadObservable, item, i)
  )
);
