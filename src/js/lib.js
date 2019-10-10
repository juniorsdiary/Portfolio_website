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

function tabSwitcher(activeTab, index) {
  const fullWidth = activeTab.parentElement.getBoundingClientRect().width;
  if (index) {
    const value = [...activeTab.parentElement.children]
      .filter((_, i) => i < index)
      .map(item => item.getBoundingClientRect().width)
      .reduce((a, b) => a + b);
    const position = `${((value / fullWidth) * 100).toFixed(1)}%`;
    const width = `${((activeTab.getBoundingClientRect().width / fullWidth) * 100).toFixed(1)}%`;
    return { width, position }
  } 
    const rect = activeTab.getBoundingClientRect();
    const width = `${((rect.width / fullWidth) * 100).toFixed(1)}%`;
    const position = '0%';
    return { width, position }
}

const setCSSProp = (key, value) => {
  document.documentElement.style.setProperty(key, value);
}

export {getCoords, getRandom, tabSwitcher, setCSSProp};
