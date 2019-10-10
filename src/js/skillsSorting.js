import { tabSwitcher, setCSSProp } from './lib';

const DEFAULT_TAB = 'Overview'

const tabs = document.querySelector('.skills_tabs');
const skillsList = document.querySelector('.skills_list').children;
// console.log(tabs.children[0].getBoundingClientRect().width);
setCSSProp('--skills_width', `${tabs.children[0].getBoundingClientRect().width}px`);
setCSSProp('--skills_position', `${0}%`);
		  
function filterSkills(type) {
	[...skillsList].forEach(item => {
		if (item.getAttribute('data-type') !== type) {
			item.classList.add('hide_item');
			item.classList.remove('show_item');
		} else {
			item.classList.remove('hide_item');
			item.classList.add('show_item');
		}
		if (type === DEFAULT_TAB) {
			item.classList.remove('hide_item');
			item.classList.add('show_item');
		}
	})
}

function switchTabs() {
	let currentTab = [...this.children].find(item => item.classList.contains('active_tab'));
	return (e) => {
		if (e.target === this || currentTab === e.target) {
			return;
		}
		currentTab.classList.remove('active_tab');
		e.target.classList.add('active_tab');
		currentTab = e.target;
		const index = [...tabs.children].findIndex(item => item === currentTab);
		const { width, position } = tabSwitcher(tabs.children[index], index);
		setCSSProp('--skills_width', `${width}`);
  		setCSSProp('--skills_position', `${position}`);
		filterSkills(e.target.textContent);
	}
}
const switchTabsEvent = switchTabs.call(tabs);

tabs.addEventListener('click', switchTabsEvent);