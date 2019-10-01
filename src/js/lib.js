function getCoords(elem) {
  const box = elem.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset,
    left: box.left + window.pageXOffset,
  };
}
function getRandom() {
  return Math.random()
}

export {getCoords, getRandom};
