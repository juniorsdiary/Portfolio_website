const images = [
  './imgs/marvel.png',
  './imgs/github.png',
  './imgs/tetris.png',
  './imgs/durak-online.png'
];
const projects = document.querySelectorAll('.project_block__project_item');
const options = {
    root: null,
    rootMargin: '100px',
    threshold: 0.2
}

function callback(entries) { 
  entries.forEach((entry) => {
    if (entry.isIntersecting && !entry.target.classList.contains('fade_in')) {
      const index = [...projects].findIndex(item => item === entry.target)
      const imageElement = entry.target.firstElementChild.firstElementChild;
      imageElement.src = images[index];
      entry.target.classList.add('fade_in');
    }
  })
};

const observer = new IntersectionObserver(callback, options);

projects.forEach(project => observer.observe(project));
