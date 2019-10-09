const tabs = document.querySelector('.skills_tabs');
const skillsList = document.querySelector('.skills_list').children;

function filterSkills(type) {
	[...skillsList].forEach(item => {
		if (item.getAttribute('data-type') !== type) {
			item.classList.add('hide_item');
		} else {
			item.classList.remove('hide_item');
		}
		if (type === 'All') {
			item.classList.remove('hide_item');
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
		filterSkills(e.target.textContent)
	}
}
const switchTabsEvent = switchTabs.call(tabs);
tabs.addEventListener('click', switchTabsEvent);