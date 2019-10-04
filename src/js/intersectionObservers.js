const images = [
  '../../assets/imgs/marvel.png',
  '../../assets/imgs/github.png',
  '../../assets/imgs/tetris.png',
  '../../assets/imgs/durak-online.png'
];
const projects = document.querySelectorAll('.project_block__project_item');
const options = {
    root: null,
    rootMargin: '100px',
    threshold: 0.2
}

function callback(entries) { 
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const index = [...projects].findIndex(item => item === entry.target)
      const imageElement = entry.target.firstElementChild.firstElementChild;
      imageElement.src = images[index];
      entry.target.classList.add('fade_in');
    }
  })
};

const observer = new IntersectionObserver(callback, options);

projects.forEach(project => observer.observe(project));
