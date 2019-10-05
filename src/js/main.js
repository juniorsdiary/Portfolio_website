import Observer from './Observer'
import Observable from './Observable'
import { getCoords } from './lib';

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
    const scrollValue = getCoords(item).top;
    window.scrollTo({top: scrollValue-60, behavior: 'smooth'})
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
