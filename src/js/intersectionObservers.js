import { getCoords, tabSwitcher } from './lib';

const images = ['./imgs/marvel.png', './imgs/github.png', './imgs/tetris.png', './imgs/durak-online.png'];
const colors = ['rgb(231, 81, 81)', 'rgb(98, 165, 79)', 'rgb(82, 120, 208)', 'hsl(0, 0%, 71%)', 'rgb(179, 116, 176)'];


const projects = document.querySelectorAll('.project_block__project_item');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav_link');

const scrollToAnchor = (i) => {
  const section = sections[i];
  const scrollValue = getCoords(section).top;
  window.scrollTo({top: scrollValue, behavior: 'smooth'});
};

[...navLinks].forEach((item, i) => item.addEventListener('click', scrollToAnchor.bind(null, i)));


const setNavBackground = (index) => {
  const color = colors[index]
  document.documentElement.style.setProperty('--navbg', `${color}`);
}

const setTabsData = ({width, position}) => {
  document.documentElement.style.setProperty('--width', width);
  document.documentElement.style.setProperty('--position', position);
}

const showProject = (entries) => { 
  entries.forEach((entry) => {
    if (entry.isIntersecting && !entry.target.classList.contains('fade_in')) {
      const index = [...projects].findIndex(item => item === entry.target)
      const imageElement = entry.target.firstElementChild.firstElementChild;
      imageElement.src = images[index];
      entry.target.classList.add('fade_in');
    }
  })
};

const toggleNavActiveTab = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const changeNavStyle = getCoords(entry.target).top <= window.scrollY && entry.boundingClientRect.height + getCoords(entry.target).top >= window.scrollY;
      if (changeNavStyle) {
        const index = [...sections].findIndex(item => item === entry.target)
        setTabsData(tabSwitcher(navLinks[index], index));
        setNavBackground(index);
      }
    }  
  })
};

const projectOptions = {
  root: null,
  rootMargin: '100px',
  threshold: 0.2
};

const projectsObserver = new IntersectionObserver(showProject, projectOptions);
const sectionsObserver = new IntersectionObserver(toggleNavActiveTab, {rootMargin: '100px 0px 0px 0px', threshold: [0.25, 0.5, 0.75, 1]});

projects.forEach(project => projectsObserver.observe(project));
sections.forEach(section => sectionsObserver.observe(section));

