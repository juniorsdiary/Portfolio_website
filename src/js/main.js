import smoothscroll from 'smoothscroll-polyfill';
import { getCoords, tabSwitcher, setCSSProp } from './lib';

smoothscroll.polyfill();

const colors = ['rgb(0, 204, 0)', '#b4ec58', 'rgb(82, 120, 208)', 'rgb(146, 250, 193)', 'rgb(243, 130, 0)'];

const images = document.querySelectorAll('.project_item__image');
const projects = document.querySelectorAll('.project_block__project_item');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav_link');
const topAnchor = document.querySelectorAll('.top_anchor');
const bottomAnchor = document.querySelectorAll('.bottom_anchor');
const aboutContent = document.querySelector('.about_content');
const navBar = document.querySelector('.navigation_block');

let navHeight = navBar.getBoundingClientRect().height;

setCSSProp('--anchor', `${navHeight}px`);

const scrollToAnchor = (i) => {
  const section = sections[i];
  const scrollValue = getCoords(section).top;
  navHeight = navBar.getBoundingClientRect().height;
  setCSSProp('--anchor', `${navHeight+10}px`);
  window.scroll({top: scrollValue-navHeight, behavior: 'smooth'});
  
};

const setNavBackground = (index) => {
  const color = colors[index];
  setCSSProp('--navbg', `${color}`);
}

const showProject = (entries, observer) => { 
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const index = [...projects].findIndex(item => item === entry.target);
      const targetImage = images[index];
      targetImage.src = targetImage.getAttribute('data-src');
      entry.target.classList.add('fade_in');
      observer.unobserve(entry.target);
    }
  })
};

const switchTabs = (index) => {
  const {width, position} = tabSwitcher(navLinks[index], index);
  setCSSProp('--nav_width', `${width}`);
  setCSSProp('--nav_position', `${position}`);
  setNavBackground(index);
};

const topAnchorsCallBack = (entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      if (getCoords(entry.target).top <= window.scrollY) {
        const index = [...topAnchor].indexOf(entry.target);
        switchTabs(index);
      }
    }  
  })
};

const bottomAnchorsCallBack = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (getCoords(entry.target).top >= window.scrollY) {
        const index = [...bottomAnchor].indexOf(entry.target);
        switchTabs(index);
      }
    }  
  })
};

const animateAboutPageCallBack = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      const avatar = document.querySelector('.avatar');
      avatar.src = avatar.getAttribute('data-src');
      observer.unobserve(entry.target);
    }
  })
}

const projectsObserver = new IntersectionObserver(showProject, { rootMargin: '100px', threshold: 0.2 });
const topAnchorObserver = new IntersectionObserver(topAnchorsCallBack, { threshold: 1});
const bottomAnchorObserver = new IntersectionObserver(bottomAnchorsCallBack, { threshold: 1 });
const animateAboutPage = new IntersectionObserver(animateAboutPageCallBack, { rootMargin: '200px', threshold: 0.2 });

projects.forEach(project => projectsObserver.observe(project));
topAnchor.forEach(anchor => topAnchorObserver.observe(anchor));
bottomAnchor.forEach(anchor => bottomAnchorObserver.observe(anchor));
animateAboutPage.observe(aboutContent);

[...navLinks].forEach((item, i) => item.addEventListener('click', scrollToAnchor.bind(null, i)));
