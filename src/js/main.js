let humbBtn = document.querySelector('.hamburger_logo');
const toogleMenu = () => {
  let value = 'none';
  return () => {
    if (value === 'flex') {
      value = 'none';
    } else {
      value = 'flex';
    }
    document.documentElement.style.setProperty('--display', value);
  };
};
let event = toogleMenu();
humbBtn.addEventListener('click', event);
