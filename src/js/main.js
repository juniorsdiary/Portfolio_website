import Observer from './Observer'
import Observable from './Observable'
import { getCoords, tabSwitcher } from './lib';
/*
* [item] - current target element
* [data] - mapping element
* [i] - index of ,apping element
* [index] - index of current element
 */
const colors = {
  home: 'rgb(231, 81, 81)',
  about: 'rgb(98, 165, 79)',
  projects: 'rgb(82, 120, 208)',
  skills: 'hsl(0, 0%, 71%)',
  contacts: 'rgb(179, 116, 176)',
}

function setTabsData({width, position}) {
  document.documentElement.style.setProperty('--width', width);
  document.documentElement.style.setProperty('--position', position);
}
function setNavBackground(key) {
  const color = colors[key]
  document.documentElement.style.setProperty('--navbg', `${color}`);
}

const changeActiveState = (item, data, i, index) => {
  if (item === data) {
    setTabsData(tabSwitcher(item, index));
    setNavBackground(item.firstElementChild.textContent)
  }
};

const scrollToAnchor = (item, data, i, index) => {
  if (i === index) {
    const scrollValue = getCoords(item).top;
    window.scrollTo({top: scrollValue-60, behavior: 'smooth'});
  }
};

const navLinks = document.querySelectorAll('.nav_link');
const pages = document.querySelectorAll('section');
setNavBackground('home');
setTabsData(tabSwitcher(navLinks[0], 0));

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


