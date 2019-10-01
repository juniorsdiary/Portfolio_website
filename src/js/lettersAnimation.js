const texts = document.querySelectorAll('.description');
const title = document.querySelector('.title_text');
setTimeout(() => {
  title.classList.add('appear');
}, 1000);
[...texts].forEach((item, i) => {
  setTimeout(() => {
    item.classList.add('appear');
  }, (i+2)*1000)
})


